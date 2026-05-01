"use client";

import Image from "next/image";
import Link from "next/link";

export default function Nav({ hideLogo = false, dark = false, leftLogo, ctaLabel, ctaHref }: { hideLogo?: boolean; dark?: boolean; leftLogo?: string; ctaLabel?: string; ctaHref?: string }) {
  return (
    <nav
      style={{
        background: dark ? "#121212" : "#CCCCCC",
        borderBottom: dark ? "1px solid #1e1e1e" : "none",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        className="nav-inner"
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 24px",
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: (hideLogo && !leftLogo) ? "flex-end" : "space-between",
        }}
      >
        {/* Left: Primary Logo or custom leftLogo */}
        {leftLogo ? (
          <a href="/" style={{ display: "flex" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={leftLogo}
              alt="Vowlyra"
              style={{ height: 40, width: "auto", objectFit: "contain", display: "block" }}
            />
          </a>
        ) : !hideLogo ? (
          <a href="/" style={{ display: "flex" }}>
            <Image
              src="https://media.vowlyra.com/Primary_Logo.png"
              height={45}
              width={145}
              alt="Vowlyra"
              style={{ objectFit: "contain" }}
            />
          </a>
        ) : null}

        {/* Right: Links + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          {/* Nav links – hidden on mobile via .nav-links class */}
          <div className="nav-links" style={{ alignItems: "center", gap: 32 }}>
            <a href="#demo" style={linkStyle}>Demo</a>
            <a href="#preise" style={linkStyle}>Preise</a>
            <a href="#faq" style={linkStyle}>FAQ</a>
          </div>

          {/* CTA always visible */}
          <Link
            href={ctaHref ?? "/order"}
            style={{
              background: "linear-gradient(135deg, #1DB954, #17a349)",
              color: "#000",
              borderRadius: 500,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.3px",
              textDecoration: "none",
              boxShadow: "0 4px 15px rgba(29,185,84,0.4)",
              transition: "transform 0.15s, box-shadow 0.15s",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(29,185,84,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(29,185,84,0.4)";
            }}
          >
            {ctaLabel ?? "Song erstellen"}
          </Link>
        </div>
      </div>
    </nav>
  );
}

const linkStyle: React.CSSProperties = {
  fontFamily: "system-ui, -apple-system, sans-serif",
  fontSize: 14,
  fontWeight: 500,
  color: "#555",
  textDecoration: "none",
};
