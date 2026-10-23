"use client";

/*
 * The two-tone section headline for the drawing pages (/about, /careers):
 * a soft setup line, then the ink payoff line (DESIGN_SYSTEM, two-tone rule).
 *
 * Copy rule: each line is a short, complete phrase. The setup states the
 * ground, the payoff lands the claim. No pronoun ("it", "that", "they")
 * pointing back at the line above; each line must stand on its own.
 *
 * `tone` follows the ground: `light` on white or the soft blue band, `depth`
 * on the page's one dark section, `ink` inside the closing card.
 */

import type { ElementType, ReactNode } from "react";

type Tone = "light" | "depth" | "ink";

const TONES: Record<Tone, { setup: string; payoff: string }> = {
  light: { setup: "text-inkSoft", payoff: "text-ink" },
  depth: { setup: "text-uc-mute", payoff: "text-uc-text" },
  ink: { setup: "text-inkSoft", payoff: "text-ink" },
};

export default function TwoToneTitle({
  setup,
  payoff,
  tone = "light",
  as: Tag = "h2",
  id,
  className = "",
}: {
  /** Omit for a one-line title (the payoff alone, in ink). */
  setup?: ReactNode;
  payoff: ReactNode;
  tone?: Tone;
  as?: ElementType;
  id?: string;
  className?: string;
}) {
  const t = TONES[tone];
  return (
    <Tag id={id} className={`text-[34px] font-medium leading-[1.08] tracking-tighter sm:text-heading-md lg:text-[52px] ${className}`}>
      {setup && <span className={`block text-balance ${t.setup}`}>{setup}</span>}
      <span className={`block text-balance ${t.payoff}`}>{payoff}</span>
    </Tag>
  );
}
