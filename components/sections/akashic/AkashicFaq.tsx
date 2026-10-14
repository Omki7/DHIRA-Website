import ScrollReveal from "@/components/ui/ScrollReveal";
import { AKASHIC_FAQ as c } from "@/lib/akashicSections";
import { StoryLabel, StoryTitle } from "@/components/sections/akashic/AkashicStory";

/* [12] Questions (14 Oct 2026, the founder's FAQ re-cut for /akashic; the
   sourcing and what was dropped is in the AKASHIC_FAQ comment). An open
   two-column list, not an accordion: every answer is readable without a
   click. Carries FAQPage structured data for the same six answers. */
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: c.items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
}).replace(/</g, "\\u003c");

export default function AkashicFaq() {
  return (
    <section id="faq" className="ak-story border-t border-lineSoft bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <div className="ak-story-wrap">
        <ScrollReveal>
          <StoryLabel number="12">{c.label}</StoryLabel>
          <div className="ak-story-heading">
            <StoryTitle setup={c.setup}>{c.title}</StoryTitle>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <dl className="ak-faq">
            {c.items.map((item, i) => (
              <div key={item.q} className="ak-faq-item">
                <dt>
                  <span className="ak-faq-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  {item.q}
                </dt>
                <dd>{item.a}</dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
