"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Nav from "@/components/Nav";

// ─── helpers ──────────────────────────────────────────────────────────────────

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const WAVE_HEIGHTS = [18, 30, 22, 38, 26, 32, 20, 36, 28, 40, 24, 34, 18, 30, 26, 38, 22, 28];

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

const MusicSVG = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"/>
    <circle cx="6" cy="18" r="3"/>
    <circle cx="18" cy="16" r="3"/>
  </svg>
);

const DownloadSVG = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

// ─── page component ───────────────────────────────────────────────────────────

export default function FullSongPage() {
  const DEMO_URL = "https://audio.audynia.com/order_10_full_v1.mp3";
  const [songUrl, setSongUrl] = useState<string | null>(DEMO_URL);
  const [songTitle, setSongTitle] = useState<string>("Dein persönlicher Song");
  const [urlChecked, setUrlChecked] = useState(false);

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const [downloading, setDownloading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  async function handleDownload() {
    if (!songUrl) return;
    setDownloading(true);
    try {
      const proxyUrl = `/api/download?url=${encodeURIComponent(songUrl)}`;
      const res = await fetch(proxyUrl);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `${songTitle}.mp3`;
      a.click();
      URL.revokeObjectURL(blobUrl);
    } finally {
      setDownloading(false);
    }
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const song = params.get("song");
    if (song) setSongUrl(song);
    const title = params.get("title");
    if (title) setSongTitle(decodeURIComponent(title));
    setUrlChecked(true);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !songUrl) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing, songUrl]);

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
  if (!songUrl) {
    return (
      <>
        <Nav dark leftLogo="https://media.audynia.com/Secondary_Logo.png" ctaLabel="Song erstellen" />
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
      <Nav dark leftLogo="https://media.audynia.com/Secondary_Logo_with_Icon.png" ctaLabel="Song erstellen" />
      <main style={{ background: "#121212", fontFamily: "system-ui, -apple-system, sans-serif" }}>
        <audio
          ref={audioRef}
          src={songUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          preload="metadata"
        />

        {/* HERO + PLAYER */}
        <section
          className="fullsong-hero"
          style={{
            background: "#121212",
            padding: "64px 40px 80px",
            minHeight: "calc(100vh - 70px)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ maxWidth: 580, margin: "0 auto", textAlign: "center", width: "100%" }}>

            {/* H1 */}
            <h1 className="fullsong-h1" style={{ fontSize: 48, fontWeight: 800, color: "#fff", lineHeight: 1.1, letterSpacing: "-1.5px", margin: "0 0 14px" }}>
              Dein Song gehört{" "}
              <span style={{ color: "#1DB954" }}>dir</span>
            </h1>

            <p className="fullsong-subtitle" style={{ color: "#999", fontSize: 17, lineHeight: 1.7, margin: "0 0 32px" }}>
              Genieße deinen persönlichen Song in voller Länge
            </p>

            {/* PLAYER CARD */}
            <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 20, padding: "28px 28px 24px", marginBottom: 24, textAlign: "left" }}>

              {/* Track header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <div style={{ width: 60, height: 60, borderRadius: 12, overflow: "hidden", flexShrink: 0, position: "relative" }}>
                  <Image
                    src="https://media.audynia.com/Vynil.jpg"
                    alt="Vinyl"
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="60px"
                  />
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {songTitle}
                  </div>
                  <div style={{ color: "#777", fontSize: 13, marginTop: 3 }}>
                    Audynia · Vollständiger Song
                  </div>
                </div>

                <div style={{ background: "#1DB95415", color: "#1DB954", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, flexShrink: 0, border: "1px solid #1DB95430" }}>
                  Full Song
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
                <span>{formatTime(duration)}</span>
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

            {/* DOWNLOAD BUTTON */}
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="fullsong-download"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                background: "#1e1e1e", color: "#fff",
                border: "1px solid #333",
                borderRadius: 500, padding: "16px 40px", fontSize: 15, fontWeight: 700,
                cursor: downloading ? "wait" : "pointer",
                opacity: downloading ? 0.7 : 1,
                transition: "background 0.15s, border-color 0.15s", width: "100%",
              }}
              onMouseEnter={(e) => { if (!downloading) { e.currentTarget.style.background = "#2a2a2a"; e.currentTarget.style.borderColor = "#444"; } }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1e1e1e"; e.currentTarget.style.borderColor = "#333"; }}
            >
              <DownloadSVG />
              <span>{downloading ? "Wird heruntergeladen..." : "Song herunterladen"}</span>
            </button>

            <p style={{ color: "#444", fontSize: 12, marginTop: 14, marginBottom: 0 }}>
              Dein Song · Für immer · Kein Abo
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ background: "#0a0a0a", borderTop: "1px solid #1e1e1e", padding: "28px 40px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
              <a href="/impressum" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >Impressum</a>
              <a href="/agb" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >AGB</a>
              <a href="/datenschutz" style={{ color: "#555", fontSize: 13, textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#888")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >Datenschutzrichtlinien</a>
            </div>
            <p style={{ color: "#333", fontSize: 12, margin: 0 }}>
              © {new Date().getFullYear()} Audynia. Alle Rechte vorbehalten.
            </p>
          </div>
        </footer>
      </main>

      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1.2); }
        }

        @media (max-width: 767px) {
          .fullsong-hero {
            padding: 36px 20px 60px !important;
          }
          .fullsong-h1 {
            font-size: 34px !important;
            letter-spacing: -0.8px !important;
          }
          .fullsong-subtitle {
            font-size: 15px !important;
          }
          .fullsong-download {
            font-size: 14px !important;
            padding: 14px 20px !important;
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
