"use client";

/*
 * [02] Proven at National Scale — The National Record.
 * One dark record board (deliberate dark card per Rule 5's Closure /
 * AkashicModules precedent): four flagship missions as ledger rows with
 * count-up figures, ministry tags, sparklines, and live pulses — a registry,
 * not a stat-card grid. A light "also in production" ledger follows.
 * All figures are public-record numbers per the content script.
 */

import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import useCountUp from "@/hooks/useCountUp";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";



function BoardSpark({ seed }: { seed: number }) {
  const points = Array.from({ length: 8 }, (_, i) => {
    const y = 16 - ((seed * 3 + i * 7) % 9) - i * 0.8;
    return `${2 + i * 9},${Math.max(3, y)}`;
  }).join(" ");
  return (
    <svg width="66" height="20" viewBox="0 0 66 20" fill="none" aria-hidden className="shrink-0">
      <polyline
        points={points}
        stroke="rgb(var(--blue-400))"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fl-sparkline"
        opacity="0.8"
      />
    </svg>
  );
}

function Figure({ figure }: { figure: string }) {
  const { ref, display } = useCountUp(figure);
  return (
    <div ref={ref} className="whitespace-nowrap text-[32px] font-semibold leading-none tabular-nums tracking-tighter text-ink md:text-[40px]">
      {display}
    </div>
  );
}

export default function PublicSectorProven({ content }: { content: PublicSectorPage["proven"] }) {
  const { flagships, registry, board } = content;
  return (
    <section id="proven" className="scroll-mt-24 border-t border-lineSoft bg-background pt-12 pb-24 lg:pt-16 lg:pb-32">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-medium text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
          <p className="mt-5 max-w-[40em] text-lg leading-relaxed text-secondary-text">
            {content.lede}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className=" relative mt-12 overflow-hidden rounded-frame bg-anchor lg:mt-14">
            <div className="absolute inset-x-0 top-0 h-[3px] bg-blue" aria-hidden />
            
            <div className="relative">
              <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-8">
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">
                  {board.title}
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-secondary-text">
                  <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                  {board.live}
                </span>
              </div>
              <div className="divide-y divide-line">
                {flagships.map((row, idx) => (
                  <div
                    key={row.mission}
                    className="grid grid-cols-1 gap-3 px-6 py-5 transition-colors duration-200 ease-settle hover:bg-tertiary-bg md:grid-cols-[minmax(200px,1.1fr)_auto_minmax(150px,0.7fr)] md:items-center md:gap-8 md:px-8 md:py-6"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-[10px] text-inkSoft">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="truncate text-[17px] font-semibold tracking-tight text-ink md:text-[19px]">
                          {row.mission}
                        </span>
                      </div>
                      <p className="mt-1 truncate pl-[26px] text-[11.5px] text-inkSoft">{row.ministry}</p>
                    </div>
                    <div className="flex items-baseline gap-2.5 md:justify-end">
                      <Figure figure={row.figure} />
                      <span className="whitespace-nowrap text-[12px] text-inkSoft">{row.label}</span>
                    </div>
                    <div className="hidden items-center justify-end gap-3 md:flex">
                      <BoardSpark seed={idx + 2} />
                      <span className="h-[6px] w-[6px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line px-6 py-3.5 font-mono text-[9px] uppercase tracking-[0.08em] md:px-8">
                <span className="text-inkSoft">{board.footerLeft}</span>
                <span className="text-inkSoft">{board.footerRight}</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <p className="mt-10 border-b border-dashed border-lineSoft pb-3 font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:mt-12">
            {content.alsoLabel}
          </p>
        </ScrollReveal>
        <div>
          {registry.map((row, idx) => (
            <ScrollReveal key={row.platform} delay={180 + idx * 70}>
              <div className="grid grid-cols-1 gap-1.5 border-b border-subtle-stroke py-4 transition-colors duration-200 ease-settle hover:bg-primary-bg md:grid-cols-[220px_200px_1fr] md:items-baseline md:gap-6">
                <span className="text-[15px] font-semibold tracking-tight text-ink">{row.platform}</span>
                <span className="whitespace-nowrap">
                  <span className="font-mono text-[15px] font-bold tracking-tight text-ink">{row.figure}</span>
                  <span className="ml-1.5 text-[12px] text-inkSoft">{row.label}</span>
                </span>
                <span className="text-[13.5px] leading-relaxed text-inkSoft">{row.desc}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
