"use client";

/*
 * [01] Plans, and the page's opening (no hero since 15 Oct 2026, user: crisp
 * and to the point), so its title is the h1. Under the lede, one row: the
 * term switch (the workbook's pay as you go, 1 and 3 year terms) and the
 * region line with its link to the other version. Then the founder's four
 * plans as hairline-ruled columns on white, never cards on a grey canvas
 * (the banned 2010 dashboard shape). Each column: its figure (the same five
 * modules, filled to the plan's capacity), audience, name, price on the
 * chosen term, summary, the workbook's headline limits, one action. No
 * "most popular" mark. Prices are PLACEHOLDERS (lib/pricingSections.ts).
 */

import { useState } from "react";
import Link from "next/link";
import PlanFigure from "@/components/demos/pricing/PlanFigure";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { PLANS, PRICING_INTRO, PRICING_REGION, TERMS, planPrice, type TermId } from "@/lib/pricingSections";
import { REGIONS, regionPath, type Region } from "@/lib/region";

const pad = (n: number) => String(n).padStart(2, "0");

/* Column rules: two columns from sm, four from lg, a hairline between. */
const COLUMN = ["", "sm:border-l sm:pl-6", "lg:border-l lg:pl-6", "sm:border-l sm:pl-6"];

function TermSwitch({ term, onChange }: { term: TermId; onChange: (term: TermId) => void }) {
  return (
    <div role="radiogroup" aria-label="Billing term" className="inline-flex rounded-btn border border-subtle-stroke bg-primary-bg p-1">
      {TERMS.map((option) => {
        const on = option.id === term;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={on}
            onClick={() => onChange(option.id)}
            className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-[6px] px-3 text-[14px] font-medium transition-colors duration-150 sm:px-3.5 ${
              on ? "bg-background text-ink shadow-card" : "text-secondary-text hover:text-ink"
            }`}
          >
            {option.label}
            {option.save && (
              <span className={`font-mono text-[10.5px] uppercase tracking-eyebrow ${on ? "text-blue" : "text-overcast"}`}>
                <span className="hidden sm:inline">Save </span>
                <span className="sm:hidden">&minus;</span>
                {option.save}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function PricingPlans({ region }: { region: Region }) {
  const [term, setTerm] = useState<TermId>("monthly");
  const billing = TERMS.find((option) => option.id === term)?.billing ?? "";
  const other: Region = region === "in" ? "intl" : "in";
  const copy = PRICING_REGION[region];

  return (
    <section id="plans" className="scroll-mt-24 bg-background pb-20 pt-8 lg:pb-28 lg:pt-10">
      <ScrollRevealRail>
        <SectionHeader
          num="01"
          label={PRICING_INTRO.label}
          setup={PRICING_INTRO.setup}
          payoff={PRICING_INTRO.payoff}
          lede={PRICING_INTRO.lede}
          titleAs="h1"
        >
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <TermSwitch term={term} onChange={setTerm} />
            <p className="sr-only" aria-live="polite">
              Prices shown {billing}
            </p>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
              <span>{copy.line}</span>
              <Link
                href={regionPath("/pricing", other)}
                hrefLang={REGIONS[other].hreflang}
                className="group inline-flex items-center gap-1 text-blue transition-colors duration-150 hover:text-blue-hover"
              >
                {copy.other}
                <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
                  &rarr;
                </span>
              </Link>
            </p>
          </div>
        </SectionHeader>

        <div className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {PLANS.map((plan, index) => {
            const enterprise = plan.id === "enterprise";
            return (
              <ScrollReveal
                key={plan.id}
                delay={index * 60}
                className={`flex flex-col border-b border-lineSoft py-8 sm:pr-6 lg:border-b-0 lg:py-10 ${COLUMN[index]}`}
              >
                <article id={plan.id} className="flex h-full scroll-mt-28 flex-col">
                  <PlanFigure tier={plan.tier} />
                  <p className="mt-6 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
                    [{pad(index + 1)}]&nbsp;&nbsp;{plan.audience}
                  </p>
                  <h2 className="mt-3 text-[28px] font-semibold leading-none tracking-[-0.03em] text-ink">{plan.name}</h2>

                  <p className="mt-5 flex items-baseline gap-2 text-ink">
                    {enterprise && <span className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">From</span>}
                    <span className="text-[36px] font-semibold leading-none tracking-[-0.03em] tabular-nums">{planPrice(plan.id, term, region)}</span>
                  </p>
                  <p className="mt-2 text-[13px] text-secondary-text">
                    {enterprise ? "per month, annual agreement" : billing}
                    {copy.tax}
                  </p>

                  <p className="mt-5 text-pretty text-[15px] leading-relaxed text-secondary-text">{plan.summary}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-dashed border-lineSoft pt-5">
                    {plan.includes.map((item) => (
                      <li key={item} className="grid grid-cols-[16px_1fr] gap-2 text-[14.5px] leading-snug text-ink">
                        <span aria-hidden className="mt-[0.5em] h-[5px] w-[5px] rounded-[1px] bg-blue" />
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <Link href="#talk-to-our-team" className={`${enterprise ? "btn-secondary" : "btn-primary"} w-full`}>
                      {enterprise ? "Talk to our team" : `Start with ${plan.name}`}
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
