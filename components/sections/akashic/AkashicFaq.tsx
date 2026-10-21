import ScrollReveal from "@/components/ui/ScrollReveal";
import JsonLd from "@/components/ui/JsonLd";
import type { AkashicPage } from "@/content/pages/akashic";
import { StoryLabel, StoryTitle } from "@/components/sections/akashic/AkashicStory";

/* [12] Questions (14 Oct 2026, the founder's FAQ re-cut for /akashic; the
   sourcing and what was dropped is in the AKASHIC_FAQ comment). An open
   two-column list, not an accordion: every answer is readable without a
   click. Carries FAQPage structured data for the same six answers. */

export default function AkashicFaq({ content: c }: { content: AkashicPage["faq"] }) {
  return (
    <section id="faq" className="ak-story border-t border-lineSoft bg-background">
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
      <div className="ak-story-wrap">
        <ScrollReveal>
          <StoryLabel number={c.number}>{c.label}</StoryLabel>
          <div className="ak-story-heading">
            <StoryTitle setup={c.setup}>{c.title}</StoryTitle>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <dl className="ak-faq">
            {c.items.map((item, i) => (
              <div key={item.question} className="ak-faq-item">
                <dt>
                  <span className="ak-faq-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
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
