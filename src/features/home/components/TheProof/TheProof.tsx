"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import type { HomeProof } from "@/content/pages/home";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import { ProofComparisonMockup } from "../../mockups/ProofComparisonMockup";
import styles from "./TheProof.module.scss";

const BEFORE_END = 96;
const AFTER_END = 4;
const DEMO_STEPS: readonly [number, number][] = [[600, BEFORE_END], [2000, AFTER_END], [3400, BEFORE_END], [4150, AFTER_END], [4900, 50]];
const DEMO_NUDGE_MS = 5600;

export interface TheProofProps {
  content: HomeProof;
}

export function TheProof({ content: HOME_PROOF }: TheProofProps) {
  const [pos, setPos] = useState(50);
  const [width, setWidth] = useState(1100);
  const [glide, setGlide] = useState(false);
  const [used, setUsed] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [dragging, setDragging] = useState(false);
  const graphRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<number | null>(null);
  const demoStarted = useRef(false);
  const interacted = useRef(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const reduced = usePrefersReducedMotion();

  const clearDemo = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const stopDemo = useCallback(() => {
    interacted.current = true;
    clearDemo();
    setNudge(false);
    setUsed(true);
  }, [clearDemo]);

  useEffect(() => {
    const node = graphRef.current;
    if (!node) return;
    const measure = () => {
      if (node.clientWidth > 0) setWidth(node.clientWidth);
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(node);
    return () => resize.disconnect();
  }, []);

  useEffect(() => {
    const node = graphRef.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || interacted.current || demoStarted.current) return;
      const handleY = entry.boundingClientRect.top + entry.boundingClientRect.height * 0.46;
      if (handleY < 80 || handleY > window.innerHeight - 60) return;
      demoStarted.current = true;
      observer.disconnect();
      for (const [delay, target] of DEMO_STEPS) {
        timers.current.push(setTimeout(() => { setGlide(true); setPos(target); }, delay));
      }
      timers.current.push(setTimeout(() => setNudge(true), DEMO_NUDGE_MS));
    }, { threshold: Array.from({ length: 21 }, (_, index) => index / 20) });
    observer.observe(node);
    return () => { observer.disconnect(); clearDemo(); };
  }, [clearDemo]);

  useEffect(() => {
    if (reduced) clearDemo();
  }, [reduced, clearDemo]);

  const updatePos = (clientX: number) => {
    const bounds = graphRef.current?.getBoundingClientRect();
    if (!bounds) return;
    setPos(Math.max(AFTER_END, Math.min(BEFORE_END, ((clientX - bounds.left) / bounds.width) * 100)));
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    stopDemo();
    setGlide(false);
    pointer.current = event.pointerId;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.querySelector<HTMLElement>('[role="slider"]')?.focus({ preventScroll: true });
    updatePos(event.clientX);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (pointer.current !== event.pointerId) return;
    pointer.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const showSide = (target: number) => {
    stopDemo();
    setGlide(!reduced);
    setPos(target);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4;
    let target = pos;
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") target -= step;
    else if (event.key === "ArrowRight" || event.key === "ArrowUp") target += step;
    else if (event.key === "Home") target = AFTER_END;
    else if (event.key === "End") target = BEFORE_END;
    else return;
    event.preventDefault();
    stopDemo();
    setGlide(!reduced && (event.key === "Home" || event.key === "End"));
    setPos(Math.max(AFTER_END, Math.min(BEFORE_END, target)));
  };

  const mode = pos >= 90 ? "before" : pos <= 10 ? "after" : "compare";

  return (
    <section id="proof" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={HOME_PROOF.eyebrow.number}
          label={HOME_PROOF.eyebrow.label}
          setup={HOME_PROOF.title.setup}
          payoff={HOME_PROOF.title.payoff}
          lede={HOME_PROOF.description}
        />

        <ScrollReveal delay={80}>
          <div className={styles.stage}>
            <div className={styles.toolbar}>
              <p id="proof-instructions" className={styles.srOnly}>{HOME_PROOF.keyboardInstruction}</p>
              <div role="group" aria-label={HOME_PROOF.viewLabel} className={styles.views}>
                {([{ id: "before", label: HOME_PROOF.views.before, target: BEFORE_END }, { id: "compare", label: HOME_PROOF.views.compare, target: 50 }, { id: "after", label: HOME_PROOF.views.after, target: AFTER_END }] as const).map((item) => (
                  <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => showSide(item.target)} className={cx(styles.view, mode === item.id ? styles.viewActive : styles.viewIdle)}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div
              ref={graphRef}
              data-proof-stage
              data-dragging={dragging}
              onPointerDown={handlePointerDown}
              onPointerMove={(event) => { if (pointer.current === event.pointerId) updatePos(event.clientX); }}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              onLostPointerCapture={() => { pointer.current = null; setDragging(false); }}
              className={styles.graph}
            >
              <ProofComparisonMockup content={HOME_PROOF} pos={pos} width={width} glide={glide && !reduced} showHint={!used} nudge={nudge && !reduced} onKeyDown={handleKeyDown} onFocus={stopDemo} />
            </div>
            <div className={styles.srOnly}>
              <h3>{HOME_PROOF.before}</h3><ul>{HOME_PROOF.nodes.map((node) => <li key={node.id}>{node.beforeLabel}: {node.beforeDetail}</li>)}</ul>
              <h3>{HOME_PROOF.after}</h3><ul>{HOME_PROOF.nodes.map((node) => <li key={node.id}>{node.afterLabel}</li>)}</ul>
            </div>
            {/* The section ends on the comparison's caption. Its "See how we
                deliver it" button went on 20 Oct 2026: no section ends on a
                button (founder). */}
            <div className={styles.caption}>
              <p className={styles.summary}>{HOME_PROOF.summary}</p>
              <p className={styles.label}>{HOME_PROOF.illustrationLabel}</p>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
