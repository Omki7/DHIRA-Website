/*
 * Product showcase. Unnumbered on purpose: it extends the hero moment rather
 * than starting the numbered [01]–[12] narrative.
 *
 * The seven live module screens, drawn small, with the context tentacles
 * beneath them (founder, 20 Oct 2026: "bring them back with those tentacles,
 * smaller and more illustrative, to tease"). The tease grammar is in the
 * header of AkashicModuleScreensMockup. The one-moment drawings that stood
 * here from 15 to 20 Oct 2026 (AkashicModuleMomentsMockup) now open the
 * homepage [02] Meet Akashic.
 *
 * This is the bottom of AkashicHeroQuote's curtain: the context box is the
 * last thing on it, and the curtain lifts straight onto the sticky quote.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicModuleScreensMockup from "@/components/demos/mockups/AkashicModuleScreensMockup";

export default function AkashicShowcase() {
  return (
    <section id="platform-screens" className="relative overflow-x-clip scroll-mt-24 bg-background -mt-4 lg:-mt-6 xl:-mt-10">
      <div className="rail-container border-x-0 pt-4 pb-14 lg:pb-16">
        <ScrollReveal delay={120}>
          <AkashicModuleScreensMockup />
        </ScrollReveal>
      </div>
    </section>
  );
}
