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

import { FigureEyebrow } from "@/shared/components/ui/FigureEyebrow";
import { JsonLd } from "@/shared/components/data-display/JsonLd";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";
import { ScrollRevealRail } from "@/shared/components/ui/ScrollRevealRail";
import { SectionLink } from "@/shared/components/ui/SectionLink";
import { TwoToneTitle } from "@/shared/components/ui/TwoToneTitle";
import type { Cta, Faq } from "@/content/types";
import styles from "./FaqSection.module.scss";

export interface FaqGroup {
  heading?: string;
  items: Faq[];
}

export interface FaqSectionProps {
  id?: string;
  num: string;
  label: string;
  setup: string;
  payoff: string;
  lede?: string;
  link?: Cta;
  groups: FaqGroup[];
}

export function FaqSection({
  id = "faq",
  num,
  label,
  setup,
  payoff,
  lede,
  link,
  groups,
}: FaqSectionProps) {
  const items = groups.flatMap((group) => group.items);
  return (
    <section id={id} className={styles.root}>
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

        <div className={styles.grid}>
          <div className={styles.aside}>
            <div className={styles.sticky}>
              <ScrollReveal delay={80}>
                <TwoToneTitle setup={setup} payoff={payoff} />
              </ScrollReveal>
              {lede && (
                <ScrollReveal delay={140}>
                  <p className={styles.lede}>{lede}</p>
                </ScrollReveal>
              )}
              {link && (
                <ScrollReveal delay={180}>
                  <SectionLink href={link.href}>{link.label}</SectionLink>
                </ScrollReveal>
              )}
            </div>
          </div>

          <ScrollReveal delay={120} className={styles.questions}>
            {groups.map((group, g) => (
              <div key={group.heading ?? g} className={g > 0 ? styles.groupNext : ""}>
                {group.heading && (
                  <h3 className={styles.groupHeading}>
                    {group.heading}
                    <span aria-hidden className={styles.groupCount}>{String(group.items.length).padStart(2, "0")}</span>
                  </h3>
                )}
                <dl className={styles.list}>
                  {group.items.map((item) => (
                    <div key={item.question} className={styles.item}>
                      <dt className={styles.question}>{item.question}</dt>
                      <dd className={styles.answer}>{item.answer}</dd>
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
