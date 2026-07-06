"use client";

/*
 * [06] Proof — Trusted With Systems That Matter.
 * Three live-deployment panels in the AkashicScale idiom: count-up figures,
 * sparkline, LIVE/COMPLETE telemetry chips. Figures per Rule 4 (5.75B+,
 * 187M+, 4M+, 135 match the home page and Akashic scale stats).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

type Panel = {
  tag: string;
  live: boolean;
  stats: { figure: string; label: string; static?: boolean }[];
};

const panels: Panel[] = [
  {
    tag: "National education platform",
    live: true,
    stats: [
      { figure: "5.75B+", label: "learning sessions" },
      { figure: "187M+", label: "enrolments" },
    ],
  },
  {
    tag: "Cross-border workforce platform",
    live: true,
    stats: [
      { figure: "4M+", label: "clearances" },
      { figure: "135", label: "languages" },
    ],
  },
  {
    tag: "State government operations",
    live: false,
    stats: [
      { figure: "Days", label: "not months, to reconcile legacy records", static: true },
    ],
  },
];

function PanelSpark() {
  return (
    <svg width="64" height="20" viewBox="0 0 64 20" fill="none" aria-hidden className="shrink-0">
      <polyline
        points="2,16 12,13 22,15 32,9 42,11 52,6 62,4"
        stroke="#3E63DD"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fl-sparkline"
        opacity="0.7"
      />
    </svg>
  );
}

function Stat({ figure, label, isStatic }: { figure: string; label: string; isStatic?: boolean }) {
  const { ref, display } = useCountUp(figure, { duration: 1400 });
  return (
    <div ref={ref}>
      <div className="whitespace-nowrap text-[30px] font-semibold leading-none tracking-tighter text-ink md:text-[34px]">
        {isStatic ? figure : display}
      </div>
      <div className="mt-2 max-w-[14em] text-[12.5px] leading-snug text-inkSoft">{label}</div>
    </div>
  );
}

export default function AboutProof() {
  return (
    <section id="proof" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proof</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ The numbers are real</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md">
            Trusted with systems that matter.
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {panels.map((panel, idx) => (
            <ScrollReveal key={panel.tag} delay={100 + idx * 90}>
              <div className="h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
                <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center gap-2.5">
                    <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                      {panel.tag}
                    </span>
                    {panel.live ? (
                      <LiveChip />
                    ) : (
                      <span className="inline-flex shrink-0 items-center rounded-[7px] border border-default-stroke bg-tertiary-bg px-2 py-1 text-[9px] font-bold tracking-[0.03em] text-secondary-text">
                        COMPLETE
                      </span>
                    )}
                  </div>
                  <div className="mt-6 flex flex-1 flex-wrap gap-x-8 gap-y-5">
                    {panel.stats.map((stat) => (
                      <Stat
                        key={stat.label}
                        figure={stat.figure}
                        label={stat.label}
                        isStatic={stat.static}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-subtle-stroke pt-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.08em] text-overcast">
                      {panel.live ? "In production" : "Delivered"}
                    </span>
                    <PanelSpark />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
