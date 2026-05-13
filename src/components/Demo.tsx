"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const DEMO_AUDIO_URL = "https://media.vowlyra.com/demo_song_full.mp3";
const WAVE_HEIGHTS = [18, 30, 22, 38, 26, 32, 20, 36, 28, 40, 24, 34, 18, 30, 26, 38, 22, 28];

function formatTime(s: number) {
  if (!isFinite(s) || s < 0) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const SkipBackSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="19 20 9 12 19 4 19 20"/>
    <line x1="5" y1="19" x2="5" y2="5"/>
  </svg>
);

const SkipForwardSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 4 15 12 5 20 5 4"/>
    <line x1="19" y1="5" x2="19" y2="19"/>
  </svg>
);

const PlaySVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}>
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);

const PauseSVG = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16"/>
    <rect x="14" y="4" width="4" height="16"/>
  </svg>
);

export default function Demo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(217);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  }, [playing]);

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

  return (
    <section
      id="demo"
      className="demo-section"
      style={{
        background: "#121212",
        padding: "80px 40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <audio
        ref={audioRef}
        src={DEMO_AUDIO_URL}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        preload="metadata"
      />

      <div className="demo-grid" style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Left: Text */}
        <div className="demo-left">
          <div className="demo-pill-center" style={{ marginBottom: 20 }}>
            <div style={{ display: "inline-block", background: "#1DB95420", color: "#1DB954", borderRadius: 500, padding: "6px 16px", fontSize: 13, fontWeight: 600 }}>
              Echtzeit-Demo
            </div>
          </div>
          <h2
            className="section-h2"
            style={{ fontSize: 40, fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-1px", margin: 0, marginBottom: 12 }}
          >
            ECHTER SONG<br/>ECHTE GESCHICHTE
            <br />
            So klingt ein Geschenk, das sie nie vergessen wird.
          </h2>
          <p className="demo-subtitle" style={{ color: "#999", fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
            Basierend auf echten Erinnerungen,<br/>Orten und Momenten.<br/>Jeder Song erzählt eure persönliche Geschichte.
          </p>

          {/* Delivery info */}
          <div style={{ background: "rgba(29,185,84,0.08)", border: "1px solid rgba(29,185,84,0.25)", borderRadius: 12, padding: "16px 20px", marginBottom: 24 }}>
            <div style={{ color: "#1DB954", fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", marginBottom: 10, textTransform: "uppercase" }}>Lieferzeiten</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ color: "#ccc", fontSize: 14, display: "flex", gap: 10, alignItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span><strong style={{ color: "#fff" }}>Standard:</strong> Song in 1 Stunde erstellt</span>
              </div>
              <div style={{ color: "#ccc", fontSize: 14, display: "flex", gap: 10, alignItems: "center" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
                <span><strong style={{ color: "#fff" }}>Express:</strong> Song in weniger als 20 Minuten</span>
              </div>
            </div>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Jeder Song ist 100% einzigartig",
              "Trailer in ~3 Minuten in deiner Inbox",
              "Nur zahlen, wenn der Trailer gefällt",
            ].map((item) => (
              <li key={item} style={{ color: "#ccc", fontSize: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "#1DB954", fontWeight: 700, marginTop: 1 }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Player Card */}
        <div style={{ background: "#181818", border: "1px solid #282828", borderRadius: 16, padding: 28 }}>

          {/* Album Art + Track Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, overflow: "hidden", flexShrink: 0, position: "relative" }}>
              <Image
                src="https://media.vowlyra.com/Vynil.jpg"
                alt="Vinyl"
                fill
                style={{ objectFit: "cover" }}
                sizes="60px"
              />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Für dich, Irene ❤️</div>
              <div style={{ color: "#999", fontSize: 13, marginTop: 3 }}>Jahrestag · erstellt von Vowlyra</div>
            </div>
          </div>

          {/* Waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: 3, height: 40, marginBottom: 20 }}>
            {WAVE_HEIGHTS.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: h,
                  background: i / WAVE_HEIGHTS.length < progress / 100 ? "#1DB954" : "#333",
                  borderRadius: 3,
                  animation: playing ? `wave ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate` : "none",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>

          {/* Progress Bar */}
          <div
            onClick={handleSeek}
            style={{ height: 4, background: "#333", borderRadius: 2, cursor: "pointer", marginBottom: 8, position: "relative" }}
          >
            <div style={{ height: "100%", width: `${progress}%`, background: "#1DB954", borderRadius: 2, transition: "width 0.1s linear" }} />
          </div>

          {/* Time */}
          <div style={{ display: "flex", justifyContent: "space-between", color: "#999", fontSize: 12, marginBottom: 24 }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <button onClick={() => skipBy(-10)} style={controlBtn} title="10s zurück">
              <SkipBackSVG />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "#1DB954",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                transition: "transform 0.1s",
                boxShadow: playing ? "0 0 20px rgba(29,185,84,0.6)" : "0 4px 14px rgba(29,185,84,0.4)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {playing ? <PauseSVG /> : <PlaySVG />}
            </button>
            <button onClick={() => skipBy(10)} style={controlBtn} title="10s vor">
              <SkipForwardSVG />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.6); }
          to   { transform: scaleY(1.2); }
        }
      `}</style>
    </section>
  );
}

const controlBtn: React.CSSProperties = {
  background: "none",
  border: "none",
  color: "#999",
  cursor: "pointer",
  padding: 8,
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  transition: "color 0.15s",
};
