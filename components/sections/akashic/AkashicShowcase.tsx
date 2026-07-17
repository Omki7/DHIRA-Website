/*
 * Product showcase — the /akashic counterpart of the homepage hero's live
 * wireframes. Unnumbered on purpose: it extends the hero moment (like
 * HeroProductsMockup inside the home Hero) rather than starting the
 * numbered [01]–[10] narrative. One screen per module, same fidelity and
 * demo-data world as the homepage cards (AGENTS.md §8a).
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import AkashicModuleScreensMockup from "@/components/demos/mockups/AkashicModuleScreensMockup";
import HexConnectionsMockup from "@/components/demos/HexConnectionsMockup";

export default function AkashicShowcase() {
  return (
    <section id="platform-screens" className="relative overflow-x-clip scroll-mt-24 bg-white -mt-16 lg:-mt-24 xl:-mt-32">
      <div className="rail-container border-x-0 pt-4 pb-0 lg:pb-0">
        <ScrollReveal delay={120}>
          <AkashicModuleScreensMockup />
        </ScrollReveal>
        <div className="relative z-10 w-full mt-2">
          <HexConnectionsMockup />
        </div>
      </div>
    </section>
  );
}
