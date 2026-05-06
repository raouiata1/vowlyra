"use client";

import { useEffect, useRef, useState } from "react";
import { loadCrisp } from "@/lib/crisp";

// ─── types ───────────────────────────────────────────────────────────────────

type Message = {
  id: number;
  from: "user" | "agent";
  text: string;
};

// ─── component ───────────────────────────────────────────────────────────────

export default function ChatBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, from: "agent", text: "Hi! Wie kann ich dir helfen?\nSchreib mir einfach 😊" },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const listenerSetRef = useRef(false);

  // ── lazily pre-load Crisp + set up message listener ─────────────────────
  useEffect(() => {
    const setup = () => {
      if (typeof window === "undefined") return;

      // Ensure $crisp queue exists before Crisp script runs
      if (!window.$crisp) window.$crisp = [];

      // Listen for agent replies — display them in our panel
      if (!listenerSetRef.current) {
        window.$crisp.push([
          "on",
          "message:received",
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (data: any) => {
            const text =
              data?.content ||
              data?.message ||
              (typeof data === "string" ? data : "");
            if (text) {
              setMessages((prev) => [
                ...prev,
                { id: Date.now(), from: "agent", text },
              ]);
            }
          },
        ]);
        listenerSetRef.current = true;
      }
    };

    setup();
    // Pre-load Crisp after 5 s of idle
    const t = setTimeout(() => {
      loadCrisp();
      setup(); // re-run after Crisp initialises
    }, 5_000);

    return () => clearTimeout(t);
  }, []);

  // ── auto-show welcome bubble once per session ────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem("audynia_bubble_shown")) return;
    const t = setTimeout(() => {
      setShowBubble(true);
      sessionStorage.setItem("audynia_bubble_shown", "1");
    }, 4_000);
    return () => clearTimeout(t);
  }, []);

  // ── focus input when panel opens ─────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 180);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // ── scroll to bottom on new messages ────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // ── send handler ─────────────────────────────────────────────────────────
  const handleSend = () => {
    const text = input.trim();
    if (!text || sending) return;

    const userMsg: Message = { id: Date.now(), from: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    // Ensure Crisp is loaded, then send silently (widget stays hidden)
    loadCrisp();
    setTimeout(() => {
      try {
        if (window.$crisp) {
          window.$crisp.push(["do", "message:send", ["text", text]]);
          // Keep Crisp widget hidden — all conversation stays in our panel
          window.$crisp.push(["do", "chat:hide"]);
        }
      } catch (_) {
        // ignore if Crisp isn't ready yet
      }
      setSending(false);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  // ── render ───────────────────────────────────────────────────────────────
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 16,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* ── keyframes ── */}
      <style>{`
        @keyframes cb-pulse {
          0%   { transform: scale(1);   opacity: 1; }
          70%  { transform: scale(1.6); opacity: 0; }
          100% { transform: scale(1.6); opacity: 0; }
        }
        @keyframes cb-slide-up {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes cb-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes cb-bounce-in {
          0%   { transform: scale(0.85); opacity: 0; }
          60%  { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1);   opacity: 1; }
        }
        .cb-panel       { animation: cb-slide-up 0.22s ease; }
        .cb-bubble-card { animation: cb-slide-up 0.3s ease; }
        .cb-fab:hover   { transform: scale(1.07) !important; }
        .cb-fab:active  { transform: scale(0.96) !important; }
        .cb-msg-user    { animation: cb-bounce-in 0.2s ease; }
        .cb-msg-agent   { animation: cb-bounce-in 0.2s ease; }
        @media (max-width: 480px) {
          .cb-panel { width: calc(100vw - 32px) !important; right: 0 !important; max-height: calc(100vh - 100px) !important; }
          .cb-bubble-card { width: 200px !important; }
        }
      `}</style>

      {/* ── chat panel ─────────────────────────────────────────────────────── */}
      {isOpen && (
        <div
          className="cb-panel"
          style={{
            width: 340,
            marginBottom: 14,
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 12px 50px rgba(0,0,0,0.16)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            maxHeight: "calc(100vh - 130px)",
          }}
        >
          {/* header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1DB954, #0fa847)",
              padding: "14px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
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
            <div style={{ flex: 1 }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>
                Lisa · Audynia Support
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <span style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: "#fff", display: "inline-block",
                  boxShadow: "0 0 0 2px rgba(255,255,255,0.35)",
                }} />
                <span style={{ color: "rgba(255,255,255,0.88)", fontSize: 11.5 }}>
                  Online · antwortet sofort
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Schließen"
              style={{
                background: "rgba(255,255,255,0.18)",
                border: "none",
                color: "#fff",
                cursor: "pointer",
                fontSize: 18,
                lineHeight: 1,
                padding: "4px 7px",
                borderRadius: 8,
                transition: "background 0.15s",
              }}
            >
              ×
            </button>
          </div>

          {/* messages area */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              minHeight: 0,
              padding: "14px 14px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg) =>
              msg.from === "agent" ? (
                <div key={msg.id} className="cb-msg-agent" style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                  {/* agent avatar */}
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "linear-gradient(135deg, #1DB954, #0fa847)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontWeight: 700, fontSize: 11, color: "#fff", flexShrink: 0,
                  }}>L</div>
                  <div
                    style={{
                      background: "#f1f0f0",
                      borderRadius: "4px 14px 14px 14px",
                      padding: "10px 13px",
                      fontSize: 13.5,
                      color: "#1a1a1a",
                      lineHeight: 1.55,
                      maxWidth: "78%",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={msg.id} className="cb-msg-user" style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div
                    style={{
                      background: "linear-gradient(135deg, #1DB954, #0fa847)",
                      borderRadius: "14px 14px 4px 14px",
                      padding: "10px 13px",
                      fontSize: 13.5,
                      color: "#fff",
                      lineHeight: 1.55,
                      maxWidth: "78%",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              )
            )}

            {/* typing indicator while sending */}
            {sending && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: "linear-gradient(135deg, #1DB954, #0fa847)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 700, fontSize: 11, color: "#fff", flexShrink: 0,
                }}>L</div>
                <div style={{
                  background: "#f1f0f0",
                  borderRadius: "4px 14px 14px 14px",
                  padding: "12px 16px",
                  display: "flex", gap: 5, alignItems: "center",
                }}>
                  {[0, 1, 2].map((i) => (
                    <span key={i} style={{
                      width: 7, height: 7, borderRadius: "50%",
                      background: "#bbb",
                      display: "inline-block",
                      animation: `cb-pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* input row */}
          <div
            style={{
              borderTop: "1px solid #f0f0f0",
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              flexShrink: 0,
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
                padding: "9px 14px",
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
            <button
              onClick={handleSend}
              disabled={!input.trim() || sending}
              aria-label="Senden"
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: "none",
                cursor: input.trim() && !sending ? "pointer" : "default",
                background:
                  input.trim() && !sending
                    ? "linear-gradient(135deg, #1DB954, #0fa847)"
                    : "#ebebeb",
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
                  <path d="M22 2L11 13" stroke={input.trim() ? "#fff" : "#bbb"} strokeWidth="2" strokeLinecap="round" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={input.trim() ? "#fff" : "#bbb"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      {/* ── welcome bubble + FAB ─────────────────────────────────────────── */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 0 }}>

        {/* welcome bubble */}
        {showBubble && !isOpen && (
          <div
            className="cb-bubble-card"
            onClick={() => { setShowBubble(false); setIsOpen(true); }}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 6px 28px rgba(0,0,0,0.14)",
              border: "1px solid #efefef",
              width: 210,
              marginBottom: 76,
              cursor: "pointer",
              overflow: "hidden",
            }}
          >
            <div style={{ height: 3, background: "linear-gradient(90deg, #1DB954, #0fa847)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px 6px" }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "linear-gradient(135deg, #1DB954, #0fa847)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 12, color: "#fff", flexShrink: 0,
              }}>L</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12.5, color: "#1a1a1a", lineHeight: 1.2 }}>Lisa</div>
                <div style={{ fontSize: 10.5, color: "#1DB954", fontWeight: 600 }}>● Online</div>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                style={{
                  marginLeft: "auto", background: "none", border: "none",
                  cursor: "pointer", color: "#bbb", fontSize: 16, lineHeight: 1,
                  padding: "2px 4px",
                }}
              >×</button>
            </div>
            <div style={{ padding: "0 12px 12px", fontSize: 13, color: "#1a1a1a", lineHeight: 1.55 }}>
              Hey! Fragen zu deinem Song? Ich helfe dir gerne 🎵
            </div>
          </div>
        )}

        {/* ── FAB (floating action button) ─────────────────────────────── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
          <div
            className="cb-fab"
            role="button"
            aria-label="Chat öffnen"
            onClick={() => { setShowBubble(false); setIsOpen((o) => !o); }}
            style={{
              position: "relative",
              width: 60,
              height: 60,
              borderRadius: "50%",
              background: isOpen
                ? "#1a1a1a"
                : "linear-gradient(135deg, #1DB954, #0fa847)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 6px 24px rgba(29,185,84,0.45)",
              transition: "background 0.2s, transform 0.15s, box-shadow 0.2s",
              userSelect: "none",
            }}
          >
            {isOpen ? (
              /* Close × */
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 26, lineHeight: 1 }}>×</span>
            ) : (
              /* Stylish chat-music icon */
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Speech bubble */}
                <path
                  d="M15 4C9.477 4 5 8.03 5 13c0 2.56 1.15 4.88 3 6.54V23l4.08-2.04A11.8 11.8 0 0 0 15 21c5.523 0 10-4.03 10-9s-4.477-9-10-9z"
                  fill="rgba(255,255,255,0.95)"
                />
                {/* Music note */}
                <path
                  d="M18 9.5v5.25a1.75 1.75 0 1 1-1.5-1.72V10.3l-3 .75v4.7a1.75 1.75 0 1 1-1.5-1.72V9.5L18 9.5z"
                  fill="#1DB954"
                />
              </svg>
            )}

            {/* online pulse dot */}
            {!isOpen && (
              <>
                <span style={{
                  position: "absolute",
                  top: 3, right: 3,
                  width: 13, height: 13,
                  background: "#fff",
                  border: "2.5px solid #1DB954",
                  borderRadius: "50%",
                  zIndex: 1,
                }} />
                <span style={{
                  position: "absolute",
                  top: 3, right: 3,
                  width: 13, height: 13,
                  background: "rgba(255,255,255,0.5)",
                  borderRadius: "50%",
                  animation: "cb-pulse 2s ease-out infinite",
                }} />
              </>
            )}
          </div>

          {/* label */}
          {!isOpen && (
            <span style={{
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: 500,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 9px",
              whiteSpace: "nowrap",
              letterSpacing: "0.3px",
            }}>
              Frag uns
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
