"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { findTargetElement, sectionScrollTop } from "@/shared/utils/navigation";

/* Every jump to a section lands where the section starts: its eyebrow, just
   under the top edge (shared/utils/navigation sectionScrollTop; user,
   5 Nov 2026: jumps "always land a bit down").

   1. A page loaded with a #hash lands on its target even when the page
      grows after the browser's first jump (UX review, 23 Oct 2026: /about's
      journey pins after hydration and adds about 1,150px above #leadership).
      For a few seconds after load it re-lands whenever the page's height
      changes, and lets go the moment the reader scrolls, taps or presses a
      key.
   2. An in-page link (`href="#stack"`, a next/link SectionLink, a menu
      row) lands the same way. Before anyone handles the click, the target's
      scroll-margin is set to the landing, so the browser's own jump, Next's
      scrollIntoView and scrollToHashTarget all agree. Nothing is prevented:
      ContactModal's hashes, the skip link and feature handlers keep their
      clicks. Targets that are not rendered (a hidden [09] sheet) are left
      to the feature that shows them.
   3. Back and forward between hashes land the same way. */

const SETTLE_MS = 2500;
const RELEASE = ["wheel", "touchmove", "keydown"] as const;
const TOP_HASHES = new Set(["", "#", "#hero", "#main"]);

function behaviour(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
}

export function HashLanding() {
  const pathname = usePathname();

  // 1. Landing after a page load or route transition with a hash.
  useEffect(() => {
    const rawHash = window.location.hash;
    const id = decodeURIComponent(rawHash.slice(1));

    // When navigating to a page with no hash (or top hash), enforce landing at (0, 0)
    if (!id || TOP_HASHES.has(rawHash)) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    const scrollToTarget = () => {
      const element = findTargetElement(id);
      if (element && element.getClientRects().length > 0) {
        const top = sectionScrollTop(element);
        window.scrollTo({ top, behavior: "instant" });
      }
    };

    scrollToTarget();
    const frame = requestAnimationFrame(scrollToTarget);

    let height = document.body.scrollHeight;
    const land = () => {
      const next = document.body.scrollHeight;
      if (next === height) return;
      height = next;
      scrollToTarget();
    };
    const observer = new ResizeObserver(land);
    observer.observe(document.body);

    const release = () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.clearTimeout(timer);
      RELEASE.forEach((type) => window.removeEventListener(type, release));
    };
    const timer = window.setTimeout(release, SETTLE_MS);
    RELEASE.forEach((type) => window.addEventListener(type, release, { passive: true }));
    return release;
  }, [pathname]);

  // 2 and 3. In-page links, back and forward.
  useEffect(() => {
    /* Window capture runs before every other click handler. */
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>("a[href*='#']");
      if (!link) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) return;
      if (TOP_HASHES.has(url.hash)) return;
      const element = findTargetElement(url.hash);
      if (!element || element.getClientRects().length === 0) return;
      const top = element.getBoundingClientRect().top + window.scrollY;
      element.style.scrollMarginTop = `${Math.round(top - sectionScrollTop(element))}px`;
    };

    const onPopState = () => {
      // Back or forward to another page is Next's to land.
      if (window.location.pathname !== pathname) return;
      const hash = window.location.hash;
      if (TOP_HASHES.has(hash)) {
        window.scrollTo({ top: 0, behavior: behaviour() });
        window.dispatchEvent(new CustomEvent("akashic-hashchange", { detail: "" }));
        return;
      }
      const element = findTargetElement(hash);
      if (!element) return;
      window.scrollTo({ top: sectionScrollTop(element), behavior: behaviour() });
      window.dispatchEvent(new CustomEvent("akashic-hashchange", { detail: hash }));
    };

    window.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      window.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [pathname]);

  return null;
}
