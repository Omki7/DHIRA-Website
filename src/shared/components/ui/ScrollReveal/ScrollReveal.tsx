"use client";

import { useEffect, useRef, useState } from "react";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./ScrollReveal.module.scss";

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

/* Fades and lifts its children in once they enter the viewport, after
   `delay` ms. Under reduced motion the content simply rests visible. */
export function ScrollReveal({ children, className, delay = 0 }: ScrollRevealProps) {
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
      className={cx(styles.root, className, visible ? styles.visible : styles.concealed)}
    >
      {children}
    </div>
  );
}
