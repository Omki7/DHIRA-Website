/*
 * A questions section for hub pages: SectionHeader, then an open two-column
 * list on hairlines, every answer readable without a click (the /akashic
 * [12] decision: no accordion). Carries FAQPage structured data for exactly
 * the answers shown. Every answer must restate a claim the page already
 * makes.
 */

import JsonLd from "@/components/ui/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";

export type FaqItem = { q: string; a: string };

const pad = (n: number) => String(n).padStart(2, "0");

export default function FaqSection({
  id = "faq",
  num,
  label,
  setup,
  payoff,
  items,
}: {
  id?: string;
  num: string;
  label: string;
  setup: string;
  payoff: string;
  items: FaqItem[];
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-lineSoft bg-background pb-20 pt-16 lg:pb-28 lg:pt-20">
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }}
      />
      <ScrollRevealRail>
        <SectionHeader num={num} label={label} setup={setup} payoff={payoff} />
        <ScrollReveal delay={80}>
          <dl className="mt-12 grid gap-x-16 lg:mt-16 lg:grid-cols-2">
            {items.map((item, index) => (
              <div key={item.q} className="grid grid-cols-[44px_1fr] gap-4 border-t border-lineSoft py-6">
                <span aria-hidden className="pt-[5px] font-mono text-[11px] tracking-eyebrow text-overcast">
                  {pad(index + 1)}
                </span>
                <div>
                  <dt className="text-pretty text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{item.q}</dt>
                  <dd className="mt-2 text-pretty text-[15px] leading-relaxed text-secondary-text">{item.a}</dd>
                </div>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
