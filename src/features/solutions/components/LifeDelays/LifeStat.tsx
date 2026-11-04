"use client";

import useCountUp from "@/shared/hooks/useCountUp";
import styles from "./LifeDelays.module.scss";

export interface LifeStatProps {
  figure: string;
}

/* A stat band figure that counts up once in view (DESIGN_SYSTEM §7). The
   real figure is in the HTML and is what assistive technology reads. */
export function LifeStat({ figure }: LifeStatProps) {
  const { ref, display } = useCountUp(figure, { startAtZero: true, delay: 450 });
  return (
    <div ref={ref} className={styles.statFigure}>
      <span className={styles.srOnly}>{figure}</span>
      <span aria-hidden="true">{display}</span>
    </div>
  );
}
