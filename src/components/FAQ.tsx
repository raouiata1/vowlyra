"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    q: "Wie persönlich wird der Song wirklich?",
    a: "Sehr persönlich. Du gibst Namen, Erinnerungen, besondere Momente und den Anlass ein – unsere KI verarbeitet all das zu individuellen Lyrics und einer passenden Melodie. Kein Song klingt wie ein anderer.",
  },
  {
    q: "Was ist der Trailer und warum ist er kostenlos?",
    a: "Der Trailer ist eine 30-Sekunden-Vorschau deines Songs – kostenlos per E-Mail geliefert. Wir glauben so stark an die Qualität unserer Songs, dass wir dir erst überzeugen wollen, bevor du einen Cent ausgibst.",
  },
  {
    q: "Kann ich den Musikstil selbst wählen?",
    a: "Ja! Du kannst aus verschiedenen Stilen wählen: Pop, Akustik, R&B, Klassisch, HipHop und mehr. Gib einfach an, was deiner beschenkten Person gefällt.",
  },
  {
    q: "Was passiert, wenn mir der Trailer nicht gefällt?",
    a: "Dann passiert gar nichts – du zahlst nichts. Du kannst uns Feedback geben und wir erstellen kostenlos einen neuen Trailer. Deine Zufriedenheit ist unsere Priorität.",
  },
  {
    q: "Wie lange dauert die Lieferung des vollständigen Songs?",
    a: "Der Trailer kommt in ~5 Minuten. Nach der Zahlung erhältst du den vollständigen Song (ca. 3 Minuten) innerhalb weniger Minuten per E-Mail – manchmal sogar schneller.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="faq-section"
      style={{
        background: "#CCCCCC",
        padding: "80px 40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
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
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Häufige Fragen
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
            Alles, was du wissen musst
          </h2>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: isOpen ? "1.5px solid #1DB954" : "0.5px solid #e0e0e0",
                  borderRadius: 14,
                  overflow: "hidden",
                  transition: "border-color 0.2s",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: isOpen ? "#f9fffe" : "none",
                    border: "none",
                    padding: "20px 24px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#1a1a1a",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: 18,
                      color: "#999",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                      display: "inline-block",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: isOpen ? 300 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      padding: "0 24px 20px",
                      fontSize: 14,
                      color: "#555",
                      lineHeight: 1.7,
                      fontFamily: "system-ui, -apple-system, sans-serif",
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA after FAQ */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <p style={{ color: "#555", fontSize: 15, marginBottom: 16 }}>
            Noch Fragen? Wir antworten per WhatsApp in wenigen Minuten.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/order"
              style={{
                display: "inline-block",
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: 500,
                padding: "13px 28px",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Jetzt Song erstellen
            </Link>
            <a
              href="https://wa.me/WHATSAPP_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#25D366",
                color: "#fff",
                borderRadius: 500,
                padding: "13px 28px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M11.99 2C6.476 2 2 6.476 2 11.99c0 1.867.518 3.614 1.416 5.115L2 22l5.043-1.39A9.948 9.948 0 0011.99 22C17.504 22 22 17.524 22 12.01 22 6.495 17.504 2 11.99 2z"/>
              </svg>
              Frage stellen
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
