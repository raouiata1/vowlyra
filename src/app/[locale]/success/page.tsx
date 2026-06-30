"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";

const TOTAL_SECONDS = 180; // 3 minutes

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
  const t = useTranslations("success");

  const STATUS_LABELS = [
    { until: 45,  text: t("status_lyrics") },
    { until: 90,  text: t("status_music") },
    { until: 135, text: t("status_mixing") },
    { until: 180, text: t("status_trailer") },
  ];

  const REVIEWS = (t.raw("reviews") as { name: string; occasion: string; text: string }[]);

  const [elapsed, setElapsed]             = useState(0);
  const [liveCount, setLiveCount]         = useState(getRandomCount());
  const [email, setEmail]                 = useState("");
  const [labelKey, setLabelKey]           = useState(0);
  const [reviewIndex, setReviewIndex]     = useState(0);
  const [reviewVisible, setReviewVisible] = useState(true);

  const [previewReady, setPreviewReady]   = useState(false);
  const [showConfetti, setShowConfetti]   = useState(false);
  const [fadingOut, setFadingOut]         = useState(false);
  const [videoLoaded, setVideoLoaded]     = useState(false);
  const redirectUrl                       = useRef<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Unmute via postMessage once iframe has loaded
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Give the player a moment to initialise, then unmute
    setTimeout(() => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "unMute", args: [] }), "*"
      );
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func: "setVolume", args: [100] }), "*"
      );
    }, 500);
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("vowlyra_email");
    if (stored) setEmail(stored);

    const params = new URLSearchParams(window.location.search);
    const oid = params.get("order_id") ?? "";

    const startTime = Date.now();
    const timer = setInterval(() => {
      const wallElapsed = Math.floor((Date.now() - startTime) / 1000);
      setElapsed(Math.min(wallElapsed, TOTAL_SECONDS));
    }, 1000);

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

    const reviewTimer = setInterval(() => {
      setReviewVisible(false);
      setTimeout(() => {
        setReviewIndex((i) => (i + 1) % REVIEWS.length);
        setReviewVisible(true);
      }, 400);
    }, 5000);

    let pollInterval: ReturnType<typeof setInterval>;
    let pollDelay: ReturnType<typeof setTimeout>;

    const doPoll = async () => {
      if (!oid) return;
      try {
        const res = await fetch(`/api/preview-status?order_id=${encodeURIComponent(oid)}`);
        const data = await res.json();
        if (data.ready && data.preview_url) {
          clearInterval(pollInterval);
          triggerTransition(data.preview_url);
        }
      } catch {
        // ignore, keep polling
      }
    };

    const startPolling = (intervalMs: number) => {
      clearInterval(pollInterval);
      doPoll(); // immediate check when starting
      pollInterval = setInterval(doPoll, intervalMs);
    };

    if (oid) {
      // Start polling after 1 minute (every 5s)
      pollDelay = setTimeout(() => startPolling(5000), 60000);

      // After 3 minutes: switch to faster polling every 2s
      setTimeout(() => startPolling(2000), TOTAL_SECONDS * 1000);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(counterTimeout);
      clearInterval(reviewTimer);
      clearTimeout(pollDelay);
      clearInterval(pollInterval);
    };
  }, []);

  function triggerTransition(url: string) {
    redirectUrl.current = url;
    setPreviewReady(true);
    // Bar animates to 100% over 1.5s, then confetti, then redirect
    setTimeout(() => setShowConfetti(true), 800);
    setTimeout(() => setFadingOut(true), 2200);
    setTimeout(() => { window.location.href = url; }, 2700);
  }

  const percent = previewReady ? 100 : Math.round((elapsed / TOTAL_SECONDS) * 100);
  const done         = elapsed >= TOTAL_SECONDS;
  const currentLabel = STATUS_LABELS.find((l) => elapsed < l.until)?.text ?? t("status_trailer");
  const review       = REVIEWS[reviewIndex];

  useEffect(() => { setLabelKey((k) => k + 1); }, [currentLabel, previewReady]);

  return (
    <>
    <div style={{ position: "fixed", inset: 0, background: "#fff", zIndex: 9999, opacity: fadingOut ? 1 : 0, pointerEvents: fadingOut ? "all" : "none", transition: "opacity 0.5s ease" }} />

    <div style={{ background: "#F5F5F7", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", transition: "opacity 0.3s ease", opacity: fadingOut ? 0 : 1 }}>
      <style>{`
        @keyframes checkIn { 0%{transform:scale(0)} 70%{transform:scale(1.1)} 100%{transform:scale(1)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes activePulse { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.5);opacity:0} }
        @keyframes progressShimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes confettiRise { 0%{transform:translateY(0) scale(1) rotate(0deg);opacity:1} 100%{transform:translateY(-80px) scale(0.4) rotate(45deg);opacity:0} }
        @keyframes readyPop { 0%{transform:scale(0.8);opacity:0} 60%{transform:scale(1.04)} 100%{transform:scale(1);opacity:1} }
        @keyframes dot1 { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
        @keyframes dot2 { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
        @keyframes dot3 { 0%,80%,100%{opacity:0.2;transform:scale(0.8)} 40%{opacity:1;transform:scale(1)} }
        @keyframes cb-spin { to { transform: rotate(360deg); } }
        .status-label{animation:fadeIn 0.5s ease forwards}
        .review-card{transition:opacity 0.4s ease}
        .progress-bar{background:linear-gradient(90deg,#1DB954,#25D366,#1DB954);background-size:200% auto;animation:progressShimmer 2s linear infinite}
        .ready-card{animation:readyPop 0.5s ease forwards}
        .confetti-dot{position:absolute;border-radius:50%;animation:confettiRise 1s ease-out forwards}
        .dot-1{animation:dot1 1.2s ease-in-out infinite}
        .dot-2{animation:dot2 1.2s ease-in-out 0.2s infinite}
        .dot-3{animation:dot3 1.2s ease-in-out 0.4s infinite}
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#F5F5F7", padding: "20px 24px", zIndex: 99, borderBottom: "0.5px solid #e0e0e0" }}>
        <a href="/" style={{ display: "inline-flex" }}>
          <Image src="/logo.png" width={120} height={38} alt="Audynia" style={{ objectFit: "contain" }} />
        </a>
      </div>

      {/* Page top padding = fixed header height (78px) */}
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "96px 24px 80px" }}>

        {/* Title */}
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1a1a1a", marginTop: 0, marginBottom: 8, textAlign: "center", lineHeight: 1.2, width: "100%", maxWidth: 640, ...fadeIn("0s") }}>
          {previewReady ? t("title_ready") : t("title_creating")}
        </h1>

        {/* Subtitle */}
        {!previewReady && (
          <p style={{ fontSize: 14, color: "#777", textAlign: "center", marginBottom: 20, marginTop: 0, maxWidth: 480, lineHeight: 1.6, ...fadeIn("0.05s") }}>
            Schau dir an, wie andere ihre Songs erlebt haben — deiner erscheint <strong style={{ color: "#1DB954" }}>automatisch hier</strong>, sobald er fertig ist.
          </p>
        )}

        {/* YouTube video — TOP */}
        <div style={{ width: "100%", maxWidth: 640, marginBottom: 24, ...fadeIn("0.1s") }}>
          <div style={{ position: "relative", width: "100%", paddingTop: "56.25%", borderRadius: 18, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.18)" }}>
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/6RbWFfsnI2s?autoplay=1&mute=1&loop=1&playlist=6RbWFfsnI2s&controls=1&modestbranding=1&rel=0&enablejsapi=1"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              onLoad={handleVideoLoad}
              style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: "100%", maxWidth: 640, marginBottom: 20, ...fadeIn("0.2s") }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div key={labelKey} className="status-label" style={{ fontSize: 13, color: "#1DB954", fontWeight: 600 }}>
              {previewReady ? t("status_ready") : currentLabel}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#1a1a1a" }}>{percent}%</div>
          </div>
          <div style={{ height: 10, background: "#e0e0e0", borderRadius: 500, overflow: "hidden" }}>
            <div className="progress-bar" style={{ height: "100%", width: `${percent}%`, borderRadius: 500, transition: previewReady ? "width 1.5s ease-in-out" : "width 1s linear" }} />
          </div>
          <p style={{ fontSize: 12, color: "#999", marginTop: 8, textAlign: "center" }}>
            {previewReady ? t("progress_redirect") : done ? t("progress_done") : t("progress_sub")}
          </p>
        </div>

        {/* Preview Skeleton — shows what's coming */}
        {!previewReady && (
          <div style={{ width: "100%", maxWidth: 640, marginBottom: 28, borderRadius: 20, background: "#111", padding: "28px 24px", boxShadow: "0 8px 40px rgba(0,0,0,0.22)", ...fadeIn("0.25s") }}>
            {/* Label */}
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(29,185,84,0.15)", color: "#1DB954", borderRadius: 500, padding: "5px 14px", fontSize: 12, fontWeight: 700 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#1DB954", display: "inline-block", animation: "activePulse 1.5s infinite" }} />
                Dein Song wird vorbereitet...
              </span>
            </div>

            {/* Track info */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
              <div style={{ width: 52, height: 52, borderRadius: 10, background: "#2a2a2a", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>Dein persönlicher Song</div>
                <div style={{ color: "#555", fontSize: 13, marginTop: 2 }}>Audynia · Vorschau</div>
              </div>
              <div style={{ background: "#1DB95430", color: "#1DB954", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700 }}>30s Preview</div>
            </div>

            {/* Waveform skeleton */}
            <div style={{ display: "flex", alignItems: "center", gap: 3, height: 36, marginBottom: 10 }}>
              {[18, 28, 20, 34, 24, 30, 18, 32, 26, 36, 22, 30, 18, 28, 24, 34, 20, 26].map((h, i) => (
                <div key={i} style={{ flex: 1, height: h, background: "#2a2a2a", borderRadius: 3 }} />
              ))}
            </div>
            <div style={{ height: 3, background: "#2a2a2a", borderRadius: 2, marginBottom: 6 }} />
            <div style={{ display: "flex", justifyContent: "space-between", color: "#444", fontSize: 11, marginBottom: 20 }}>
              <span>0:00</span><span>0:30</span>
            </div>

            {/* Controls skeleton */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 28, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2a2a2a" }} />
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: "#2a2a2a" }} />
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#2a2a2a" }} />
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "#222", marginBottom: 18 }} />

            {/* Info text */}
            <div style={{ textAlign: "center" }}>
              <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                Sobald dein Song fertig ist, wirst du <strong style={{ color: "#777" }}>automatisch weitergeleitet</strong> — kein Reload nötig. Bitte lass diesen Tab offen.
              </p>
            </div>
          </div>
        )}

        {/* Live Counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(29,185,84,0.1)", border: "0.5px solid #1DB954", borderRadius: 500, padding: "6px 14px", fontSize: 12, color: "#1a7a35", marginBottom: 28, ...fadeIn("0s") }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1DB954", display: "inline-block", animation: "activePulse 1.5s infinite" }} />
          {t("live_counter", { count: liveCount })}
        </div>

        {/* Checkmark */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {previewReady && <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", border: "3px solid #1DB954", animation: "activePulse 1s ease-out infinite" }} />}
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", animation: "checkIn 0.5s ease-out forwards", boxShadow: previewReady ? "0 0 32px rgba(29,185,84,0.6)" : "0 8px 24px rgba(29,185,84,0.3)", transition: "box-shadow 0.5s ease" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          {showConfetti && (
            <>
              <div className="confetti-dot" style={{ width: 10, height: 10, background: "#1DB954", left: -20, top: 10, animationDelay: "0s" }} />
              <div className="confetti-dot" style={{ width: 8, height: 8, background: "#25D366", left: 10, top: -15, animationDelay: "0.1s" }} />
              <div className="confetti-dot" style={{ width: 10, height: 10, background: "#81C784", right: -15, top: 5, animationDelay: "0.15s" }} />
              <div className="confetti-dot" style={{ width: 7, height: 7, background: "#1DB954", right: 5, top: -20, animationDelay: "0.05s" }} />
              <div className="confetti-dot" style={{ width: 9, height: 9, background: "#25D366", left: -10, top: -10, animationDelay: "0.2s" }} />
            </>
          )}
        </div>


        {/* Hint / Ready Card */}
        {previewReady ? (
          <div className="ready-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#1DB954", borderRadius: 14, padding: "16px 24px", marginTop: 16, maxWidth: 400, width: "100%" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#000" }}>{t("ready_card")}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div className="dot-1" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />
              <div className="dot-2" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />
              <div className="dot-3" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "1.5px solid #1DB954", borderRadius: 10, padding: "10px 16px", marginTop: 16, maxWidth: 400, width: "100%", ...fadeIn("0.3s") }}>
            <span style={{ fontSize: 18 }}>🎵</span>
            <p style={{ margin: 0, fontSize: 13, color: "#1a1a1a", lineHeight: 1.5 }}>
              <strong>{t("hint").split("—")[0].trim()}</strong> — {t("hint").split("—")[1]?.trim()}
            </p>
          </div>
        )}


        {/* Email Card */}
        {email && !previewReady && (
          <div style={{ background: "#fff", borderRadius: 12, padding: "14px 18px", marginTop: 20, maxWidth: 400, width: "100%", border: "0.5px solid #e0e0e0", display: "flex", alignItems: "center", gap: 12, ...fadeIn("0.7s") }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a1a1a" }}>{t("email_backup")}</div>
              <div style={{ fontSize: 12, color: "#777", marginTop: 1 }}>{email}</div>
            </div>
          </div>
        )}

        {/* Rotating Review */}
        {!previewReady && (
          <div className="review-card" style={{ opacity: reviewVisible ? 1 : 0, background: "#fff", borderRadius: 14, padding: "18px 20px", marginTop: 24, maxWidth: 400, width: "100%", border: "0.5px solid #e0e0e0", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", ...fadeIn("0.9s") }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#1a1a1a", lineHeight: 1.6, fontStyle: "italic" }}>
              "{review.text}"
            </p>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1DB95420", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1DB954" }}>
                {review.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>{review.name}</div>
                <div style={{ fontSize: 11, color: "#999" }}>{review.occasion}</div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {!previewReady && (
          <div style={{ width: "100%", maxWidth: 400, marginTop: 28, ...fadeIn("1s") }}>
            {[
              { active: true,  title: t("timeline_step1_title"), sub: t("timeline_step1_sub") },
              { active: false, title: t("timeline_step2_title"), sub: t("timeline_step2_sub") },
              { active: false, title: t("timeline_step3_title"), sub: t("timeline_step3_sub") },
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
        )}

      </div>
    </div>
    <Footer />
    </>
  );
}
