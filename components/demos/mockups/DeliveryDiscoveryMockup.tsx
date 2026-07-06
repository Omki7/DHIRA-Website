/*
 * SIMULATED PRODUCT UI — the Delivery hero's discovery console.
 * A fake 30-minute technical discovery: a stated problem routes through an
 * animated triage fan into its matched engagement model. Hardcoded
 * transcript, hand-placed match — no real routing logic (see AGENTS.md §8a).
 */

import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

const tiers = [
  { num: "01", name: "Akashic Deployment", note: "Platform rollout", match: true },
  { num: "02", name: "Product Engineering", note: "Bespoke build", match: false },
  { num: "03", name: "Advisory & Squads", note: "Senior bandwidth", match: false },
];

function TriageFan() {
  return (
    <svg viewBox="0 0 460 30" fill="none" aria-hidden className="block h-7 w-full">
      {[78, 230, 382].map((x) => (
        <path
          key={x}
          d={`M 230 0 C 230 16, ${x} 14, ${x} 30`}
          stroke="#C8D2F5"
          strokeWidth="1.2"
          fill="none"
        />
      ))}
      <path
        d="M 230 0 C 230 16, 78 14, 78 30"
        stroke="#3E63DD"
        strokeWidth="1.5"
        strokeDasharray="10 44"
        fill="none"
        opacity="0.85"
      >
        <animate attributeName="stroke-dashoffset" values="54;0" dur="2.4s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

export default function DeliveryDiscoveryMockup() {
  return (
    <div className="relative w-full max-w-[600px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="flex items-center gap-2.5 border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
          <DynamicSketchIcon text="AI Readiness Audit" className="h-[15px] w-[15px] text-blue" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-[13.5px] font-bold tracking-tight text-ink">
            Technical discovery
          </span>
          <span className="truncate text-[10.5px] text-tertiary-text">
            30 minutes &middot; with a DHIRA architect
          </span>
        </div>
        <BlueChip label="NO PITCH DECK" />
      </div>

      <div className="px-4 pt-4">
        <p className="font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
          Your problem, in your words
        </p>
        <p className="mt-1.5 font-mono text-[12.5px] leading-relaxed text-ink">
          &ldquo;Our reporting is three weeks behind reality.&rdquo;
          <span className="ml-0.5 inline-block h-[13px] w-[6px] translate-y-[2px] bg-blue/70 animate-[ps-caret-blink_1.1s_steps(1)_infinite]" aria-hidden />
        </p>
      </div>

      <div className="px-4">
        <TriageFan />
        <div className="grid grid-cols-3 gap-2 pb-4">
          {tiers.map((tier) => (
            <div
              key={tier.num}
              className={`rounded-[8px] border px-2.5 py-2 ${
                tier.match
                  ? "border-blue-border bg-blue-subtle"
                  : "border-subtle-stroke bg-white opacity-55"
              }`}
            >
              <div className="flex items-center justify-between gap-1">
                <span className={`font-mono text-[8.5px] font-bold uppercase tracking-[0.08em] ${tier.match ? "text-blue" : "text-overcast"}`}>
                  Model {tier.num}
                </span>
                {tier.match && (
                  <span className="inline-flex items-center gap-1 rounded-[5px] border border-[#CBE8D7] bg-[#EDF7F1] px-1 py-[1px]">
                    <span className="h-[4px] w-[4px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" />
                    <span className="text-[7.5px] font-bold tracking-[0.03em] text-[#1B7A47]">MATCH</span>
                  </span>
                )}
              </div>
              <div className="mt-1 truncate text-[11px] font-semibold tracking-tight text-ink">
                {tier.name}
              </div>
              <div className="truncate text-[9.5px] text-tertiary-text">{tier.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" />
          Mapped to the right tier &middot; Blueprint starts here
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
          T&minus;30:00
        </span>
      </div>
    </div>
  );
}
