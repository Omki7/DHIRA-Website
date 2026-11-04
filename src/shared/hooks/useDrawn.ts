"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "./usePrefersReducedMotion";

/* True once the element has entered view; always true under reduced
   motion. Pair with `data-drawn={drawn}` and the `.ad-*` classes in
   globals.css, which draw a figure in once and land on its final state. */
export default function useDrawn<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, reduced]);

  return [ref, reduced || seen] as const;
}
