export default function DatenschutzPage() {
  return (
    <main style={{ background: "#121212", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40 }}>
          ← Zurück
        </a>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 800, marginBottom: 8, letterSpacing: "-1px" }}>Datenschutzrichtlinien</h1>
        <p style={{ color: "#555", fontSize: 14, marginBottom: 40 }}>Stand: Mai 2026</p>

        <div style={{ color: "#888", fontSize: 15, lineHeight: 1.9 }}>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>1. Verantwortlicher</h2>
          <p style={{ margin: "0 0 16px" }}>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist Vowlyra, erreichbar unter support@vowlyra.com.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
          <p style={{ margin: "0 0 16px" }}>
            Wir erheben folgende Daten, die du uns im Bestellprozess mitteilst:
          </p>
          <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
            <li>E-Mail-Adresse (für die Lieferung des Songs)</li>
            <li>Angaben zur Song-Personalisierung (Name, Anlass, Erinnerungen)</li>
            <li>Zahlungsdaten (werden ausschließlich von Stripe verarbeitet)</li>
          </ul>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>3. Zweck der Verarbeitung</h2>
          <p style={{ margin: "0 0 16px" }}>
            Deine Daten werden ausschließlich zur Erstellung und Lieferung deines personalisierten Songs verwendet. Eine Weitergabe an Dritte erfolgt nicht, außer an die zur Vertragserfüllung notwendigen Dienstleister (Stripe für Zahlungen, Zoho Mail für den E-Mail-Versand).
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>4. Speicherdauer</h2>
          <p style={{ margin: "0 0 16px" }}>
            Deine Daten werden für die Dauer der gesetzlichen Aufbewahrungsfristen gespeichert (in der Regel 10 Jahre für steuerrelevante Unterlagen) und danach gelöscht.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>5. Cookies</h2>
          <p style={{ margin: "0 0 16px" }}>
            Unsere Website verwendet technisch notwendige Cookies, die für den Betrieb der Website erforderlich sind. Es werden keine Tracking- oder Werbe-Cookies eingesetzt.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>6. Deine Rechte</h2>
          <p style={{ margin: "0 0 16px" }}>
            Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit. Anfragen richte bitte an support@vowlyra.com.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>7. Beschwerderecht</h2>
          <p style={{ margin: "0 0 16px" }}>
            Du hast das Recht, dich bei einer Datenschutzaufsichtsbehörde zu beschweren, wenn du der Meinung bist, dass die Verarbeitung deiner Daten gegen die DSGVO verstößt.
          </p>
        </div>
      </div>
    </main>
  );
}
