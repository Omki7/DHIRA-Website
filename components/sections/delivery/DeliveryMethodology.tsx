/*
 * [03] Delivery Process — Start with the outcome, not the technology.
 * Linear 4-stage process pipeline with continuous sequence rail, clean typography, and zero box clutter.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface ProcessStage {
  num: string;
  name: string;
  action: string;
  details: string[];
}

const stages: ProcessStage[] = [
  {
    num: "01",
    name: "Understand",
    action: "Evaluate the requirement, constraints, and success metrics.",
    details: [
      "Technical environment & legacy audits",
      "Security & sovereign compliance boundaries",
      "Clear definition of required outcomes",
    ],
  },
  {
    num: "02",
    name: "Align",
    action: "Define architecture, scope, milestones, and team structure.",
    details: [
      "Technology selection & system design",
      "Milestone roadmap & delivery timeline",
      "Resource allocation & sprint cadence",
    ],
  },
  {
    num: "03",
    name: "Build & Deliver",
    action: "Execute against sprint milestones with direct accountability.",
    details: [
      "Iterative sprint development & code reviews",
      "Automated testing & security hardening",
      "Production staging & deployment verification",
    ],
  },
  {
    num: "04",
    name: "Evolve",
    action: "Scale, optimize, and maintain the system over time.",
    details: [
      "Operational telemetry & performance tuning",
      "Continuous feature iteration & upgrades",
      "Long-term knowledge transfer & code sovereignty",
    ],
  },
];

export default function DeliveryMethodology() {
  return (
    <section
      id="methodology"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Delivery process</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Linear execution lifecycle</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Start with the outcome, not the technology.
          </h2>
          <p className="mt-5 max-w-[44em] text-lg leading-relaxed text-secondary-text">
            Every engagement follows a structured delivery lifecycle designed to minimize risk, ensure technical accountability, and ship production-ready systems on schedule.
          </p>
        </ScrollReveal>

        {/* Linear Stepper Track (Unbroken Pipeline with Zero Boxy Clutter) */}
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-1 gap-8 border-t border-subtle-stroke pt-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {stages.map((stage, idx) => (
              <ScrollReveal key={stage.num} delay={80 + idx * 60}>
                <div className="flex flex-col justify-between h-full border-l-2 border-subtle-stroke pl-5 transition-colors duration-250 hover:border-blue">
                  <div>
                    <div className="flex items-baseline gap-2 font-mono">
                      <span className="text-[28px] font-bold tracking-tighter text-blue">
                        {stage.num}
                      </span>
                      <span className="text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                        Phase
                      </span>
                    </div>

                    <h3 className="mt-2 text-[21px] font-semibold tracking-tight text-ink">
                      {stage.name}
                    </h3>
                    <p className="mt-2 text-[14px] font-medium text-ink leading-snug">
                      {stage.action}
                    </p>

                    {/* Actionable milestone deliverables */}
                    <div className="mt-4 space-y-2 border-t border-dashed border-lineSoft pt-3.5">
                      {stage.details.map((d) => (
                        <div key={d} className="flex items-start gap-2 text-[13px] text-secondary-text">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue" />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-2">
                    <span className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                      Verified Milestone {stage.num}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
