"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const WA_LINK =
  "https://wa.me/WHATSAPP_NUMBER?text=Hallo%2C%20ich%20habe%20gerade%20meinen%20Song%20bestellt!";

const TOTAL_SECONDS = 1200; // 20 minutes
const CIRCUMFERENCE = 340;

const STATUS_LABELS = [
  { until: 300,  text: "Lyrics werden generiert..." },
  { until: 600,  text: "Musik wird komponiert..." },
  { until: 900,  text: "Song wird gemischt..." },
  { until: 1200, text: "Trailer wird vorbereitet..." },
];

const TIMELINE = [
  { active: true,  title: "Trailer wird erstellt",  sub: "In ~2 Minuten in deinem Postfach" },
  { active: false, title: "Trailer anhören",         sub: "Kostenlos & unverbindlich" },
  { active: false, title: "Song freischalten",       sub: "Nur wenn du begeistert bist · 29,99€" },
];

function getRandomCount() {
  return Math.floor(Math.random() * 4) + 2;
}

function fadeIn(delay: string): React.CSSProperties {
  return { animation: "fadeUp 0.5s ease forwards", animationDelay: delay, opacity: 0 };
}

function formatTime(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function SuccessPage() {
  const [elapsed, setElapsed]       = useState(0);
  const [liveCount, setLiveCount]   = useState(getRandomCount());
  const [email, setEmail]           = useState("");
  const [labelKey, setLabelKey]     = useState(0);
  const [showPopup, setShowPopup]   = useState(false);
  const [showTyping, setShowTyping] = useState(false);
  const [showMsg2, setShowMsg2]     = useState(false);
  const [chatTime]                  = useState(() => {
    const now = new Date();
    return `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
  });

  useEffect(() => {
    const stored = sessionStorage.getItem("vowlyra_email");
    if (stored) setEmail(stored);

    const timer   = setInterval(() => setElapsed((e) => Math.min(e + 1, TOTAL_SECONDS)), 1000);
    const counter = setInterval(() => setLiveCount(getRandomCount()), 8000);
    const popup   = setTimeout(() => {
      setShowPopup(true);
      setTimeout(() => setShowTyping(true), 200);
      setTimeout(() => { setShowTyping(false); setShowMsg2(true); }, 1700);
    }, 2000);
    return () => { clearInterval(timer); clearInterval(counter); clearTimeout(popup); };
  }, []);

  const remaining      = TOTAL_SECONDS - elapsed;
  const done           = remaining === 0;
  const dashOffset     = done ? 0 : CIRCUMFERENCE * (1 - elapsed / TOTAL_SECONDS);
  const currentLabel   = STATUS_LABELS.find((l) => elapsed < l.until)?.text ?? "Trailer wird vorbereitet...";

  // trigger label fade on change
  useEffect(() => { setLabelKey((k) => k + 1); }, [currentLabel]);

  return (
    <div style={{ background: "#CCCCCC", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
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
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes activePulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.5); opacity: 0; }
        }
        @keyframes confettiRise {
          0%   { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-60px) scale(0.5); opacity: 0; }
        }
        @keyframes whatsapp-pulse {
          0%   { transform: scale(1); opacity: 1; }
          70%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        .wa-tooltip {
          opacity: 0;
          pointer-events: none;
          transform: translateX(-6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .wa-tooltip.visible {
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }
        @keyframes slideInLeft {
          from { transform: translateX(-120%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-4px); }
        }
        .wa-chat-popup {
          animation: slideInLeft 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .status-label {
          animation: fadeIn 0.5s ease forwards;
        }
        .confetti-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #1DB954;
          position: absolute;
          animation: confettiRise 1.2s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#CCCCCC", padding: "20px 24px", zIndex: 99 }}>
        <Image src="/logo.png" width={120} height={38} alt="Vowlyra" style={{ objectFit: "contain" }} />
      </div>

      {/* Main Content */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px" }}>

        {/* Live Counter Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(29,185,84,0.1)", border: "0.5px solid #1DB954", borderRadius: 500, padding: "6px 14px", fontSize: 12, color: "#1a7a35", marginBottom: 32, ...fadeIn("0s") }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1DB954", display: "inline-block", animation: "activePulse 1.5s infinite" }} />
          {liveCount} Songs werden gerade erstellt
        </div>

        {/* Checkmark Circle */}
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkIn 0.5s ease-out forwards" }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a", marginTop: 24, marginBottom: 0, textAlign: "center", lineHeight: 1.2, ...fadeIn("0.2s") }}>
          Dein Song wird erstellt
        </h1>

        {/* Subtitle */}
        <p style={{ fontSize: 16, color: "#777", textAlign: "center", maxWidth: 480, lineHeight: 1.6, marginTop: 12, marginBottom: 0, ...fadeIn("0.4s") }}>
          Das Vowlyra-Team arbeitet gerade an deinem persönlichen Song. Du erhältst deinen exklusiven Trailer in wenigen Minuten per E-Mail.
        </p>

        {/* Circle Timer */}
        <div style={{ marginTop: 32, display: "flex", flexDirection: "column", alignItems: "center", ...fadeIn("0.6s") }}>
          <p style={{ fontSize: 13, color: "#777", textAlign: "center", marginBottom: 16, margin: "0 0 16px" }}>
            Dein persönlicher Song wird gerade erstellt
          </p>

          {/* SVG Circle */}
          <div style={{ position: "relative", width: 120, height: 120 }}>
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
              {/* Background circle */}
              <circle cx="60" cy="60" r="54" fill="none" stroke="#e0e0e0" strokeWidth="6" />
              {/* Progress circle */}
              <circle
                cx="60" cy="60" r="54"
                fill="none"
                stroke="#1DB954"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: "stroke-dashoffset 1s linear" }}
              />
            </svg>
            {/* Center text */}
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              {done ? (
                <span style={{ fontSize: 22, fontWeight: 800, color: "#1DB954" }}>Fertig!</span>
              ) : (
                <>
                  <span style={{ fontSize: 22, fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>
                    {formatTime(remaining)}
                  </span>
                  <span style={{ fontSize: 10, color: "#777", marginTop: 3 }}>verbleibend</span>
                </>
              )}
            </div>
            {/* Confetti on done */}
            {done && (
              <>
                <div className="confetti-dot" style={{ left: 20, top: 30, animationDelay: "0s" }} />
                <div className="confetti-dot" style={{ left: 50, top: 10, animationDelay: "0.15s", background: "#25D366" }} />
                <div className="confetti-dot" style={{ left: 80, top: 25, animationDelay: "0.3s" }} />
                <div className="confetti-dot" style={{ left: 65, top: 15, animationDelay: "0.1s", background: "#81C784" }} />
              </>
            )}
          </div>

          {/* Status text */}
          <div key={labelKey} className="status-label" style={{ marginTop: 16, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#1DB954", fontWeight: 600 }}>
              {done ? "Dein Trailer ist in deinem Postfach!" : currentLabel}
            </div>
            {!done && (
              <div style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
                Wir geben unser Bestes für deinen Song
              </div>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ width: "100%", maxWidth: 400, marginTop: 32, ...fadeIn("0.8s") }}>
          {TIMELINE.map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: 24, height: 24, borderRadius: "50%", background: step.active ? "#1DB954" : "#ddd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {step.active && <span style={{ position: "absolute", width: 24, height: 24, borderRadius: "50%", background: "#1DB954", animation: "activePulse 1.5s infinite" }} />}
                  {step.active ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#bbb" }} />
                  )}
                </div>
                {i < TIMELINE.length - 1 && <div style={{ width: 2, flex: 1, background: "#ddd", minHeight: 32, margin: "4px 0" }} />}
              </div>
              <div style={{ paddingBottom: i < TIMELINE.length - 1 ? 28 : 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: step.active ? "#1a1a1a" : "#aaa" }}>{step.title}</div>
                <div style={{ fontSize: 13, color: step.active ? "#555" : "#bbb", marginTop: 2 }}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Email Card */}
        {email && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", marginTop: 24, maxWidth: 400, width: "100%", border: "1.5px solid #1DB954", display: "flex", alignItems: "center", gap: 12, ...fadeIn("1s") }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>Schau in dein Postfach!</div>
              <div style={{ fontSize: 13, color: "#555", marginTop: 2 }}>Dein Trailer kommt an: {email}</div>
            </div>
          </div>
        )}

      </div>

      {/* WhatsApp Chat Popup – fixed bottom-right */}
      {showPopup && (
        <div
          className="wa-chat-popup"
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 60, width: 300, background: "#fff", borderRadius: 16, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", overflow: "hidden", fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {/* Header */}
          <div style={{ background: "#075E54", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 700, flexShrink: 0 }}>D</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>Dani</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, display: "flex", alignItems: "center", gap: 4 }}>
                tippt gerade
                <span style={{ display: "inline-flex", gap: 3, alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.7)", display: "inline-block", animation: "bounce 0.9s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
                  ))}
                </span>
              </div>
            </div>
            <button onClick={() => setShowPopup(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 18, cursor: "pointer", padding: 0, lineHeight: 1 }}>✕</button>
          </div>

          {/* Chat area */}
          <div style={{ background: "#ECE5DD", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
            {/* Message 1 */}
            <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 12px", maxWidth: 220, alignSelf: "flex-start" }}>
              <div style={{ fontSize: 13, color: "#1a1a1a" }}>Hi! Ich bin Dani 👋</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 4 }}>
                <span style={{ fontSize: 10, color: "#999" }}>{chatTime}</span>
                <span style={{ fontSize: 11, color: "#4FC3F7", fontWeight: 700 }}>✓✓</span>
              </div>
            </div>

            {/* Typing indicator */}
            {showTyping && (
              <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "10px 14px", alignSelf: "flex-start", display: "flex", gap: 4, alignItems: "center" }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#999", display: "inline-block", animation: "bounce 0.9s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            )}

            {/* Message 2 */}
            {showMsg2 && (
              <div style={{ background: "#fff", borderRadius: "8px 8px 8px 0", padding: "8px 12px", maxWidth: 240, alignSelf: "flex-start" }}>
                <div style={{ fontSize: 13, color: "#1a1a1a", lineHeight: 1.5 }}>Ich erstelle gerade deinen persönlichen Song-Trailer 🎵 Schreib mir kurz – ich passe alles genau auf dich an!</div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 4 }}>
                  <span style={{ fontSize: 10, color: "#999" }}>{chatTime}</span>
                  <span style={{ fontSize: 11, color: "#4FC3F7", fontWeight: 700 }}>✓✓</span>
                </div>
              </div>
            )}
          </div>

          {/* Reply Button */}
          <a
            href="https://wa.me/WHATSAPP_NUMBER?text=Hi%20Dani!%20Ich%20habe%20gerade%20meinen%20Song%20bestellt."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setShowPopup(false)}
            style={{ display: "block", background: "#25D366", color: "#fff", fontWeight: 700, padding: "12px 16px", textAlign: "center", fontSize: 14, textDecoration: "none" }}
          >
            Jetzt antworten auf WhatsApp →
          </a>
        </div>
      )}

    </div>
  );
}
