"use client";

import { useEffect, useRef, useState } from "react";
import type { PageSection } from "@/lib/pageSection";

export type { PageSection };

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePageScrollSpy(sections: PageSection[]) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");
  const lastIdRef = useRef(activeId);
  const elementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined") return;

    const collectElements = () => {
      const map = new Map<string, HTMLElement>();
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) map.set(section.id, el);
      }
      elementsRef.current = map;
    };

    const update = () => {
      const items = sections
        .map((s) => ({ ...s, el: elementsRef.current.get(s.id) }))
        .filter((s): s is typeof s & { el: HTMLElement } => !!s.el);

      if (items.length === 0) return;

      const offset = Math.max(window.innerHeight * 0.35, 160);
      let next = items[0].id;

      for (const item of items) {
        const { top } = item.el.getBoundingClientRect();
        if (top <= offset) next = item.id;
      }

      if (next !== lastIdRef.current) {
        lastIdRef.current = next;
        setActiveId(next);
      }
    };

    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    const onResize = () => {
      collectElements();
      update();
    };

    collectElements();
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, [sections]);

  return activeId;
}

export function usePageSmoothScroll() {
  return (id: string) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
    });
  };
}
