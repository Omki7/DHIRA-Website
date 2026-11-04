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
import { cx } from "@/shared/utils/cx";
import styles from "./TwoToneTitle.module.scss";

type Tone = "light" | "depth" | "ink";

const TONES: Record<Tone, { setup: string; payoff: string }> = {
  light: { setup: styles.soft, payoff: styles.ink },
  depth: { setup: styles.depthSoft, payoff: styles.depthInk },
  ink: { setup: styles.soft, payoff: styles.ink },
};

export interface TwoToneTitleProps {
  /** Omit for a one-line title (the payoff alone, in ink). */
  setup?: ReactNode;
  payoff: ReactNode;
  tone?: Tone;
  as?: ElementType;
  id?: string;
  className?: string;
}

export function TwoToneTitle({
  setup,
  payoff,
  tone = "light",
  as: Tag = "h2",
  id,
  className = "",
}: TwoToneTitleProps) {
  const t = TONES[tone];
  return (
    <Tag id={id} className={cx(styles.title, className)}>
      {setup && <span className={cx(styles.line, t.setup)}>{setup}</span>}
      <span className={cx(styles.line, t.payoff)}>{payoff}</span>
    </Tag>
  );
}
