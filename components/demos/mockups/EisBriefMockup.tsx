/*
 * SIMULATED PRODUCT UI — the Akashic EIS hero's morning brief.
 * Recreated from the EIS product prototype's home screen: the AI-written
 * CEO brief, the Business Pulse tiles ("every tile one click from source"),
 * and the grounded footer. Nexora, Arjun, and all figures are the
 * prototype's canned demo data (see AGENTS.md §8a).
 */

import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const pulse = [
  { label: "REVENUE RUN-RATE", value: "₹142 Cr", delta: "↑ 4.2% vs plan", tone: "#1B7A47" },
  { label: "OPERATING MARGIN", value: "22.4%", delta: "↓ 1.1pt · watch", tone: "#C0883A" },
  { label: "PIPELINE COVERAGE", value: "2.4×", delta: "↑ 0.2 vs target", tone: "#1B7A47" },
];

export default function EisBriefMockup() {
  return (
    <div className="w-full max-w-[560px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="flex items-center gap-2.5 border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <DynamicSketchIcon text="Akashic EIS" className="h-[15px] w-[15px] text-blue" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13.5px] font-bold tracking-tight text-ink">
            Intelligence feed
          </span>
          <span className="truncate text-[10.5px] text-tertiary-text">
            Nexora &middot; CEO view
          </span>
        </div>
        <LiveChip />
      </div>

      <div className="px-4 pt-3.5">
        <p className="font-mono text-[8.5px] font-bold uppercase tracking-[0.1em] text-blue">
          Monday &middot; 04 June &middot; Q1 FY27 in progress
        </p>
        <p className="mt-2 text-[17px] font-bold tracking-tight text-ink">Good morning, Arjun.</p>
        <div className="mt-2 flex gap-2">
          <span className="mt-[7px] h-[6px] w-[6px] shrink-0 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
          <p className="text-[11.5px] leading-relaxed text-inkSoft">
            <span className="font-semibold text-ink">Your portfolio is at an inflection point.</span>{" "}
            Revenue per employee is up 6.2%. But{" "}
            <span className="font-semibold text-ink">Meridian Retail is now your single largest exposure</span>
            : renewal, delivery, and a key-person exit converge on the same account
            in the next 18 days.
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="rounded-[8px] border border-subtle-stroke bg-white px-2.5 py-1 text-[10px] font-semibold text-inkSoft">
            Customise pulse
          </span>
          <span className="rounded-[8px] bg-blue px-2.5 py-1 text-[10px] font-semibold text-white shadow-[0_2px_6px_-1px_rgba(62,99,221,0.5)]">
            Send me the brief
          </span>
          <span className="ml-auto text-[10px] font-semibold text-blue">Ask Akashic &rsaquo;</span>
        </div>
      </div>

      <div className="px-4 pt-4">
        <div className="flex items-baseline justify-between font-mono text-[8px] uppercase tracking-[0.08em] text-overcast">
          <span className="font-bold text-inkSoft">Business pulse</span>
          <span>vs Q1 plan &middot; every tile one click from source</span>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 pb-4">
          {pulse.map((tile) => (
            <div key={tile.label} className="rounded-[9px] border border-[#EEEEF3] bg-[#FBFBFE] px-2.5 py-2">
              <div className="truncate font-mono text-[7px] font-bold tracking-[0.07em] text-[#7C828C]">
                {tile.label}
              </div>
              <div className="mt-1 inline-block whitespace-nowrap border-b border-dashed border-blue/40 text-[15px] font-bold tracking-tight text-ink">
                {tile.value}
              </div>
              <div className="mt-1 truncate text-[8.5px] font-semibold" style={{ color: tile.tone }}>
                {tile.delta}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="flex items-center gap-1.5 text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
          Grounded &middot; every figure cites its source
        </span>
        <span className="text-overcast">Trust layer &middot; 14 documents</span>
      </div>
    </div>
  );
}
