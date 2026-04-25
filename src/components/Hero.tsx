"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const slides = [
  {
    src: "/hero-1.jpg",
    name: "Sarah & Tom",
    occasion: "Hochzeit",
    quote: "Wir haben beide geweint.",
  },
  {
    src: "/hero-2.jpg",
    name: "Lena & Mama",
    occasion: "Geburtstag",
    quote: "Sie hat sofort geweint.",
  },
  {
    src: "/hero-3.jpg",
    name: "Jonas & Mia",
    occasion: "Jahrestag",
    quote: "In 5 Min. das perfekte Geschenk.",
  },
];

function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleDotClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
    startInterval();
  };

  const slide = slides[currentIndex];

  return (
    <div
      className="hero-slider"
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: 500,
        borderRadius: 20,
        background: "#111",
      }}
    >
      {/* Images */}
      {slides.map((s, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          src={s.src}
          alt={s.name}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "all 0.6s ease-in-out",
            opacity: i === currentIndex ? 1 : 0,
            transform:
              i === currentIndex
                ? "translateX(0)"
                : i < currentIndex
                ? "translateX(-100%)"
                : "translateX(100%)",
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)",
          zIndex: 1,
        }}
      />

      {/* Info – bottom left */}
      <div
        className="hero-slide-info"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: 20,
          zIndex: 2,
        }}
      >
        <div
          className="hero-slide-name"
          style={{ color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 2 }}
        >
          {slide.name}
        </div>
        <div
          className="hero-slide-occasion"
          style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, marginBottom: 4 }}
        >
          {slide.occasion}
        </div>
        <div
          className="hero-slide-quote"
          style={{ color: "rgba(255,255,255,0.9)", fontSize: 13, fontStyle: "italic" }}
        >
          &ldquo;{slide.quote}&rdquo;
        </div>
      </div>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 6,
          alignItems: "center",
          zIndex: 3,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={i === currentIndex ? "hero-dot hero-dot-active" : "hero-dot"}
          />
        ))}
      </div>

      <style>{`
        .hero-dot {
          width: 6px; height: 6px; border-radius: 500px;
          background: rgba(255,255,255,0.5);
          border: none; padding: 0; cursor: pointer;
          transition: width 0.3s ease, background 0.3s ease;
        }
        .hero-dot-active { width: 20px; background: #1DB954; }
        @media (max-width: 767px) {
          .hero-slider { width: 100% !important; height: 100% !important; border-radius: 16px !important; }
          .hero-dot { width: 8px !important; height: 8px !important; }
          .hero-dot-active { width: 24px !important; }
          .hero-slide-info { padding: 14px !important; }
          .hero-slide-name { font-size: 14px !important; }
          .hero-slide-occasion, .hero-slide-quote { font-size: 11px !important; }
        }
      `}</style>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="song-erstellen"
      className="hero-section"
      style={{
        background: "#CCCCCC",
        padding: "60px 24px 80px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
        }}
      >
        {/* Left: Text */}
        <div>
          <h1
            className="hero-h1"
            style={{
              fontSize: 52,
              fontWeight: 800,
              lineHeight: 1.1,
              color: "#1a1a1a",
              margin: 0,
              marginBottom: 20,
              letterSpacing: "-1.5px",
            }}
          >
            Deine Geschichte als einzigartiger Song <br />
            <span style={{ color: "#1DB954" }}>in wenigen Minuten</span>.
          </h1>

          <p
            style={{
              fontSize: 18,
              color: "#555",
              lineHeight: 1.6,
              marginBottom: 32,
              maxWidth: 460,
            }}
          >
            Überrasche jemanden mit einem persönlichen Song, der verbindet, berührt und für immer in Erinnerung bleibt.{" "}
            Perfekt für Geburtstag, Hochzeit oder einfach, um Danke zu sagen.
          </p>

          {/* CTAs */}
          <div className="hero-ctas" style={{ display: "flex", gap: 12, marginBottom: 36 }}>
            <Link
              href="/order"
              style={{
                background: "#1a1a1a",
                color: "#fff",
                borderRadius: 500,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 700,
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Jetzt persönlichen Song erstellen
            </Link>
            <a
              href="#demo"
              style={{
                background: "transparent",
                color: "#1a1a1a",
                borderRadius: 500,
                padding: "14px 28px",
                fontSize: 15,
                fontWeight: 600,
                textDecoration: "none",
                border: "2px solid #1a1a1a",
                transition: "all 0.2s ease",
                flexWrap: "wrap",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a1a1a";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#1a1a1a";
              }}
            >
              Demo anhören
            </a>
          </div>

          {/* Proof Bar */}
          <div
            className="hero-proof"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
              flexWrap: "wrap",
              color: "#555",
              fontSize: 13,
              fontWeight: 500,
              textAlign: "center",
              flexWrap: "wrap",
            }}
          >
          
          <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a1a", lineHeight: 1 }}>4,9</span>
            <span style={{ color: "#FFB800", fontSize: 15, margin: "0 6px 0 8px", letterSpacing: "1px" }}>★★★★★</span>
            <span style={{ color: "#1a1a1a", fontSize: 12 }}>aus 2.400+ Songs</span>
            <Sep />
            <span>Trailer ~30 Sek.</span>
            <Sep />
            <span>Song 2–4 Min.</span>
          </div>
        </div>

        {/* Right: Image Slider */}
        <div className="hero-image-grid">
          <HeroSlider />
        </div>
      </div>
    </section>
  );
}

function Sep() {
  return (
    <span style={{ margin: "0 12px", color: "#bbb", fontWeight: 300, fontSize: 14 }}>|</span>
  );
}
