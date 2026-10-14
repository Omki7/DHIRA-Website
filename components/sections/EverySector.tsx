"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { usePrefersReducedMotion } from "@/hooks/useCountUp";
import { HOME_INDUSTRIES } from "@/lib/homeSections";

const SECTORS = HOME_INDUSTRIES.sectors;
const TRANSITION = { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const };

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" className={`h-5 w-5 shrink-0 ${className}`} aria-hidden="true">
      <path d="M3 10h13m-5-5 5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function EverySector() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [vertical, setVertical] = useState(false);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = usePrefersReducedMotion();
  const sector = SECTORS[activeIndex];

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const update = () => setVertical(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    // Keep existing sector bookmarks working at every viewport size.
    const selectHash = () => {
      const hash = window.location.hash.slice(1).replace(/-desktop$/, "");
      const index = SECTORS.findIndex((item) => item.id === (hash === "enterprise" ? "finance" : hash));
      if (index >= 0) setActiveIndex(index);
    };
    selectHash();
    window.addEventListener("hashchange", selectHash);
    return () => window.removeEventListener("hashchange", selectHash);
  }, []);

  function handleKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "Home") next = 0;
    else if (event.key === "End") next = SECTORS.length - 1;
    else if (event.key === (vertical ? "ArrowDown" : "ArrowRight")) next = (index + 1) % SECTORS.length;
    else if (event.key === (vertical ? "ArrowUp" : "ArrowLeft")) next = (index + SECTORS.length - 1) % SECTORS.length;
    else return;
    event.preventDefault();
    setActiveIndex(next);
    buttons.current[next]?.focus();
  }

  return (
    <section id="sectors" aria-labelledby="sectors-heading" className="relative overflow-hidden bg-background pt-10 pb-12 lg:pt-14 lg:pb-16">
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0">
        {[...SECTORS.map((item) => item.id), "enterprise", ...SECTORS.map((item) => `${item.id === "finance" ? "enterprise" : item.id}-desktop`)].map((id) => (
          <span key={id} id={id} className="absolute top-0 scroll-mt-24" />
        ))}
      </div>
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-8 flex items-center border-y border-dashed border-lineSoft px-[2px] py-[17px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft lg:mb-10">
            <span><span className="text-overcast">[05]</span>&nbsp;&nbsp;EVERY SECTOR</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="mb-9 flex flex-col justify-between gap-5 lg:mb-11 lg:flex-row lg:items-end lg:gap-10">
            <h2 id="sectors-heading" className="text-[38px] font-semibold leading-[1.08] tracking-tighter sm:text-[48px] xl:text-[56px]">
              <span className="text-inkSoft">{HOME_INDUSTRIES.title[0]} </span>
              <span className="text-ink">{HOME_INDUSTRIES.title[1]}</span>
            </h2>
            <p className="shrink-0 text-[15px] leading-relaxed text-inkSoft sm:text-[16px]">
              {HOME_INDUSTRIES.introduction.map((line) => <span key={line} className="block">{line}</span>)}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="grid min-w-0 grid-cols-1 gap-y-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-x-10 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-x-12">
            <div className="min-w-0 lg:col-start-1 lg:row-start-1">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">{HOME_INDUSTRIES.selectorLabel}</p>
              <div role="tablist" aria-label="Industries" aria-orientation={vertical ? "vertical" : "horizontal"} className="grid grid-cols-2 gap-x-3 sm:grid-cols-3 lg:grid-cols-1 lg:gap-0">
                {SECTORS.map((item, index) => {
                  const selected = activeIndex === index;
                  return (
                    <button
                      key={item.id}
                      ref={(node) => { buttons.current[index] = node; }}
                      type="button"
                      role="tab"
                      id={`sector-tab-${item.id}`}
                      aria-controls="sector-panel"
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setActiveIndex(index)}
                      onKeyDown={(event) => handleKey(event, index)}
                      className={`group relative flex min-h-[56px] items-center gap-2.5 border-b px-1.5 py-2.5 text-left transition-colors duration-250 motion-reduce:transition-none lg:min-h-[65px] lg:gap-3 lg:px-3 ${selected ? "border-blue bg-primary-bg text-ink" : "border-lineSoft text-inkSoft hover:bg-primary-bg hover:text-ink"}`}
                    >
                      <span className={`relative h-8 w-8 shrink-0 overflow-hidden rounded-micro transition-[filter] duration-400 motion-reduce:transition-none lg:h-9 lg:w-9 ${selected ? "grayscale-0" : "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"}`}>
                        <Image src={item.image} alt="" fill sizes="36px" className="object-cover" />
                      </span>
                      <span className="min-w-0 text-[13px] font-medium tracking-tight sm:text-[15px] lg:text-[17px]">{item.name}</span>
                      <Arrow className={`ml-auto hidden transition-opacity duration-250 motion-reduce:transition-none lg:block ${selected ? "text-blue opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div role="tabpanel" id="sector-panel" aria-labelledby={`sector-tab-${sector.id}`} tabIndex={0} className="min-w-0 rounded-outer lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <div className="relative isolate h-[310px] overflow-hidden rounded-outer bg-primary-bg sm:h-[370px] lg:h-[390px] xl:h-[420px]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={sector.id}
                    className="absolute inset-0"
                    initial={{ opacity: reduced ? 1 : 0, scale: reduced ? 1 : 1.025 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={reduced ? { duration: 0 } : TRANSITION}
                  >
                    <Image src={sector.image} alt={sector.alt} fill sizes="(min-width: 1440px) 1068px, (min-width: 1024px) 72vw, 100vw" className="object-cover" />
                  </motion.div>
                </AnimatePresence>
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-depth/90 via-depth/15 to-depth/20" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5 font-mono text-[10px] uppercase tracking-eyebrow text-white sm:p-7">
                  <span className="rounded-chip border border-white/25 bg-depth/60 px-3 py-1.5 backdrop-blur-sm">{sector.name}</span>
                  <span className="rounded-chip bg-depth/60 px-2.5 py-1.5 tabular-nums backdrop-blur-sm">{String(activeIndex + 1).padStart(2, "0")} / {String(SECTORS.length).padStart(2, "0")}</span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
                  <motion.h3 key={sector.id} initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} transition={reduced ? { duration: 0 } : TRANSITION} className="max-w-[17ch] text-[32px] font-medium leading-[1.06] tracking-tighter text-white sm:text-[42px] xl:text-[50px]">
                    {sector.headline}
                  </motion.h3>
                </div>
              </div>
              <div className="pt-5 sm:pt-6">
                <div className="flex flex-col items-start justify-between gap-4 xl:flex-row xl:gap-8">
                  <p className="max-w-[39em] text-[15px] leading-relaxed text-inkSoft sm:text-[16px]">{sector.description}</p>
                  <Link href={`/sectors/${sector.id}`} className="group inline-flex min-h-11 shrink-0 items-center gap-3 text-[14px] font-medium text-ink underline decoration-line underline-offset-[6px] transition-colors duration-250 hover:text-blue motion-reduce:transition-none">
                    Explore {sector.name.toLowerCase()}
                    <Arrow className="transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
                  </Link>
                </div>
                <ul aria-label={`${sector.name} focus areas`} className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-lineSoft pt-4">
                  {sector.topics.map((topic) => <li key={topic} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.08em] text-inkSoft"><span aria-hidden="true" className="h-1 w-1 rounded-full bg-blue" />{topic}</li>)}
                </ul>
              </div>
            </div>

            <div className="flex flex-col items-start justify-end border-t border-dashed border-lineSoft pt-5 lg:col-start-1 lg:row-start-2 lg:mt-2">
              <p className="text-[14px] leading-relaxed text-inkSoft">{HOME_INDUSTRIES.publicSector.label}</p>
              <Link href={HOME_INDUSTRIES.publicSector.href} className="group mt-1 inline-flex min-h-11 items-center gap-2 text-[14px] font-medium text-ink transition-colors duration-250 hover:text-blue motion-reduce:transition-none">
                {HOME_INDUSTRIES.publicSector.link}<Arrow className="transition-transform duration-250 group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
