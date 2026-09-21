"use client";

/*
 * [06] Proven at Scale — Tested where the numbers are real.
 * Rebuilt Jul 2026 from three KPI-cards-on-tint (each carrying a decorative
 * sparkline — invented trend, against Rule 4) into the page's hairline
 * case-ledger idiom: one indexed row per engagement model on a shared dashed
 * axis, count-up hero figure anchored left, outcome as the payoff, status at
 * the base. Closes with a thin strip of named, verifiable institutional proof
 * (constitution proof points), so the section carries an institutional trust
 * mark and not only figures. Figures per Rule 4 match ProvenAtScale / the home
 * page stats.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
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

/* Verifiable institutional proof — from the brand proof points, not invented. */
const trustMarks = [
  "National-scale DPI delivery, India",
  "Maha Hackathon 2025 winner",
  "Telangana AI Rising 2025 winner",
  "Offices: New York · Hyderabad · Bangalore",
];

function HeroFigure({ fig, label, isStatic }: { fig: string; label: string; isStatic?: boolean }) {
  const { ref, display } = useCountUp(fig, { duration: 1500 });
  return (
    <div ref={ref}>
      <div className="text-[38px] font-semibold leading-[0.95] tracking-tighter text-ink md:text-[46px]">
        {isStatic ? fig : display}
      </div>
      <div className="mt-2 text-[13.5px] leading-snug text-inkSoft">{label}</div>
    </div>
  );
}

export default function DeliveryProven() {
  return (
    <section id="proven-at-scale" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[06]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Proven at scale</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ One per model</span>
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

        {/* Case ledger — one indexed row per model on a shared dashed axis */}
        <div className="mt-12 border-t border-lineSoft lg:mt-14">
          {cases.map((c, idx) => (
            <ScrollReveal key={c.model} delay={100 + idx * 90}>
              <div className="grid grid-cols-1 items-baseline gap-6 border-b border-dashed border-lineSoft py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_auto] md:gap-10 lg:py-9">
                {/* left — engagement identity */}
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px] border border-blue/20 bg-gradient-to-br from-[#E4EAFF] to-[#D4DEFF] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                    <DynamicSketchIcon text={c.sectorIcon} className="h-[15px] w-[15px] text-blue" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] font-bold uppercase tracking-[0.08em] text-blue">
                      Model {c.model}
                    </p>
                    <p className="mt-1 text-[16px] font-semibold tracking-tight text-ink">
                      {c.engagement}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-tertiary-text">{c.sector}</p>
                  </div>
                </div>

                {/* middle — the figure + outcome */}
                <div>
                  <HeroFigure fig={c.hero.fig} label={c.hero.label} isStatic={c.hero.static} />
                  {c.sub && (
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="font-mono text-[15px] font-semibold tracking-tight text-ink">
                        {c.sub.fig}
                      </span>
                      <span className="text-[12.5px] text-inkSoft">{c.sub.label}</span>
                    </div>
                  )}
                  <p className="mt-4 max-w-[26em] text-[15px] font-medium leading-snug text-ink">
                    {c.outcome}
                  </p>
                </div>

                {/* right — status */}
                <div className="md:justify-self-end md:text-right">
                  <span className="inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-inkSoft">
                    <span
                      className={`h-[5px] w-[5px] rounded-full ${
                        c.live ? "bg-blue animate-[ps-pulse_2s_infinite]" : "bg-overcast"
                      }`}
                      aria-hidden
                    />
                    {c.status}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Institutional trust strip — named, verifiable proof */}
        <ScrollReveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
              On the record
            </span>
            {trustMarks.map((mark) => (
              <span key={mark} className="flex items-center gap-2 text-[13px] font-medium text-inkSoft">
                <span className="h-[5px] w-[5px] shrink-0 rotate-45 bg-blue/50" aria-hidden />
                {mark}
              </span>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={220}>
          <p className="mt-8 border-t border-dashed border-lineSoft pt-5 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            Same team, same platform, same standard &middot; whichever model you engage
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
