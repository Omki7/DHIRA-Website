"use client";

/*
 * [06] Proof at Scale — Built by the National-Platform Team.
 * Three count-up deployment panels (CoWIN / DIKSHA / eMigrate figures as
 * supplied in the content script) and the country-to-company pivot line.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

const panels = [
  {
    figure: "1.89 Crore",
    label: "Students",
    line: "One real-time national dashboard. DIKSHA, Ministry of Education.",
  },
  {
    figure: "3.87 Lakh",
    label: "Emigrations",
    line: "Tracked, visualised, and acted on. eMigrate, Ministry of External Affairs.",
  },
  {
    figure: "2 Billion",
    label: "Vaccinations",
    line: "End-to-end data infrastructure. CoWIN / U-WIN.",
  },
];

function Stat({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure, { duration: 1500 });
  return (
    <div ref={ref} className="whitespace-nowrap text-[38px] font-semibold leading-none tracking-tighter text-ink md:text-[44px]">
      {display}
    </div>
  );
}

export default function EisProof() {
  return (
    <section id="proof" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[07]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proof at scale</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Public record</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            Built by the team behind India&rsquo;s largest data platforms.
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            The team behind Akashic EIS built the data infrastructure for CoWIN,
            DIKSHA, eMigrate, and Poshan Tracker: national systems where the
            numbers are public record and the stakes allow no guesswork.
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
                    <LiveChip label="NATIONAL" />
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
          <p className="mt-14 max-w-[26em] text-[26px] font-semibold leading-snug tracking-tight text-ink md:text-[30px] lg:mt-16">
            If we can give a ministry a live view of an entire country, we can give
            your leadership team a live view of{" "}
            <span className="relative inline-block whitespace-nowrap">
              your business.
              <span className="absolute -bottom-[0.04em] left-0 h-[0.09em] w-full rounded-full bg-blue/35" aria-hidden />
            </span>
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
