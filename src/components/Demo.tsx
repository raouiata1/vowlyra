"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const DURATION = 217; // 3:37 demo duration in seconds

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function Demo() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0-100
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsed = (progress / 100) * DURATION;

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            setPlaying(false);
            return 0;
          }
          return p + 100 / (DURATION * 10);
        });
      }, 100);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [playing]);

  function handleSeek(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setProgress((x / rect.width) * 100);
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
      <div
        className="demo-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Left: Text */}
        <div>
          <div
            style={{
              display: "inline-block",
              background: "#1DB95420",
              color: "#1DB954",
              borderRadius: 500,
              padding: "6px 16px",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Echtzeit-Demo
          </div>
          <h2
            className="section-h2"
            style={{
              fontSize: 40,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.15,
              letterSpacing: "-1px",
              margin: 0,
              marginBottom: 12,
            }}
          >
            Hör selbst, wie
            <br />
            persönlich es klingt.
          </h2>
          <p className="demo-subtitle" style={{ color: "#999", fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
            Dieser Song wurde für eine Mutter erstellt – basierend auf echten
            Erinnerungen und Momenten. So klingt dein Song auch.
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Jeder Song ist 100% einzigartig",
              "Trailer in ~10 Minuten in deiner Inbox",
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
        <div
          style={{
            background: "#181818",
            border: "1px solid #282828",
            borderRadius: 16,
            padding: 28,
          }}
        >
          {/* Album Art + Track Info */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: 12,
                overflow: "hidden",
                flexShrink: 0,
                position: "relative",
              }}
            >
              <Image
                src="/vynil.jpg"
                alt="Album Art"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Für dich, Mama</div>
              <div style={{ color: "#999", fontSize: 13, marginTop: 3 }}>Vowlyra · Geburtstagsgeschenk</div>
            </div>
          </div>

          {/* Waveform */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              height: 40,
              marginBottom: 20,
            }}
          >
            {Array.from({ length: 18 }).map((_, i) => {
              const heights = [18, 30, 22, 38, 26, 32, 20, 36, 28, 40, 24, 34, 18, 30, 26, 38, 22, 28];
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: heights[i],
                    background: i / 18 < progress / 100 ? "#1DB954" : "#333",
                    borderRadius: 3,
                    animation: playing ? `wave ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate` : "none",
                    transition: "background 0.2s",
                  }}
                />
              );
            })}
          </div>

          {/* Progress Bar */}
          <div
            onClick={handleSeek}
            style={{
              height: 4,
              background: "#333",
              borderRadius: 2,
              cursor: "pointer",
              marginBottom: 8,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "#1DB954",
                borderRadius: 2,
                transition: "width 0.1s linear",
              }}
            />
          </div>

          {/* Time */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#999",
              fontSize: 12,
              marginBottom: 24,
            }}
          >
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(DURATION)}</span>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28 }}>
            <button
              onClick={() => setProgress((p) => Math.max(0, p - 10))}
              style={controlBtn}
              title="Zurück"
            >
              ⏮
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
                fontSize: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#000",
                transition: "transform 0.1s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {playing ? "⏸" : "▶"}
            </button>
            <button
              onClick={() => setProgress((p) => Math.min(100, p + 10))}
              style={controlBtn}
              title="Vor"
            >
              ⏭
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
  fontSize: 22,
  cursor: "pointer",
  padding: 4,
  lineHeight: 1,
};
