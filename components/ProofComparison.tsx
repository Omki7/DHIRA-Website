"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import DynamicSketchIcon from "./DynamicSketchIcon";
import DhiraLogo from "./DhiraLogo";

const curve = (ax: number, ay: number, bx: number, by: number, bend: number) => {
  const mx = (ax + bx) / 2,
    my = (ay + by) / 2;
  const dx = bx - ax,
    dy = by - ay;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len,
    ny = dx / len;
  const cx = mx + nx * bend,
    cy = my + ny * bend;
  return `M ${ax} ${ay} Q ${cx.toFixed(1)} ${cy.toFixed(1)} ${bx} ${by}`;
};

const CX = 550, CY = 372;
const afterPts = [
  [550, 130], [858, 245], [858, 500], [550, 600], [242, 500], [242, 245]
];
const afterConns = afterPts.map((p, i) => ({
  d: curve(CX, CY, p[0], p[1], (i % 2 ? 1 : -1) * 30),
}));

const beforePairs = [
  [176, 200, 480, 300], [480, 300, 810, 430], [385, 452, 660, 190], [660, 190, 900, 210],
  [760, 290, 250, 548], [480, 300, 560, 470], [330, 360, 810, 430], [690, 560, 760, 290],
  [176, 200, 330, 360], [150, 400, 385, 452], [810, 430, 560, 470],
];
const conflictPts = new Set(["330,360", "150,400", "660,190"]);
const beforeConns = beforePairs.map((p, i) => {
  const touchesConflict = conflictPts.has(`${p[0]},${p[1]}`) || conflictPts.has(`${p[2]},${p[3]}`);
  return {
    d: curve(p[0], p[1], p[2], p[3], (i % 2 ? 1 : -1) * (38 + (i % 3) * 12)),
    stroke: touchesConflict ? "#ef4444" : "#8E8F91",
    dash: i % 3 === 0 ? "3 7" : "0",
  };
});

export default function ProofComparison() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    document.body.style.userSelect = "none";
    updatePos(e.clientX);
  };

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    document.body.style.userSelect = "";
  }, []);

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return;
    updatePos(e.clientX);
  }, []);

  const updatePos = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    let p = ((clientX - rect.left) / rect.width) * 100;
    p = Math.max(4, Math.min(96, p));
    setPos(p);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    let p = pos;
    if (e.key === "ArrowLeft") p -= 4;
    else if (e.key === "ArrowRight") p += 4;
    else if (e.key === "Home") p = 4;
    else if (e.key === "End") p = 96;
    else return;
    e.preventDefault();
    setPos(Math.max(4, Math.min(96, p)));
  };

  useEffect(() => {
    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerup", handlePointerUp);
    };
  }, [handlePointerMove, handlePointerUp]);

  return (
    <div className="w-full max-w-[1100px] mx-auto mt-12 mb-8 relative">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        className="relative w-full overflow-hidden cursor-ew-resize select-none shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ring-1 ring-ink/5 rounded-[20px] bg-background"
        style={{ aspectRatio: "1100 / 660", touchAction: "none" }}
      >        {/* ════════ AFTER layer (base) — one governed core ════════ */}
        {/* We use #FFFFFF for the main background. */}
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
              {afterConns.map((c, i) => (
                <path key={i} d={c.d} />
              ))}
            </g>
            <g stroke="url(#afterStroke)" strokeWidth="1.7" fill="none" strokeLinecap="round">
              {afterConns.map((c, i) => (
                <path key={i} d={c.d} />
              ))}
            </g>
          </svg>

          <div className="absolute top-[6%] left-1/2 w-1/2 pl-6 md:pl-8 flex items-center gap-3 pointer-events-none">
            <span className="text-[15px] md:text-[22px] font-semibold tracking-[0.16em] uppercase text-[#3E63DD] whitespace-nowrap">
              After DHIRA
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E63DD] shadow-[0_0_0_4px_rgba(62,99,221,0.15)]" />
          </div>

          <div className="absolute left-[50%] top-[19.7%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[ps-float_5s_ease-in-out_infinite] flex items-center gap-2.5 py-2.5 pr-4 pl-3 bg-[#3E63DD] border border-[#3E63DD] rounded-[14px] shadow-[0_8px_16px_-4px_rgba(62,99,221,0.25)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white">
                <DynamicSketchIcon text="Akashic Data Governance" className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-white">One number, one truth</span>
            </div>
          </div>
          <div className="absolute left-[78%] top-[37.1%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[ps-float_4s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 py-2.5 pr-4 pl-3 bg-[#3E63DD] border border-[#3E63DD] rounded-[14px] shadow-[0_8px_16px_-4px_rgba(62,99,221,0.25)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white">
                <DynamicSketchIcon text="Akashic Data Pipelines" className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-white">Real time updates</span>
            </div>
          </div>
          <div className="absolute left-[78%] top-[75.8%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[ps-float_6s_ease-in-out_infinite_1.5s] flex items-center gap-2.5 py-2.5 pr-4 pl-3 bg-[#3E63DD] border border-[#3E63DD] rounded-[14px] shadow-[0_8px_16px_-4px_rgba(62,99,221,0.25)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white">
                <DynamicSketchIcon text="Akashic Machine Learning" className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-white">Same answer, every time</span>
            </div>
          </div>
          <div className="absolute left-[50%] top-[90.9%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[ps-float_4.5s_ease-in-out_infinite_0.8s] flex items-center gap-2.5 py-2.5 pr-4 pl-3 bg-[#3E63DD] border border-[#3E63DD] rounded-[14px] shadow-[0_8px_16px_-4px_rgba(62,99,221,0.25)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white">
                <DynamicSketchIcon text="AI Readiness Audit" className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-white">Always audit ready</span>
            </div>
          </div>
          <div className="absolute left-[22%] top-[75.8%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[ps-float_5.5s_ease-in-out_infinite_2s] flex items-center gap-2.5 py-2.5 pr-4 pl-3 bg-[#3E63DD] border border-[#3E63DD] rounded-[14px] shadow-[0_8px_16px_-4px_rgba(62,99,221,0.25)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white">
                <DynamicSketchIcon text="Akashic Workflow" className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-white">Fully automated</span>
            </div>
          </div>
          <div className="absolute left-[22%] top-[37.1%] -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[ps-float_4.2s_ease-in-out_infinite_0.2s] flex items-center gap-2.5 py-2.5 pr-4 pl-3 bg-[#3E63DD] border border-[#3E63DD] rounded-[14px] shadow-[0_8px_16px_-4px_rgba(62,99,221,0.25)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-white">
                <DynamicSketchIcon text="Akashic Master Data" className="w-[18px] h-[18px]" />
              </span>
              <span className="text-[13.5px] font-semibold tracking-[-0.01em] text-white">One governed foundation</span>
            </div>
          </div>

          <div className="absolute left-1/2 top-[56.4%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <div className="relative w-[100px] h-[100px] md:w-[130px] md:h-[130px] flex items-center justify-center">
              <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-[#3E63DD]/20 animate-[proofCorePulse_3.2s_ease-out_infinite] pointer-events-none" />
              
              <div className="relative w-full h-full rounded-full overflow-hidden flex items-center justify-center"
                style={{
                  background: "radial-gradient(135% 135% at 32% 24%, #FFFFFF 0%, #F5F7FF 52%, #DCE5FE 100%)",
                  boxShadow: "inset 0 2px 5px rgba(255,255,255,0.8), inset 0 -8px 16px rgba(0,0,0,0.05), 0 0 0 8px rgba(255,255,255,0.4), 0 18px 38px -12px rgba(0,0,0,0.2)"
                }}>
                <span className="absolute left-[18%] top-[12%] w-[54%] h-[42%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.8),rgba(255,255,255,0))] pointer-events-none" />
                <DhiraLogo className="relative w-12 h-12 text-ink" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-y-0 left-0 overflow-hidden bg-[#f1f5f9]"
          style={{ width: `${pos}%` }}
        >
          <svg viewBox="0 0 1100 660" className="absolute top-0 left-0 block h-full preserveAspectRatio-none" style={{ width: "1100px", maxWidth: "none" }}>
            <defs>
              <linearGradient id="beforeStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#64748b" stopOpacity="0.35" />
                <stop offset="1" stopColor="#64748b" stopOpacity="0.1" />
              </linearGradient>
              <filter id="glowB" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
              <pattern id="dotsB" width="26" height="26" patternUnits="userSpaceOnUse">
                <circle cx="1.3" cy="1.3" r="1.3" fill="#64748b" fillOpacity="0.1" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="1100" height="660" fill="url(#dotsB)" />
            <g filter="url(#glowB)" stroke="#64748b" strokeOpacity="0.15" strokeWidth="5" fill="none" strokeLinecap="round">
              {beforeConns.map((c, i) => (
                <path key={i} d={c.d} />
              ))}
            </g>
            <g stroke="url(#beforeStroke)" strokeWidth="1.5" fill="none" strokeLinecap="round">
              {beforeConns.map((c, i) => (
                <path key={i} d={c.d} stroke={c.stroke} strokeOpacity="0.7" strokeDasharray={c.dash} />
              ))}
            </g>
          </svg>

          {/* bare scatter nodes */}
          <span className="absolute left-[43.6%] top-[45.5%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-line shadow-sm" />
          <span className="absolute left-[69%] top-[43.9%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-line shadow-sm" />
          <span className="absolute left-[30%] top-[54.5%] w-[12px] h-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_0_5px_rgba(239,68,68,0.15),0_1px_4px_rgba(239,68,68,0.4)]" />
          <span className="absolute left-[81.8%] top-[31.8%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-line shadow-sm" />
          <span className="absolute left-[50.9%] top-[71.2%] w-[11px] h-[11px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-[1.5px] border-line shadow-sm" />
          <span className="absolute left-[13.6%] top-[60.6%] w-[12px] h-[12px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 shadow-[0_0_0_5px_rgba(239,68,68,0.15),0_1px_4px_rgba(239,68,68,0.4)]" />

          {/* BEFORE DHIRA wordmark — anchored relative to the center seam */}
          <div className="absolute top-[6%] left-0 pr-6 md:pr-8 flex items-center justify-end gap-3 pointer-events-none" style={{ width: "550px" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-line shadow-[0_0_0_4px_rgba(211,216,223,0.3)]" />
            <span className="text-[15px] md:text-[22px] font-semibold tracking-[0.16em] uppercase text-inkSoft whitespace-nowrap">
              Before DHIRA
            </span>
          </div>

          {/* scattered data cards (grey mode to show doom, with real tech tools but original text) */}
          <div className="absolute left-[16%] top-[30.3%] -translate-x-1/2 -translate-y-1/2 -rotate-2">
            <div className="animate-[ps-float_4.5s_ease-in-out_infinite] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-line rounded-[13px] shadow-sm whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#f3f4f6] text-inkSoft">
                <DynamicSketchIcon text="Enterprise" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-medium tracking-tight text-overcast/80 uppercase">SAP ERP</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-inkSoft">Three teams, three numbers</span>
              </span>
            </div>
          </div>
          <div className="absolute left-[35%] top-[68.5%] -translate-x-1/2 -translate-y-1/2 rotate-1">
            <div className="animate-[ps-float_5s_ease-in-out_infinite_1s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-line rounded-[13px] shadow-sm whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#f3f4f6] text-inkSoft">
                <DynamicSketchIcon text="Customer Stories" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-medium tracking-tight text-overcast/80 uppercase">Salesforce CRM</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-inkSoft">Reports land in 72 hours</span>
              </span>
            </div>
          </div>
          <div className="absolute left-[60%] top-[28.8%] -translate-x-1/2 -translate-y-1/2 -rotate-1">
            <div className="animate-[ps-float_6s_ease-in-out_infinite_0.5s] flex items-center gap-2.5 py-2 px-3.5 bg-red-50 border border-red-200 rounded-[13px] shadow-[0_8px_22px_-12px_rgba(239,68,68,0.4)] whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-white text-red-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M10.3 4l-8 14h19.4z"/><path d="M12 10v4"/><path d="M12 17.5h.01"/></svg>
              </span>
              <span className="text-[13px] font-semibold tracking-[-0.01em] text-red-500">Conflicting answers</span>
            </div>
          </div>
          <div className="absolute left-[73.6%] top-[65.2%] -translate-x-1/2 -translate-y-1/2 rotate-2">
            <div className="animate-[ps-float_4s_ease-in-out_infinite_2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-line rounded-[13px] shadow-sm whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#f3f4f6] text-inkSoft">
                <DynamicSketchIcon text="Akashic Data Warehouse" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-medium tracking-tight text-overcast/80 uppercase">Snowflake DB</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-inkSoft">12+ disconnected tools</span>
              </span>
            </div>
          </div>
          <div className="absolute left-[22.7%] top-[83%] -translate-x-1/2 -translate-y-1/2 -rotate-2">
            <div className="animate-[ps-float_5.5s_ease-in-out_infinite_0.2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-line rounded-[13px] shadow-sm whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#f3f4f6] text-inkSoft">
                <DynamicSketchIcon text="Legacy Modernization" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-medium tracking-tight text-overcast/80 uppercase">Legacy Mainframe</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-inkSoft">Manual work, every week</span>
              </span>
            </div>
          </div>
          <div className="absolute left-[62.7%] top-[84.8%] -translate-x-1/2 -translate-y-1/2 rotate-1">
            <div className="animate-[ps-float_4.8s_ease-in-out_infinite_1.2s] flex items-center gap-2.5 py-2 px-3.5 bg-white/90 backdrop-blur-[2px] border border-line rounded-[13px] shadow-sm whitespace-nowrap">
              <span className="flex-none inline-flex items-center justify-center w-6 h-6 rounded-md bg-[#f3f4f6] text-inkSoft">
                <DynamicSketchIcon text="Guides" className="w-4 h-4" />
              </span>
              <span className="flex flex-col">
                <span className="text-[10px] font-medium tracking-tight text-overcast/80 uppercase">Excel Spreadsheets</span>
                <span className="text-[13px] font-medium tracking-[-0.01em] text-inkSoft">Weeks of prep, every cycle</span>
              </span>
            </div>
          </div>
        </div>

        {/* ════════ Divider handle — edge to edge ════════ */}
        <div
          onKeyDown={handleKeyDown}
          tabIndex={0}
          role="slider"
          aria-label="Drag to compare before and after DHIRA"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          className="absolute top-0 bottom-0 -translate-x-1/2 w-16 flex items-center justify-center z-10 cursor-ew-resize outline-none"
          style={{ left: `${pos}%` }}
        >
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2.5px] shadow-[0_0_0_1px_rgba(38,109,242,0.25),_0_0_22px_rgba(38,109,242,0.22)]"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.98) 18%, rgba(255,255,255,0.98) 82%, rgba(255,255,255,0.4))" }}
          />
          <div className="relative flex flex-col items-center gap-[11px]">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-ink text-white text-[11px] font-semibold tracking-[0.02em] rounded-full whitespace-nowrap shadow-lg">
              See the change
              <span className="inline-flex animate-[proofHint_1.5s_ease_infinite]">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
              </span>
            </span>
            <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px]">
              <span className="absolute inset-0 rounded-full bg-[#266df2]/20 animate-[proofKnobGlow_2.6s_ease-out_infinite] pointer-events-none" />
              <div className="relative w-full h-full rounded-full flex items-center justify-center border border-[#266df2]/20 bg-gradient-to-b from-white to-[#F5F7FE] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_5px_rgba(28,29,31,0.08),0_12px_26px_-8px_rgba(38,109,242,0.45)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#266df2" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="block"><path d="M9 6l-4 6 4 6"/><path d="M15 6l4 6-4 6"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
