"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { MotionToggle } from "@/shared/components/ui";
import useDrawn from "@/shared/hooks/useDrawn";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import styles from "./AkashicModules.module.scss";

/*
 * The question's path through [04] (4 Nov 2026, user: "the path should flow
 * through the layers"; no path per team). The rows are Server Components,
 * passed in as `children`; each carries one numbered node in the flow
 * column (`data-flow-node` 1 to 6, top to bottom) and the teams' row also
 * carries the return node (7). This leaf measures the nodes and draws ONE
 * loop: down through every layer to your systems, a turn, then back up to
 * the person who asked. Chevrons mark the direction on both legs.
 *
 * Motion: the rows fade in, the loop draws once, then one pulse travels it
 * (SMIL). The pulse is held off screen and by ui/MotionToggle (Rule 6b);
 * nothing moves under reduced motion. The SVG is `data-own-motion`, so the
 * OffscreenAnimationGate leaves its timeline to this component. Drawn from
 * lg; below lg each row shows its step under its content.
 */

interface Geometry {
  d: string;
  arrows: { x: number; y: number; up: boolean }[];
  w: number;
  h: number;
}

/* The loop's turn sits this far under the last node. */
const TURN = 34;
/* When the pulse starts: the loop has finished drawing. */
const PULSE_BEGIN = "2.3s";
const round = (n: number) => Math.round(n * 2) / 2;

export interface ArchitectureFlowProps {
  label: string;
  /** What the pause control stops, for its accessible name. */
  motion: string;
  children: ReactNode;
}

export function ArchitectureFlow({ label, motion, children }: ArchitectureFlowProps) {
  const [rootRef, drawn] = useDrawn<HTMLDivElement>(0.12);
  const onScreen = useOnScreen(rootRef);
  const reduced = usePrefersReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const [geometry, setGeometry] = useState<Geometry | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg) return;

    const measure = () => {
      if (getComputedStyle(svg).display === "none") {
        setGeometry(null);
        return;
      }
      const base = root.getBoundingClientRect();
      const centre = (n: number) => {
        const el = root.querySelector<HTMLElement>(`[data-flow-node="${n}"]`);
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { x: round(r.left - base.left + r.width / 2), y: round(r.top - base.top + r.height / 2) };
      };
      const down = [1, 2, 3, 4, 5, 6].map(centre);
      const back = centre(7);
      if (!back || down.some((p) => p === null)) {
        setGeometry(null);
        return;
      }
      const nodes = down as { x: number; y: number }[];
      const x = nodes[0].x;
      const r = (back.x - x) / 2;
      const bottom = nodes[5].y + TURN;
      const d = `M${x} ${nodes[0].y}V${bottom - r}A${r} ${r} 0 0 0 ${back.x} ${bottom - r}V${back.y}`;

      // One chevron where the path crosses from one row into the next.
      const arrows: Geometry["arrows"] = [];
      for (let i = 0; i < nodes.length - 1; i++) {
        const y = round((nodes[i].y + nodes[i + 1].y) / 2);
        arrows.push({ x, y, up: false });
        if (i > 0) arrows.push({ x: back.x, y, up: true });
      }
      arrows.push({ x: back.x, y: round((back.y + nodes[1].y) / 2), up: true });
      setGeometry({ d, arrows, w: round(base.width), h: round(base.height) });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    void document.fonts?.ready.then(measure);
    return () => observer.disconnect();
  }, [rootRef]);

  // The pulse's clock starts when the figure is first seen, so it leaves
  // node 1 once the loop has drawn.
  useEffect(() => {
    if (drawn) svgRef.current?.setCurrentTime(0);
  }, [drawn]);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (paused || !onScreen) svg.pauseAnimations();
    else svg.unpauseAnimations();
  }, [paused, onScreen, geometry]);

  return (
    <div ref={rootRef} data-drawn={drawn} className={styles.diagram}>
      <div className={styles.flowHead}>
        <p className={styles.flowTitle}>{label}</p>
        <MotionToggle paused={paused} onToggle={() => setPaused((p) => !p)} controls={motion} />
      </div>

      {children}

      <svg
        ref={svgRef}
        data-own-motion=""
        aria-hidden="true"
        focusable="false"
        className={styles.flowSvg}
        width={geometry?.w ?? 0}
        height={geometry?.h ?? 0}
        viewBox={geometry ? `0 0 ${geometry.w} ${geometry.h}` : undefined}
        fill="none"
      >
        {geometry && (
          <>
            <path d={geometry.d} pathLength={1} className={styles.flowLine} />
            {geometry.arrows.map(({ x, y, up }) => (
              <path
                key={`${x}-${y}`}
                d={up ? `M${x - 3.5} ${y + 2}L${x} ${y - 2}L${x + 3.5} ${y + 2}` : `M${x - 3.5} ${y - 2}L${x} ${y + 2}L${x + 3.5} ${y - 2}`}
                className={styles.flowArrow}
              />
            ))}
            {drawn && !reduced && (
              <circle r={4.5} opacity={0} className={styles.flowPulse}>
                {/* Hidden at the origin until its first lap begins. */}
                <set attributeName="opacity" to="1" begin={PULSE_BEGIN} fill="freeze" />
                <animateMotion dur="7s" begin={PULSE_BEGIN} repeatCount="indefinite" calcMode="paced" path={geometry.d} />
              </circle>
            )}
          </>
        )}
      </svg>
    </div>
  );
}
