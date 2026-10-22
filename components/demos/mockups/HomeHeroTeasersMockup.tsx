"use client";

/** SIMULATED PRODUCT UI: independently composed product fragments around the homepage pitch. */
import { motion } from "framer-motion";
import type { HomeHero, HomeHeroModule, HomeHeroModuleKind } from "@/content/pages/home";
import HomeModuleIllustrationsMockup from "@/components/demos/mockups/HomeModuleIllustrationsMockup";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

const POSITIONS: Record<HomeHeroModuleKind, string> = {
  "master-data": "left-4 top-9 w-[264px] min-[1400px]:left-7 min-[1400px]:w-[300px] 2xl:left-10",
  bi: "right-4 top-8 w-[264px] min-[1400px]:right-12 min-[1400px]:w-[312px]",
  governance: "left-4 top-[365px] w-[242px] min-[1400px]:left-10 min-[1400px]:w-[270px]",
  ask: "right-4 top-[360px] w-[260px] min-[1400px]:right-12 min-[1400px]:w-[300px]",
  pipelines: "bottom-[92px] left-4 w-[280px] min-[1400px]:left-7 min-[1400px]:w-[312px] 2xl:left-12",
  ml: "bottom-8 left-1/2 w-[320px] -translate-x-1/2",
  warehouse: "bottom-[58px] right-4 w-[270px] min-[1400px]:right-12 min-[1400px]:w-[300px]",
};

const SURFACES: Record<HomeHeroModuleKind, string> = {
  "master-data": "rounded-outer border border-card-line bg-background p-5",
  bi: "rounded-outer border border-card-line bg-background p-5",
  governance: "rounded-outer border border-blue-border bg-blue-subtle p-4",
  ask: "px-1",
  pipelines: "rounded-outer border border-card-line bg-primary-bg p-4",
  ml: "rounded-outer border border-card-line bg-background p-5",
  warehouse: "rounded-outer border border-card-line bg-background p-5",
};

function Teaser({ module, index }: { module: HomeHeroModule; index: number }) {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.figure className={SURFACES[module.kind]}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1, y: 0 } : undefined}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduced ? 0 : 0.65, delay: reduced ? 0 : index * 0.055, ease: [0.2, 0.8, 0.2, 1] }}>
      <figcaption className={module.kind === "ask" ? "px-4" : undefined}>
        <p className="text-[11px] font-medium tracking-tight text-secondary-text">{module.module}</p>
        <span className="sr-only">{module.title}. {module.description}</span>
      </figcaption>
      <div aria-hidden><HomeModuleIllustrationsMockup kind={module.kind} /></div>
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
        <p className="mb-4 px-6 text-center text-xs text-secondary-text">{content.scrollHint} <span aria-hidden>→</span></p>
        <div role="region" aria-label={content.label} tabIndex={0}
          className="flex snap-x snap-mandatory items-start gap-4 overflow-x-auto px-6 pb-5 [scrollbar-width:thin] focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue">
          {content.modules.map((module, index) => (
            <div key={module.kind} data-home-teaser={module.kind} className="w-[min(82vw,340px)] shrink-0 snap-center">
              <Teaser module={module} index={index} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
