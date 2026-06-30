"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import { useTranslations, useLocale } from "next-intl";

const TOTAL_STEPS = 7;

const validatePhone = (phone: string): string | null => {
  if (!phone || !phone.trim()) return 'Bitte gib deine Telefonnummer ein.'
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, '')
  if (!/^\+?\d+$/.test(cleaned)) return 'Bitte gib eine gültige Telefonnummer ein.'
  const digits = cleaned.replace(/^\+/, '')
  if (digits.length < 7 || digits.length > 15) return 'Bitte gib eine gültige Telefonnummer ein.'
  return null
}
const LETTERS = ["A", "B", "C", "D", "E", "F"];

function VerticalOptionSelector({ options, selected, onSelect }: { options: string[]; selected: string; onSelect: (v: string) => void }) {
  return (
    <div className="option-grid" style={{ marginBottom: 40 }}>
      {options.map((opt, i) => {
        const isActive = selected === opt;
        return (
          <button key={opt} onClick={() => onSelect(opt)}
            style={{ display: "flex", alignItems: "center", gap: 16, width: "100%", background: isActive ? "rgba(29,185,84,0.3)" : "rgba(0,0,0,0.3)", border: isActive ? "1.5px solid #1DB954" : "1.5px solid rgba(0,0,0,0.8)", borderRadius: 8, padding: "14px 18px", cursor: "pointer", marginBottom: 8, textAlign: "left", transition: "all 0.15s", boxSizing: "border-box" }}
          >
            <span style={{ width: 32, height: 32, borderRadius: 6, background: isActive ? "#1DB954" : "rgba(255,255,255,0.15)", border: isActive ? "1.5px solid #1DB954" : "1.5px solid rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: isActive ? "#000" : "#fff", flexShrink: 0, transition: "all 0.15s" }}>
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
  const t = useTranslations("order");
  const locale = useLocale();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [stepError, setStepError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<"validating" | "submitting" | null>(null);
  const [microFeedback, setMicroFeedback] = useState<string | null>(null);

  const stepRef = React.useRef(currentStep);
  stepRef.current = currentStep;
  const handleNextRef = useRef<() => void>(() => {});
  const progress = ((currentStep + 1) / TOTAL_STEPS) * 100;

  const occasions = t.raw("occasions") as string[];
  const styles = t.raw("styles") as string[];
  const moods = t.raw("moods") as string[];

  // Occasion feedback keys mapped to index
  const occasionFeedbackKeys = [
    "occasion_fb_birthday",
    "occasion_fb_wedding",
    "occasion_fb_anniversary",
    "occasion_fb_valentine",
    "occasion_fb_justso",
    "occasion_fb_christmas",
  ] as const;

  function validateEmailFrontend(email: string): string | null {
    if (!email) return t("email_err_empty");
    const parts = email.split("@");
    if (parts.length !== 2) return t("email_err_invalid");
    const [local, domain] = parts;
    if (!local || !domain) return t("email_err_invalid");
    const domainParts = domain.split(".");
    if (domainParts.length < 2) return t("email_err_invalid");
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) return t("email_err_invalid");
    if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email)) return t("email_err_invalid");
    const FAKE_DOMAINS = ["mailinator.com","tempmail.com","guerrillamail.com","throwaway.email","fakeinbox.com","trashmail.com","yopmail.com","sharklasers.com","dispostable.com","maildrop.cc","spamgourmet.com","tempr.email","discard.email","spam4.me","getairmail.com"];
    if (FAKE_DOMAINS.includes(domain.toLowerCase())) return t("email_err_fake");
    return null;
  }

  function setAnswer(key: string, value: string) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    setStepError(null);
  }

  function handleOptionAutoAdvance(key: string, value: string, nextStep: number) {
    setAnswer(key, value);
    if (key === "anlass") {
      const idx = occasions.indexOf(value);
      if (idx >= 0 && occasionFeedbackKeys[idx]) {
        setMicroFeedback(t(occasionFeedbackKeys[idx]));
      }
    }
    setTimeout(() => { setMicroFeedback(null); setStepError(null); setCurrentStep(nextStep); }, 600);
  }

  function getCtaLabel(): string {
    if (loadingPhase === "validating") return t("cta_validating");
    if (loadingPhase === "submitting") return t("cta_submitting");
    const keys = ["cta0","cta1","cta2","cta3","cta4","cta5","cta6","cta7"] as const;
    return t(keys[currentStep] ?? "cta2");
  }

  function isStepValid(step: number): boolean {
    switch (step) {
      case 0: return !!answers.anlass;
      case 1: return !!(answers.name ?? "").trim();
      case 2: return !!(answers.empfaenger ?? "").trim();
      case 3: return !!(answers.geschichte ?? "").trim();
      case 4: return !!answers.klang;
      case 5: return !!answers.stil;
      case 6: return !!(answers.email ?? "").trim() && !emailError && !!(answers.phone ?? "").trim() && !phoneError;
      default: return true;
    }
  }

  function getStepErrorMsg(step: number): string {
    const keys = ["err0","err1","err2","err3","err4","err5","err6","err_default"] as const;
    return t(keys[step] ?? "err_default");
  }

  function handleNext() {
    if (currentStep < TOTAL_STEPS - 1) {
      if (!isStepValid(currentStep)) { setStepError(getStepErrorMsg(currentStep)); return; }
      setStepError(null);
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  }

  handleNextRef.current = handleNext;

  const handleSubmit = async () => {
    const frontendError = validateEmailFrontend(answers.email);
    if (frontendError) { setEmailError(frontendError); return; }
    setLoading(true);
    try {
      setLoadingPhase("validating");
      try {
        const zbRes = await fetch("/api/validate-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: answers.email }) });
        const zbData = await zbRes.json();
        if (!zbData.valid) { setEmailError(t("email_err_zerobounce")); setLoading(false); setLoadingPhase(null); return; }
      } catch { /* fail open */ }
      setLoadingPhase("submitting");
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer_name: answers.name, customer_email: answers.email, customer_phone: answers.phone, anlass: answers.anlass, empfaenger: answers.empfaenger, geschichte: answers.geschichte, klang: answers.klang, stil: answers.stil }),
      });
      const data = await response.json();
      if (data.success) {
        sessionStorage.setItem("vowlyra_email", answers.email);
        router.push(`/${locale}/success?order_id=${data.order_id}`);
      } else {
        alert(t("server_err"));
      }
    } catch {
      alert(t("connection_err"));
    } finally {
      setLoading(false);
      setLoadingPhase(null);
    }
  };

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "TEXTAREA" || tag === "INPUT") return;
      if (e.key === "Enter") handleNextRef.current();
      if (e.key === "Escape") { if (stepRef.current > 0) setCurrentStep((s) => s - 1); }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") { e.preventDefault(); handleNextRef.current(); }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(0,0,0,0.3)", border: "1.5px solid rgba(0,0,0,0.8)", borderRadius: 8, padding: "14px 18px", fontSize: 16, color: "#fff", outline: "none", fontFamily: "system-ui, -apple-system, sans-serif", boxSizing: "border-box", transition: "border-color 0.15s",
  };

  const Required = () => <p style={{ fontSize: 11, color: "#e53e3e", margin: "4px 0 18px", fontWeight: 600, letterSpacing: "0.3px", opacity: 0.85 }}>* {t("required").replace("* ", "")}</p>;

  const name = answers.empfaenger || "";

  function renderStep() {
    switch (currentStep) {
      case 0:
        return (<>
          <h1 className="option-step-title" style={h1Style}>{t("step0_title")}</h1>
          <p className="option-step-subtitle" style={subtitleStyle}>{t("step0_sub")}</p>
          <VerticalOptionSelector options={occasions} selected={answers.anlass ?? ""} onSelect={(v) => handleOptionAutoAdvance("anlass", v, 1)} />
        </>);
      case 1:
        return (<>
          <h1 className="dark-input-title" style={h1Style}>{t("step1_title")}<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
          <Required />
          <p className="dark-input-subtitle" style={subtitleStyle}>{t("step1_sub")}</p>
          <div className="dark-input-wrapper">
            <input className="dark-input" style={inputStyle} placeholder={t("step1_placeholder")} value={answers.name ?? ""} onChange={(e) => setAnswer("name", e.target.value)} onKeyDown={inputKeyDown} enterKeyHint="next" onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")} />
          </div>
        </>);
      case 2:
        return (<>
          <h1 className="dark-input-title" style={h1Style}>{t("step2_title")}<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
          <Required />
          <p className="dark-input-subtitle" style={subtitleStyle}>{t("step2_sub")}</p>
          <div className="dark-input-wrapper">
            <input className="dark-input" style={inputStyle} placeholder={t("step2_placeholder")} value={answers.empfaenger ?? ""} onChange={(e) => setAnswer("empfaenger", e.target.value)} onKeyDown={inputKeyDown} enterKeyHint="next" onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")} />
          </div>
        </>);
      case 3:
        return (<>
          <h1 className="dark-input-title" style={h1Style}>{t("step3_title", { name: name || "..." })}<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
          <Required />
          <p className="dark-input-subtitle" style={subtitleStyle}>{t("step3_sub")}</p>
          <div className="dark-input-wrapper">
            <textarea className="dark-input" style={{ ...inputStyle, minHeight: 180, resize: "none" }} placeholder={t("step3_placeholder", { name: name || "..." })} value={answers.geschichte ?? ""} onChange={(e) => setAnswer("geschichte", e.target.value)} onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); handleNextRef.current(); } }} onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")} onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(0,0,0,0.8)")} />
          </div>
        </>);
      case 4:
        return (<>
          <h1 className="option-step-title" style={h1Style}>{t("step4_title", { name: name || "..." })}</h1>
          <p className="option-step-subtitle" style={subtitleStyle}>{t("step4_sub")}</p>
          <VerticalOptionSelector options={styles} selected={answers.klang ?? ""} onSelect={(v) => handleOptionAutoAdvance("klang", v, 5)} />
        </>);
      case 5:
        return (<>
          <h1 className="option-step-title" style={h1Style}>{t("step5_title")}</h1>
          <p className="option-step-subtitle" style={subtitleStyle}>{t("step5_sub", { name: name || "..." })}</p>
          <VerticalOptionSelector options={moods} selected={answers.stil ?? ""} onSelect={(v) => handleOptionAutoAdvance("stil", v, 6)} />
        </>);
      case 6:
        return (<>
          <h1 className="dark-input-title" style={h1Style}>{t("step7_title", { name: answers.name ? `, ${answers.name}` : "" })}<sup style={{ color: "#e53e3e", fontSize: "0.5em", verticalAlign: "super", marginLeft: 2 }}>*</sup></h1>
          <Required />
          <p className="dark-input-subtitle" style={subtitleStyle}>{t("step7_sub")}</p>
          <div className="dark-input-wrapper">
            <input type="email" className="dark-input" data-fb-disable-autotrack="true"
              style={{ ...inputStyle, border: emailError ? "1.5px solid #e53e3e" : "1.5px solid rgba(0,0,0,0.8)" }}
              placeholder={t("step7_email_placeholder")} value={answers.email ?? ""} enterKeyHint="next"
              onChange={(e) => { const v = e.target.value; setAnswers({ ...answers, email: v }); setEmailError(validateEmailFrontend(v)); setStepError(null); }}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleNextRef.current(); } }}
              onFocus={(e) => { if (!emailError) e.currentTarget.style.borderColor = "#1DB954"; }}
              onBlur={(e) => { setEmailError(validateEmailFrontend(e.target.value)); }}
            />
            {emailError && <p style={{ color: "#e53e3e", fontSize: "13px", marginTop: "6px" }}>{emailError}</p>}
            <div style={{ color: "#777", fontSize: 12, marginTop: 8 }}>{t("step7_no_spam")}</div>

            {/* Telefonnummer */}
            <div style={{ marginTop: 20 }}>
              <label style={{ display: "block", fontSize: 14, fontWeight: 600, color: "#1a1a1a", marginBottom: 6 }}>
                Telefonnummer<sup style={{ color: "#e53e3e", fontSize: "0.7em", verticalAlign: "super", marginLeft: 2 }}>*</sup>
              </label>
              <input
                type="tel"
                className="dark-input"
                style={{ ...inputStyle, border: phoneError ? "1.5px solid #e53e3e" : "1.5px solid rgba(0,0,0,0.8)" }}
                placeholder="+49 123 456 789"
                value={answers.phone ?? ""}
                enterKeyHint="done"
                onChange={(e) => { const val = e.target.value; setAnswers({ ...answers, phone: val }); setPhoneError(validatePhone(val)); setStepError(null); }}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleNextRef.current(); } }}
                onFocus={(e) => { if (!phoneError) e.currentTarget.style.borderColor = "#1DB954"; }}
                onBlur={(e) => { setPhoneError(validatePhone(e.target.value)); }}
              />
              {phoneError && <p style={{ color: "#e53e3e", fontSize: "13px", marginTop: "6px" }}>{phoneError}</p>}
              <div style={{ color: "#777", fontSize: 12, marginTop: 6 }}>Internationales Format, z.B. +49 170 1234567</div>
            </div>

            <div style={{ marginTop: 24, borderTop: "1px solid rgba(0,0,0,0.12)", paddingTop: 20 }}>
              <p style={{ fontSize: 11, color: "#555", margin: "0 0 12px 0", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.8px" }}>{t("step7_next_title")}</p>
              {[
                t("step7_next1", { name: name || "..." }),
                t("step7_next2"),
                t("step7_next3"),
              ].map((text, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8, fontSize: 13, color: "#1a1a1a" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#1DB954", flexShrink: 0, display: "inline-block" }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </>);
      default: return null;
    }
  }

  const h1Style: React.CSSProperties = { fontSize: 32, fontWeight: 800, color: "#1a1a1a", margin: "0 0 12px 0", lineHeight: 1.2, textAlign: "left" };
  const subtitleStyle: React.CSSProperties = { color: "#1a1a1a", fontSize: 16, margin: "0 0 32px 0", lineHeight: 1.6, textAlign: "left" };

  return (
    <>
      <div style={{ background: "#CCCCCC", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", position: "relative" }}>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes shake { 0%,100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-4px); } 80% { transform: translateX(4px); } }
          .step-content { animation: fadeIn 0.3s ease forwards; }
          .order-next-btn:hover { opacity: 0.88; transform: translateY(-1px); }
          .order-back-link:hover { color: #1a1a1a !important; }
          .step-error-shake { animation: shake 0.35s ease; }
          .option-grid { display: flex; flex-direction: column; }
          @media (min-width: 768px) {
            .step-content { margin: 0 auto; }
            .option-grid { display: grid !important; grid-template-columns: 1fr 1fr; gap: 12px; max-width: 600px; margin: 0 auto 40px; }
            .option-grid button { margin-bottom: 0; }
            .option-step-title { text-align: center !important; }
            .option-step-subtitle { text-align: center !important; }
            .dark-input-wrapper { max-width: 600px; margin: 0 auto 40px; }
            .dark-input-title { text-align: center !important; }
            .dark-input-subtitle { text-align: center !important; }
          }
          .dark-input::placeholder { color: rgba(255,255,255,0.5); }
        `}</style>

        {/* Progress Bar */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, background: "#e0e0e0", zIndex: 100 }}>
          <div style={{ height: "100%", background: "#1DB954", width: `${progress}%`, transition: "width 0.4s ease" }} />
        </div>

        {/* Header */}
        <div style={{ position: "fixed", top: 3, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "32px 24px", background: "#CCCCCC", zIndex: 99 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href={`/${locale}`} style={{ display: "flex" }}>
              <Image src="/logo.png" width={160} height={44} alt="Audynia" style={{ objectFit: "contain" }} />
            </a>
            {currentStep > 0 && (
              <button onClick={() => { setCurrentStep((prev) => Math.max(prev - 1, 0)); setStepError(null); setMicroFeedback(null); }} className="order-back-link"
                style={{ background: "none", border: "none", color: "#555", fontSize: 13, cursor: "pointer", padding: 0, transition: "color 0.15s" }}>
                {t("back")}
              </button>
            )}
          </div>
          <div style={{ fontSize: 12, color: "#777", fontWeight: 600 }}>{currentStep + 1} / {TOTAL_STEPS}</div>
        </div>

        {/* Step Content */}
        <div key={currentStep} className="step-content" style={{ maxWidth: 600, width: "100%", padding: "120px 24px 48px" }}>
          {renderStep()}
          {microFeedback && (
            <div style={{ background: "rgba(29,185,84,0.12)", border: "1px solid rgba(29,185,84,0.4)", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 14, color: "#1a7a35", fontWeight: 500, animation: "fadeIn 0.3s ease" }}>
              {microFeedback}
            </div>
          )}
          {stepError && (
            <div className="step-error-shake" style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(229,62,62,0.12)", border: "1px solid rgba(229,62,62,0.4)", borderRadius: 8, padding: "10px 14px", marginBottom: 8, fontSize: 14, color: "#c53030", fontWeight: 500 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c53030" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {stepError}
            </div>
          )}
          <button onClick={handleNext} disabled={loading || (currentStep === TOTAL_STEPS - 1 && (!!emailError || !answers.email || !!phoneError || !answers.phone))} className="order-next-btn"
            style={{ background: "#1DB954", color: "#000", border: "none", borderRadius: 500, padding: "16px 40px", minHeight: 52, fontWeight: 700, fontSize: 15, cursor: (loading || (currentStep === TOTAL_STEPS - 1 && (!!emailError || !answers.email || !!phoneError || !answers.phone))) ? "not-allowed" : "pointer", opacity: (loading || (currentStep === TOTAL_STEPS - 1 && (!!emailError || !answers.email || !!phoneError || !answers.phone))) ? 0.5 : 1, transition: "opacity 0.15s, transform 0.15s", display: "block", margin: "16px auto 0", position: "relative", zIndex: 10, touchAction: "manipulation" }}>
            {getCtaLabel()}
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 10 }}>
            {currentStep === 0 ? t("trust_step0") : t("trust_other")}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}
