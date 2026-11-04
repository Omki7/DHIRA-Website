import type { CSSProperties } from "react";
import type { LifecycleMoment as LifecycleMomentContent } from "@/content/pages/solutions";
import { cx } from "@/shared/utils/cx";
import styles from "./SolutionsFeatured.module.scss";

/*
 * The procurement system's moment (5 Nov 2026): "Can we defend this
 * award?" answered at one stage of twelve. The lifecycle runs as one gently
 * waving line, indent to bank guarantee: stages done in ink, evaluation lit
 * in blue, the rest still ahead. Under the lit stage hangs its evidence, in
 * the highlighted record recipe. The twelve names follow as a set, so the
 * whole lifecycle is readable at every width.
 */

const W = 600;
const H = 96;
const X0 = 18;
const STEP = (W - X0 * 2) / 11;

const point = (i: number) => [X0 + i * STEP, 44 + Math.sin(i * 0.9) * 14] as const;

export interface LifecycleMomentProps {
  moment: LifecycleMomentContent;
}

export function LifecycleMoment({ moment }: LifecycleMomentProps) {
  const lit = moment.stages.indexOf(moment.lit);
  const pts = moment.stages.map((_, i) => point(i));
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const [litX] = pts[lit];

  return (
    <div className={styles.lifecycle}>
      <svg viewBox={`0 0 ${W} ${H}`} className={styles.rail} aria-hidden="true" focusable="false">
        <path d={line} pathLength={1} className={styles.railLine} />
        {pts.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === lit ? 7 : 4.5}
            className={i < lit ? styles.stageDone : i === lit ? styles.stageLit : styles.stageAhead}
          />
        ))}
        <line x1={litX} y1={pts[lit][1] + 8} x2={litX} y2={H} className={styles.hanger} />
      </svg>

      <div className={styles.evidence} style={{ "--x": `${(litX / W) * 100}%` } as CSSProperties}>
        <p className={styles.evidenceLabel}>
          {moment.lit} · {moment.evidence.criterion}
        </p>
        <p className={styles.evidenceResult}>{moment.evidence.result}</p>
        <p className={styles.evidenceSource}>{moment.evidence.source}</p>
      </div>

      <ol className={styles.stageNames}>
        {moment.stages.map((stage, i) => (
          <li key={stage} className={cx(styles.stageName, i === lit && styles.stageNameLit)}>
            {stage}
          </li>
        ))}
      </ol>
    </div>
  );
}
