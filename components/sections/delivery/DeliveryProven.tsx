"use client";

/*
 * [06] Proven at Scale — The Numbers Are Real.
 * Three live deployment case-files, one per engagement model (badged 01/02/03
 * to tie back to the page spine): hero-sized count-up figure, model + sector
 * header, outcome anchored at the base, and a telemetry footer with drawn
 * sparkline + LIVE/DELIVERED status. Figures per Rule 4 (5.75B+, 187M+, 4M+,
 * 135 match AkashicScale / the home page stats).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import { BlueChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

type Figure = { fig: string; label: string; static?: boolean };

const cases: {
  model: string;
  engagement: string;
  sector: string;
  sectorIcon: string;
  hero: Figure;
  sub?: Figure;
  outcome: string;
  status: string;
  live: boolean;
}[] = [
  {
    model: "01",
    engagement: "Akashic Deployment",
    sector: "National education platform",
    sectorIcon: "Education",
    hero: { fig: "5.75B+", label: "learning sessions delivered" },
    sub: { fig: "187M+", label: "enrolments managed" },
    outcome: "A 6-week pilot scaled to national rollout.",
    status: "In production",
    live: true,
  },
  {
    model: "02",
    engagement: "Product Engineering",
    sector: "Cross-border workforce platform",
    sectorIcon: "Workforce",
    hero: { fig: "4M+", label: "cross-border clearances" },
    sub: { fig: "135", label: "languages supported" },
    outcome: "Custom product embedded inside Ministry infrastructure.",
    status: "In production",
    live: true,
  },
  {
    model: "03",
    engagement: "Advisory",
    sector: "State government operations",
    sectorIcon: "Public Sector",
    hero: { fig: "2 wks", label: "audit engagement", static: true },
    outcome: "Legacy data reconciled in days, not months.",
    status: "Delivered",
    live: false,
  },
];

function TelemetrySpark({ live }: { live: boolean }) {
  return (
    <svg width="72" height="20" viewBox="0 0 72 20" fill="none" aria-hidden className="shrink-0">
      <polyline
        points="2,16 12,13 22,15 32,9 42,11 52,5 62,7 70,3"
        stroke={live ? "#3E63DD" : "#8E8F91"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fl-sparkline"
        opacity={live ? "0.7" : "0.45"}
      />
      {live && <circle cx="70" cy="3" r="2" fill="#3E63DD" className="animate-[ps-pulse_2s_infinite]" />}
    </svg>
  );
}

function HeroStat({ fig, label, isStatic }: { fig: string; label: string; isStatic?: boolean }) {
  const { ref, display } = useCountUp(fig, { duration: 1500 });
  return (
    <div ref={ref}>
      <div className="text-[42px] font-semibold leading-[0.95] tracking-tighter text-ink md:text-[48px]">
        {isStatic ? fig : display}
      </div>
      <div className="mt-2.5 max-w-[13em] text-[13px] leading-snug text-inkSoft">{label}</div>
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
          <p className="mt-5 max-w-[43em] text-lg leading-relaxed text-secondary-text">
            One engagement per model.
            <br />
            Each one running where the stakes are real and the numbers are not
            rounded up for a slide.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 lg:mt-14">
          {cases.map((c, idx) => (
            <ScrollReveal key={c.model} delay={100 + idx * 100}>
              <div className="group relative flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg transition-all duration-250 ease-settle hover:-translate-y-1 hover:border-blue/25 hover:shadow-frame">
                <div className="h-[3px] bg-gradient-to-r from-blue/55 via-blue/25 to-transparent" aria-hidden />
                <div className="relative flex flex-1 flex-col p-6">
                  <span
                    className="pointer-events-none absolute right-5 top-4 select-none text-[60px] font-semibold leading-none tracking-tighter text-ink/[0.045]"
                    aria-hidden
                  >
                    {c.model}
                  </span>

                  <div className="relative flex items-center justify-between">
                    <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-blue">
                      Model {c.model}
                    </span>
                    {c.live ? (
                      <BlueChip label="LIVE" />
                    ) : (
                      <span className="inline-flex shrink-0 items-center rounded-[7px] border border-default-stroke bg-tertiary-bg px-2 py-1 text-[9px] font-bold tracking-[0.03em] text-secondary-text">
                        DELIVERED
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-2.5">
                    <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                      <DynamicSketchIcon text={c.sectorIcon} className="h-[15px] w-[15px] text-blue" />
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-[15px] font-bold tracking-tight text-ink">
                        {c.engagement}
                      </div>
                      <div className="truncate text-[11px] text-tertiary-text">{c.sector}</div>
                    </div>
                  </div>

                  <div className="mt-7">
                    <HeroStat fig={c.hero.fig} label={c.hero.label} isStatic={c.hero.static} />
                  </div>

                  {c.sub && (
                    <div className="mt-4 flex items-baseline gap-2">
                      <span className="font-mono text-[16px] font-semibold tracking-tight text-ink">
                        {c.sub.fig}
                      </span>
                      <span className="text-[12.5px] text-inkSoft">{c.sub.label}</span>
                    </div>
                  )}

                  <p className="mt-auto border-t border-subtle-stroke pt-5 text-[15px] font-medium leading-snug text-ink">
                    {c.outcome}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-dashed border-lineSoft pt-3.5">
                    <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-inkSoft">
                      <span
                        className={`h-[5px] w-[5px] rounded-full ${
                          c.live ? "bg-blue animate-[ps-pulse_2s_infinite]" : "bg-overcast"
                        }`}
                        aria-hidden
                      />
                      {c.status}
                    </span>
                    <TelemetrySpark live={c.live} />
                  </div>
                </div>
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
