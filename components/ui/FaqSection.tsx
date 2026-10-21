/*
 * A questions section for hub pages. Every answer is readable without a
 * click (the /akashic [12] decision: no accordion). Carries FAQPage
 * structured data for exactly the answers shown, and every answer must
 * restate a claim the page already makes.
 *
 * Laid out as a split (21 Oct 2026, /pricing redesign): the eyebrow runs the
 * full width, the title, lede and one onward link hold on the left from lg
 * while the questions scroll past on the right, in named groups (a
 * taxonomy, not a heap of ten). Below lg it is one column.
 */

import FigureEyebrow from "@/components/ui/FigureEyebrow";
import JsonLd from "@/components/ui/JsonLd";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionLink from "@/components/ui/SectionLink";
import TwoToneTitle from "@/components/ui/TwoToneTitle";
import type { Cta, Faq } from "@/content/types";

export interface FaqGroup {
  heading?: string;
  items: Faq[];
}

export default function FaqSection({
  id = "faq",
  num,
  label,
  setup,
  payoff,
  lede,
  link,
  groups,
}: {
  id?: string;
  num: string;
  label: string;
  setup: string;
  payoff: string;
  lede?: string;
  link?: Cta;
  groups: FaqGroup[];
}) {
  const items = groups.flatMap((group) => group.items);
  return (
    <section id={id} className="scroll-mt-24 border-t border-lineSoft bg-background pb-16 pt-12 lg:pb-24 lg:pt-16">
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <ScrollRevealRail>
        <ScrollReveal>
          <FigureEyebrow num={num} label={label} />
        </ScrollReveal>

        <div className="mt-10 grid gap-y-12 lg:mt-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <ScrollReveal delay={80}>
                <TwoToneTitle setup={setup} payoff={payoff} />
              </ScrollReveal>
              {lede && (
                <ScrollReveal delay={140}>
                  <p className="mt-6 max-w-[30em] text-pretty text-base leading-relaxed text-inkSoft sm:text-lg">{lede}</p>
                </ScrollReveal>
              )}
              {link && (
                <ScrollReveal delay={180}>
                  <SectionLink href={link.href}>{link.label}</SectionLink>
                </ScrollReveal>
              )}
            </div>
          </div>

          <ScrollReveal delay={120} className="lg:col-span-8">
            {groups.map((group, g) => (
              <div key={group.heading ?? g} className={g > 0 ? "mt-10" : ""}>
                {group.heading && (
                  <h3 className="flex items-center gap-3 font-mono text-[11px] font-normal uppercase tracking-eyebrow text-inkSoft">
                    {group.heading}
                    <span aria-hidden className="text-overcast">{String(group.items.length).padStart(2, "0")}</span>
                  </h3>
                )}
                <dl className="mt-4 border-t border-ink/80">
                  {group.items.map((item) => (
                    <div key={item.question} className="border-b border-lineSoft py-[18px]">
                      <dt className="text-pretty text-[17px] font-semibold leading-snug tracking-[-0.01em] text-ink">{item.question}</dt>
                      <dd className="mt-1.5 max-w-[52em] text-pretty text-[15px] leading-relaxed text-secondary-text">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
