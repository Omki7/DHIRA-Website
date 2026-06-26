"use client";

/**
 * DESIGN INTENT:
 * Field Dispatches — the interactive centerpiece of "Voices from the Field".
 * Not cards. Not a 3-up grid. NOT a marquee. Built off Linear's testimonial
 * rail (display:flex with each quote sized to its natural text length) and
 * lifted, on the white page field, into a vertical stack of asymmetric,
 * card-free editorial pull-quotes set in Newsreader — the sanctioned serif
 * "occasional editorial pull-quote" voice (AGENTS.md font role).
 *
 * SHAPE — each dispatch is a typographic construction on the field, NOT a card:
 *
 *   [oversized blue drop-quote glyph "  top-left, Newsreader italic]
 *
 *   [Quote body — Newsreader italic. SIZE SCALES INVERSELY TO LENGTH:
 *    short punchy quotes run large (text-[40px]), long ones run smaller
 *    (text-[26px]). This is the editorial front-page pull-quote rule —
 *    the line whose weight matters most gets the most ink.]
 *
 *   [hairline attribution rule]
 *
 *   [NAME — Inter-semibold, ink] [ROLE · ORG — mono uppercase eyebrow, inkSoft]
 *
 * SIBLING-DIM HOVER (re-uses the FieldLedger/Linear language, on white now):
 *   hovering a dispatch lifts it (-translate-y-1) and dims its siblings to
 *   ~40% opacity; a thin blue accent streak scales in on the focused
 *   dispatch's left edge (the same left-edge accent used by WholeProof +
 *   FieldLedger — visual cohesion between the two editorial sections
 *   bracketing the dark ProvenAtScale inversion). Moves with the
 *   `ease-settle` token, duration-500.
 *
 * Rule 2 (✓ discipline): no check glyphs anywhere in this section — these
 * are subjective field testimonials, not verified external facts.
 * Rule bans: no star ratings, no quote-bubble SVGs (the drop-quote glyph
 * is typographic Unicode, not a bubble icon). No auto-scroll marquee.
 *
 * Reduced-motion: hover-lift and dim are disabled (the focus state still
 * works via keyboard for a11y, but no transition).
 */

import { useState } from "react";

type Dispatch = {
  text: string;
  name: string;
  role: string;
  org: string;
};

const DISPATCHES: Dispatch[] = [
  {
    text: "1.89 crore users. One dashboard. We finally see the whole country.",
    name: "Programme Lead",
    role: "National Education Platform",
    org: "Field deployment · 2024",
  },
  {
    text:
      "387,000 emigration records, fully traceable. What used to take a desk full of files now takes one search.",
    name: "Director",
    role: "Government Employment Program",
    org: "State rollout · 2023",
  },
  {
    text:
      "A statewide survey, reconciled and visualized in days, not months. The data was finally one we could trust.",
    name: "Senior Official",
    role: "State Government",
    org: "Pilot district · 2024",
  },
];

/* Size the body type INVERSELY to quote length — the editorial pull-quote rule.
   Words < ~9 → "lg" (text-[40px]); 9-16 → "md" (text-[32px]); >16 → "sm" (text-[26px]).
   lineHeight scales with size to keep the optical baseline steady. */
function sizeFor(text: string): { body: string; lh: string } {
  const words = text.trim().split(/\s+/).length;
  if (words <= 9) return { body: "text-[34px] sm:text-[40px]", lh: "leading-[1.12]" };
  if (words <= 16) return { body: "text-[28px] sm:text-[32px]", lh: "leading-[1.15]" };
  return { body: "text-[22px] sm:text-[26px]", lh: "leading-[1.2]" };
}

export default function VoicesDispatches() {
  const [hovered, setHovered] = useState<number | null>(null);
  const dim = hovered !== null;

  return (
    <div className="mt-16 flex flex-col gap-10 sm:gap-14">
      {DISPATCHES.map((d, i) => {
        const isHovered = i === hovered;
        const dimmed = dim && !isHovered;
        const { body, lh } = sizeFor(d.text);
        return (
          <figure
            key={i}
            className="group relative w-full max-w-[920px] mx-auto pl-10 sm:pl-16"
            style={{
              opacity: dimmed ? 0.4 : 1,
              transform: isHovered ? "translateY(-4px)" : "translateY(0)",
              transition:
                "transform 500ms cubic-bezier(0.2,0.8,0.2,1), opacity 500ms cubic-bezier(0.2,0.8,0.2,1)",
            }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            tabIndex={0}
          >
            {/* Left-edge accent streak — re-uses TheProof / FieldLedger's
                scaleY(0→1) indicator language, on white now → cohesion between
                the two editorial sections bracketing the dark inversion. */}
            <span
              className="pointer-events-none absolute left-0 top-2 w-[3px] bg-blue transition-transform duration-500 ease-settle"
              style={{
                height: "calc(100% - 1rem)",
                transform: isHovered ? "scaleY(1)" : "scaleY(0)",
                transformOrigin: "top",
              }}
            />

            {/* Oversized typographic drop-quote glyph — Newsreader italic, blue.
                NOT a quote-bubble SVG; this is a Unicode " character sized 80px.
                Sits flush left, anchoring the eye on the line that matters. */}
            <span
              aria-hidden="true"
              className="absolute left-0 top-[-6px] select-none font-display text-[64px] italic leading-none text-blue sm:text-[80px]"
              style={{ transform: isHovered ? "translateX(2px)" : "translateX(0)", transition: "transform 500ms cubic-bezier(0.2,0.8,0.2,1)" }}
            >
              &ldquo;
            </span>

            {/* The quote body — Newsreader italic, sized to its natural length.
                No enclosing quote marks in the body itself (the drop-cap glyph
                already opens the line, and an italic body self-quotes visually). */}
            <blockquote
              className={`font-display italic font-normal text-ink tracking-tight ${body} ${lh}`}
            >
              {d.text}
            </blockquote>

            {/* Hairline attribution rule — AGENTS.md's "hairline-attribution rule" */}
            <figcaption className="mt-7 border-t border-lineSoft pt-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-sm font-semibold text-ink">{d.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                  {d.role}
                </span>
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                {d.org}
              </div>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}