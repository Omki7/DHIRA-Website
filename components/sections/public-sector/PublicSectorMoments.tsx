"use client";

/*
 * [03] In Practice — The Ministry Switcher.
 * Interactive split (the HowWeDeliver idiom, new to this page): three
 * ministry entries on the left select the live case on the right, which
 * re-enters with the global sector-text-in animation. Clearly distinct from
 * [04]'s static tender-schedule ledger. Sits on the page's one soft blue
 * band (site-wide consistency pass, 17 Jul) — Public Sector had zero
 * background variation across all eight sections.
 */

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";
import type { PublicSectorPage } from "@/content/pages/sectors-public-sector";


export default function PublicSectorMoments({ content }: { content: PublicSectorPage["moments"] }) {
  const moments = content.items;
  const [active, setActive] = useState(0);
  const current = moments[active];

  return (
    <section
      id="in-practice"
      className="scroll-mt-24 border-t border-lineSoft bg-band pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail>
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[{content.eyebrow.number}]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;{content.eyebrow.label}</span>
            </p>
            <span className="hidden text-overcast sm:inline">{content.eyebrow.aside}</span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            {content.title}
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:mt-14 lg:grid-cols-[minmax(280px,0.9fr)_1.6fr] lg:gap-14">
          {/* Ministry selector */}
          <div className="flex flex-col">
            {moments.map((moment, idx) => {
              const isActive = active === idx;
              return (
                <ScrollReveal key={moment.platform} delay={100 + idx * 80}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(idx)}
                    onClick={() => setActive(idx)}
                    aria-pressed={isActive}
                    className={`group relative w-full border-t border-subtle-stroke py-6 text-left transition-opacity duration-300 ease-settle last:border-b lg:py-7 ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-0 h-full w-0.5 origin-top bg-blue transition-transform duration-300 ease-settle ${
                        isActive ? "scale-y-100" : "scale-y-0"
                      }`}
                      aria-hidden
                    />
                    <span className="block pl-5">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                          {moment.ministry}
                        </span>
                        <span
                          className={`font-mono text-[10px] transition-colors duration-300 ${
                            isActive ? "text-blue" : "text-overcast"
                          }`}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </span>
                      <span className="mt-1.5 block text-[20px] font-semibold leading-snug tracking-tight text-ink lg:text-[22px]">
                        {moment.platform}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-relaxed text-inkSoft">
                        &ldquo;{moment.need}&rdquo;
                      </span>
                    </span>
                  </button>
                </ScrollReveal>
              );
            })}
          </div>

          {/* Live case panel */}
          <ScrollReveal delay={160}>
            <div
              key={active}
              className="sector-text-in flex h-full flex-col overflow-hidden rounded-frame border border-subtle-stroke bg-primary-bg"
            >
              <div className="h-[3px] bg-blue" aria-hidden />
              <div className="flex flex-1 flex-col p-7 md:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] border border-blue/20 bg-blue-subtle ">
                    <DynamicSketchIcon text={current.icon} className="h-[18px] w-[18px] text-blue" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] uppercase tracking-eyebrow text-overcast">
                      {current.ministry}
                    </p>
                    <p className="text-[19px] font-semibold tracking-tight text-ink">
                      {current.platform}
                    </p>
                  </div>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-positive-text">
                    <span className="h-[5px] w-[5px] rounded-full bg-positive animate-[ps-pulse_2s_infinite]" aria-hidden />
                    {content.live}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {current.figures.map((figure) => (
                    <span
                      key={figure}
                      className="inline-flex items-center rounded-[6px] border border-subtle-stroke bg-background px-2 py-[3px] font-mono text-[8.5px] uppercase tracking-[0.05em] text-inkSoft"
                    >
                      {figure}
                    </span>
                  ))}
                </div>

                <p className="mt-6 max-w-[44em] flex-1 text-[16px] leading-relaxed text-ink">
                  {current.story}
                </p>

                <div className="mt-7 border-l-2 border-blue/60 pl-5">
                  <p className="font-mono text-[9px] font-bold uppercase tracking-eyebrow text-blue">
                    {content.didLabel}
                  </p>
                  <p className="mt-2 max-w-[40em] text-[14px] leading-relaxed text-inkSoft">
                    {current.did}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
