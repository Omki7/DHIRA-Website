"use client";

// SIMULATED PRODUCT UI: an illustrative before/after, not live product telemetry.
import type { FocusEventHandler, KeyboardEventHandler } from "react";
import type { HomeProof } from "@/content/pages/home";
import { DhiraLogo } from "@/shared/components/icons";
import { cx } from "@/shared/utils/cx";
import styles from "./ProofComparisonMockup.module.scss";

export interface ProofComparisonMockupProps {
  content: HomeProof;
  pos: number;
  width: number;
  glide?: boolean;
  showHint?: boolean;
  nudge?: boolean;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
  onFocus: FocusEventHandler<HTMLDivElement>;
}

const ROWS = [24, 49, 74] as const;

function RecordMark({ unified, index }: { unified: boolean; index: number }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 60 42" className={cx(styles.recordMark, unified ? styles.recordMarkUnified : styles.recordMarkScattered)} fill="none">
      {[0, 1, 2].map((sheet) => (
        <g key={sheet} transform={`translate(${sheet * 9} ${unified ? 8 - sheet * 3 : (sheet + index) % 3 * 5})`}>
          <path d="M3 2H26L32 8V30H3Z" fill={unified ? "rgb(var(--background))" : "rgb(var(--panel))"} stroke="currentColor" strokeOpacity={0.35 + sheet * 0.25} strokeWidth="0.8" />
          <path d="M26 2V8H32M9 14H24M9 19H21M9 24H17" stroke="currentColor" strokeWidth="0.8" strokeOpacity="0.65" />
        </g>
      ))}
    </svg>
  );
}

function RelationshipField({ unified, compact }: { unified: boolean; compact: boolean }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={styles.field} fill="none" aria-hidden="true">
      {unified && Array.from({ length: 7 }, (_, strand) => (
        <path key={`spine-${strand}`} d={`M${48.8 + strand * 0.4} 14 C${46 + strand * 0.7} 34, ${53 - strand * 0.4} 64, ${48.8 + strand * 0.4} 86`} stroke="rgb(var(--blue))" strokeOpacity={strand === 3 ? 0.8 : 0.24} strokeWidth={strand === 3 ? 1.2 : 0.7} vectorEffect="non-scaling-stroke" />
      ))}
      {ROWS.flatMap((y, row) => [0, 1].flatMap((side) => Array.from({ length: unified ? 6 : 3 }, (_, strand) => {
        const start = side === 0 ? (compact ? 39 : 32) : (compact ? 61 : 68);
        const end = unified ? 49 + strand * 0.4 : side === 0 ? 42 + strand : 57 - strand;
        const offset = (strand - 2.5) * 0.65;
        const destination = unified ? 47 + row * 3 : y + (row % 2 ? -10 : 12) + strand * 2;
        return <path key={`${row}-${side}-${strand}`} d={`M${start} ${y + offset} C${side === 0 ? 45 : 55} ${y + offset}, ${end} ${destination - 12}, ${end} ${destination}`} stroke={unified ? "rgb(var(--blue))" : "rgb(var(--overcast))"} strokeOpacity={unified ? 0.3 + strand * 0.07 : 0.32 + strand * 0.08} strokeWidth="1.1" vectorEffect="non-scaling-stroke" />;
      })))}
      {!unified && ROWS.map((y, index) => <g key={y} stroke="rgb(var(--overcast))" strokeOpacity="0.5" strokeWidth="0.8" vectorEffect="non-scaling-stroke"><path d={`M45 ${y + 8}l1 -2m8 1 1 -2M48 ${y + 4}l1 -2`} vectorEffect="non-scaling-stroke" /><circle cx={index % 2 ? 56 : 43} cy={y + 13} r="0.35" fill="rgb(var(--overcast))" /></g>)}
    </svg>
  );
}

export function ProofComparisonMockup({ content: HOME_PROOF, pos, width, glide = false, showHint = true, nudge = false, onKeyDown, onFocus }: ProofComparisonMockupProps) {
  const compact = width < 640;
  const ease = glide ? styles.glide : styles.still;

  const landscape = (unified: boolean) => (
    <>
      <RelationshipField unified={unified} compact={compact} />
      {HOME_PROOF.nodes.map((node, index) => {
        const side = index < 3 ? 0 : 1;
        const row = index % 3;
        return (
          <div key={node.id} data-proof-node={unified ? "after" : "before"} className={cx(styles.node, compact ? styles.nodeCompact : styles.nodeWide)} style={{ left: `${side === 0 ? (compact ? 23 : 20) : (compact ? 77 : 80)}%`, top: `${ROWS[row]}%` }}>
            <div className={unified ? styles.nodeUnified : styles.nodeScattered}>
              <RecordMark unified={unified} index={index} />
              <div className={cx(styles.nodeLabel, unified ? styles.nodeLabelUnified : styles.nodeLabelScattered)}>
                <span>{String(index + 1).padStart(2, "0")}</span><span>{node.beforeLabel}</span>
              </div>
              <p className={styles.nodeText}>{unified ? node.afterLabel : node.beforeDetail}</p>
            </div>
          </div>
        );
      })}
      {unified && <div className={styles.seam}>
        <div className={styles.seamMark}><DhiraLogo className={styles.seamLogo} /></div>
        <span className={styles.seamLabel}>{HOME_PROOF.seamLabel}</span>
      </div>}
    </>
  );

  return (
    <div className={styles.root}>
      <div aria-hidden="true" className={styles.canvas}>
        <div className={styles.after}>{landscape(true)}</div>
        <div data-proof-before className={cx(styles.before, ease)} style={{ width: `${pos}%` }}>
          <div className={styles.beforeInner} style={{ width }}>{landscape(false)}</div>
        </div>
        <div className={styles.sides}>
          <span className={cx(styles.side, styles.sideBefore)}>{HOME_PROOF.before}</span>
          <span className={cx(styles.side, styles.sideAfter)}>{HOME_PROOF.after}</span>
        </div>
        <div className={cx(styles.line, ease)} style={{ left: `${pos}%` }} />
      </div>
      <div
        role="slider"
        aria-label={HOME_PROOF.sliderLabel}
        aria-describedby="proof-instructions"
        aria-orientation="horizontal"
        aria-valuemin={4}
        aria-valuemax={96}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)}% ${HOME_PROOF.sliderValue.before}, ${Math.round(100 - pos)}% ${HOME_PROOF.sliderValue.after}`}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        className={cx(styles.slider, ease)}
        style={{ left: `${pos}%` }}
      >
        <div aria-hidden="true" className={cx(styles.handle, nudge && styles.nudge)}>
          <svg viewBox="0 0 24 24" className={styles.handleIcon} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m8 7-4 5 4 5m8-10 4 5-4 5M11 8v8m2-8v8" /></svg>
          {showHint && pos > 20 && pos < 80 && <span className={styles.hint}>{HOME_PROOF.dragHint}</span>}
        </div>
      </div>
    </div>
  );
}
