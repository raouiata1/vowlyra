"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Footer from "@/components/Footer";

function fadeIn(delay: string): React.CSSProperties {
  return { animation: "fadeUp 0.5s ease forwards", animationDelay: delay, opacity: 0 };
}

function PurchaseEvent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (sessionStorage.getItem("purchase_fired")) return;

    const order_id = searchParams.get("order_id") ?? undefined;
    const plan = searchParams.get("plan") ?? "standard";
    const value = plan === "express" ? 34.99 : 29.99;

    fetch("/api/capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "Purchase",
        eventId: crypto.randomUUID(),
        url: window.location.href,
        customData: { value, currency: "EUR", content_type: "product", order_id },
      }),
    });

    sessionStorage.setItem("purchase_fired", "1");
  }, [searchParams]);

  return null;
}

export default function DankePage() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("vowlyra_email");
    if (stored) setEmail(stored);
  }, []);

  return (
    <>
      <Suspense fallback={null}><PurchaseEvent /></Suspense>
      <div style={{ background: "#F5F5F7", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <style>{`
          @keyframes checkIn {
            0%   { transform: scale(0); }
            70%  { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.5; }
            50%       { transform: scale(1.5); opacity: 0; }
          }
        `}</style>

        {/* Header */}
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#F5F5F7", padding: "20px 24px", zIndex: 99, borderBottom: "0.5px solid #e0e0e0" }}>
          <a href="/" style={{ display: "inline-flex" }}>
            <Image src="/logo.png" width={120} height={38} alt="Audynia" style={{ objectFit: "contain" }} />
          </a>
        </div>

        {/* Main */}
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px" }}>

          {/* Checkmark */}
          <div style={{ width: 88, height: 88, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkIn 0.5s ease-out forwards", boxShadow: "0 8px 32px rgba(29,185,84,0.35)" }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: 34, fontWeight: 800, color: "#1a1a1a", marginTop: 28, marginBottom: 0, textAlign: "center", lineHeight: 1.2, ...fadeIn("0.2s") }}>
            Zahlung erfolgreich!
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 16, color: "#555", textAlign: "center", maxWidth: 460, lineHeight: 1.7, marginTop: 14, marginBottom: 0, ...fadeIn("0.35s") }}>
            Danke für dein Vertrauen. Dein vollständiger Song wird gerade für dich vorbereitet und in wenigen Minuten an deine E-Mail gesendet.
          </p>

          {/* Email Card */}
          {email && (
            <div style={{ background: "#fff", borderRadius: 14, padding: "16px 20px", marginTop: 28, maxWidth: 420, width: "100%", border: "1.5px solid #1DB954", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 2px 12px rgba(29,185,84,0.1)", ...fadeIn("0.5s") }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(29,185,84,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Song kommt per E-Mail</div>
                <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>{email}</div>
              </div>
            </div>
          )}

          {/* Steps */}
          <div style={{ width: "100%", maxWidth: 420, marginTop: 36, display: "flex", flexDirection: "column", gap: 0, ...fadeIn("0.65s") }}>
            {[
              { icon: "✓", label: "Zahlung bestätigt", sub: "Deine Zahlung wurde erfolgreich verarbeitet", done: true },
              { icon: "⚡", label: "Song wird geliefert", sub: "Vollständige MP3 kommt in wenigen Minuten", done: false },
              { icon: "🎵", label: "Song genießen", sub: "Teile ihn mit deinen Liebsten", done: false },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{
                    position: "relative", width: 28, height: 28, borderRadius: "50%",
                    background: step.done ? "#1DB954" : "#e0e0e0",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    fontSize: 12, fontWeight: 700,
                    color: step.done ? "#fff" : "#999",
                  }}>
                    {step.done && (
                      <span style={{ position: "absolute", width: 28, height: 28, borderRadius: "50%", background: "#1DB954", animation: "pulse 1.8s infinite" }} />
                    )}
                    <span style={{ position: "relative", zIndex: 1 }}>{step.done ? "✓" : (i + 1)}</span>
                  </div>
                  {i < 2 && <div style={{ width: 2, flex: 1, background: "#e0e0e0", minHeight: 28, margin: "4px 0" }} />}
                </div>
                <div style={{ paddingBottom: i < 2 ? 24 : 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: step.done ? "#1a1a1a" : "#aaa" }}>{step.label}</div>
                  <div style={{ fontSize: 13, color: step.done ? "#555" : "#bbb", marginTop: 2 }}>{step.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div style={{ background: "#fff", border: "0.5px solid #e0e0e0", borderRadius: 14, padding: "20px 24px", maxWidth: 420, width: "100%", marginTop: 28, ...fadeIn("0.8s") }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 10 }}>Was jetzt passiert:</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                "Dein vollständiger Song (ca. 3 Min.) wird erstellt",
                "Du erhältst ihn als hochwertige MP3 per E-Mail",
                "Du kannst ihn unbegrenzt teilen & herunterladen",
              ].map((item, i) => (
                <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#555" }}>
                  <span style={{ color: "#1DB954", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Back to home */}
          <a
            href="/"
            style={{ marginTop: 36, fontSize: 14, color: "#999", textDecoration: "none", borderBottom: "1px solid #ddd", paddingBottom: 2, ...fadeIn("1s") }}
          >
            Zurück zur Startseite
          </a>

        </div>
      </div>
      <Footer />
    </>
  );
}
