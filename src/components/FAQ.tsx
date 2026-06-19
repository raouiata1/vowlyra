"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

export default function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const items = t.raw("items") as Array<{ q: string; a: string; link_label?: string; link_href?: string }>;

  return (
    <section id="faq" className="faq-section" style={{ background: "#CCCCCC", padding: "80px 40px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-block", background: "#1a1a1a", color: "#1DB954", border: "1.5px solid #1DB954", borderRadius: 500, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>
            {t("pill")}
          </div>
          <h2 className="section-h2" style={{ fontSize: 40, fontWeight: 800, color: "#1a1a1a", letterSpacing: "-1px", margin: 0 }}>
            {t("title")}
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} style={{ background: "#fff", border: "1.5px solid #1DB954", borderRadius: 14, overflow: "hidden" }}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "20px 24px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", fontFamily: "system-ui, -apple-system, sans-serif" }}>{faq.q}</span>
                  <span style={{ fontSize: 18, color: "#999", flexShrink: 0, transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s ease", display: "inline-block" }}>+</span>
                </button>
                <div style={{ maxHeight: isOpen ? 300 : 0, overflow: "hidden", transition: "max-height 0.3s ease" }}>
                  <div style={{ padding: "0 24px 20px" }}>
                    <p style={{ margin: 0, marginBottom: faq.link_label ? 10 : 0, fontSize: 14, color: "#555", lineHeight: 1.7, fontFamily: "system-ui, -apple-system, sans-serif" }}>{faq.a}</p>
                    {faq.link_label && (
                      <a href={faq.link_href} style={{ color: "#1DB954", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{faq.link_label}</a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
