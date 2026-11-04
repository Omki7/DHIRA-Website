"use client";

import type { ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./FigureEyebrow.module.scss";

/*
 * THE section eyebrow, on every page (DESIGN_SYSTEM, "Section grammar";
 * founder, 20 Oct 2026: one format across the site). A dashed hairline above
 * and below, `[NN]  LABEL` in 11px mono on the left: number `overcast`, label
 * `inkSoft`. Always left-aligned, never centred, never coloured, no dots.
 * Sections render it through `ui/SectionHeader`; use it directly only where
 * a section cannot.
 *
 * `tag` sets a required status mark after the label (PreviewTag on agents).
 * `live` puts the pulsing NOW HIRING marker in the right slot (careers only).
 * `bare` drops the rail inside a card (the closing `DrawingSetClose`).
 */

export interface FigureEyebrowProps {
  num?: string;
  label: string;
  /** A status mark set after the label, e.g. `PreviewTag` on a section
      about agents. The claims rules require it; it is not decoration. */
  tag?: ReactNode;
  live?: string;
  dark?: boolean;
  bare?: boolean;
}

export function FigureEyebrow({
  num,
  label,
  tag,
  live,
  dark = false,
  bare = false,
}: FigureEyebrowProps) {
  const rail = bare ? undefined : cx(styles.rail, dark ? styles.railDark : styles.railLight);
  return (
    <div className={cx(styles.root, rail)}>
      <p className={styles.line}>
        <span>
          {num && <span className={dark ? styles.numDark : styles.num}>[{num}]&nbsp;&nbsp;</span>}
          <span className={dark ? styles.labelDark : styles.label}>{label}</span>
        </span>
        {tag}
      </p>
      {live && (
        <span className={styles.live}>
          <span className={styles.liveDot} aria-hidden />
          {live}
        </span>
      )}
    </div>
  );
}
