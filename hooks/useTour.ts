"use client";

import { useEffect, useRef, useState, type FocusEvent } from "react";
import { animate, useMotionValue } from "framer-motion";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const SETTLE = [0.2, 0.8, 0.2, 1] as const;

/* A figure that walks through its items on its own, the homepage way
   (sectors, the module tour): each item holds for `dwell` while `progress`
   fills 0 → 1, then the next takes over. The clock freezes off screen
   (Rule 6a) and while the pointer or keyboard focus is inside the figure,
   and never runs under reduced motion. A reader's pick stops the tour until
   Play (Rule 6b), and so does a link to an item (`target`, from
   useHashTarget); a stopped tour redraws `progress` quickly so a pick still
   traces in. Spread `hold` on the figure, put `ref` on the element whose
   visibility counts, and give `paused` and `toggle` to ui/MotionToggle. */
export default function useTour<T extends Element>(count: number, { dwell = 7000, target = -1 }: { dwell?: number; target?: number } = {}) {
  const ref = useRef<T>(null);
  const onScreen = useOnScreen(ref);
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState({ active: 0, at: -1, paused: false, run: 0 });
  const [held, setHeld] = useState(false);

  // A new link wins until the reader picks or presses Play.
  const linked = target >= 0 && state.at !== target;
  const active = linked ? target : state.active;
  const paused = linked || state.paused;
  const stopped = reduced || paused;
  const cycling = !stopped && onScreen && !held;

  const progress = useMotionValue(1);
  const clock = useRef<ReturnType<typeof animate> | null>(null);

  // One run per item: a linear fill that hands over on completion, or,
  // when stopped, a short draw to full.
  useEffect(() => {
    if (reduced) {
      progress.set(1);
      return;
    }
    progress.set(0);
    const controls = paused
      ? animate(progress, 1, { duration: 0.6, ease: SETTLE })
      : animate(progress, 1, {
          duration: dwell / 1000,
          ease: "linear",
          onComplete: () => setState((s) => ({ ...s, active: (s.active + 1) % count })),
        });
    clock.current = controls;
    return () => controls.stop();
  }, [paused, reduced, active, state.run, dwell, count, progress]);

  // Off screen or held, the running fill freezes where it is.
  useEffect(() => {
    if (stopped) return;
    if (onScreen && !held) clock.current?.play();
    else clock.current?.pause();
  }, [stopped, onScreen, held, active, state.run]);

  const pick = (i: number) => setState((s) => ({ active: i, at: target, paused: true, run: s.run + 1 }));
  const toggle = () => setState((s) => ({ active, at: target, paused: !paused, run: s.run + 1 }));
  const hold = {
    onPointerEnter: () => setHeld(true),
    onPointerLeave: () => setHeld(false),
    onFocus: () => setHeld(true),
    onBlur: (event: FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setHeld(false);
    },
  };

  return { ref, active, paused, cycling, progress, pick, toggle, hold };
}
