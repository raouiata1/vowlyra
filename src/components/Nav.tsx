"use client";

import Image from "next/image";
import Link from "next/link";
import { useMetaEvent } from "@/hooks/useMetaEvent";
import { useTranslations, useLocale } from "next-intl";

export default function Nav({ hideLogo = false, dark = false, leftLogo, ctaLabel, ctaHref, wiggle = false }: { hideLogo?: boolean; dark?: boolean; leftLogo?: string; ctaLabel?: string; ctaHref?: string; wiggle?: boolean }) {
  const { sendEvent } = useMetaEvent();
  const t = useTranslations("nav");
  const locale = useLocale();

  return (
    <nav style={{
      background: dark ? "#121212" : "#CCCCCC",
      borderBottom: dark ? "1px solid #1e1e1e" : "none",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <style>{`
        @keyframes navBtnWiggle {
          0%,55%,100% { transform: scale(1) rotate(0deg); }
          57%          { transform: scale(1.06) rotate(-2deg); }
          59%          { transform: scale(1.06) rotate(2deg); }
          61%          { transform: scale(1.06) rotate(-2deg); }
          63%          { transform: scale(1.06) rotate(2deg); }
          65%          { transform: scale(1) rotate(0deg); }
        }
        .nav-cta-wiggle {
          animation: navBtnWiggle 5s ease-in-out infinite;
        }
        .nav-cta-wiggle:hover {
          animation: none;
          transform: scale(1.05) !important;
        }
      `}</style>

      <div className="nav-inner" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 70, display: "flex", alignItems: "center", justifyContent: (hideLogo && !leftLogo) ? "flex-end" : "space-between" }}>

        {/* Left: Logo */}
        {leftLogo ? (
          <a href={`/${locale}`} style={{ display: "flex" }}>
            <Image src={leftLogo} alt="Audynia" height={40} width={160} style={{ height: 40, width: "auto", objectFit: "contain" }} priority />
          </a>
        ) : !hideLogo ? (
          <a href={`/${locale}`} style={{ display: "flex" }}>
            <Image src="/logo.png" height={45} width={145} alt="Audynia" style={{ objectFit: "contain" }} />
          </a>
        ) : null}

        {/* Right: Links + CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div className="nav-links" style={{ alignItems: "center", gap: 32 }}>
            <a href="#demo" style={linkStyle}>{t("demo")}</a>
            <a href="#preise" style={linkStyle}>{t("prices")}</a>
            <a href="#faq" style={linkStyle}>{t("faq")}</a>
          </div>

          <Link
            href={ctaHref ?? `/${locale}/order`}
            onClick={() => sendEvent({ eventName: "InitiateCheckout" })}
            className={wiggle ? "nav-cta-wiggle" : ""}
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
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(29,185,84,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 4px 15px rgba(29,185,84,0.4)";
            }}
          >
            {ctaLabel ?? t("cta")}
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
