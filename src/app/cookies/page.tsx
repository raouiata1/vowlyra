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
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>
            Rechtsgrundlage: § 25 TTDSG · Art. 6 DSGVO · UK PECR · PIPEDA · Australia Privacy Act · CCPA
          </p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>
            Gültig für: EU/EWR · Vereinigtes Königreich · Kanada · Australien · Neuseeland · USA
          </p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 48 }}>Zuletzt aktualisiert: 15.05.2026 · Version 1.0</p>

          {/* Zusammenfassung */}
          <div style={{ background: "#141414", border: "1px solid #282828", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
            <p style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px" }}>Zusammenfassung</p>
            <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8, margin: "0 0 8px" }}>
              audynia.com verwendet technisch notwendige Cookies (Stripe, Paddle, PayPal) sowie optionale Cookies für Chat (Crisp) und Werbemessung (Meta Pixel). Technisch notwendige Cookies werden ohne Einwilligung gesetzt. Alle anderen Cookies werden nur nach deiner ausdrücklichen Einwilligung aktiviert.
            </p>
            <p style={{ color: "#888", fontSize: 13, margin: 0 }}>
              Einstellungen jederzeit anpassbar · Widerruf durch Browser-Cookie-Löschung
            </p>
          </div>

          {/* TOC */}
          <Section label="Inhaltsverzeichnis">
            <ol style={{ color: "#666", fontSize: 14, lineHeight: 2, paddingLeft: 20, margin: 0, listStyleType: "decimal" }}>
              {([
                ["sec-1",  "Was sind Cookies?"],
                ["sec-2",  "Welche Cookies verwenden wir?"],
                ["sec-3",  "Technisch notwendige Cookies"],
                ["sec-4",  "Kommunikations-Cookies (Crisp)"],
                ["sec-5",  "Marketing-Cookies (Meta Pixel)"],
                ["sec-6",  "Zahlungsanbieter-Cookies im Detail"],
                ["sec-7",  "Einwilligung und Widerruf"],
                ["sec-8",  "Cookies in deinem Browser verwalten"],
                ["sec-9",  "Rechte nach Jurisdiktion"],
                ["sec-10", "Änderungen dieser Richtlinie"],
                ["sec-11", "Kontakt"],
              ] as [string, string][]).map(([id, label], i) => (
                <li key={i}><a href={`#${id}`} className="toc-link">{label}</a></li>
              ))}
            </ol>
          </Section>

          {/* 1 */}
          <Section id="sec-1" label="1. Was sind Cookies?">
            <p style={pStyle}>
              Cookies sind kleine Textdateien die ein Webserver an deinen Browser sendet und die auf deinem Gerät gespeichert werden. Bei jedem weiteren Besuch der Website schickt dein Browser diese Datei zurück — so kann die Website bestimmte Informationen merken.
            </p>
            <p style={pStyle}>
              Cookies enthalten ausschließlich Text — keinen ausführbaren Code. Sie können dein Gerät nicht beschädigen oder darauf zugreifen.
            </p>
            <DataTable headers={["Begriff", "Bedeutung"]} rows={[
              ["First-Party Cookie",  "Wird von audynia.com selbst gesetzt"],
              ["Third-Party Cookie",  "Wird von einem Drittanbieter gesetzt (z.B. Stripe, Meta)"],
              ["Session Cookie",      "Wird gelöscht wenn du den Browser schließt"],
              ["Persistentes Cookie", "Bleibt für eine definierte Zeitspanne gespeichert"],
              ["httpOnly Cookie",     "Nur vom Server lesbar — kein JavaScript-Zugriff möglich"],
              ["Secure Cookie",       "Wird nur über HTTPS übertragen — nie unverschlüsselt"],
            ]} />
          </Section>

          {/* 2 */}
          <Section id="sec-2" label="2. Welche Cookies verwenden wir?">
            <p style={pStyle}>Wir unterscheiden drei Kategorien:</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
              <CategoryBadge color="#1a3a1a" label="Technisch notwendig" desc="Immer aktiv — kein Consent erforderlich (§ 25 Abs. 2 TTDSG)" />
              <CategoryBadge color="#1a1a3a" label="Kommunikation" desc="Optional — Crisp Chat. Nur nach deiner Einwilligung." />
              <CategoryBadge color="#3a1a1a" label="Marketing" desc="Optional — Meta Pixel. Nur nach deiner ausdrücklichen Einwilligung." />
            </div>
          </Section>

          {/* 3 */}
          <Section id="sec-3" label="3. Technisch notwendige Cookies">
            <p style={pStyle}>
              Diese Cookies sind für den Betrieb der Website unbedingt erforderlich. Sie werden ohne Einwilligung gesetzt (§ 25 Abs. 2 Nr. 2 TTDSG, Art. 5 Abs. 3 ePrivacy-Richtlinie).
            </p>

            <SubHeading>Audynia eigene Cookies</SubHeading>
            <CookieTable rows={[
              ["audynia_consent", "audynia.com", "First-Party", "365 Tage", "Speichert deine Cookie-Einwilligung (Consent-State als JSON)"],
            ]} />

            <SubHeading>Stripe — Zahlungsabwicklung und Betrugsprävention</SubHeading>
            <p style={pStyle}>
              Stripe Payments Europe Limited, 1 Grand Canal Street Lower, Dublin 2, Irland. Stripe setzt Cookies zur Betrugserkennung und Session-Verwaltung sobald Stripe.js auf der Seite geladen wird. Diese Cookies sind für die sichere Zahlungsabwicklung technisch notwendig.
            </p>
            <CookieTable rows={[
              ["__stripe_mid",  "stripe.com", "Third-Party", "1 Jahr",   "Geräteidentifikation für Betrugsprävention (PCI-DSS)"],
              ["__stripe_sid",  "stripe.com", "Third-Party", "30 Min.",  "Session-Identifikation während des Checkouts"],
              ["__stripe_orig_props", "stripe.com", "Third-Party", "Session", "Stripe Radar — verhaltensbasierte Betrugserkennung"],
              ["m",             "stripe.com", "Third-Party", "2 Jahre",  "Geräte-Fingerprint für Stripe Fraud Detection"],
            ]} />
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
              Stripe Datenschutz: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>stripe.com/de/privacy</a> · Cookie-Einstellungen: <a href="https://stripe.com/cookie-settings" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>stripe.com/cookie-settings</a>
            </p>

            <SubHeading>Paddle — Merchant of Record</SubHeading>
            <p style={pStyle}>
              Paddle.com Market Limited, Judd House, 18–29 Mora Street, London, EC1V 8BT, UK. Als Merchant of Record setzt Paddle Cookies für den Checkout-Prozess und die Umsatzsteuerberechnung.
            </p>
            <CookieTable rows={[
              ["paddle_js",         "paddle.com", "Third-Party", "Session",  "Paddle Checkout — Session-Verwaltung"],
              ["paddle_vid",        "paddle.com", "Third-Party", "2 Jahre",  "Paddle Visitor ID — Betrugsprävention"],
              ["AWSALB",            "paddle.com", "Third-Party", "7 Tage",   "AWS Load Balancer — technisches Routing"],
              ["AWSALBCORS",        "paddle.com", "Third-Party", "7 Tage",   "AWS Load Balancer CORS — technisches Routing"],
            ]} />
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
              Paddle Datenschutz: <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>paddle.com/legal/privacy</a>
            </p>

            <SubHeading>PayPal — Zahlungsmethode</SubHeading>
            <p style={pStyle}>
              PayPal (Europe) S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, L-2449 Luxemburg. PayPal setzt Cookies wenn du PayPal als Zahlungsmethode wählst. PayPal agiert als unabhängiger Verantwortlicher (Controller).
            </p>
            <CookieTable rows={[
              ["akavpau_ppsd", "paypal.com", "Third-Party", "Session",  "Transaktionsverwaltung — technisch notwendig"],
              ["x-pp-s",       "paypal.com", "Third-Party", "Session",  "PayPal Session-Cookie"],
              ["ts",           "paypal.com", "Third-Party", "3 Jahre",  "Betrugsprävention und Geräteerkennung"],
              ["nsid",         "paypal.com", "Third-Party", "Session",  "Session-Identifikation für PayPal-Login"],
            ]} />
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
              PayPal Datenschutz: <a href="https://www.paypal.com/de/webapps/mpp/ua/privacy-full" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>paypal.com/de/webapps/mpp/ua/privacy-full</a>
            </p>

            <SubHeading>Wise und Payoneer — Interne Business-Konten</SubHeading>
            <p style={pStyle}>
              Wise und Payoneer sind interne Geschäftskonten von Audynia und werden nicht für Endkunden-Transaktionen eingesetzt. Sie setzen keine Cookies auf audynia.com.
            </p>
          </Section>

          {/* 4 */}
          <Section id="sec-4" label="4. Kommunikations-Cookies (Crisp)">
            <p style={pStyle}>
              Crisp IM SAS, 2 Boulevard de Launay, 44100 Nantes, Frankreich. Diese Cookies werden nur gesetzt wenn du Crisp Chat in den Cookie-Einstellungen aktivierst. Sie ermöglichen den Live-Chat-Support.
            </p>
            <p style={pStyle}>
              <strong style={{ color: "#aaa" }}>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1 lit. a DSGVO · § 25 Abs. 1 TTDSG)
            </p>
            <CookieTable rows={[
              ["crisp-client/session/*", "crisp.chat", "Third-Party", "6 Monate", "Chat-Session und Gesprächsverlauf"],
              ["crisp-client/data/*",    "crisp.chat", "Third-Party", "6 Monate", "Anonyme Nutzer-ID für Chat-Kontinuität"],
              ["crisp-client/bucket/*",  "crisp.chat", "Third-Party", "Session",  "Technisches Routing zum Crisp-Server"],
            ]} />
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
              Crisp Datenschutz: <a href="https://crisp.chat/privacy" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>crisp.chat/privacy</a> · Serverstandort: EU (Frankreich)
            </p>
          </Section>

          {/* 5 */}
          <Section id="sec-5" label="5. Marketing-Cookies (Meta Pixel)">
            <p style={pStyle}>
              Meta Platforms Ireland Limited, 4 Grand Canal Square, Dublin 2, Irland. Das Meta Pixel wird <strong style={{ color: "#ccc" }}>ausschließlich nach deiner ausdrücklichen Einwilligung</strong> geladen. Ohne Einwilligung werden keine Daten an Meta übertragen.
            </p>
            <p style={pStyle}>
              <strong style={{ color: "#aaa" }}>Rechtsgrundlage:</strong> Einwilligung (Art. 6 Abs. 1 lit. a DSGVO · § 25 Abs. 1 TTDSG)
            </p>
            <div style={{ background: "#1f0d0d", border: "1px solid #3a1a1a", borderRadius: 8, padding: "12px 16px", marginBottom: 12 }}>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                ⚠️ Diese Cookies verfolgen dich seitenübergreifend. Meta kann Informationen über dein Surf-Verhalten auf verschiedenen Websites sammeln und für personalisierte Werbung nutzen.
              </p>
            </div>
            <CookieTable rows={[
              ["_fbp", "facebook.com", "Third-Party", "3 Monate", "Identifiziert Browser für Conversion-Messung auf Facebook/Instagram"],
              ["_fbc", "facebook.com", "Third-Party", "3 Monate", "Speichert Klick-ID aus Facebook-Anzeigen (fbclid-Parameter)"],
            ]} />
            <p style={{ color: "#555", fontSize: 12, margin: "0 0 16px" }}>
              Meta Datenschutz: <a href="https://facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>facebook.com/privacy/policy</a> · Meta Pixel: <a href="https://facebook.com/business/help/742478679120153" target="_blank" rel="noopener noreferrer" style={{ color: "#555" }}>facebook.com/business/help</a>
            </p>
          </Section>

          {/* 6 */}
          <Section id="sec-6" label="6. Zahlungsanbieter-Cookies im Detail">
            <p style={pStyle}>
              Alle Zahlungsanbieter auf audynia.com sind PCI-DSS-zertifiziert. Ihre Cookies dienen ausschließlich der sicheren Zahlungsabwicklung und Betrugsprävention — nicht zu Werbezwecken auf audynia.com.
            </p>
            <DataTable headers={["Anbieter", "Rolle", "Cookies für Werbung?", "Datentransfer"]} rows={[
              ["Stripe",   "Auftragsverarbeiter",         "Nein",      "EU + USA (SCCs)"],
              ["Paddle",   "Merchant of Record (MoR)",    "Nein",      "UK + USA (SCCs)"],
              ["PayPal",   "Unabhängiger Controller",      "Ja (eigene)", "EU + USA (SCCs)"],
              ["Wise",     "Internes Business-Konto",     "Nein",      "Nicht auf audynia.com"],
              ["Payoneer", "Internes Business-Konto",     "Nein",      "Nicht auf audynia.com"],
            ]} />
            <p style={pStyle}>
              Hinweis zu PayPal: PayPal kann als unabhängiger Verantwortlicher eigene Marketing-Cookies setzen wenn du dich mit deinem PayPal-Konto anmeldest. Dies liegt außerhalb der Kontrolle von Audynia. Bitte beachte die Datenschutzerklärung von PayPal.
            </p>
          </Section>

          {/* 7 */}
          <Section id="sec-7" label="7. Einwilligung und Widerruf">
            <p style={pStyle}>
              Beim ersten Besuch von audynia.com erscheint ein Cookie-Banner. Du kannst einzeln auswählen welche Cookies du erlaubst. Deine Auswahl wird als Cookie <code style={{ background: "#1a1a1a", padding: "1px 6px", borderRadius: 4, color: "#ccc", fontSize: 12 }}>audynia_consent</code> für 365 Tage gespeichert.
            </p>
            <DataTable headers={["Aktion", "Ergebnis"]} rows={[
              ["Alle akzeptieren",      "Stripe, Paddle, PayPal, Crisp und Meta Pixel aktiv"],
              ["Nur notwendige",        "Nur Stripe, Paddle, PayPal aktiv. Crisp und Meta deaktiviert"],
              ["Einstellungen anpassen", "Einzelne Dienste per Toggle aktivieren oder deaktivieren"],
            ]} />
            <p style={pStyle}>
              <strong style={{ color: "#aaa" }}>Widerruf:</strong> Lösche das Cookie <code style={{ background: "#1a1a1a", padding: "1px 6px", borderRadius: 4, color: "#ccc", fontSize: 12 }}>audynia_consent</code> in deinen Browser-Einstellungen — beim nächsten Besuch erscheint der Banner erneut und du kannst deine Auswahl neu treffen.
            </p>
          </Section>

          {/* 8 */}
          <Section id="sec-8" label="8. Cookies in deinem Browser verwalten">
            <p style={pStyle}>Du kannst Cookies direkt in deinem Browser verwalten oder löschen:</p>
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              {([
                ["Google Chrome",   "Einstellungen → Datenschutz → Cookies und andere Websitedaten", "https://support.google.com/chrome/answer/95647"],
                ["Mozilla Firefox", "Einstellungen → Datenschutz → Cookies und Website-Daten",       "https://support.mozilla.org/de/kb/cookies-erlauben-und-ablehnen"],
                ["Apple Safari",    "Einstellungen → Datenschutz → Cookies verwalten",               "https://support.apple.com/de-de/guide/safari/sfri11471/mac"],
                ["Microsoft Edge",  "Einstellungen → Cookies und Website-Berechtigungen",             "https://support.microsoft.com/de-de/microsoft-edge"],
                ["iOS Safari",      "Einstellungen → Safari → Datenschutz und Sicherheit",           "https://support.apple.com/de-de/HT201265"],
              ] as [string, string, string][]).map(([browser, desc, url], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "150px 1fr auto", alignItems: "center", padding: "12px 16px", borderTop: i === 0 ? "none" : "1px solid #1e1e1e", gap: 12 }}>
                  <span style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>{browser}</span>
                  <span style={{ color: "#555", fontSize: 13 }}>{desc}</span>
                  <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#1DB954", fontSize: 12, textDecoration: "none", whiteSpace: "nowrap" }}>Anleitung →</a>
                </div>
              ))}
            </div>
            <p style={pStyle}>
              Hinweis: Das Deaktivieren technisch notwendiger Cookies kann die Funktionalität von audynia.com einschränken — insbesondere den Checkout-Prozess.
            </p>
          </Section>

          {/* 9 */}
          <Section id="sec-9" label="9. Rechte nach Jurisdiktion">
            <p style={pStyle}>Je nach deinem Wohnsitz gelten unterschiedliche Datenschutzgesetze:</p>

            <SubHeading>EU / EWR — DSGVO + § 25 TTDSG</SubHeading>
            <p style={pStyle}>Nicht-notwendige Cookies erfordern eine vorherige, informierte und freiwillige Einwilligung. Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung und Datenportabilität.</p>

            <SubHeading>Vereinigtes Königreich — UK PECR + UK GDPR</SubHeading>
            <p style={pStyle}>Gleichwertige Anforderungen wie EU-DSGVO. Der ICO (Information Commissioner's Office) ist zuständige Aufsichtsbehörde. Maximale Strafe: 17,5 Mio. GBP oder 4% des weltweiten Jahresumsatzes.</p>

            <SubHeading>Kanada — PIPEDA</SubHeading>
            <p style={pStyle}>Informierte Einwilligung vor der Datenerhebung erforderlich. Du hast das Recht auf Zugang zu deinen Daten und deren Korrektur. Anfragen an den OPC (Office of the Privacy Commissioner of Canada) möglich.</p>

            <SubHeading>Australien — Privacy Act (APPs)</SubHeading>
            <p style={pStyle}>Kein gesetzliches Cookie-Banner-Erfordernis, aber Offenlegungspflicht in der Datenschutzerklärung. Cookies die persönliche Informationen sammeln unterliegen den Australian Privacy Principles.</p>

            <SubHeading>Neuseeland — Privacy Act 2020</SubHeading>
            <p style={pStyle}>Transparenzpflicht bei der Datenerhebung. Offenlegung von Zweck und Verwendung erforderlich.</p>

            <SubHeading>USA / Kalifornien — CCPA/CPRA</SubHeading>
            <p style={pStyle}>Kein verpflichtender Cookie-Banner, aber Offenlegungspflicht in der Datenschutzerklärung. Recht auf Opt-out vom Verkauf oder der Weitergabe persönlicher Daten. Global Privacy Control (GPC) Signale werden respektiert.</p>
          </Section>

          {/* 10 */}
          <Section id="sec-10" label="10. Änderungen dieser Richtlinie">
            <p style={pStyle}>
              Diese Cookie-Richtlinie wird aktualisiert wenn wir neue Dienste einsetzen, bestehende ändern oder rechtliche Anforderungen sich ändern. Bei wesentlichen Änderungen erscheint beim nächsten Besuch erneut der Cookie-Banner zur Bestätigung deiner Einwilligung.
            </p>
            <p style={pStyle}>
              Die aktuelle Version ist immer unter <a href="/cookies" style={{ color: "#1DB954", textDecoration: "none" }}>audynia.com/cookies</a> abrufbar.
            </p>
          </Section>

          {/* 11 */}
          <Section id="sec-11" label="11. Kontakt">
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
              {([
                ["E-Mail",            "info@audynia.com"],
                ["Betreff",           "Cookie-Anfrage / Datenschutzanfrage"],
                ["Antwortfrist",      "30 Tage"],
                ["Datenschutz",       "audynia.com/datenschutz"],
              ] as [string, string][]).map(([label, value], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "12px 16px", borderTop: i === 0 ? "none" : "1px solid #1e1e1e" }}>
                  <span style={{ color: "#888", fontSize: 13, fontWeight: 600 }}>{label}</span>
                  <span style={{ color: "#555", fontSize: 13 }}>
                    {label === "E-Mail" ? <a href="mailto:info@audynia.com" style={{ color: "#1DB954", textDecoration: "none" }}>{value}</a> :
                     label === "Datenschutz" ? <a href="/datenschutz" style={{ color: "#1DB954", textDecoration: "none" }}>{value}</a> :
                     value}
                  </span>
                </div>
              ))}
            </div>
          </Section>

          <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
            Audynia · 30 N Gould St Ste 100, Sheridan, WY 82801, USA · info@audynia.com · Version 1.0 · 15.05.2026
          </p>

        </div>
      </main>
    </>
  );
}

const pStyle: React.CSSProperties = { color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px" };

function Section({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 48, scrollMarginTop: 80 }}>
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

function CategoryBadge({ color, label, desc }: { color: string; label: string; desc: string }) {
  return (
    <div style={{ background: color, border: "1px solid #2a2a2a", borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ color: "#ccc", fontSize: 13, fontWeight: 700, minWidth: 160 }}>{label}</span>
      <span style={{ color: "#666", fontSize: 13 }}>{desc}</span>
    </div>
  );
}

function CookieTable({ rows }: { rows: string[][] }) {
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "10px 0 16px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr 0.8fr 0.8fr 2fr", borderBottom: "1px solid #252525" }}>
        {["Name", "Domain", "Typ", "Laufzeit", "Zweck"].map((h, i) => (
          <div key={i} style={{ padding: "10px 12px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
        ))}
      </div>
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: "1.4fr 0.9fr 0.8fr 0.8fr 2fr", borderTop: "1px solid #1e1e1e" }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{ padding: "10px 12px", color: ci === 0 ? "#ccc" : "#555", fontSize: 12, lineHeight: 1.5, fontFamily: ci === 0 ? "monospace" : "inherit" }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function DataTable({ headers, rows }: { headers?: string[]; rows: string[][] }) {
  const cols = rows[0]?.length ?? 2;
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "10px 0 16px" }}>
      {headers && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, borderBottom: "1px solid #252525" }}>
          {headers.map((h, i) => (
            <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
      )}
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, borderTop: ri === 0 && !headers ? "none" : "1px solid #1e1e1e" }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{ padding: "10px 14px", color: ci === 0 ? "#888" : "#555", fontSize: 13, lineHeight: 1.6, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
