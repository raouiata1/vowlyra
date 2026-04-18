"use client";

import React, { useState, useEffect } from "react";
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

const occasions = ["Geburtstag", "Hochzeit", "Jahrestag", "Weihnachten", "Valentinstag", "Einfach so"];
const styles = ["Tief & Romantisch", "Sanft & Emotional", "Fröhlich & Mitreißend", "Nostalgisch", "Filmreif & Kraftvoll", "Sonstiges"];
const moods = ["Pop", "Klavier", "Acoustic", "R&B", "Filmmusik"];

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
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<'validating' | 'submitting' | null>(null);

  const stepRef = React.useRef(currentStep);
  stepRef.current = currentStep;

  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  const handleSubmit = async () => {
    const frontendError = validateEmailFrontend(answers.email)
    if (frontendError) {
      setEmailError(frontendError)
      return
    }

    setLoading(true)

    // ZeroBounce temporär deaktiviert
    // setLoadingPhase('validating')
    // const validateResponse = await fetch('/api/validate-email', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: answers.email })
    // })
    // const validateData = await validateResponse.json()
    // if (!validateData.valid) {
    //   setEmailError('Diese E-Mail-Adresse existiert nicht. Bitte prüfe deine Eingabe.')
    //   setLoading(false)
    //   setLoadingPhase(null)
    //   return
    // }

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

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === "Enter") {
        if (stepRef.current < TOTAL_STEPS - 1) setCurrentStep((s) => s + 1);
      }
      if (e.key === "Escape") {
        if (stepRef.current > 0) setCurrentStep((s) => s - 1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "#fff",
    border: "2px solid #e0e0e0",
    borderRadius: 12,
    padding: "14px 16px",
    fontSize: 15,
    color: "#1a1a1a",
    outline: "none",
    fontFamily: "system-ui, -apple-system, sans-serif",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  };

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (
          <>
            <h1 className="option-step-title" style={h1Style}>Was ist der Anlass?</h1>
            <p className="option-step-subtitle" style={subtitleStyle}>Das bestimmt den emotionalen Ton deines Songs.</p>
            <VerticalOptionSelector
              options={occasions}
              selected={answers.anlass ?? ""}
              onSelect={(v) => setAnswer("anlass", v)}
            />
          </>
        );

      case 1:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Wie heißt du?</h1>
            <p className="dark-input-subtitle" style={subtitleStyle}>Wir verwenden deinen Namen im Song.</p>
            <div className="dark-input-wrapper">
              <input
                className="dark-input"
                style={{
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
                }}
                placeholder="z.B. Max"
                value={answers.name ?? ""}
                onChange={(e) => setAnswer("name", e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Wie heißt die Person?</h1>
            <p className="dark-input-subtitle" style={subtitleStyle}>Wir verwenden diesen Namen in den Lyrics.</p>
            <div className="dark-input-wrapper">
              <input
                className="dark-input"
                style={{
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
                }}
                placeholder="z.B. Mama, Jonas, Sarah"
                value={answers.empfaenger ?? ""}
                onChange={(e) => setAnswer("empfaenger", e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Erzähl uns eure Geschichte</h1>
            <p className="dark-input-subtitle" style={subtitleStyle}>Teile die Momente, die am meisten zählen. Wir verwandeln sie in Lyrics.</p>
            <div className="dark-input-wrapper">
              <textarea
                className="dark-input"
                style={{
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
                  minHeight: 180,
                  resize: "none",
                }}
                placeholder={"z.B. Wir haben uns im Urlaub kennengelernt, sie liebt Rosen und tanzt immer in der Küche..."}
                value={answers.geschichte ?? ""}
                onChange={(e) => setAnswer("geschichte", e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h1 className="option-step-title" style={h1Style}>Wähle den emotionalen Klang</h1>
            <p className="option-step-subtitle" style={subtitleStyle}>Das bestimmt den Produktionsstil deines Songs.</p>
            <VerticalOptionSelector
              options={styles}
              selected={answers.klang ?? ""}
              onSelect={(v) => setAnswer("klang", v)}
            />
          </>
        );

      case 5:
        return (
          <>
            <h1 className="option-step-title" style={h1Style}>Wie soll es klingen?</h1>
            <p className="option-step-subtitle" style={subtitleStyle}>Das bestimmt den Musikstil deines Songs.</p>
            <VerticalOptionSelector
              options={moods}
              selected={answers.stil ?? ""}
              onSelect={(v) => setAnswer("stil", v)}
            />
          </>
        );

      case 6:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Gibt es eine Zeile, die unbedingt vorkommen muss?</h1>
            <p className="dark-input-subtitle" style={subtitleStyle}>Optional, aber kraftvoll.</p>
            <div className="dark-input-wrapper">
              <input
                className="dark-input"
                style={{
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
                }}
                placeholder={"z.B. 'Meine kleine Sonnenschein'..."}
                value={answers.spezialzeile ?? ""}
                onChange={(e) => setAnswer("spezialzeile", e.target.value)}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")}
              />
            </div>
          </>
        );

      case 7:
        return (
          <>
            <h1 className="dark-input-title" style={h1Style}>Wohin schicken wir deinen exklusiven Song-Trailer?</h1>
            <p className="dark-input-subtitle" style={subtitleStyle}>Du erhältst einen exklusiven Trailer, bevor du deine Bestellung abschließt.</p>
            <div className="dark-input-wrapper">
              <input
                type="email"
                className="dark-input"
                style={{
                  width: "100%",
                  background: "rgba(0,0,0,0.3)",
                  border: emailError ? "1.5px solid #e53e3e" : "1.5px solid rgba(0,0,0,0.8)",
                  borderRadius: 8,
                  padding: "14px 18px",
                  fontSize: 16,
                  color: "#fff",
                  outline: "none",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  boxSizing: "border-box",
                  transition: "border-color 0.15s",
                }}
                placeholder="deine@email.de"
                value={answers.email ?? ""}
                onChange={(e) => {
                  const newEmail = e.target.value
                  setAnswers({ ...answers, email: newEmail })
                  setEmailError(validateEmailFrontend(newEmail))
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
                Nur für die Lieferung deines Trailers. Kein Spam.
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
    color: "#777",
    fontSize: 16,
    margin: "0 0 32px 0",
    lineHeight: 1.6,
    textAlign: "left",
  };

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
          padding: "32px 24px",
          background: "#CCCCCC",
          zIndex: 99,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Image src="/logo.png" width={120} height={38} alt="Vowlyra" style={{ objectFit: "contain" }} />
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
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

        <button
          onClick={() => {
            if (currentStep < TOTAL_STEPS - 1) {
              setCurrentStep((prev) => prev + 1);
            } else {
              handleSubmit();
            }
          }}
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
            position: "relative",
            zIndex: 10,
            touchAction: "manipulation",
          }}
        >
          {loadingPhase === 'validating'
            ? 'E-Mail wird geprüft...'
            : loadingPhase === 'submitting'
            ? 'Wird gesendet...'
            : currentStep === TOTAL_STEPS - 1
            ? 'Jetzt Song erstellen'
            : 'Weiter →'}
        </button>
      </div>
    </div>
  );
}
