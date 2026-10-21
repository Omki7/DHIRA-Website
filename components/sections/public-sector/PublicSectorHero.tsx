/*
 * [00] Public Sector Hero — Already Built For It.
 * Split hero: pitch left, a public-record missions board right (§8a chrome,
 * but the figures are real public-record numbers per the content script).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";


function MissionsBoard({ board }: { board: PublicSectorPage["hero"]["board"] }) {
  const missions = board.missions;
  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-background text-left ">
      <div className="flex items-center justify-between border-b border-blue/10 bg-blue-subtle px-4 py-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
          {board.title}
        </span>
        <LiveChip />
      </div>
      <div className="divide-y divide-lineSoft">
        {missions.map((mission) => (
          <div key={mission.name} className="flex items-center gap-3 px-4 py-3">
            <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
            <span className="min-w-0 flex-1 truncate text-[13px] font-semibold tracking-tight text-ink">
              {mission.name}
            </span>
            <span className="shrink-0 whitespace-nowrap font-mono text-[13px] font-bold tracking-tight text-ink">
              {mission.figure}
            </span>
            <span className="w-[118px] shrink-0 truncate text-right text-[10.5px] text-inkSoft">
              {mission.label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="text-inkSoft">{board.footerLeft}</span>
        <span className="text-overcast">{board.footerRight}</span>
      </div>
    </div>
  );
}

export default function PublicSectorHero({ content }: { content: PublicSectorPage["hero"] }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      
      

      <ScrollRevealRail>
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-28 lg:pb-16">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-background px-3.5 py-1.5 text-xs  sm:text-sm">
                <span className="font-semibold text-primary-text">{content.badge.name}</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">{content.badge.kicker}</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                {content.eyebrow.lead} <span className="text-overcast">&middot;</span> {content.eyebrow.tail}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                {content.title.plain}{" "}
                <span className="relative inline-block">
                  {content.title.marked}
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                {content.lede}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href={content.primary.href} className="btn-primary">
                  {content.primary.label}
                </Link>
                <Link href={content.secondary.href} className="btn-secondary">
                  {content.secondary.label}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <MissionsBoard board={content.board} />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <p className="border-t border-dashed border-lineSoft pb-14 pt-5 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:pb-20">
            {content.footer}
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
