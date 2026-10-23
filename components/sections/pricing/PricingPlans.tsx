"use client";

/*
 * [01] Plans, and the page's opening (no hero since 15 Oct 2026, user), so
 * its title is the h1. Redesigned 21 Oct 2026 (user: "feels legacy"), after
 * measuring Vercel, Linear, Cursor, Claude, Supabase and Notion: the plans
 * sit in the first screen, prices are large and light, each plan's action
 * sits right under its price, and every price moves with one term switch.
 *
 * One frame, not four floating cards (the banned 2010 shape):
 * - the capacity line across the top, stepping up at each column edge
 *   (demos/pricing/CapacityLine), the page's one drawing of its claim;
 * - four columns on hairlines: name, audience, price on the chosen term
 *   (the list price struck through and the yearly saving when a term saves
 *   anything), the action, then four headline limits in the same order on
 *   every plan so the rows read across;
 * - the foundation along the bottom, the same five modules under all four
 *   plans (homepage [03] stands its solutions on the same slab).
 * Enterprise is the one column on a tinted ground and carries the one
 * filled button: a different footprint, not a "most popular" mark, which
 * would be an invented figure (Rule 4). Prices are PLACEHOLDERS
 * (content/pages/pricing.ts).
 */

import Link from "next/link";
import type { KeyboardEvent } from "react";
import CapacityLine from "@/components/demos/pricing/CapacityLine";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PlaceholderPrices, PricingPage, Term } from "@/content/pages/pricing";
import { listPrice, planPrice, yearlySaving } from "@/lib/pricing";
import { usePricingTerm } from "./PricingTerm";

const pad = (n: number) => String(n).padStart(2, "0");

/* One column, one rule: stacked on phones, two by two from sm, four in a
   row from lg. */
const COLUMN = [
  "",
  "border-t sm:border-l sm:border-t-0",
  "border-t lg:border-l lg:border-t-0",
  "border-t sm:border-l lg:border-t-0",
];

function TermSwitch({ terms: TERMS, labels }: { terms: Term[]; labels: PricingPage["planCopy"] }) {
  const { term, setTerm } = usePricingTerm();
  const index = TERMS.findIndex((option) => option.id === term);

  // A radio group moves with the arrow keys and takes one tab stop.
  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : event.key === "ArrowLeft" || event.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = TERMS[(index + step + TERMS.length) % TERMS.length];
    setTerm(next.id);
    event.currentTarget.querySelector<HTMLButtonElement>(`[data-term="${next.id}"]`)?.focus();
  };

  return (
    <div role="radiogroup" aria-label={labels.termLabel} onKeyDown={onKeyDown} className="inline-flex rounded-btn border border-subtle-stroke bg-primary-bg p-1">
      {TERMS.map((option) => {
        const on = option.id === term;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on ? 0 : -1}
            data-term={option.id}
            onClick={() => setTerm(option.id)}
            className={`inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-[7px] border px-3.5 text-[14px] font-medium transition-colors duration-150 ${
              on ? "border-subtle-stroke bg-background text-ink" : "border-transparent text-secondary-text hover:text-ink"
            }`}
          >
            {option.label}
            {option.save && (
              <span
                className={`rounded-micro border px-1.5 py-px font-mono text-[10.5px] tracking-[0.04em] transition-colors duration-150 ${
                  on ? "border-blue-border bg-blue-subtle text-blue" : "border-transparent text-overcast"
                }`}
              >
                &minus;{option.save}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* "$2,125" set as a small raised dollar sign before large, light figures.
   The figures re-enter on every change of term (`.pr-tick`). */
function Price({ value }: { value: string }) {
  const amount = value.replace(/^\$/, "");
  return (
    <span className="inline-flex items-start text-ink">
      <span className="mr-0.5 mt-[7px] font-heading text-[22px] font-medium leading-none">$</span>
      <span key={amount} className="pr-tick font-heading text-[52px] font-medium leading-none tracking-[-0.045em] tabular-nums">
        {amount}
      </span>
    </span>
  );
}

function Foundation({ copy }: { copy: PricingPage["planCopy"]["foundation"] }) {
  return (
    <div className="border-t border-blue-border bg-depth px-6 py-5 lg:flex lg:items-center lg:gap-8 lg:px-7">
      <p className="shrink-0 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">{copy.label}</p>
      <ol className="mt-3 flex flex-col gap-y-2 lg:mt-0 lg:flex-row lg:flex-wrap lg:items-center">
        {copy.modules.map((module, i) => (
          <li key={module} className="flex items-center text-[14px] font-medium text-ink">
            {i > 0 && <span aria-hidden className="mx-3 hidden h-px w-7 bg-blue-border lg:block" />}
            <span aria-hidden className="mr-2 h-[7px] w-[7px] rounded-full bg-blue" />
            {module}
          </li>
        ))}
      </ol>
      <Link
        href={copy.controlsHref}
        className="group mt-4 inline-flex shrink-0 items-center gap-2 text-[14px] font-medium text-ink underline decoration-line underline-offset-[5px] transition-colors duration-200 ease-settle hover:text-blue hover:decoration-current lg:ml-auto lg:mt-0"
      >
        {copy.controls}
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden>
          <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </div>
  );
}

export default function PricingPlans({
  content,
  prices,
}: {
  content: Pick<PricingPage, "intro" | "plans" | "terms" | "planCopy">;
  prices: PlaceholderPrices;
}) {
  const { intro, plans: PLANS, terms: TERMS, planCopy: labels } = content;
  const { term } = usePricingTerm();
  const billing = TERMS.find((option) => option.id === term)?.billing ?? "";

  return (
    <section id="plans" className="scroll-mt-24 bg-background pb-16 pt-8 lg:pb-24 lg:pt-10">
      <ScrollRevealRail>
        <SectionHeader num="01" label={intro.label} setup={intro.setup} payoff={intro.payoff} lede={intro.lede} titleAs="h1">
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <TermSwitch terms={TERMS} labels={labels} />
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{labels.currency}</p>
            <p className="sr-only" aria-live="polite">
              {labels.pricesShown} {billing}
            </p>
          </div>
        </SectionHeader>

        <ScrollReveal delay={60}>
          <div className="mt-12 overflow-hidden rounded-outer border border-subtle-stroke bg-background lg:mt-14">
            <CapacityLine {...labels.capacity} />

            <div className="grid border-subtle-stroke sm:grid-cols-2 lg:grid-cols-4 lg:border-t-0">
              {PLANS.map((plan, index) => {
                const enterprise = plan.id === "enterprise";
                const saving = enterprise ? null : yearlySaving(prices, plan.id, term);
                return (
                  <article
                    key={plan.id}
                    id={plan.id}
                    className={`flex scroll-mt-28 flex-col border-subtle-stroke px-6 pb-8 pt-7 lg:px-7 lg:pt-5 ${COLUMN[index]} ${enterprise ? "bg-primary-bg" : ""}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h2 className="text-[22px] font-semibold leading-none tracking-[-0.02em] text-ink">{plan.name}</h2>
                      <span aria-hidden className="font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                    </div>
                    <p className="mt-2 text-[14px] leading-snug text-secondary-text">{plan.audience}</p>

                    <div className="mt-8">
                      <p className="flex items-end gap-3">
                        {enterprise && (
                          <span className="mb-[9px] font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{labels.from}</span>
                        )}
                        <Price value={planPrice(prices, plan.id, term)} />
                        {saving && (
                          <s className="mb-[7px] text-[15px] tabular-nums text-overcast decoration-overcast/70">
                            <span className="sr-only">{labels.listPrice} </span>
                            {listPrice(prices, plan.id)}
                          </s>
                        )}
                      </p>
                      <p className="mt-3 text-[13px] leading-snug text-secondary-text">{enterprise ? labels.enterpriseBilling : billing}</p>
                      <p className="mt-1 min-h-[20px] text-[13px] font-medium leading-snug text-blue">
                        {saving && `${labels.savesPrefix} ${saving} ${labels.savesSuffix}`}
                      </p>
                    </div>

                    <Link href={labels.ctaHref} className={`${enterprise ? "btn-primary" : "btn-secondary"} mt-6 h-10 w-full`}>
                      {enterprise ? labels.enterpriseCta : `${labels.startWith} ${plan.name}`}
                    </Link>

                    <ul className="mt-7 border-t border-subtle-stroke">
                      {plan.capacity.map((limit) => (
                        <li key={limit.label} className="flex min-h-[48px] items-baseline gap-2 border-b border-dashed border-lineSoft py-3 text-[14px] leading-snug last:border-b-0">
                          <span className="shrink-0 font-semibold tabular-nums text-ink">{limit.value}</span>
                          <span className="text-secondary-text">{limit.label}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>

            <Foundation copy={labels.foundation} />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
