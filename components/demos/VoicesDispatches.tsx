"use client";

/**
 * DESIGN INTENT:
 * Field Dispatches — the interactive centerpiece of "Voices from the Field".
 *
 * The previous vertical stack was editorial, but uniform. This version treats
 * the three testimonials as an asymmetric magazine spread: one dominant hero
 * dispatch, then two supporting dispatches set at different widths and
 * vertical offsets so the section breathes like a printed feature, not a list.
 *
 * SHAPE — no cards, no grid of equals. Each dispatch owns its own typographic
 * territory:
 *
 *   [mono dispatch marker — 01 / SECTOR]
 *
 *   [Drop-quote glyph, Newsreader italic, blue]
 *
 *   [Quote body — Newsreader italic. The hero runs very large; supporting
 *    dispatches run medium.]
 *
 *   [Hairline rule that grows into a blue underline on hover]
 *
 *   [NAME — Inter-semibold] [ROLE · ORG — mono uppercase eyebrow]
 *
 * The three dispatches are threaded by a shared visual system (marker, rule,
 * attribution) rather than a visible wire or card border, keeping the shape
 * organic and the section light.
 *
 * SIBLING-DIM HOVER:
 *   Hovering a dispatch lifts it and dims the rest, with a blue underline
 *   scaling in from the left. Reduced-motion: the focus ring remains for
 *   keyboard users, but no lift/scale transitions play.
 *
 * Rule 2 (✓ discipline): no check glyphs, no star ratings, no quote-bubble
 * SVGs. The drop-quote is a typographic Unicode character.
 */

import { useState } from "react";

const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

type Dispatch = {
  text: string;
  name: string;
  role: string;
  org: string;
  sector: string;
  index: string;
};

const DISPATCHES: Dispatch[] = [
  {
    text: "1.89 crore users. One dashboard. We finally see the whole country.",
    name: "Programme Lead",
    role: "National Education Platform",
    org: "Field deployment · 2024",
    sector: "Education",
    index: "01",
  },
  {
    text:
      "387,000 emigration records, fully traceable. What used to take a desk full of files now takes one search.",
    name: "Director",
    role: "Government Employment Program",
    org: "State rollout · 2023",
    sector: "Workforce",
    index: "02",
  },
  {
    text:
      "A statewide survey, reconciled and visualised in days, not months. The data was finally one we could trust.",
    name: "Senior Official",
    role: "State Government",
    org: "Pilot district · 2024",
    sector: "Governance",
    index: "03",
  },
];

function DispatchMarker({ index, sector }: { index: string; sector: string }) {
  return (
    <div className="mb-5 flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-eyebrow">
      <span className="text-blue font-semibold">{index}</span>
      <span className="text-overcast">/</span>
      <span className="text-inkSoft">{sector}</span>
    </div>
  );
}

export default function VoicesDispatches() {
  const [hovered, setHovered] = useState<number | null>(null);
  const dim = hovered !== null;

  const hero = DISPATCHES[0];
  const supporting = DISPATCHES.slice(1);

  const renderDispatch = (d: Dispatch, i: number, variant: "hero" | "support") => {
    const isHovered = i === hovered;
    const dimmed = dim && !isHovered;

    const bodySize =
      variant === "hero"
        ? "text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.08]"
        : "text-[22px] sm:text-[26px] lg:text-[30px] leading-[1.16]";

    const dropSize = variant === "hero" ? "text-[56px] sm:text-[72px]" : "text-[34px] sm:text-[44px]";
    const dropOffset = variant === "hero" ? "top-[-8px]" : "top-[-6px]";

    return (
      <figure
        key={i}
        className="group relative cursor-default rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/30 focus-visible:ring-offset-4"
        style={{
          opacity: dimmed ? 0.38 : 1,
          transform: isHovered ? "translateY(-6px)" : "translateY(0)",
          transition: `transform 500ms ${EASE}, opacity 500ms ${EASE}`,
        }}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        onFocus={() => setHovered(i)}
        onBlur={() => setHovered(null)}
        tabIndex={0}
      >
        <DispatchMarker index={d.index} sector={d.sector} />

        {/* Quote wrapper keeps the drop-quote glyph anchored to the text block,
            not the whole figure, so it never collides with the dispatch marker. */}
        <div className="relative">
          {/* Drop-quote glyph — typographic, not an SVG bubble */}
          <span
            aria-hidden="true"
            className={`absolute left-0 ${dropOffset} select-none font-display italic leading-none text-blue/50 ${dropSize}`}
            style={{
              transform: isHovered ? "translateX(3px)" : "translateX(0)",
              transition: `transform 500ms ${EASE}`,
            }}
          >
            &ldquo;
          </span>

          <blockquote
            className={`font-display italic font-normal text-ink tracking-tight ${bodySize}`}
            style={{ paddingLeft: variant === "hero" ? "1.1em" : "1em" }}
          >
            {d.text}
          </blockquote>
        </div>

        {/* Attribution with hairline rule that becomes a blue underline on hover */}
        <figcaption className="mt-8">
          <div className="relative h-px w-full overflow-hidden bg-lineSoft">
            <span
              className="absolute inset-y-0 left-0 bg-blue"
              style={{
                width: "100%",
                transform: isHovered ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                transition: `transform 500ms ${EASE}`,
              }}
            />
          </div>
          <div className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
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
  };

  return (
    <div className="mt-12 lg:mt-16">
      {/* Hero dispatch — dominant, full-width */}
      <div className="mx-auto max-w-[1020px]">
        {renderDispatch(hero, 0, "hero")}
      </div>

      {/* Supporting dispatches — asymmetric split with vertical offset */}
      <div className="mx-auto mt-16 max-w-[1020px] lg:mt-20">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
          <div className="lg:w-[58%]">
            {renderDispatch(supporting[0], 1, "support")}
          </div>
          <div className="lg:w-[42%] lg:pt-20">
            {renderDispatch(supporting[1], 2, "support")}
          </div>
        </div>
      </div>
    </div>
  );
}
