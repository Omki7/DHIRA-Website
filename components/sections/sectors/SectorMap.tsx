"use client";

/*
 * [02] The Map — pinned scrollytelling industry map (every sector page's
 * signature section). The sector's touchline is the H2; the isometric scene
 * (SectorMapScene, data from map/mapData) pins beside a four-step story rail
 * and the flows light up group by group as the visitor scrolls. Static scene
 * + stacked steps below lg. Replaces the earlier replay wire-log section.
 */

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectorMapScene from "./map/SectorMapScene";
import { MAP_SCENES } from "./map/mapData";
import { SECTOR_PAGES } from "./sectorContent";

function StepsRail({ step, scene }: { step: number; scene: (typeof MAP_SCENES)[string] }) {
  return (
    <ol className="flex flex-col gap-6">
      {scene.steps.map((s, i) => {
        const active = i === step;
        return (
          <li key={s.tag} className="grid grid-cols-[34px_1fr] gap-x-4">
            <span
              className={`mt-[2px] flex h-[26px] w-[26px] items-center justify-center rounded-full border font-mono text-[10px] font-semibold transition-colors duration-500 ${
                active ? "border-blue bg-blue text-white" : "border-line bg-white text-overcast"
              }`}
            >
              0{i + 1}
            </span>
            <div className="transition-opacity duration-500" style={{ opacity: active ? 1 : 0.42 }}>
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-blue">
                {s.tag}
              </p>
              <h3 className="mt-1.5 text-[19px] font-semibold leading-snug tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-inkSoft">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function SectorMap({ slug }: { slug: string }) {
  const scene = MAP_SCENES[slug];
  const touchline = SECTOR_PAGES[slug].touchline;
  const trackRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      setStep(Math.min(scene.steps.length - 1, Math.floor(progress * scene.steps.length)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scene.steps.length]);

  return (
    <section id="map" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="pt-10 lg:pt-14">
          <ScrollReveal>
            <div className="mb-8 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              <span>
                <span className="text-overcast">[02]</span>
                &nbsp;&nbsp;{scene.eyebrow}
              </span>
              <span className="text-overcast">/ PLAYERS &amp; FLOWS</span>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md">
              {touchline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={160}>
            <p className="mt-5 max-w-[42em] text-lg leading-relaxed text-inkSoft">
              Scroll through your own {scene.noun}: the players you already
              have, and what changes when their data lands on one governed
              record.
            </p>
          </ScrollReveal>
        </div>

        {/* Desktop: pinned scrollytelling */}
        <div ref={trackRef} className="relative hidden lg:block" style={{ height: "340vh" }}>
          <div className="sticky top-0 flex h-screen items-center">
            <div className="grid w-full grid-cols-[360px_1fr] items-center gap-14">
              <StepsRail step={step} scene={scene} />
              <div className="min-w-0">
                <SectorMapScene scene={scene} step={step} reduced={reduced} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile / tablet: static scene + steps */}
        <div className="pb-14 pt-8 lg:hidden">
          <SectorMapScene scene={scene} step={3} reduced={reduced} />
          <div className="mt-10">
            <StepsRail step={3} scene={scene} />
          </div>
        </div>
      </div>
    </section>
  );
}
