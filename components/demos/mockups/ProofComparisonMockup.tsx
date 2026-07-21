"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Renders the before/after drag-slider mockup for TheProof: a scattered
 * many-to-many "tool sprawl" diagram (before) vs. a hub-and-spoke diagram
 * centred on the DHIRA mark (after). All node positions and labels are
 * hand-placed for visual storytelling, not driven by real data.
 *
 * NOTE on the chip icons: DynamicSketchIcon looks its `text` up as an EXACT
 * key in its ICONS map and silently returns a generic square-with-slash on a
 * miss. Ten of the eleven chips here were passing invented strings ("Akashic
 * AI", "Legacy Mainframe", …) and all rendered that same fallback glyph —
 * fixed 21 Jul. Every `text` below must match a key in
 * components/icons/DynamicSketchIcon.tsx verbatim; check the render, because
 * a typo does not throw. Do not use "AI Readiness Audit" — its glyph contains
 * a checkmark, and §7 Rule 2 keeps checkmarks out of the shipped site.
 */

import React from "react";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import DhiraLogo from "@/components/icons/DhiraLogo";

const curve = (ax: number, ay: number, bx: number, by: number, bend: number) => {
  const mx = (ax + bx) / 2, my = (ay + by) / 2;
  const dx = bx - ax, dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len, ny = dx / len;
  const cx = mx + nx * bend, cy = my + ny * bend;
  return `M ${ax} ${ay} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${bx} ${by}`;
};

// After: hub-and-spoke from centre
const CX = 550, CY = 372;
const afterPts = [
  [550, 130], [858, 245], [858, 500], [550, 600], [242, 500], [242, 245],
];
const afterConns = afterPts.map((p, i) => ({
  d: curve(CX, CY, p[0], p[1], (i % 2 ? 1 : -1) * 30),
}));

// Before: many-to-many tool connections — more pairs than original to show sprawl
const beforePairs = [
  [176, 200, 480, 300], [480, 300, 810, 430], [385, 452, 660, 190], [660, 190, 900, 210],
  [760, 290, 250, 548], [480, 300, 560, 470], [330, 360, 810, 430], [690, 560, 760, 290],
  [176, 200, 330, 360], [150, 400, 385, 452], [810, 430, 560, 470],
  [176, 200, 660, 190], [480, 300, 250, 548], [660, 190, 810, 430], [385, 452, 560, 470],
  [150, 400, 560, 470], [900, 210, 760, 290],
];
const warmNodes = new Set(["330,360", "150,400", "660,190"]);
const beforeConns = beforePairs.map((p, i) => {
  const warm = warmNodes.has(`${p[0]},${p[1]}`) || warmNodes.has(`${p[2]},${p[3]}`);
  return {
    d: curve(p[0], p[1], p[2], p[3], (i % 2 ? 1 : -1) * (38 + (i % 3) * 12)),
    stroke: warm ? "#f59e0b" : "#8E8F91",
    dash: i % 3 === 0 ? "3 7" : "0",
  };
});

interface ProofComparisonMockupProps {
  pos: number;
  width: number;
  /** Toggle-driven move: ease the wipe instead of tracking a pointer 1:1. */
  glide?: boolean;
  /** Show the "See the change" onboarding pill (until the reader has used either control). */
  showHint?: boolean;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>;
}

export default function ProofComparisonMockup({ pos, width, glide = false, showHint = true, onKeyDown }: ProofComparisonMockupProps) {
  // While dragging every layer must sit exactly under the pointer, so the
  // transition is switched off rather than shortened. Before this, the section
  // background eased over 75ms while the mockup layer had no transition at
  // all — the two halves of the same wipe drifted apart mid-drag.
  const ease = glide ? "duration-650 ease-settle" : "duration-0";
  return (
    <div className="absolute inset-0 w-full h-full">

      {/* ════════ AFTER layer (base) — one platform ════════ */}
      <div className="absolute inset-0 bg-white" style={{ background: "radial-gradient(125% 100% at 50% 42%, #FFFFFF 0%, #F8F9FA 55%, #EEF0F2 100%)" }}>
        <svg viewBox="0 0 1100 660" className="absolute inset-0 block w-full h-full preserveAspectRatio-none">
          <defs>
            <linearGradient id="afterStroke" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#3E63DD" stopOpacity="0.85" />
              <stop offset="1" stopColor="#3E63DD" stopOpacity="0.25" />
            </linearGradient>
            <filter id="glowA" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" />
            </filter>
            <radialGradient id="coreHalo" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#3E63DD" stopOpacity="0.10" />
              <stop offset="0.55" stopColor="#3E63DD" stopOpacity="0.02" />
              <stop offset="1" stopColor="#3E63DD" stopOpacity="0" />
            </radialGradient>
            <pattern id="dotsA" width="26" height="26" patternUnits="userSpaceOnUse">
              <circle cx="1.3" cy="1.3" r="1.3" fill="#3E63DD" fillOpacity="0.06" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="1100" height="660" fill="url(#dotsA)" />
          <ellipse cx="550" cy="372" rx="330" ry="262" fill="url(#coreHalo)" />
          <circle cx="550" cy="372" r="150" fill="none" stroke="#3E63DD" strokeOpacity="0.1" strokeWidth="1.2" strokeDasharray="1.5 8" />
          <circle cx="550" cy="372" r="262" fill="none" stroke="#3E63DD" strokeOpacity="0.08" strokeWidth="1.2" strokeDasharray="1.5 8" />
          <g filter="url(#glowA)" stroke="#3E63DD" strokeOpacity="0.1" strokeWidth="6" fill="none" strokeLinecap="round">
            {afterConns.map((c, i) => <path key={i} d={c.d} />)}
          </g>
          <g stroke="url(#afterStroke)" strokeWidth="1.7" fill="none" strokeLinecap="round">
            {afterConns.map((c, i) => <path key={i} d={c.d} />)}
          </g>
        </svg>

        {/* After wordmark */}
        <div className="absolute top-[6%] left-1/2 w-1/2 pl-6 md:pl-8 flex items-center gap-3 pointer-events-none">
          <span className="text-[15px] md:text-[22px] font-semibold tracking-[0.16em] uppercase text-blue whitespace-nowrap">
            After DHIRA
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue shadow-[0_0_0_4px_rgba(62,99,221,0.15)]" />
        </div>

        {/* ── After cards: platform value + ROI story ── */}
        {/* Top centre — speed */}
        <div className="absolute left-[50%] top-[19.7%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-[ps-float_5s_ease-in-out_infinite] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-blue-border rounded-outer shadow-card whitespace-nowrap">
            <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-blue-subtle text-blue">
              <DynamicSketchIcon text="Platform Deployment" className="w-4 h-4" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">Weeks to go-live, not months</span>
          </div>
        </div>

        {/* Right upper — data pipelines */}
        <div className="absolute left-[78%] top-[37.1%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-[ps-float_4s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-blue-border rounded-outer shadow-card whitespace-nowrap">
            <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-blue-subtle text-blue">
              <DynamicSketchIcon text="Akashic Data Pipelines" className="w-4 h-4" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">Live data. No manual steps.</span>
          </div>
        </div>

        {/* Right lower — AI */}
        <div className="absolute left-[78%] top-[75.8%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-[ps-float_6s_ease-in-out_infinite_1.5s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-blue-border rounded-outer shadow-card whitespace-nowrap">
            <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-blue-subtle text-blue">
              <DynamicSketchIcon text="Akashic Machine Learning" className="w-4 h-4" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">AI-native from day one</span>
          </div>
        </div>

        {/* Bottom centre — accountability */}
        <div className="absolute left-[50%] top-[90.9%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-[ps-float_4.5s_ease-in-out_infinite_0.8s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-blue-border rounded-outer shadow-card whitespace-nowrap">
            <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-blue-subtle text-blue">
              <DynamicSketchIcon text="Access Control" className="w-4 h-4" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">One contract. Full accountability.</span>
          </div>
        </div>

        {/* Left lower — automation */}
        <div className="absolute left-[22%] top-[75.8%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-[ps-float_5.5s_ease-in-out_infinite_2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-blue-border rounded-outer shadow-card whitespace-nowrap">
            <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-blue-subtle text-blue">
              <DynamicSketchIcon text="Akashic Workflow" className="w-4 h-4" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">Zero manual reconciliation</span>
          </div>
        </div>

        {/* Left upper — platform unity */}
        <div className="absolute left-[22%] top-[37.1%] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-[ps-float_4.2s_ease-in-out_infinite_0.2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-blue-border rounded-outer shadow-card whitespace-nowrap">
            <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-blue-subtle text-blue">
              <DynamicSketchIcon text="Sovereign Blueprint" className="w-4 h-4" />
            </span>
            <span className="text-[13px] font-medium tracking-[-0.01em] text-ink">1 platform. Everything covered.</span>
          </div>
        </div>

        {/* Akashic core hub */}
        <div className="absolute left-1/2 top-[56.4%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
          <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] flex items-center justify-center">
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-blue/20 animate-[proofCorePulse_3.2s_ease-out_infinite] pointer-events-none" />
            <div
              className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
              style={{
                background: "radial-gradient(135% 135% at 32% 24%, #FFFFFF 0%, #F5F7FF 52%, #DCE5FE 100%)",
                boxShadow: "inset 0 2px 5px rgba(255,255,255,0.8), inset 0 -8px 16px rgba(11,20,64,0.05), 0 0 0 8px rgba(255,255,255,0.4), 0 18px 38px -12px rgba(11,20,64,0.2)",
              }}
            >
              <span className="absolute left-[18%] top-[12%] w-[54%] h-[42%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.8),rgba(255,255,255,0))] pointer-events-none" />
              <DhiraLogo className="relative w-12 h-12 text-ink" />
            </div>
          </div>
        </div>
      </div>

      {/* ════════ BEFORE layer (clipped) — gloomy desaturated tool sprawl ════════ */}
      <div
        className={`absolute inset-y-0 left-0 overflow-hidden bg-[#EAEFF6] transition-[width] ${ease}`}
        style={{ width: `${pos}%` }}
      >
        <div
          className="absolute inset-y-0 left-0 h-full"
          style={{ width: `${width}px`, maxWidth: "none" }}
        >
          <svg
            viewBox="0 0 1100 660"
            className="absolute inset-0 block w-full h-full preserveAspectRatio-none"
          >
            <defs>
              <linearGradient id="beforeStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#64748b" stopOpacity="0.45" />
                <stop offset="1" stopColor="#475569" stopOpacity="0.15" />
              </linearGradient>
              <filter id="glowB" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              <pattern id="dotsB" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="1.3" cy="1.3" r="1.3" fill="#64748b" fillOpacity="0.2" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="1100" height="660" fill="url(#dotsB)" />
            <g filter="url(#glowB)" stroke="#475569" strokeOpacity="0.2" strokeWidth="5" fill="none" strokeLinecap="round">
              {beforeConns.map((c, i) => <path key={i} d={c.d} />)}
            </g>
            <g stroke="url(#beforeStroke)" strokeWidth="1.5" fill="none" strokeLinecap="round">
              {beforeConns.map((c, i) => (
                <path key={i} d={c.d} stroke={c.stroke === "#f59e0b" ? "#ef4444" : "#64748b"} strokeOpacity="0.75" strokeDasharray={c.dash} />
              ))}
            </g>
          </svg>

          {/* Scatter nodes */}
          <span className="absolute left-[43.6%] top-[45.5%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-slate-400 shadow-sm" />
          <span className="absolute left-[69%] top-[43.9%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-slate-400 shadow-sm" />
          <span className="absolute left-[30%] top-[54.5%] w-[12px] h-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500 shadow-[0_0_0_5px_rgba(244,63,94,0.2),0_1px_4px_rgba(244,63,94,0.4)] animate-pulse" />
          <span className="absolute left-[81.8%] top-[31.8%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-slate-400 shadow-sm" />
          <span className="absolute left-[50.9%] top-[71.2%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-slate-400 shadow-sm" />
          <span className="absolute left-[13.6%] top-[60.6%] w-[12px] h-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 shadow-[0_0_0_5px_rgba(245,158,11,0.2),0_1px_4px_rgba(245,158,11,0.4)] animate-pulse" />

          {/* Before wordmark — width matches half-container so it sits at the centre seam */}
          <div
            className="absolute top-[6%] left-0 pr-6 md:pr-8 flex items-center justify-end gap-3 pointer-events-none"
            style={{ width: `${width * 0.5}px` }}
          >
            <span className="w-2 h-2 rounded-full bg-slate-500 shadow-[0_0_6px_rgba(100,116,139,0.4)]" />
            <span className="text-[15px] md:text-[22px] font-bold tracking-[0.16em] uppercase text-slate-700 whitespace-nowrap">
              Before DHIRA
            </span>
          </div>

          {/* ── Before cards: gloomy tool sprawl + time/effort pain ── */}
          {/* SAP ERP */}
          <div className="absolute left-[16%] top-[30.3%] -translate-x-1/2 -translate-y-1/2 -rotate-2">
            <div className="animate-[ps-float_4.5s_ease-in-out_infinite] flex items-center gap-2.5 py-2 px-3.5 bg-white/95 backdrop-blur-[2px] border border-slate-300 rounded-outer shadow-md whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-slate-100 text-slate-500">
                <DynamicSketchIcon text="Enterprise" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">SAP ERP</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-slate-800">18-month integration timeline</span>
              </span>
            </div>
          </div>

          {/* Salesforce CRM */}
          <div className="absolute left-[35%] top-[68.5%] -translate-x-1/2 -translate-y-1/2 rotate-1">
            <div className="animate-[ps-float_5s_ease-in-out_infinite_1s] flex items-center gap-2.5 py-2 px-3.5 bg-white/95 backdrop-blur-[2px] border border-slate-300 rounded-outer shadow-md whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-slate-100 text-slate-500">
                <DynamicSketchIcon text="Customer Stories" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Salesforce CRM</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-slate-800">Customer data locked in a silo</span>
              </span>
            </div>
          </div>

          {/* Main pain badge — gloomy tool sprawl cost */}
          <div className="absolute left-[60%] top-[28.8%] -translate-x-1/2 -translate-y-1/2 -rotate-1">
            <div className="animate-[ps-float_6s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 py-2 px-3.5 bg-rose-50 border border-rose-300 rounded-outer shadow-md whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-rose-100 text-rose-700">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
                </svg>
              </span>
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-rose-900">12+ tools. 5+ vendor contracts.</span>
            </div>
          </div>

          {/* Power BI */}
          <div className="absolute left-[73.6%] top-[65.2%] -translate-x-1/2 -translate-y-1/2 rotate-2">
            <div className="animate-[ps-float_4s_ease-in-out_infinite_2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/95 backdrop-blur-[2px] border border-slate-300 rounded-outer shadow-md whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-slate-100 text-slate-500">
                <DynamicSketchIcon text="Akashic BI" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Power BI</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-slate-800">Stale data by design</span>
              </span>
            </div>
          </div>

          {/* Legacy systems */}
          <div className="absolute left-[22.7%] top-[83%] -translate-x-1/2 -translate-y-1/2 -rotate-2">
            <div className="animate-[ps-float_5.5s_ease-in-out_infinite_0.2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/95 backdrop-blur-[2px] border border-slate-300 rounded-outer shadow-md whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-slate-100 text-slate-500">
                <DynamicSketchIcon text="Legacy Modernization" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Legacy Systems</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-slate-800">One more team, one more budget</span>
              </span>
            </div>
          </div>

          {/* Excel */}
          <div className="absolute left-[62.7%] top-[84.8%] -translate-x-1/2 -translate-y-1/2 rotate-1">
            <div className="animate-[ps-float_4.8s_ease-in-out_infinite_1.2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/95 backdrop-blur-[2px] border border-slate-300 rounded-outer shadow-md whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-tile bg-slate-100 text-slate-500">
                <DynamicSketchIcon text="Documentation" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500">Excel Spreadsheets</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-slate-800">The bridge between everything else</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ════════ Divider handle with prominent Slide/Compare affordance ════════ */}
      <div
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="slider"
        aria-label="Slide to compare before and after DHIRA"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-20 h-36 flex items-center justify-center z-30 cursor-ew-resize outline-none transition-[left] ${ease}`}
        style={{ left: `${pos}%` }}
      >
        <div className="relative flex flex-col items-center gap-[10px] pointer-events-none">
          {/* Prominent slide & compare cue pill */}
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1E293B] text-white text-[11px] font-bold tracking-wider rounded-full whitespace-nowrap border border-blue-border/40 shadow-xl ring-2 ring-blue/20"
          >
            <span className="text-amber-400 font-mono text-[12px] animate-pulse">◄</span>
            <span className="uppercase text-[10px] tracking-widest text-blue-subtle font-mono">SLIDE TO COMPARE</span>
            <span className="text-blue-400 font-mono text-[12px] animate-pulse">►</span>
          </span>

          {/* Interactive Knob */}
          <div className="relative w-[52px] h-[52px] md:w-[62px] md:h-[62px]">
            <span className="absolute inset-0 rounded-full bg-blue/30 animate-[proofKnobGlow_2.2s_ease-out_infinite] pointer-events-none" />
            <div
              className="relative w-full h-full rounded-full flex items-center justify-center border-2 border-white bg-gradient-to-b from-white via-blue-subtle to-blue/20 shadow-2xl"
              style={{ boxShadow: "inset 0 2px 4px rgba(255,255,255,1), 0 0 0 3px rgba(62,99,221,0.3), 0 12px 30px rgba(11,20,64,0.4)" }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="block">
                <path d="M9 6l-4 6 4 6"/><path d="M15 6l4 6-4 6"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
