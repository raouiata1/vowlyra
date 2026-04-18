"use client";

import Link from "next/link";

export default function Pricing() {
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
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-block",
              background: "#1DB95420",
              color: "#1DB954",
              borderRadius: 500,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Preis & Garantie
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

        <div className="pricing-grid">
          {/* Standard Card – Spalte 1 Desktop / oben Mobile */}
          <div
            className="pricing-standard"
            style={{
              background: "#fff",
              border: "1.5px solid #1DB954",
              borderRadius: 16,
              padding: 32,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 1. Badge */}
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
            }}>Beliebt</span>

            {/* 2. Preis */}
            <div style={{ fontSize: 32, fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>
              29,99 €
            </div>

            {/* 3. Untertitel */}
            <div style={{ color: "#999", fontSize: 13, marginTop: 8, marginBottom: 20 }}>
              Einmalig · Kein Abo · Lieferung innerhalb von 24 Stunden
            </div>

            {/* 4. Trennlinie */}
            <div style={{ borderTop: "0.5px solid #e0e0e0", marginBottom: 20 }} />

            {/* 5. Features */}
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
                "Lieferung innerhalb von 24 Stunden",
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

            {/* 6. Button */}
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

            {/* 7. Kleiner Text */}
            <div style={{ color: "#999", fontSize: 12, textAlign: "center", marginTop: 8 }}>
              Kein Risiko – Trailer zuerst kostenlos
            </div>
          </div>

          {/* Express Card – Spalte 2 Desktop / Mitte Mobile */}
          <div
            className="pricing-express"
            style={{
              background: "#1a1a1a",
              border: "1.5px solid #1DB954",
              borderRadius: 16,
              padding: 32,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* 1. Badge */}
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

            {/* 2. Preis */}
            <div style={{ fontSize: 32, fontWeight: 800, color: "#fff", lineHeight: 1 }}>
              34,99 €
            </div>

            {/* 3. Untertitel */}
            <div style={{ color: "#b3b3b3", fontSize: 13, marginTop: 8, marginBottom: 20 }}>
              Einmalig · Priorität · Sofort
            </div>

            {/* 4. Trennlinie */}
            <div style={{ borderTop: "0.5px solid #333", marginBottom: 20 }} />

            {/* 5. Features */}
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
                "Lieferung in unter 2 Minuten",
                "Höchste Priorität in der Warteschlange",
                "Persönliche Qualitätskontrolle",
                "2 kostenlose Revisionen",
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

            {/* 6. Button */}
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

            {/* 7. Kleiner Text */}
            <div style={{ color: "#777", fontSize: 12, textAlign: "center", marginTop: 8 }}>
              Perfekt für Last-Minute Geschenke
            </div>
          </div>

          {/* Guarantee Card – Spalte 3 Desktop / unten Mobile */}
          <div
            className="pricing-garantie"
            style={{
              background: "#1a1a1a",
              borderRadius: 14,
              padding: "40px 36px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <div style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(29,185,84,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 14,
              margin: "0 auto 20px auto",
            }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                <polyline points="9 12 11 14 15 10"/>
              </svg>
            </div>
            <h3
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#fff",
                margin: 0,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Unsere
              <br />
              <span style={{ color: "#1DB954" }}>100% Garantie</span>
            </h3>
            <p style={{ color: "#999", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
              Du hörst zuerst einen kostenlosen 30-Sekunden-Trailer. Gefällt er
              dir nicht? Kein Problem – du zahlst nichts, kein Haken, keine
              versteckten Gebühren.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Trailer kostenlos & unverbindlich",
                "Zahlung nur bei Zufriedenheit",
                "Kein Abo, jederzeit kündbar",
              ].map((item) => (
                <div
                  key={item}
                  style={{ display: "flex", gap: 10, alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: 14 }}
                >
                  <span style={{ color: "#1DB954", fontWeight: 700 }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
