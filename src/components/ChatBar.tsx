"use client";

import { useEffect, useRef, useState } from "react";
import { crispHandoff, loadCrisp } from "@/lib/crisp";

// ─── types ───────────────────────────────────────────────────────────────────

type Phase =
  | "idle"      // widget closed
  | "open"      // custom chat panel visible
  | "loading"   // user hit send, waiting for handoff
  | "done";     // crisp took over — unmount everything

// ─── component ───────────────────────────────────────────────────────────────

export default function ChatBar() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // ── silently pre-load Crisp after 5 s of idle time ──────────────────────
  // The script loads in the background; the widget stays hidden until handoff.
  useEffect(() => {
    const t = setTimeout(loadCrisp, 5_000);
    return () => clearTimeout(t);
  }, []);

  // ── focus the input whenever the panel opens ─────────────────────────────
  useEffect(() => {
    if (phase === "open") {
      const t = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // ── send handler ─────────────────────────────────────────────────────────
  const handleSend = () => {
    const text = input.trim();
    if (!text || phase === "loading") return;

    setInput("");
    setPhase("loading");

    // Brief pause so the UI doesn't feel like it snaps; then hand off to Crisp.
    setTimeout(() => {
      crispHandoff(text);

      // Give Crisp's widget a moment to animate in, then remove ours.
      setTimeout(() => setPhase("done"), 350);
    }, 450);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // After handoff Crisp owns the UI — nothing left to render
  if (phase === "done") return null;

  const panelVisible = phase === "open" || phase === "loading";
  const sending = phase === "loading";

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 20,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── global keyframes ── */}
      <style>{`
        @keyframes cb-pulse {
          0%   { transform: scale(1);   opacity: 1; }
          70%  { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes cb-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes cb-spin {
          to { transform: rotate(360deg); }
        }
        .cb-panel   { animation: cb-slide-up 0.2s ease; }
        .cb-btn:hover { transform: scale(1.06); }
        @media (max-width: 480px) {
          .cb-panel { width: 290px !important; right: 0 !important; }
        }
      `}</style>

      {/* ── chat panel ─────────────────────────────────────────────────────── */}
      {panelVisible && (
        <div
          className="cb-panel"
          style={{
            width: 320,
            marginBottom: 12,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "0 8px 40px rgba(0,0,0,0.14)",
            overflow: "hidden",
          }}
        >
          {/* header */}
          <div
            style={{
              background: "#1DB954",
              padding: "13px 14px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            {/* avatar */}
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 16,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              L
            </div>

            {/* name + status */}
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                Lisa
              </div>
              <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 11.5, marginTop: 1 }}>
                ● Online · antwortet sofort
              </div>
            </div>

            {/* close */}
            <button
              onClick={() => setPhase("idle")}
              aria-label="Schließen"
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: 20,
                lineHeight: 1,
                opacity: 0.75,
                padding: "2px 4px",
              }}
            >
              ×
            </button>
          </div>

          {/* greeting bubble */}
          <div style={{ padding: "14px 14px 10px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#f1f0f0",
                borderRadius: "4px 14px 14px 14px",
                padding: "10px 13px",
                fontSize: 13.5,
                color: "#1a1a1a",
                lineHeight: 1.5,
                maxWidth: "88%",
              }}
            >
              Hi! Wie kann ich dir helfen?<br />
              Schreib mir einfach 😊
            </div>
          </div>

          {/* input row */}
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              padding: "9px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Nachricht schreiben…"
              disabled={sending}
              style={{
                flex: 1,
                border: "1.5px solid #e6e6e6",
                borderRadius: 22,
                padding: "8px 13px",
                fontSize: 13.5,
                outline: "none",
                fontFamily: "inherit",
                color: "#1a1a1a",
                background: sending ? "#f8f8f8" : "#fff",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#1DB954")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#e6e6e6")}
            />

            {/* send button */}
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              aria-label="Senden"
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "none",
                cursor: input.trim() && !sending ? "pointer" : "default",
                background: input.trim() && !sending ? "#1DB954" : "#ebebeb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
            >
              {sending ? (
                <div
                  style={{
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(0,0,0,0.12)",
                    borderTop: "2px solid #888",
                    borderRadius: "50%",
                    animation: "cb-spin 0.6s linear infinite",
                  }}
                />
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13"
                    stroke={input.trim() ? "#fff" : "#bbb"}
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <path
                    d="M22 2L15 22L11 13L2 9L22 2Z"
                    stroke={input.trim() ? "#fff" : "#bbb"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── floating logo (no frame) ──────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <style>{`
          @keyframes wa-wiggle {
            0%,55%,100% { transform: rotate(0deg) scale(1); }
            60%          { transform: rotate(-14deg) scale(1.08); }
            65%          { transform: rotate(14deg) scale(1.08); }
            70%          { transform: rotate(-10deg) scale(1.05); }
            75%          { transform: rotate(10deg) scale(1.05); }
            80%          { transform: rotate(-5deg) scale(1.02); }
            85%          { transform: rotate(0deg) scale(1); }
          }
        `}</style>

        <div style={{ position: "relative", cursor: "pointer" }}
          onClick={() => setPhase((p) => (p === "idle" ? "open" : "idle"))}>

          {/* WhatsApp logo — animated when closed, × when open */}
          {panelVisible ? (
            <div style={{
              width: 60, height: 60, borderRadius: "50%",
              background: "#1DB954",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.17)",
            }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 24, lineHeight: 1, userSelect: "none" }}>×</span>
            </div>
          ) : (
            <svg
              width="60"
              height="60"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                display: "block",
                animation: "wa-wiggle 3.5s ease-in-out infinite",
                filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
              }}
            >
              <rect width="48" height="48" rx="24" fill="#25D366"/>
              <path d="M34.5 13.5C32.1 11.1 28.95 9.75 25.65 9.75C18.75 9.75 13.2 15.3 13.2 22.2C13.2 24.45 13.8 26.55 14.85 28.35L13.05 34.95L19.8 33.15C21.525 34.125 23.55 34.65 25.65 34.65C32.55 34.65 38.1 29.1 38.1 22.2C38.1 18.9 36.9 15.9 34.5 13.5ZM25.65 32.55C23.775 32.55 21.975 32.025 20.4 31.125L20.025 30.9L16.05 31.95L17.1 28.05L16.875 27.675C15.9 26.025 15.3 24.15 15.3 22.2C15.3 16.425 20.025 11.85 25.65 11.85C28.425 11.85 31.05 12.975 32.925 14.925C34.875 16.8 35.925 19.425 35.925 22.2C36 27.975 31.35 32.55 25.65 32.55ZM31.275 24.825C30.975 24.675 29.475 23.925 29.175 23.85C28.875 23.7 28.65 23.7 28.5 24C28.35 24.3 27.675 25.05 27.525 25.275C27.375 25.5 27.15 25.5 26.85 25.35C25.275 24.6 24.225 24 23.175 22.275C22.875 21.75 23.625 21.825 24.225 20.55C24.375 20.4 24.3 20.175 24.225 20.025C24.15 19.875 23.4 18.375 23.175 17.7C22.95 17.1 22.65 17.175 22.5 17.175C22.35 17.175 22.125 17.175 21.9 17.175C21.675 17.175 21.3 17.25 21 17.55C20.7 17.85 19.8 18.675 19.8 20.175C19.8 21.675 21.075 23.1 21.225 23.325C21.375 23.55 23.4 26.7 26.475 28.05C28.5 28.95 29.325 29.025 30.375 28.875C31.05 28.8 32.4 28.05 32.7 27.225C33 26.4 33 25.725 32.85 25.575C32.775 25.2 32.55 25.05 31.275 24.825Z" fill="white"/>
            </svg>
          )}

          {/* online dot */}
          {!panelVisible && (
            <span style={{
              position: "absolute",
              top: 2, right: 2,
              width: 14, height: 14,
              background: "#25D366",
              border: "2.5px solid #fff",
              borderRadius: "50%",
              pointerEvents: "none",
            }} />
          )}
        </div>

        {/* "Online" pill */}
        {!panelVisible && (
          <span style={{
            background: "#25D366",
            color: "#fff",
            borderRadius: 500,
            fontSize: 10,
            fontWeight: 600,
            padding: "2px 9px",
            whiteSpace: "nowrap",
          }}>
            Online
          </span>
        )}
      </div>
    </div>
  );
}
