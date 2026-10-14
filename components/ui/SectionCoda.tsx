"use client";

/*
 * The mono sign-off line that ends a section on the drawing pages: a soft
 * lead, then an ink payoff. Same two-tone grammar as the headline, at label
 * size.
 *
 * Copy rule: two short fragments, six words or fewer each where possible.
 * The coda adds one new idea; it never restates the headline.
 *
 * `rule` draws the dashed hairline used under a full width drawing.
 * `className` replaces the default spacing when a section needs its own.
 */

import type { ReactNode } from "react";

export default function SectionCoda({
  lead,
  payoff,
  rule = false,
  dark = false,
  className,
}: {
  lead: ReactNode;
  payoff: ReactNode;
  rule?: boolean;
  dark?: boolean;
  className?: string;
}) {
  const spacing = rule ? "mt-8 border-t border-dashed border-lineSoft pt-5" : "mt-6";
  return (
    <p
      className={`text-pretty font-mono text-[11px] uppercase leading-[1.6] tracking-[0.08em] ${
        dark ? "text-uc-mute" : "text-inkSoft"
      } ${className ?? spacing}`}
    >
      {lead} <span className={dark ? "text-uc-text" : "text-ink"}>{payoff}</span>
    </p>
  );
}
