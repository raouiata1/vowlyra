export default function AGBPage() {
  return (
    <main style={{ background: "#121212", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40 }}>
          ← Zurück
        </a>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 800, marginBottom: 8, letterSpacing: "-1px" }}>Allgemeine Geschäftsbedingungen</h1>
        <p style={{ color: "#555", fontSize: 14, marginBottom: 40 }}>Stand: Mai 2026</p>

        <div style={{ color: "#888", fontSize: 15, lineHeight: 1.9 }}>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 1 Geltungsbereich</h2>
          <p style={{ margin: "0 0 16px" }}>
            Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen Audynia (nachfolgend „Anbieter") und dem Kunden über die Erstellung und Lieferung personalisierter KI-generierter Musikstücke über die Website audynia.com.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 2 Vertragsgegenstand</h2>
          <p style={{ margin: "0 0 16px" }}>
            Der Anbieter erstellt auf Basis der vom Kunden übermittelten Informationen einen individuellen, KI-generierten Song. Der Kunde erhält zunächst eine kostenlose 30-Sekunden-Vorschau. Nach erfolgter Zahlung wird der vollständige Song (ca. 3 Minuten) als MP3-Datei per E-Mail zugestellt.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 3 Preise und Zahlung</h2>
          <p style={{ margin: "0 0 16px" }}>
            Der Preis für den vollständigen Song beträgt 14,99 € (einmalig, inkl. MwSt.). Die Zahlung erfolgt sicher über Stripe. Es entstehen keine Folgekosten oder Abonnements.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 4 Lieferung</h2>
          <p style={{ margin: "0 0 16px" }}>
            Der vollständige Song wird nach erfolgter Zahlung automatisch per E-Mail zugestellt. Die Lieferzeit beträgt in der Regel unter 5 Minuten, maximal 1 Stunde. Bei technischen Störungen kann die Lieferung länger dauern.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 5 Widerrufsrecht</h2>
          <p style={{ margin: "0 0 16px" }}>
            Da es sich um ein digitales Produkt handelt, das auf ausdrücklichen Wunsch des Kunden angefertigt wird, erlischt das Widerrufsrecht mit Beginn der Ausführung gemäß § 356 Abs. 5 BGB. Der Kunde stimmt dem ausdrücklich zu.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 6 Nutzungsrechte</h2>
          <p style={{ margin: "0 0 16px" }}>
            Der Kunde erhält ein nicht-exklusives, weltweites Nutzungsrecht am erstellten Song für private Zwecke. Eine kommerzielle Nutzung oder Weiterverkauf ist ohne gesonderte Vereinbarung nicht gestattet.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 7 Haftungsbeschränkung</h2>
          <p style={{ margin: "0 0 16px" }}>
            Der Anbieter haftet nicht für Schäden, die durch fehlerhafte Angaben des Kunden entstehen. Die Haftung für leichte Fahrlässigkeit ist ausgeschlossen, soweit gesetzlich zulässig.
          </p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 36 }}>§ 8 Anwendbares Recht</h2>
          <p style={{ margin: "0 0 16px" }}>
            Es gilt das Recht der Bundesrepublik Deutschland.
          </p>
        </div>
      </div>
    </main>
  );
}
