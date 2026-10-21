/*
 * [01] Shelf & Warehouse — the retail problem as a creative split: the empty
 * shelf (dark plate) against the full warehouse two states over (paper-light
 * plate, red spine), then the fracture ledger beneath. Red appears only as the
 * problem indicator (token table). Fracture copy comes from the shared sector
 * config so the two stay in sync.
 */

import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { SectorContent, SectorStory, SectorTemplate } from "@/content/pages/sectors";




function ChainEvidenceBand({ story }: { story: SectorStory }) {
  return (
    <div className="mt-10 overflow-hidden rounded-frame border border-subtle-stroke bg-anchor ">
      <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="relative min-h-[300px] overflow-hidden">
          <Image
            src={story.evidence.image.src}
            alt={story.evidence.image.alt}
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover"
          />
          
          <div className="absolute left-5 top-5 rounded-full border border-line bg-tertiary-bg px-3 py-1.5 font-mono text-[9.5px] font-semibold uppercase tracking-[0.08em] text-secondary-text ">
            {story.evidence.chip}
          </div>
          <div className="absolute bottom-5 left-5 right-5 grid gap-2 sm:grid-cols-3">
            {story.evidence.stages.map((stage, idx) => (
              <div key={stage} className="rounded-card border border-line bg-background px-3 py-2 ">
                <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em] text-inkSoft">
                  {story.evidence.stageLabels[idx]}
                </p>
                <p className={`mt-1 text-[12px] font-semibold ${idx === story.evidence.stages.length - 1 ? "text-blue" : "text-ink"}`}>
                  {stage}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative px-6 py-7 text-ink md:px-8">
          <div className="absolute inset-x-0 top-0 h-[3px] bg-blue lg:inset-x-auto lg:bottom-0 lg:left-0 lg:top-0 lg:h-auto lg:w-[3px]" aria-hidden />
          <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
            {story.evidence.label}
          </p>
          <div className="mt-6 space-y-5">
            {story.evidence.signals.map((signal, idx) => (
              <div key={signal.title} className={idx > 0 ? "border-t border-dashed border-line pt-5" : ""}>
                <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-blue">
                  {signal.tag}
                </p>
                <h3 className="mt-1.5 text-[18px] font-semibold leading-snug tracking-tight text-ink">
                  {signal.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-secondary-text">
                  {signal.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RetailShelf({ content, template }: { content: SectorContent; template: SectorTemplate["problem"] }) {
  const story = content.story;
  if (!story) return null;
  return (
    <section id="problem" className="scroll-mt-24 overflow-hidden bg-background pt-10 pb-16 lg:pt-14 lg:pb-20">
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-t border-b border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[{template.eyebrow.number}]</span>
              &nbsp;&nbsp;{template.eyebrow.label}
            </span>
            <span className="text-overcast">{story.aside}</span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <h2 className="text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {story.title}
          </h2>
        </ScrollReveal>

        {/* The two views */}
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch lg:gap-0">
          <ScrollReveal delay={120}>
            <div className="relative h-full overflow-hidden rounded-frame bg-anchor px-7 py-9 text-ink md:px-9">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-blue" aria-hidden />
              
              <div className="relative">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
                  {story.left.label}
                </p>
                <p className="mt-5 font-mono text-[34px] font-bold leading-none tracking-tight text-ink md:text-[40px]">
                  {story.left.figure}<span className="text-blue">{story.left.accent}</span>
                </p>
                <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-inkSoft">
                  {story.left.caption}
                </p>
                <div className="mt-6 space-y-2.5">
                  {(story.left.rows ?? []).map((row) => (
                    <div key={row.text} className="flex items-center gap-3 border-t border-dashed border-line pt-2.5 first:border-t-0 first:pt-0">
                      <span
                        className={`h-[6px] w-[6px] shrink-0 rounded-full ${row.flag ? "bg-blue animate-[ps-pulse_2s_infinite]" : "bg-tertiary-bg"}`}
                        aria-hidden
                      />
                      <span className="min-w-0 flex-1 truncate text-[12.5px] font-medium tracking-tight text-ink">
                        {row.text}
                      </span>
                      <span className={`shrink-0 font-mono text-[8.5px] uppercase tracking-[0.06em] ${row.flag ? "font-semibold text-blue" : "text-inkSoft"}`}>
                        {row.note}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 max-w-[26em] text-[15px] leading-relaxed text-secondary-text">
                  {story.left.body}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="hidden flex-col items-center justify-center px-8 lg:flex" aria-hidden>
            <span className="h-full w-px border-l border-dashed border-line" />
            <span className="whitespace-nowrap py-3 font-mono text-[9px] uppercase tracking-[0.12em] text-overcast">
              {story.divider}
            </span>
            <span className="h-full w-px border-l border-dashed border-line" />
          </div>

          <ScrollReveal delay={200}>
            <div className="relative h-full overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg px-7 py-9 md:px-9">
              <div className="absolute inset-y-0 left-0 w-[3px] bg-red/60" aria-hidden />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-overcast">
                {story.right.label}
              </p>
              <p className="mt-5 text-[34px] font-semibold leading-none tracking-tighter text-ink md:text-[40px]">
                {story.right.figure}
              </p>
              <p className="mt-4 font-mono text-[9.5px] uppercase tracking-[0.1em] text-overcast">
                {story.right.caption}
              </p>
              <p className="mt-5 max-w-[26em] text-[15px] leading-relaxed text-inkSoft">
                {story.right.body}
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={140}>
          <p className="mx-auto mt-9 max-w-[38em] text-center text-lg leading-relaxed text-inkSoft md:text-xl">
            {story.verdict}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <ChainEvidenceBand story={story} />
        </ScrollReveal>

        {/* Fractures */}
        <div className="mt-12 grid grid-cols-1 gap-y-10 border-t border-lineSoft pt-10 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
          {content.problem.fractures.map((fracture, idx) => (
            <ScrollReveal key={fracture.title} delay={idx * 90}>
              <div className={idx > 0 ? "md:border-l md:border-dashed md:border-lineSoft md:pl-10" : ""}>
                <p className="text-[44px] font-semibold leading-none tracking-tighter text-overcast">
                  {idx + 1}
                </p>
                <h3 className="mt-4 text-[19px] font-semibold leading-snug tracking-tight text-ink md:text-[20px]">
                  {fracture.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-inkSoft">
                  {fracture.body}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <p className="mt-12 border-t border-dashed border-lineSoft pt-6 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            {template.footer}
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
