"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import ProofComparisonMockup from "@/components/demos/mockups/ProofComparisonMockup";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import type { HomeProof } from "@/content/pages/home";

const BEFORE_END = 96;
const AFTER_END = 4;
const DEMO_STEPS: readonly [number, number][] = [[600, BEFORE_END], [2000, AFTER_END], [3400, BEFORE_END], [4150, AFTER_END], [4900, 50]];
const DEMO_NUDGE_MS = 5600;

export default function TheProof({ content: HOME_PROOF }: { content: HomeProof }) {
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
    <section id="proof" className="relative overflow-hidden bg-background pt-12 pb-16 lg:pt-16 lg:pb-24">
      <ScrollRevealRail>
        <SectionHeader
          num={HOME_PROOF.eyebrow.number}
          label={HOME_PROOF.eyebrow.label}
          setup={HOME_PROOF.title.setup}
          payoff={HOME_PROOF.title.payoff}
          lede={HOME_PROOF.description}
        />

        <ScrollReveal delay={80}>
          <div className="mx-auto mt-12 max-w-[1100px] lg:mt-14">
            <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p id="proof-instructions" className="text-[13px] text-inkSoft">
                {HOME_PROOF.instruction}<span className="sr-only"> {HOME_PROOF.keyboardInstruction}</span>
              </p>
              <div role="group" aria-label={HOME_PROOF.viewLabel} className="inline-flex rounded-btn border border-default-stroke bg-primary-bg p-1">
                {([{ id: "before", label: HOME_PROOF.views.before, target: BEFORE_END }, { id: "compare", label: HOME_PROOF.views.compare, target: 50 }, { id: "after", label: HOME_PROOF.views.after, target: AFTER_END }] as const).map((item) => (
                  <button key={item.id} type="button" aria-pressed={mode === item.id} onClick={() => showSide(item.target)} className={`min-h-10 rounded-chip px-4 text-[13px] font-medium transition-colors duration-250 motion-reduce:transition-none sm:px-5 ${mode === item.id ? "bg-ink text-on-action " : "text-inkSoft hover:bg-tertiary-bg hover:text-ink"}`}>
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
              className="relative h-[490px] w-full touch-pan-y cursor-ew-resize select-none rounded-outer border border-lineSoft bg-primary-bg  sm:h-auto sm:min-h-[580px] sm:aspect-[1100/660] lg:min-h-0"
            >
              <ProofComparisonMockup content={HOME_PROOF} pos={pos} width={width} glide={glide && !reduced} showHint={!used} nudge={nudge && !reduced} onKeyDown={handleKeyDown} onFocus={stopDemo} />
            </div>
            <div className="sr-only">
              <h3>{HOME_PROOF.before}</h3><ul>{HOME_PROOF.nodes.map((node) => <li key={node.id}>{node.beforeLabel}: {node.beforeDetail}</li>)}</ul>
              <h3>{HOME_PROOF.after}</h3><ul>{HOME_PROOF.nodes.map((node) => <li key={node.id}>{node.afterLabel}</li>)}</ul>
            </div>
            {/* The section ends on the comparison's caption. Its "See how we
                deliver it" button went on 20 Oct 2026: no section ends on a
                button (founder). */}
            <div className="mt-5">
              <p className="text-[14px] leading-relaxed text-inkSoft">{HOME_PROOF.summary}</p>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-eyebrow text-inkSoft">{HOME_PROOF.illustrationLabel}</p>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
