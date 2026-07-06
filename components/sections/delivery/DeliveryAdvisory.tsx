/*
 * [04] Model 3 — Advisory & Co-Engineering.
 * Asymmetric split on shared AkashicCardChrome: a strategic-advisory dossier
 * with an indexed deliverables ledger on the left, and a squad org-diagram
 * (one accountable architect fans into four engineers) on the right.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { CardHeader, BlueChip } from "@/components/sections/akashic/AkashicCardChrome";

const deliverables = [
  { num: "D-01", label: "Sovereign Data Readiness Audit", icon: "AI Readiness Audit" },
  { num: "D-02", label: "Vendor Evaluation", icon: "Documentation" },
  { num: "D-03", label: "Sovereign Blueprint with a prioritised roadmap", icon: "Sovereign Blueprint" },
];

const squad = [
  { role: "Senior Data Engineer", icon: "Akashic Data Pipelines" },
  { role: "ML Researcher", icon: "Akashic Machine Learning" },
  { role: "Platform Architect", icon: "Akashic Data Warehouse" },
  { role: "Senior Engineer", icon: "Custom Accelerators" },
];

function SquadFan() {
  return (
    <svg viewBox="0 0 320 36" fill="none" aria-hidden className="mx-auto mt-3 block h-9 w-full max-w-[320px]">
      {[40, 120, 200, 280].map((x) => (
        <g key={x}>
          <path d={`M 160 0 C 160 18, ${x} 18, ${x} 36`} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
          <path
            d={`M 160 0 C 160 18, ${x} 18, ${x} 36`}
            stroke="#3E63DD"
            strokeWidth="1.5"
            strokeDasharray="10 52"
            fill="none"
            opacity="0.8"
          >
            <animate attributeName="stroke-dashoffset" values="62;0" dur="2.6s" repeatCount="indefinite" />
          </path>
        </g>
      ))}
    </svg>
  );
}

export default function DeliveryAdvisory() {
  return (
    <section id="advisory-co-engineering" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Model 3 &middot; Advisory &amp; Co-Engineering</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Expertise, not dependency</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Expertise, not dependency.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            Sometimes you do not need a vendor; you need a senior partner who has
            shipped at national scale. We provide the architectural clarity and
            execution bandwidth to get you across the line.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:mt-14 lg:grid-cols-[2fr_3fr]">
          <ScrollReveal delay={100}>
            <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-card transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-frame">
              <div className="h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
              <CardHeader
                icon="AI Readiness Audit"
                name="Strategic Advisory"
                sub="Diagnose before you build"
                chip={<BlueChip label="2–4 WKS" />}
              />
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <p className="text-[14.5px] leading-relaxed text-inkSoft">
                  A focused engagement to audit your architecture and identify the
                  highest-leverage interventions.
                </p>
                <div className="mt-5 flex-1 rounded-card border border-subtle-stroke bg-primary-bg">
                  <p className="border-b border-dashed border-lineSoft px-4 py-2.5 font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                    Deliverables &middot; yours to keep
                  </p>
                  <ul className="divide-y divide-lineSoft">
                    {deliverables.map((item) => (
                      <li key={item.num} className="flex items-center gap-3 px-4 py-3">
                        <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
                          {item.num}
                        </span>
                        <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                          <DynamicSketchIcon text={item.icon} className="h-[13px] w-[13px] text-blue" />
                        </span>
                        <span className="text-[13.5px] font-medium leading-snug text-ink">
                          {item.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-subtle-stroke bg-white shadow-card transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-frame">
              <div className="h-[3px] bg-gradient-to-r from-blue/70 via-blue/30 to-transparent" aria-hidden />
              <CardHeader
                icon="Careers"
                name="Dedicated Engineering Squads"
                sub="Our talent, your stand-ups"
                chip={<BlueChip label="1 + 4" />}
              />
              <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                <p className="max-w-[38em] text-[14.5px] leading-relaxed text-inkSoft">
                  Senior data engineers, ML researchers, and platform architects
                  operating inside your sprints.
                </p>

                <div className="mt-5 rounded-card border border-subtle-stroke bg-primary-bg px-4 pb-4 pt-5">
                  <div className="mx-auto flex w-fit items-center gap-2.5 rounded-[10px] border border-blue-border bg-blue-subtle px-3.5 py-2 shadow-card">
                    <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <DynamicSketchIcon text="Sovereign Blueprint" className="h-[14px] w-[14px] text-blue" />
                    </span>
                    <span>
                      <span className="block font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                        1&times; Principal Architect
                      </span>
                      <span className="block text-[11px] text-inkSoft">The accountable DHIRA lead</span>
                    </span>
                    <span className="ml-1 inline-flex shrink-0 items-center rounded-[6px] border border-blue-border bg-white px-1.5 py-[2px] font-mono text-[7.5px] font-bold tracking-[0.06em] text-blue">
                      LEAD
                    </span>
                  </div>
                  <SquadFan />
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {squad.map((member) => (
                      <span
                        key={member.role}
                        className="flex flex-col items-center gap-1.5 rounded-[8px] border border-subtle-stroke bg-white px-2 py-2.5 text-center shadow-card"
                      >
                        <DynamicSketchIcon text={member.icon} className="h-[14px] w-[14px] text-inkSoft" />
                        <span className="font-mono text-[8.5px] uppercase tracking-[0.05em] text-inkSoft">
                          {member.role}
                        </span>
                      </span>
                    ))}
                  </div>
                  <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-eyebrow text-overcast">
                    Up to 4 senior / mid engineers &middot; inside your sprints
                  </p>
                </div>

                <div className="mt-auto flex items-start gap-3 border-t border-dashed border-lineSoft pt-4">
                  <span className="mt-[5px] h-2 w-2 shrink-0 rounded-[2px] bg-blue" aria-hidden />
                  <p className="text-[14px] font-medium leading-relaxed text-ink">
                    Answerable for shipped code and outcomes, not logged hours. When the
                    engagement ends, the knowledge and lineage stay with you.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
