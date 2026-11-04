"use client";

/*
 * The closing card for the drawing pages (/about, /careers). The site's
 * sub-page closure recipe (`bg-ink`, Rule 5b): an invitation on the left, and
 * on the right the title block every engineering drawing set ends with
 * (who drew the set, where, which sheet), stamped with a miniature of the
 * page's hero figure so the page closes on the image it opened with.
 *
 * Always carries #talk-to-our-team. `anchors` adds extra in-page targets
 * (the Company menu's #careers / #join-us on /about).
 */

import type { ReactNode } from "react";
import { useUi } from "@/shared/providers/UiProvider";
import { ScrollReveal } from "@/shared/components/ui/ScrollReveal";
import { ScrollRevealRail } from "@/shared/components/ui/ScrollRevealRail";
import { FigureEyebrow } from "@/shared/components/ui/FigureEyebrow";
import { TwoToneTitle } from "@/shared/components/ui/TwoToneTitle";
import { cx } from "@/shared/utils/cx";
import styles from "./DrawingSetClose.module.scss";

export type TitleCell = { label: string; value: ReactNode };

export interface DrawingSetCloseProps {
  num: string;
  label: string;
  setup: ReactNode;
  payoff: ReactNode;
  body: ReactNode;
  actions: ReactNode;
  /* Four half width cells, read in pairs */
  cells: TitleCell[];
  /* One full width cell under the pairs (offices, locations) */
  wide: TitleCell;
  drawnBy: ReactNode;
  stamp: ReactNode;
  anchors?: string[];
}

export function DrawingSetClose({
  num,
  label,
  setup,
  payoff,
  body,
  actions,
  cells,
  wide,
  drawnBy,
  stamp,
  anchors = [],
}: DrawingSetCloseProps) {
  const ui = useUi();
  return (
    <section
      id="talk-to-our-team"
      className={styles.close}
    >
      {anchors.map((id) => (
        <span key={id} id={id} className={styles.anchor} aria-hidden />
      ))}
      <ScrollRevealRail>
        <ScrollReveal>
          <div className={styles.card}>
            <div className={styles.bar} aria-hidden />


            <div className={styles.grid}>
              <div className={styles.invite}>
                <FigureEyebrow num={num} label={label} dark bare />
                <TwoToneTitle setup={setup} payoff={payoff} tone="ink" className={styles.title} />
                <p className={styles.body}>{body}</p>
                <div className={styles.actions}>{actions}</div>
              </div>

              {/* Title block */}
              <div className={styles.titleBlock}>
                <dl className={styles.cells}>
                  {cells.map((cell, k) => (
                    <div
                      key={cell.label}
                      className={cx(styles.cell, k % 2 === 0 && styles.cellLeft)}
                    >
                      <dt className={styles.term}>{cell.label}</dt>
                      <dd className={styles.value}>{cell.value}</dd>
                    </div>
                  ))}
                  <div className={styles.wideCell}>
                    <dt className={styles.term}>{wide.label}</dt>
                    <dd className={styles.value}>{wide.value}</dd>
                  </div>
                  <div className={styles.drawnCell}>
                    <dt className={styles.term}>{ui.drawnBy}</dt>
                    <dd className={styles.drawnBy}>
                      {drawnBy}
                    </dd>
                  </div>
                </dl>
                <div className={styles.stamp}>{stamp}</div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
