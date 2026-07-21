/*
 * [00] Sector Hero — shared shape for the sector pages: pitch left, the
 * sector's own simulated product board right (SectorBoards, §8a). Hero ends
 * at the CTAs + one mono strip, per the fine-tune playbook.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { SECTOR_BOARDS } from "./SectorBoards";
import type { SectorContent } from "./sectorContent";

export default function SectorHero({ content }: { content: SectorContent }) {
  const Board = SECTOR_BOARDS[content.slug];

  return (
    <section className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <ScrollRevealRail>
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-24 lg:pb-12">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold text-primary-text">{content.name}</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">Akashic by sector</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                {content.eyebrow}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                {content.headlinePlain}{" "}
                <span className="relative inline-block">
                  {content.headlineMarked}
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                {content.intro}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="#solution" className="btn-primary">
                  See how Akashic tackles it
                </Link>
                <Link href="#talk-to-our-team" className="btn-secondary">
                  Talk to our team
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <Board />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <p className="border-t border-dashed border-lineSoft pb-10 pt-5 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:pb-12">
            {content.heroFootnote}
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
