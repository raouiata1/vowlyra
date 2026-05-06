"use client";

import React, { useState, useRef, useEffect } from "react";

const steps = [
  {
    number: "01",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    title: "Erzähl uns eure Geschichte",
    description: "Ein paar Stichpunkte reichen – wir verwandeln eure Erinnerungen in einen Song, der echte Gefühle auslöst.",
  },
  {
    number: "02",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: "Erhalte deinen kostenlosen Gänsehaut-Trailer",
    description: "In wenigen Minuten bekommst du einen ersten Vorgeschmack. Gefällt er dir? Dann entscheidest du selbst.",
  },
  {
    number: "03",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="2" />
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: "Überrasche einen besonderen Menschen mit dem fertigen Song",
    description: "Bezahle nur, wenn du überzeugt bist – und erlebe ihre Reaktion, wenn sie ihn hört.",
  },
];

const ArrowRight = () => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M6 14h16M16 8l6 6-6 6" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function HowItWorks() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>([false, false, false]);
  const [typedText, setTypedText] = useState("");
  const sectionRef = useRef<HTMLElement>(null);

  const fullText = "In wenigen Minuten\nzum emotionalsten Geschenk deines Lebens.";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Typewriter effect
          let idx = 0;
          const type = () => {
            if (idx <= fullText.length) {
              setTypedText(fullText.slice(0, idx));
              idx++;
              setTimeout(type, 28);
            }
          };
          type();

          // Card animations
          steps.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 250);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [fullText]);

  return (
    <section
      id="so-funktionierts"
      ref={sectionRef}
      className="hiw-section"
      style={{
        background: "#CCCCCC",
        padding: "80px 40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        .hiw-grid {
          display: flex;
          align-items: stretch;
          gap: 0;
        }
        .hiw-connector { display: flex; align-items: center; padding: 0 12px; }
        .hiw-card-wrapper {
          flex: 1;
          opacity: 0;
          transform: translateX(-60px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .hiw-card-wrapper.visible {
          opacity: 1;
          transform: translateX(0);
        }
        @media (max-width: 767px) {
          .hiw-section { padding: 60px 20px !important; }
          .hiw-grid { flex-direction: column; gap: 16px; }
          .hiw-connector { display: none !important; }
          .section-h2 { font-size: 28px !important; }
          .hiw-card-wrapper { flex: unset; }
        }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        .hiw-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: #fff;
          margin-left: 3px;
          vertical-align: middle;
          animation: blink 0.8s step-start infinite;
        }
      `}</style>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
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
            SO EINFACH GEHT&apos;S
          </div>
          <h2
            className="section-h2"
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "-1px",
              margin: 0,
              minHeight: "2.6em",
            }}
          >
            {typedText.split("\n").map((line, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {line}
              </React.Fragment>
            ))}
            {typedText.length < fullText.length && <span className="hiw-cursor" />}
          </h2>
        </div>

        {/* Cards + Arrows */}
        <div className="hiw-grid">
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div className={`hiw-card-wrapper${visible[i] ? " visible" : ""}`}>
              <div
                className="hiw-card"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: "#fff",
                  border: "1.5px solid #1DB954",
                  borderRadius: 16,
                  padding: "28px 24px",
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "default",
                  transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hovered === i ? "0 12px 32px rgba(29,185,84,0.14)" : "none",
                  transition: "border-color 0.22s, transform 0.22s, box-shadow 0.22s",
                }}
              >
                <span
                  style={{
                    background: "#1DB954",
                    color: "#000",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 8px",
                    letterSpacing: "0.5px",
                    marginBottom: 12,
                  }}
                >
                  {step.number}
                </span>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: hovered === i ? "#d4f5e0" : "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    transform: hovered === i ? "scale(1.1)" : "scale(1)",
                    transition: "background 0.22s, transform 0.22s",
                  }}
                >
                  {step.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: 0, marginBottom: 12, lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: 0 }}>
                  {step.description}
                </p>
              </div>
              </div>
              {i < steps.length - 1 && (
                <div className="hiw-connector" style={{ padding: "0 12px" }}>
                  <ArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Delivery info */}
        <div
          style={{
            marginTop: 40,
            display: "flex",
            gap: 16,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              bg: "#fff", border: "#1DB954", textColor: "#1a1a1a",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              label: <><strong>Standard:</strong> Dein Song in 1 Stunde erstellt</>,
            },
            {
              bg: "#1a1a1a", border: "#1DB954", textColor: "#fff",
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
              label: <><strong style={{ color: "#1DB954" }}>Express:</strong> Dein Song in weniger als 20 Minuten</>,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: item.bg,
                border: `1.5px solid ${item.border}`,
                borderRadius: 12,
                padding: "14px 24px",
                display: "flex",
                alignItems: "center",
                gap: 10,
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(29,185,84,0.18)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "none";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              {item.icon}
              <span style={{ fontSize: 14, color: item.textColor }}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
