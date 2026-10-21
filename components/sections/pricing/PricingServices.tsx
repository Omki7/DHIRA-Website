/*
 * [05] Services and [06] How to buy: two short registers in the same row
 * grammar (name, one line, how it is billed or where it leads). Kept as two
 * sections because they answer two questions: what the people cost, and
 * which door the purchase goes through. Copy is DRAFT
 * (lib/pricingSections.ts). How to buy is the one register that differs
 * between /pricing and /in/pricing, so it takes the page's region.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { PricingPage } from "@/content/pages/pricing";
import type { Region } from "@/lib/region";

type Row = { name: string; line: string; billing?: string; href?: string; cta?: string };

const pad = (n: number) => String(n).padStart(2, "0");

function Register({ rows }: { rows: Row[] }) {
  return (
    <ul className="mt-12 border-t border-lineSoft lg:mt-16">
      {rows.map((row, index) => (
        <li
          key={row.name}
          className="grid gap-2 border-b border-lineSoft py-6 lg:grid-cols-[56px_minmax(0,16rem)_1fr_minmax(0,15rem)] lg:items-baseline lg:gap-8"
        >
          <span className="font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
          <span className="text-[18px] font-semibold tracking-[-0.01em] text-ink">{row.name}</span>
          <span className="text-pretty text-[15px] leading-relaxed text-secondary-text">{row.line}</span>
          {row.billing && <span className="font-mono text-[11px] uppercase tracking-eyebrow text-ink lg:text-right">{row.billing}</span>}
          {row.href && row.cta && (
            <Link
              href={row.href}
              className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover lg:justify-end"
            >
              {row.cta}
              <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
                &rarr;
              </span>
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export function PricingServices({ content: SERVICES_PRICING }: { content: PricingPage["services"] }) {
  return (
    <section id="services" className="scroll-mt-24 bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader
          num="05"
          label={SERVICES_PRICING.label}
          setup={SERVICES_PRICING.setup}
          payoff={SERVICES_PRICING.payoff}
          lede={SERVICES_PRICING.lede}
        >
          <Link
            href={SERVICES_PRICING.cta.href}
            className="group mt-6 inline-flex items-center gap-1.5 text-[15px] font-medium text-blue transition-colors duration-150 hover:text-blue-hover"
          >
            {SERVICES_PRICING.cta.label}
            <span aria-hidden className="transition-transform duration-250 ease-settle group-hover:translate-x-0.5">
              &rarr;
            </span>
          </Link>
        </SectionHeader>
        <ScrollReveal delay={80}>
          <Register rows={SERVICES_PRICING.items} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}

export function PricingBuy({ region, content: HOW_TO_BUY }: { region: Region; content: PricingPage["howToBuy"] }) {
  return (
    <section id="how-to-buy" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num="06" label={HOW_TO_BUY.label} setup={HOW_TO_BUY.setup} payoff={HOW_TO_BUY.payoff} />
        <ScrollReveal delay={80}>
          <Register rows={HOW_TO_BUY.routes[region]} />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
