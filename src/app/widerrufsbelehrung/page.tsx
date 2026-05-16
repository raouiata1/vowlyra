export default function WiderrufsbelehrungPage() {
  return (
    <main style={{ background: "#0e0e0e", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>

        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 48 }}>
          ← Zurück
        </a>

        <h1 style={{ color: "#fff", fontSize: 40, fontWeight: 800, marginBottom: 8, letterSpacing: "-1.5px" }}>
          Widerrufsbelehrung
        </h1>
        <p style={{ color: "#333", fontSize: 12, marginBottom: 56 }}>
          Gesetzliche Grundlage: § 312g BGB, § 355 BGB, § 356 Abs. 5 BGB, Art. 16 lit. m Verbraucherrechterichtlinie 2011/83/EU, EGBGB Anlage 1, Art. 246a § 1 Abs. 2 Nr. 1 EGBGB, Paddle Buyer Terms, Paddle Customer Handbook, Stripe Website Checklist, EU-Richtlinie 2023/2673
        </p>

        {/* 1. Widerrufsrecht */}
        <Section label="1. Widerrufsrecht">
          <P>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</P>
          <P>Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.</P>
          <P>Um Ihr Widerrufsrecht auszuüben, müssen Sie uns per E-Mail an <Link href="mailto:info@vowlyra.com">info@vowlyra.com</Link> mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.</P>
          <P>Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.</P>
        </Section>

        {/* 2. Widerrufsfolgen */}
        <Section label="2. Widerrufsfolgen">
          <P>Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.</P>
          <P>Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart. In keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.</P>
          <Subheading>Hinweis zur Rückzahlungsmethode je nach Zahlungsanbieter:</Subheading>
          <div style={{ overflowX: "auto", marginTop: 8 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #282828" }}>
                  {["Zahlungsmethode", "Rückzahlung über", "Bearbeitungsdauer", "Anmerkung"].map(h => (
                    <th key={h} style={{ color: "#1DB954", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 14px", textAlign: "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Kreditkarte via Paddle", "Paddle — paddle.net", "5–10 Werktage", "Paddle ist MoR — Rückzahlung läuft über Paddle"],
                  ["Kreditkarte via Stripe", "Ursprüngliche Karte", "5–10 Werktage", "Stripe leitet Erstattung direkt an Kartenanbieter"],
                  ["PayPal", "PayPal-Konto", "3–14 Werktage", "Bitte zuerst info@vowlyra.com kontaktieren — vor Dispute-Eröffnung"],
                  ["SEPA via Paddle", "Paddle — paddle.net", "5–10 Werktage", "Abgewickelt durch Paddle als MoR"],
                  ["SEPA via Stripe", "Ursprüngliches Bankkonto", "5–10 Werktage", "Direkte Bankerstattung über SEPA-Netzwerk"],
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1e1e1e", background: i % 2 === 0 ? "#181818" : "transparent" }}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ color: j === 0 ? "#ccc" : "#666", padding: "10px 14px", lineHeight: 1.5 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* 3. Erlöschen */}
        <Section label="3. Erlöschen des Widerrufsrechts bei digitalen Inhalten">
          <P>Das Widerrufsrecht erlischt bei einem Vertrag zur Lieferung von digitalen Inhalten, die nicht auf einem körperlichen Datenträger geliefert werden, wenn:</P>
          <ul style={{ color: "#666", fontSize: 14, lineHeight: 1.8, paddingLeft: 20, margin: "0 0 16px" }}>
            <li>der Unternehmer mit der Ausführung des Vertrags begonnen hat,</li>
            <li>der Verbraucher ausdrücklich zugestimmt hat, dass der Unternehmer mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist beginnt, und</li>
            <li>der Verbraucher seine Kenntnis davon bestätigt hat, dass er durch seine Zustimmung mit Beginn der Ausführung des Vertrags sein Widerrufsrecht verliert.</li>
          </ul>
          <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "16px 20px", marginBottom: 16 }}>
            <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              <span style={{ color: "#1DB954", fontWeight: 600 }}>Im Klartext für Vowlyra-Kunden:</span> Sobald Sie nach erfolgter Zahlung die Produktion Ihres personalisierten Songs bestätigen und der vollständige Song auf der Seite /song/full für Sie bereitgestellt wird, erlischt Ihr Widerrufsrecht. Dies gilt ausschließlich dann, wenn Sie vor der Zahlung durch Anklicken der entsprechenden Checkbox ausdrücklich zugestimmt haben, dass die Lieferung sofort beginnt und Sie Ihr Widerrufsrecht mit Beginn der Lieferung verlieren.
            </p>
          </div>
          <P>Ohne diese ausdrückliche Bestätigung vor der Zahlung bleibt Ihr Widerrufsrecht für 14 Tage ab Vertragsabschluss bestehen.</P>
          <Subheading>Pflichtcheckboxen im Checkout — beide müssen aktiv angehakt werden:</Subheading>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 12 }}>
            <CheckboxItem text="Ich stimme ausdrücklich zu, dass Vowlyra LLC mit der Ausführung des Vertrags unmittelbar nach meiner Zahlung beginnt. Mir ist bekannt, dass ich dadurch mein Widerrufsrecht verliere, sobald der Song vollständig bereitgestellt wurde." />
            <CheckboxItem text="Ich habe die AGB und die Widerrufsbelehrung gelesen und akzeptiere diese." />
          </div>
        </Section>

        {/* 4. Gateway-spezifisch */}
        <Section label="4. Gateway-spezifische Widerrufs- und Erstattungsregelungen">

          <Subheading>4.1 Paddle als Merchant of Record</Subheading>
          <P>Wenn Ihre Zahlung über Paddle.com Market Limited als Merchant of Record abgewickelt wird, gelten zusätzlich folgende Bedingungen:</P>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            <InfoCard title="(a) 30-Tage-Rückgabegarantie (Paddle-Pflichtstandard)">
              Gemäß den Paddle Seller-Anforderungen gewährt Vowlyra LLC bei Paddle-Transaktionen eine freiwillige 30-Tage-Rückgabegarantie — über die gesetzlichen 14 Tage hinaus — in den in Abschnitt 5 definierten Erstattungsfällen.
            </InfoCard>
            <InfoCard title="(b) Erstattungsabwicklung über Paddle">
              Bei Paddle-Transaktionen wird die Erstattung technisch von Paddle verarbeitet. Genehmigte Erstattungen werden innerhalb von 14 Tagen nach Genehmigung bearbeitet. Auf Ihrer Kontoabrechnung erscheint die Rückzahlung unter &quot;Paddle&quot; oder &quot;Paddle.net&quot;. Sie können Erstattungsanfragen einreichen über: info@vowlyra.com (empfohlen), paddle.net → &quot;Request refund&quot;, oder über Ihre Transaktionsbestätigungs-E-Mail.
            </InfoCard>
            <InfoCard title="(c) Paddle Buyer Terms">
              Als Käufer über Paddle unterliegen Sie ergänzend den Paddle Buyer Terms and Conditions (paddle.com/legal/buyer-terms). Bei Widersprüchen gelten die für Sie als Verbraucher günstigeren Regelungen.
            </InfoCard>
            <InfoCard title="(d) Wichtiger Hinweis zu Chargebacks bei Paddle">
              Vowlyra LLC und Paddle bitten Sie dringend, uns vor Einleitung einer Rückbuchung (Chargeback) bei Ihrer Bank direkt zu kontaktieren. Ungerechtfertigte Chargebacks können zur Sperrung Ihres Zugangs zu vowlyra.com führen.
            </InfoCard>
          </div>

          <Subheading>4.2 Stripe als Zahlungsabwickler (Fallback)</Subheading>
          <P>Wenn Ihre Zahlung über Stripe Payments Europe Limited abgewickelt wird, ist Vowlyra LLC der rechtliche Verkäufer und wickelt die Erstattung direkt ab:</P>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
            <InfoCard title="(a) Rückzahlung via gleiche Zahlungsmethode">
              Stripe-Erstattungen werden ausschließlich über dieselbe Zahlungsmethode zurückgezahlt. Ist Ihre Karte abgelaufen, leitet das Kartennetzwerk die Erstattung trotzdem an das korrekte Konto weiter.
            </InfoCard>
            <InfoCard title="(b) Keine zusätzlichen Gebühren für Sie">
              Vowlyra LLC erstattet Ihnen stets den vollen Kaufpreis. Etwaige interne Bearbeitungsgebühren werden von Vowlyra getragen.
            </InfoCard>
            <InfoCard title="(c) Kontakt bei Stripe-Transaktionen">
              Alle Erstattungsanfragen bei Stripe-Transaktionen richten Sie bitte ausschließlich an: info@vowlyra.com. Wir veranlassen die Erstattung direkt über das Stripe-Dashboard.
            </InfoCard>
          </div>

          <Subheading>4.3 PayPal als Zahlungsmethode</Subheading>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 8 }}>
            <InfoCard title="(a) Bitte zuerst uns kontaktieren">
              Wenn Sie mit Ihrer PayPal-Zahlung unzufrieden sind, kontaktieren Sie uns bitte zuerst unter info@vowlyra.com — bevor Sie eine Dispute-Anfrage bei PayPal eröffnen. Wir lösen Probleme schnell, oft noch am selben Werktag.
            </InfoCard>
            <InfoCard title="(b) Liefernachweis">
              Vowlyra LLC speichert für jede Bestellung einen vollständigen digitalen Liefernachweis (Zeitstempel, E-Mail-Bestätigung, Download-Log) der als Beweismittel bei PayPal-Disputes eingereicht werden kann.
            </InfoCard>
            <InfoCard title="(c) Erstattung bei PayPal">
              Genehmigte Erstattungen werden direkt auf Ihr PayPal-Konto zurückgezahlt. Bearbeitungszeit: 3–14 Werktage. Bitte beachten Sie, dass PayPal-Disputes bis zu 180 Tage nach der ursprünglichen Transaktion eröffnet werden können.
            </InfoCard>
          </div>
        </Section>

        {/* 5. Freiwillige Erstattungsgarantie */}
        <Section label="5. Freiwillige Erstattungsgarantie von Vowlyra">
          <P>Unabhängig vom gesetzlichen Widerrufsrecht gewährt Vowlyra LLC eine freiwillige vollständige Erstattung in folgenden abschließend definierten Fällen:</P>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {[
              ["Fall 1 — Abweichung von der Preview", "Der final gelieferte vollständige Song stimmt inhaltlich nicht mit der zuvor zugeschickten 30-sekündigen Vorschau überein."],
              ["Fall 2 — Fehlerhafte Personalisierung", "Der gelieferte Song spiegelt die im Wizard eingegebenen persönlichen Angaben — insbesondere Namen, Anlass, persönliche Geschichte, emotionaler Klang oder Musikstil — nicht korrekt wider."],
              ["Fall 3 — Zahlung ohne Preview", "Der Kunde hat einen Zahlungslink erhalten ohne zuvor eine kostenlose 30-sekündige Vorschau erhalten zu haben."],
              ["Fall 4 — Technisches Lieferproblem", "Der Kunde ist technisch nicht in der Lage die gelieferte MP3-Datei herunterzuladen oder zu speichern und Vowlyra kann das Problem nicht innerhalb von 48 Stunden beheben."],
            ].map(([title, text]) => (
              <InfoCard key={title} title={title}>{text}</InfoCard>
            ))}
          </div>
          <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "16px 20px" }}>
            <p style={{ color: "#ccc", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>Frist für freiwillige Erstattungsanfragen:</p>
            <ul style={{ color: "#666", fontSize: 13, lineHeight: 1.8, paddingLeft: 18, margin: "0 0 12px" }}>
              <li>Bei Paddle-Transaktionen: innerhalb von 30 Tagen nach Zahlung</li>
              <li>Bei Stripe-Transaktionen: innerhalb von 30 Tagen nach Zahlung</li>
            </ul>
            <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
              Erstattungsanfragen richten Sie per E-Mail an <span style={{ color: "#ccc" }}>info@vowlyra.com</span> mit dem Betreff: <span style={{ color: "#ccc" }}>&quot;Erstattungsantrag — [Ihre E-Mail-Adresse]&quot;</span>. Bitte geben Sie die bei der Bestellung verwendete E-Mail-Adresse, den Erstattungsgrund sowie den ungefähren Bestellzeitpunkt an. Wir bearbeiten Ihren Antrag innerhalb von 5 Werktagen.
            </p>
          </div>
        </Section>

        {/* 6. Muster-Widerrufsformular */}
        <Section label="6. Muster-Widerrufsformular">
          <P>(Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)</P>
          <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "20px 24px" }}>
            <p style={{ color: "#ccc", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>An:</p>
            <p style={{ color: "#666", fontSize: 13, lineHeight: 1.8, margin: "0 0 20px" }}>
              Vowlyra LLC<br />
              30 N Gould St Ste 100<br />
              Sheridan, WY 82801, USA<br />
              E-Mail: <Link href="mailto:info@vowlyra.com">info@vowlyra.com</Link>
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <FormField label="Hiermit widerrufe(n) ich/wir den Vertrag über den Kauf folgender digitaler Inhalte." />
              <FormField label="Bestellt am:" />
              <FormField label="Name des/der Verbraucher(s):" />
              <FormField label="E-Mail-Adresse des/der Verbraucher(s):" />
              <FormField label="Verwendete Zahlungsmethode (Paddle / Stripe / PayPal / Kreditkarte / SEPA):" />
              <FormField label="Grund des Widerrufs (freiwillig):" />
              <FormField label="Unterschrift (nur bei Mitteilung auf Papier):" />
              <FormField label="Datum:" />
            </div>
          </div>
        </Section>

        <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
          Zuletzt aktualisiert: 15.05.2026
        </p>

      </div>
    </main>
  );
}

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

function Subheading({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#ccc", fontSize: 13, fontWeight: 700, margin: "20px 0 10px", letterSpacing: "0.02em" }}>
      {children}
    </p>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px" }}>{children}</p>;
}

function Link({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} style={{ color: "#ccc", textDecoration: "none" }}>{children}</a>;
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 12, padding: "14px 20px" }}>
      <p style={{ color: "#ccc", fontSize: 13, fontWeight: 600, margin: "0 0 6px" }}>{title}</p>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{children}</p>
    </div>
  );
}

function CheckboxItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", gap: 12, background: "#181818", border: "1px solid #282828", borderRadius: 10, padding: "12px 16px" }}>
      <span style={{ color: "#1DB954", fontSize: 16, marginTop: 1 }}>☐</span>
      <p style={{ color: "#666", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{text}</p>
    </div>
  );
}

function FormField({ label }: { label: string }) {
  return (
    <div style={{ borderBottom: "1px solid #282828", paddingBottom: 10 }}>
      <p style={{ color: "#555", fontSize: 12, margin: "0 0 6px" }}>{label}</p>
      <div style={{ height: 1, background: "#2a2a2a", borderRadius: 1 }} />
    </div>
  );
}
