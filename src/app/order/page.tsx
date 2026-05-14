"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { generateOrderId } from "@/lib/order";

const TOTAL_STEPS = 8;

const validateEmailFrontend = (email: string): string | null => {
  if (!email) return 'Bitte gib deine E-Mail-Adresse ein.'

  const parts = email.split('@')
  if (parts.length !== 2) return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  const localPart = parts[0]
  const domainPart = parts[1]

  if (!localPart || localPart.length === 0)
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  if (!domainPart || domainPart.length === 0)
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  const domainParts = domainPart.split('.')
  if (domainParts.length < 2)
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  const domainName = domainParts.slice(0, -1).join('.')
  const tld = domainParts[domainParts.length - 1]

  if (!domainName || domainName.length === 0)
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  if (!tld || tld.length < 2)
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  const regex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/
  if (!regex.test(email))
    return 'Bitte gib eine gültige E-Mail-Adresse ein.'

  const domain = domainPart.toLowerCase()
  const FAKE_DOMAINS = [
    'mailinator.com', 'tempmail.com', 'guerrillamail.com',
    'throwaway.email', 'fakeinbox.com', 'trashmail.com',
    'yopmail.com', 'sharklasers.com', 'dispostable.com',
    'maildrop.cc', 'spamgourmet.com', 'tempr.email',
    'discard.email', 'spam4.me', 'getairmail.com'
  ]
  if (FAKE_DOMAINS.includes(domain))
    return 'Bitte verwende eine echte E-Mail-Adresse.'

  return null
}


const LockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const occasions = ["Geburtstag", "Hochzeit", "Jahrestag", "Valentinstag", "Einfach so", "Weihnachten"];
const styles = ["Sanft & Emotional", "Tief & Romantisch", "Fröhlich & Mitreißend", "Nostalgisch", "Filmreif & Kraftvoll", "Sonstiges"];
const moods = ["Acoustic", "Pop", "Klavier", "R&B", "Filmmusik"];

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function VerticalOptionSelector({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div className="option-grid" style={{ marginBottom: 40 }}>
      {options.map((opt, i) => {
        const isActive = selected === opt;
        return (
          <button
            key={opt}
            onClick={() => onSelect(opt)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              width: "100%",
              background: isActive ? "rgba(29,185,84,0.3)" : "rgba(0,0,0,0.3)",
              border: isActive ? "1.5px solid #1DB954" : "1.5px solid rgba(0,0,0,0.8)",
              borderRadius: 8,
              padding: "14px 18px",
              cursor: "pointer",
              marginBottom: 8,
              textAlign: "left",
              transition: "all 0.15s",
              boxSizing: "border-box",
            }}
          >
            <span style={{
              width: 32,
              height: 32,
              borderRadius: 6,
              background: isActive ? "#1DB954" : "rgba(255,255,255,0.15)",
              border: isActive ? "1.5px solid #1DB954" : "1.5px solid rgba(0,0,0,0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              fontWeight: 700,
              color: isActive ? "#000" : "#fff",
              flexShrink: 0,
              transition: "all 0.15s",
            }}>
              {LETTERS[i]}
            </span>
            <span style={{ fontSize: 16, color: "#1a1a1a" }}>{opt}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function OrderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [emailError, setEmailError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<'validating' | 'submitting' | null>(null);
  const [microFeedback, setMicroFeedback] = useState<string | null>(null);

  const stepRef = React.useRef(currentStep);
  stepRef.current = currentStep;

  // Ref so the global keydown handler always has the latest handleNext
  const handleNextRef = useRef<() => void>(() => {});

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError(null);
  }

  const occasionFeedback: Record<string, string> = {
    "Geburtstag": "Perfekt — Geburtstagslieder lassen Menschen weinen vor Freude.",
    "Hochzeit": "Wunderschön — Hochzeitslieder sind unsere emotionalsten Songs.",
    "Jahrestag": "So schön — ein Song, der mehr sagt als tausend Worte.",
    "Valentinstag": "Perfekt — das Geschenk, das Blumen nie sein können.",
    "Einfach so": "Die besten Geschenke brauchen keinen besonderen Grund.",
    "Weihnachten": "Magisch — Weihnachtslieder, die wirklich von euch handeln.",
  };

  function handleOptionAutoAdvance(key: string, value: string, nextStep: number) {
    setAnswer(key, value);
    if (key === "anlass") {
      const fb = occasionFeedback[value];
      if (fb) setMicroFeedback(fb);
    }
    setTimeout(() => {
      setMicroFeedback(null);
      setStepError(null);
      setCurrentStep(nextStep);
    }, 600);
  }

  function getCtaLabel(): string {
    if (loadingPhase === "validating") return "E-Mail wird geprüft...";
    if (loadingPhase === "submitting") return "Song wird erstellt...";
    switch (currentStep) {
      case 0: return "Anlass bestätigen →";
      case 1: return "Namen eingeben →";
      case 2: return "Weiter →";
      case 3: return "Geschichte hinzufügen →";
      case 4: return "Klang festlegen →";
      case 5: return "Stil wählen →";
      case 6: return "Moment festhalten →";
      case 7: return "Kostenlosen Trailer anfordern →";
      default: return "Weiter →";
    }
  }

  // ── Validation ──────────────────────────────────────────────────────────────
  function isStepValid(step: number): boolean {
    switch (step) {
      case 0: return !!answers.anlass;
      case 1: return !!(answers.name ?? '').trim();
      case 2: return !!(answers.empfaenger ?? '').trim();
      case 3: return (answers.geschichte ?? '').trim().length >= 50;
      case 4: return !!answers.klang;
      case 5: return !!answers.stil;
      case 6: return (answers.spezialzeile ?? '').trim().length >= 10;
      case 7: return !!(answers.email ?? '').trim() && !emailError;
      default: return true;
    }
  }

  function getStepErrorMsg(step: number): string {
    switch (step) {
      case 0: return "Bitte wähle einen Anlass aus.";
      case 1: return "Bitte gib deinen Namen ein.";
      case 2: return "Bitte gib den Namen der Person ein.";
      case 3: return "Bitte schreib mindestens 50 Zeichen – je mehr Details, desto besser der Song.";
      case 4: return "Bitte wähle einen Klangstil.";
      case 5: return "Bitte wähle einen Musikstil.";
      case 6: return "Bitte beschreib kurz was diesen Moment einzigartig macht.";
      default: return "Bitte füll dieses Feld aus.";
    }
  }

  // ── Navigation ──────────────────────────────────────────────────────────────
  function handleNext() {
    if (currentStep < TOTAL_STEPS - 1) {
      if (!isStepValid(currentStep)) {
        setStepError(getStepErrorMsg(currentStep));
        return;
      }
      setStepError(null);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }

  // Always keep ref in sync so global keydown uses latest answers/state
  handleNextRef.current = handleNext;

  const handleSubmit = async () => {
    const frontendError = validateEmailFrontend(answers.email)
    if (frontendError) {
      setEmailError(frontendError)
      return
    }

    setLoading(true)

    try {
      setLoadingPhase('submitting')

      const orderId = generateOrderId()
      const response = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
          customer_name: answers.name,
          customer_email: answers.email,
          anlass: answers.anlass,
          empfaenger: answers.empfaenger,
          geschichte: answers.geschichte,
          klang: answers.klang,
          stil: answers.stil,
          spezialzeile: answers.spezialzeile || ''
        })
      })

      const data = await response.json()

      if (data.success) {
        sessionStorage.setItem('vowlyra_email', answers.email)
        router.push('/success')
      } else {
        alert('Fehler – bitte versuche es erneut')
      }
    } catch (error) {
      alert('Verbindungsfehler')
    } finally {
      setLoading(false)
      setLoadingPhase(null)
    }
  }

  // ── Global keyboard (for selection steps; inputs handle their own Enter) ────
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      // Textarea: never intercept (natural newlines)
      // Input: the input's own onKeyDown handles Enter
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === "Enter") {
        handleNextRef.current();
      }
      if (e.key === "Escape") {
        if (stepRef.current > 0) setCurrentStep((s) => s - 1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // ── Shared input onKeyDown for mobile keyboard "Weiter" ─────────────────────
  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNextRef.current();
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,0,0,0.3)",
    border: "1.5px solid rgba(0,0,0,0.8)",
    borderRadius: 8,
    padding: "14px 18px",
    fontSize: 16,
    color: "#fff",
    outline: "none",
    fontFamily: "system-ui, -apple-system, sans-serif",
    boxSizing: "border-box",
    transition: "border-color 0.15s",
  };

  // ── Required / optional indicator ──────────────────────────────────────────
  const Required = () => (
    <p style={{ fontSize: 11, color: "#e53e3e", margin: "4px 0 18px", fontWeight: 600, letterSpacing: "0.3px", opacity: 0.85 }}>
      * Pflichtfeld
    </p>
  );
  const Optional = () => (
    <p style={{ fontSize: 11, color: "#999", margin: "4px 0 18px", fontWeight: 500, letterSpacing: "0.3px" }}>
      (Optional)
    </p>
  );

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h1 className="option-step-title" style={h1Style}>Welcher Moment verdient einen Song?</h1>
            <p className="option-step-subtitle" style={subtitleStyle}>Je nach Anlass wird der Song tiefer, fröhlicher oder romantischer.</p>
            <VerticalOptionSelector
              options={occasions}
              selected={answers.anlass ?? ""}
              onSelect={(v) => handleOptionAutoAdvance("anlass", v, 1)}
            />
          </>
        );

      case 1:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Wie heißt du?<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
            <Required />
            <p className="dark-input-subtitle" style={subtitleStyle}>Dein Name macht den Song noch persönlicher.</p>
            <div className="dark-input-wrapper">
              <input
                className="dark-input"
                style={inputStyle}
                placeholder="z.B. Max"
                value={answers.name ?? ""}
                onChange={(e) => setAnswer("name", e.target.value)}
                onKeyDown={inputKeyDown}
                enterKeyHint="next"
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Für wen ist dieser Song?<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
            <Required />
            <p className="dark-input-subtitle" style={subtitleStyle}>Ihr Name wird direkt in die Lyrics eingewoben.</p>
            <div className="dark-input-wrapper">
              <input
                className="dark-input"
                style={inputStyle}
                placeholder="z.B. Mama, Jonas, Sarah"
                value={answers.empfaenger ?? ""}
                onChange={(e) => setAnswer("empfaenger", e.target.value)}
                onKeyDown={inputKeyDown}
                enterKeyHint="next"
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>
              Was verbindet dich mit {answers.empfaenger || "dieser Person"}?<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup>
            </h1>
            <Required />
            <p className="dark-input-subtitle" style={subtitleStyle}>Je mehr Details, desto tiefer geht der Song unter die Haut.</p>
            <div className="dark-input-wrapper">
              <textarea
                className="dark-input"
                style={{
                  ...inputStyle,
                  minHeight: 180,
                  resize: "none",
                }}
                placeholder={`z.B. ${answers.empfaenger || "Sie"} tanzt immer in der Küche, liebt Rosen und hat mich gelehrt, was wirklich zählt...`}
                value={answers.geschichte ?? ""}
                onChange={(e) => setAnswer("geschichte", e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
              <div style={{
                textAlign: "right",
                fontSize: 12,
                marginTop: 6,
                color: (answers.geschichte ?? "").trim().length >= 50 ? "#1DB954" : "#999",
              }}>
                {(answers.geschichte ?? "").trim().length} / 50 Zeichen
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h1 className="option-step-title" style={h1Style}>
              Wie soll sich {answers.empfaenger || "die Person"} fühlen?
            </h1>
            <p className="option-step-subtitle" style={subtitleStyle}>Das ist die Seele deines Songs — wähle, was sie am tiefsten berührt.</p>
            <VerticalOptionSelector
              options={styles}
              selected={answers.klang ?? ""}
              onSelect={(v) => handleOptionAutoAdvance("klang", v, 5)}
            />
          </>
        );

      case 5:
        return (
          <>
            <h1 className="option-step-title" style={h1Style}>Welcher Sound passt am besten?</h1>
            <p className="option-step-subtitle" style={subtitleStyle}>Der Stil macht deinen Song unverwechselbar — wähle was {answers.empfaenger || "die Person"} lieben wird.</p>
            <VerticalOptionSelector
              options={moods}
              selected={answers.stil ?? ""}
              onSelect={(v) => handleOptionAutoAdvance("stil", v, 6)}
            />
          </>
        );

      case 6:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Was macht {answers.empfaenger || "diese Person"} einzigartig?<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
            <Required />
            <p className="dark-input-subtitle" style={subtitleStyle}>Ein Spitzname, ein Innenwitz, eine Eigenheit — das wird die Zeile, die sie nie vergessen.</p>
            <div className="dark-input-wrapper">
              <input
                className="dark-input"
                style={inputStyle}
                placeholder={"z.B. 'Sie lacht immer zu laut in Kinos'"}
                value={answers.spezialzeile ?? ""}
                onChange={(e) => setAnswer("spezialzeile", e.target.value)}
                onKeyDown={inputKeyDown}
                enterKeyHint="next"
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
              <div style={{
                textAlign: "right",
                fontSize: 12,
                marginTop: 6,
                color: (answers.spezialzeile ?? "").trim().length >= 10 ? "#1DB954" : "#999",
              }}>
                {(answers.spezialzeile ?? "").trim().length} / 10 Zeichen
              </div>
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>
              Fast fertig{answers.name ? `, ${answers.name}` : ""}! Wohin schicken wir deinen Trailer?<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup>
            </h1>
            <Required />
            <p className="dark-input-subtitle" style={subtitleStyle}>In ~5 Minuten hörst du deinen kostenlosen Song-Trailer — du zahlst nur wenn er dir gefällt.</p>
            <div className="dark-input-wrapper">
              <input
                type="email"
                className="dark-input"
                style={{
                  ...inputStyle,
                  border: emailError ? "1.5px solid #e53e3e" : "1.5px solid rgba(0,0,0,0.8)",
                }}
                placeholder="deine@email.de"
                value={answers.email ?? ""}
                enterKeyHint="done"
                onChange={(e) => {
                  const newEmail = e.target.value
                  setAnswers({ ...answers, email: newEmail })
                  setEmailError(validateEmailFrontend(newEmail))
                  setStepError(null)
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleNextRef.current();
                  }
                }}
                onFocus={(e) => {
                  if (!emailError) e.currentTarget.style.borderColor = "#1DB954"
                }}
                onBlur={(e) => {
                  setEmailError(validateEmailFrontend(e.target.value))
                }}
              />
              {emailError && (
                <p style={{ color: '#e53e3e', fontSize: '13px', marginTop: '6px' }}>
                  {emailError}
                </p>
              )}
              <div style={{ color: "#777", fontSize: 12, marginTop: 8 }}>
                Nur für deinen Trailer. Kein Spam, kein Abo.
              </div>
              {/* What happens next */}
              <div style={{ marginTop: 24, borderTop: "1px solid rgba(0,0,0,0.12)", paddingTop: 20 }}>
                <p style={{ fontSize: 11, color: "#555", margin: "0 0 12px 0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>Was passiert als nächstes</p>
                {[
                  { icon: "🎵", text: `Song für ${answers.empfaenger || "sie"} wird erstellt (~5 Min.)` },
                  { icon: "📧", text: "Kostenloser Trailer kommt in dein Postfach" },
                  { icon: "✅", text: "Nur zahlen wenn er dich begeistert · 29,99€" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 13, color: "#1a1a1a" }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  }

  const h1Style: React.CSSProperties = {
    fontSize: 32,
    fontWeight: 800,
    color: "#1a1a1a",
    margin: "0 0 12px 0",
    lineHeight: 1.2,
    textAlign: "left",
  };

  const subtitleStyle: React.CSSProperties = {
    color: "#1a1a1a",
    fontSize: 16,
    margin: "0 0 32px 0",
    lineHeight: 1.6,
    textAlign: "left",
  };

  const isCurrentStepValid = isStepValid(currentStep);

  return (
    <div
      style={{
        background: "#CCCCCC",
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, sans-serif",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX(6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX(4px); }
        }
        .step-content {
          animation: fadeIn 0.3s ease forwards;
        }
        .order-next-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }
        .order-back-link:hover {
          color: #1a1a1a !important;
        }
        .step-error-shake {
          animation: shake 0.35s ease;
        }
        /* Option grid – Mobile: 1 Spalte */
        .option-grid {
          display: flex;
          flex-direction: column;
        }
        /* Option grid – Desktop: 2 Spalten */
        @media (min-width: 768px) {
          .step-content {
            margin: 0 auto;
          }
          .option-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            max-width: 600px;
            margin: 0 auto 40px;
          }
          .option-grid button {
            margin-bottom: 0;
          }
          .option-step-title {
            text-align: center !important;
          }
          .option-step-subtitle {
            text-align: center !important;
          }
          .dark-input-wrapper {
            max-width: 600px;
            margin: 0 auto 40px;
          }
          .dark-input-title {
            text-align: center !important;
          }
          .dark-input-subtitle {
            text-align: center !important;
          }
        }
        .dark-input::placeholder {
          color: rgba(255,255,255,0.5);
        }
      `}</style>

      {/* Progress Bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "#e0e0e0", zIndex: 100 }}>
        <div
          style={{
            height: "100%",
            background: "#1DB954",
            width: `${progress}%`,
            transition: "width 0.4s ease",
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          position: "fixed",
          top: 3,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "32px 24px",
          background: "#CCCCCC",
          zIndex: 99,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <a href="/" style={{ display: "flex" }}>
            <Image src="https://media.vowlyra.com/Primary_Logo.png" width={160} height={44} alt="Vowlyra" style={{ objectFit: "contain" }} />
          </a>
          {currentStep > 0 && (
            <button
              onClick={() => { setCurrentStep((prev) => Math.max(prev - 1, 0)); setStepError(null); setMicroFeedback(null); }}
              className="order-back-link"
              style={{
                background: "none",
                border: "none",
                color: "#555",
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                transition: "color 0.15s",
              }}
            >
              ← Zurück
            </button>
          )}
        </div>
        <div style={{ fontSize: 12, color: "#777", fontWeight: 600 }}>
          {currentStep + 1} / {TOTAL_STEPS}
        </div>
      </div>

      {/* Step Content */}
      <div
        key={currentStep}
        className="step-content"
        style={{
          maxWidth: 600,
          width: "100%",
          padding: "120px 24px 48px",
        }}
      >
        {renderStep()}

        {/* Micro-feedback after option selection */}
        {microFeedback && (
          <div style={{
            background: "rgba(29,185,84,0.12)",
            border: "1px solid rgba(29,185,84,0.4)",
            borderRadius: 8,
            padding: "10px 14px",
            marginBottom: 8,
            fontSize: 14,
            color: "#1a7a35",
            fontWeight: 500,
            animation: "fadeIn 0.3s ease",
          }}>
            {microFeedback}
          </div>
        )}

        {/* Validation error */}
        {stepError && (
          <div
            className="step-error-shake"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(229,62,62,0.12)",
              border: "1px solid rgba(229,62,62,0.4)",
              borderRadius: 8,
              padding: "10px 14px",
              marginBottom: 8,
              fontSize: 14,
              color: "#c53030",
              fontWeight: 500,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c53030" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {stepError}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={loading || (currentStep === TOTAL_STEPS - 1 && (!!emailError || !answers.email))}
          className="order-next-btn"
          style={{
            background: "#1DB954",
            color: "#000",
            border: "none",
            borderRadius: 500,
            padding: "16px 40px",
            minHeight: 52,
            fontWeight: 700,
            fontSize: 15,
            cursor: (loading || (currentStep === TOTAL_STEPS - 1 && (!!emailError || !answers.email))) ? "not-allowed" : "pointer",
            opacity: (loading || (currentStep === TOTAL_STEPS - 1 && (!!emailError || !answers.email))) ? 0.5 : 1,
            transition: "opacity 0.15s, transform 0.15s",
            display: "block",
            margin: "16px auto 0",
            position: "relative",
            zIndex: 10,
            touchAction: "manipulation",
          }}
        >
          {getCtaLabel()}
        </button>
        {/* Trust element */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 10 }}>
          {currentStep === 7
            ? "Trailer kostenlos · 29,99€ nur wenn er dir gefällt"
            : currentStep === 0
            ? "Kein Abo · Kostenloser Trailer vorab"
            : "Kein Abo · Nur zahlen wenn der Trailer gefällt"}
        </p>
      </div>
    </div>
  );
}
