/*
 * [03] In every plan: the founder's eight controls, which "ship in every
 * edition, not as add-ons". This section owns the claim that security is
 * never a tier, so it draws it (redesigned 21 Oct 2026): the four plans
 * stand in a row, each drops a stem into one shared layer, and the eight
 * controls sit inside that layer, the same layer under every plan. The
 * same four-column grid as [01], so the plans sit where the reader just
 * saw them. Numbered rather than ticked (Rule 2). Below lg the plan row
 * drops away and the layer reads as a list under its label.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Plan, PricingPage } from "@/content/pages/pricing";

const pad = (n: number) => String(n).padStart(2, "0");

export default function PricingIncluded({ content, plans }: { content: PricingPage["everyPlan"]; plans: Plan[] }) {
  return (
    <section id="included" className="scroll-mt-24 border-t border-lineSoft bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <ScrollRevealRail>
        <SectionHeader num="03" label={content.label} setup={content.setup} payoff={content.payoff} lede={content.lede} />

        <ScrollReveal delay={80} className="mt-12 lg:mt-14">
          <div aria-hidden className="hidden grid-cols-4 lg:grid">
            {plans.map((plan) => (
              <div key={plan.id} className="px-7">
                <p className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{plan.name}</p>
                <span className="relative ml-[3px] mt-3 block h-7 w-px bg-blue">
                  <span className="absolute -left-[3px] top-0 h-[7px] w-[7px] rounded-full bg-blue" />
                </span>
              </div>
            ))}
          </div>

          <div className="rounded-outer border border-blue-border bg-depth">
            <p className="text-balance border-b border-blue-border px-6 py-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft lg:px-7">{content.rail}</p>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4">
              {content.controls.map((control, index) => (
                <li
                  key={control.title}
                  className={`border-blue-border px-6 py-6 lg:px-7 ${index > 0 ? "border-t" : ""} ${index === 1 ? "sm:border-t-0" : ""} ${index % 2 === 1 ? "sm:border-l" : ""} ${
                    index % 4 !== 0 ? "lg:border-l" : "lg:border-l-0"
                  } ${index < 4 ? "lg:border-t-0" : "lg:border-t"}`}
                >
                  <span className="font-mono text-[11px] tracking-eyebrow text-overcast">{pad(index + 1)}</span>
                  <span className="mt-3 block text-balance text-[16px] font-semibold leading-snug tracking-[-0.01em] text-ink">{control.title}</span>
                  <span className="mt-1.5 block text-pretty text-[14px] leading-snug text-secondary-text">{control.caption}</span>
                </li>
              ))}
            </ol>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
