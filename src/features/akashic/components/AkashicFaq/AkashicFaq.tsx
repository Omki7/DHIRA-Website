import type { AkashicPage } from "@/content/pages/akashic";
import { JsonLd } from "@/shared/components/data-display";
import { ScrollReveal } from "@/shared/components/ui";
import { StoryLabel, StoryTitle } from "../AkashicStory";
import styles from "./AkashicFaq.module.scss";

/* [12] Questions (14 Oct 2026, the founder's FAQ re-cut for /akashic; the
   sourcing and what was dropped is in the AKASHIC_FAQ comment). An open
   two-column list, not an accordion: every answer is readable without a
   click. Carries FAQPage structured data for the same six answers. */

export interface AkashicFaqProps {
  content: AkashicPage["faq"];
}

export function AkashicFaq({ content: c }: AkashicFaqProps) {
  return (
    <section id="faq" className={styles.section}>
      <JsonLd
        data={{
          "@type": "FAQPage",
          mainEntity: c.items.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        }}
      />
      <div className={styles.wrap}>
        <ScrollReveal>
          <StoryLabel number={c.number}>{c.label}</StoryLabel>
          <div className={styles.heading}>
            <StoryTitle setup={c.setup}>{c.title}</StoryTitle>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <dl className={styles.faq}>
            {c.items.map((item, i) => (
              <div key={item.question} className={styles.item}>
                <dt>
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.question}
                </dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
