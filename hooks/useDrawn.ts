"use client";

import { useEffect, useRef, useState } from "react";

/* True once the element has entered view; immediately true under reduced
   motion. Pair with `data-drawn={drawn}` and the `.ad-*` classes in
   globals.css, which draw a figure in once and land on its final state. */
export default function useDrawn<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, drawn] as const;
}
