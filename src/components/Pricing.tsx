"use client";

import Link from "next/link";
import { useState } from "react";

export default function Pricing() {
  const [hovered, setHovered] = useState<"standard" | "express" | null>(null);

  return (
    <section
      id="preise"
      className="pricing-section"
      style={{
        background: "#CCCCCC",
        padding: "80px 40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-block",
              background: "#1a1a1a",
              color: "#1DB954",
              border: "1.5px solid #1DB954",
              borderRadius: 500,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Preis &amp; Lieferung
          </div>
          <h2
            className="section-h2"
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#1a1a1a",
              letterSpacing: "-1px",
              margin: 0,
            }}
          >
            Einfach. Transparent. Fair.
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
          }}
          className="pricing-grid-2"
        >
          {/* Standard Card */}
          <div
            className="pricing-standard"
            onMouseEnter={() => setHovered("standard")}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "#fff",
              border: "1.5px solid #1DB954",
              borderRadius: 16,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              transform: hovered === "standard" ? "translateY(-6px)" : "none",
              boxShadow: hovered === "standard" ? "0 14px 40px rgba(29,185,84,0.16)" : "none",
              transition: "transform 0.22s, box-shadow 0.22s",
              cursor: "default",
            }}
          >
            <span style={{
              display: "inline-block",
              alignSelf: "flex-start",
              background: "#e8f5e9",
              color: "#1a7a35",
              borderRadius: 500,
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 14px",
              marginBottom: 20,
            }}>Standard</span>

            <div style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>
              29,99 €
            </div>

            <div style={{ color: "#999", fontSize: 13, marginTop: 8, marginBottom: 20 }}>
              Einmalig · Kein Abo
            </div>

            <div style={{ borderTop: "0.5px solid #e0e0e0", marginBottom: 20 }} />

            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              flex: 1,
              marginBottom: 24,
            }}>
              {[
                "30-Sek. Trailer kostenlos vorab",
                "Song in 6 Stunden erstellt",
                "Vollständiger Song (~3 Min.)",
                "Personalisierte Lyrics",
                "Dein Wunsch-Musikstil",
                "Lieferung per E-Mail",
                "Nur zahlen wenn Trailer gefällt",
              ].map((feature) => (
                <li
                  key={feature}
                  style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "#333" }}
                >
                  <span style={{ color: "#1DB954", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/order"
              style={{
                display: "block",
                textAlign: "center",
                background: "#1DB954",
                color: "#000",
                borderRadius: 500,
                padding: 14,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxSizing: "border-box",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(29,185,84,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Jetzt Song erstellen
            </Link>

            <div style={{ color: "#999", fontSize: 12, textAlign: "center", marginTop: 8 }}>
              Trailer zuerst kostenlos anhören
            </div>
          </div>

          {/* Express Card */}
          <div
            className="pricing-express"
            onMouseEnter={() => setHovered("express")}
            onMouseLeave={() => setHovered(null)}
            style={{
              background: "#1a1a1a",
              border: "1.5px solid #1DB954",
              borderRadius: 16,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              transform: hovered === "express" ? "translateY(-6px)" : "none",
              boxShadow: hovered === "express" ? "0 14px 40px rgba(29,185,84,0.24)" : "0 4px 20px rgba(0,0,0,0.12)",
              transition: "transform 0.22s, box-shadow 0.22s",
              cursor: "default",
            }}
          >
            <span style={{
              display: "inline-block",
              alignSelf: "flex-start",
              background: "#1DB954",
              color: "#000",
              borderRadius: 500,
              fontSize: 11,
              fontWeight: 700,
              padding: "4px 14px",
              marginBottom: 20,
            }}>Express</span>

            <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
              34,99 €
            </div>

            <div style={{ color: "#b3b3b3", fontSize: 13, marginTop: 8, marginBottom: 20 }}>
              Einmalig · Priorität · Sofort
            </div>

            <div style={{ borderTop: "0.5px solid #333", marginBottom: 20 }} />

            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              flex: 1,
              marginBottom: 24,
            }}>
              {[
                "Alles aus Standard",
                "Song in weniger als 20 Minuten",
                "Höchste Priorität in der Warteschlange",
                "Persönliche Qualitätskontrolle",
              ].map((feature) => (
                <li
                  key={feature}
                  style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "#ccc" }}
                >
                  <span style={{ color: "#1DB954", fontWeight: 700, flexShrink: 0 }}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <Link
              href="/order"
              style={{
                display: "block",
                textAlign: "center",
                background: "#1DB954",
                color: "#000",
                borderRadius: 500,
                padding: 14,
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                boxSizing: "border-box",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(29,185,84,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Express Song erstellen
            </Link>

            <div style={{ color: "#777", fontSize: 12, textAlign: "center", marginTop: 8 }}>
              Perfekt für Last-Minute Geschenke
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 767px) {
            .pricing-grid-2 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
