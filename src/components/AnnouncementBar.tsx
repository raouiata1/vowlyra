"use client";

import { useLocale } from "next-intl";

const MESSAGES_DE = [
  "🎵 In nur 3 Minuten ausgefüllt → kostenloser Trailer in deinem Postfach",
  "✓ Kein Abo · Nur zahlen wenn der Trailer gefällt",
  "⚡ Express: Song in unter 20 Minuten · Standard: 6 Stunden",
  "🎁 Das emotionalste Geschenk das du je gemacht hast",
  "✓ 4,9 ★ aus über 2.400 Songs",
];

const MESSAGES_EN = [
  "🎵 Filled out in just 3 minutes → free trailer in your inbox",
  "✓ No subscription · Only pay if you love the trailer",
  "⚡ Express: Song in under 20 minutes · Standard: 6 hours",
  "🎁 The most emotional gift you've ever given",
  "✓ 4.9 ★ from over 2,400 songs",
];

export default function AnnouncementBar() {
  const locale = useLocale();
  const messages = locale === "de" ? MESSAGES_DE : MESSAGES_EN;
  // Duplicate for seamless loop
  const items = [...messages, ...messages];

  return (
    <div style={{
      background: "#1a1a1a",
      color: "#fff",
      height: 36,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      position: "relative",
    }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .announcement-track {
          display: flex;
          align-items: center;
          white-space: nowrap;
          animation: marquee 28s linear infinite;
          will-change: transform;
        }
        .announcement-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="announcement-track">
        {items.map((msg, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 500, letterSpacing: "0.2px", padding: "0 4px" }}>
              {msg}
            </span>
            <span style={{ color: "#1DB954", margin: "0 16px", fontSize: 14, fontWeight: 700 }}>•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
