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
  const [showBubble, setShowBubble] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── silently pre-load Crisp after 5 s of idle time ──────────────────────
  useEffect(() => {
    const t = setTimeout(loadCrisp, 5_000);
    return () => clearTimeout(t);
  }, []);

  // ── auto-show welcome bubble once per session after 4 s ──────────────────
  useEffect(() => {
    if (sessionStorage.getItem("audynia_bubble_shown")) return;
    const t = setTimeout(() => {
      setShowBubble(true);
      sessionStorage.setItem("audynia_bubble_shown", "1");
    }, 4_000);
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

      {/* ── bubble + button row ──────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 10 }}>

        {/* welcome bubble — links neben dem Button */}
        {showBubble && !panelVisible && (
          <div
            onClick={() => { setShowBubble(false); setPhase("open"); }}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
              width: 240,
              overflow: "hidden",
              animation: "cb-slide-up 0.35s ease",
              cursor: "pointer",
            }}
          >
            {/* header */}
            <div style={{
              background: "#1DB954",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 9,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,0.22)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 14, color: "#fff", flexShrink: 0,
              }}>L</div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, lineHeight: 1.2 }}>Lisa</div>
                <div style={{ color: "rgba(255,255,255,0.82)", fontSize: 11 }}>● Online · antwortet sofort</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1,
                  padding: "2px 4px",
                }}
              >×</button>
            </div>

            {/* message */}
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{
                display: "inline-block",
                background: "#f1f0f0",
                borderRadius: "4px 14px 14px 14px",
                padding: "9px 13px",
                fontSize: 13.5,
                color: "#1a1a1a",
                lineHeight: 1.5,
              }}>
                Hey, lass uns deinen Song zusammen erstellen! 🎵
              </div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 5, textAlign: "right" }}>
                Jetzt antworten →
              </div>
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
          onClick={() => { setShowBubble(false); setPhase((p) => (p === "idle" ? "open" : "idle")); }}>

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
            <div style={{
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "wa-wiggle 3.5s ease-in-out infinite",
              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))",
            }}>
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  fill="white"
                />
              </svg>
            </div>
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
      </div> {/* end bubble + button row */}
    </div>
  );
}
