"use client";

/*
 * [04] Proof — Built for real-world delivery.
 * Telemetry ledger with live count-up stats and verified production deployments per Rule 4.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import useCountUp from "@/hooks/useCountUp";

const metrics = [
  {
    fig: "5.75B+",
    label: "learning sessions delivered",
    context: "National Education Platform",
    detail: "Multi-year sovereign education platform operating continuously in nationwide production.",
    status: "Live in production",
  },
  {
    fig: "187M+",
    label: "enrolments managed",
    context: "Public Digital Infrastructure",
    detail: "High-concurrency data pipelines and governed verification runtime across national departments.",
    status: "Live in production",
  },
  {
    fig: "4M+",
    label: "cross-border clearances",
    context: "Workforce Management Platform",
    detail: "Custom system embedded securely inside regulated ministry infrastructure and border control.",
    status: "Live in production",
  },
];

function StatColumn({
  fig,
  label,
  context,
  detail,
  status,
}: {
  fig: string;
  label: string;
  context: string;
  detail: string;
  status: string;
}) {
  const { ref, display } = useCountUp(fig, { duration: 1600 });
  return (
    <div
      ref={ref}
      className="flex flex-col justify-between p-6 lg:p-8"
    >
      <div>
        <div className="flex items-center justify-between border-b border-subtle-stroke pb-3">
          <span className="font-mono text-[10.5px] font-semibold uppercase tracking-eyebrow text-inkSoft">
            {context}
          </span>
          <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-eyebrow text-blue">
            <span className="h-1.5 w-1.5 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
            {status}
          </span>
        </div>

        <div className="mt-6 text-[42px] font-semibold leading-none tracking-tighter text-ink md:text-[50px]">
          {display}
        </div>
        <p className="mt-3 text-[15px] font-medium text-ink leading-snug">{label}</p>
        <p className="mt-2 text-[13.5px] leading-relaxed text-secondary-text">{detail}</p>
      </div>

      <div className="mt-6 border-t border-dashed border-lineSoft pt-3">
        <span className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
          Audited Production Outcome
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
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Built for real-world delivery.
          </h2>
          <p className="mt-5 max-w-[44em] text-lg leading-relaxed text-secondary-text">
            We measure our work by outcomes, engineering quality, and the ability to deliver reliably at national scale.
          </p>
        </ScrollReveal>

        {/* Telemetry Stat Board (Unbroken Frame with Clean Interior Hairlines) */}
        <ScrollReveal delay={120}>
          <div className="mt-12 overflow-hidden rounded-tile border border-subtle-stroke bg-white shadow-sm lg:mt-16">
            <div className="h-[3px] bg-gradient-to-r from-blue via-blue/40 to-transparent" />
            <div className="grid grid-cols-1 divide-y divide-subtle-stroke md:grid-cols-3 md:divide-y-0 md:divide-x">
              {metrics.map((m) => (
                <StatColumn key={m.context} {...m} />
              ))}
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
