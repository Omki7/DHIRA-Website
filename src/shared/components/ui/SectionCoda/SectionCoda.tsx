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
import { cx } from "@/shared/utils/cx";
import styles from "./SectionCoda.module.scss";

export interface SectionCodaProps {
  lead: ReactNode;
  payoff: ReactNode;
  rule?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionCoda({
  lead,
  payoff,
  rule = false,
  dark = false,
  className,
}: SectionCodaProps) {
  const spacing = rule ? styles.rule : styles.spacing;
  return (
    <p
      className={cx(styles.coda, dark ? styles.leadDark : styles.leadLight, className ?? spacing)}
    >
      {lead} <span className={dark ? styles.payoffDark : styles.payoffLight}>{payoff}</span>
    </p>
  );
}
