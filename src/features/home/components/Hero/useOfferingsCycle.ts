"use client";

import { useCallback, useState, type RefObject } from "react";
import useOnScreen from "@/shared/hooks/useOnScreen";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";

/** How the active offering's loading bar shows: "run" fills it and advances
    when full, "hold" freezes it where it is (paused), "full" under reduced
    motion, where nothing advances. */
export type OfferingsFill = "run" | "hold" | "full";

export interface OfferingsCycle {
  active: number;
  fill: OfferingsFill;
  /** False while the hero is off screen or the pointer or focus rests on
      the offerings: a running bar waits (Rule 6a, and time to read). */
  moving: boolean;
  /** Stopped by the reader with Pause (Rule 6b). */
  paused: boolean;
  /** Under reduced motion nothing advances, so there is nothing to pause. */
  canPause: boolean;
  advance: () => void;
  /** Shows one offering (pointer or focus on it) without stopping the cycle. */
  show: (index: number) => void;
  togglePause: () => void;
  setResting: (resting: boolean) => void;
}

/* The hero's one clock. The loading bar's own CSS animation is the timer:
   when it ends, `advance` moves to the next offering, so the bar and the
   swap can never drift apart, and pausing is the animation's play state. */
export function useOfferingsCycle(count: number, ref: RefObject<Element | null>): OfferingsCycle {
  const reduced = usePrefersReducedMotion();
  const onScreen = useOnScreen(ref);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [resting, setResting] = useState(false);

  const advance = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const show = useCallback((index: number) => setActive(index), []);
  const togglePause = useCallback(() => setPaused((p) => !p), []);

  let fill: OfferingsFill = "run";
  if (reduced) fill = "full";
  else if (paused) fill = "hold";

  return {
    active,
    fill,
    moving: onScreen && !resting,
    paused,
    canPause: !reduced,
    advance,
    show,
    togglePause,
    setResting,
  };
}
