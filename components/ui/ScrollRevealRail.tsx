"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  dark?: boolean;
  isLast?: boolean;
  className?: string;
}

/* The gold trail on a section's edge rails follows scroll: p = 0 when the
   section's top enters the viewport bottom, 1 when its bottom leaves the top.
   That is a CSS view timeline over the `cover` range, so where scroll
   timelines exist the trail runs on the compositor (`.rail-*` in
   globals.css) and costs the main thread nothing while scrolling. Elsewhere,
   one shared handler drives only the rails on screen, with transforms only.
   A non-scrolling `overflow: hidden` ancestor is still a scroll container
   and would capture the timeline, so those rails take the JS path too. */

type Rail = {
  wrapper: HTMLElement;
  bodies: HTMLElement[];
  tips: HTMLElement[];
  flashes: HTMLElement[];
  p: number;
};

const onScreen = new Set<Rail>();
const byWrapper = new Map<Element, Rail>();
let observer: IntersectionObserver | null = null;
let frame = 0;

function paintRail(rail: Rail) {
  const rect = rail.wrapper.getBoundingClientRect();
  const vh = window.innerHeight;
  const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
  if (Math.abs(p - rail.p) < 0.001) return;
  rail.p = p;
  // Same geometry as the keyframes: the body trails the tip by 10%.
  const body = `scaleY(${Math.max(0, p - 0.1).toFixed(4)})`;
  const tip = `translateY(${((p / 0.1 - 1) * 100).toFixed(2)}%)`;
  for (const el of rail.bodies) el.style.transform = body;
  for (const el of rail.tips) el.style.transform = tip;
  for (const el of rail.flashes) el.style.opacity = p > 0.85 ? "1" : "0";
}

function paintOnScreen() {
  frame = 0;
  onScreen.forEach(paintRail);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(paintOnScreen);
}

function register(rail: Rail) {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const r = byWrapper.get(entry.target);
        if (!r) continue;
        if (entry.isIntersecting) onScreen.add(r);
        else onScreen.delete(r);
        // Land on 0 or 1 as it leaves, so it never freezes mid-trail.
        paintRail(r);
      }
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
  }
  byWrapper.set(rail.wrapper, rail);
  observer.observe(rail.wrapper);
}

function unregister(rail: Rail) {
  byWrapper.delete(rail.wrapper);
  onScreen.delete(rail);
  observer?.unobserve(rail.wrapper);
  if (byWrapper.size === 0 && observer) {
    observer.disconnect();
    observer = null;
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", schedule);
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

function insideScrollContainer(el: HTMLElement) {
  for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
    const style = getComputedStyle(node);
    if (/(auto|scroll|hidden)/.test(style.overflowX + style.overflowY)) return true;
  }
  return false;
}

function Track({ side, isLast }: { side: "left" | "right"; isLast: boolean }) {
  return (
    <div aria-hidden="true" className={`rail-track ${side === "left" ? "left-0" : "right-0"}`}>
      <div className="rail-body" />
      <div className="rail-tip" />
      {isLast && <div className="rail-flash" />}
    </div>
  );
}

export default function ScrollRevealRail({
  children,
  dark = false,
  isLast = false,
  className = "",
}: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (CSS.supports("animation-timeline: view()") && !insideScrollContainer(wrapper)) {
      wrapper.dataset.rail = "css";
      return;
    }

    wrapper.dataset.rail = "js";
    const rail: Rail = {
      wrapper,
      bodies: Array.from(wrapper.querySelectorAll<HTMLElement>(":scope > .rail-track > .rail-body")),
      tips: Array.from(wrapper.querySelectorAll<HTMLElement>(":scope > .rail-track > .rail-tip")),
      flashes: Array.from(wrapper.querySelectorAll<HTMLElement>(":scope > .rail-track > .rail-flash")),
      p: -1,
    };
    register(rail);
    paintRail(rail);
    return () => unregister(rail);
  }, []);

  const baseColor = dark ? "rgba(255,255,255,0.09)" : "rgb(var(--ink) / 0.07)";

  return (
    <div
      ref={wrapperRef}
      className={`rail-scope relative mx-auto w-full max-w-[1440px] ${className}`}
    >
      {/* Base faint rails — always visible at low opacity */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-0 w-px"
        style={{ background: baseColor }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-0 w-px"
        style={{ background: baseColor }}
      />
      {/* Gold trail that follows scroll */}
      <Track side="left" isLast={isLast} />
      <Track side="right" isLast={isLast} />
      <div className="px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
