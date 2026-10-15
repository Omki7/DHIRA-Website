"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PageSection } from "@/lib/pageSection";

export type { PageSection };

const SCROLL_SETTLE_MS = 180;
const HEADER_OFFSET = 88;

interface ScrollDestination {
  id: string;
  focus: boolean;
}

export function usePageScrollSpy(sections: PageSection[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const destination = useRef<ScrollDestination | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishScroll = useRef<() => void>(() => {});

  useEffect(() => {
    const items = sections.flatMap((section) => {
      const element = document.getElementById(section.id);
      return element ? [{ id: section.id, element }] : [];
    });
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!items.length || destination.current) return;

      const offset = Math.max(window.innerHeight * 0.35, 160);
      let next = items[0].id;
      for (const { id, element } of items) {
        if (element.getBoundingClientRect().top <= offset) next = id;
      }
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        next = items[items.length - 1].id;
      }
      setActiveId((current) => current === next ? current : next);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const clearTimer = () => {
      if (settleTimer.current) clearTimeout(settleTimer.current);
      settleTimer.current = null;
    };

    const finish = () => {
      clearTimer();
      const completed = destination.current;
      destination.current = null;
      update();

      if (completed?.focus) {
        const target = document.getElementById(completed.id);
        if (target) {
          const hadTabIndex = target.hasAttribute("tabindex");
          if (!hadTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
        }
      }
    };
    finishScroll.current = finish;

    const onScroll = () => {
      scheduleUpdate();
      // Also covers browsers without scrollend and a jump to the current position.
      if (destination.current) {
        clearTimer();
        settleTimer.current = setTimeout(finish, SCROLL_SETTLE_MS);
      }
    };
    const onScrollEnd = (event: Event) => {
      if (event.target === document || event.target === window) finish();
    };

    const interrupt = () => {
      clearTimer();
      destination.current = null;
      scheduleUpdate();
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!event.defaultPrevented && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(event.key)) interrupt();
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    items.forEach(({ element }) => resizeObserver.observe(element));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("pointerdown", interrupt, { passive: true });
    window.addEventListener("keydown", onKeyDown);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(frame);
      clearTimer();
      destination.current = null;
      finishScroll.current = () => {};
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("pointerdown", interrupt);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sections]);

  const scrollTo = useCallback((id: string, focus = false) => {
    const target = document.getElementById(id);
    if (!target) return;

    if (settleTimer.current) clearTimeout(settleTimer.current);
    destination.current = { id, focus };
    setActiveId(id);
    const hash = `#${encodeURIComponent(id)}`;
    if (window.location.hash !== hash) window.history.pushState(window.history.state, "", hash);

    const offset = Math.max(HEADER_OFFSET, parseFloat(getComputedStyle(target).scrollMarginTop) || 0);
    const top = id === sections[0]?.id ? 0 : Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reducedMotion ? "instant" : "smooth" });
    settleTimer.current = setTimeout(() => finishScroll.current(), SCROLL_SETTLE_MS);
  }, [sections]);

  return { activeId, scrollTo };
}
