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

      {/* ── floating button ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        {/* wrapper: relative so online-dot can escape overflow:hidden */}
        <div style={{ position: "relative", width: 56, height: 56 }}>
          <button
            className="cb-btn"
            onClick={() => setPhase((p) => (p === "idle" ? "open" : "idle"))}
            aria-label={panelVisible ? "Chat schließen" : "Chat öffnen"}
            style={{
              position: "relative",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#1DB954",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              boxShadow: "0 4px 20px rgba(0,0,0,0.17)",
              transition: "transform 0.15s",
            }}
          >
            {/* pulse ring — only when chat is closed */}
            {!panelVisible && (
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#1DB954",
                  animation: "cb-pulse 2.2s ease-out infinite",
                  zIndex: 0,
                }}
              />
            )}

            {/* WhatsApp logo with mix-blend transparent */}
            {!panelVisible && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="https://media.vowlyra.com/whatsapp_logo.png"
                alt="WhatsApp"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  mixBlendMode: "multiply",
                  zIndex: 1,
                }}
              />
            )}

            {/* × when open */}
            {panelVisible && (
              <span
                style={{
                  position: "relative",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 22,
                  lineHeight: 1,
                  userSelect: "none",
                  zIndex: 2,
                }}
              >
                ×
              </span>
            )}
          </button>

          {/* online dot — outside button so it's not clipped */}
          {!panelVisible && (
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                width: 14,
                height: 14,
                background: "#25D366",
                border: "2.5px solid #fff",
                borderRadius: "50%",
                zIndex: 10,
                pointerEvents: "none",
              }}
            />
          )}
        </div>

        {/* "Online" pill */}
        {!panelVisible && (
          <span
            style={{
              background: "#25D366",
              color: "#fff",
              borderRadius: 500,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 9px",
              whiteSpace: "nowrap",
            }}
          >
            Online
          </span>
        )}
      </div>
    </div>
  );
}
