"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/* Hover intent and close grace for the nav sheet. Timings follow NN/G and
   what Stripe, Vercel and Linear measured at on 14 Oct 2026:
   - a mouse resting on a trigger opens its menu after MENU_OPEN_DELAY;
   - once any menu is open, moving to another trigger switches at once;
   - leaving the header and sheet closes after MENU_CLOSE_DELAY;
   - a click on a trigger (the chevron; the label beside it is a link) pins
     a hover-opened menu (it does not toggle it shut under the cursor); a
     second click, Escape, the scrim or focus leaving closes it.
   Keyboard activation (click with detail 0) and touch always toggle. */
const MENU_OPEN_DELAY = 120;
const MENU_CLOSE_DELAY = 300;

type Mode = "hover" | "pinned";

export default function useMenuIntent() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openRef = useRef<string | null>(null);
  const modeRef = useRef<Mode>("hover");
  const openTimer = useRef<number | undefined>(undefined);
  const closeTimer = useRef<number | undefined>(undefined);

  const clearTimers = useCallback(() => {
    window.clearTimeout(openTimer.current);
    window.clearTimeout(closeTimer.current);
  }, []);

  const set = useCallback((id: string | null, mode: Mode = modeRef.current) => {
    openRef.current = id;
    modeRef.current = mode;
    setOpenId(id);
  }, []);

  /** Mouse rests on a trigger. */
  const hoverTrigger = useCallback(
    (id: string) => {
      clearTimers();
      if (openRef.current) {
        set(id);
        return;
      }
      openTimer.current = window.setTimeout(() => set(id, "hover"), MENU_OPEN_DELAY);
    },
    [clearTimers, set]
  );

  /** Mouse left a trigger before its intent delay ran out. */
  const leaveTrigger = useCallback(() => {
    window.clearTimeout(openTimer.current);
  }, []);

  /** Mouse is back inside the header or sheet. */
  const enterRegion = useCallback(() => {
    window.clearTimeout(closeTimer.current);
  }, []);

  /** Mouse left the header and sheet, or rests on a non-menu item. */
  const leaveRegion = useCallback(() => {
    window.clearTimeout(openTimer.current);
    if (!openRef.current || modeRef.current === "pinned") return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => set(null), MENU_CLOSE_DELAY);
  }, [set]);

  /** Click on a trigger. `byPointer` is false for Enter / Space. */
  const toggle = useCallback(
    (id: string, byPointer: boolean) => {
      clearTimers();
      if (openRef.current === id) {
        if (byPointer && modeRef.current === "hover") {
          modeRef.current = "pinned";
          return;
        }
        set(null);
        return;
      }
      set(id, "pinned");
    },
    [clearTimers, set]
  );

  const close = useCallback(() => {
    clearTimers();
    set(null, "hover");
  }, [clearTimers, set]);

  useEffect(() => clearTimers, [clearTimers]);

  return { openId, hoverTrigger, leaveTrigger, enterRegion, leaveRegion, toggle, close };
}
