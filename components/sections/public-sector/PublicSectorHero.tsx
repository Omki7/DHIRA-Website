/*
 * [00] Public Sector Hero — Already Built For It.
 * Split hero: pitch left, a public-record missions board right (§8a chrome,
 * but the figures are real public-record numbers per the content script).
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import { LiveChip } from "@/components/sections/akashic/AkashicCardChrome";

const missions = [
  { name: "CoWIN / U-WIN", figure: "2B+", label: "vaccinations" },
  { name: "DIKSHA", figure: "564 Cr", label: "learning sessions" },
  { name: "eMigrate", figure: "3.87 L", label: "emigrations tracked" },
  { name: "Poshan Tracker", figure: "10 Cr+", label: "children & mothers" },
];

function MissionsBoard() {
  return (
    <div className="w-full max-w-[460px] overflow-hidden rounded-[14px] border border-subtle-stroke bg-white text-left shadow-frame">
      <div className="flex items-center justify-between border-b border-blue/10 bg-gradient-to-b from-blue-subtle/70 to-transparent px-4 py-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-eyebrow text-inkSoft">
          National missions &middot; in production
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
        <span className="text-inkSoft">Public-record numbers</span>
        <span className="text-overcast">No testimonials needed</span>
      </div>
    </div>
  );
}

export default function PublicSectorHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <ScrollRevealRail>
        <div className="grid grid-cols-1 items-center gap-12 pt-20 pb-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pt-28 lg:pb-16">
          <div>
            <ScrollReveal>
              <figure className="mb-7 inline-flex items-center gap-2 rounded-full border border-subtle-stroke bg-white/95 px-3.5 py-1.5 text-xs shadow-sm backdrop-blur-md sm:text-sm">
                <span className="font-semibold text-primary-text">Public Sector</span>
                <span className="h-3.5 w-px bg-default-stroke" aria-hidden />
                <span className="font-medium text-primary-text">Akashic by sector</span>
              </figure>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
                Akashic for public sector <span className="text-overcast">&middot;</span> Government
              </p>
            </ScrollReveal>

            <ScrollReveal delay={140}>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-[64px]">
                We don&rsquo;t pitch government.{" "}
                <span className="relative inline-block">
                  We&rsquo;ve already built for it.
                  <span className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35" aria-hidden />
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={220}>
              <p className="mt-7 max-w-[36em] text-lg leading-relaxed text-secondary-text">
                From vaccination drives to national education platforms, Akashic
                already powers some of India&rsquo;s largest public digital
                infrastructure. Real citizens. Real scale. Real outcomes, not a
                sandbox demo.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="#proven" className="btn-primary">
                  See the platforms we&rsquo;ve built
                </Link>
                <Link href="#talk-to-our-team" className="btn-secondary">
                  Talk to our team
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={260} className="min-w-0">
            <div className="flex justify-center lg:justify-end">
              <MissionsBoard />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={340}>
          <p className="border-t border-dashed border-lineSoft pb-14 pt-5 text-center font-mono text-[10px] uppercase tracking-eyebrow text-overcast lg:pb-20">
            Built for ministries, state governments, and national missions &middot; at population scale
          </p>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
