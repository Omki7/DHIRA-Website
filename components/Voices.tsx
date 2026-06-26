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

import ScrollReveal from "./ScrollReveal";
import VoicesDispatches from "./VoicesDispatches";

export default function Voices() {
  return (
    <section className="relative bg-white py-32 lg:py-40 overflow-hidden border-t border-lineSoft">
      <div className="rail-container relative">
        {/* Eyebrow + headline — kept as the section's existing voice,
            but the section id is intentionally abstract (no nav anchor
            contract on this section). */}
        <ScrollReveal>
          <div className="mb-10 flex items-center gap-2 border-b border-dashed border-lineSoft pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span className="text-overcast">[07]</span>
            <span>/</span>
            <span>VOICES FROM THE FIELD</span>
          </div>

          <h2 className="max-w-[14em] text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
            Proven in the field. Ask them.
          </h2>

          <p className="mt-6 max-w-[28em] text-lg leading-relaxed text-inkSoft">
            Quotes from the operators who run DHIRA in production, not
            case-study theatre, not star ratings. Each is sized to its own
            weight, the way a paper sizes a pull-quote.
          </p>
        </ScrollReveal>

        {/* Field Dispatches — interactive centerpiece, client child */}
        <ScrollReveal delay={160}>
          <VoicesDispatches />
        </ScrollReveal>
      </div>
    </section>
  );
}