export default function ImpressumPage() {
  return (
    <main style={{ background: "#121212", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40 }}>
          ← Zurück
        </a>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 800, marginBottom: 32, letterSpacing: "-1px" }}>Impressum</h1>

        <div style={{ color: "#888", fontSize: 15, lineHeight: 1.8 }}>
          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Angaben gemäß § 5 TMG</h2>
          <p style={{ margin: "0 0 8px" }}>Vowlyra</p>
          <p style={{ margin: "0 0 8px" }}>[Straße und Hausnummer]</p>
          <p style={{ margin: "0 0 8px" }}>[PLZ Ort]</p>
          <p style={{ margin: "0 0 8px" }}>Deutschland</p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Kontakt</h2>
          <p style={{ margin: "0 0 8px" }}>E-Mail: support@vowlyra.com</p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Verantwortlich für den Inhalt</h2>
          <p style={{ margin: "0 0 8px" }}>[Vorname Nachname]</p>
          <p style={{ margin: "0 0 8px" }}>[Straße und Hausnummer]</p>
          <p style={{ margin: "0 0 8px" }}>[PLZ Ort]</p>

          <p style={{ color: "#444", fontSize: 13, marginTop: 48 }}>
            Dieses Impressum gilt für vowlyra.com und alle zugehörigen Unterseiten.
          </p>
        </div>
      </div>
    </main>
  );
}
