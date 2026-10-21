/*
 * [05] Services and [06] How to buy. Kept as two sections because they
 * answer two questions: what the people cost, and which door the purchase
 * goes through. Redesigned 21 Oct 2026 so the two no longer share one row
 * grammar with [03]:
 * - Services is a rate card: three labelled columns (engagement, what you
 *   get, how it is billed), the billing set in ink at reading size, not
 *   in wrapped mono capitals;
 * - How to buy is four doors side by side under one ink rule, the
 *   procurement pack's door carrying its one link.
 * Copy is DRAFT (content/pages/pricing.ts).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionLink from "@/components/ui/SectionLink";
import type { PricingPage } from "@/content/pages/pricing";

const pad = (n: number) => String(n).padStart(2, "0");

const HEAD = "font-mono text-[11px] font-normal uppercase tracking-eyebrow text-overcast";

/* One door, one rule: stacked on phones, two by two from sm, four in a
   row from lg. */
const DOOR = [
  "",
  "border-t sm:border-l sm:border-t-0 sm:pl-7",
  "border-t lg:border-l lg:border-t-0 lg:pl-7",
  "border-t sm:border-l sm:pl-7 lg:border-t-0",
];

export function PricingServices({ content }: { content: PricingPage["services"] }) {
  const { columns } = content;
  return (
    <section id="services" className="scroll-mt-24 bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="05" label={content.label} setup={content.setup} payoff={content.payoff} lede={content.lede}>
          <SectionLink href={content.cta.href}>{content.cta.label}</SectionLink>
        </SectionHeader>

        <ScrollReveal delay={80}>
          <table className="mt-12 w-full border-collapse border-t border-ink/80 text-left lg:mt-14 lg:border-t-0">
            <thead className="hidden lg:table-header-group">
              <tr className="border-b border-ink/80">
                <th scope="col" className={`w-[30%] pb-3 ${HEAD}`}>{columns.name}</th>
                <th scope="col" className={`pb-3 ${HEAD}`}>{columns.line}</th>
                <th scope="col" className={`w-[24%] pb-3 text-right ${HEAD}`}>{columns.billing}</th>
              </tr>
            </thead>
            <tbody>
              {content.items.map((item, index) => (
                <tr key={item.name} className="block border-b border-lineSoft py-5 lg:table-row lg:py-0">
                  <th scope="row" className="block text-left font-normal lg:table-cell lg:py-6 lg:pr-8 lg:align-baseline">
                    <span className="mr-4 font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                    <span className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{item.name}</span>
                  </th>
                  <td className="mt-2 block text-pretty text-[15px] leading-relaxed text-secondary-text lg:mt-0 lg:table-cell lg:py-6 lg:pr-8 lg:align-baseline">{item.line}</td>
                  <td className="mt-3 block text-[15px] font-medium text-ink lg:mt-0 lg:table-cell lg:py-6 lg:text-right lg:align-baseline">
                    <span className="sr-only lg:hidden">{columns.billing}: </span>
                    {item.billing}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function PricingBuy({ content }: { content: PricingPage["howToBuy"] }) {
  return (
    <section id="how-to-buy" className="scroll-mt-24 border-t border-lineSoft bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="06" label={content.label} setup={content.setup} payoff={content.payoff} />
        <ScrollReveal delay={80}>
          <ol className="mt-12 grid border-t border-ink/80 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
            {content.routes.map((route, index) => (
              <li
                key={route.name}
                className={`flex flex-col border-lineSoft py-7 sm:pr-7 lg:pb-2 ${DOOR[index % 4]}`}
              >
                <span className="font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                <h3 className="mt-3 text-[20px] font-semibold tracking-[-0.015em] text-ink">{route.name}</h3>
                <p className="mt-2 text-pretty text-[15px] leading-relaxed text-secondary-text">{route.line}</p>
                {route.href && route.cta && (
                  <Link
                    href={route.href}
                    className="group mt-4 inline-flex min-h-11 items-center gap-2 self-start text-[15px] font-medium text-ink underline decoration-line underline-offset-[6px] transition-colors duration-250 ease-settle hover:text-blue hover:decoration-current"
                  >
                    {route.cta}
                    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-4 w-4 transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transform-none" aria-hidden>
                      <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
