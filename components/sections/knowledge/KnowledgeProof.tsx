"use client";

/*
 * [05] Battle-Tested — Rails for the World's Largest Education System.
 * Three count-up DIKSHA panels (figures as supplied in the content script,
 * flagged there as public record) and the course-completions close line.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

const panels = [
  {
    figure: "564 Crore+",
    label: "Learning sessions",
    line: "Individual adaptive learning journeys tracked in real time across every state.",
  },
  {
    figure: "18.25 Crore",
    label: "Total enrolments",
    line: "Across 7,476 energised textbooks and 3.76 lakh e-contents on one national platform.",
  },
  {
    figure: "1.89 Crore",
    label: "Registered learners",
    line: "On a single live dashboard, visible to the Ministry of Education at state and national level.",
  },
];

function Stat({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure, { duration: 1500 });
  return (
    <div ref={ref} className="whitespace-nowrap text-[36px] font-semibold leading-none tracking-tighter text-ink md:text-[42px]">
      {display}
    </div>
  );
}

export default function KnowledgeProof() {
  return (
    <section id="proof" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[05]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proven at scale</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Public record</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The rails under the world&rsquo;s largest education system.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            This is not a concept. DIKSHA, India&rsquo;s national school education
            platform, already runs on this architecture.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {panels.map((panel, idx) => (
            <ScrollReveal key={panel.label} delay={100 + idx * 90}>
              <div className="h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
                <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                      <span className="h-[5px] w-[5px] shrink-0 rounded-full bg-blue animate-[ps-pulse_2s_infinite]" aria-hidden />
                      {panel.label}
                    </span>
                    <LiveChip label="DIKSHA" />
                  </div>
                  <div className="mt-5">
                    <Stat figure={panel.figure} />
                  </div>
                  <p className="mt-4 border-t border-dashed border-lineSoft pt-4 text-[13.5px] leading-relaxed text-inkSoft">
                    {panel.line}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <p className="mt-12 max-w-[52em] border-t border-dashed border-lineSoft pt-8 text-lg leading-relaxed text-secondary-text lg:mt-14">
            On top of this, 14.58 crore course completions have been tracked
            end-to-end: proof that the Akashic Knowledge architecture does not just
            ingest data, it closes the loop from content delivery to learning
            outcome, at national scale.
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
