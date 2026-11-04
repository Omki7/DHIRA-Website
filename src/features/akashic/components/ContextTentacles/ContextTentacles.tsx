"use client";

/*
 * The context tentacles under the outcome-card stage, homepage [02] since
 * 23 Oct 2026 (built for the /akashic hero; restored 20 Oct 2026
 * from HexConnectionsMockup, git 3b9d8c4, on the founder's request).
 *
 * One node per module screen above it, in the SAME order: the module's name,
 * then what it adds to the organisation's context. Four hairlines leave each
 * node and converge on the context box below, so the drawing says what the
 * seven modules are for. The nodes are also the stage's index: pressing one
 * brings its screen to the front, and the front screen's lines turn blue and
 * run (`dashmove`, held off screen by OffscreenAnimationGate).
 *
 * lg and up only. Below lg the seven nodes would sit under 120px apart, so phones
 * and tablets get the same index as one scrolling row of module names.
 *
 * `control` (the tour's pause icon) ends the index: on the dot line past the
 * last node, or after the scrolling row.
 */

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AkashicWordmark } from "@/shared/components/icons";
import styles from "./ContextTentacles.module.scss";

export type TentacleNode = { module: string; adds: string };

const ROW_Y = 54; // where the lines leave the nodes
const CONVERGE_Y = 196; // top edge of the context box: every line ends here
const LINES_PER_NODE = 4;
const SPREAD = 132; // endpoint fan across the box's top edge

const curve = (x1: number, y1: number, x2: number, y2: number) => {
  const cy = y1 + (y2 - y1) * 0.78;
  return `M ${x1} ${y1} C ${x1} ${cy}, ${x2} ${cy}, ${x2} ${y2}`;
};

export interface ContextTentaclesProps {
  nodes: TentacleNode[];
  active: number;
  resetKey: number;
  /** 0 under reduced motion: no progress fill. */
  durationMs: number;
  onSelect: (index: number) => void;
  control?: ReactNode;
}

export function ContextTentacles({
  nodes,
  active,
  resetKey,
  durationMs,
  onSelect,
  control,
}: ContextTentaclesProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width)
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const spacing = width / (nodes.length + 1);
  const cx = width / 2;

  const progress = (isActive: boolean) =>
    isActive &&
    durationMs > 0 && (
      <span
        key={resetKey}
        aria-hidden
        className={styles.progressSpan}
        style={{
          animation: `progressFill ${durationMs}ms linear forwards`,
        }}
      />
    );

  return (
    <>
      {/* lg and up: the drawing, with the nodes as its controls. */}
      <div ref={ref} className={styles.desktopWrap}>
        <svg aria-hidden className={styles.svg}>
          {nodes.map((node, i) => {
            const x = spacing * (i + 1);
            const on = i === active;
            return (
              <g key={node.module}>
                {Array.from({ length: LINES_PER_NODE }, (_, k) => {
                  const offset =
                    (k - (LINES_PER_NODE - 1) / 2) * (SPREAD / LINES_PER_NODE);
                  return (
                    <path
                      key={k}
                      d={curve(x, ROW_Y, cx + offset, CONVERGE_Y)}
                      fill="none"
                      stroke={on ? "rgb(var(--blue))" : "rgb(var(--line))"}
                      strokeWidth={on ? 1.1 : 0.8}
                      strokeDasharray={on ? "3 5" : undefined}
                      className={on ? styles.pathRunning : undefined}
                      style={{
                        transition:
                          "stroke-opacity 400ms cubic-bezier(0.2,0.8,0.2,1)",
                      }}
                    />
                  );
                })}
              </g>
            );
          })}
        </svg>

        {nodes.map((node, i) => {
          const on = i === active;
          return (
            <button
              key={node.module}
              type="button"
              onClick={() => onSelect(i)}
              className={styles.nodeButton}
              style={{ left: spacing * (i + 1), width: 140 }}
            >
              <span
                className={`${styles.nodePill} ${
                  on ? styles.nodePillOn : styles.nodePillOff
                }`}
              >
                {progress(on)}
                {node.module}
              </span>
              <span
                className={`${styles.nodeAdds} ${
                  on ? styles.nodeAddsOn : styles.nodeAddsOff
                }`}
              >
                {node.adds}
              </span>
            </button>
          );
        })}

        {control && (
          <div
            className={styles.controlWrap}
            style={{ left: spacing * (nodes.length + 0.5) }}
          >
            {control}
          </div>
        )}

        {/* The context ground everything connects into */}
        <div className={styles.contextBox}>
          <AkashicWordmark className={styles.contextWordmark} />
          <span className={styles.contextLabel}>Universal Context</span>
          <span className={styles.contextDesc}>
            one ground for your organisation
          </span>
        </div>
      </div>

      {/* Below lg: horizontal scrolling tabs + active summary card */}
      <div className={styles.mobileWrap}>
        <div className={styles.mobileRow}>
          {nodes.map((node, i) => {
            const on = i === active;
            return (
              <button
                key={node.module}
                type="button"
                onClick={() => onSelect(i)}
                className={`${styles.mobileTab} ${
                  on ? styles.mobileTabOn : styles.mobileTabOff
                }`}
              >
                {progress(on)}
                {node.module}
              </button>
            );
          })}
          {control && <div className="shrink-0">{control}</div>}
        </div>
        <div className={styles.mobileBox}>
          <AkashicWordmark className={styles.contextWordmark} />
          <div className={styles.mobileBoxDetails}>
            <span className={styles.mobileBoxTitle}>
              {nodes[active]?.module}
            </span>
            <span className={styles.mobileBoxAdds}>
              {nodes[active]?.adds}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
