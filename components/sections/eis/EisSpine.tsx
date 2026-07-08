/*
 * [03] The Enterprise Spine — Why the Brief Is Possible.
 * The prototype's connected entity graph: account → contract → project →
 * employee → financial → skill on one flowing spine, and the convergence
 * card it enables (three signals, one account, caught early). §8a demo data.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

const spine = [
  { name: "Account", icon: "Enterprise" },
  { name: "Contract", icon: "Documentation" },
  { name: "Project", icon: "Akashic Workflow" },
  { name: "Employee", icon: "Careers" },
  { name: "Financial", icon: "Akashic BI" },
  { name: "Skill", icon: "Akashic Machine Learning" },
];

const signals = [
  { system: "Contracts", signal: "MSA renewal due 22 Jun", tone: "#C0883A" },
  { system: "Delivery", signal: "Orion rollout 11 days over plan", tone: "#C0883A" },
  { system: "People", signal: "Lead architect: high attrition risk", tone: "#C0883A" },
];

function SpineSegment() {
  return (
    <span
      className="hidden h-px min-w-[18px] flex-1 bg-[length:16px_1px] bg-repeat-x bg-[repeating-linear-gradient(90deg,#C8D2F5_0_8px,transparent_8px_16px)] animate-[ps-dash_1.4s_linear_infinite] md:block"
      aria-hidden
    />
  );
}

export default function EisSpine() {
  return (
    <section id="the-spine" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;The enterprise spine</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Why the brief is possible</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Every entity, on one connected spine.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            Underneath EIS, Akashic MDM fuses your systems into one graph: the
            account links to its contracts, contracts to projects, projects to the
            people on them, people to the money and the skills. Silos cannot see
            across themselves. A spine can.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg lg:mt-14">
            <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-2 items-center gap-2 sm:grid-cols-3 md:flex md:gap-0">
                {spine.map((entity, idx) => (
                  <div key={entity.name} className="contents md:flex md:min-w-0 md:flex-1 md:items-center">
                    <div className="flex items-center gap-2 rounded-[10px] border border-subtle-stroke bg-white px-3 py-2 shadow-card md:shrink-0">
                      <DynamicSketchIcon text={entity.icon} className="h-[14px] w-[14px] shrink-0 text-blue" />
                      <span className="truncate font-mono text-[9.5px] font-bold uppercase tracking-[0.06em] text-ink">
                        {entity.name}
                      </span>
                    </div>
                    {idx < spine.length - 1 && <SpineSegment />}
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-4 flex max-w-[200px] justify-center" aria-hidden>
                <svg viewBox="0 0 200 26" fill="none" className="h-6 w-full">
                  {[20, 100, 180].map((x) => (
                    <path key={x} d={`M ${x} 0 C ${x} 14, 100 12, 100 26`} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
                  ))}
                  <path d="M 20 0 C 20 14, 100 12, 100 26" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="8 40" fill="none" opacity="0.85">
                    <animate attributeName="stroke-dashoffset" values="48;0" dur="2.4s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>

              <div className="mx-auto max-w-[560px] overflow-hidden rounded-[12px] border border-subtle-stroke bg-white shadow-card">
                <div className="flex items-center justify-between border-b border-dashed border-lineSoft px-4 py-2.5">
                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-ink">
                    Meridian Retail &middot; convergence detected
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-[5px] border border-[#E3D5BC] bg-[#FDF9F1] px-1.5 py-[2px] font-mono text-[7.5px] font-bold text-[#8A6A33]">
                    <span className="h-[4px] w-[4px] rounded-full bg-[#C0883A] animate-[ps-pulse_2s_infinite]" aria-hidden />
                    3 SIGNALS
                  </span>
                </div>
                <div className="divide-y divide-lineSoft">
                  {signals.map((row) => (
                    <div key={row.system} className="flex items-center gap-3 px-4 py-2">
                      <span className="w-[76px] shrink-0 font-mono text-[8.5px] font-bold uppercase tracking-[0.06em] text-overcast">
                        {row.system}
                      </span>
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full" style={{ background: row.tone }} aria-hidden />
                      <span className="min-w-0 flex-1 truncate text-[11.5px] font-medium text-ink">
                        {row.signal}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-lineSoft bg-primary-bg px-4 py-2.5 text-[10px] font-medium text-inkSoft">
                  Three systems, one account. Flagged 18 days before the board meeting, not after.
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
