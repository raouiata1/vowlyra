export default function AGBPage() {
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
            Allgemeine Geschäftsbedingungen
          </h1>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>
            Gültig für: Deutschland und alle EU-Länder · Vereinigtes Königreich · Kanada · Australien · Neuseeland
          </p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>Rechtsform: Audynia · Wyoming, USA · Version 2.0</p>
          <p style={{ color: "#555", fontSize: 13, marginBottom: 48 }}>Zuletzt aktualisiert: 15.05.2026</p>

          {/* Inhaltsverzeichnis */}
          <Section label="Inhaltsverzeichnis">
            <ol style={{ color: "#666", fontSize: 14, lineHeight: 2, paddingLeft: 20, margin: 0, listStyleType: "decimal" }}>
              {([
                ["sec-1",  "Geltungsbereich und Vertragsparteien"],
                ["sec-2",  "Zahlungsabwicklung und Merchant of Record"],
                ["sec-3",  "Mindestalter und Vertragsvoraussetzungen"],
                ["sec-4",  "Angebot und Vertragsschluss"],
                ["sec-5",  "Produkte, Preise und Lieferung"],
                ["sec-6",  "Kostenlose Vorschau und Bestellprozess"],
                ["sec-7",  "Zahlungssicherheit und PCI-DSS"],
                ["sec-8",  "Widerrufsrecht und Erlöschen"],
                ["sec-9",  "Freiwillige Erstattungsgarantie"],
                ["sec-10", "Nutzungsrechte und geistiges Eigentum"],
                ["sec-11", "Missbräuchliche Nutzung und Exportbeschränkungen"],
                ["sec-12", "Gewährleistung und Haftung"],
                ["sec-13", "Datenschutz"],
                ["sec-14", "Änderungen der AGB"],
                ["sec-15", "Anwendbares Recht und Gerichtsstand"],
                ["sec-16", "Streitbeilegung"],
                ["sec-17", "Salvatorische Klausel"],
              ] as [string, string][]).map(([id, label], i) => (
                <li key={i}><a href={`#${id}`} className="toc-link">{label}</a></li>
              ))}
            </ol>
          </Section>

          {/* § 1 */}
          <Section id="sec-1" label="§ 1  Geltungsbereich und Vertragsparteien">
            <NP n={1}>Diese Allgemeinen Geschäftsbedingungen (nachfolgend &bdquo;AGB&ldquo;) gelten für alle Verträge die zwischen Audynia (nachfolgend &bdquo;Audynia&ldquo;, &bdquo;wir&ldquo; oder &bdquo;uns&ldquo;) und Verbrauchern (nachfolgend &bdquo;Kunde&ldquo; oder &bdquo;Sie&ldquo;) über die Website audynia.com geschlossen werden.</NP>
            <NP n={2}>Audynia ist eine nach dem Recht des Bundesstaates Wyoming (USA) gegründete Limited Liability Company.</NP>
            <DataTable rows={[
              ["Anbieter",       "Audynia"],
              ["Adresse",        "30 N Gould St Ste 100, Sheridan, WY 82801, USA"],
              ["E-Mail",         "info@audynia.com"],
              ["Website",        "www.audynia.com"],
              ["Registrierung",  "Wyoming Secretary of State, USA"],
            ]} />
            <NP n={3}>Verbraucher im Sinne dieser AGB ist jede natürliche Person die ein Rechtsgeschäft zu Zwecken abschließt die überwiegend weder ihrer gewerblichen noch ihrer selbständigen beruflichen Tätigkeit zugerechnet werden können (§ 13 BGB). Audynia richtet sein Angebot ausschließlich an Verbraucher.</NP>
            <NP n={4}>Entgegenstehende oder abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn Audynia stimmt ihrer Geltung ausdrücklich schriftlich zu.</NP>
            <NP n={5}>Diese AGB gelten in der zum Zeitpunkt der Bestellung gültigen Fassung. Die jeweils aktuelle Version ist unter audynia.com/agb abrufbar.</NP>
          </Section>

          {/* § 2 */}
          <Section id="sec-2" label="§ 2  Zahlungsabwicklung und Merchant of Record">
            <InfoBox color="#1f1a00">
              <p style={{ color: "#aaa", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Pflichthinweis gemäß Paddle Seller Agreement</p>
              <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, margin: "0 0 6px" }}>
                Our order process is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all our orders. Paddle provides all customer service inquiries and handles returns.
              </p>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Auf Deutsch: Der Bestellprozess wird von unserem Online-Wiederverkäufer Paddle.com durchgeführt. Paddle.com ist der Merchant of Record für alle unsere Bestellungen. Paddle bearbeitet alle Kundendienstanfragen und Rücksendungen.
              </p>
            </InfoBox>
            <NP n={1}>Audynia setzt für die Zahlungsabwicklung zwei zertifizierte Payment-Gateways ein. Beide Gateways sind aktiv und werden parallel genutzt:</NP>

            <SubHeading>2.1  Szenario A — Zahlung über Paddle</SubHeading>
            <NP n={1}>Wenn die Zahlung über Paddle.com Market Limited (nachfolgend &bdquo;Paddle&ldquo;) abgewickelt wird, fungiert Paddle als Merchant of Record. Das bedeutet:</NP>
            <BulletList items={[
              "Der Kaufvertrag für das digitale Produkt wird zwischen dem Kunden und Paddle geschlossen",
              "Paddle ist der rechtliche Verkäufer und stellt die offizielle Rechnung aus",
              "Paddle ist verantwortlich für die Mehrwertsteuerabführung in der EU",
              "Audynia ist in diesem Fall der technische Leistungserbringer im Hintergrund",
              "Für Fragen zur Zahlung und Rechnungsstellung ist Paddle zuständig: paddle.com/legal/buyer-terms",
            ]} />

            <SubHeading>2.2  Szenario B — Zahlung über Stripe</SubHeading>
            <NP n={1}>Wenn die Zahlung über Stripe Payments Europe Limited (nachfolgend &bdquo;Stripe&ldquo;) abgewickelt wird, ist Audynia der rechtliche Verkäufer und Vertragspartner des Kunden. Stripe fungiert ausschließlich als technischer Zahlungsabwickler.</NP>

            <SubHeading>2.3  Akzeptierte Zahlungsmethoden</SubHeading>
            <NP n={1}>Visa, Mastercard, American Express, PayPal sowie SEPA-Lastschrift — je nach Verfügbarkeit des aktiven Gateways. Alle Preise verstehen sich in Euro (EUR). Die Zahlung ist mit Abschluss des Bestellvorgangs sofort fällig.</NP>
            <NP n={2}>PayPal (Europe) S.à r.l. et Cie, S.C.A., 22–24 Boulevard Royal, L-2449 Luxemburg, verarbeitet PayPal-Transaktionen als unabhängiger Verantwortlicher. Auf Ihrer Kontoabrechnung kann &bdquo;Paddle&ldquo; oder &bdquo;Paddle.net&ldquo; erscheinen wenn die Zahlung über Paddle abgewickelt wird.</NP>
          </Section>

          {/* § 3 */}
          <Section id="sec-3" label="§ 3  Mindestalter und Vertragsvoraussetzungen">
            <NP n={1}>Das Angebot von Audynia richtet sich ausschließlich an Personen die das 18. Lebensjahr vollendet haben. Mit Abschluss einer Bestellung bestätigt der Kunde ausdrücklich dass er mindestens 18 Jahre alt ist.</NP>
            <NP n={2}>Minderjährige sind von der Nutzung des Angebots ausgeschlossen. Audynia behält sich das Recht vor Bestellungen abzulehnen oder zu stornieren wenn Anhaltspunkte dafür bestehen dass der Kunde minderjährig ist.</NP>
            <NP n={3}>Durch die Nutzung der Website und die Aufgabe einer Bestellung bestätigt der Kunde dass er rechtlich in der Lage ist verbindliche Verträge abzuschließen.</NP>
          </Section>

          {/* § 4 */}
          <Section id="sec-4" label="§ 4  Angebot und Vertragsschluss">
            <NP n={1}>Die Darstellung der Produkte auf audynia.com stellt kein rechtlich bindendes Angebot sondern eine unverbindliche Aufforderung zur Bestellung dar (invitatio ad offerendum).</NP>
            <NP n={2}>Der Vertragsschluss erfolgt in folgenden Schritten:</NP>
            <BulletList items={[
              "Durchlaufen des 8-stufigen Bestellprozesses (Wizard) und Eingabe der persönlichen Angaben",
              "Kostenloser Erhalt eines 30-sekündigen Song-Trailers per E-Mail",
              "Anhören der kostenlosen Vorschau auf der Preview-Seite /song",
              "Wahl eines Pakets (Standard oder Express) und Klick auf den Kaufbutton",
              "Bestätigung der Pflichtcheckboxen (Widerrufsbelehrung und sofortiger Lieferbeginn)",
              "Abschluss des Zahlungsvorgangs",
              "Mit erfolgreicher Zahlung gibt der Kunde ein verbindliches Kaufangebot ab. Audynia nimmt dieses durch Bereitstellung des Songs und Versand einer Auftragsbestätigung an.",
            ]} />
            <NP n={3}>Ein Vertrag kommt ausschließlich in deutscher Sprache zustande. Der Vertragstext wird von Audynia nicht gespeichert und ist nach Vertragsschluss nicht mehr zugänglich. Es wird empfohlen diese AGB sowie die Auftragsbestätigung zu speichern.</NP>
          </Section>

          {/* § 5 */}
          <Section id="sec-5" label="§ 5  Produkte, Preise und Lieferung">
            <NP n={1}>Audynia bietet folgende Produkte an:</NP>
            <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "12px 0 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#1a1a1a", borderBottom: "1px solid #252525" }}>
                {["", "Standard-Paket", "Express-Paket"].map((h, i) => (
                  <div key={i} style={{ padding: "10px 14px", color: i === 0 ? "#444" : "#1DB954", fontSize: 13, fontWeight: 700 }}>{h}</div>
                ))}
              </div>
              {([
                ["Preis",               "29,99 € (EUR)",                       "34,99 € (EUR)"],
                ["Lieferzeit",          "ca. 6 Stunden nach Zahlungseingang",  "unter 20 Minuten nach Zahlungseingang"],
                ["Qualitätskontrolle",  "Standard-Produktion",                 "Persönliche Qualitätskontrolle durch Audynia-Team"],
                ["Format",              "MP3, ca. 3 Minuten",                  "MP3, ca. 3 Minuten"],
                ["Download",            "Unbegrenzt, dauerhaft",               "Unbegrenzt, dauerhaft"],
                ["Zahlungsart",         "Einmalzahlung, kein Abonnement",      "Einmalzahlung, kein Abonnement"],
              ] as string[][]).map((row, ri) => (
                <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid #1e1e1e" }}>
                  {row.map((cell, ci) => (
                    <div key={ci} style={{ padding: "10px 14px", color: ci === 0 ? "#888" : "#555", fontSize: 13, lineHeight: 1.6, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</div>
                  ))}
                </div>
              ))}
            </div>
            <NP n={2}>Alle Preise verstehen sich in Euro (EUR) als Einmalzahlung inklusive gesetzlicher Mehrwertsteuer soweit anwendbar. Audynia behält sich das Recht vor Preise jederzeit anzupassen. Für den Kunden gilt ausschließlich der zum Zeitpunkt der Bestellung angezeigte Preis.</NP>
            <NP n={3}>Die Lieferung erfolgt ausschließlich in digitaler Form (MP3-Datei). Es findet keine physische Lieferung statt. Nach Zahlungseingang erhält der Kunde Zugang zur Song-Seite unter /song/full sowie automatisch die MP3-Datei per E-Mail.</NP>
            <NP n={4}>Die angegebenen Lieferzeiten sind Richtwerte. Audynia ist nicht verantwortlich für Verzögerungen durch technische Störungen bei Drittanbietern. Beim Express-Paket gilt die Lieferzeit von unter 20 Minuten als vertragliche Leistungspflicht.</NP>
          </Section>

          {/* § 6 */}
          <Section id="sec-6" label="§ 6  Kostenlose Vorschau und Bestellprozess">
            <NP n={1}>Audynia bietet vor jeder kostenpflichtigen Bestellung eine kostenlose ca. 30-sekündige Song-Vorschau (Preview) an. Der Trailer wird innerhalb von 3–5 Minuten nach Eingabe der Bestelldaten per E-Mail zugestellt.</NP>
            <NP n={2}>Die Bereitstellung der kostenlosen Preview begründet keinen Kaufvertrag und verpflichtet den Kunden zu nichts. Der Kunde entscheidet frei ob er nach Anhören der Preview den vollständigen Song erwerben möchte.</NP>
            <NP n={3}>Gefällt dem Kunden die erhaltene Preview nicht, hat er das Recht auf Anfrage eine kostenlose neue Demo zu erhalten. Dieser Anspruch besteht einmalig pro Bestellung und ist per E-Mail an info@audynia.com geltend zu machen.</NP>
          </Section>

          {/* § 7 */}
          <Section id="sec-7" label="§ 7  Zahlungssicherheit und PCI-DSS">
            <InfoBox color="#0d1f0d">
              <p style={{ color: "#aaa", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Wichtiger Sicherheitshinweis gemäß Stripe, PayPal und Visa/Mastercard-Anforderungen</p>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Die Zahlungsabwicklung auf audynia.com erfolgt ausschließlich über PCI-DSS-zertifizierte Zahlungsdienstleister. Audynia speichert zu keinem Zeitpunkt vollständige Zahlungsdaten wie Kreditkartennummern oder Bankverbindungen.
              </p>
            </InfoBox>
            <NP n={1}>Die Zahlungsabwicklung erfolgt über die PCI-DSS-zertifizierten Zahlungspartner Paddle.com Market Limited und Stripe Payments Europe Limited. Beide Anbieter erfüllen den Payment Card Industry Data Security Standard (PCI-DSS) in der jeweils aktuellen Version.</NP>
            <NP n={2}>Audynia hat zu keinem Zeitpunkt Zugriff auf vollständige Kreditkartendaten oder Bankverbindungen des Kunden. Diese werden ausschließlich von Paddle bzw. Stripe in deren sicheren und zertifizierten Systemen verarbeitet.</NP>
            <NP n={3}>Die gesamte Datenkommunikation zwischen dem Browser des Kunden und audynia.com erfolgt verschlüsselt über HTTPS/TLS. Der Kunde erkennt am Schlosssymbol in der Browseradresszeile dass die Verbindung gesichert ist.</NP>
            <NP n={4}>Bei Sicherheitsfragen oder Verdacht auf missbräuchliche Nutzung von Zahlungsdaten wende sich der Kunde umgehend an info@audynia.com sowie an seinen Zahlungsdienstleister.</NP>
          </Section>

          {/* § 8 */}
          <Section id="sec-8" label="§ 8  Widerrufsrecht und Erlöschen">
            <NP n={1}>Dem Kunden steht grundsätzlich ein gesetzliches Widerrufsrecht von 14 Tagen ab Vertragsschluss zu. Die vollständige Widerrufsbelehrung sowie das Muster-Widerrufsformular sind unter audynia.com/widerrufsbelehrung abrufbar und gelten als integraler Bestandteil dieser AGB.</NP>
            <NP n={2}>Das Widerrufsrecht erlischt gemäß § 356 Abs. 5 BGB i.V.m. Art. 16 lit. m Verbraucherrechterichtlinie 2011/83/EU vorzeitig wenn Audynia mit der Ausführung des Vertrags begonnen hat, der Kunde vor der Zahlung ausdrücklich zugestimmt hat dass Audynia mit der Ausführung vor Ablauf der Widerrufsfrist beginnt und der Kunde bestätigt hat dass er mit dieser Zustimmung sein Widerrufsrecht verliert.</NP>
            <NP n={3}>Die Bestätigung nach Abs. 2 erfolgt durch aktives Anklicken der entsprechenden Pflicht-Checkbox vor der Zahlung. Ohne diese Bestätigung ist eine Bestellung technisch nicht möglich.</NP>
            <InfoBox color="#141414">
              <p style={{ color: "#888", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 10px" }}>Pflichtcheckboxen im Checkout — beide müssen aktiv angehakt werden (nicht vorausgefüllt)</p>
              <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, margin: "0 0 8px" }}>
                <strong>Checkbox 1:</strong> Ich stimme ausdrücklich zu dass Audynia mit der Ausführung des Vertrags unmittelbar nach meiner Zahlung beginnt. Mir ist bekannt dass ich dadurch mein Widerrufsrecht verliere sobald der Song vollständig bereitgestellt wurde.
              </p>
              <p style={{ color: "#ccc", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                <strong>Checkbox 2:</strong> Ich habe die AGB und die Widerrufsbelehrung gelesen und akzeptiere diese.
              </p>
            </InfoBox>
            <NP n={4}>Unabhängig vom gesetzlichen Widerrufsrecht gewährt Audynia eine freiwillige Erstattungsgarantie gemäß § 9 dieser AGB.</NP>
          </Section>

          {/* § 9 */}
          <Section id="sec-9" label="§ 9  Freiwillige Erstattungsgarantie">
            <NP n={1}>Audynia gewährt unabhängig vom gesetzlichen Widerrufsrecht eine freiwillige vollständige Erstattung in folgenden abschließend definierten Fällen:</NP>
            <DataTable headers={["Fall", "Bedingung"]} rows={[
              ["Fall 1", "Abweichung von der Preview: Der gelieferte Song stimmt inhaltlich nicht mit der zuvor zugeschickten 30-sekündigen Vorschau überein."],
              ["Fall 2", "Fehlerhafte Personalisierung: Der Song spiegelt die im Wizard eingegebenen Angaben (Namen, Anlass, Geschichte, Klang, Stil) nicht korrekt wider."],
              ["Fall 3", "Zahlung ohne Preview: Der Kunde hat einen Zahlungslink erhalten ohne zuvor eine kostenlose Vorschau erhalten zu haben."],
              ["Fall 4", "Technisches Lieferproblem: Der Kunde kann die MP3-Datei technisch nicht herunterladen und Audynia behebt das Problem nicht innerhalb von 48 Stunden."],
            ]} />
            <NP n={2}>Erstattungsanfragen sind per E-Mail an info@audynia.com zu richten (Betreff: Erstattungsantrag). Audynia bearbeitet Erstattungsanfragen innerhalb von 5 Werktagen. Bei Paddle-Transaktionen beträgt die Erstattungsfrist 30 Tage nach Zahlung. Bei Stripe-Transaktionen ebenfalls 30 Tage.</NP>
            <NP n={3}>Die freiwillige Erstattungsgarantie gilt ausschließlich in den in Abs. 1 genannten Fällen. Sie begründet keinen Erstattungsanspruch wenn dem Kunden der fertige Song schlicht nicht gefällt, sofern er inhaltlich der Preview entspricht und die Bestellangaben korrekt widerspiegelt.</NP>
            <NP n={4}>Audynia und Paddle bitten den Kunden dringend uns vor Einleitung einer Rückbuchung (Chargeback) direkt zu kontaktieren. Ungerechtfertigte Chargebacks können zur Sperrung des Zugangs zu audynia.com führen.</NP>
          </Section>

          {/* § 10 */}
          <Section id="sec-10" label="§ 10  Nutzungsrechte und geistiges Eigentum">
            <NP n={1}>Audynia ist Inhaber aller Urheberrechte und sonstigen Schutzrechte an den über audynia.com erstellten Songs soweit diese rechtlich schutzfähig sind.</NP>
            <NP n={2}>Mit vollständiger Zahlung des Kaufpreises erhält der Kunde eine einfache, nicht-übertragbare, nicht-unterlizenzierbare Lizenz zur ausschließlich privaten und nicht-kommerziellen Nutzung des erworbenen Songs (§ 31 UrhG).</NP>
            <NP n={3}>Die Lizenz erlaubt: privates Anhören und Speichern, Weitergabe als persönliches Geschenk, Teilen auf privaten nicht-monetarisierten Social-Media-Profilen, Abspielen bei privaten Feierlichkeiten.</NP>
            <NP n={4}>Ausdrücklich nicht erlaubt: kommerzielle Nutzung jeglicher Art, Monetarisierung, Hochladen auf Streaming-Plattformen (Spotify, Apple Music, YouTube Music etc.), Weiterverkauf, Unterlizenzierung, Synchronisation, Bearbeitung für kommerzielle Zwecke, NFT-Erstellung.</NP>
            <NP n={5}>Hinweis zu KI-generierten Inhalten: Die Songs werden mithilfe von KI-Technologie (FAL.ai / Minimax Music) produziert. Der Kunde nimmt zur Kenntnis dass es sich um KI-generierte Inhalte handelt. Alle Songs werden gemäß Art. 50 EU AI Act als KI-generiert gekennzeichnet.</NP>
          </Section>

          {/* § 11 */}
          <Section id="sec-11" label="§ 11  Missbräuchliche Nutzung und Exportbeschränkungen">
            <NP n={1}>Der Kunde verpflichtet sich keine Inhalte in den Freitextfeldern des Wizards einzugeben die gegen geltendes Recht verstoßen, beleidigende oder verleumderische Inhalte enthalten, Rechte Dritter verletzen oder gegen die guten Sitten verstoßen.</NP>
            <NP n={2}>Audynia behält sich das Recht vor Bestellungen mit missbräuchlichen Inhalten ohne Erstattungspflicht abzulehnen oder zu stornieren sowie bei missbräuchlicher Nutzung den Zugang zur Website zu sperren und rechtliche Schritte einzuleiten.</NP>
            <InfoBox color="#1f1500">
              <p style={{ color: "#aaa", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", margin: "0 0 8px" }}>Exportbeschränkungen gemäß Stripe, Paddle und Visa/Mastercard-Anforderungen</p>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: "0 0 6px" }}>
                Das Angebot von Audynia richtet sich an Kunden weltweit mit Ausnahme von Personen in Ländern die internationalen Handelssanktionen unterliegen. Die Nutzung von audynia.com ist insbesondere verboten für Personen mit Wohnsitz in oder Staatsbürgerschaft von Kuba, Iran, Nordkorea und Syrien sowie den Regionen Krim, Donezk und Luhansk.
              </p>
              <p style={{ color: "#888", fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                Audynia behält sich das Recht vor Bestellungen aus sanktionierten Ländern oder Regionen ohne weitere Begründung abzulehnen und bereits geleistete Zahlungen zurückzuerstatten.
              </p>
            </InfoBox>
          </Section>

          {/* § 12 */}
          <Section id="sec-12" label="§ 12  Gewährleistung und Haftung">
            <NP n={1}>Audynia gewährleistet dass der gelieferte Song den im Bestellprozess eingegebenen Angaben des Kunden entspricht und inhaltlich mit der zuvor zugeschickten Preview übereinstimmt.</NP>
            <NP n={2}>Audynia haftet unbeschränkt für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit, Schäden die auf Vorsatz oder grober Fahrlässigkeit beruhen sowie Schäden aus der Verletzung wesentlicher Vertragspflichten (Kardinalpflichten).</NP>
            <NP n={3}>Bei leicht fahrlässiger Verletzung von Kardinalpflichten ist die Haftung auf den vertragstypisch vorhersehbaren Schaden begrenzt — bei Einzelkäufen ist dies der jeweilige Kaufpreis (29,99 € oder 34,99 €).</NP>
            <NP n={4}>Im Übrigen ist die Haftung von Audynia ausgeschlossen soweit gesetzlich zulässig. Audynia haftet nicht für technische Störungen bei Drittanbietern (Cloudflare, Brevo, FAL.ai etc.), Verzögerungen durch höhere Gewalt sowie Schäden durch fehlerhafte Kundenangaben im Bestellprozess.</NP>
            <NP n={5}>Die Haftungsbeschränkungen gelten nicht soweit Audynia einen Schaden arglistig verschwiegen oder eine Garantie übernommen hat.</NP>
          </Section>

          {/* § 13 */}
          <Section id="sec-13" label="§ 13  Datenschutz">
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px" }}>
              Die Erhebung und Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutzerklärung unter{" "}
              <a href="/datenschutz" style={{ color: "#1DB954", textDecoration: "none" }}>audynia.com/datenschutz</a>,
              {" "}die integraler Bestandteil dieser AGB ist.
            </p>
          </Section>

          {/* § 14 */}
          <Section id="sec-14" label="§ 14  Änderungen der AGB">
            <NP n={1}>Audynia behält sich das Recht vor diese AGB jederzeit mit Wirkung für die Zukunft zu ändern. Über wesentliche Änderungen werden registrierte Kunden per E-Mail informiert.</NP>
            <NP n={2}>Für bereits abgeschlossene Verträge gelten die AGB in der zum Zeitpunkt des Vertragsschlusses gültigen Fassung.</NP>
          </Section>

          {/* § 15 */}
          <Section id="sec-15" label="§ 15  Anwendbares Recht und Gerichtsstand">
            <NP n={1}>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts (CISG).</NP>
            <NP n={2}>Für Verbraucher mit gewöhnlichem Aufenthalt in der EU gilt ergänzend dass ihnen der Schutz zwingender Verbraucherschutzvorschriften ihres Aufenthaltsstaates nicht entzogen wird (Art. 6 Rom-I-Verordnung).</NP>
            <NP n={3}>Für Klagen gegen Audynia durch Verbraucher ist der Gerichtsstand am Wohnsitz des Verbrauchers maßgeblich soweit gesetzlich vorgeschrieben.</NP>
          </Section>

          {/* § 16 */}
          <Section id="sec-16" label="§ 16  Streitbeilegung">
            <NP n={1}>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr</NP>
            <NP n={2}>Audynia ist nicht bereit und nicht verpflichtet an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</NP>
          </Section>

          {/* § 17 */}
          <Section id="sec-17" label="§ 17  Salvatorische Klausel">
            <p style={{ color: "#666", fontSize: 14, lineHeight: 1.8, margin: "0 0 12px" }}>
              Sollten einzelne Bestimmungen dieser AGB ganz oder teilweise unwirksam sein oder werden, berührt dies die Wirksamkeit der übrigen Bestimmungen nicht. An die Stelle der unwirksamen Bestimmung tritt die gesetzliche Regelung.
            </p>
          </Section>

          <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
            Audynia · 30 N Gould St Ste 100, Sheridan, WY 82801, USA · info@audynia.com · Version 2.0 · 15.05.2026
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "8px 0 12px 0", paddingLeft: 20, color: "#666", fontSize: 14, lineHeight: 1.8 }}>
      {items.map((item, i) => <li key={i} style={{ marginBottom: 4 }}>{item}</li>)}
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

function DataTable({ headers, rows }: { headers?: string[]; rows: string[][] }) {
  const colCount = rows[0]?.length ?? 2;
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", margin: "12px 0 16px" }}>
      {headers && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${colCount}, 1fr)`, borderBottom: "1px solid #252525" }}>
          {headers.map((h, i) => (
            <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
      )}
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${colCount}, 1fr)`, borderTop: ri === 0 && !headers ? "none" : "1px solid #1e1e1e" }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{ padding: "10px 14px", color: ci === 0 ? "#888" : "#555", fontSize: 13, lineHeight: 1.6, fontWeight: ci === 0 ? 600 : 400 }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}
