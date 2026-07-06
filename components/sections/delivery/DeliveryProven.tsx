"use client";

/*
 * [06] Proven at Scale — The Numbers Are Real.
 * A live engagement ledger: count-up mono figures, per-row sparkline and
 * LIVE/COMPLETE telemetry chips, sector sketch icons. Figures per Rule 4:
 * 5.75B+ sessions, 187M+ enrolments, 4M+ clearances, and 135 languages
 * match AkashicScale / the home page stats.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

type LedgerFigure = { fig: string; label: string; static?: boolean };

const rows: {
  engagement: string;
  sector: string;
  sectorIcon: string;
  figures: LedgerFigure[];
  outcome: string;
  live: boolean;
}[] = [
  {
    engagement: "AKASHIC DEPLOYMENT",
    sector: "National education",
    sectorIcon: "Education",
    figures: [
      { fig: "5.75B+", label: "sessions" },
      { fig: "187M+", label: "enrolments" },
    ],
    outcome: "A 6-week pilot scaled to national rollout.",
    live: true,
  },
  {
    engagement: "PRODUCT ENGINEERING",
    sector: "Cross-border workforce",
    sectorIcon: "Workforce",
    figures: [
      { fig: "4M+", label: "clearances" },
      { fig: "135", label: "languages" },
    ],
    outcome: "Custom product embedded inside Ministry infrastructure.",
    live: true,
  },
  {
    engagement: "ADVISORY",
    sector: "State government survey",
    sectorIcon: "Public Sector",
    figures: [{ fig: "2-week", label: "audit", static: true }],
    outcome: "Legacy data reconciled in days, not months.",
    live: false,
  },
];

const GRID = "md:grid-cols-[200px_1.1fr_1fr_1.5fr]";

function RowSpark() {
  return (
    <svg width="52" height="16" viewBox="0 0 52 16" fill="none" aria-hidden className="shrink-0">
      <polyline
        points="2,13 10,10 18,12 26,7 34,9 42,4 50,3"
        stroke="#3E63DD"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fl-sparkline"
        opacity="0.65"
      />
    </svg>
  );
}

function Figure({ fig, label, isStatic }: { fig: string; label: string; isStatic?: boolean }) {
  const { ref, display } = useCountUp(fig, { duration: 1400 });
  return (
    <div ref={ref} className="flex items-baseline gap-1.5">
      <span className="whitespace-nowrap font-mono text-[15px] font-semibold tracking-tight text-ink">
        {isStatic ? fig : display}
      </span>
      <span className="text-[12px] text-inkSoft">{label}</span>
    </div>
  );
}

export default function DeliveryProven() {
  return (
    <section id="proven-at-scale" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proven at scale</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Live engagements</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Tested where the numbers are real.
          </h2>
        </ScrollReveal>

        <div className="mt-12 lg:mt-14">
          <ScrollReveal>
            <div
              className={`hidden gap-6 border-y border-dashed border-lineSoft py-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast md:grid ${GRID}`}
            >
              <span>Engagement</span>
              <span>Sector</span>
              <span>Scale</span>
              <span>Outcome</span>
            </div>
          </ScrollReveal>

          {rows.map((row, idx) => (
            <ScrollReveal key={row.engagement} delay={100 + idx * 100}>
              <div
                className={`grid grid-cols-1 gap-3 border-b border-subtle-stroke py-6 transition-colors duration-250 ease-settle hover:bg-primary-bg/50 md:items-center md:gap-6 md:py-7 ${GRID}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-[7px] border border-blue-border bg-blue-subtle px-2 py-1 font-mono text-[9px] font-bold tracking-[0.03em] text-blue">
                    {row.engagement}
                  </span>
                  {row.live ? (
                    <LiveChip />
                  ) : (
                    <span className="inline-flex shrink-0 items-center rounded-[7px] border border-default-stroke bg-tertiary-bg px-2 py-1 text-[9px] font-bold tracking-[0.03em] text-secondary-text">
                      COMPLETE
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] border border-subtle-stroke bg-primary-bg">
                    <DynamicSketchIcon text={row.sectorIcon} className="h-[13px] w-[13px] text-inkSoft" />
                  </span>
                  <span className="text-[15px] font-medium text-ink">{row.sector}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-y-1.5">
                    {row.figures.map((figure) => (
                      <Figure
                        key={figure.label}
                        fig={figure.fig}
                        label={figure.label}
                        isStatic={figure.static}
                      />
                    ))}
                  </div>
                  <RowSpark />
                </div>
                <p className="text-[15px] leading-relaxed text-inkSoft">{row.outcome}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            Same team, same platform, same standard &middot; whichever model you engage
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
