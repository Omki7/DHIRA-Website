/*
 * Product showcase. Unnumbered on purpose: it extends the hero moment rather
 * than starting the numbered [01]–[12] narrative. One MOMENT per module, not
 * one screen (founder direction, 15 Oct 2026: tease, do not reveal). The
 * grammar is in the header of AkashicModuleMomentsMockup. The full-screen
 * carousel it replaced, AkashicModuleScreensMockup, is kept unused for
 * comparison until the founder signs this off.
 *
 * This is the bottom of AkashicHeroQuote's curtain: the module index is the
 * last thing on it, and the curtain lifts straight onto the sticky quote.
 * The seven-label web that hung below the stage (HexConnectionsMockup,
 * "Organisational context") was removed by direction, 15 Oct 2026.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicModuleMomentsMockup from "@/components/demos/mockups/AkashicModuleMomentsMockup";

export default function AkashicShowcase() {
  return (
    <section id="platform-screens" className="relative overflow-x-clip scroll-mt-24 bg-background -mt-4 lg:-mt-6 xl:-mt-10">
      <div className="rail-container border-x-0 pt-4 pb-16 lg:pb-20">
        <ScrollReveal delay={120}>
          <AkashicModuleMomentsMockup />
        </ScrollReveal>
      </div>
    </section>
  );
}
