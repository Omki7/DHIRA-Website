"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Chrome keeps every CSS and SMIL animation ticking off screen, and the ones
   that animate paint or layout properties (stroke-dashoffset, left, width,
   background-position, anything on SVG) cost a main-thread frame whether
   or not anyone can see them, which is what made scrolling heavy. This
   holds each infinite CSS animation, and each SVG's SMIL timeline, still
   while its section is off screen, resuming just before it scrolls back in.
   It also holds the on-screen loops while the page is being scrolled and
   resumes them a beat after it stops: ambient motion nobody watches mid-
   scroll is the per-frame paint that makes a scroll stutter. The section is
   observed, not the animated element: a sweep or sheen travels outside its
   clip, and would pause there for good. Finite entrance animations end on
   their own and are left alone, and so is any SVG inside
   `[data-own-motion]` (a component that runs its own SMIL). Paired with
   `[data-offscreen-paused]` in globals.css. */

const REGION = "section, footer, header, aside";
const ATTR = "data-offscreen-paused";
const SMIL = "animate, animateMotion, animateTransform, set";
const SCROLL_REST_MS = 200;

function smilRoots(scope: ParentNode) {
  const roots = new Set<SVGSVGElement>();
  scope.querySelectorAll<SVGElement>(SMIL).forEach((node) => {
    let svg = node.ownerSVGElement;
    while (svg?.ownerSVGElement) svg = svg.ownerSVGElement;
    if (svg && !svg.closest("[data-own-motion]")) roots.add(svg);
  });
  return roots;
}

export default function OffscreenAnimationGate() {
  const pathname = usePathname();

  useEffect(() => {
    // Reduced motion: loops already rest under the global override, and
    // components hold their own SMIL still. Nothing to gate.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const members = new Map<Element, Set<Element>>();
    const watched = new WeakSet<Element>();
    const onScreen = new Set<Element>();
    const held = new WeakMap<Element, boolean>();
    let scrolling = false;

    // Hold or release one section's loops, only when its state flips.
    const apply = (region: Element) => {
      const hold = scrolling || !onScreen.has(region);
      if (held.get(region) === hold) return;
      held.set(region, hold);
      members.get(region)?.forEach((el) => el.toggleAttribute(ATTR, hold));
      smilRoots(region).forEach((svg) => (hold ? svg.pauseAnimations() : svg.unpauseAnimations()));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
          apply(entry.target);
        }
      },
      { rootMargin: "200px 0px" },
    );

    const regionOf = (el: Element) => {
      const region = el.closest(REGION);
      if (!region) return null;
      if (!members.has(region)) {
        members.set(region, new Set());
        observer.observe(region);
      }
      return region;
    };

    const watch = (el: Element) => {
      if (watched.has(el)) return;
      watched.add(el);
      const region = regionOf(el);
      if (!region) return;
      members.get(region)?.add(el);
      if (held.get(region)) el.setAttribute(ATTR, "");
    };

    const scan = () => {
      for (const animation of document.getAnimations()) {
        if (!(animation instanceof CSSAnimation)) continue;
        const effect = animation.effect;
        if (!(effect instanceof KeyframeEffect) || !effect.target) continue;
        if (effect.getTiming().iterations === Infinity) watch(effect.target);
      }
      smilRoots(document).forEach((svg) => regionOf(svg));
    };
    scan();
    // Client-only pieces (dynamic imports, in-view mounts) arrive a beat later.
    const rescan = window.setTimeout(scan, 1500);

    // Animations that start later (reveals, tab switches) are checked in one
    // deferred batch: reading their timing forces a style recalc, which must
    // not happen once per animation in the middle of a scroll.
    const pending = new Set<Element>();
    let batch = 0;
    const flush = () => {
      batch = 0;
      for (const el of pending) {
        if (!el.isConnected) continue;
        // subtree: true so ::before/::after loops (sheens, sweeps) count too.
        const loops = el
          .getAnimations({ subtree: true })
          .some(
            (a) =>
              a instanceof CSSAnimation &&
              a.effect instanceof KeyframeEffect &&
              a.effect.target === el &&
              a.effect.getTiming().iterations === Infinity,
          );
        if (loops) watch(el);
      }
      pending.clear();
    };
    const onStart = (event: AnimationEvent) => {
      if (!(event.target instanceof Element) || watched.has(event.target)) return;
      pending.add(event.target);
      if (!batch) batch = window.setTimeout(flush, 400);
    };
    document.addEventListener("animationstart", onStart, true);

    // Hold everything on screen while scrolling; release once it rests.
    let rest = 0;
    const settle = () => {
      rest = 0;
      scrolling = false;
      onScreen.forEach(apply);
    };
    const onScroll = () => {
      if (!scrolling) {
        scrolling = true;
        onScreen.forEach(apply);
      }
      window.clearTimeout(rest);
      rest = window.setTimeout(settle, SCROLL_REST_MS);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.clearTimeout(rescan);
      window.clearTimeout(batch);
      window.clearTimeout(rest);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("animationstart", onStart, true);
      observer.disconnect();
      for (const [region, set] of members) {
        for (const el of set) el.removeAttribute(ATTR);
        smilRoots(region).forEach((svg) => svg.unpauseAnimations());
      }
    };
  }, [pathname]);

  return null;
}
