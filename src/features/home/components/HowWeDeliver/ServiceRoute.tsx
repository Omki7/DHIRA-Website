import Link from "next/link";
import type { CSSProperties } from "react";
import type { HomeDelivery } from "@/content/pages/home";
import { DrawnFigure } from "@/shared/components/ui";
import { cx } from "@/shared/utils/cx";
import styles from "./ServiceRoute.module.scss";

/*
 * Homepage [04]'s figure: one route from the reader's problem to daily use,
 * with the three service lines as its stops (4 Nov 2026, user: the three
 * cards did not feel at the level of the rest of the page).
 *
 *   start   the problem only you have: a tangled line
 *   plan    after Plan what to build the line runs dashed: mapped, not built
 *   build   after Build what you need it runs solid ink: built
 *   run     after Bring AI into your work it runs blue to the end: in use
 *
 * No numbers: a reader may bring DHIRA in for one stop or the whole route
 * (/services [01]). From lg the stops sit across one rail, their rows shared
 * through CSS subgrid so titles, descriptions and outputs stay level; below
 * lg the rail runs down the left. Draws once on entering view; the final
 * state under reduced motion.
 */

const STAGES = ["plan", "build", "run"] as const;

const at = (seconds: number, duration?: number) =>
  ({
    ["--ad-delay" as string]: `${seconds}s`,
    ...(duration ? { ["--ad-dur" as string]: `${duration}s` } : {}),
  }) as CSSProperties;

/* The tangle, in a 140 × 88 box: a loose knot through these points (one
   smooth Catmull-Rom curve), then one thread leaving at the middle of the
   right edge, where the rail begins. Transposed for the vertical rail, so
   the thread leaves at the bottom. */
type Point = readonly [number, number];

const TANGLE_W = 140;
const TANGLE_H = 88;
const TANGLE: readonly Point[] = [
  [10, 52], [34, 20], [70, 18], [80, 52], [50, 70], [34, 46], [60, 28],
  [94, 30], [102, 62], [72, 76], [58, 52], [86, 40], [112, 44], [140, 44],
];

function tanglePath(transpose: boolean) {
  const r = (n: number) => Math.round(n * 10) / 10;
  const p = ([x, y]: Point) => (transpose ? `${r(y)} ${r(x)}` : `${r(x)} ${r(y)}`);
  let d = `M${p(TANGLE[0])}`;
  for (let i = 0; i < TANGLE.length - 1; i++) {
    const before = TANGLE[i - 1] ?? TANGLE[i];
    const from = TANGLE[i];
    const to = TANGLE[i + 1];
    const after = TANGLE[i + 2] ?? to;
    const c1: Point = [from[0] + (to[0] - before[0]) / 6, from[1] + (to[1] - before[1]) / 6];
    const c2: Point = [to[0] - (after[0] - from[0]) / 6, to[1] - (after[1] - from[1]) / 6];
    d += `C${p(c1)} ${p(c2)} ${p(to)}`;
  }
  return d;
}

function Tangle({ transpose, className }: { transpose: boolean; className: string }) {
  return (
    <svg
      viewBox={transpose ? `0 0 ${TANGLE_H} ${TANGLE_W}` : `0 0 ${TANGLE_W} ${TANGLE_H}`}
      preserveAspectRatio={transpose ? "xMidYMax meet" : "xMaxYMid meet"}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d={tanglePath(transpose)} pathLength={1} strokeWidth="1.4" className={cx(styles.tangleLine, "ad-draw")} style={at(0, 1.3)} />
    </svg>
  );
}

export interface ServiceRouteProps {
  route: HomeDelivery["route"];
  services: HomeDelivery["services"];
}

export function ServiceRoute({ route, services }: ServiceRouteProps) {
  const endAt = 1.1 + services.length * 0.42;
  return (
    <DrawnFigure className={styles.panel} threshold={0.3}>
      <ol className={styles.route}>
        <li className={styles.start}>
          <span aria-hidden="true" className={styles.rail}>
            <Tangle transpose={false} className={styles.tangleWide} />
            <Tangle transpose className={styles.tangleTall} />
            <span className={cx(styles.segment, styles.lead)} style={at(1)} />
          </span>
          <span className={styles.endLabel}>{route.start}</span>
        </li>

        {services.map((service, i) => {
          const titleId = `home-service-${STAGES[i]}`;
          const start = 1.1 + i * 0.42;
          return (
            <li key={service.href} className={styles.stop} data-stage={STAGES[i]}>
              <Link href={service.href} aria-labelledby={titleId} className={styles.link}>
                <span aria-hidden="true" className={styles.rail}>
                  <span className={styles.segment} style={at(start + 0.05)} />
                  <span className={cx(styles.node, "ad-fade")} style={at(start)} />
                </span>
                <p className={styles.scope}>{service.scope}</p>
                <h3 id={titleId} className={styles.title}>
                  {service.title}
                  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className={styles.arrow}>
                    <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </h3>
                <p className={styles.description}>{service.description}</p>
                <div className={styles.output}>
                  <p className={styles.outputLabel}>{route.outputLabel}</p>
                  <p className={styles.outputText}>{service.output}</p>
                </div>
              </Link>
            </li>
          );
        })}

        <li className={styles.end}>
          <span aria-hidden="true" className={styles.rail}>
            <span className={styles.segment} style={at(endAt)} />
            <span className={cx(styles.endNode, "ad-fade")} style={at(endAt + 0.35)} />
          </span>
          <span className={styles.endLabel}>{route.end}</span>
        </li>
      </ol>
    </DrawnFigure>
  );
}
