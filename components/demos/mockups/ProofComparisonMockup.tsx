"use client";

// SIMULATED PRODUCT UI: an illustrative before/after, not live product telemetry.
import type { FocusEventHandler, KeyboardEventHandler } from "react";
import DhiraLogo from "@/components/icons/DhiraLogo";
import { HOME_PROOF } from "@/lib/homeSections";

interface Props {
  pos: number;
  width: number;
  glide?: boolean;
  showHint?: boolean;
  nudge?: boolean;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler<HTMLDivElement>;
}

const ROWS = [24, 49, 74] as const;

function RecordMark({ unified, index }: { unified: boolean; index: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 42" className={`mb-2 h-9 w-14 sm:mb-3 sm:h-11 sm:w-16 ${unified ? "text-blue" : "text-overcast"}`} fill="none">
      {[0, 1, 2].map((sheet) => (
        <g key={sheet} transform={`translate(${sheet * 9} ${unified ? 8 - sheet * 3 : (sheet + index) % 3 * 5})`}>
          <path d="M3 2H26L32 8V30H3Z" fill={unified ? "rgb(var(--background))" : "rgb(var(--panel))"} stroke="currentColor" strokeOpacity={0.35 + sheet * 0.25} strokeWidth="0.8" />
          <path d="M26 2V8H32M9 14H24M9 19H21M9 24H17" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.65" />
        </g>
      ))}
    </svg>
  );
}

function RelationshipField({ unified, compact }: { unified: boolean; compact: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
      {unified && Array.from({ length: 7 }, (_, strand) => (
        <path key={`spine-${strand}`} d={`M${48.8 + strand * 0.4} 14 C${46 + strand * 0.7} 34, ${53 - strand * 0.4} 64, ${48.8 + strand * 0.4} 86`} stroke="rgb(var(--blue))" strokeOpacity={strand === 3 ? 0.65 : 0.14} strokeWidth={strand === 3 ? 1.2 : 0.7} vectorEffect="non-scaling-stroke" />
      ))}
      {ROWS.flatMap((y, row) => [0, 1].flatMap((side) => Array.from({ length: unified ? 6 : 3 }, (_, strand) => {
        const start = side === 0 ? (compact ? 39 : 32) : (compact ? 61 : 68);
        const end = unified ? 49 + strand * 0.4 : side === 0 ? 42 + strand : 57 - strand;
        const offset = (strand - 2.5) * 0.65;
        const destination = unified ? 47 + row * 3 : y + (row % 2 ? -10 : 12) + strand * 2;
        return <path key={`${row}-${side}-${strand}`} d={`M${start} ${y + offset} C${side === 0 ? 45 : 55} ${y + offset}, ${end} ${destination - 12}, ${end} ${destination}`} stroke={unified ? "rgb(var(--blue))" : "#8893A3"} strokeOpacity={unified ? 0.18 + strand * 0.06 : 0.22 + strand * 0.08} strokeWidth="0.85" vectorEffect="non-scaling-stroke" />;
      })))}
      {!unified && ROWS.map((y, index) => <g key={y} stroke="#8893A3" strokeOpacity="0.5" strokeWidth="0.8" vectorEffect="non-scaling-stroke"><path d={`M45 ${y + 8}l1 -2m8 1 1 -2M48 ${y + 4}l1 -2`} vectorEffect="non-scaling-stroke" /><circle cx={index % 2 ? 56 : 43} cy={y + 13} r="0.35" fill="#8893A3" /></g>)}
    </svg>
  );
}

export default function ProofComparisonMockup({ pos, width, glide = false, showHint = true, nudge = false, onKeyDown, onFocus }: Props) {
  const compact = width < 640;
  const ease = glide ? "duration-650 ease-settle" : "duration-0";

  const landscape = (unified: boolean) => (
    <>
      <RelationshipField unified={unified} compact={compact} />
      {HOME_PROOF.nodes.map((node, index) => {
        const side = index < 3 ? 0 : 1;
        const row = index % 3;
        return (
          <div key={node.id} data-proof-node={unified ? "after" : "before"} className={`absolute -translate-x-1/2 -translate-y-1/2 ${compact ? "w-[36%]" : "w-[23%] max-w-[225px]"}`} style={{ left: `${side === 0 ? (compact ? 23 : 20) : (compact ? 77 : 80)}%`, top: `${ROWS[row]}%` }}>
            <div className={unified ? "bg-background" : "bg-panel"}>
              <RecordMark unified={unified} index={index} />
              <div className={`mb-2 flex items-center gap-2 border-t pt-2 font-mono text-[8px] uppercase tracking-[0.06em] sm:text-[9px] ${unified ? "border-blue-border text-blue" : "border-line text-inkSoft"}`}>
                <span>{String(index + 1).padStart(2, "0")}</span><span>{node.beforeLabel}</span>
              </div>
              <p className="max-w-[19ch] text-[12px] font-medium leading-[1.25] tracking-tight text-ink sm:text-[16px] lg:text-[19px]">{unified ? node.afterLabel : node.beforeDetail}</p>
            </div>
          </div>
        );
      })}
      {unified && <div className={`absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center top-[89%]`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-border bg-background ring-[6px] ring-background sm:h-[72px] sm:w-[72px] sm:ring-[10px]"><DhiraLogo className="h-7 w-7 text-ink sm:h-10 sm:w-10" /></div>
        <span className="mt-3 bg-background px-2 font-mono text-[8px] uppercase tracking-eyebrow text-blue sm:text-[10px]">DHIRA</span>
      </div>}
    </>
  );

  return (
    <div className="absolute inset-0">
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-outer">
        <div className="absolute inset-0 bg-background">{landscape(true)}</div>
        <div data-proof-before className={`absolute inset-y-0 left-0 overflow-hidden bg-panel transition-[width] motion-reduce:transition-none ${ease}`} style={{ width: `${pos}%` }}>
          <div className="absolute inset-y-0 left-0" style={{ width }}>{landscape(false)}</div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex justify-between p-4 sm:px-7 sm:py-6">
          <span className="font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">{HOME_PROOF.before}</span>
          <span className="font-mono text-[9px] uppercase tracking-eyebrow text-blue">{HOME_PROOF.after}</span>
        </div>
        <div className={`pointer-events-none absolute inset-y-0 z-20 w-px -translate-x-1/2 bg-blue/60 transition-[left] motion-reduce:transition-none ${ease}`} style={{ left: `${pos}%` }} />
      </div>
      <div
        role="slider"
        aria-label="Before and after comparison"
        aria-describedby="proof-instructions"
        aria-orientation="horizontal"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% before DHIRA, ${Math.round(100 - pos)}% after DHIRA`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className={`absolute top-[46%] z-30 flex h-[60px] w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full outline-none transition-[left] focus-visible:ring-2 focus-visible:ring-blue focus-visible:ring-offset-4 motion-reduce:transition-none ${ease}`}
        style={{ left: `${pos}%` }}
      >
        <div aria-hidden="true" className={`relative flex h-12 w-11 shrink-0 items-center justify-center rounded-full border border-blue-border bg-background text-blue shadow-frame ${nudge ? "motion-safe:animate-[proofNudge_1.5s_ease-in-out_3]" : ""}`}>
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m8 7-4 5 4 5m8-10 4 5-4 5M11 8v8m2-8v8" /></svg>
          {showHint && pos > 20 && pos < 80 && <span className="absolute top-full mt-3 rounded-full border border-default-stroke bg-background px-3 py-1 font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft shadow-card">Drag</span>}
        </div>
      </div>
    </div>
  );
}
