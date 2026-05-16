export default function ImpressumPage() {
  return (
    <main style={{ background: "#0e0e0e", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>

        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 48 }}>
          ← Zurück
        </a>

        <h1 style={{ color: "#fff", fontSize: 40, fontWeight: 800, marginBottom: 8, letterSpacing: "-1.5px" }}>
          Impressum
        </h1>
        <p style={{ color: "#555", fontSize: 14, marginBottom: 56 }}>Rechtliche Angaben zu Vowlyra</p>

        {/* Angaben */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Angaben
          </h2>
          <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ color: "#e0e0e0", fontSize: 14, fontWeight: 600 }}>Vowlyra LLC</span>
            <span style={{ color: "#666", fontSize: 14 }}>30 N Gould St Ste 100</span>
            <span style={{ color: "#666", fontSize: 14 }}>Sheridan, WY 82801</span>
            <span style={{ color: "#666", fontSize: 14 }}>Vereinigte Staaten von Amerika</span>
          </div>
        </section>

        {/* Kontakt */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Kontakt
          </h2>
          <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 10 }}>
            <Row label="E-Mail" value="info@vowlyra.com" link="mailto:info@vowlyra.com" />
            <Row label="Live-Chat" value="vowlyra.com" link="https://vowlyra.com" />
          </div>
        </section>

        {/* Zahlungsabwicklung */}
        <section style={{ marginBottom: 40 }}>
          <h2 style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
            Zahlungsabwicklung
          </h2>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
            Zahlungen werden über folgende zertifizierte Zahlungsdienstleister abgewickelt:
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <PaymentCard
              name="Paddle.com Market Limited"
              role="Merchant of Record · primär"
              address="15 Lime Street, London, EC3M 7AP, Vereinigtes Königreich"
              support="paddle.net"
              note="Paddle agiert als Merchant of Record. Auf Ihrer Kontoabrechnung erscheint 'Paddle' oder 'Paddle.net'."
            />
            <PaymentCard
              name="Stripe Payments Europe Limited"
              role="Zahlungsabwickler · Fallback"
              address="1 Grand Canal Street Lower, Dublin 2, Irland"
              note="Kontakt bei Stripe-Transaktionen: info@vowlyra.com"
            />
            <PaymentCard
              name="PayPal (Europe) S.à r.l. et Cie, S.C.A."
              role="Zahlungsabwickler · direkt"
              address="22-24 Boulevard Royal, L-2449 Luxemburg"
              note="Kontakt vor Dispute-Eröffnung: info@vowlyra.com"
            />
          </div>
        </section>

        <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
          Zuletzt aktualisiert: 15.05.2026
        </p>

      </div>
    </main>
  );
}

function Row({ label, value, link }: { label: string; value: string; link?: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
      <span style={{ color: "#555", fontSize: 14 }}>{label}</span>
      {link ? (
        <a href={link} style={{ color: "#ccc", fontSize: 14, textDecoration: "none" }}>{value}</a>
      ) : (
        <span style={{ color: "#ccc", fontSize: 14 }}>{value}</span>
      )}
    </div>
  );
}

function PaymentCard({ name, role, address, support, note }: { name: string; role: string; address: string; support?: string; note?: string }) {
  return (
    <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "18px 24px" }}>
      <div style={{ marginBottom: 8 }}>
        <span style={{ color: "#e0e0e0", fontSize: 14, fontWeight: 600 }}>{name}</span>
      </div>
      <p style={{ color: "#555", fontSize: 13, margin: 0, lineHeight: 1.6 }}>{address}</p>
      {support && (
        <p style={{ color: "#444", fontSize: 12, margin: "8px 0 0" }}>
          Support: <a href={`https://${support}`} style={{ color: "#555", textDecoration: "none" }}>{support}</a>
        </p>
      )}
      {note && (
        <p style={{ color: "#444", fontSize: 12, margin: "8px 0 0", lineHeight: 1.6 }}>{note}</p>
      )}
    </div>
  );
}
