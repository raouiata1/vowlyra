"use client";

import { useState } from "react";

const cards = [
  { name: "Lena M.", occasion: "Geburtstag", src: "https://media.audynia.com/ugc-1.MOV", likes: "2.4K", comments: "183" },
  { name: "Marco & Julia", occasion: "Hochzeit", src: "https://media.audynia.com/ugc-2.MOV", likes: "5.1K", comments: "342" },
  { name: "Familie Braun", occasion: "Weihnachten", src: "https://media.audynia.com/ugc-3.MOV", likes: "1.8K", comments: "97" },
  { name: "Nico R.", occasion: "Überraschung", src: "https://media.audynia.com/ugc-4.MOV", likes: "3.2K", comments: "218" },
  { name: "Anna K.", occasion: "Jahrestag", src: "https://media.audynia.com/ugc-5.MOV", likes: "4.7K", comments: "291" },
  { name: "Thomas H.", occasion: "Geburtstag", src: "https://media.audynia.com/ugc-6.MOV", likes: "1.1K", comments: "64" },
  { name: "Sophie & Ben", occasion: "Hochzeit", src: "https://media.audynia.com/ugc-7.MOV", likes: "6.3K", comments: "415" },
  { name: "Karin W.", occasion: "Valentinstag", src: "https://media.audynia.com/ugc-8.MOV", likes: "2.9K", comments: "176" },
];

const allCards = [...cards, ...cards];

type PopupCard = { src: string; name: string; occasion: string };

export default function UGCCarousel() {
  const [popup, setPopup] = useState<PopupCard | null>(null);

  return (
    <section
      className="ugc-section"
      style={{
        background: "#121212",
        padding: "60px 0 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
        <div
          style={{
            display: "inline-block",
            background: "#1a1a1a",
            color: "#1DB954",
            borderRadius: 500,
            padding: "6px 16px",
            fontSize: 13,
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          ECHTE REAKTIONEN VON KUNDEN
        </div>
        <h2
          className="section-h2"
          style={{
            fontSize: 40,
            fontWeight: 800,
            color: "#FFFFFF",
            letterSpacing: "-1px",
            margin: 0,
          }}
        >
          Der Moment – wenn sie den Song hören
        </h2>
      </div>

      {/* Carousel Track */}
      <div style={{ overflow: "hidden", width: "100%" }}>
        <div
          className="carousel-track"
          style={{
            display: "flex",
            gap: 20,
            width: "max-content",
            animation: popup ? "none" : "slide 40s linear infinite",
          }}
          onMouseEnter={(e) => {
            if (!popup) (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
          }}
          onMouseLeave={(e) => {
            if (!popup) (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
          }}
        >
          {allCards.map((card, i) => (
            <div
              key={i}
              className="ugc-card"
              onClick={() => setPopup({ src: card.src, name: card.name, occasion: card.occasion })}
              style={{
                position: "relative",
                overflow: "hidden",
                width: 220,
                height: 390,
                borderRadius: 16,
                flexShrink: 0,
                background: "#111",
                cursor: "pointer",
              }}
            >
              {/* VIDEO */}
              <video
                src={card.src}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                onError={(e) => {
                  const el = e.currentTarget.closest(".ugc-card") as HTMLElement | null;
                  if (el) el.style.display = "none";
                }}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />

              {/* OVERLAY GRADIENT */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)",
                }}
              />

              {/* PLAY BUTTON */}
              <div
                className="ugc-play-btn"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.9)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="14" height="16" viewBox="0 0 14 16" fill="black">
                  <path d="M0 0 L14 8 L0 16 Z" />
                </svg>
              </div>

              {/* TIKTOK ICONS */}
              <div
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 60,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 16,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                    <path d="M11 19.5C11 19.5 1 13 1 6.5A5 5 0 0 1 11 4.6 5 5 0 0 1 21 6.5C21 13 11 19.5 11 19.5Z" />
                  </svg>
                  <div style={{ color: "#fff", fontSize: 10, marginTop: 2 }}>{card.likes}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="white">
                    <path d="M2 2h18a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H6l-4 4V3a1 1 0 0 1 1-1Z" />
                  </svg>
                  <div style={{ color: "#fff", fontSize: 10, marginTop: 2 }}>{card.comments}</div>
                </div>
                <div style={{ textAlign: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <polyline points="16 6 12 2 8 6" />
                    <line x1="12" y1="2" x2="12" y2="15" />
                  </svg>
                  <div style={{ color: "#fff", fontSize: 10, marginTop: 2 }}>Share</div>
                </div>
              </div>

              {/* INFO bottom */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 12,
                  right: 50,
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                }}
              >
                <div style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{card.name}</div>
                <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>{card.occasion}</div>
                <div style={{ color: "#FFB800", fontSize: 11 }}>★★★★★</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* VIDEO POPUP */}
      {popup && (
        <div
          onClick={() => setPopup(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              background: "#111",
              borderRadius: 20,
              overflow: "hidden",
              maxWidth: 380,
              width: "100%",
              boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setPopup(null)}
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 10,
                background: "rgba(0,0,0,0.6)",
                border: "none",
                borderRadius: "50%",
                width: 36,
                height: 36,
                color: "#fff",
                fontSize: 18,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(4px)",
              }}
            >
              ×
            </button>

            {/* Info bar */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #222" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{popup.name}</div>
              <div style={{ color: "#777", fontSize: 12, marginTop: 2 }}>{popup.occasion} · Audynia</div>
            </div>

            {/* Video */}
            <video
              src={popup.src}
              autoPlay
              controls
              playsInline
              style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", display: "block", background: "#000" }}
            />
          </div>
        </div>
      )}

      <style>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ugc-play-btn { opacity: 0; transition: opacity 0.2s; }
        .ugc-card:hover .ugc-play-btn { opacity: 1; }
        @media (max-width: 767px) {
          .ugc-card { width: 180px !important; height: 320px !important; }
        }
      `}</style>
    </section>
  );
}
