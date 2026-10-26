"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* A link with a #hash lands on its target even when the page grows after
   the browser's first jump (UX review, 23 Oct 2026: menu links "jump to the
   wrong place"). /about's journey pins after hydration and adds about
   1,150px of travel above #leadership, so the browser's anchor scroll landed a
   screen short. For a few seconds after each page load this re-lands the
   target whenever the page's height changes, and lets go the moment the
   reader scrolls, taps or presses a key. The target's scroll-margin keeps it
   clear of the sticky header. Hashes with no element (the contact hashes
   ContactModal opens, the /akashic walkthrough's own module hashes) are left
   alone. */

const SETTLE_MS = 3000;
const RELEASE = ["wheel", "touchstart", "pointerdown", "keydown"] as const;

export default function HashLanding() {
  const pathname = usePathname();

  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || !document.getElementById(id)) return;

    let height = document.body.scrollHeight;
    const land = () => {
      const next = document.body.scrollHeight;
      if (next === height) return;
      height = next;
      document.getElementById(id)?.scrollIntoView({ block: "start", behavior: "instant" });
    };
    const observer = new ResizeObserver(land);
    observer.observe(document.body);

    const release = () => {
      observer.disconnect();
      window.clearTimeout(timer);
      RELEASE.forEach((type) => window.removeEventListener(type, release));
    };
    const timer = window.setTimeout(release, SETTLE_MS);
    RELEASE.forEach((type) => window.addEventListener(type, release, { passive: true }));
    return release;
  }, [pathname]);

  return null;
}
