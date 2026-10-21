"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/* Fades and lifts its children in once they enter the viewport, after
   `delay` ms. Under reduced motion the content simply rests visible. */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const visible = reduced || revealed;

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced) return;

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          revealTimer = setTimeout(() => setRevealed(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      clearTimeout(revealTimer);
    };
  }, [delay, reduced]);

  return (
    <div
      ref={ref}
      className={`transition-[opacity,transform] duration-500 ease-settle motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none ${className} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
