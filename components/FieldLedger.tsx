"use client";

/**
 * DESIGN INTENT:
 * Field Ledger — the interactive centerpiece of "Proven At Scale".
 * Not cards. Not a bento grid. A "national field ledger" with three
 * distinct zones, each carrying its own organic shape:
 *
 *   1. LIVE TELEMETRY TAPE — a single thin full-width band (NOT a card).
 *      Mono micro-label · ticking txns/sec counter (rAF, jitter-smoothed)
 *      · an inline mini-spark SVG · "Operational" pulse pill. Inspired by
 *      Stripe's live GDP counter (a one-line running figure, no chrome).
 *
 *   2. STANDING LEDGER — left column, vertical stack of deployment rows.
 *      Sibling rows DIM to ~40% on hover (Linear customers-page language);
 *      the focused row STANDS UP — lifts (-translate-y-2), and its inline
 *      detail panel grows open via grid-rows 0fr→1fr (no JS measurement).
 *      The blue left-edge bar reuses TheProof's scaleY indicator on dark.
 *      Content INSIDE the row: dossier header, count-up scale figure,
 *      scope, Newsreader editorial pull-quote (the sanctioned serif quote
 *      voice). No separate "detail stage" panel — the row IS its own page.
 *
 *   3. RATION LADDER — right column, a vertical stack of three oversized
 *      ratio counters (Linear "2.0× / 3.3× / 28%" vertical-ratio pattern,
 *      reformulated). Each counts up on selection/redraw, with a mono
 *      descriptor and a hairline rule between. NOT a 3-card grid — the
 *      ladder owns its vertical-band shape.
 *
 *   AUTO-ADVANCE every 5s; pause on any user interaction; resume after 9s
 *   idle. Reduced-motion: no rAF, no auto-advance, no count-up, static.
 *
 * Rule 2 (✓ discipline): the check glyph appears ONLY on the telemetry-
 * tape "Verified Record" badge (the sanctioned location). FieldLedger
 * emits no other checks.
 */

import { useEffect, useMemo, useRef, useState } from "react";

const EASE = "cubic-bezier(0.2,0.8,0.2,1)";
const GREEN = "#30A46C";

type Deployment = {
  code: string;
  sector: string;
  system: string;
  figure: string;
  unit: string;
  scope: string;
  year: string;
  quote: string;
  tps: number;
};

const DEPLOYMENTS: Deployment[] = [
  {
    code: "01/A",
    sector: "Digital Identity",
    system: "National ID & Authentication",
    figure: "1.3B+",
    unit: "identities",
    scope: "Live across all states & UTs · biometric + OTP fusion",
    year: "2023",
    quote:
      "A single identity fabric binding a billion people to the services they are owed.",
    tps: 1180,
  },
  {
    code: "02/A",
    sector: "Payments · UPI",
    system: "Unified Interoperable Payment",
    figure: "13B+",
    unit: "txns / month",
    scope: "Real-time cross-bank clearing · 24×7 settlement",
    year: "2024",
    quote: "Money moves at the speed of intent, not of bank hours.",
    tps: 4215,
  },
  {
    code: "03/A",
    sector: "Health Stack",
    system: "Unified Health Interface",
    figure: "30+ Cr",
    unit: "health records",
    scope: "Federated personal health registries · consent-gated",
    year: "2024",
    quote: "Every record belongs to the citizen — the system merely borrows it.",
    tps: 760,
  },
  {
    code: "04/A",
    sector: "Data Empowerment",
    system: "Consent-Based Data Sharing",
    figure: "4.5 Cr",
    unit: "consents / yr",
    scope: "Secure API gateway for financial data · revocable",
    year: "2025",
    quote: "Consent is the new currency — and it is always withdrawable.",
    tps: 540,
  },
];

/* ---------- Ration Ladder data (per-active-deployment ratios) ---------- */
/* Each ratio carries `count` (the integer that counts up) and `text`
   (the final rendered string). For non-integer figures (e.g. 99.999%)
   `count` is 0, meaning the figure renders statically without count-up. */
type Ratio = { count: number; text: string; descriptor: string; accent?: boolean };
const RATIOS_BY_SECTOR: Record<Deployment["sector"], Ratio[]> = {
  "Digital Identity": [
    { count: 10, text: "10×", descriptor: "Faster onboarding vs paper", accent: true },
    { count: 99, text: "99.999%", descriptor: "1st-time auth success" },
    { count: 0, text: "12 ppm", descriptor: "Auth failures per million" },
  ],
  "Payments · UPI": [
    { count: 38, text: "38×", descriptor: "Throughput vs peak 2020", accent: true },
    { count: 0, text: "99.999%", descriptor: "Settlement uptime" },
    { count: 4, text: "4 ppm", descriptor: "Disputed txns / million" },
  ],
  "Health Stack": [
    { count: 22, text: "22×", descriptor: "Records lookup speed", accent: true },
    { count: 100, text: "100%", descriptor: "Consent-gated access" },
    { count: 9, text: "9 ppm", descriptor: "Audit exceptions / million" },
  ],
  "Data Empowerment": [
    { count: 17, text: "17×", descriptor: "Consent issuance speed", accent: true },
    { count: 100, text: "100%", descriptor: "Revocable on demand" },
    { count: 0, text: "0 ppm", descriptor: "Undisclosed data flows" },
  ],
};

/* ---------- helpers ---------- */

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

function parseFigure(fig: string): { num: number; suffix: string } {
  const m = fig.match(/^([\d.]+)\s*(.*)$/);
  if (!m) return { num: 0, suffix: fig };
  return { num: parseFloat(m[1]), suffix: m[2] };
}

function formatNum(num: number, original: string): string {
  const ref = original.match(/^[\d.]+/)?.[0] ?? "";
  const decimals = ref.includes(".") ? ref.split(".")[1].length : 0;
  return num.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function useCountUp(target: number, kick: unknown, reduced: boolean, duration = 900) {
  const [val, setVal] = useState(0);
  const raf = useRef<number | null>(null);
  useEffect(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    if (reduced) { setVal(target); return; }
    const start = performance.now();
    setVal(target * 0.06);
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(target * eased);
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, reduced, kick, duration]);
  return val;
}

/* Tiny inline sparkline — deterministic waveform seeded by tps.
   No Math.random() — keeps SSR & client output identical (no hydration
   mismatch). 30 points, gentle summed-sine profile. */
function Sparkline({ tps }: { tps: number }) {
  const pts = useMemo(() => {
    const arr: number[] = [];
    const seed = tps;
    for (let i = 0; i < 30; i++) {
      const phase = (i / 30) * Math.PI * 2.6;
      const wave =
        Math.sin(phase) * tps * 0.16 +
        Math.sin(phase * 1.7 + 1.1) * tps * 0.08 +
        Math.cos(phase * 0.6) * tps * 0.05;
      arr.push(tps * (0.78 + wave / tps));
    }
    return arr;
  }, [tps]);
  const w = 220, h = 32, max = Math.max(...pts), min = Math.min(...pts);
  const d = pts
    .map((p, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((p - min) / Math.max(1, max - min)) * (h - 4) - 2;
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-8 w-[170px] sm:w-[220px]" aria-hidden="true">
      <path
        d={d}
        fill="none"
        stroke="rgba(62,99,221,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        className="fl-sparkline"
      />
    </svg>
  );
}

export default function FieldLedger() {
  const reduced = usePrefersReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const active = DEPLOYMENTS[activeIdx];
  const ratios = RATIOS_BY_SECTOR[active.sector];

  /* Live ticking throughput (Stripe-style). rAF, smoothed jitter; reduced = static. */
  const steadyTps = active.tps;
  const [liveTps, setLiveTps] = useState(steadyTps);
  const tpsRaf = useRef<number | null>(null);
  useEffect(() => {
    if (reduced) { setLiveTps(steadyTps); return; }
    let last = performance.now();
    const loop = (now: number) => {
      last = now;
      const jitter = steadyTps * (0.91 + Math.random() * 0.18);
      setLiveTps((prev) => prev + (jitter - prev) * 0.06);
      tpsRaf.current = requestAnimationFrame(loop);
    };
    tpsRaf.current = requestAnimationFrame(loop);
    return () => { if (tpsRaf.current) cancelAnimationFrame(tpsRaf.current); };
  }, [steadyTps, reduced]);

  /* Auto-advance 5s; pause on interaction; resume after 9s idle. */
  const resumeT = useRef<number | null>(null);
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % DEPLOYMENTS.length), 5000);
    return () => clearInterval(id);
  }, [reduced, paused]);

  const interact = (i: number) => {
    setPaused(true);
    setActiveIdx(i);
    if (resumeT.current) window.clearTimeout(resumeT.current);
    resumeT.current = window.setTimeout(() => setPaused(false), 9000);
  };

  const dim = hoveredIdx !== null;
  const { num, suffix } = useMemo(() => parseFigure(active.figure), [active]);
  const liveFig = useCountUp(num, active.code, reduced); /* kick on active.code */
  const liveFigStr = `${formatNum(liveFig, active.figure)}${suffix}`;

  return (
    <div className="overflow-hidden rounded-frame border border-white/10 bg-white/[0.025]">
      {/* ===== Telemetry tape — full-width thin band, NOT a card ===== */}
      <div className="fl-sheen relative flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-white/10 px-6 py-4 sm:px-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-eyebrow text-white/45">
            Network throughput
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-eyebrow text-white/25 sm:inline">
            {active.sector.replace(/&middot;|&times;|&mdash;/g, "")}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">
            {Math.round(liveTps).toLocaleString("en-US")}
          </span>
          <span className="text-xs font-medium text-white/55">txns / sec</span>
        </div>
        <div className="hidden md:block">
          <Sparkline tps={steadyTps} />
        </div>
        <div className="flex items-center gap-2">
          <span className={`flex items-center gap-2 rounded-btn border border-blue/30 bg-blue/[0.10] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-eyebrow text-blue`}>
            <span>&#10003;</span>
            <span>Verified Record</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className={`h-1.5 w-1.5 rounded-full ${reduced ? "" : "animate-[ps-pulse_2s_infinite]"}`}
              style={{ backgroundColor: GREEN }}
            />
            <span className="text-[11px] font-semibold uppercase tracking-eyebrow" style={{ color: GREEN }}>
              Operational
            </span>
          </span>
        </div>
      </div>

      {/* ===== Dual zone — Standing Ledger (8) · Ration Ladder (4) ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* ---------- Standing Ledger ---------- */}
        <div className="lg:col-span-8 lg:border-r lg:border-white/10">
          <ul role="tablist" aria-label="Live deployments">
            {DEPLOYMENTS.map((d, i) => {
              const isActive = i === activeIdx;
              const isHovered = i === hoveredIdx;
              const dimmed = dim && !isHovered && !isActive;
              return (
                <li
                  key={d.code}
                  role="none"
                  className="border-b border-white/10 last:border-b-0"
                >
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => interact(i)}
                    onMouseEnter={() => setHoveredIdx(i)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onFocus={() => { setPaused(true); setHoveredIdx(i); }}
                    onBlur={() => {
                      setHoveredIdx(null);
                      if (resumeT.current) window.clearTimeout(resumeT.current);
                      resumeT.current = window.setTimeout(() => setPaused(false), 1200);
                    }}
                    className="group relative block w-full px-6 py-5 text-left transition-all duration-500 ease-settle sm:px-8"
                    style={{
                      opacity: dimmed ? 0.4 : 1,
                      transform: isActive
                        ? "translateY(-2px)"
                        : isHovered
                          ? "translateY(-1px)"
                          : "translateY(0)",
                      backgroundColor: isActive
                        ? "rgba(62,99,221,0.08)"
                        : isHovered
                          ? "rgba(255,255,255,0.025)"
                          : "transparent",
                    }}
                  >
                    {/* Active left-edge accent bar — re-uses TheProof's scaleY language on dark */}
                    <span
                      className="pointer-events-none absolute left-0 top-0 w-[3px] bg-blue transition-transform duration-500 ease-settle"
                      style={{
                        height: "100%",
                        transform: isActive ? "scaleY(1)" : "scaleY(0)",
                        transformOrigin: "top",
                      }}
                    />

                    {/* Row header — always visible */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-3 sm:gap-4">
                        <span className="font-mono text-[11px] tabular-nums text-white/35">
                          {d.code}
                        </span>
                        <span className="text-[13px] font-semibold uppercase tracking-wide text-white/70 sm:text-sm">
                          {/* strip HTML entities for the header row label */}
                          {d.sector.replace(/&middot;|&times;|&mdash;/g, "·")}
                        </span>
                      </div>
                      <span className="flex items-center gap-1.5">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${reduced ? "" : "animate-[ps-pulse_2s_infinite]"}`}
                          style={{ backgroundColor: GREEN }}
                        />
                        <span
                          className="text-[11px] font-semibold uppercase tracking-eyebrow"
                          style={{ color: GREEN }}
                        >
                          Live
                        </span>
                      </span>
                    </div>

                    {/* System line — always visible */}
                    <div className="mt-1 text-sm text-white/55">{d.system}</div>

                    {/* Inline detail panel — grid-rows 0fr→1fr organic expand */}
                    <div
                      className="grid transition-[grid-template-rows] duration-500 ease-settle"
                      style={{
                        gridTemplateRows: isActive ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-12 sm:items-start">
                          {/* Big figure — left */}
                          <div className="sm:col-span-5">
                            <div className="flex items-baseline gap-2">
                              <span className="text-4xl font-semibold tabular-nums tracking-tightest text-white sm:text-[44px]">
                                {isActive ? liveFigStr : d.figure}
                              </span>
                              <span className="text-sm font-medium text-white/55">
                                {d.unit}
                              </span>
                            </div>
                            <div className="mt-2 font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
                              DOSSIER {d.code} &mdash; {d.year}
                            </div>
                          </div>

                          {/* Scope + quote — right */}
                          <div className="sm:col-span-7">
                            <p className="text-sm leading-relaxed text-white/60">
                              {d.scope}
                            </p>
                            <p className="mt-4 max-w-[26em] border-l-2 border-blue/50 pl-4 font-display text-lg italic leading-snug text-white/85 lg:text-xl">
                              {d.quote}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- Ration Ladder ---------- */}
        <aside
          className="bg-white/[0.015] px-6 py-7 sm:px-8 lg:col-span-4"
          aria-label="Field ratios"
        >
          <div className="mb-5 font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
            Field ratios &middot; {active.sector.replace(/&middot;|&times;|&mdash;/g, "")}
          </div>
          <ol className="flex flex-col">
            {ratios.map((r, i) => (
              <li
                key={`${active.code}-${r.descriptor}`}
                className={`fl-row-enter flex flex-col gap-1 py-4 ${i === 0 ? "pt-0" : ""} ${i === ratios.length - 1 ? "pb-0" : "border-b border-white/10"}`}
                style={{ animationDelay: `${120 + i * 90}ms` }}
              >
                <RatioRow r={r} kick={active.code} reduced={reduced} />
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}

function RatioRow({ r, kick, reduced }: { r: Ratio; kick: string; reduced: boolean }) {
  const v = useCountUp(r.count, kick, reduced, 1100);
  const display = Math.round(v).toString();
  const staticRender = r.count === 0;
  const suffixHtml = r.text.replace(/[0-9.]+/, "");
  return (
    <div className="flex items-baseline gap-3">
      {staticRender ? (
        <span
          className={`flex items-baseline text-[40px] font-semibold leading-none tracking-tightest tabular-nums ${r.accent ? "text-blue" : "text-white"} sm:text-[44px]`}
        >
          {r.text}
        </span>
      ) : (
        <span
          className={`flex items-baseline text-[40px] font-semibold leading-none tracking-tightest tabular-nums ${r.accent ? "text-blue" : "text-white"} sm:text-[44px]`}
        >
          {display}
          {suffixHtml && (
            <span className="ml-0.5 text-2xl font-semibold text-blue sm:text-3xl">
              {suffixHtml}
            </span>
          )}
        </span>
      )}
      <span className="text-xs leading-snug text-white/50 sm:text-[13px]">{r.descriptor}</span>
    </div>
  );
}