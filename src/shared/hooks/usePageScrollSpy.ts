"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { PageSection } from "@/content/types";
import { findTargetElement, sectionScrollTop } from "@/shared/utils/navigation";

export type { PageSection };

const SCROLL_SETTLE_MS = 800;

interface ScrollDestination {
  id: string;
  focus: boolean;
}

export function usePageScrollSpy(sections: PageSection[]) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const destination = useRef<ScrollDestination | null>(null);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finishScroll = useRef<() => void>(() => {});
  const userHasScrolled = useRef(false);
  const lastDispatchedHash = useRef<string | null>(null);

  useEffect(() => {
    userHasScrolled.current = false;

    const items = sections.flatMap((section) => {
      const element = document.getElementById(section.id);
      return element ? [{ id: section.id, element }] : [];
    });
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!items.length || destination.current) return;

      // Guard: if layout is not yet computed, all elements will share the same bounding client rect top
      if (items.length > 1) {
        const firstTop = items[0].element.getBoundingClientRect().top;
        const lastTop = items[items.length - 1].element.getBoundingClientRect().top;
        if (Math.abs(firstTop - lastTop) < 10) return;
      }

      const offset = Math.max(window.innerHeight * 0.35, 160);
      let next = items[0].id;

      if (window.scrollY < 80) {
        next = items[0].id;
      } else {
        for (const { id, element } of items) {
          if (element.getBoundingClientRect().top <= offset) next = id;
        }
        if (
          window.scrollY > 200 &&
          document.documentElement.scrollHeight > window.innerHeight * 1.5 &&
          window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 20
        ) {
          next = items[items.length - 1].id;
        }
      }

      setActiveId(next);

      // Only update URL history if the user has genuinely scrolled!
      // This prevents mounting / resize observers from rewriting URL or jumping to last section.
      if (!userHasScrolled.current) {
        return;
      }

      if (typeof window !== "undefined") {
        const isFirst = next === sections[0]?.id;
        const currentCleanHash = window.location.hash.replace(/^#/, "");
        const currentTargetElem = currentCleanHash ? document.getElementById(currentCleanHash) : null;
        const activeSectionElem = document.getElementById(next);
        const isSubAnchorOfActive = Boolean(
          currentTargetElem &&
          activeSectionElem &&
          (activeSectionElem === currentTargetElem || activeSectionElem.contains(currentTargetElem))
        );

        const targetHash = isFirst ? "" : isSubAnchorOfActive ? `#${currentCleanHash}` : `#${next}`;
        if (lastDispatchedHash.current !== targetHash) {
          lastDispatchedHash.current = targetHash;
          if (window.location.hash !== targetHash) {
            const cleanUrl = isFirst ? window.location.pathname + window.location.search : targetHash;
            window.history.replaceState(window.history.state, "", cleanUrl);
          }
          window.dispatchEvent(new CustomEvent("akashic-hashchange", { detail: targetHash }));
        }
      }
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
      if (destination.current) {
        clearTimer();
        const targetElem = document.getElementById(destination.current.id);
        const targetTop = destination.current.id === sections[0]?.id ? 0 : (targetElem ? sectionScrollTop(targetElem) : 0);
        if (Math.abs(window.scrollY - targetTop) <= 4) {
          finish();
        } else {
          settleTimer.current = setTimeout(finish, SCROLL_SETTLE_MS);
        }
      }
    };

    const onScrollEnd = (event: Event) => {
      if (event.target === document || event.target === window) finish();
    };

    const interrupt = () => {
      clearTimer();
      destination.current = null;
      userHasScrolled.current = true;
      scheduleUpdate();
    };

    const onUserScrollAction = () => {
      userHasScrolled.current = true;
    };

    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (!event.defaultPrevented && ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " ", "Escape"].includes(event.key)) {
        userHasScrolled.current = true;
        interrupt();
      }
    };

    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(document.body);
    items.forEach(({ element }) => resizeObserver.observe(element));
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("resize", scheduleUpdate, { passive: true });
    window.addEventListener("wheel", onUserScrollAction, { passive: true });
    window.addEventListener("touchmove", onUserScrollAction, { passive: true });
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
      window.removeEventListener("wheel", onUserScrollAction);
      window.removeEventListener("touchmove", onUserScrollAction);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [sections]);

  const scrollTo = useCallback((id: string, focus = false) => {
    const target = findTargetElement(id) || document.getElementById(id);
    if (!target) return;

    userHasScrolled.current = true;
    if (settleTimer.current) clearTimeout(settleTimer.current);
    destination.current = { id, focus };
    setActiveId(id);
    const isFirst = id === sections[0]?.id;
    const hash = isFirst ? "" : `#${encodeURIComponent(id)}`;
    lastDispatchedHash.current = hash;
    if (typeof window !== "undefined") {
      const cleanUrl = isFirst ? window.location.pathname + window.location.search : hash;
      if (window.location.hash !== hash) window.history.pushState(window.history.state, "", cleanUrl);
      window.dispatchEvent(new CustomEvent("akashic-hashchange", { detail: hash }));
    }

    // Lands on the section's eyebrow, clear of the header (sectionScrollTop).
    const top = isFirst ? 0 : sectionScrollTop(target);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reducedMotion ? "instant" : "smooth" });
    settleTimer.current = setTimeout(() => finishScroll.current(), SCROLL_SETTLE_MS);
  }, [sections]);

  return { activeId, scrollTo };
}
