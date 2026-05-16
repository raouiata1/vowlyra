export default function DatenschutzPage() {
  return (
    <>
    <style>{`.toc-link { color: #666; text-decoration: none; } .toc-link:hover { color: #1DB954; }`}</style>
    <main style={{ background: "#0e0e0e", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", padding: "80px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>

        <a href="/" style={{ color: "#555", fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 48 }}>
          ← Zurück
        </a>

        <h1 style={{ color: "#fff", fontSize: 40, fontWeight: 800, marginBottom: 8, letterSpacing: "-1.5px" }}>
          Datenschutzerklärung
        </h1>
        <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>
          Gültig für: EU / EWR · Vereinigtes Königreich · Kanada · Australien · Neuseeland
        </p>
        <p style={{ color: "#555", fontSize: 13, marginBottom: 4 }}>Sprache: Deutsch · Version 5.0</p>
        <p style={{ color: "#555", fontSize: 13, marginBottom: 48 }}>Zuletzt aktualisiert: 15.05.2026</p>

        {/* Zusammenfassung */}
        <div style={{ background: "#141414", border: "1px solid #282828", borderRadius: 12, padding: "20px 24px", marginBottom: 48 }}>
          <p style={{ color: "#1DB954", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 10px" }}>Zusammenfassung</p>
          <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px" }}>
            Vowlyra erstellt personalisierte, KI-generierte Songs als digitale Geschenke. Für die Erstellung des Songs benötigen wir persönliche Angaben wie den Namen des Käufers, die E-Mail-Adresse und die Geschichte hinter dem Geschenk. Diese Daten werden ausschließlich für die Song-Erstellung und -Lieferung verwendet.
          </p>
          <p style={{ color: "#ccc", fontSize: 14, lineHeight: 1.8, margin: "0 0 10px" }}>
            Wir verkaufen keine personenbezogenen Daten. Wir verwenden Ihre Daten nicht für das Training von KI-Modellen. Sie haben jederzeit das Recht, Ihre Daten einzusehen, zu berichtigen oder löschen zu lassen.
          </p>
          <p style={{ color: "#888", fontSize: 13, margin: 0 }}>Datenschutz-Kontakt: <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a> · Antwortfrist: 30 Tage</p>
        </div>

        {/* Inhaltsverzeichnis */}
        <Section label="Inhaltsverzeichnis">
          <ol style={{ color: "#666", fontSize: 14, lineHeight: 2, paddingLeft: 20, margin: 0, listStyleType: "decimal" }}>
            {[
              ["sec-1", "Verantwortlicher"],
              ["sec-2", "EU- und UK-Vertreter"],
              ["sec-3", "Geltungsbereich"],
              ["sec-4", "Grundsätze der Datenverarbeitung"],
              ["sec-5", "Erhobene Daten und Verarbeitungszwecke"],
              ["sec-6", "Rechtsgrundlagen"],
              ["sec-7", "Drittanbieter und Zahlungspartner"],
              ["sec-8", "Internationale Datentransfers"],
              ["sec-9", "Speicherfristen"],
              ["sec-10", "Minderjährige"],
              ["sec-11", "KI-generierte Inhalte und automatisierte Prozesse"],
              ["sec-12", "Datensicherheit"],
              ["sec-13", "Datenpannen"],
              ["sec-14", "Cookies und Tracking"],
              ["sec-15", "Ihre Rechte"],
              ["sec-16", "Änderungen dieser Erklärung"],
            ].map(([id, label], i) => (
              <li key={i}>
                <a href={`#${id}`} className="toc-link">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </Section>

        {/* 1. Verantwortlicher */}
        <Section id="sec-1" label="1. Verantwortlicher">
          <DataTable rows={[
            ["Unternehmen", "Vowlyra LLC"],
            ["Rechtsform", "Limited Liability Company (LLC), Wyoming, USA"],
            ["Geschäftsadresse", "30 N Gould St Ste 100, Sheridan, WY 82801, USA"],
            ["Registrierung", "Wyoming Secretary of State"],
            ["E-Mail", "info@vowlyra.com"],
            ["Website", "www.vowlyra.com"],
            ["Datenschutz-Kontakt", "info@vowlyra.com"],
            ["Datenschutzbeauftragter", "Nicht verpflichtend (Art. 37 DSGVO). Anfragen an: info@vowlyra.com"],
          ]} />
        </Section>

        {/* 2. EU- und UK-Vertreter */}
        <Section id="sec-2" label="2. EU- und UK-Vertreter">
          <p style={pStyle}>
            Gemäß Art. 27 DSGVO und UK GDPR Art. 27 sind Verantwortliche mit Sitz außerhalb der EU bzw. des Vereinigten Königreichs, die personenbezogene Daten von Personen in diesen Regionen verarbeiten, zur Benennung eines Vertreters verpflichtet.
          </p>
          <p style={pStyle}>
            Zum Zeitpunkt der Veröffentlichung dieser Erklärung ist die Benennung eines formellen EU-Vertreters und UK-Vertreters in Bearbeitung. Diese Erklärung wird unverzüglich aktualisiert, sobald die Benennung abgeschlossen ist.
          </p>
          <p style={{ ...pStyle, marginBottom: 16 }}>
            Bis zur Benennung können EU- und UK-Nutzer Datenschutzanfragen direkt an <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a> richten.
          </p>
          <DataTable rows={[
            ["EU-Aufsichtsbehörde (DE)", "BfDI, Graurheindorfer Str. 153, 53117 Bonn | bfdi.bund.de"],
            ["UK-Aufsichtsbehörde", "ICO, Wycliffe House, Water Lane, Wilmslow SK9 5AF | ico.org.uk"],
            ["Kanada", "OPC, 30 Victoria Street, Gatineau QC K1A 1H3 | priv.gc.ca"],
            ["Australien", "OAIC, GPO Box 5218, Sydney NSW 2001 | oaic.gov.au"],
            ["Neuseeland", "OPC NZ, PO Box 10094, Wellington 6143 | privacy.org.nz"],
          ]} />
        </Section>

        {/* 3. Geltungsbereich */}
        <Section id="sec-3" label="3. Geltungsbereich">
          <p style={pStyle}>
            Diese Datenschutzerklärung gilt für alle Personen, die vowlyra.com besuchen, den personalisierten Bestellprozess (Wizard) nutzen, einen Song erwerben, den Kundensupport kontaktieren oder Marketing-Kommunikation von Vowlyra erhalten. Die Erklärung gilt unabhängig vom Standort der betroffenen Person.
          </p>
        </Section>

        {/* 4. Grundsätze */}
        <Section id="sec-4" label="4. Grundsätze der Datenverarbeitung">
          <DataTable rows={[
            ["Zweckbindung", "Daten werden ausschließlich für klar definierte und offengelegte Zwecke verarbeitet."],
            ["Datensparsamkeit", "Es werden nur die Daten erhoben, die für die jeweilige Leistung tatsächlich erforderlich sind."],
            ["Speicherbegrenzung", "Daten werden gelöscht, sobald der Zweck erfüllt ist und keine gesetzlichen Aufbewahrungspflichten bestehen."],
            ["Transparenz", "Alle Verarbeitungen werden vollständig und verständlich offengelegt."],
            ["Sicherheit", "Personenbezogene Daten werden durch angemessene technische und organisatorische Maßnahmen geschützt."],
            ["Keine Datenweitergabe zu Werbezwecken", "Personenbezogene Daten werden nicht an Dritte verkauft."],
            ["Kein KI-Training", "Persönliche Eingaben (Namen, Geschichten) werden nicht für das Training von KI-Modellen verwendet."],
          ]} />
        </Section>

        {/* 5. Erhobene Daten */}
        <Section id="sec-5" label="5. Erhobene Daten und Verarbeitungszwecke">
          <SubHeading>5.1 Daten im Bestellprozess (Wizard)</SubHeading>
          <DataTable headers={["Datenkategorie", "Konkrete Daten", "Zweck"]} rows={[
            ["Identifikationsdaten", "Name des Käufers", "Song-Personalisierung, Vertragserfüllung"],
            ["Drittbezogene Daten", "Name der beschenkten Person", "Song-Produktion"],
            ["Inhaltsdaten", "Persönliche Geschichte, Spitzname, besonderer Moment", "Song-Erstellung"],
            ["Präferenzdaten", "Anlass, Musikstil, emotionaler Klang", "Song-Produktion"],
            ["Kontaktdaten", "E-Mail-Adresse", "Song-Lieferung, Auftragsbestätigung"],
            ["Marketing (optional)", "E-Mail-Adresse", "Newsletter, Angebote – nur mit Einwilligung"],
          ]} />
          <InfoBox>
            <strong>Hinweis zu Freitexteingaben:</strong> Persönliche Geschichten und Beschreibungen werden ausschließlich für die Song-Produktion verwendet. Diese Daten werden nicht für KI-Training, Analysen oder andere Zwecke verwendet.
          </InfoBox>
          <InfoBox>
            <strong>Hinweis zu drittbezogenen Daten:</strong> Der Name der beschenkten Person wird ausschließlich für die Song-Produktion verwendet und nach 12 Monaten automatisch gelöscht.
          </InfoBox>

          <SubHeading>5.2 Technische Daten (automatisch erhoben)</SubHeading>
          <p style={pStyle}>
            Beim Aufruf von vowlyra.com werden automatisch erhoben: IP-Adresse (anonymisiert nach 7 Tagen), Browsertyp und -version, Betriebssystem, Referrer-URL sowie Datum und Uhrzeit des Zugriffs.
          </p>
          <p style={pStyle}>Zweck: Sicherer Betrieb der Website, Fehlerbehebung, Betrugsprävention.</p>

          <SubHeading>5.3 Liefernachweisdaten</SubHeading>
          <p style={pStyle}>
            Für jede abgeschlossene Bestellung werden als rechtlicher Nachweis gespeichert: Transaktions-ID (Paddle oder Stripe), Zeitstempel der Song-Bereitstellung, E-Mail-Adresse des Empfängers, Download-Zeitstempel und IP-Adresse sowie Bestätigung der Pflicht-Checkboxen mit Zeitstempel.
          </p>
          <p style={pStyle}>Zweck: Nachweis der vertragsgemäßen Lieferung, Bearbeitung von Erstattungsanfragen, Schutz vor ungerechtfertigten Chargebacks.</p>

          <SubHeading>5.4 Zahlungsdaten</SubHeading>
          <p style={pStyle}>
            Vollständige Zahlungsdaten werden ausschließlich von den zertifizierten Zahlungspartnern Paddle und Stripe verarbeitet. Vowlyra LLC hat zu keinem Zeitpunkt Zugriff auf vollständige Zahlungsdaten. Gespeichert werden ausschließlich Transaktions-IDs und Zahlungsstatus.
          </p>

          <SubHeading>5.5 Support-Daten</SubHeading>
          <p style={pStyle}>
            Kommunikation über Crisp-Chat oder E-Mail wird für 6 Monate gespeichert. Zweck: Qualitätssicherung, Bearbeitung von Anfragen, Nachweis im Streitfall.
          </p>
        </Section>

        {/* 6. Rechtsgrundlagen */}
        <Section id="sec-6" label="6. Rechtsgrundlagen der Verarbeitung">
          <DataTable headers={["Verarbeitungszweck", "EU / UK", "Kanada", "Australien", "Neuseeland"]} rows={[
            ["Song-Lieferung", "Art. 6(1)(b) DSGVO", "PIPEDA Prinzip 2", "APP 3", "IPP 2"],
            ["Liefernachweis", "Art. 6(1)(b)+(f) DSGVO", "PIPEDA Prinzip 2+5", "APP 3+11", "IPP 2+5"],
            ["Technische Daten", "Art. 6(1)(f) DSGVO", "PIPEDA Prinzip 2", "APP 3", "IPP 2"],
            ["Betrugsprävention", "Art. 6(1)(f) DSGVO", "PIPEDA Prinzip 2", "APP 3", "IPP 2"],
            ["Marketing-E-Mail", "Art. 6(1)(a) DSGVO", "PIPEDA Prinzip 3", "APP 3.3", "IPP 2"],
            ["Steuerl. Aufbewahrung", "Art. 6(1)(c) DSGVO", "PIPEDA Prinzip 5", "APP 11", "IPP 5"],
            ["Support-Kommunikation", "Art. 6(1)(f) DSGVO", "PIPEDA Prinzip 2", "APP 3", "IPP 2"],
          ]} />
        </Section>

        {/* 7. Drittanbieter */}
        <Section id="sec-7" label="7. Drittanbieter und Zahlungspartner">

          <SubHeading>7.1 Hosting und Infrastruktur</SubHeading>
          <ProviderCard
            name="Vercel Inc."
            address="340 Pine Street, Suite 701, San Francisco, CA 94104, USA"
            function_="Website-Hosting und Bereitstellung"
            role="Auftragsverarbeiter (Art. 28 DSGVO)"
            transfer="USA – SCCs (EU Kommission Beschluss 2021/914)"
            privacy="vercel.com/legal/privacy-policy"
          />
          <ProviderCard
            name="Supabase Inc. / Hetzner Online GmbH"
            address="Hetzner Online GmbH, Industriestr. 25, 91710 Gunzenhausen, Deutschland (EU)"
            function_="Datenbankhosting (Kundendaten, Bestelldaten)"
            role="Auftragsverarbeiter"
            transfer="Ausschließlich EU-Server in Deutschland – kein Drittlandtransfer"
            privacy="supabase.com/privacy"
          />
          <ProviderCard
            name="Cloudflare Inc."
            address="101 Townsend St, San Francisco, CA 94107, USA"
            function_="Speicherung und Auslieferung der MP3-Dateien"
            role="Auftragsverarbeiter"
            transfer="USA – SCCs"
            privacy="cloudflare.com/privacypolicy"
          />
          <ProviderCard
            name="Cloudinary Ltd."
            address="3400 Central Expressway, Suite 110, Santa Clara, CA 95051, USA"
            function_="Erstellung und Auslieferung der Song-Previews (30 Sekunden)"
            role="Auftragsverarbeiter"
            transfer="USA – SCCs"
            privacy="cloudinary.com/privacy"
          />

          <SubHeading>7.2 Zahlungsabwicklung</SubHeading>
          <ProviderCard
            name="Paddle.com Market Limited"
            address="Judd House, 18–29 Mora Street, London, EC1V 8BT, Vereinigtes Königreich"
            function_="Primäres Gateway als Merchant of Record (MoR). Bei Paddle-Transaktionen ist Paddle der rechtliche Verkäufer gegenüber dem Kunden."
            role="Eigenständiger Verantwortlicher (Controller)"
            transfer="UK und USA (Paddle.com Inc.) – SCCs"
            privacy="paddle.com/legal/privacy"
            note="Weitergabe an Vowlyra: Name, E-Mail, Bestelldetails – ausschließlich für Auftragserfüllung, Betrugsprävention und Support. Marketing-Daten nur mit ausdrücklicher Einwilligung."
          />
          <ProviderCard
            name="Stripe Payments Europe Limited"
            address="1 Grand Canal Street Lower, Dublin 2, Irland (EU)"
            function_="Fallback-Gateway. Stripe Radar erfasst beim Checkout verhaltensbasierte Signale zur automatisierten Betrugserkennung."
            role="Auftragsverarbeiter und teilweise eigenständiger Verantwortlicher (Betrugsprävention)"
            transfer="EU (Irland) und USA (Stripe LLC) – EU-US Data Privacy Framework (Stand Januar 2026) und SCCs"
            privacy="stripe.com/de/privacy"
          />
          <ProviderCard
            name="PayPal (Europe) S.à r.l. et Cie, S.C.A."
            address="22–24 Boulevard Royal, L-2449 Luxemburg (EU)"
            function_="Zahlungsmethode über Paddle oder Stripe. PayPal verarbeitet personenbezogene Daten als unabhängiger Verantwortlicher."
            role="Unabhängiger Verantwortlicher (eigenständiger Controller)"
            transfer="Luxemburg (EU) und USA – SCCs"
            privacy="paypal.com/de/webapps/mpp/ua/privacy-full"
            note="Verarbeitete Daten durch PayPal: Name, E-Mail, PayPal-Kontodaten, Zahlungs- und Transaktionshistorie, Betrugspräventionsdaten, Geräteinformationen."
          />

          <SubHeading>7.3 Kommunikation und Support</SubHeading>
          <ProviderCard
            name="Crisp IM SAS"
            address="2 Boulevard de Launay, 44100 Nantes, Frankreich (EU)"
            function_="Live-Chat-Support"
            role="Auftragsverarbeiter"
            transfer="EU – kein Drittlandtransfer"
            privacy="crisp.chat/privacy"
          />
          <ProviderCard
            name="Brevo SAS (ehemals Sendinblue)"
            address="106 Boulevard Haussmann, 75008 Paris, Frankreich (EU)"
            function_="E-Mail-Versand und Song-Auslieferung per E-Mail"
            role="Auftragsverarbeiter"
            transfer="EU – kein Drittlandtransfer"
            privacy="brevo.com/legal/privacypolicy"
          />
          <ProviderCard
            name="Zoho Corporation"
            address="Estancia IT Park, GST Road, Chennai, Tamil Nadu 600 049, Indien"
            function_="E-Mail-Kommunikation (Zoho Mail)"
            role="Auftragsverarbeiter"
            transfer="Indien und USA – SCCs"
            privacy="zoho.com/privacy.html"
          />

          <SubHeading>7.4 Automatisierung</SubHeading>
          <ProviderCard
            name="n8n GmbH"
            address="Softwarestrasse 11, 38100 Braunschweig, Deutschland (EU)"
            function_="Prozessautomatisierung (Bestellverarbeitung, Song-Auslieferung)"
            role="Auftragsverarbeiter"
            transfer="EU – kein Drittlandtransfer"
            privacy="n8n.io/privacy"
          />

          <SubHeading>7.5 KI-Song-Produktion</SubHeading>
          <ProviderCard
            name="FAL AI Inc. (FAL.ai / Minimax Music)"
            address="USA"
            function_="KI-gestützte Song-Produktion"
            role="Auftragsverarbeiter"
            transfer="USA – SCCs"
            privacy="fal.ai/privacy"
            note="Übermittelte Daten: Bestellparameter (Anlass, Musikstil, Stimmung, Freitexteingaben). Eingabedaten werden ausschließlich für die Song-Produktion verwendet und danach nicht dauerhaft gespeichert."
          />

          <SubHeading>7.6 Marketing und Tracking</SubHeading>
          <ProviderCard
            name="Meta Platforms Ireland Limited"
            address="4 Grand Canal Square, Dublin 2, Irland"
            function_="Meta Pixel – Werbe-Tracking und Conversion-Optimierung. Das Meta Pixel wird ausschließlich nach ausdrücklicher Cookie-Einwilligung aktiviert. Ohne Einwilligung werden keine Daten an Meta übertragen."
            role="Eigenständiger Verantwortlicher"
            transfer="USA – SCCs"
            privacy="facebook.com/privacy/policy"
          />
        </Section>

        {/* 8. Internationale Datentransfers */}
        <Section id="sec-8" label="8. Internationale Datentransfers">
          <DataTable headers={["Anbieter", "Serverstandort", "Schutzmaßnahme"]} rows={[
            ["Vercel Inc.", "USA", "SCCs (EU Beschluss 2021/914)"],
            ["Cloudflare Inc.", "USA", "SCCs"],
            ["Cloudinary Ltd.", "USA", "SCCs"],
            ["Paddle.com Inc.", "USA", "SCCs"],
            ["Stripe LLC", "USA", "EU-US Data Privacy Framework (Jan. 2026) + SCCs"],
            ["PayPal Inc.", "USA", "SCCs"],
            ["Zoho Corporation", "Indien und USA", "SCCs"],
            ["FAL AI Inc.", "USA", "SCCs"],
            ["Supabase / Hetzner", "Deutschland (EU)", "Kein Transfer erforderlich"],
            ["Brevo SAS", "Frankreich (EU)", "Kein Transfer erforderlich"],
            ["Crisp IM SAS", "Frankreich (EU)", "Kein Transfer erforderlich"],
            ["n8n GmbH", "Deutschland (EU)", "Kein Transfer erforderlich"],
          ]} />
          <p style={{ ...pStyle, marginTop: 12 }}>
            <strong style={{ color: "#ccc" }}>SCCs</strong> (Standardvertragsklauseln): Von der Europäischen Kommission genehmigte Vertragsklauseln, die ein angemessenes Datenschutzniveau bei Übertragungen in Drittländer gewährleisten (Art. 46 Abs. 2 lit. c DSGVO, Beschluss 2021/914).
          </p>
          <p style={pStyle}>
            <strong style={{ color: "#ccc" }}>EU-US Data Privacy Framework</strong>: Angemessenheitsbeschluss der Europäischen Kommission (Juli 2023). Stripe ist seit Januar 2026 unter diesem Framework zertifiziert.
          </p>
        </Section>

        {/* 9. Speicherfristen */}
        <Section id="sec-9" label="9. Speicherfristen">
          <DataTable headers={["Datenkategorie", "Speicherfrist", "Rechtsgrundlage"]} rows={[
            ["Bestelldaten (Name, E-Mail, Transaktions-ID)", "10 Jahre", "Steuerrechtliche Aufbewahrungspflicht"],
            ["Liefernachweisdaten (Zeitstempel, Download-Log)", "10 Jahre", "Rechtlicher Beweiszweck"],
            ["Checkbox-Bestätigungen (Widerruf, AGB)", "10 Jahre", "Rechtlicher Beweiszweck"],
            ["Song-Inhaltsdaten (Geschichte, Spitzname, Anlass)", "12 Monate nach Lieferung", "Datensparsamkeit"],
            ["Name der beschenkten Person", "12 Monate nach Lieferung", "Datensparsamkeit"],
            ["Marketing-E-Mail-Adresse", "Bis Widerruf der Einwilligung", "Einwilligungsbasiert"],
            ["Technische Zugriffsdaten (IP)", "7 Tage (danach anonymisiert)", "Berechtigtes Interesse"],
            ["Support-Kommunikation (Chat, E-Mail)", "6 Monate nach Gespräch", "Berechtigtes Interesse"],
            ["Zahlungsdaten (Transaktions-ID, Status)", "10 Jahre", "Steuerrechtliche Aufbewahrungspflicht"],
          ]} />
        </Section>

        {/* 10. Minderjährige */}
        <Section id="sec-10" label="10. Minderjährige">
          <p style={pStyle}>
            Das Angebot von Vowlyra richtet sich ausschließlich an Personen, die das 18. Lebensjahr vollendet haben. Es werden wissentlich keine personenbezogenen Daten von Minderjährigen erhoben.
          </p>
          <p style={pStyle}>
            Sollten Daten einer minderjährigen Person irrtümlich gespeichert worden sein, bitten wir um sofortige Kontaktaufnahme unter <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a>. Diese Daten werden unverzüglich gelöscht.
          </p>
        </Section>

        {/* 11. KI */}
        <Section id="sec-11" label="11. KI-generierte Inhalte und automatisierte Prozesse">
          <SubHeading>11.1 KI-Song-Produktion</SubHeading>
          <p style={pStyle}>
            Die personalisierten Songs sind vollständig KI-generierte Inhalte. Sie werden auf Basis der persönlichen Eingaben des Bestellers durch KI-Technologie (FAL.ai / Minimax Music) produziert. Alle Songs werden als KI-generierte Inhalte gekennzeichnet gemäß Art. 50 EU AI Act.
          </p>

          <SubHeading>11.2 Automatisierte Entscheidungsfindung</SubHeading>
          <p style={pStyle}>
            Es werden keine automatisierten Entscheidungen getroffen, die rechtliche oder ähnlich bedeutsame Wirkungen auf betroffene Personen haben (Art. 22 DSGVO / UK GDPR Art. 22). Die Song-Produktion ist eine technische Leistungserbringung auf Basis der Nutzereingaben.
          </p>
          <p style={pStyle}>
            Stripe Radar nutzt automatisierte Algorithmen zur Betrugserkennung beim Zahlungsvorgang. Diese Verarbeitung hat keine dauerhaften Auswirkungen auf die betroffene Person.
          </p>
        </Section>

        {/* 12. Datensicherheit */}
        <Section id="sec-12" label="12. Datensicherheit">
          <DataTable rows={[
            ["Verschlüsselung", "Alle Datenübertragungen erfolgen via HTTPS/TLS"],
            ["EU-Serverstandort", "Hauptdatenbank ausschließlich auf EU-Servern (Hetzner, Deutschland)"],
            ["Zugriffsschutz", "Strikte Zugriffsbeschränkungen – nur autorisierte Personen haben Zugang"],
            ["Sicherheitsprüfungen", "Regelmäßige Sicherheitsüberprüfungen und Software-Updates"],
            ["Pseudonymisierung", "Wo technisch möglich und sinnvoll"],
            ["Drittanbieter-Verträge", "Vertragliche Sicherheitspflichten (AVV) für alle Drittanbieter"],
            ["Keine Zahlungsdaten", "Vollständige Zahlungsdaten werden zu keinem Zeitpunkt gespeichert"],
          ]} />
        </Section>

        {/* 13. Datenpannen */}
        <Section id="sec-13" label="13. Datenpannen">
          <p style={pStyle}>
            Im Falle einer Datenpanne werden sofortige Eindämmungsmaßnahmen eingeleitet, Umfang und betroffene Daten bewertet sowie alle Maßnahmen vollständig dokumentiert.
          </p>

          <SubHeading>13.1 Meldepflichten an Behörden</SubHeading>
          <DataTable headers={["Jurisdiktion", "Meldepflicht", "Frist", "Behörde"]} rows={[
            ["EU / EEA", "Pannen mit Risiko für Betroffene", "72 Stunden", "BfDI / lokale Aufsichtsbehörde"],
            ["UK", "Pannen mit Risiko für Betroffene", "72 Stunden", "ICO"],
            ["Kanada", "Pannen mit realem Schadensrisiko", "Unverzüglich", "OPC Canada"],
            ["Australien", "Erhebliche Datenpannen (Notifiable)", "Unverzüglich", "OAIC"],
            ["Neuseeland", "Pannen mit ernstem Schadensrisiko", "Unverzüglich", "OPC NZ"],
          ]} />

          <SubHeading>13.2 Benachrichtigung der Betroffenen</SubHeading>
          <p style={pStyle}>
            Bei hohem Risiko für Rechte und Freiheiten werden betroffene Personen direkt per E-Mail informiert. Die Benachrichtigung enthält: Art der Panne, betroffene Datenkategorien, wahrscheinliche Folgen sowie getroffene und geplante Maßnahmen.
          </p>
        </Section>

        {/* 14. Cookies */}
        <Section id="sec-14" label="14. Cookies und Tracking">
          <p style={pStyle}>
            Auf vowlyra.com werden Cookies und ähnliche Technologien verwendet. Technisch notwendige Cookies werden ohne Einwilligung gesetzt (§ 25 Abs. 2 TTDSG). Alle anderen Cookies – insbesondere das Meta Pixel – werden ausschließlich nach ausdrücklicher Einwilligung über den Cookie-Banner aktiviert.
          </p>
          <p style={pStyle}>
            Cookie-Richtlinie: <a href="/cookies" style={{ color: "#1DB954", textDecoration: "none" }}>vowlyra.com/cookies</a>
          </p>
        </Section>

        {/* 15. Ihre Rechte */}
        <Section id="sec-15" label="15. Ihre Rechte">
          <SubHeading>15.1 Übersicht nach Jurisdiktion</SubHeading>
          <DataTable headers={["Recht", "EU / UK", "Kanada", "Australien", "Neuseeland"]} rows={[
            ["Auskunft", "Art. 15 DSGVO", "PIPEDA Prinzip 9", "APP 12", "IPP 6"],
            ["Berichtigung", "Art. 16 DSGVO", "PIPEDA Prinzip 9", "APP 13", "IPP 7"],
            ["Löschung", "Art. 17 DSGVO", "PIPEDA Prinzip 5", "APP 11", "IPP 9"],
            ["Einschränkung", "Art. 18 DSGVO", "–", "–", "–"],
            ["Datenportabilität", "Art. 20 DSGVO", "–", "–", "–"],
            ["Widerspruch", "Art. 21 DSGVO", "PIPEDA Prinzip 3", "APP 3.6", "IPP 2"],
            ["Widerruf (Marketing)", "Art. 7(3) DSGVO", "PIPEDA Prinzip 3", "APP 3.3", "IPP 2"],
            ["Beschwerde bei Behörde", "Art. 77 DSGVO", "OPC Canada", "OAIC", "OPC NZ"],
          ]} />

          <SubHeading>15.2 Antwortfristen</SubHeading>
          <DataTable rows={[
            ["EU / EEA", "30 Tage (Art. 12 DSGVO)"],
            ["Vereinigtes Königreich", "30 Tage (UK GDPR)"],
            ["Kanada", "30 Tage (PIPEDA)"],
            ["Australien", "30 Tage (APP 12)"],
            ["Neuseeland", "20 Werktage (Privacy Act 2020)"],
          ]} />

          <SubHeading>15.3 So üben Sie Ihre Rechte aus</SubHeading>
          <div style={{ background: "#141414", border: "1px solid #282828", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
            <p style={{ color: "#ccc", fontSize: 14, margin: "0 0 6px" }}>E-Mail: <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a></p>
            <p style={{ color: "#ccc", fontSize: 14, margin: "0 0 6px" }}>Betreff: <span style={{ color: "#888" }}>Datenschutzanfrage – [Art des Rechts]</span></p>
            <p style={{ color: "#666", fontSize: 13, margin: 0 }}>Bitte angeben: Bei der Bestellung verwendete E-Mail-Adresse und Art der Anfrage. Eine Identitätsverifikation kann vor Auskunftserteilung erforderlich sein.</p>
          </div>

          <SubHeading>15.4 Marketing-Einwilligung widerrufen</SubHeading>
          <p style={pStyle}>
            Per E-Mail an <a href="mailto:info@vowlyra.com" style={{ color: "#1DB954", textDecoration: "none" }}>info@vowlyra.com</a> (Betreff: Marketing abmelden) oder per Klick auf den Abmelde-Link in jeder Marketing-E-Mail. Der Widerruf gilt mit sofortiger Wirkung für die Zukunft.
          </p>
        </Section>

        {/* 16. Änderungen */}
        <Section id="sec-16" label="16. Änderungen dieser Erklärung">
          <p style={pStyle}>
            Diese Erklärung wird angepasst, wenn sich rechtliche Anforderungen ändern oder neue Dienste eingeführt werden. Bei wesentlichen Änderungen werden registrierte Nutzer per E-Mail informiert und das Datum oben in dieser Erklärung aktualisiert.
          </p>
          <p style={pStyle}>
            Aktuelle Version: <a href="/datenschutz" style={{ color: "#1DB954", textDecoration: "none" }}>vowlyra.com/datenschutz</a>
          </p>
        </Section>

        <p style={{ color: "#333", fontSize: 12, borderTop: "1px solid #1e1e1e", paddingTop: 24, marginTop: 16 }}>
          Vowlyra LLC · 30 N Gould St Ste 100, Sheridan, WY 82801, USA · info@vowlyra.com · Version 5.0 · 15.05.2026
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

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 8, padding: "12px 16px", marginBottom: 10, color: "#666", fontSize: 13, lineHeight: 1.7 }}>
      {children}
    </div>
  );
}

function DataTable({ headers, rows }: { headers?: string[]; rows: string[][] }) {
  const colCount = rows[0]?.length ?? 2;
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, overflow: "hidden", marginBottom: 16 }}>
      {headers && (
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${colCount}, 1fr)`, borderBottom: "1px solid #252525" }}>
          {headers.map((h, i) => (
            <div key={i} style={{ padding: "10px 14px", color: "#555", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{h}</div>
          ))}
        </div>
      )}
      {rows.map((row, ri) => (
        <div key={ri} style={{ display: "grid", gridTemplateColumns: `repeat(${colCount}, 1fr)`, borderBottom: ri < rows.length - 1 ? "1px solid #1e1e1e" : "none" }}>
          {row.map((cell, ci) => (
            <div key={ci} style={{ padding: "10px 14px", color: ci === 0 ? "#888" : "#555", fontSize: 13, lineHeight: 1.6 }}>{cell}</div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ProviderCard({ name, address, function_, role, transfer, privacy, note }: {
  name: string; address: string; function_: string; role: string; transfer: string; privacy: string; note?: string;
}) {
  return (
    <div style={{ background: "#141414", border: "1px solid #252525", borderRadius: 10, padding: "16px 20px", marginBottom: 12 }}>
      <p style={{ color: "#e0e0e0", fontSize: 14, fontWeight: 600, margin: "0 0 10px" }}>{name}</p>
      <Row label="Adresse" value={address} />
      <Row label="Funktion" value={function_} />
      <Row label="Rolle" value={role} />
      <Row label="Datentransfer" value={transfer} />
      <Row label="Datenschutz" value={privacy} />
      {note && <p style={{ color: "#555", fontSize: 12, margin: "10px 0 0", lineHeight: 1.6 }}>{note}</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 12, marginBottom: 4 }}>
      <span style={{ color: "#555", fontSize: 13, minWidth: 100, flexShrink: 0 }}>{label}</span>
      <span style={{ color: "#777", fontSize: 13, lineHeight: 1.5 }}>{value}</span>
    </div>
  );
}
