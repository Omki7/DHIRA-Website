import type { ReactNode } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { EisEvidence, EisPage } from "@/content/pages/solutions-eis";
import {
  EvAction,
  EvDefinition,
  EvEntity,
  EvPermissions,
  EvPlanes,
  EvRecord,
} from "@/components/demos/mockups/eis/EisCapabilityEvidence";

/* [capabilities] — Section [03]: Governed Capabilities
 * Adheres to Section Grammar: FigureEyebrow [03] GOVERNED CAPABILITIES,
 * two-tone headline, lede directly below, ScrollRevealRail layout.
 * Displays three high-impact governed pillars:
 *   1. One Governed Golden Record
 *   2. Continuous Predictive Signals
 *   3. Four-Stage Governed Action
 */

const EVIDENCE: Record<EisEvidence, ReactNode> = {
  definition: <EvDefinition />,
  entity: <EvEntity />,
  permissions: <EvPermissions />,
  action: <EvAction />,
  planes: <EvPlanes />,
  record: <EvRecord />,
};

export default function EisCapabilities({ content }: { content: EisPage["capabilities"] }) {
  const pillars = content.pillars ?? [
    {
      tag: "Foundation",
      title: "One Governed Golden Record",
      body: "Master data unifies customers, workforce, and projects across Selling, Projects, HRMS, and Accounts. Row-level permissions are strictly enforced before any metric computes.",
      metrics: ["AMD Master Data", "Row-Level Security", "Lineage-Audited"],
      evidence: "entity" as EisEvidence,
    },
    {
      tag: "Intelligence",
      title: "Continuous Predictive Signals",
      body: "Background agents monitor the knowledge layer for margin compression, unbilled milestones, and bench exposure. Anomalies surface as prioritized risks before month-end.",
      metrics: ["Rolling 12M Model", "Margin Risk Engine", "Real-Time Triggers"],
      evidence: "definition" as EisEvidence,
    },
    {
      tag: "Execution",
      title: "Four-Stage Governed Action",
      body: "A decision is an executable, typed action with segregated duties. Once approved by a named human leader, it commits back via scoped REST APIs with complete auditability.",
      metrics: ["Human-in-the-Loop", "Policy Gate (G1)", "Idempotent Write-Back"],
      evidence: "record" as EisEvidence,
    },
  ];

  return (
    <section
      id="capabilities"
      className="relative w-full scroll-mt-24 overflow-clip bg-background pt-12 pb-16 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="GOVERNED CAPABILITIES"
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-14 lg:grid-cols-3 xl:gap-8">
          {pillars.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 90}>
              <div className="flex h-full flex-col justify-between rounded-outer border border-lineSoft bg-background p-6 transition-all duration-250 hover:border-line sm:p-7">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                      [{p.tag}]
                    </span>
                    <span className="font-mono text-[10px] text-tertiary-text">
                      0{i + 1} / 03
                    </span>
                  </div>

                  <h3 className="mt-3 text-[19px] font-semibold tracking-tight text-ink sm:text-[21px]">
                    {p.title}
                  </h3>

                  <p className="mt-2.5 text-[14px] leading-relaxed text-secondary-text">
                    {p.body}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.metrics.map((m) => (
                      <span
                        key={m}
                        className="rounded-[5px] border border-card-line bg-primary-bg px-2 py-0.5 font-mono text-[10px] text-secondary-text"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 border-t border-card-divide pt-4">
                  {EVIDENCE[p.evidence]}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
