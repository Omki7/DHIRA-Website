"use client";

/*
 * [06] Proof at National Scale — We Have Done This Before.
 * Narrative plus three telemetry panels (count-up where parseable). Figures
 * per the content script: 12,402 this month, 10 crore+ Poshan Tracker,
 * 2-minute detection window.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

const panels = [
  {
    figure: "12402",
    format: "en-IN",
    label: "High-risk mothers",
    line: "Identified this month through on-device risk scoring.",
    chipLabel: "LIVE",
  },
  {
    figure: "10 Crore+",
    label: "Children & mothers",
    line: "Tracked nationally on Poshan Tracker, built by DHIRA.",
    chipLabel: "NATIONAL",
  },
  {
    figure: "2 Min",
    label: "Detection to alert",
    line: "Down from 4 days under traditional referral pathways.",
    chipLabel: "AT THE EDGE",
  },
];

function Stat({ figure, format }: { figure: string; format?: string }) {
  const { ref, display } = useCountUp(figure, { duration: 1500 });
  const shown = format
    ? Number(display.replace(/[^0-9.]/g, "") || 0).toLocaleString("en-IN")
    : display;
  return (
    <div ref={ref} className="whitespace-nowrap text-[38px] font-semibold leading-none tracking-tighter text-ink md:text-[44px]">
      {shown}
    </div>
  );
}

export default function LifeProof() {
  return (
    <section id="proof" className="scroll-mt-24 border-t border-lineSoft bg-white">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proof at national scale</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Already done, already running</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            We have done this before. At the scale of a country.
          </h2>
          <p className="mt-5 max-w-[42em] text-lg leading-relaxed text-secondary-text">
            Akashic Life is built by the same team that built Poshan Tracker,
            India&rsquo;s national nutrition monitoring platform, and runs on the
            same data backbone as CoWIN, which managed 2 billion+ vaccination
            records nationally. Edge intelligence is new. The discipline of turning
            fragmented, high-stakes health data into a governed, real-time national
            system is not. DHIRA has already done it.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {panels.map((panel, idx) => (
            <ScrollReveal key={panel.label} delay={100 + idx * 90}>
              <div className="h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg">
                <div className="h-[3px] bg-gradient-to-r from-blue/50 via-blue/25 to-transparent" aria-hidden />
                <div className="flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                      {panel.label}
                    </span>
                    <LiveChip label={panel.chipLabel} />
                  </div>
                  <div className="mt-5">
                    <Stat figure={panel.figure} format={panel.format} />
                  </div>
                  <p className="mt-4 border-t border-subtle-stroke pt-4 text-[13.5px] leading-relaxed text-inkSoft">
                    {panel.line}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
