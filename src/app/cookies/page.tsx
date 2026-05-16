export default function CookiesPage() {
  return (
    <>
      <style>{`
        .toc-link { color: #666; text-decoration: none; }
        .toc-link:hover { color: #1DB954; }
      `}</style>
      <main style={{ background: "#0e0e0e", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>

          <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 48 }}>
            ← Zurück
          </a>

          <h1 style={{ color: "#fff", fontSize: 40, fontWeight: 800, marginBottom: 8, letterSpacing: "-1.5px" }}>
            Cookie-Richtlinie
          </h1>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>Rechtsgrundlage: § 25 TTDSG · Art. 6 DSGVO</p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 48 }}>Zuletzt aktualisiert: 15.05.2026</p>

          {/* Was sind Cookies */}
          <Section label="Was sind Cookies?">
            <p style={pStyle}>
              Cookies sind kleine Textdateien die dein Browser auf deinem Gerät speichert wenn du eine Website besuchst. Sie ermöglichen es der Website bestimmte Informationen zu merken — zum Beispiel ob du den Chat-Support aktiviert hast oder ob du unserer Datenschutzerklärung zugestimmt hast.
            </p>
            <p style={pStyle}>
              Cookies enthalten keinen ausführbaren Code und können dein Gerät nicht beschädigen.
            </p>
          </Section>

          {/* Unsere Cookies */}
          <Section label="Cookies auf vowlyra.com">

            <SubHeading>1. Technisch notwendige Cookies</SubHeading>
            <p style={pStyle}>Diese Cookies sind für den Betrieb der Website erforderlich. Sie werden ohne Einwilligung gesetzt (§ 25 Abs. 2 TTDSG).</p>

            <CookieTable rows={[
              ["vowlyra_consent", "vowlyra.com", "365 Tage", "Speichert deine Cookie-Einstellungen"],
              ["__stripe_mid", "stripe.com", "1 Jahr", "Stripe — Betrugsprävention und Geräteerkennung"],
              ["__stripe_sid", "stripe.com", "30 Min.", "Stripe — Session-Identifikation"],
              ["paddle_js", "paddle.com", "Session", "Paddle — Checkout-Session"],
            ]} />

            <SubHeading>2. Kommunikations-Cookies (optional)</SubHeading>
            <p style={pStyle}>Werden nur gesetzt wenn du Crisp Chat in den Cookie-Einstellungen aktivierst.</p>

            <CookieTable rows={[
              ["crisp-client/session/*", "crisp.chat", "6 Monate", "Crisp — Chat-Session und Verlauf"],
              ["crisp-client/data/*",    "crisp.chat", "6 Monate", "Crisp — anonyme Nutzer-ID für Chat"],
            ]} />

            <SubHeading>3. Marketing-Cookies (optional)</SubHeading>
            <p style={pStyle}>Werden nur gesetzt wenn du Meta Pixel in den Cookie-Einstellungen aktivierst. Erfordern deine ausdrückliche Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</p>

            <CookieTable rows={[
              ["_fbp", "facebook.com", "3 Monate", "Meta Pixel — identifiziert Browser für Werbemessung"],
              ["_fbc", "facebook.com", "3 Monate", "Meta Pixel — speichert Klick-ID aus Facebook-Anzeigen"],
            ]} />
          </Section>

          {/* Einwilligung */}
          <Section label="Einwilligung und Widerruf">
            <p style={pStyle}>
              Beim ersten Besuch von vowlyra.com erscheint ein Cookie-Banner. Dort kannst du einzeln auswählen welche Cookies du erlaubst. Technisch notwendige Cookies können nicht deaktiviert werden.
            </p>
            <p style={pStyle}>
              Du kannst deine Einwilligung jederzeit widerrufen indem du die Cookies in deinem Browser löschst — der Banner erscheint beim nächsten Besuch erneut und du kannst deine Auswahl anpassen.
            </p>
            <p style={pStyle}>
              Alternativ kannst du Cookies direkt in deinen Browser-Einstellungen verwalten:
            </p>
            <ul style={{ color: "#666", fontSize: 14, lineHeight: 2, paddingLeft: 20, margin: "0 0 16px" }}>
              <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", textDecoration: "none" }}>Google Chrome</a></li>
              <li><a href="https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen" target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", textDecoration: "none" }}>Mozilla Firefox</a></li>
              <li><a href="https://support.apple.com/de-de/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", textDecoration: "none" }}>Apple Safari</a></li>
              <li><a href="https://support.microsoft.com/de-de/microsoft-edge/cookies-in-microsoft-edge-löschen-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", textDecoration: "none" }}>Microsoft Edge</a></li>
            </ul>
          </Section>

          {/* Drittanbieter */}
          <Section label="Drittanbieter-Datenschutz">
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden" }}>
              {([
                ["Stripe",   "stripe.com/de/privacy"],
                ["Paddle",   "paddle.com/legal/privacy"],
                ["PayPal",   "paypal.com/de/webapps/mpp/ua/privacy-full"],
                ["Crisp",    "crisp.chat/privacy"],
                ["Meta",     "facebook.com/privacy/policy"],
              ] as [string, string][]).map(([name, url], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderTop: i === 0 ? "none" : "1px solid #1e1e1e" }}>
                  <span style={{ color: "#888", fontSize: 14, fontWeight: 600 }}>{name}</span>
                  <a href={`https://${url}`} target="_blank" rel="noopener noreferrer" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}>
                    {url} →
                  </a>
                </div>
              ))}
            </div>
          </Section>

          {/* Kontakt */}
          <Section label="Kontakt">
            <p style={pStyle}>
              Bei Fragen zu unserer Cookie-Richtlinie erreichst du uns unter{" "}
              <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a>.
              Weitere Informationen zur Datenverarbeitung findest du in unserer{" "}
              <a href="/datenschutz" style={{ color: "#1DB954", textDecoration: "none" }}>Datenschutzerklärung</a>.
            </p>
          </Section>

          <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
            Vowlyra LLC · 30 N Gould St Ste 100, Sheridan, WY 82801, USA · info@vowlyra.com · 15.05.2026
          </p>

        </div>
      </main>
    </>
  );
}

const pStyle: React.CSSProperties = { color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px" };

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>
        {label}
      </h2>
      {children}
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 style={{ color: "#aaa", fontSize: 13, fontWeight: 700, margin: "20px 0 10px", letterSpacing: "0.04em" }}>
      {children}
    </h3>
  );
}

function CookieTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "10px 0 20px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr 2fr", borderBottom: "1px solid #252525" }}>
        {["Name", "Domain", "Laufzeit", "Zweck"].map((h, i) => (
          <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 0.8fr 2fr", borderTop: "1px solid #1e1e1e" }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{ padding: "10px 14px", color: ci === 0 ? "#ccc" : "#555", fontSize: 12, lineHeight: 1.5, fontFamily: ci === 0 ? "monospace" : "inherit" }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
