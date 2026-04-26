"use client";

import React, { useState } from "react";
import Link from "next/link";

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
    cta: "Jetzt starten →",
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
    cta: "Demo anhören →",
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
    cta: "Song erstellen →",
  },
];

const ArrowRight = ({ active }: { active: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
      style={{ transition: "transform 0.3s ease", transform: active ? "translateX(4px)" : "none" }}>
      <path d="M6 14h16M16 8l6 6-6 6" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </div>
);

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  return (
    <section
      id="so-funktionierts"
      className="hiw-section"
      style={{
        background: "#CCCCCC",
        padding: "80px 40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        .hiw-card {
          background: #fff;
          border: 1.5px solid #e0e0e0;
          borderRadius: 16px;
          padding: 28px 24px;
          textAlign: center;
          flex: 1;
          display: flex;
          flexDirection: column;
          alignItems: center;
          transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .hiw-card:hover {
          border-color: #1DB954;
          transform: translateY(-6px);
          box-shadow: 0 12px 40px rgba(29,185,84,0.15);
        }
        .hiw-card-cta {
          display: inline-block;
          marginTop: 14px;
          color: #1DB954;
          fontWeight: 700;
          fontSize: 13px;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .hiw-card:hover .hiw-card-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .hiw-grid {
          display: flex;
          align-items: stretch;
          gap: 0;
        }
        .hiw-connector {
          display: flex;
          align-items: center;
          padding: 0 12px;
        }
        @media (max-width: 767px) {
          .hiw-section { padding: 60px 20px !important; }
          .hiw-grid { flex-direction: column; gap: 16px; }
          .hiw-connector { display: none !important; }
          .section-h2 { font-size: 28px !important; }
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
            }}
          >
            In wenigen Minuten<br/>zum emotionalsten Geschenk deines Lebens.
          </h2>
        </div>

        {/* Cards + Arrows */}
        <div className="hiw-grid">
          {steps.map((step, i) => (
            <React.Fragment key={step.number}>
              <div
                className="hiw-card"
                onMouseEnter={() => setHoveredStep(i)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <span
                  style={{
                    background: hoveredStep === i ? "#1DB954" : "#1a1a1a",
                    color: hoveredStep === i ? "#000" : "#1DB954",
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 8px",
                    letterSpacing: "0.5px",
                    marginBottom: 12,
                    transition: "background 0.25s, color 0.25s",
                  }}
                >
                  {step.number}
                </span>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: hoveredStep === i ? "#d4f5e0" : "#e8f5e9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px auto",
                    transition: "background 0.25s, transform 0.25s",
                    transform: hoveredStep === i ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  {step.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a", margin: 0, marginBottom: 12, lineHeight: 1.3 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, margin: 0, flex: 1 }}>
                  {step.description}
                </p>
                <span className="hiw-card-cta">{step.cta}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="hiw-connector" style={{ padding: "0 12px" }}>
                  <ArrowRight active={hoveredStep === i} />
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
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #1DB954",
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
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(29,185,84,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span style={{ fontSize: 14, color: "#1a1a1a" }}>
              <strong>Standard:</strong> Dein Song in 1 Stunde erstellt
            </span>
          </div>
          <div
            style={{
              background: "#1a1a1a",
              border: "1.5px solid #1DB954",
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
              (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(29,185,84,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = "none";
              (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
            </svg>
            <span style={{ fontSize: 14, color: "#fff" }}>
              <strong style={{ color: "#1DB954" }}>Express:</strong> Dein Song in weniger als 20 Minuten
            </span>
          </div>
        </div>

        {/* CTA below */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Link
            href="/order"
            style={{
              display: "inline-block",
              background: "#1DB954",
              color: "#000",
              borderRadius: 500,
              padding: "15px 36px",
              fontSize: 16,
              fontWeight: 700,
              textDecoration: "none",
              boxShadow: "0 4px 20px rgba(29,185,84,0.35)",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(29,185,84,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(29,185,84,0.35)";
            }}
          >
            Jetzt meinen Song erstellen
          </Link>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginTop: 10 }}>
            Trailer kostenlos · Nur zahlen wenn du überzeugt bist
          </p>
        </div>
      </div>
    </section>
  );
}
