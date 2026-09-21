import React, { useState, useRef, useEffect, useCallback } from "react";

/**
 * ResuScore — resume scanning & scoring interface
 * -------------------------------------------------
 * Drop this file into any React project (Vite, CRA, Next.js client component, etc).
 * No external UI libraries required — icons are inline SVG, styling is a single
 * injected <style> tag, fonts are pulled from Google Fonts at runtime.
 *
 * Usage:
 *   import ResuScoreApp from "./ResuScoreApp";
 *   export default function App() { return <ResuScoreApp />; }
 */

/* ---------------------------------- Icons --------------------------------- */
/* Minimal 1.5px-stroke line icons, no external icon library needed. */

const IconUpload = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 15V4M12 4L7.5 8.5M12 4l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconFile = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
);

const IconTarget = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);

const IconShield = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" strokeLinejoin="round" />
    <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconLayers = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 3l8 4.5-8 4.5-8-4.5L12 3Z" strokeLinejoin="round" />
    <path d="M4 12l8 4.5 8-4.5" strokeLinejoin="round" />
    <path d="M4 16.5L12 21l8-4.5" strokeLinejoin="round" />
  </svg>
);

const IconHash = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M5 9h14M5 15h14M10 4l-2 16M16 4l-2 16" strokeLinecap="round" />
  </svg>
);

const IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M5 6h14M12 6v14M9 20h6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSpark = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" strokeLinecap="round" />
  </svg>
);

const IconX = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

/* ------------------------------- Mock scoring ------------------------------ */

const CATEGORY_DEFS = [
  {
    key: "impact",
    label: "Impact & achievements",
    icon: IconTarget,
    low: "Add numbers to your bullet points — teams led, revenue moved, time saved.",
  },
  {
    key: "ats",
    label: "ATS compatibility",
    icon: IconShield,
    low: "Simplify tables and columns so tracking systems can parse every line.",
  },
  {
    key: "structure",
    label: "Formatting & structure",
    icon: IconLayers,
    low: "Tighten section order and keep heading styles consistent throughout.",
  },
  {
    key: "keywords",
    label: "Keyword relevance",
    icon: IconHash,
    low: "Mirror the language from your target job postings more closely.",
  },
  {
    key: "clarity",
    label: "Clarity & concision",
    icon: IconType,
    low: "Cut filler phrases — lead each line with the verb and the result.",
  },
];

// Deterministic pseudo-random score generator seeded by file name + size,
// so the same file always yields the same read-out.
function seededScores(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const rand = () => {
    h = (h * 1664525 + 1013904223) >>> 0;
    return h / 4294967296;
  };
  const categories = CATEGORY_DEFS.map((def) => ({
    ...def,
    score: Math.round(58 + rand() * 38),
  }));
  const overall = Math.round(
    categories.reduce((sum, c) => sum + c.score, 0) / categories.length
  );
  return { overall, categories };
}

function scoreTier(score) {
  if (score >= 85) return { label: "Strong", color: "var(--accent-cyan)" };
  if (score >= 70) return { label: "Solid", color: "var(--accent-violet)" };
  if (score >= 55) return { label: "Needs work", color: "var(--accent-amber)" };
  return { label: "At risk", color: "var(--accent-coral)" };
}

/* --------------------------------- Gauge ---------------------------------- */

function ScoreGauge({ value, animate }) {
  const radius = 84;
  const circumference = 2 * Math.PI * radius;
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!animate) {
      setDisplay(0);
      return;
    }
    let raf;
    const start = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animate, value]);

  const offset = circumference * (1 - display / 100);
  const tier = scoreTier(value);

  return (
    <div className="gauge">
      <svg viewBox="0 0 200 200" className="gauge-svg">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent-cyan)" />
            <stop offset="100%" stopColor="var(--accent-violet)" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={radius} className="gauge-track" />
        <circle
          cx="100"
          cy="100"
          r={radius}
          className="gauge-fill"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: animate ? offset : circumference,
          }}
        />
      </svg>
      <div className="gauge-readout">
        <span className="gauge-number">{animate ? display : "—"}</span>
        <span className="gauge-unit">/ 100</span>
        {animate && (
          <span className="gauge-tier" style={{ color: tier.color }}>
            {tier.label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------- Main component ---------------------------- */

export default function ResuScoreApp() {
  const [fileName, setFileName] = useState(null);
  const [fileMeta, setFileMeta] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | ready | scanning | done
  const [dragOver, setDragOver] = useState(false);
  const [report, setReport] = useState(null);
  const inputRef = useRef(null);
  const scanTimeout = useRef(null);

  // Inject Google Fonts once on mount.
  useEffect(() => {
    if (document.getElementById("resuscore-fonts")) return;
    const link = document.createElement("link");
    link.id = "resuscore-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => () => clearTimeout(scanTimeout.current), []);

  const handleFile = useCallback((file) => {
    if (!file) return;
    setFileName(file.name);
    setFileMeta({
      size: file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(1, Math.round(file.size / 1024))} KB`,
    });
    setStatus("ready");
    setReport(null);
  }, []);

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      handleFile(file);
    },
    [handleFile]
  );

  const analyze = useCallback(() => {
    if (!fileName) return;
    setStatus("scanning");
    scanTimeout.current = setTimeout(() => {
      setReport(seededScores(fileName + (fileMeta?.size || "")));
      setStatus("done");
    }, 1900);
  }, [fileName, fileMeta]);

  const reset = useCallback(() => {
    clearTimeout(scanTimeout.current);
    setFileName(null);
    setFileMeta(null);
    setStatus("idle");
    setReport(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const lowestCategory =
    report && [...report.categories].sort((a, b) => a.score - b.score)[0];

  return (
    <div className="rs-root">
      <style>{CSS}</style>

      <div className="rs-shell">
        <header className="rs-header">
          <div className="rs-brand">
            <span className="rs-brand-mark" />
            <span className="rs-brand-name">ResuScore</span>
          </div>
          <div className={`rs-status-pill rs-status-${status}`}>
            <span className="rs-status-dot" />
            {status === "idle" && "Awaiting resume"}
            {status === "ready" && "Ready to scan"}
            {status === "scanning" && "Scanning…"}
            {status === "done" && "Scan complete"}
          </div>
        </header>

        <main className="rs-grid">
          {/* ---------------- Left: upload panel ---------------- */}
          <section className="rs-panel rs-upload-panel">
            <h1 className="rs-title">
              See your resume
              <br />
              the way a system does.
            </h1>
            <p className="rs-subtitle">
              Upload a resume to run a structural, keyword, and readability
              scan. 
            </p>

            <div
              className={`rs-dropzone ${dragOver ? "is-drag" : ""} ${
                fileName ? "has-file" : ""
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
              }}
            >
              <input
                ref={inputRef}
                type="file"
                hidden
                accept=".pdf,.doc,.docx,.txt"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              {!fileName ? (
                <>
                  <IconUpload className="rs-dropzone-icon" />
                  <p className="rs-dropzone-title">Drop resume here</p>
                  <p className="rs-dropzone-sub">or click to browse · PDF, DOC, DOCX, TXT</p>
                </>
              ) : (
                <div className="rs-file-row">
                  <IconFile className="rs-file-icon" />
                  <div className="rs-file-info">
                    <p className="rs-file-name">{fileName}</p>
                    <p className="rs-file-meta">{fileMeta?.size}</p>
                  </div>
                  <button
                    className="rs-file-clear"
                    onClick={(e) => {
                      e.stopPropagation();
                      reset();
                    }}
                    aria-label="Remove file"
                  >
                    <IconX />
                  </button>
                </div>
              )}
            </div>

            <button
              className="rs-analyze-btn"
              disabled={!fileName || status === "scanning"}
              onClick={analyze}
            >
              {status === "scanning" ? "Scanning resume…" : "Analyze resume"}
            </button>

            {status === "done" && (
              <button className="rs-reset-link" onClick={reset}>
                Scan a different file
              </button>
            )}
          </section>

          {/* ---------------- Right: results ---------------- */}
          <section className="rs-panel rs-results-panel">
            <div className={`rs-scanline-wrap ${status === "scanning" ? "is-scanning" : ""}`}>
              <ScoreGauge value={report?.overall ?? 0} animate={status === "done"} />
              {status === "scanning" && <div className="rs-scanline" />}
              {status !== "done" && status !== "scanning" && (
                <p className="rs-gauge-hint">Your score will appear here</p>
              )}
              {status === "scanning" && (
                <p className="rs-gauge-hint rs-gauge-hint-active">
                  Reading structure, keywords, and phrasing…
                </p>
              )}
            </div>

            <div className="rs-categories">
              {(report ? report.categories : CATEGORY_DEFS).map((cat, i) => {
                const Icon = cat.icon;
                const score = report ? cat.score : 0;
                return (
                  <div className="rs-cat-row" key={cat.key} style={{ "--i": i }}>
                    <Icon className="rs-cat-icon" />
                    <div className="rs-cat-main">
                      <div className="rs-cat-top">
                        <span className="rs-cat-label">{cat.label}</span>
                        <span className="rs-cat-score">
                          {report ? score : "–"}
                        </span>
                      </div>
                      <div className="rs-bar-track">
                        <div
                          className="rs-bar-fill"
                          style={{
                            width: status === "done" ? `${score}%` : "0%",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {status === "done" && lowestCategory && (
              <div className="rs-suggestion">
                <IconSpark className="rs-suggestion-icon" />
                <div>
                  <p className="rs-suggestion-label">
                    Highest-leverage fix — {lowestCategory.label.toLowerCase()}
                  </p>
                  <p className="rs-suggestion-body">{lowestCategory.low}</p>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

/* ---------------------------------- CSS ------------------------------------ */

const CSS = `
:root {
  --bg-void: #070a12;
  --bg-panel: #0d121e;
  --bg-panel-raised: #131a2a;
  --border: #202b42;
  --border-soft: #182034;
  --text-primary: #eaf1fb;
  --text-secondary: #8d97ae;
  --accent-cyan: #46f0d2;
  --accent-violet: #8b7cff;
  --accent-amber: #ffb84d;
  --accent-coral: #ff6b6b;
}

.rs-root {
  min-height: 100vh;
  background:
    radial-gradient(1200px 600px at 15% -10%, rgba(139,124,255,0.10), transparent 60%),
    radial-gradient(900px 500px at 100% 10%, rgba(70,240,210,0.08), transparent 55%),
    var(--bg-void);
  color: var(--text-primary);
  font-family: "Inter", system-ui, sans-serif;
  padding: 48px 24px 80px;
  box-sizing: border-box;
}
.rs-root *, .rs-root *::before, .rs-root *::after { box-sizing: border-box; }

.rs-shell { max-width: 1080px; margin: 0 auto; }

.rs-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 40px;
}
.rs-brand { display: flex; align-items: center; gap: 10px; }
.rs-brand-mark {
  width: 10px; height: 10px; border-radius: 2px;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
  transform: rotate(45deg);
}
.rs-brand-name {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: 0.01em;
}

.rs-status-pill {
  display: flex; align-items: center; gap: 8px;
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  background: var(--bg-panel);
  padding: 7px 14px 7px 10px;
  border-radius: 999px;
}
.rs-status-dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--text-secondary);
}
.rs-status-ready .rs-status-dot { background: var(--accent-violet); }
.rs-status-scanning .rs-status-dot {
  background: var(--accent-cyan);
  animation: rs-pulse 0.9s ease-in-out infinite;
}
.rs-status-done .rs-status-dot { background: var(--accent-cyan); }
@keyframes rs-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(1.4); }
}

.rs-grid {
  display: grid;
  grid-template-columns: minmax(280px, 400px) 1fr;
  gap: 20px;
  align-items: start;
}
@media (max-width: 780px) {
  .rs-grid { grid-template-columns: 1fr; }
}

.rs-panel {
  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
}

.rs-title {
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
  font-size: 28px;
  line-height: 1.2;
  margin: 0 0 14px;
  letter-spacing: -0.01em;
}

.rs-subtitle {
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin: 0 0 28px;
  max-width: 42ch;
}

.rs-dropzone {
  border: 1px dashed var(--border);
  border-radius: 12px;
  padding: 32px 20px;
  text-align: center;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
  background: var(--bg-panel-raised);
}
.rs-dropzone:hover { border-color: var(--accent-violet); }
.rs-dropzone.is-drag {
  border-color: var(--accent-cyan);
  background: rgba(70, 240, 210, 0.05);
}
.rs-dropzone.has-file {
  text-align: left;
  cursor: default;
  padding: 16px 18px;
}

.rs-dropzone-icon {
  width: 28px; height: 28px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}
.rs-dropzone-title {
  font-size: 14px;
  font-weight: 500;
  margin: 0 0 4px;
}
.rs-dropzone-sub {
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0;
  font-family: "JetBrains Mono", monospace;
}

.rs-file-row { display: flex; align-items: center; gap: 12px; }
.rs-file-icon { width: 22px; height: 22px; color: var(--accent-cyan); flex-shrink: 0; }
.rs-file-info { flex: 1; min-width: 0; }
.rs-file-name {
  font-size: 13px; font-weight: 500; margin: 0;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.rs-file-meta {
  font-size: 11px; color: var(--text-secondary); margin: 2px 0 0;
  font-family: "JetBrains Mono", monospace;
}
.rs-file-clear {
  background: none; border: none; color: var(--text-secondary);
  cursor: pointer; padding: 4px; border-radius: 6px; flex-shrink: 0;
  display: flex; align-items: center;
}
.rs-file-clear:hover { color: var(--text-primary); background: var(--border-soft); }
.rs-file-clear svg { width: 16px; height: 16px; }

.rs-analyze-btn {
  width: 100%;
  margin-top: 20px;
  padding: 13px 20px;
  border-radius: 10px;
  border: none;
  background: linear-gradient(135deg, var(--accent-cyan), var(--accent-violet));
  color: #06090f;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.12s ease, opacity 0.12s ease, box-shadow 0.15s ease;
  box-shadow: 0 0 0 rgba(70, 240, 210, 0);
}
.rs-analyze-btn:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 24px -8px rgba(70, 240, 210, 0.45);
}
.rs-analyze-btn:disabled { opacity: 0.35; cursor: not-allowed; }

.rs-reset-link {
  display: block;
  margin: 14px auto 0;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}
.rs-reset-link:hover { color: var(--text-primary); }

/* ---------------- Results panel ---------------- */

.rs-scanline-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 0 28px;
  overflow: hidden;
  border-radius: 12px;
}

.gauge { position: relative; width: 200px; height: 200px; }
.gauge-svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.gauge-track {
  fill: none;
  stroke: var(--border-soft);
  stroke-width: 10;
}
.gauge-fill {
  fill: none;
  stroke: url(#gaugeGrad);
  stroke-width: 10;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1);
}
.gauge-readout {
  position: absolute; inset: 0;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 2px;
}
.gauge-number {
  font-family: "JetBrains Mono", monospace;
  font-size: 42px;
  font-weight: 500;
  line-height: 1;
}
.gauge-unit {
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: var(--text-secondary);
}
.gauge-tier {
  margin-top: 8px;
  font-family: "Space Grotesk", sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.rs-gauge-hint {
  margin-top: 16px;
  font-size: 12px;
  color: var(--text-secondary);
  font-family: "JetBrains Mono", monospace;
}
.rs-gauge-hint-active { color: var(--accent-cyan); }

.rs-scanline {
  position: absolute;
  left: 6%;
  right: 6%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-cyan), transparent);
  filter: drop-shadow(0 0 6px rgba(70,240,210,0.7));
  animation: rs-scan 1.9s ease-in-out infinite;
}
@keyframes rs-scan {
  0% { top: 8%; opacity: 0; }
  10% { opacity: 1; }
  50% { top: 88%; opacity: 1; }
  90% { opacity: 1; }
  100% { top: 92%; opacity: 0; }
}

.rs-categories {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 4px;
}
.rs-cat-row {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}
.rs-cat-icon {
  width: 18px; height: 18px;
  color: var(--text-secondary);
  margin-top: 3px;
  flex-shrink: 0;
}
.rs-cat-main { flex: 1; min-width: 0; }
.rs-cat-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}
.rs-cat-label { font-size: 13px; color: var(--text-primary); }
.rs-cat-score {
  font-family: "JetBrains Mono", monospace;
  font-size: 12px;
  color: var(--text-secondary);
}
.rs-bar-track {
  height: 6px;
  border-radius: 999px;
  background: var(--border-soft);
  overflow: hidden;
}
.rs-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--accent-violet), var(--accent-cyan));
  transition: width 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i) * 70ms);
}

.rs-suggestion {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--bg-panel-raised);
}
.rs-suggestion-icon {
  width: 18px; height: 18px;
  color: var(--accent-amber);
  flex-shrink: 0;
  margin-top: 2px;
}
.rs-suggestion-label {
  font-size: 12px;
  font-weight: 600;
  margin: 0 0 4px;
  font-family: "Space Grotesk", sans-serif;
  color: var(--accent-amber);
}
.rs-suggestion-body {
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  color: var(--text-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .rs-status-scanning .rs-status-dot,
  .rs-scanline,
  .rs-analyze-btn,
  .gauge-fill,
  .rs-bar-fill {
    animation: none !important;
    transition: none !important;
  }
}
`;
