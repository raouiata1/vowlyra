# Vowlyra – Projekt-Kontext für Claude Code

## Was ist Vowlyra?
Ein digitales Produkt: KI-personalisierte Songs für Kunden.
Der Kunde gibt Informationen an (Anlass, Namen, Erinnerungen, Stil),
daraus wird automatisch ein einzigartiger Song erstellt und geliefert.
Lieferzeit: ~5 Minuten. Trailer kostenlos vorab, Song nach Zahlung.

## Geschäftsmodell
- Preis: 14,99 € pro Song (einmalig, kein Abo)
- Trailer (30 Sek.) wird kostenlos per E-Mail geschickt
- Kunde zahlt nur wenn Trailer gefällt → dann Full Song per Mail
- Song-Generierung: Suno AI Pro ($10/Monat, 500 Songs/Monat)
- Zahlung: Stripe direkt in Next.js (kein WordPress/WooCommerce)
- E-Mail: Zoho Mail (bereits vorhanden)
- Automatisierung: n8n (selbst gehostet auf VPS, bereits vorhanden)
  - Workflow kann bereits: Stripe Webhook empfangen, Lyrics erstellen, E-Mail senden

## Anlässe
- Geburtstag
- Hochzeit & Jahrestag
- Weihnachten & Valentinstag
- Einfach so / Überraschung

## Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Hosting**: Vercel (Hobby → Pro sobald kommerziell)
- **Datenbank**: Supabase (Free Tier)
- **Zahlung**: Stripe (1,5% + 0,25€ pro EU-Transaktion, kein Monatsabo)
- **E-Mail**: Zoho Mail (bereits vorhanden, SMTP)
- **Song-KI**: Suno AI Pro
- **Automatisierung**: n8n (selbst gehostet auf VPS)
- **Chat**: Tawk.to (kostenlos, wird als Script eingebunden)
- **Domain**: bereits vorhanden

## Design System
- **Hintergrund**: #F5F5F7 (Linear-grau, hell)
- **Akzentfarbe**: #1DB954 (Spotify-Grün)
- **Text primär**: #1a1a1a
- **Text sekundär**: #555
- **Text muted**: #999
- **Cards**: weiß (#fff), Border 0.5px solid #e0e0e0, border-radius 14px
- **Nav/Chat-Bar**: weiß, sticky
- **Demo-Section**: schwarzer Hintergrund #121212 (einzige dunkle Sektion)
- **CTA primär**: background #1a1a1a, color #fff, border-radius 500px
- **CTA grün**: background #1DB954, color #000, border-radius 500px
- **Schrift**: system-ui, -apple-system, sans-serif

## Seitenstruktur (optimiert für Conversion)
Reihenfolge ist bewusst gewählt – nicht ändern ohne Absprache:

1. **Nav** – sticky, Logo "Vowlyra" (yra in #1DB954), Links: Demo, Preise, FAQ, CTA "Song erstellen"
2. **Hero** – zweispaltig: links Text + Badges + CTAs + Proof-Bar, rechts Kunden-Bildgrid
3. **Demo** – schwarzer Hintergrund, Spotify-Player, funktioniert (Play/Pause, Seek, Waveform)
4. **How it works** – 3 Schritte als Cards
5. **UGC-Karussell** – endlos scrollend links→rechts, pausiert bei Hover
6. **Preis + Garantie** – 2-spaltig Grid
7. **FAQ** – Akkordeon mit Animation
8. **Chat-Bar** – grüner Pulse-Dot, "Wir sind online"

## Komponenten-Struktur
```
vowlyra/
├── src/
│   ├── app/
│   │   ├── page.tsx          ← importiert alle Sektions-Komponenten
│   │   ├── layout.tsx        ← Metadata, Fonts
│   │   └── globals.css       ← Tailwind + CSS-Variablen
│   └── components/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── Demo.tsx          ← Spotify-Player (Play/Pause, Seek, Waveform)
│       ├── HowItWorks.tsx
│       ├── UGCCarousel.tsx   ← CSS animation, pausiert bei hover
│       ├── Pricing.tsx       ← Preis-Card + Garantie-Card nebeneinander
│       ├── FAQ.tsx           ← Akkordeon mit useState
│       └── ChatBar.tsx       ← Tawk.to Script + UI
├── public/
├── CLAUDE.md                 ← diese Datei
├── package.json
└── tailwind.config.ts
```

## Hero – Detail
- Links: Badge-Row (4 Anlass-Pills), H1 "Dein persönlicher Song. In 5 Minuten.", "In 5 Minuten" in #1DB954
- Zwei CTAs: "Jetzt Song erstellen" (schwarz) + "Demo anhören" (ghost/outline)
- Proof-Bar: ★★★★★ 4,9 · 2.400+ Songs · Trailer kostenlos · Ab 14,99€
- Rechts: asymmetrisches 2-Spalten-Grid, 3 Cards:
  - Große Card links (grid-row: span 2): Sarah & Tom, Hochzeit, Zitat "Wir haben beide geweint"
  - Kleine Card rechts oben: Mama zum 70., Geburtstag, Zitat "Besser als erwartet"
  - Kleine Card rechts unten: Jonas & Mia, Jahrestag 10 Jahre, Zitat "In 5 Min. fertig"
- Kein reales Foto – CSS Avatar (runder Kreis mit Initial + Pastellfarbe)

## Demo-Section – Detail
- Hintergrund #121212, 2-spaltig: links Erklärtext, rechts Player-Card
- Player-Card (#181818, border #282828, border-radius 16px)
- Album-Art: grüner Kreis mit Musik-Icon
- Track: "Für dich, Mama" · Vowlyra · Geburtstagsbeispiel
- Progress-Bar: klickbar (seek), zeigt Zeit
- Play/Pause Toggle mit Icon-Wechsel
- Waveform: 18 Bars, animieren nur wenn playing (CSS @keyframes)
- Controls: Skip-Back, Play/Pause, Skip-Forward

## UGC-Karussell – Detail
- 8 Karten (doppelt für nahtloses Loop): je 210px breit
- Jede Karte: farbiger Thumbnail (6 Pastell-Varianten), Play-Circle-Button, Name, Anlass, ★★★★★
- CSS: animation: slide 32s linear infinite, transformX(-50%) am Ende
- Hover: animation-play-state: paused
- Overflow hidden am Container

## FAQ – Fragen
1. "Wie persönlich wird der Song wirklich?"
2. "Was ist der Trailer und warum ist er kostenlos?"
3. "Kann ich den Musikstil selbst wählen?"
4. "Was passiert, wenn mir der Trailer nicht gefällt?"
5. "Wie lange dauert die Lieferung des vollständigen Songs?"

## Nächste Schritte (nach Landingpage)
1. Wizard-Flow bauen (Bestellprozess: Anlass → Details → Stil → E-Mail → Stripe Checkout)
2. Stripe Checkout Integration (Next.js API Route + Webhook)
3. n8n Workflow finalisieren (Suno API → Trailer → Full Song → Zoho Mail)
4. Supabase Schema (Bestellungen, Status, Kundendaten)
5. Tawk.to Chat einbinden
6. Deployment auf Vercel

## Wichtige Entscheidungen (bereits getroffen – nicht neu diskutieren)
- **Kein WordPress / WooCommerce** → Stripe direkt in Next.js
- **Kein separates Backend** → Next.js API Routes reichen
- **Vercel Hobby** für Launch, upgrade zu Pro bei ersten Verkäufen
- **Zoho Mail** statt Resend (bereits vorhanden)
- **n8n auf eigenem VPS** (bereits läuft)
- **Trailer per E-Mail** (nicht WhatsApp) für den Start

## Befehle
```bash
# Entwicklung
npm run dev

# Build prüfen
npm run build

# Deployment
vercel --prod
```
