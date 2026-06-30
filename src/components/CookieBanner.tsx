"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { loadCrisp } from "@/lib/crisp";

const COOKIE_NAME = "audynia_consent";
const EXPIRES = 365;

type ConsentState = {
  crisp: boolean;
  meta: boolean;
};

function loadMetaPixel() {
  if (typeof window === "undefined") return;
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  if (!pixelId || (window as any).fbqLoaded) return;
  (window as any).fbqLoaded = true;
  const f = window as any;
  const b = document;
  const n = "script";
  if (f.fbq) return;
  const fbq: any = (f.fbq = function () {
    fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
  });
  if (!f._fbq) f._fbq = fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  const t = b.createElement(n) as HTMLScriptElement;
  t.async = true;
  t.src = "https://connect.facebook.net/en_US/fbevents.js";
  const s = b.getElementsByTagName(n)[0];
  s.parentNode!.insertBefore(t, s);
  fbq("set", "autoConfig", false, pixelId);
  fbq("init", pixelId);
  fbq("track", "PageView");
}

function activateServices(consent: ConsentState) {
  if (consent.crisp) loadCrisp();
  if (consent.meta) loadMetaPixel();
}

function getSavedConsent(): ConsentState | null {
  const raw = Cookies.get(COOKIE_NAME);
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
}

function saveConsent(consent: ConsentState) {
  Cookies.set(COOKIE_NAME, JSON.stringify(consent), { expires: EXPIRES, path: "/" });
}

export default function CookieBanner() {
  const pathname = usePathname();
  // Only show banner on the landing page (e.g. /de or /en)
  const isLandingPage = /^\/[a-z]{2}\/?$/.test(pathname ?? "");

  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [consent, setConsent] = useState<ConsentState>({ crisp: true, meta: false });

  useEffect(() => {
    const saved = getSavedConsent();
    if (saved) {
      activateServices(saved);
    } else if (isLandingPage) {
      setVisible(true);
    }
  }, [isLandingPage]);

  const acceptAll = () => {
    const c: ConsentState = { crisp: true, meta: true };
    saveConsent(c);
    activateServices(c);
    setVisible(false);
  };

  const declineAll = () => {
    const c: ConsentState = { crisp: false, meta: false };
    saveConsent(c);
    setVisible(false);
  };

  const saveCustom = () => {
    saveConsent(consent);
    activateServices(consent);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      <style>{`
        .cb-overlay {
          position: fixed; inset: 0; z-index: 9998;
          background: rgba(0,0,0,0.5);
          display: flex; align-items: flex-end; justify-content: center;
          padding: 24px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .cb-box {
          background: #181818; border: 1px solid #2a2a2a; border-radius: 16px;
          padding: 24px; width: 100%; max-width: 520px;
          box-shadow: 0 8px 60px rgba(0,0,0,0.7);
        }
        .cb-title { color: #fff; font-size: 16px; font-weight: 700; margin: 0 0 8px; }
        .cb-text { color: #888; font-size: 13px; line-height: 1.6; margin: 0 0 20px; }
        .cb-btn-accept {
          background: #1DB954; color: #000; border: none; cursor: pointer;
          padding: 11px 20px; border-radius: 500px; font-size: 14px; font-weight: 700;
          font-family: inherit; transition: opacity 0.15s; flex: 1;
        }
        .cb-btn-accept:hover { opacity: 0.85; }
        .cb-btn-outline {
          background: transparent; color: #ccc; border: 1px solid #333; cursor: pointer;
          padding: 11px 20px; border-radius: 500px; font-size: 14px; font-weight: 600;
          font-family: inherit; transition: color 0.15s, border-color 0.15s; flex: 1;
        }
        .cb-btn-outline:hover { color: #fff; border-color: #555; }
        .cb-btn-text {
          background: transparent; border: none; color: #555; font-size: 13px;
          cursor: pointer; font-family: inherit; padding: 0; text-decoration: underline;
          transition: color 0.15s;
        }
        .cb-btn-text:hover { color: #888; }
        .cb-toggle-row {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 14px 0; border-top: 1px solid #222;
        }
        .cb-toggle-label { color: #ccc; font-size: 13px; font-weight: 600; margin: 0 0 3px; }
        .cb-toggle-desc { color: #555; font-size: 12px; line-height: 1.5; margin: 0; max-width: 340px; }
        .cb-toggle {
          position: relative; width: 40px; height: 22px; flex-shrink: 0; margin-left: 16px; margin-top: 2px;
        }
        .cb-toggle input { opacity: 0; width: 0; height: 0; }
        .cb-slider {
          position: absolute; inset: 0; border-radius: 22px;
          background: #333; transition: background 0.2s; cursor: pointer;
        }
        .cb-slider:before {
          content: ""; position: absolute; width: 16px; height: 16px;
          left: 3px; bottom: 3px; background: #fff; border-radius: 50%;
          transition: transform 0.2s;
        }
        input:checked + .cb-slider { background: #1DB954; }
        input:checked + .cb-slider:before { transform: translateX(18px); }
        input:disabled + .cb-slider { opacity: 0.5; cursor: not-allowed; }
        .cb-badge {
          font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px;
          background: #252525; color: #555; text-transform: uppercase; letter-spacing: 0.06em;
          margin-left: 8px; vertical-align: middle;
        }
      `}</style>

      <div className="cb-overlay">
        <div className="cb-box">
          {!showDetails ? (
            <>
              <p className="cb-title">Deine Cookie-Einstellungen</p>
              <p className="cb-text">
                Wir verwenden technisch notwendige Cookies (Stripe, Paddle, PayPal) sowie optionale Cookies für Chat (Crisp) und Werbung (Meta Pixel). Du kannst frei wählen.{" "}
                <a href="/cookies" style={{ color: "#555", textDecoration: "underline" }}>Mehr erfahren</a>
              </p>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <button className="cb-btn-outline" onClick={declineAll}>Nur notwendige</button>
                <button className="cb-btn-accept" onClick={acceptAll}>Alle akzeptieren</button>
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="cb-btn-text" onClick={() => setShowDetails(true)}>
                  Einstellungen anpassen
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="cb-title">Einstellungen anpassen</p>

              {/* Technisch notwendig */}
              <div className="cb-toggle-row" style={{ borderTop: "none", paddingTop: 0 }}>
                <div>
                  <p className="cb-toggle-label">
                    Technisch notwendig
                    <span className="cb-badge">Immer aktiv</span>
                  </p>
                  <p className="cb-toggle-desc">Stripe, Paddle, PayPal — für Zahlungsabwicklung und Betrugsprävention. Kann nicht deaktiviert werden.</p>
                </div>
                <label className="cb-toggle">
                  <input type="checkbox" checked disabled />
                  <span className="cb-slider" />
                </label>
              </div>

              {/* Crisp */}
              <div className="cb-toggle-row">
                <div>
                  <p className="cb-toggle-label">Crisp Chat</p>
                  <p className="cb-toggle-desc">Live-Chat-Support. Ermöglicht dir direkt mit uns zu schreiben. Setzt Session-Cookies.</p>
                </div>
                <label className="cb-toggle">
                  <input
                    type="checkbox"
                    checked={consent.crisp}
                    onChange={e => setConsent(prev => ({ ...prev, crisp: e.target.checked }))}
                  />
                  <span className="cb-slider" />
                </label>
              </div>

              {/* Meta Pixel */}
              <div className="cb-toggle-row">
                <div>
                  <p className="cb-toggle-label">Meta Pixel</p>
                  <p className="cb-toggle-desc">Werbemessung auf Facebook und Instagram. Hilft uns relevante Werbung zu zeigen. Setzt Tracking-Cookies (_fbp, _fbc).</p>
                </div>
                <label className="cb-toggle">
                  <input
                    type="checkbox"
                    checked={consent.meta}
                    onChange={e => setConsent(prev => ({ ...prev, meta: e.target.checked }))}
                  />
                  <span className="cb-slider" />
                </label>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 20 }}>
                <button className="cb-btn-outline" onClick={() => setShowDetails(false)}>Zurück</button>
                <button className="cb-btn-accept" onClick={saveCustom}>Auswahl speichern</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
