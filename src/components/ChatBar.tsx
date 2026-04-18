"use client";

import { useState } from "react";

export default function ChatBar() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="wa-container"
      style={{
        position: "fixed",
        bottom: 32,
        right: 24,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
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
        @media (max-width: 767px) {
          .wa-container { bottom: 80px !important; right: 16px !important; }
          .wa-avatar { width: 48px !important; height: 48px !important; font-size: 18px !important; }
          .wa-online-label { font-size: 9px !important; }
        }
      `}</style>

      {/* Tooltip + Button row */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* Tooltip */}
        <div className={`wa-tooltip${hovered ? " visible" : ""}`}>
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: 12,
              padding: "10px 14px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
              whiteSpace: "nowrap",
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a", marginBottom: 2 }}>
              Hi! Ich bin Lisa 👋
            </div>
            <div style={{ fontSize: 12, color: "#1DB954", fontWeight: 600 }}>
              Jetzt auf WhatsApp chatten
            </div>
            {/* Arrow pointing right */}
            <div
              style={{
                position: "absolute",
                right: -6,
                top: "50%",
                transform: "translateY(-50%)",
                width: 0,
                height: 0,
                borderTop: "6px solid transparent",
                borderBottom: "6px solid transparent",
                borderLeft: "6px solid #fff",
                filter: "drop-shadow(1px 0 1px rgba(0,0,0,0.06))",
              }}
            />
          </div>
        </div>

        {/* Avatar + Online Label */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <a
            href="https://wa.me/WHATSAPP_NUMBER?text=Hallo%2C%20ich%20interessiere%20mich%20f%C3%BCr%20einen%20personalisierten%20Song!"
            target="_blank"
            rel="noopener noreferrer"
            className="wa-avatar"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: "relative",
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "#1DB954",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 22,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              flexShrink: 0,
            }}
          >
            L

            {/* Pulse dot */}
            <span
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#25D366",
                border: "2px solid #fff",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 1,
                right: 1,
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#25D366",
                animation: "whatsapp-pulse 2s infinite",
              }}
            />
          </a>

          {/* Online label */}
          <div
            className="wa-online-label"
            style={{
              background: "#25D366",
              color: "#fff",
              borderRadius: 500,
              fontSize: 10,
              fontWeight: 600,
              padding: "2px 8px",
            }}
          >
            Online
          </div>
        </div>
      </div>
    </div>
  );
}
