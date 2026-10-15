/*
 * [03] In every plan: the founder's eight controls, which "ship in every
 * edition, not as add-ons". A two-column numbered register on hairlines,
 * numbered rather than ticked (Rule 2). This section owns the claim that
 * security is never a tier; the compare grid points here instead of
 * repeating eight rows.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import { EVERY_PLAN } from "@/lib/pricingSections";

const pad = (n: number) => String(n).padStart(2, "0");

export default function PricingIncluded() {
  return (
    <section id="included" className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <ScrollRevealRail>
        <SectionHeader num="03" label={EVERY_PLAN.label} setup={EVERY_PLAN.setup} payoff={EVERY_PLAN.payoff} lede={EVERY_PLAN.lede} />

        <ScrollReveal delay={80}>
          <ol className="mt-12 grid border-t border-lineSoft lg:mt-16 lg:grid-cols-2 lg:gap-x-16">
            {EVERY_PLAN.controls.map((control, index) => (
              <li key={control.title} className="grid grid-cols-[44px_1fr] gap-4 border-b border-lineSoft py-5">
                <span className="pt-[5px] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                <span>
                  <span className="block text-pretty text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{control.title}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-secondary-text">{control.caption}</span>
                </span>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
