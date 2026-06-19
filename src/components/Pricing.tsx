"use client";

import Link from "next/link";
import { useState } from "react";
import { useMetaEvent } from "@/hooks/useMetaEvent";
import { useTranslations, useLocale } from "next-intl";

export default function Pricing() {
  const t = useTranslations("pricing");
  const locale = useLocale();
  const [hovered, setHovered] = useState<"standard" | "express" | null>(null);
  const { sendEvent } = useMetaEvent();

  const standardFeatures = t.raw("standard_features") as string[];
  const expressFeatures = t.raw("express_features") as string[];

  return (
    <section id="preise" className="pricing-section" style={{ background: "#CCCCCC", padding: "80px 40px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-block", background: "#1a1a1a", color: "#1DB954", border: "1.5px solid #1DB954", borderRadius: 500, padding: "6px 16px", fontSize: 13, fontWeight: 700, marginBottom: 12 }}>
            {t("pill")}
          </div>
          <h2 className="section-h2" style={{ fontSize: 40, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", margin: 0 }}>
            {t("title")}
          </h2>
        </div>

        <div className="pricing-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingTop: 14 }}>

          {/* Standard Card */}
          <div className="pricing-standard" onMouseEnter={() => setHovered("standard")} onMouseLeave={() => setHovered(null)}
            style={{ position: "relative", background: "#fff", border: "2px solid #1DB954", borderRadius: 18, padding: "40px 32px 28px", display: "flex", flexDirection: "column", boxShadow: hovered === "standard" ? "0 20px 52px rgba(29,185,84,0.22)" : "0 6px 28px rgba(29,185,84,0.12)", transform: hovered === "standard" ? "translateY(-6px)" : "none", transition: "transform 0.22s, box-shadow 0.22s", cursor: "default" }}
          >
            <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#1DB954", color: "#000", fontSize: 11, fontWeight: 800, letterSpacing: "0.07em", textTransform: "uppercase", padding: "5px 20px", borderRadius: 500, whiteSpace: "nowrap" }}>
              {t("badge")}
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>{t("standard_name")}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 46, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-2px", lineHeight: 1 }}>{t("standard_price")}</span>
              <span style={{ fontSize: 15, color: "#ccc", textDecoration: "line-through", fontWeight: 400 }}>{t("standard_old_price")}</span>
            </div>
            <div style={{ fontSize: 13, color: "#1DB954", fontWeight: 600, marginBottom: 6 }}>{t("standard_save")}</div>
            <div style={{ fontSize: 13, color: "#bbb", marginBottom: 26 }}>{t("standard_billing")}</div>
            <div style={{ height: 1, background: "#f0f0f0", marginBottom: 24 }} />
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {standardFeatures.map((f) => (
                <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#333", lineHeight: 1.45 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="8" fill="#1DB95418"/><path d="M4.5 8l2.5 2.5 4.5-5" stroke="#1DB954" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/order`} onClick={() => sendEvent({ eventName: "InitiateCheckout", customData: { content_name: "Standard", value: 29.99, currency: "EUR" } })}
              style={{ display: "block", textAlign: "center", background: "#1a1a1a", color: "#fff", borderRadius: 500, padding: "16px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none", boxSizing: "border-box", transition: "background 0.18s, color 0.18s", letterSpacing: "-0.2px" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#1DB954"; e.currentTarget.style.color = "#000"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#1a1a1a"; e.currentTarget.style.color = "#fff"; }}
            >{t("standard_cta")}</Link>
            <div style={{ color: "#c0c0c0", fontSize: 12, textAlign: "center", marginTop: 10 }}>{t("standard_note")}</div>
          </div>

          {/* Express Card */}
          <div className="pricing-express" onMouseEnter={() => setHovered("express")} onMouseLeave={() => setHovered(null)}
            style={{ background: "#1a1a1a", border: "1.5px solid #272727", borderRadius: 18, padding: "40px 32px 28px", display: "flex", flexDirection: "column", boxShadow: hovered === "express" ? "0 20px 52px rgba(0,0,0,0.32)" : "0 4px 20px rgba(0,0,0,0.16)", transform: hovered === "express" ? "translateY(-6px)" : "none", transition: "transform 0.22s, box-shadow 0.22s", cursor: "default" }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 18 }}>{t("express_name")}</div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: 46, fontWeight: 800, color: "#fff", letterSpacing: "-2px", lineHeight: 1 }}>{t("express_price")}</span>
              <span style={{ fontSize: 15, color: "#3a3a3a", textDecoration: "line-through", fontWeight: 400 }}>{t("express_old_price")}</span>
            </div>
            <div style={{ fontSize: 13, color: "#1DB954", fontWeight: 600, marginBottom: 6 }}>{t("express_save")}</div>
            <div style={{ fontSize: 13, color: "#555", marginBottom: 26 }}>{t("express_billing")}</div>
            <div style={{ height: 1, background: "#252525", marginBottom: 24 }} />
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
              {expressFeatures.map((f) => (
                <li key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "#ccc", lineHeight: 1.45 }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: 1 }}><circle cx="8" cy="8" r="8" fill="#1DB95420"/><path d="M4.5 8l2.5 2.5 4.5-5" stroke="#1DB954" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  {f}
                </li>
              ))}
            </ul>
            <Link href={`/${locale}/order`} onClick={() => sendEvent({ eventName: "InitiateCheckout", customData: { content_name: "Express", value: 34.99, currency: "EUR" } })}
              style={{ display: "block", textAlign: "center", background: "#1DB954", color: "#000", borderRadius: 500, padding: "16px 24px", fontSize: 15, fontWeight: 700, textDecoration: "none", boxSizing: "border-box", transition: "opacity 0.18s, transform 0.18s", letterSpacing: "-0.2px" }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.86"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
            >{t("express_cta")}</Link>
            <div style={{ color: "#444", fontSize: 12, textAlign: "center", marginTop: 10 }}>{t("express_note")}</div>
          </div>
        </div>

        <style>{`@media (max-width: 767px) { .pricing-grid-2 { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </section>
  );
}
