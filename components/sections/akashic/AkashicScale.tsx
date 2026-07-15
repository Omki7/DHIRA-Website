"use client";

/*
 * [10] Proven at Scale — Not a Pilot.
 * Deployment figures are real (see AGENTS.md Rule 4: 5.75B+ learning
 * sessions and 4M+ clearances match the home page's scale stats; 187M+
 * enrolments and 135 languages come from the content script).
 * NOTE: the content script marks this section's status as OPEN — confirm
 * final figures before ship.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import useCountUp from "@/hooks/useCountUp";

const deployments = [
  {
    tag: "National education platform",
    stats: [
      { figure: "5.75B+", label: "learning sessions delivered" },
      { figure: "187M+", label: "enrolments managed" },
    ],
    line: "One governed view, across every state it runs in.",
  },
  {
    tag: "Workforce platform",
    stats: [
      { figure: "4M+", label: "cross-border clearances processed" },
      { figure: "135", label: "languages supported" },
    ],
    line: "One system, not a patchwork of regional tools.",
  },
];

function Stat({ figure, label, delay }: { figure: string; label: string; delay: number }) {
  const { ref, display } = useCountUp(figure, { duration: 1400, delay });
  return (
    <div ref={ref}>
      <div className="text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[40px]">
        {display}
      </div>
      <div className="mt-2 max-w-[12em] text-[13px] leading-snug text-inkSoft">{label}</div>
    </div>
  );
}

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

export default function AkashicScale() {
  return (
    <section id="scale" className="scroll-mt-24 border-t border-lineSoft bg-primary-bg">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow">
            <span className="text-overcast">[10]</span>
            <span className="text-inkSoft">&nbsp;&nbsp;Proven at scale</span>
          </p>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md">
            Live systems. National scale. Not a demo environment.
          </h2>
          <p className="mt-5 max-w-[34em] text-lg leading-relaxed text-secondary-text">
            Akashic runs national infrastructure today. Not a pilot, not a reference
            architecture: production systems, serving citizens, under audit.
          </p>
        </ScrollReveal>

        <div className="mx-auto mt-14 grid max-w-[1100px] gap-4 md:grid-cols-2 md:gap-5 lg:mt-16">
          {deployments.map((d, i) => (
            <ScrollReveal key={d.tag} delay={i * 90}>
              <div className="h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
                <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
                <div className="p-6 md:p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" />
                    <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                      Live &middot; {d.tag}
                    </span>
                    <PanelSpark />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-6">
                    {d.stats.map((s, j) => (
                      <Stat key={s.label} figure={s.figure} label={s.label} delay={j * 150} />
                    ))}
                  </div>
                  <p className="mt-6 border-t border-subtle-stroke pt-4 text-[14px] font-medium text-ink">
                    {d.line}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <div className="mx-auto mt-14 max-w-[36em] text-center lg:mt-16">
            <p className="text-xl font-semibold leading-snug tracking-tight text-ink md:text-2xl">
              Run at scale by the same team that will deliver your rollout.
            </p>
            <p className="mt-2.5 text-lg text-inkSoft">
              Not a comparable platform. The one on this page.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
