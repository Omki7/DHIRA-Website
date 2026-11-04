"use client";

/*
 * THE section header, on every page (DESIGN_SYSTEM, "Section grammar"): the
 * eyebrow rail, then the two-tone headline, then the lede directly beneath
 * it, all on the left. Headline and lede never split into two columns (user
 * direction, 23 Sep 2026): a lede parked in a right column reads as a
 * caption to nothing, and the eye has to cross the page to find the second
 * half of the argument.
 *
 * The headline states what the reader gains; the lede says how (founder,
 * 20 Oct 2026). `children` sits under the lede, still in the column: the
 * section's one onward link (`ui/SectionLink`) or a control. Never a
 * next-section button, and nothing in a right-hand column.
 * `titleAs="h1"` when the section opens the page (/pricing has no hero).
 */

import type { ReactNode } from "react";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";
import { FigureEyebrow } from "@/shared/components/ui/FigureEyebrow";
import { TwoToneTitle } from "@/shared/components/ui/TwoToneTitle";
import { cx } from "@/shared/utils/cx";
import styles from "./SectionHeader.module.scss";

type Tone = "light" | "depth";

export interface SectionHeaderProps {
  num: string;
  label: string;
  tag?: ReactNode;
  live?: string;
  /** Omit for a one-line headline. */
  setup?: ReactNode;
  payoff: ReactNode;
  lede?: ReactNode;
  tone?: Tone;
  titleAs?: "h1" | "h2";
  titleId?: string;
  children?: ReactNode;
}

export function SectionHeader({
  num,
  label,
  tag,
  live,
  setup,
  payoff,
  lede,
  tone = "light",
  titleAs,
  titleId,
  children,
}: SectionHeaderProps) {
  const dark = tone === "depth";
  return (
    <header>
      <ScrollReveal>
        <FigureEyebrow num={num} label={label} tag={tag} live={live} dark={dark} />
      </ScrollReveal>
      <div className={styles.body}>
        <ScrollReveal delay={80}>
          <TwoToneTitle as={titleAs} id={titleId} setup={setup} payoff={payoff} tone={tone} />
        </ScrollReveal>
        {lede && (
          <ScrollReveal delay={140}>
            <p className={cx(styles.lede, dark ? styles.ledeDark : styles.ledeLight)}>
              {lede}
            </p>
          </ScrollReveal>
        )}
        {children && <ScrollReveal delay={180}>{children}</ScrollReveal>}
      </div>
    </header>
  );
}
