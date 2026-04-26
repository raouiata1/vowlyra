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
                  gap: 10,
                  background: "transparent",
                  color: "#1a1a1a",
                  borderRadius: 500,
                  fontSize: 13,
                  fontWeight: 600,
                  padding: "4px 0",
                  textDecoration: "none",
                  marginBottom: 12,
                  transition: "opacity 0.15s",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://media.vowlyra.com/whatsapp_logo.png"
                  alt="WhatsApp"
                  width={48}
                  height={48}
                  style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0, display: "block" }}
                />
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
            © 2026 Vowlyra. Alle Rechte vorbehalten.
          </span>
        </div>
      </div>
    </footer>
  );
}
