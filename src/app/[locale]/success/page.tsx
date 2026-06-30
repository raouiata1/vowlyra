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
  const [isMuted, setIsMuted]             = useState(true);
  const redirectUrl                       = useRef<string>("");
  const videoRef                          = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // Try to autoplay with sound — browser allows it if user interacted before (wizard/payment)
  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = false;
    vid.play().then(() => {
      setIsMuted(false);
    }).catch(() => {
      // Browser blocked unmuted autoplay — fall back to muted
      vid.muted = true;
      vid.play().catch(() => {});
      setIsMuted(true);
    });
  }, []);

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
    <div style={{ position: "fixed", inset: 0, background: "#121212", zIndex: 9999, opacity: fadingOut ? 1 : 0, pointerEvents: fadingOut ? "all" : "none", transition: "opacity 0.5s ease" }} />

    <div style={{ background: "#121212", minHeight: "100vh", fontFamily: "system-ui, -apple-system, sans-serif", transition: "opacity 0.3s ease", opacity: fadingOut ? 0 : 1 }}>
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
        @keyframes skeletonPulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes vinylSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes ringPulse {
          0%   { stroke-dashoffset: 283; opacity: 0.3; }
          50%  { stroke-dashoffset: 70;  opacity: 1; }
          100% { stroke-dashoffset: 283; opacity: 0.3; }
        }
        @keyframes pillVibrate {
          0%,14%,100% { transform: translateX(0); }
          2%  { transform: translateX(-3px); }
          4%  { transform: translateX(3px); }
          6%  { transform: translateX(-3px); }
          8%  { transform: translateX(3px); }
          10% { transform: translateX(-2px); }
          12% { transform: translateX(2px); }
        }
        @keyframes pillGlow {
          0%,100% { box-shadow: 0 0 0 0 rgba(29,185,84,0); }
          50%     { box-shadow: 0 0 16px 4px rgba(29,185,84,0.25); }
        }
        .status-label{animation:fadeIn 0.5s ease forwards}
        .review-card{transition:opacity 0.4s ease}
        .progress-bar{background:linear-gradient(90deg,#1DB954,#25D366,#1DB954);background-size:200% auto;animation:progressShimmer 2s linear infinite}
        .ready-card{animation:readyPop 0.5s ease forwards}
        .confetti-dot{position:absolute;border-radius:50%;animation:confettiRise 1s ease-out forwards}
        .dot-1{animation:dot1 1.2s ease-in-out infinite}
        .dot-2{animation:dot2 1.2s ease-in-out 0.2s infinite}
        .dot-3{animation:dot3 1.2s ease-in-out 0.4s infinite}
        .skeleton-pulse{animation:skeletonPulse 1.8s ease-in-out infinite}
        .pill-vibrate { animation: pillVibrate 3.5s ease-in-out infinite, pillGlow 3.5s ease-in-out infinite; }
        @media (max-width: 767px) {
          .success-wrap { padding: 76px 16px 60px !important; }
          .success-h1 { font-size: 20px !important; margin-bottom: 6px !important; }
          .success-subtitle { display: none !important; }
          .success-video-wrap { margin-bottom: 10px !important; }
          .success-video-el { height: 160px !important; }
          .success-progress { margin-bottom: 12px !important; }
          .success-pill { font-size: 11px !important; padding: 6px 14px !important; }
          .success-player { padding: 16px !important; margin-bottom: 16px !important; }
          .success-track-title { font-size: 14px !important; }
          .success-track-sub { font-size: 12px !important; }
          .success-vinyl { width: 44px !important; height: 44px !important; }
          .success-vinyl svg { width: 44px !important; height: 44px !important; }
          .success-waveform { height: 32px !important; margin-bottom: 10px !important; }
          .success-controls { gap: 20px !important; }
          .success-play-btn { width: 44px !important; height: 44px !important; }
        }
      `}</style>

      <div style={{ position: "fixed", top: 0, left: 0, right: 0, background: "#121212", padding: "16px 24px", zIndex: 99, borderBottom: "1px solid #1e1e1e" }}>
        <a href="/" style={{ display: "inline-flex" }}>
          <Image src="/logo-secondary.png" width={130} height={38} alt="Audynia" style={{ objectFit: "contain" }} />
        </a>
      </div>

      {/* Page top padding = fixed header height (78px) */}
      <div className="success-wrap" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "96px 24px 80px" }}>

        {/* Title */}
        <h1 className="success-h1" style={{ fontSize: 30, fontWeight: 800, color: "#fff", marginTop: 0, marginBottom: 8, textAlign: "center", lineHeight: 1.2, width: "100%", maxWidth: 640, ...fadeIn("0s") }}>
          {previewReady ? t("title_ready") : t("title_creating")}
        </h1>

        {/* Subtitle — hidden on mobile */}
        {!previewReady && (
          <p className="success-subtitle" style={{ fontSize: 15, color: "#666", textAlign: "center", marginBottom: 20, marginTop: 0, maxWidth: 520, lineHeight: 1.7, ...fadeIn("0.05s") }}>
            Unsere KI komponiert gerade deinen persönlichen Song. Das dauert ca. <strong style={{ color: "#fff" }}>3–5 Minuten</strong>. Der Player unten aktiviert sich <strong style={{ color: "#1DB954" }}>automatisch</strong> — bitte lass diesen Tab offen.
          </p>
        )}

        {/* Progress Bar — vor dem Video */}
        <div className="success-progress" style={{ width: "100%", maxWidth: 640, marginBottom: 20, ...fadeIn("0.1s") }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div key={labelKey} className="status-label" style={{ fontSize: 13, color: "#1DB954", fontWeight: 600 }}>
              {previewReady ? t("status_ready") : currentLabel}
            </div>
            <div style={{ fontSize: 13, fontWeight: 800, color: "#fff" }}>{percent}%</div>
          </div>
          <div style={{ height: 8, background: "#2a2a2a", borderRadius: 500, overflow: "hidden" }}>
            <div className="progress-bar" style={{ height: "100%", width: `${percent}%`, borderRadius: 500, transition: previewReady ? "width 1.5s ease-in-out" : "width 1s linear" }} />
          </div>
          <p style={{ fontSize: 12, color: "#555", marginTop: 8, textAlign: "center" }}>
            {previewReady ? t("progress_redirect") : done ? t("progress_done") : t("progress_sub")}
          </p>
        </div>

        {/* UGC Video — Kundenstimme während Song lädt */}
        <div className="success-video-wrap" style={{ width: "100%", maxWidth: 640, marginBottom: 16, ...fadeIn("0.2s") }}>
          <div style={{ borderRadius: 14, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.5)", background: "#000", position: "relative" }}>
            {/* Badge */}
            <div style={{ position: "absolute", top: 10, left: 12, zIndex: 3, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)", borderRadius: 500, padding: "3px 10px", fontSize: 11, color: "#fff", fontWeight: 600 }}>
              ★★★★★ Echte Kundenstimme
            </div>
            {/* Mute/Unmute button — centered overlay when muted, small corner when unmuted */}
            {isMuted ? (
              <button
                onClick={toggleMute}
                style={{ position: "absolute", inset: 0, zIndex: 3, background: "rgba(0,0,0,0.45)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, border: "none", cursor: "pointer", width: "100%", height: "100%" }}
              >
                <div style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.35)", borderRadius: 500, padding: "10px 22px", display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#fff", fontWeight: 700 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                  Ton an — tippe zum Abspielen
                </div>
              </button>
            ) : (
              <button
                onClick={toggleMute}
                style={{ position: "absolute", bottom: 10, right: 12, zIndex: 3, background: "rgba(29,185,84,0.85)", backdropFilter: "blur(6px)", border: "1px solid #1DB954", borderRadius: 500, padding: "5px 12px", fontSize: 12, color: "#fff", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                </svg>
                Ton aus
              </button>
            )}
            <video
              ref={videoRef}
              src="https://media.vowlyra.com/ugc_1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="success-video-el"
              style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
            />
          </div>
        </div>

        {/* Player Card — exact copy from song page, skeleton state while loading */}
        {!previewReady && (
          <div style={{ width: "100%", maxWidth: 640, marginBottom: 28, ...fadeIn("0.25s") }}>

            {/* Loading pill — vibriert um Aufmerksamkeit zu ziehen */}
            <div style={{ textAlign: "center", marginBottom: 12 }}>
              <span className="pill-vibrate success-pill" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(29,185,84,0.15)", color: "#1DB954", borderRadius: 500, padding: "8px 20px", fontSize: 13, fontWeight: 700, border: "1px solid rgba(29,185,84,0.3)", cursor: "default" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#1DB954", display: "inline-block", flexShrink: 0, animation: "activePulse 1.2s infinite" }} />
                🎵 Dein Song wird gerade erstellt — erscheint hier automatisch
              </span>
            </div>

            {/* Player card — identical structure to song page */}
            <div className="success-player" style={{ background: "#181818", border: "1px solid #282828", borderRadius: 20, padding: "28px 28px 24px", textAlign: "left" }}>

              {/* Track header */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>

                {/* Vinyl with spinning animation + Suno-style loading ring */}
                <div className="success-vinyl" style={{ position: "relative", width: 60, height: 60, flexShrink: 0 }}>
                  {/* Spinning loading ring (SVG) */}
                  <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                    <circle cx="30" cy="30" r="28" fill="none" stroke="#1DB954" strokeWidth="2.5" strokeDasharray="176" strokeDashoffset="176" strokeLinecap="round"
                      style={{ animation: "ringPulse 2s ease-in-out infinite", transformOrigin: "center", transform: "rotate(-90deg)" }}
                    />
                  </svg>
                  {/* Spinning Vinyl image */}
                  <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", position: "relative", animation: "vinylSpin 3s linear infinite" }}>
                    <Image src="/Vynil.jpg" alt="Vinyl" fill style={{ objectFit: "cover" }} sizes="60px" />
                  </div>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="success-track-title" style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>Dein persönlicher Song</div>
                  <div className="success-track-sub" style={{ color: "#777", fontSize: 13, marginTop: 3 }}>Audynia · wird erstellt...</div>
                </div>
                <div style={{ background: "#1DB95415", color: "#1DB954", borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 600, flexShrink: 0, border: "1px solid #1DB95430" }}>
                  30s Preview
                </div>
              </div>

              {/* Waveform skeleton */}
              <div className="success-waveform" style={{ display: "flex", alignItems: "center", gap: 3, height: 44, marginBottom: 14 }}>
                {[18, 30, 22, 38, 26, 32, 20, 36, 28, 40, 24, 34, 18, 30, 26, 38, 22, 28].map((h, i) => (
                  <div key={i} className="skeleton-pulse" style={{ flex: 1, height: h, background: "#333", borderRadius: 3, animationDelay: `${i * 0.05}s` }} />
                ))}
              </div>

              {/* Progress bar skeleton */}
              <div style={{ height: 4, background: "#333", borderRadius: 2, marginBottom: 8 }} />
              <div style={{ display: "flex", justifyContent: "space-between", color: "#555", fontSize: 12, marginBottom: 22 }}>
                <span>0:00</span><span>0:30</span>
              </div>

              {/* Controls — exact icons from song page, greyed out */}
              <div className="success-controls" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 32 }}>
                {/* Skip back */}
                <div style={{ color: "#444", padding: 8, display: "flex", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="19 20 9 12 19 4 19 20"/><line x1="5" y1="19" x2="5" y2="5"/>
                  </svg>
                </div>
                {/* Play button */}
                <div className="success-play-btn" style={{ width: 56, height: 56, borderRadius: "50%", background: "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#444" style={{ marginLeft: 2 }}>
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
                {/* Skip forward */}
                <div style={{ color: "#444", padding: 8, display: "flex", alignItems: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Live Counter */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(29,185,84,0.08)", border: "0.5px solid rgba(29,185,84,0.3)", borderRadius: 500, padding: "6px 14px", fontSize: 12, color: "#1DB954", marginBottom: 28, ...fadeIn("0s") }}>
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
          <div className="ready-card" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, background: "#1DB954", borderRadius: 14, padding: "16px 24px", marginTop: 16, maxWidth: 580, width: "100%" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#000" }}>{t("ready_card")}</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div className="dot-1" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />
              <div className="dot-2" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />
              <div className="dot-3" style={{ width: 8, height: 8, borderRadius: "50%", background: "rgba(0,0,0,0.5)" }} />
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#1a1a1a", border: "1px solid #1DB95440", borderRadius: 10, padding: "10px 16px", marginTop: 16, maxWidth: 580, width: "100%", ...fadeIn("0.3s") }}>
            <span style={{ fontSize: 18 }}>🎵</span>
            <p style={{ margin: 0, fontSize: 13, color: "#aaa", lineHeight: 1.5 }}>
              <strong style={{ color: "#fff" }}>{t("hint").split("—")[0].trim()}</strong> — {t("hint").split("—")[1]?.trim()}
            </p>
          </div>
        )}

        {/* Email Card */}
        {email && !previewReady && (
          <div style={{ background: "#1a1a1a", borderRadius: 12, padding: "14px 18px", marginTop: 20, maxWidth: 580, width: "100%", border: "0.5px solid #2a2a2a", display: "flex", alignItems: "center", gap: 12, ...fadeIn("0.7s") }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1DB954" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{t("email_backup")}</div>
              <div style={{ fontSize: 12, color: "#666", marginTop: 1 }}>{email}</div>
            </div>
          </div>
        )}

        {/* Rotating Review */}
        {!previewReady && (
          <div className="review-card" style={{ opacity: reviewVisible ? 1 : 0, background: "#181818", borderRadius: 14, padding: "18px 20px", marginTop: 24, maxWidth: 580, width: "100%", border: "0.5px solid #2a2a2a", ...fadeIn("0.9s") }}>
            <div style={{ display: "flex", gap: 2, marginBottom: 10 }}>
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              ))}
            </div>
            <p style={{ margin: 0, fontSize: 14, color: "#ccc", lineHeight: 1.6, fontStyle: "italic" }}>
              "{review.text}"
            </p>
            <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1DB95420", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#1DB954" }}>
                {review.name[0]}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{review.name}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{review.occasion}</div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {!previewReady && (
          <div style={{ width: "100%", maxWidth: 580, marginTop: 28, ...fadeIn("1s") }}>
            {[
              { active: true,  title: t("timeline_step1_title"), sub: t("timeline_step1_sub") },
              { active: false, title: t("timeline_step2_title"), sub: t("timeline_step2_sub") },
              { active: false, title: t("timeline_step3_title"), sub: t("timeline_step3_sub") },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ position: "relative", width: 24, height: 24, borderRadius: "50%", background: step.active ? "#1DB954" : "#2a2a2a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {step.active && <span style={{ position: "absolute", width: 24, height: 24, borderRadius: "50%", background: "#1DB954", animation: "activePulse 1.5s infinite" }} />}
                    {step.active ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ position: "relative", zIndex: 1 }}>
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3a3a3a" }} />
                    )}
                  </div>
                  {i < 2 && <div style={{ width: 2, flex: 1, background: "#2a2a2a", minHeight: 32, margin: "4px 0" }} />}
                </div>
                <div style={{ paddingBottom: i < 2 ? 28 : 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: step.active ? "#fff" : "#444" }}>{step.title}</div>
                  <div style={{ fontSize: 13, color: step.active ? "#1DB954" : "#333", marginTop: 2, fontWeight: step.active ? 600 : 400 }}>{step.sub}</div>
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
