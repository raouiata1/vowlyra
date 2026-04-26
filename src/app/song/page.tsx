"use client";

import { useState, useRef, useEffect } from "react";
import Nav from "@/components/Nav";
import UGCCarousel from "@/components/UGCCarousel";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const WAVE_HEIGHTS = [18, 30, 22, 38, 26, 32, 20, 36, 28, 40, 24, 34, 18, 30, 26, 38, 22, 28];

const PREVIEW_FAQS = [
  {
    q: "Was passiert nach der Zahlung?",
    a: "Sofort nach der Zahlung erhältst du den vollständigen Song (ca. 3 Minuten) als hochwertige MP3-Datei direkt per E-Mail zugeschickt. Der Prozess ist vollständig automatisiert – kein Warten.",
  },
  {
    q: "Kann ich den Song herunterladen und teilen?",
    a: "Ja! Du bekommst den vollständigen Song als MP3-Datei, die du unbegrenzt herunterladen, speichern und teilen kannst. Dein Song, dein Eigentum.",
  },
  {
    q: "Welche Zahlungsarten werden akzeptiert?",
    a: "Wir akzeptieren alle gängigen Kreditkarten (Visa, Mastercard, Amex), PayPal sowie SEPA-Lastschrift – sicher und verschlüsselt über Stripe abgewickelt.",
  },
  {
    q: "Wie schnell erhalte ich den vollständigen Song?",
    a: "Innerhalb weniger Minuten nach der Zahlung wird der Song automatisch an deine E-Mail-Adresse gesendet. In den meisten Fällen dauert es unter 5 Minuten.",
  },
];

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const SkipBackSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>
  </svg>
);

const SkipForwardSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
);

const PlaySVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const PauseSVG = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>
  </svg>
);

const LockSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

const MusicSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

// ─── page component ───────────────────────────────────────────────────────────

export default function SongPage() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [payUrl, setPayUrl] = useState<string>("/order");
  const [urlChecked, setUrlChecked] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setPreviewUrl(params.get("preview"));
    const pay = params.get("pay");
    if (pay) setPayUrl(pay);
    setUrlChecked(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !previewUrl) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, previewUrl]);

  function handleTimeUpdate() {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress(audio.duration ? (audio.currentTime / audio.duration) * 100 : 0);
  }

  function handleLoadedMetadata() {
    const audio = audioRef.current;
    if (audio) setDuration(audio.duration);
  }

  function handleEnded() {
    setPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    if (audioRef.current) audioRef.current.currentTime = 0;
  }

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio * 100);
  }

  function skipBy(secs: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration || 0, audio.currentTime + secs));
  }

  if (!urlChecked) return null;

  // ─── FALLBACK ─────────────────────────────────────────────────────────────
  if (!previewUrl) {
    return (
      <>
        <Nav />
        <main style={{ background: "#121212", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ textAlign: "center", padding: "40px 24px", maxWidth: 480 }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(29,185,84,0.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#1DB954" }}>
              <MusicSVG />
            </div>
            <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, marginBottom: 12, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Kein Song gefunden
            </h1>
            <p style={{ color: "#999", fontSize: 16, lineHeight: 1.7, marginBottom: 32, fontFamily: "system-ui, -apple-system, sans-serif" }}>
              Der Link ist ungültig oder abgelaufen. Erstelle jetzt deinen persönlichen Song.
            </p>
            <a href="/order" style={{ background: "linear-gradient(135deg, #1DB954, #17a349)", color: "#000", borderRadius: 500, padding: "14px 32px", fontSize: 15, fontWeight: 700, textDecoration: "none", display: "inline-block", boxShadow: "0 4px 15px rgba(29,185,84,0.4)" }}>
              Neuen Song erstellen
            </a>
          </div>
        </main>
      </>
    );
  }

  // ─── MAIN PAGE ────────────────────────────────────────────────────────────
  return (
    <>
      <Nav />

      <main style={{ background: "#121212", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <audio
          ref={audioRef}
          src={previewUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />

        {/* HERO + PLAYER */}
        <section
          className="song-hero"
          style={{
            background: "linear-gradient(180deg, #0a0a0a 0%, #121212 100%)",
            padding: "64px 40px 80px",
            borderBottom: "1px solid #1e1e1e",
          }}
        >
          <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center" }}>

            {/* Badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#1DB95420", color: "#1DB954", borderRadius: 500, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 20 }}>
              Dein Song ist fertig
            </div>

            {/* H1 */}
            <h1 className="song-h1" style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", margin: "0 0 14px" }}>
              Dein Song ist{" "}
              <span style={{ color: "#1DB954" }}>bereit</span>
            </h1>

            {/* Subheadline */}
            <p className="song-subtitle" style={{ color: "#999", fontSize: 17, lineHeight: 1.7, margin: "0 0 24px" }}>
              Höre deine Vorschau und schalte die vollständige Version frei
            </p>

            {/* Delivery info */}
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 32 }}>
              <div style={{ background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.25)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#ccc", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span><strong style={{ color: "#fff" }}>Standard:</strong> 1 Stunde</span>
              </div>
              <div style={{ background: "rgba(29,185,84,0.1)", border: "1px solid rgba(29,185,84,0.25)", borderRadius: 20, padding: "6px 14px", fontSize: 12, color: "#ccc", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <span><strong style={{ color: "#fff" }}>Express:</strong> unter 20 Minuten</span>
              </div>
            </div>

            {/* PLAYER CARD */}
            <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 20, padding: "28px 28px 24px", marginBottom: 28, textAlign: "left" }}>

              {/* Track header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, overflow: "hidden", flexShrink: 0 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://media.vowlyra.com/Vynil.jpg"
                    alt="Vinyl"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    Dein persönlicher Song
                  </div>
                  <div style={{ color: "#777", fontSize: 13, marginTop: 3 }}>
                    Vowlyra · Vorschau
                  </div>
                </div>

                <div style={{ background: "#1DB95415", color: "#1DB954", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, flexShrink: 0, border: "1px solid #1DB95430" }}>
                  30s Preview
                </div>
              </div>

              {/* Waveform */}
              <div style={{ display: "flex", alignItems: "center", gap: 3, height: 44, marginBottom: 14 }}>
                {WAVE_HEIGHTS.map((h, i) => (
                  <div key={i} style={{ flex: 1, height: h, background: i / WAVE_HEIGHTS.length < progress / 100 ? "#1DB954" : "#333", borderRadius: 3, animation: playing ? `wave ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate` : "none", transition: "background 0.2s" }} />
                ))}
              </div>

              {/* Progress bar */}
              <div onClick={handleSeek} style={{ height: 4, background: "#333", borderRadius: 2, cursor: "pointer", marginBottom: 8, position: "relative" }}>
                <div style={{ height: "100%", width: `${progress}%`, background: "#1DB954", borderRadius: 2, transition: "width 0.1s linear" }} />
              </div>

              {/* Time */}
              <div style={{ display: "flex", justifyContent: "space-between", color: "#555", fontSize: 12, marginBottom: 22 }}>
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 30)}</span>
              </div>

              {/* Controls */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32 }}>
                <button onClick={() => skipBy(-10)} style={ctrlBtn} title="10s zurück">
                  <SkipBackSVG />
                </button>

                <button
                  onClick={() => setPlaying((p) => !p)}
                  style={{
                    width: 56, height: 56, borderRadius: "50%", background: "#1DB954", border: "none", cursor: "pointer", fontSize: 22,
                    display: "flex", alignItems: "center", justifyContent: "center", color: "#000",
                    transition: "transform 0.1s, box-shadow 0.2s",
                    boxShadow: playing ? "0 0 24px rgba(29,185,84,0.65)" : "0 4px 16px rgba(29,185,84,0.4)",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {playing ? <PauseSVG /> : <PlaySVG />}
                </button>

                <button onClick={() => skipBy(10)} style={ctrlBtn} title="10s vor">
                  <SkipForwardSVG />
                </button>
              </div>
            </div>

            {/* PRIMARY CTA */}
            <a
              href={payUrl}
              className="song-cta-primary"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "linear-gradient(135deg, #1DB954, #17a349)", color: "#000",
                borderRadius: 500, padding: "18px 40px", fontSize: 17, fontWeight: 800,
                textDecoration: "none", boxShadow: "0 6px 28px rgba(29,185,84,0.5)",
                transition: "transform 0.15s, box-shadow 0.15s", letterSpacing: "-0.3px", width: "100%",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 36px rgba(29,185,84,0.65)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(29,185,84,0.5)"; }}
            >
              <LockSVG />
              <span>Vollständigen Song freischalten</span>
            </a>

            <p style={{ color: "#555", fontSize: 13, marginTop: 12, marginBottom: 0 }}>
              Sofortiger Zugang nach Zahlung · Kein Abo · Einmalig
            </p>

            {/* Trust row */}
            <div className="song-trust-row" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
              {[
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "Sicher bezahlen" },
                { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, label: "Sofortlieferung" },
              ].map((item) => (
                <span key={item.label} style={{ color: "#666", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 5 }}>
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* UGC CAROUSEL */}
        <UGCCarousel />

        {/* FAQ SECTION */}
        <section className="song-faq" style={{ background: "#0f0f0f", padding: "80px 40px 100px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>

            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ display: "inline-block", background: "#1DB95420", color: "#1DB954", borderRadius: 500, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
                Häufige Fragen
              </div>
              <h2 className="section-h2" style={{ fontSize: 40, fontWeight: 800, color: "#fff", letterSpacing: "-1px", margin: 0 }}>
                Alles, was du wissen musst
              </h2>
            </div>

            {/* Accordion */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PREVIEW_FAQS.map((faq, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ background: "#181818", border: "0.5px solid #2a2a2a", borderRadius: 14, overflow: "hidden" }}>
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                    >
                      <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
                        {faq.q}
                      </span>
                      <span style={{ fontSize: 18, color: "#666", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", display: "inline-block" }}>
                        +
                      </span>
                    </button>
                    <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                      <p style={{ margin: 0, padding: "0 24px 20px", fontSize: 14, color: "#888", lineHeight: 1.7, fontFamily: "system-ui, -apple-system, sans-serif" }}>
                        {faq.a}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div style={{ textAlign: "center", marginTop: 48 }}>
              <a
                href={payUrl}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "linear-gradient(135deg, #1DB954, #17a349)", color: "#000",
                  borderRadius: 500, padding: "16px 36px", fontSize: 16, fontWeight: 800,
                  textDecoration: "none", boxShadow: "0 4px 20px rgba(29,185,84,0.4)", transition: "transform 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <LockSVG />
                <span>Vollständigen Song freischalten</span>
              </a>
              <p style={{ color: "#555", fontSize: 12, marginTop: 10, marginBottom: 0 }}>
                Sofortiger Zugang · Einmalige Zahlung
              </p>
            </div>
          </div>
        </section>

        {/* STICKY MOBILE CTA */}
        <div className="song-sticky">
          <a
            href={payUrl}
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
              background: "linear-gradient(135deg, #1DB954, #17a349)", color: "#000",
              padding: "15px 24px", fontSize: 16, fontWeight: 800, textDecoration: "none", letterSpacing: "-0.2px",
            }}
          >
            <LockSVG />
            <span>Vollständigen Song freischalten</span>
          </a>
          <p style={{ textAlign: "center", color: "#888", fontSize: 11, margin: "6px 0 0", paddingBottom: 2 }}>
            Sofortiger Zugang · Einmalige Zahlung
          </p>
        </div>
      </main>

      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1.2); }
        }

        .song-sticky {
          display: none;
        }

        @media (max-width: 767px) {
          .song-hero {
            padding: 36px 20px 100px !important;
          }
          .song-h1 {
            font-size: 34px !important;
            letter-spacing: -0.8px !important;
          }
          .song-subtitle {
            font-size: 15px !important;
            margin-bottom: 20px !important;
          }
          .song-cta-primary {
            font-size: 15px !important;
            padding: 16px 20px !important;
          }
          .song-trust-row {
            gap: 12px !important;
          }
          .song-faq {
            padding: 48px 20px 140px !important;
          }
          .song-sticky {
            display: block;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 200;
            background: #1a1a1a;
            border-top: 1px solid #282828;
            padding: 10px 20px 14px;
          }
        }
      `}</style>
    </>
  );
}

const ctrlBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#777",
  cursor: "pointer",
  padding: 8,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "color 0.15s",
};
