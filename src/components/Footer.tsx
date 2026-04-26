import Image from "next/image";

export default function Footer() {
  const colHeadingStyle: React.CSSProperties = {
    color: "#1a1a1a",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginBottom: 16,
  };

  const linkStyle: React.CSSProperties = {
    color: "#555",
    textDecoration: "none",
    fontSize: 14,
    lineHeight: "2",
    display: "block",
    transition: "color 0.15s",
  };

  return (
    <footer
      className="footer-outer"
      style={{
        background: "#CCCCCC",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <style>{`
        .footer-outer { padding: 64px 40px 40px; }
        .footer-link:hover { color: #1a1a1a !important; }
        .footer-wa:hover { opacity: 0.85; }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1.5fr;
          gap: 40px;
        }
        .stars-row { display: flex; align-items: center; gap: 8px; }
        @media (max-width: 767px) {
          .footer-outer { padding: 48px 20px 32px; }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .footer-col1 { text-align: center; }
          .footer-col1 .stars-row { justify-content: center; }
          .footer-links-grid {
            grid-template-columns: 1fr 1fr;
            gap: 24px;
          }
          .footer-link { font-size: 13px !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-grid">

          {/* Col 1 – Logo & Description */}
          <div className="footer-col1">
            <a href="/" style={{ display: "inline-block", marginBottom: 12 }}>
              <Image
                src="/logo.png"
                width={100}
                height={32}
                alt="Vowlyra"
                style={{ objectFit: "contain" }}
              />
            </a>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, margin: "0 0 16px 0" }}>
              Personalisierte Songs für jeden besonderen Moment.
            </p>
            <div className="stars-row">
              <span style={{ color: "#FFB800", fontSize: 14 }}>★★★★★</span>
              <span style={{ color: "#555", fontSize: 13 }}>4,9 / 5 aus 2.400+ Songs</span>
            </div>
          </div>

          {/* Cols 2–4 */}
          <div className="footer-links-grid">

            {/* Col 2 – Produkt */}
            <div>
              <div style={colHeadingStyle}>Produkt</div>
              {[
                { label: "Song erstellen", href: "/order" },
                { label: "Demo anhören", href: "#demo" },
                { label: "Preise", href: "#preise" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="footer-link" style={linkStyle}>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Col 3 – Rechtliches */}
            <div>
              <div style={colHeadingStyle}>Rechtliches</div>
              {[
                { label: "AGB", href: "/agb" },
                { label: "Impressum", href: "/impressum" },
                { label: "Datenschutz", href: "/datenschutz" },
                { label: "Widerrufsrecht", href: "/widerruf" },
              ].map((link) => (
                <a key={link.label} href={link.href} className="footer-link" style={linkStyle}>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Col 4 – Kontakt */}
            <div>
              <div style={colHeadingStyle}>Kontakt</div>
              <p style={{ color: "#555", fontSize: 14, margin: "0 0 14px 0", lineHeight: 1.6 }}>
                Fragen? Schreib uns direkt
              </p>
              <a
                href="https://wa.me/WHATSAPP_NUMBER"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-wa"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: 500,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "8px 16px",
                  textDecoration: "none",
                  marginBottom: 12,
                  transition: "opacity 0.15s",
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.99 2C6.476 2 2 6.476 2 11.99c0 1.867.518 3.614 1.416 5.115L2 22l5.043-1.39A9.948 9.948 0 0011.99 22C17.504 22 22 17.524 22 12.01 22 6.495 17.504 2 11.99 2z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "0.5px solid #b0b0b0",
            paddingTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ color: "#777", fontSize: 12 }}>
            © Vowlyra. Vowlyra startet ab 2026.
          </span>
        </div>
      </div>
    </footer>
  );
}
