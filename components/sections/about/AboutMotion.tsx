"use client";

import { useEffect, useRef, type ReactNode } from "react";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function AboutMotion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-about-enter], [data-about-reveal]"));
    const animations = new Set<Animation>();
    const seen = new Set<HTMLElement>();
    const hero = root.querySelector<HTMLElement>(".about-hero");
    const landscape = root.querySelector<HTMLElement>(".about-landscape-plane");
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    const release = (target: HTMLElement) => {
      target.style.removeProperty("opacity");
      target.style.removeProperty("transform");
    };
    const reveal = (target: HTMLElement) => {
      if (seen.has(target)) return;
      seen.add(target);
      const delay = Number(target.dataset.aboutEnter ?? target.dataset.aboutReveal ?? 0);
      const animation = target.animate([
        { opacity: 0, transform: "translate3d(0,14px,0)" },
        { opacity: 1, transform: "translate3d(0,0,0)" },
      ], { duration: 850, delay, easing: EASE, fill: "both" });
      release(target);
      animations.add(animation);
      animation.finished.then(() => { animation.cancel(); animations.delete(animation); }).catch(() => {});
    };
    const paint = () => {
      frame = 0;
      if (!hero || !landscape || preference.matches) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      landscape.style.transform = `translate3d(0,${(progress * 28).toFixed(2)}px,0)`;
    };
    const schedule = () => { if (!frame && !preference.matches) frame = requestAnimationFrame(paint); };
    const stop = () => {
      observer?.disconnect();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      targets.forEach(release);
      cancelAnimationFrame(frame);
      frame = 0;
      landscape?.style.removeProperty("transform");
    };
    const start = () => {
      stop();
      if (preference.matches) return;
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target as HTMLElement);
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -24px 0px" });
      targets.forEach((target) => {
        if (seen.has(target)) return;
        const rect = target.getBoundingClientRect();
        if (rect.width === 0) { observer?.observe(target); return; }
        if (rect.bottom <= 0) return;
        if (target.hasAttribute("data-about-enter") && rect.top < innerHeight) reveal(target);
        else {
          target.style.opacity = "0";
          target.style.transform = "translate3d(0,14px,0)";
          observer?.observe(target);
        }
      });
      const photo = landscape?.querySelector("img");
      if (photo && scrollY < 100) {
        const animation = photo.animate([{ transform: "scale(1.025)" }, { transform: "scale(1)" }], { duration: 1800, easing: EASE });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      }
      paint();
    };
    start();
    preference.addEventListener("change", start);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => { stop(); preference.removeEventListener("change", start); window.removeEventListener("scroll", schedule); window.removeEventListener("resize", schedule); };
  }, []);

  return <div ref={ref} className="about-page">{children}</div>;
}
