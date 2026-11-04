/* SIMULATED PRODUCT UI: part of AkashicOutcomeCardsMockup (see its banner). */

import type { CSSProperties, ReactNode } from "react";
import styles from "./AkashicOutcomeCardsMockup.module.scss";

/* ---------------------------------------------------------------- */
/* Drawing kit                                                       */
/* ---------------------------------------------------------------- */

/* Source systems keep one colour on every card (Rule 8: SVG hex). */
export const SRC = {
  salesforce: "#2A9BE0",
  netsuite: "#7C5CFC",
  plan: "#E0A93B",
  invoice: "#E5547B",
  shopify: "#3E9E6B",
};
export const T = {
  ink: "rgb(var(--ink))",
  body: "rgb(var(--secondary-text))",
  mute: "rgb(var(--tertiary-text))",
  blue: "rgb(var(--blue))",
  blueSoft: "rgb(var(--blue-subtle))",
  blueLine: "rgb(var(--blue-border))",
  line: "rgb(var(--card-line))",
  hair: "rgb(var(--lineSoft))",
  track: "rgb(var(--tertiary-bg))",
  card: "rgb(var(--screen-surface))",
  panel: "rgb(var(--primary-bg))",
  red: "rgb(var(--red))",
};
export const EASE = "cubic-bezier(0.2,0.8,0.2,1)";

/* The drawing's box: the card's width less its 24px gutters. */
export const W = 472;
export const H = 150;

export type Play = { on: boolean; t: number };

/* One entrance, played only while the card is at the front. */
export const enter = ({ on, t }: Play, name: string, delay = 0, dur = 560, origin?: string): CSSProperties | undefined =>
  on
    ? {
        animation: `${name} ${dur}ms ${EASE} ${t + delay}ms both`,
        ...(origin ? { transformBox: "fill-box", transformOrigin: origin } : {}),
      }
    : undefined;

/* A card-coloured cover that shrinks to the right: lines draw left to
   right with transform alone (Rule 6a). */
export function Wipe({ play, x = -24, y = 0, w = W + 48, h = H, delay = 0, dur = 1100 }: { play: Play; x?: number; y?: number; w?: number; h?: number; delay?: number; dur?: number }) {
  if (!play.on) return null;
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      fill={T.card}
      style={{ animation: `akx-fillx ${dur}ms ${EASE} ${play.t + delay}ms reverse both`, transformBox: "fill-box", transformOrigin: "right center" }}
    />
  );
}

export function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className={styles.frame} fill="none" aria-hidden>
      {children}
    </svg>
  );
}

/* A mono caption: the drawing's labels share the eyebrow's register. */
export function Mono({ x, y, children, fill = T.mute, anchor = "start", size = 9 }: { x: number; y: number; children: ReactNode; fill?: string; anchor?: "start" | "middle" | "end"; size?: number }) {
  return (
    <text x={x} y={y} fill={fill} textAnchor={anchor} fontSize={size} letterSpacing="0.08em" className={styles.mono}>
      {children}
    </text>
  );
}
