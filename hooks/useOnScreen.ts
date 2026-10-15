"use client";

import { useEffect, useState, type RefObject } from "react";

/* True while the element is on screen. Auto-cycling carousels and rotators
   gate their timers on it: left running off screen, every tick restarts
   animations that Chrome then runs on the main thread, which kept pages busy
   while the visitor scrolled somewhere else entirely. */
export default function useOnScreen(ref: RefObject<Element | null>) {
  const [onScreen, setOnScreen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref]);

  return onScreen;
}
