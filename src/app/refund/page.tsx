export default function RefundPage() {
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
            Erstattungs- und Rückgaberichtlinie
          </h1>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>Gültig für: Weltweit · EU/EWR, UK, Kanada, Australien, Neuseeland und alle weiteren Märkte</p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>Konform mit: Paddle Seller Agreement · Stripe Services Agreement · PayPal User Agreement · EU Verbraucherrechterichtlinie 2011/83/EU</p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 48 }}>Zuletzt aktualisiert: 15.05.2026 · Version 1.0</p>

          {/* Prinzip-Box */}
          <div style={{ background: "#0d1f0d", border: "1px solid #1a3a1a", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
            <p style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 8px" }}>Das Prinzip von Vowlyra</p>
            <p style={{ color: "#ccc", fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>Nur zahlen wenn der Trailer gefällt.</p>
            <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Jeder Kunde erhält vor der Zahlung eine kostenlose 30-sekündige Song-Vorschau (Preview). Die Kaufentscheidung fällt erst nach dem Anhören der Preview. Dieses Prinzip ist die Grundlage unserer fairen Erstattungsrichtlinie.
            </p>
          </div>

          {/* Inhaltsverzeichnis */}
          <Section label="Inhaltsverzeichnis">
            <ol style={{ color: "#666", fontSize: 14, lineHeight: 2, paddingLeft: 20, margin: 0, listStyleType: "decimal" }}>
              {([
                ["sec-1",  "Grundsatz und Geschäftsmodell"],
                ["sec-2",  "Gesetzliches Widerrufsrecht (EU/UK)"],
                ["sec-3",  "Freiwillige Erstattungsgarantie — 4 Erstattungsfälle"],
                ["sec-4",  "Kein Erstattungsanspruch — ausgeschlossene Fälle"],
                ["sec-5",  "Kostenlose neue Demo als Alternative"],
                ["sec-6",  "Erstattungsprozess — Schritt für Schritt"],
                ["sec-7",  "Gateway-spezifische Erstattungsregelungen"],
                ["sec-8",  "Bearbeitungszeiten nach Zahlungsmethode"],
                ["sec-9",  "Chargeback-Hinweis"],
                ["sec-10", "Kontakt"],
              ] as [string, string][]).map(([id, label], i) => (
                <li key={i}><a href={`#${id}`} className="toc-link">{label}</a></li>
              ))}
            </ol>
          </Section>

          {/* 1 */}
          <Section id="sec-1" label="1. Grundsatz und Geschäftsmodell">
            <NP n={1}>Vowlyra LLC (nachfolgend &bdquo;Vowlyra&ldquo;) steht hinter jedem personalisierten Song den wir erstellen. Da der Kunde die Vorschau vor der Kaufentscheidung kostenlos anhört, sind unsere Erstattungsbedingungen klar, fair und auf konkrete Fälle begrenzt.</NP>
            <NP n={2}>Bei unseren Produkten handelt es sich um digitale Güter die auf ausdrücklichen Wunsch des Kunden sofort und individuell produziert werden. Das gesetzliche Widerrufsrecht erlischt daher mit Bereitstellung des vollständigen Songs — sofern der Kunde vor der Zahlung durch Anklicken der entsprechenden Pflicht-Checkbox ausdrücklich zugestimmt hat.</NP>
            <NP n={3}>Unabhängig davon gewähren wir eine freiwillige Erstattungsgarantie in den in Abschnitt 3 definierten Fällen.</NP>
          </Section>

          {/* 2 */}
          <Section id="sec-2" label="2. Gesetzliches Widerrufsrecht (EU/UK)">
            <NP n={1}>Verbrauchern in der EU und im Vereinigten Königreich steht grundsätzlich ein gesetzliches Widerrufsrecht von 14 Tagen ab Vertragsabschluss zu (§ 356 Abs. 5 BGB, Art. 16 lit. m Verbraucherrechterichtlinie 2011/83/EU).</NP>
            <NP n={2}>Das Widerrufsrecht erlischt vorzeitig wenn: (a) Vowlyra mit der Ausführung des Vertrags begonnen hat, (b) der Kunde vor der Zahlung ausdrücklich zugestimmt hat dass die Lieferung sofort beginnt, und (c) der Kunde bestätigt hat dass er mit dieser Zustimmung sein Widerrufsrecht verliert.</NP>
            <NP n={3}>Die Bestätigung erfolgt durch aktives Anklicken der Pflicht-Checkbox vor der Zahlung. Ohne diese Bestätigung ist eine Bestellung technisch nicht möglich.</NP>
            <NP n={4}>Die vollständige Widerrufsbelehrung sowie das Muster-Widerrufsformular sind unter <a href="/widerrufsbelehrung" style={{ color: "#1DB954", textDecoration: "none" }}>vowlyra.com/widerrufsbelehrung</a> abrufbar.</NP>
          </Section>

          {/* 3 */}
          <Section id="sec-3" label="3. Freiwillige Erstattungsgarantie — 4 Erstattungsfälle">
            <NP n={1}>Vowlyra gewährt unabhängig vom gesetzlichen Widerrufsrecht eine vollständige freiwillige Erstattung in den folgenden abschließend definierten Fällen:</NP>
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "12px 0 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", borderBottom: "1px solid #252525" }}>
                {["Fall", "Bedingung"].map((h, i) => (
                  <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {([
                ["Fall 1 — Abweichung von der Preview",
                  "Der final gelieferte vollständige Song stimmt inhaltlich wesentlich nicht mit der zuvor zugeschickten 30-sekündigen Vorschau überein. Beispiele: Musikstil hat sich geändert, emotionaler Ton ist grundlegend anders, Song klingt wie ein komplett anderes Produkt."],
                ["Fall 2 — Fehlerhafte Personalisierung",
                  "Der gelieferte Song spiegelt die im Wizard eingegebenen persönlichen Angaben nicht korrekt wider. Beispiele: Name falsch oder nicht verwendet, falscher Anlass vertont, persönliche Geschichte nicht berücksichtigt, gewünschter Musikstil oder Stimmung nicht umgesetzt."],
                ["Fall 3 — Zahlung ohne Preview",
                  "Der Kunde hat einen Zahlungslink erhalten ohne zuvor eine kostenlose 30-sekündige Vorschau erhalten zu haben. Das widerspricht dem Geschäftsmodell von Vowlyra und begründet unabhängig vom Zahlungsstatus einen Erstattungsanspruch."],
                ["Fall 4 — Technisches Lieferproblem",
                  "Der Kunde ist technisch nicht in der Lage die gelieferte MP3-Datei auf seinem Gerät herunterzuladen oder zu speichern, und Vowlyra kann das Problem nicht innerhalb von 48 Stunden lösen."],
              ] as [string, string][]).map(([fall, text], ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: "120px 1fr", borderTop: "1px solid #1e1e1e" }}>
                  <div style={{ padding: "12px 14px", color: "#1DB954", fontSize: 12, fontWeight: 700, lineHeight: 1.5 }}>{fall}</div>
                  <div style={{ padding: "12px 14px", color: "#555", fontSize: 13, lineHeight: 1.7 }}>{text}</div>
                </div>
              ))}
            </div>
            <NP n={2}>Die freiwillige Erstattungsgarantie gilt für alle Märkte weltweit — unabhängig vom Wohnsitz des Kunden und unabhängig davon ob ein gesetzliches Widerrufsrecht besteht oder nicht.</NP>
          </Section>

          {/* 4 */}
          <Section id="sec-4" label="4. Kein Erstattungsanspruch — ausgeschlossene Fälle">
            <NP n={1}>Eine Erstattung ist in folgenden Fällen ausgeschlossen:</NP>
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "12px 0 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderBottom: "1px solid #252525" }}>
                {["Ausschlussgrund", "Erläuterung"].map((h, i) => (
                  <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {([
                ["Subjektive Unzufriedenheit",
                  "Der Song gefällt dem Kunden persönlich nicht — entspricht jedoch inhaltlich der Preview und spiegelt die Bestellangaben korrekt wider. Da die Preview kostenlos vorab angehört werden konnte, ist eine rein geschmackliche Ablehnung nach erfolgter Zahlung kein Erstattungsgrund."],
                ["Falsche Eingaben des Kunden",
                  "Der Kunde hat im Bestellprozess fehlerhafte oder unvollständige Angaben gemacht (z.B. falscher Name, falscher Anlass) und der Song wurde entsprechend dieser Eingaben korrekt produziert."],
                ["Verspätete Anfragen",
                  "Erstattungsanfragen die mehr als 30 Tage nach der Zahlung eingehen werden grundsätzlich nicht bearbeitet — ausgenommen technische Probleme gemäß Fall 4 wenn diese erst später erkennbar werden."],
                ["Missbräuchliche Nutzung",
                  "Der Song wurde bereits heruntergeladen, verwendet oder geteilt und kein berechtigter Erstattungsgrund nach Abschnitt 3 liegt vor."],
                ["Verstoß gegen Nutzungsbedingungen",
                  "Der Kunde hat gegen die Nutzungsbedingungen von Vowlyra verstoßen, insbesondere durch kommerzielle Nutzung oder missbräuchliche Eingaben im Wizard."],
              ] as [string, string][]).map(([grund, text], ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: "180px 1fr", borderTop: "1px solid #1e1e1e" }}>
                  <div style={{ padding: "12px 14px", color: "#888", fontSize: 13, fontWeight: 600, lineHeight: 1.5 }}>{grund}</div>
                  <div style={{ padding: "12px 14px", color: "#555", fontSize: 13, lineHeight: 1.7 }}>{text}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 5 */}
          <Section id="sec-5" label="5. Kostenlose neue Demo als Alternative">
            <NP n={1}>Bevor ein Erstattungsantrag gestellt wird bietet Vowlyra eine Alternative an: Wenn die Preview nicht vollständig den Vorstellungen des Kunden entspricht, hat er das Recht auf eine kostenlose neue Demo die seinen Wünschen besser entspricht.</NP>
            <NP n={2}>Dieser Anspruch besteht einmalig pro Bestellung und muss per E-Mail an <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a> vor der Zahlung geltend gemacht werden. Der Kunde beschreibt was ihm an der Preview nicht gefällt und was er sich anders vorstellt.</NP>
            <NP n={3}>Die kostenlose neue Demo ist kein Ersatz für die Erstattungsgarantie — beide Rechte bestehen unabhängig voneinander.</NP>
          </Section>

          {/* 6 */}
          <Section id="sec-6" label="6. Erstattungsprozess — Schritt für Schritt">
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "0 0 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "90px 140px 1fr", borderBottom: "1px solid #252525" }}>
                {["Schritt", "Aktion", "Details"].map((h, i) => (
                  <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {([
                ["Schritt 1", "E-Mail senden", "An: info@vowlyra.com · Betreff: Erstattungsantrag - [Ihre E-Mail-Adresse]"],
                ["Schritt 2", "Pflichtangaben", "Bei der Bestellung verwendete E-Mail-Adresse · Erstattungsgrund (Fall 1, 2, 3 oder 4) · Kurze Beschreibung des Problems · Ungefährer Bestellzeitpunkt · Verwendete Zahlungsmethode (Paddle / Stripe / PayPal)"],
                ["Schritt 3", "Bearbeitungszeit", "Vowlyra bearbeitet Erstattungsanträge innerhalb von 5 Werktagen und meldet sich per E-Mail."],
                ["Schritt 4", "Auszahlung", "Genehmigte Erstattungen werden über dieselbe Zahlungsmethode zurückgezahlt die bei der ursprünglichen Transaktion verwendet wurde. Gutschriften auf andere Konten oder Methoden sind technisch nicht möglich."],
              ] as string[][]).map((row, ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: "90px 140px 1fr", borderTop: "1px solid #1e1e1e" }}>
                  <div style={{ padding: "12px 14px", color: "#1DB954", fontSize: 12, fontWeight: 700 }}>{row[0]}</div>
                  <div style={{ padding: "12px 14px", color: "#888", fontSize: 13, fontWeight: 600 }}>{row[1]}</div>
                  <div style={{ padding: "12px 14px", color: "#555", fontSize: 13, lineHeight: 1.7 }}>{row[2]}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 7 */}
          <Section id="sec-7" label="7. Gateway-spezifische Erstattungsregelungen">

            <SubHeading>7.1 Paddle (Merchant of Record)</SubHeading>
            <InfoBox color="#1f1a00">
              <p style={{ color: "#aaa", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Paddle Pflichtstandard (Paddle Customer Handbook)</p>
              <BulletList items={[
                "Sellers müssen mindestens eine 30-Tage-Money-Back-Guarantee anbieten",
                "Erstattungen werden innerhalb von 14 Tagen nach Genehmigung über dieselbe Zahlungsmethode verarbeitet",
                "Paddle behält die originale Bearbeitungsgebühr ein — Vowlyra erstattet dem Kunden dennoch den vollen Kaufpreis",
              ]} muted />
            </InfoBox>
            <NP n={1}>Bei Paddle-Transaktionen ist Paddle der Merchant of Record und verarbeitet die Erstattung technisch. Die Erstattung erscheint auf der Kontoabrechnung unter &bdquo;Paddle&ldquo; oder &bdquo;Paddle.net&ldquo;.</NP>
            <NP n={2}>Erstattungsfrist bei Paddle-Transaktionen: 30 Tage nach Zahlung (Paddle-Pflichtstandard). Erstattungsanfragen können eingereicht werden über: Vowlyra direkt info@vowlyra.com (empfohlen — wir koordinieren mit Paddle), Paddle direkt paddle.net, oder über den Link &bdquo;View receipt&ldquo; in der Transaktionsbestätigung.</NP>
            <NP n={3}>Paddle kann eine Erstattung ablehnen wenn Betrug, Erstattungsmissbrauch oder manipulatives Verhalten nachgewiesen wird. Dies berührt nicht die gesetzlichen Verbraucherrechte.</NP>

            <SubHeading>7.2 Stripe</SubHeading>
            <NP n={1}>Bei Stripe-Transaktionen ist Vowlyra LLC der rechtliche Verkäufer und veranlasst die Erstattung direkt über das Stripe-Dashboard.</NP>
            <NP n={2}>Erstattungsfrist bei Stripe-Transaktionen: 30 Tage nach Zahlung. Alle Erstattungsanfragen richten Sie bitte an <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a>.</NP>
            <NP n={3}>Stripe-Erstattungen gehen ausschließlich an die ursprüngliche Zahlungsmethode zurück. Ist die Karte abgelaufen, leitet das Kartennetzwerk die Erstattung trotzdem an das korrekte Konto weiter. Stripe behält die originale Bearbeitungsgebühr ein — Vowlyra trägt diese intern und erstattet den vollen Kaufpreis.</NP>

            <SubHeading>7.3 PayPal</SubHeading>
            <InfoBox color="#141414">
              <p style={{ color: "#aaa", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Wichtige Hinweise zu PayPal</p>
              <BulletList items={[
                "PayPal Seller Protection deckt digitale Güter nur eingeschränkt ab",
                "SNAD-Claims (Significantly Not as Described) sind die häufigste Dispute-Art bei digitalen Produkten",
                "Vowlyra speichert für jede Bestellung vollständige Liefernachweise: Zeitstempel, E-Mail-Bestätigung, Download-Log mit IP-Adresse",
                "Bitte kontaktieren Sie uns vor einer Dispute-Eröffnung bei PayPal — wir lösen Probleme schnell und unbürokratisch",
              ]} muted />
            </InfoBox>
            <NP n={1}>Kontaktieren Sie uns bitte zuerst unter <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a> bevor Sie eine Dispute-Anfrage bei PayPal eröffnen. Wir lösen Probleme oft noch am selben Werktag.</NP>
            <NP n={2}>PayPal-Disputes können bis zu 180 Tage nach der ursprünglichen Transaktion eröffnet werden. Vowlyra speichert alle relevanten Liefernachweise für diesen Zeitraum.</NP>
            <NP n={3}>Genehmigte Erstattungen werden direkt auf das PayPal-Konto zurückgezahlt.</NP>

            <SubHeading>7.4 Wise und Payoneer</SubHeading>
            <NP n={1}>Wise und Payoneer sind interne Business-Konten von Vowlyra LLC und keine Endkunden-Zahlungsgateways. Kunden können keine Erstattungen über Wise oder Payoneer beantragen. Alle Erstattungsanfragen richten Sie bitte an <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a>.</NP>
          </Section>

          {/* 8 */}
          <Section id="sec-8" label="8. Bearbeitungszeiten nach Zahlungsmethode">
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "0 0 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr", borderBottom: "1px solid #252525" }}>
                {["Zahlungsmethode", "Rückzahlung über", "Dauer", "Anmerkung"].map((h, i) => (
                  <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
                ))}
              </div>
              {([
                ["Kreditkarte via Paddle", "Paddle.net",            "5–10 Werktage", "Paddle ist MoR — Rückzahlung erscheint als 'Paddle'"],
                ["Kreditkarte via Stripe", "Ursprüngliche Karte",   "5–10 Werktage", "Stripe bearbeitet direkt — Vowlyra behält keine Gebühren"],
                ["PayPal",                 "PayPal-Konto",          "3–14 Werktage", "Bitte zuerst info@vowlyra.com kontaktieren"],
                ["SEPA via Paddle",        "Paddle.net",            "5–10 Werktage", "Abgewickelt durch Paddle als MoR"],
                ["SEPA via Stripe",        "Ursprüngliches Konto",  "5–10 Werktage", "Direkte Bankerstattung"],
              ] as string[][]).map((row, ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1.5fr", borderTop: "1px solid #1e1e1e" }}>
                  {row.map((cell, ci) => (
                    <div key={ci} style={{ padding: "10px 14px", color: ci === 0 ? "#888" : "#555", fontSize: 13, lineHeight: 1.6, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
          </Section>

          {/* 9 */}
          <Section id="sec-9" label="9. Chargeback-Hinweis">
            <InfoBox color="#1f0d0d">
              <p style={{ color: "#aaa", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Bitte kontaktieren Sie uns vor einer Rückbuchung (Chargeback) bei Ihrer Bank</p>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Vowlyra und Paddle bitten Sie dringend zunächst uns direkt unter info@vowlyra.com zu kontaktieren bevor Sie eine Rückbuchung bei Ihrer Bank oder Ihrem Kartenanbieter einleiten. Ungerechtfertigte Chargebacks können zur Sperrung Ihres Zugangs zu vowlyra.com führen und sind mit einer Gebühr von bis zu 20 US-Dollar verbunden.
              </p>
            </InfoBox>
            <NP n={1}>Als Nachweis für die Lieferung digitaler Produkte speichert Vowlyra für jede Bestellung: Transaktions-ID, Zeitstempel der Song-Bereitstellung, E-Mail-Adresse des Empfängers, Download-Zeitstempel und IP-Adresse sowie Bestätigung der Pflicht-Checkboxen. Diese Nachweise werden bei Chargebacks als Beweis eingereicht.</NP>
            <NP n={2}>Eine hohe Chargeback-Rate (über 1%) kann zur Sperrung des Merchant-Accounts bei Stripe oder Paddle führen. Vowlyra nimmt Chargeback-Prävention ernst und bittet alle Kunden bei Problemen zuerst den direkten Kontakt zu suchen.</NP>
          </Section>

          {/* 10 */}
          <Section id="sec-10" label="10. Kontakt">
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "0 0 16px" }}>
              {([
                ["E-Mail (bevorzugt)",   <a key="mail" href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a>],
                ["Betreff für Erstattungen", "Erstattungsantrag - [Ihre E-Mail-Adresse]"],
                ["Live-Chat",            "vowlyra.com (Crisp-Chat)"],
                ["Antwortzeit",          "Innerhalb von 24 Stunden an Werktagen (Mo–Fr)"],
                ["Bearbeitungsfrist",    "5 Werktage nach Eingang des vollständigen Antrags"],
                ["Paddle direkt",        "paddle.net → Request refund"],
              ] as [string, React.ReactNode][]).map(([label, value], ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderTop: ri === 0 ? "none" : "1px solid #1e1e1e" }}>
                  <div style={{ padding: "10px 14px", color: "#888", fontSize: 13, fontWeight: 600 }}>{label}</div>
                  <div style={{ padding: "10px 14px", color: "#555", fontSize: 13 }}>{value}</div>
                </div>
              ))}
            </div>
          </Section>

          <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
            Vowlyra LLC · 30 N Gould St Ste 100, Sheridan, WY 82801, USA · info@vowlyra.com · Version 1.0 · 15.05.2026
          </p>

        </div>
      </main>
    </>
  );
}

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

function NP({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px", display: "flex", gap: 10 }}>
      <span style={{ color: "#444", fontWeight: 700, flexShrink: 0 }}>({n})</span>
      <span>{children}</span>
    </p>
  );
}

function BulletList({ items, muted }: { items: string[]; muted?: boolean }) {
  return (
    <ul style={{ margin: "4px 0 0 0", paddingLeft: 18, color: muted ? "#666" : "#666", fontSize: 13, lineHeight: 1.8 }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 2 }}>{item}</li>)}
    </ul>
  );
}

function InfoBox({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <div style={{ background: color, border: "1px solid #2a2a2a", borderRadius: 10, padding: "16px 20px", margin: "12px 0 16px" }}>
      {children}
    </div>
  );
}
