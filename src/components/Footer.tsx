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
          grid-template-columns: 1fr 1.5fr;
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

            {/* Col 3 – Kontakt */}
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
                  <circle cx="24" cy="24" r="24" fill="#25D366"/>
                  <path d="M24 11C17.373 11 12 16.373 12 23C12 25.387 12.676 27.617 13.84 29.514L12.07 36L18.74 34.262C20.568 35.35 22.71 36 25 36C31.627 36 37 30.627 37 24C37 17.373 31.627 12 25 12C24.665 12 24.332 12.013 24 12.04V11ZM24 13.04C24.332 13.013 24.665 13 25 13C30.514 13 35 17.486 35 23C35 28.514 30.514 33 25 33C22.919 33 20.99 32.371 19.38 31.29L19.02 31.06L15.1 32.06L16.12 28.24L15.87 27.86C14.693 26.163 14 24.163 14 22C14 16.486 18.486 12 24 12C24 12.347 24 12.693 24 13.04ZM19.5 17C19.223 17 18.795 17.1 18.438 17.5C18.08 17.9 17 18.87 17 20.844C17 22.817 18.469 24.726 18.656 24.969C18.844 25.213 21.437 29.375 25.5 31C26.567 31.43 27.393 31.687 28.031 31.875C29.101 32.19 30.073 32.147 30.844 32.031C31.701 31.902 33.27 31.031 33.594 30.063C33.918 29.094 33.918 28.268 33.813 28.094C33.707 27.92 33.469 27.813 33.094 27.625C32.719 27.437 30.744 26.462 30.406 26.344C30.069 26.225 29.832 26.157 29.563 26.5C29.293 26.843 28.512 27.813 28.281 28.063C28.051 28.313 27.812 28.344 27.438 28.156C27.063 27.969 25.858 27.564 24.438 26.313C23.327 25.332 22.568 24.12 22.344 23.75C22.12 23.38 22.32 23.176 22.5 23C22.663 22.838 22.875 22.563 23.063 22.344C23.25 22.125 23.313 21.969 23.438 21.719C23.563 21.469 23.5 21.25 23.406 21.063C23.313 20.875 22.568 18.906 22.25 18.063C21.955 17.267 21.65 17.293 21.438 17.281C21.22 17.27 20.984 17 20.719 17C20.22 17 19.777 17 19.5 17Z" fill="white"/>
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
