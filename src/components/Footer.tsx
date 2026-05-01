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
                src="https://media.audynia.com/Primary_Logo_with_Icon.png"
                width={140}
                height={36}
                alt="Audynia"
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
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0, display: "block" }}>
                  <rect width="48" height="48" rx="24" fill="#25D366"/>
                  <path d="M34.5 13.5C32.1 11.1 28.95 9.75 25.65 9.75C18.75 9.75 13.2 15.3 13.2 22.2C13.2 24.45 13.8 26.55 14.85 28.35L13.05 34.95L19.8 33.15C21.525 34.125 23.55 34.65 25.65 34.65C32.55 34.65 38.1 29.1 38.1 22.2C38.1 18.9 36.9 15.9 34.5 13.5ZM25.65 32.55C23.775 32.55 21.975 32.025 20.4 31.125L20.025 30.9L16.05 31.95L17.1 28.05L16.875 27.675C15.9 26.025 15.3 24.15 15.3 22.2C15.3 16.425 20.025 11.85 25.65 11.85C28.425 11.85 31.05 12.975 32.925 14.925C34.875 16.8 35.925 19.425 35.925 22.2C36 27.975 31.35 32.55 25.65 32.55ZM31.275 24.825C30.975 24.675 29.475 23.925 29.175 23.85C28.875 23.7 28.65 23.7 28.5 24C28.35 24.3 27.675 25.05 27.525 25.275C27.375 25.5 27.15 25.5 26.85 25.35C25.275 24.6 24.225 24 23.175 22.275C22.875 21.75 23.625 21.825 24.225 20.55C24.375 20.4 24.3 20.175 24.225 20.025C24.15 19.875 23.4 18.375 23.175 17.7C22.95 17.1 22.65 17.175 22.5 17.175C22.35 17.175 22.125 17.175 21.9 17.175C21.675 17.175 21.3 17.25 21 17.55C20.7 17.85 19.8 18.675 19.8 20.175C19.8 21.675 21.075 23.1 21.225 23.325C21.375 23.55 23.4 26.7 26.475 28.05C28.5 28.95 29.325 29.025 30.375 28.875C31.05 28.8 32.4 28.05 32.7 27.225C33 26.4 33 25.725 32.85 25.575C32.775 25.2 32.55 25.05 31.275 24.825Z" fill="white"/>
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
            © 2026 Audynia. Alle Rechte vorbehalten.
          </span>
        </div>
      </div>
    </footer>
  );
}
