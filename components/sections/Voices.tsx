/**
 * DESIGN INTENT:
 * Section 09: Voices from the Field.
 *
 * Replaces the previous 3-up uniform `.card-attio` grid (which violated
 * AGENTS.md Rule 1 — "if you are about to reach for a generic card pattern
 * for a new section, stop") with editorial pull-quotes set in Newsreader
 * (the sanctioned "occasional editorial pull-quote" voice).
 *
 * Built off Linear's testimonial rail (display:flex with each quote sized
 * to its natural text length), lifted onto the white page field as a
 * vertical stack of asymmetric, card-free "field dispatches" — see the
 * dedicated <VoicesDispatches/> client child.
 *
 * Each dispatch's body type scales INVERSELY to its quote length (the
 * editorial front-page pull-quote rule: the line whose weight matters most
 * gets the most ink). Hovering a dispatch lifts it and dims its siblings,
 * with a thin blue left-edge accent streak re-using TheProof / FieldLedger's
 * scaleY(0→1) indicator language — visual cohesion between the two editorial
 * sections bracketing the dark ProvenAtScale inversion.
 *
 * Rule 2 (✓ discipline): no check glyphs — these are subjective field
 * testimonials, not verified external facts. No star ratings, no quote-bubble
 * SVGs (the drop-quote glyph is a typographic " character, not a bubble).
 * No auto-scroll marquee. No 3-card bento grid.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import VoicesDispatches from "@/components/demos/VoicesDispatches";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function Voices() {
  return (
    <section id="voices" className="relative bg-primary-bg pt-12 pb-24 lg:pt-16 lg:pb-32 overflow-hidden">
      <ScrollRevealRail>
        {/* Eyebrow + headline — kept as the section's existing voice,
            but the section id is intentionally abstract (no nav anchor
            contract on this section). */}
        <ScrollReveal>
          <div className="mb-10 flex items-center border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[07]</span>
              &nbsp;&nbsp;PARTNER VOICES
            </span>
          </div>

          <h2 className="max-w-[20em] text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink sm:text-[48px] lg:text-[56px]">
            Proven in the field, not in a pitch deck.
          </h2>

        </ScrollReveal>

        {/* Field Dispatches — interactive centerpiece, client child */}
        <ScrollReveal delay={160}>
          <VoicesDispatches />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}