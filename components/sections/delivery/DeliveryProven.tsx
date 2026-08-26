"use client";

/*
 * [04] Proof — Built for real-world delivery.
 * Refined telemetry command cards with live count-up stats and concise production proof points.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import useCountUp from "@/hooks/useCountUp";

interface ProofMetric {
  fig: string;
  label: string;
  context: string;
  sectorBadge: string;
  summary: string;
  telemetry: string;
}

const METRICS: ProofMetric[] = [
  {
    fig: "5.75B+",
    label: "Learning Sessions Delivered",
    context: "National Education Platform",
    sectorBadge: "Public Sector & Education",
    summary: "Multi-year sovereign platform operating continuously in nationwide production.",
    telemetry: "100k+ Concurrency",
  },
  {
    fig: "187M+",
    label: "Enrolments Managed",
    context: "Public Digital Infrastructure",
    sectorBadge: "National DPI Architecture",
    summary: "High-concurrency data pipelines and governed verification runtime across central government.",
    telemetry: "Sovereign In-Region",
  },
  {
    fig: "4M+",
    label: "Cross-Border Clearances",
    context: "Workforce & Ministry Ops",
    sectorBadge: "Ministry Infrastructure",
    summary: "Embedded securely inside regulated ministry infrastructure and border operations.",
    telemetry: "< 250ms Verification",
  },
];

function StatCard({ fig, label, context, sectorBadge, summary, telemetry }: ProofMetric) {
  const { ref, display } = useCountUp(fig, { duration: 1600 });

  return (
    <div
      ref={ref}
      className="group flex h-full flex-col justify-between rounded-2xl border border-subtle-stroke bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-border hover:shadow-frame lg:p-7"
    >
      <div>
        {/* Top Badge Bar */}
        <div className="flex items-center justify-between border-b border-dashed border-lineSoft pb-3.5">
          <span className="rounded-full bg-primary-bg px-3 py-1 font-mono text-[10px] font-bold text-inkSoft border border-subtle-stroke">
            {sectorBadge}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-eyebrow text-positive-text font-bold">
            <span className="h-1.5 w-1.5 rounded-full bg-positive animate-[ps-pulse_2s_infinite]" />
            Live
          </span>
        </div>

        {/* Giant Count-Up Number */}
        <div className="mt-6 text-4xl font-bold tracking-tight text-ink md:text-5xl lg:text-5xl group-hover:text-blue transition-colors duration-200 font-mono">
          {display}
        </div>

        {/* Metric Label & Context */}
        <h3 className="mt-2 text-base font-bold text-ink">
          {label}
        </h3>
        <p className="mt-0.5 font-mono text-[11px] font-semibold text-blue">
          {context}
        </p>

        {/* Concise Summary */}
        <p className="mt-3 text-xs leading-relaxed text-secondary-text font-sans">
          {summary}
        </p>
      </div>

      {/* Bottom Audited Telemetry Tag */}
      <div className="mt-6 flex items-center justify-between border-t border-dashed border-lineSoft pt-3.5">
        <span className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast font-medium">
          Audited Production SLA
        </span>
        <span className="rounded bg-blue-subtle px-2 py-0.5 font-mono text-[10px] font-bold text-blue">
          {telemetry}
        </span>
      </div>
    </div>
  );
}

export default function DeliveryProven() {
  return (
    <section
      id="proven-at-scale"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* Section Header */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proof</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Verified in production</span>
          </div>
          <h2 className="mt-5 text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-4xl">
            Built for real-world delivery.
          </h2>
          <p className="mt-3 max-w-[38em] text-base leading-relaxed text-secondary-text md:text-lg">
            We measure our work by outcomes, engineering quality, and the ability to deliver reliably at national scale.
          </p>
        </ScrollReveal>

        {/* 3-Card Command Center Scale Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3 lg:mt-12 lg:gap-7">
          {METRICS.map((m, idx) => (
            <ScrollReveal key={m.context} delay={100 + idx * 60}>
              <StatCard {...m} />
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}

