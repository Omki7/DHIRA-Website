"use client";

/**
 * SIMULATED PRODUCT UI: independently composed product fragments around the
 * homepage pitch. One shell for every module (grammar in the header of
 * HomeModuleIllustrationsMockup): hairline border, one surface, a mono
 * header row. Sizes cut by about a quarter on 22 Oct 2026 so the headline
 * leads and the fragments tease.
 */
import { motion } from "framer-motion";
import type { HomeHero, HomeHeroModule, HomeHeroModuleKind } from "@/content/pages/home";
import HomeModuleIllustrationsMockup, { TEASER_META } from "@/components/demos/mockups/HomeModuleIllustrationsMockup";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/* Placement around the centred pitch (xl and up). Columns hold to the frame
   edges in percent so the headline keeps its air from 1280 to 1600. The
   middle pair flanks the lede, so below 1440 it steps out to keep ~40px
   clear of the lede's longest line. The bottom row anchors to the hero's
   foot, which ends 256px under the pitch (Hero), so the row stays tight
   under the buttons at every viewport height. */
const POSITIONS: Record<HomeHeroModuleKind, string> = {
  "master-data": "left-[3%] top-[56px] w-[236px]",
  governance: "left-[min(7.5%,calc(50%-565px))] top-[332px] w-[220px]",
  pipelines: "bottom-[92px] left-[3.5%] w-[240px]",
  bi: "right-[3%] top-[52px] w-[240px]",
  ask: "right-[min(7.5%,calc(50%-580px))] top-[312px] w-[236px]",
  warehouse: "bottom-[84px] right-[3.5%] w-[228px]",
  ml: "bottom-[28px] left-1/2 w-[272px] -translate-x-1/2",
};

function Teaser({ module, index }: { module: HomeHeroModule; index: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.figure
      className="rounded-[14px] border border-card-line bg-[rgb(var(--screen-surface))] px-4 pb-4 pt-3"
      initial={reduced ? false : { opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.15 + index * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <figcaption className="mb-3 flex items-center justify-between gap-3 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.08em]">
        <span className="text-secondary-text">{module.module}</span>
        <span className="text-tertiary-text">{TEASER_META[module.kind]}</span>
        <span className="sr-only">
          {module.title}. {module.description}
        </span>
      </figcaption>
      <div aria-hidden>
        <HomeModuleIllustrationsMockup kind={module.kind} />
      </div>
    </motion.figure>
  );
}

export default function HomeHeroTeasersMockup({ content }: { content: HomeHero["illustrations"] }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 hidden xl:block" role="group" aria-label={content.label}>
        {content.modules.map((module, index) => (
          <div key={module.kind} data-home-teaser={module.kind} className={"absolute " + POSITIONS[module.kind]}>
            <Teaser module={module} index={index} />
          </div>
        ))}
      </div>
      <div className="pb-10 xl:hidden">
        <p className="mb-4 px-6 text-center text-xs text-secondary-text">
          {content.scrollHint} <span aria-hidden>→</span>
        </p>
        <div
          role="region"
          aria-label={content.label}
          tabIndex={0}
          className="flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-6 pb-5 [scrollbar-width:thin] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue"
        >
          {content.modules.map((module, index) => (
            <div key={module.kind} data-home-teaser={module.kind} className="w-[min(78vw,272px)] shrink-0 snap-center">
              <Teaser module={module} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
