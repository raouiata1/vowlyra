export default function ImpressumPage() {
  return (
    <main style={{ background: "#121212", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 40 }}>
          ← Zurück
        </a>
        <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 800, marginBottom: 32, letterSpacing: "-1px" }}>Impressum</h1>

        <div style={{ color: "#888", fontSize: 15, lineHeight: 1.8 }}>
          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Angaben</h2>
          <p style={{ margin: "0 0 8px" }}>Vowlyra LLC</p>
          <p style={{ margin: "0 0 8px" }}>30 N Gould St Ste 100</p>
          <p style={{ margin: "0 0 8px" }}>Sheridan, WY 82801</p>
          <p style={{ margin: "0 0 8px" }}>Vereinigte Staaten von Amerika</p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Kontakt</h2>
          <p style={{ margin: "0 0 8px" }}>E-Mail: info@vowlyra.com</p>
          <p style={{ margin: "0 0 8px" }}>Live-Chat: vowlyra.com</p>

          <h2 style={{ color: "#ccc", fontSize: 18, fontWeight: 700, marginBottom: 8, marginTop: 32 }}>Zahlungsabwicklung</h2>
          <p style={{ margin: "0 0 16px" }}>
            Zahlungen werden über folgende zertifizierte Zahlungsdienstleister abgewickelt:
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <span style={{ color: "#ccc" }}>Paddle.com Market Limited</span> (Merchant of Record, primär) — 15 Lime Street, London, EC3M 7AP, Vereinigtes Königreich.{" "}
            Für zahlungsbezogene Anfragen: paddle.net/support
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <span style={{ color: "#ccc" }}>Stripe Payments Europe Limited</span> (Zahlungsabwickler, Fallback) — 1 Grand Canal Street Lower, Dublin 2, Irland
          </p>
          <p style={{ margin: "0 0 12px" }}>
            <span style={{ color: "#ccc" }}>PayPal (Europe) S.à r.l. et Cie, S.C.A.</span> (Zahlungsabwickler, direkt) — 22-24 Boulevard Royal, L-2449 Luxemburg
          </p>

          <p style={{ color: "#444", fontSize: 13, marginTop: 48 }}>
            Zuletzt aktualisiert: 15.05.2026
          </p>
        </div>
      </div>
    </main>
  );
}
