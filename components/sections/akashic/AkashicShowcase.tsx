/*
 * Product showcase. Unnumbered on purpose: it extends the hero moment rather
 * than starting the numbered [01]–[12] narrative.
 *
 * One outcome card per module, in the fan, with the context tentacles
 * beneath them. The module screens that stood here from 20 to 22 Oct 2026
 * showed too much (founder, 22 Oct 2026); each module is now the question
 * a business reader brings and the answer Akashic gives. The grammar is in
 * the header of AkashicOutcomeCardsMockup.
 *
 * This is the bottom of AkashicHeroQuote's curtain: the context box is the
 * last thing on it, and the curtain lifts straight onto the sticky quote.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicOutcomeCardsMockup from "@/components/demos/mockups/AkashicOutcomeCardsMockup";
import type { AkashicPage } from "@/content/pages/akashic";

export default function AkashicShowcase({ content }: { content: AkashicPage["hero"]["showcase"] }) {
  return (
    <section id="platform-screens" className="relative overflow-x-clip scroll-mt-24 bg-background -mt-4 lg:-mt-6 xl:-mt-10">
      <div className="rail-container border-x-0 pt-4 pb-14 lg:pb-16">
        <ScrollReveal delay={120}>
          <AkashicOutcomeCardsMockup content={content} />
        </ScrollReveal>
      </div>
    </section>
  );
}
