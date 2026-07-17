"use client";

/*
 * [00] Life Hero — AI Where It Matters Most.
 * Split hero: pitch left, live-counter telemetry card right (count-up to the
 * month's identified high-risk mothers, per the content script). The counter
 * uses useCountUpValue for Indian-locale digit grouping.
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import { useCountUpValue, usePrefersReducedMotion } from "@/hooks/useCountUp";

function CounterSpark() {
  return (
    <svg viewBox="0 0 120 26" fill="none" aria-hidden className="h-6 w-full">
      <polyline
        points="2,20 16,18 30,19 44,13 58,15 72,10 86,12 100,7 118,5"
        stroke="#3E63DD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fl-sparkline"
        opacity="0.75"
      />
    </svg>
  );
}

function LiveCounterCard() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [kick, setKick] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setKick(1);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const value = useCountUpValue(12402, kick, reduced, 1600);

  return (
    <div ref={ref} className="w-full max-w-[440px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="flex items-center justify-between border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
          Akashic Life &middot; this month
        </span>
        <LiveChip />
      </div>
      <div className="p-5">
        <div className="text-[52px] font-semibold leading-none tracking-tighter text-ink md:text-[60px]">
          {kick ? Math.round(value).toLocaleString("en-IN") : "0"}
        </div>
        <p className="mt-3 text-[14px] font-medium text-ink">High-risk mothers identified</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-inkSoft">
          Scored on-device by frontline health workers. No internet required at the
          point of care.
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5">
        <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
          Edge scoring active
        </span>
        <div className="w-24"><CounterSpark /></div>
      </div>
    </div>
  );
}

export default function LifeHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-28 lg:pb-24">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold text-primary-text">Akashic Life</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">Built on Akashic</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                Edge AI <span className="text-overcast">&middot;</span> Maternal health{" "}
                <span className="text-overcast">&middot;</span> Offline-first
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                AI where it{" "}
                <span className="relative inline-block whitespace-nowrap">
                  matters most.
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[34em] text-lg leading-relaxed text-secondary-text">
                Every day of delay puts a mother at risk. Akashic Life brings
                specialist-grade diagnostics to the remote edge: predicting
                high-risk pregnancies in seconds, even without the internet.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="#proof" className="btn-primary">
                  See the impact
                </Link>
                <Link href="#talk-to-our-team" className="btn-secondary">
                  Partner with us
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <LiveCounterCard />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
