"use client";

import { useState } from "react";

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
  {
    q: "In welchen Fällen bekomme ich eine vollständige Erstattung?",
    a: "Wir erstatten in 4 klaren Fällen: (1) Der vollständige Song entspricht inhaltlich nicht der Vorschau (anderer Stil, anderer Ton). (2) Deine persönlichen Angaben wurden im Song nicht korrekt umgesetzt (falscher Name, falscher Anlass). (3) Du hast bezahlt, ohne zuvor eine kostenlose Vorschau erhalten zu haben. (4) Du kannst die gelieferte MP3-Datei technisch nicht herunterladen und wir lösen das Problem nicht innerhalb von 48 Stunden.",
  },
  {
    q: "Wann gibt es keine Erstattung?",
    a: "Keine Erstattung wenn: der Song korrekt produziert wurde, aber dir persönlich nicht gefällt (deshalb gibt es die kostenlose Vorschau zuerst), du selbst fehlerhafte Angaben im Bestellprozess gemacht hast, die Anfrage mehr als 30 Tage nach der Zahlung eingeht, oder du den Song bereits heruntergeladen und geteilt hast ohne einen der 4 Erstattungsgründe zu haben.",
  },
  {
    q: "Wie beantrage ich eine Erstattung und wie lange dauert sie?",
    a: "Schreibe eine E-Mail an info@audynia.com mit dem Betreff: \"Erstattungsantrag - [deine E-Mail-Adresse]\" und nenne deinen Erstattungsgrund (Fall 1–4). Wir antworten innerhalb von 24 Stunden und bearbeiten den Antrag in 5 Werktagen. Die Rückzahlung erfolgt über dieselbe Zahlungsmethode und dauert je nach Anbieter 3–10 Werktage.",
  },
  {
    q: "Kann ich kostenlos eine neue Vorschau anfordern, bevor ich zahle?",
    a: "Ja. Wenn dir die 30-Sekunden-Vorschau nicht gefällt, kannst du einmalig pro Bestellung eine kostenlose neue Demo anfordern. Schreib uns einfach vor der Zahlung an info@audynia.com und erkläre, was dir nicht gefallen hat und was du dir anders vorstellst. Dieses Recht besteht unabhängig von der Erstattungsgarantie.",
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
              border: "1.5px solid #1DB954",
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
                  border: "1.5px solid #1DB954",
                  borderRadius: 14,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    padding: "20px 24px",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 16,
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
      </div>
    </section>
  );
}
