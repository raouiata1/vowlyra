import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{ background: "#CCCCCC", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        .ft-wrap { max-width: 1100px; margin: 0 auto; padding: 64px 40px 40px; }
        .ft-grid {
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.4fr;
          gap: 48px;
          margin-bottom: 48px;
        }
        .ft-heading {
          color: #1a1a1a;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.2px;
          margin: 0 0 16px 0;
        }
        .ft-link {
          color: #555;
          text-decoration: none;
          font-size: 14px;
          line-height: 2;
          display: block;
          transition: color 0.15s;
        }
        .ft-link:hover { color: #1a1a1a; }
        .ft-wa-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #fff;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          padding: 10px 18px 10px 12px;
          border-radius: 500px;
          transition: opacity 0.15s;
          margin-top: 4px;
        }
        .ft-wa-btn:hover { opacity: 0.88; }
        .ft-divider {
          border: none;
          border-top: 0.5px solid #b0b0b0;
          margin: 0 0 20px 0;
        }
        .ft-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }
        @media (max-width: 767px) {
          .ft-wrap { padding: 48px 20px 32px; }
          .ft-grid { grid-template-columns: 1fr; gap: 32px; }
        }
        @media (min-width: 768px) and (max-width: 960px) {
          .ft-grid { grid-template-columns: 1fr 1fr; }
          .ft-col-logo { grid-column: 1 / -1; }
        }
      `}</style>

      <div className="ft-wrap">
        <div className="ft-grid">

          {/* Col 1 – Logo & Tagline */}
          <div className="ft-col-logo">
            <a href="/" style={{ display: "inline-block", marginBottom: 14 }}>
              <Image
                src="https://media.audynia.com/Primary_Logo_with_Icon.png"
                width={130}
                height={34}
                alt="Audynia"
                style={{ objectFit: "contain" }}
              />
            </a>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.7, margin: 0, maxWidth: 280 }}>
              Personalisierte Songs für jeden besonderen Moment.
            </p>
          </div>

          {/* Col 2 – Produkt */}
          <div>
            <p className="ft-heading">Produkt</p>
            {[
              { label: "Song erstellen", href: "/order" },
              { label: "Demo anhören", href: "#demo" },
              { label: "Preise", href: "#preise" },
              { label: "FAQ", href: "#faq" },
            ].map((l) => (
              <a key={l.label} href={l.href} className="ft-link">{l.label}</a>
            ))}
          </div>

          {/* Col 3 – Kontakt */}
          <div>
            <p className="ft-heading">Kontakt</p>
            <p style={{ color: "#555", fontSize: 14, margin: "0 0 16px 0", lineHeight: 1.6 }}>
              Fragen? Schreib uns direkt.
            </p>
            <a
              href="https://wa.me/WHATSAPP_NUMBER"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-wa-btn"
            >
              {/* Official WhatsApp icon, viewBox 0 0 24 24 */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  fill="white"
                />
              </svg>
              WhatsApp schreiben
            </a>
          </div>

        </div>

        <hr className="ft-divider" />

        <div className="ft-bottom">
          <span style={{ color: "#777", fontSize: 12 }}>
            © 2026 Audynia. Alle Rechte vorbehalten.
          </span>
        </div>
      </div>
    </footer>
  );
}
