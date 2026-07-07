/*
 * SIMULATED PRODUCT UI — the Akashic EIS hero's executive command centre.
 * Canned KPI tiles (threshold-toned), a traced anomaly alert with suggested
 * action, an Ask-Akashic prompt line, and a read-only sources strip. All
 * figures are hand-placed sample data, not claims (see AGENTS.md §8a).
 */

import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const kpis = [
  { label: "REVENUE", value: "₹412 Cr", note: "98% of plan", tone: "#1B7A47" },
  { label: "GROSS MARGIN", value: "18.2%", note: "APAC dip flagged", tone: "#C0883A" },
  { label: "COLLECTIONS", value: "46 days", note: "improving", tone: "#1A1C1D" },
  { label: "DECISIONS DUE", value: "3 today", note: "board pack ready", tone: "#3E63DD" },
];

const sources = ["SAP", "Salesforce", "Oracle", "Flat files"];

function TrendLine() {
  return (
    <svg viewBox="0 0 120 26" fill="none" aria-hidden className="h-6 w-full">
      <polyline
        points="2,20 16,17 30,19 44,12 58,14 72,9 86,11 100,6 118,4"
        stroke="#3E63DD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fl-sparkline"
        opacity="0.75"
      />
    </svg>
  );
}

export default function EisBoardMockup() {
  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="flex items-center gap-2.5 border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <DynamicSketchIcon text="Akashic EIS" className="h-[15px] w-[15px] text-blue" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13.5px] font-bold tracking-tight text-ink">
            Executive command centre
          </span>
          <span className="truncate text-[10.5px] text-tertiary-text">
            Monday 09:00 &middot; all units consolidated
          </span>
        </div>
        <LiveChip />
      </div>

      <div className="grid grid-cols-2 gap-1.5 px-4 pt-3.5 sm:grid-cols-4">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="rounded-[9px] border border-[#EEEEF3] bg-[#FBFBFE] px-2.5 py-2">
            <div className="font-mono text-[7.5px] font-bold tracking-[0.07em] text-[#7C828C]">
              {kpi.label}
            </div>
            <div className="mt-0.5 whitespace-nowrap text-[13px] font-bold tracking-tight" style={{ color: kpi.tone }}>
              {kpi.value}
            </div>
            <div className="truncate text-[8.5px] text-tertiary-text">{kpi.note}</div>
          </div>
        ))}
      </div>

      <div className="px-4 pt-3">
        <div className="flex items-baseline justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-overcast">
          <span>Consolidated revenue &middot; trailing 90 days</span>
          <span>live</span>
        </div>
        <div className="mt-1"><TrendLine /></div>
      </div>

      <div className="mx-4 mt-3 rounded-[9px] border border-[#EEDFC4] bg-[#FDF9F1] px-3 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" aria-hidden />
          <span className="min-w-0 flex-1 truncate text-[11px] font-semibold text-ink">
            APAC margin dip &middot; traced to a logistics delay
          </span>
          <span className="shrink-0 rounded-[5px] border border-[#E3D5BC] bg-white px-1.5 py-[2px] font-mono text-[7.5px] font-bold tracking-[0.05em] text-[#8A6A33]">
            TRACED
          </span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5 pl-[14px] font-mono text-[8.5px] text-inkSoft">
          <span className="text-overcast">SUGGESTED</span>
          <span className="truncate">Alternate vendor identified &middot; approval pending</span>
        </div>
      </div>

      <div className="mx-4 mt-2.5 rounded-[9px] border border-blue-border bg-blue-subtle/60 px-3 py-2">
        <span className="text-[11px] leading-relaxed text-ink">
          Ask Akashic: &ldquo;What drove the APAC margin dip?&rdquo;
          <span className="ml-0.5 font-bold text-blue animate-[ps-caret-blink_1.1s_step-end_infinite]">|</span>
        </span>
      </div>

      <div className="mt-3.5 flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5">
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[8.5px] uppercase tracking-[0.06em] text-inkSoft">
          {sources.map((s, i) => (
            <span key={s} className="flex items-center gap-1">
              <span className="h-[4px] w-[4px] rounded-full bg-[#30A46C]" aria-hidden />
              {s}
              {i < sources.length - 1 && <span className="text-overcast">&middot;</span>}
            </span>
          ))}
        </span>
        <span className="shrink-0 font-mono text-[8.5px] uppercase tracking-[0.06em] text-overcast">
          Read-only
        </span>
      </div>
    </div>
  );
}
