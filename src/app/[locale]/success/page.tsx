"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";

const TOTAL_SECONDS = 240; // 4 minutes

const STATUS_LABELS = [
  { until: 60,  text: "Lyrics werden generiert..." },
  { until: 120, text: "Musik wird komponiert..." },
  { until: 180, text: "Song wird gemischt..." },
  { until: 240, text: "Trailer wird vorbereitet..." },
];

const REVIEWS = [
  { name: "Sarah M.", anlass: "Hochzeit", text: "Wir haben beide geweint als wir den Song gehört haben. Einfach perfekt." },
  { name: "Jonas K.", anlass: "Geburtstag", text: "Meine Mutter war sprachlos. Der beste Geburtstagsgeschenk seit Jahren." },
  { name: "Lena & Tom", anlass: "Jahrestag", text: "Er hat unsere ganze Geschichte in 3 Minuten eingefangen. Unglaublich." },
  { name: "Markus R.", anlass: "Überraschung", text: "In 5 Minuten fertig und klingt wie ein echter Profi-Song. Mega!" },
  { name: "Julia W.", anlass: "Valentinstag", text: "Mein Freund hat es sofort auf repeat gehört. Danke Audynia!" },
];

function getRandomCount() {
  return Math.floor(Math.random() * 4) + 2;
}

function getNextCount(current: number): number {
  const delta = Math.random() < 0.5 ? -1 : 1;
  return Math.min(8, Math.max(2, current + delta));
}

function fadeIn(delay: string): React.CSSProperties {
  return { animation: "fadeUp 0.5s ease forwards", animationDelay: delay, opacity: 0 };
}

export default function SuccessPage() {
  const [elapsed, setElapsed]         = useState(0);
  const [liveCount, setLiveCount]     = useState(getRandomCount());
  const [email, setEmail]             = useState("");
  const [labelKey, setLabelKey]       = useState(0);
  const [orderId, setOrderId]         = useState("");
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewVisible, setReviewVisible] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("vowlyra_email");
    if (stored) setEmail(stored);

    const params = new URLSearchParams(window.location.search);
    const oid = params.get("order_id") ?? "";
    setOrderId(oid);

    const startTime = Date.now();
    const timer = setInterval(() => {
      const wallElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(Math.min(wallElapsed, TOTAL_SECONDS));
    }, 1000);

    // Live counter drift
    let counterTimeout: ReturnType<typeof setTimeout>;
    const scheduleNext = (current: number) => {
      const delay = 5000 + Math.random() * 5000;
      counterTimeout = setTimeout(() => {
        const next = getNextCount(current);
        setLiveCount(next);
        scheduleNext(next);
      }, delay);
    };
    scheduleNext(liveCount);

    // Rotate reviews every 5s with fade
    const reviewTimer = setInterval(() => {
      setReviewVisible(false);
      setTimeout(() => {
        setReviewIndex((i) => (i + 1) % REVIEWS.length);
        setReviewVisible(true);
      }, 400);
    }, 5000);

    // Poll for preview_url every 5 seconds
    let pollInterval: ReturnType<typeof setInterval>;
    if (oid) {
      pollInterval = setInterval(async () => {
        try {
          const res = await fetch(`/api/preview-status?order_id=${encodeURIComponent(oid)}`);
          const data = await res.json();
          if (data.ready && data.preview_url) {
            clearInterval(pollInterval);
            window.location.href = data.preview_url;
          }
        } catch {
          // ignore, keep polling
        }
      }, 5000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(counterTimeout);
      clearInterval(reviewTimer);
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  const percent      = Math.min(Math.round((elapsed / TOTAL_SECONDS) * 100), 99);
  const done         = elapsed >= TOTAL_SECONDS;
  const currentLabel = STATUS_LABELS.find((l) => elapsed < l.until)?.text ?? "Trailer wird vorbereitet...";
  const review       = REVIEWS[reviewIndex];

  useEffect(() => { setLabelKey((k) => k + 1); }, [currentLabel]);

  return (
    <>
    <div style={{ background: "#F5F5F7", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes checkIn {
          0%   { transform: scale(0); }
          70%  { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes activePulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50%       { transform: scale(1.5); opacity: 0; }
        }
        @keyframes progressShimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .status-label { animation: fadeIn 0.5s ease forwards; }
        .review-card  { transition: opacity 0.4s ease; }
        .progress-bar {
          background: linear-gradient(90deg, #1DB954, #25D366, #1DB954);
          background-size: 200% auto;
          animation: progressShimmer 2s linear infinite;
        }
      `}</style>

      {/* Header */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#F5F5F7", padding: "20px 24px", zIndex: 99, borderBottom: "0.5px solid #e0e0e0" }}>
        <Image src="/logo.png" width={120} height={38} alt="Audynia" style={{ objectFit: "contain" }} />
      </div>

      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 24px 80px" }}>

        {/* Live Counter Pill */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(29,185,84,0.1)", border: "0.5px solid #1DB954", borderRadius: 500, padding: "6px 14px", fontSize: 12, color: "#1a7a35", marginBottom: 28, ...fadeIn("0s") }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1DB954", display: "inline-block", animation: "activePulse 1.5s infinite" }} />
          {liveCount} Songs werden gerade erstellt
        </div>

        {/* Checkmark */}
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkIn 0.5s ease-out forwards", boxShadow: "0 8px 24px rgba(29,185,84,0.3)" }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#1a1a1a", marginTop: 20, marginBottom: 0, textAlign: "center", lineHeight: 1.2, ...fadeIn("0.2s") }}>
          Dein Song wird erstellt
        </h1>

        {/* Auto-redirect hint — KEY MESSAGE */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #1DB954", borderRadius: 10, padding: "10px 16px", marginTop: 16, maxWidth: 400, width: "100%", ...fadeIn("0.3s") }}>
          <span style={{ fontSize: 18 }}>🎵</span>
          <p style={{ margin: 0, fontSize: 13, color: "#1a1a1a", lineHeight: 1.5 }}>
            <strong>Diese Seite öffnet deinen Song automatisch</strong> — kein Tab schließen, einfach warten.
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", maxWidth: 400, marginTop: 32, ...fadeIn("0.5s") }}>

          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div key={labelKey} className="status-label" style={{ fontSize: 13, color: "#1DB954", fontWeight: 600 }}>
              {done ? "Gleich geht's los!" : currentLabel}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1a" }}>
              {done ? "99%" : `${percent}%`}
            </div>
          </div>

          {/* Bar track */}
          <div style={{ height: 10, background: "#e0e0e0", borderRadius: 500, overflow: "hidden" }}>
            <div
              className="progress-bar"
              style={{
                height: "100%",
                width: `${done ? 99 : percent}%`,
                borderRadius: 500,
                transition: "width 1s linear",
              }}
            />
          </div>

          {/* Sub text */}
          <p style={{ fontSize: 12, color: "#999", marginTop: 8, textAlign: "center" }}>
            {done ? "Dein Trailer ist fast fertig..." : "Wir geben unser Bestes für deinen Song"}
          </p>
        </div>

        {/* Email Card */}
        {email && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", marginTop: 20, maxWidth: 400, width: "100%", border: "0.5px solid #e0e0e0", display: "flex", alignItems: "center", gap: 12, ...fadeIn("0.7s") }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>Backup per E-Mail</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 1 }}>{email}</div>
            </div>
          </div>
        )}

        {/* Rotating Review */}
        <div
          className="review-card"
          style={{ opacity: reviewVisible ? 1 : 0, background: "#fff", borderRadius: 14, padding: "18px 20px", marginTop: 24, maxWidth: 400, width: "100%", border: "0.5px solid #e0e0e0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", ...fadeIn("0.9s") }}
        >
          {/* Stars */}
          <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            ))}
          </div>
          {/* Quote */}
          <p style={{ margin: 0, fontSize: 14, color: "#1a1a1a", lineHeight: 1.6, fontStyle: "italic" }}>
            "{review.text}"
          </p>
          {/* Author */}
          <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1DB95420", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1DB954" }}>
              {review.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{review.name}</div>
              <div style={{ fontSize: 11, color: "#999" }}>{review.anlass}</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div style={{ width: "100%", maxWidth: 400, marginTop: 28, ...fadeIn("1s") }}>
          {[
            { active: true,  title: "Trailer wird erstellt",  sub: "Öffnet sich hier automatisch" },
            { active: false, title: "Trailer anhören",         sub: "Kostenlos & unverbindlich" },
            { active: false, title: "Song freischalten",       sub: "Nur wenn du begeistert bist · 29,99€" },
          ].map((step, i) => (
            <div key={i} style={{ display: "flex", gap: 16 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ position: "relative", width: 24, height: 24, borderRadius: "50%", background: step.active ? "#1DB954" : "#ddd", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {step.active && <span style={{ position: "absolute", width: 24, height: 24, borderRadius: "50%", background: "#1DB954", animation: "activePulse 1.5s infinite" }} />}
                  {step.active ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#bbb" }} />
                  )}
                </div>
                {i < 2 && <div style={{ width: 2, flex: 1, background: "#ddd", minHeight: 32, margin: "4px 0" }} />}
              </div>
              <div style={{ paddingBottom: i < 2 ? 28 : 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: step.active ? "#1a1a1a" : "#aaa" }}>{step.title}</div>
                <div style={{ fontSize: 13, color: step.active ? "#1DB954" : "#bbb", marginTop: 2, fontWeight: step.active ? 600 : 400 }}>{step.sub}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
}
