"use client";

/*
 * [00] Knowledge Hero — Intelligence at Civilisation Scale.
 * Split hero: pitch left, a live learner-grid telemetry card right (count-up
 * to 1.89 crore registered learners with per-learner adaptive path chips —
 * canned sample rows, §8a).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";
import useCountUp from "@/hooks/useCountUp";

const learners = [
  { id: "Learner 04,211,882", path: "Maths · Telugu · slower pace" },
  { id: "Learner 11,940,306", path: "Physics · Hindi · advanced" },
  { id: "Learner 17,552,090", path: "Reading · Marathi · remedial" },
];

function GridCard() {
  const { ref, display } = useCountUp("1.89 Cr", { duration: 1600 });
  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="flex items-center justify-between border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
          The knowledge grid &middot; live
        </span>
        <LiveChip />
      </div>
      <div className="p-5">
        <div ref={ref} className="text-[48px] font-semibold leading-none tracking-tighter text-ink md:text-[56px]">
          {display}
        </div>
        <p className="mt-3 text-[14px] font-medium text-ink">Registered learners, one dashboard</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-inkSoft">
          Each on their own adaptive path: content, language, and pace tuned per
          student, simultaneously.
        </p>
        <div className="mt-4 space-y-1.5">
          {learners.map((learner) => (
            <div
              key={learner.id}
              className="flex items-center justify-between gap-2 rounded-[9px] border border-[#EEEEF3] bg-[#FBFBFE] px-3 py-2"
            >
              <span className="truncate font-mono text-[9.5px] text-ink">{learner.id}</span>
              <span className="shrink-0 rounded-[4px] bg-blue-subtle px-1.5 py-0.5 font-mono text-[8.5px] text-blue">
                {learner.path}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-dashed border-lineSoft bg-primary-bg px-4 py-2.5 font-mono text-[8.5px] uppercase tracking-[0.06em]">
        <span className="flex items-center gap-1.5 text-inkSoft">
          <span className="h-[5px] w-[5px] rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" aria-hidden />
          Adapting in real time
        </span>
        <span className="text-overcast">DIKSHA architecture</span>
      </div>
    </div>
  );
}

export default function KnowledgeHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-28 lg:pb-24">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold text-primary-text">Akashic Knowledge</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">Built on Akashic</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                The national knowledge grid
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                Intelligence at{" "}
                <span className="relative inline-block whitespace-nowrap">
                  civilisation scale.
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[34em] text-lg leading-relaxed text-secondary-text">
                Education is the operating system of a nation. We power the
                learning journey for 1.89 crore registered learners: adapting
                content, language, and pace for every single student,
                simultaneously.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="#the-grid" className="btn-primary">
                  Explore the grid
                </Link>
                <Link href="#proof" className="btn-secondary">
                  See the impact
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <GridCard />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
