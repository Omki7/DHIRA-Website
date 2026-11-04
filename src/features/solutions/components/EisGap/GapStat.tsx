"use client";

import useCountUp from "@/shared/hooks/useCountUp";
import styles from "./EisGap.module.scss";

export interface GapStatProps {
  figure: string;
}

/* A stat band figure that counts up once in view (DESIGN_SYSTEM §7). The
   real figure is in the HTML and is what assistive technology reads. */
export function GapStat({ figure }: GapStatProps) {
  const { ref, display } = useCountUp(figure, { startAtZero: true });
  return (
    <div ref={ref} className={styles.statFigure}>
      <span className={styles.srOnly}>{figure}</span>
      <span aria-hidden="true">{display}</span>
    </div>
  );
}
