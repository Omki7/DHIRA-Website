"use client";

/*
 * /akashic hero (rewritten 14 Oct 2026 from the founder's wireframe,
 * DHIRA_ai_Website_v2.html: "The intelligence layer for your entire
 * enterprise."). His category, our promise: the headline keeps
 * "intelligence layer" and ties it to the decision, the word the rest of
 * the site sells. One idea per part:
 *   pill      what it is (the governed data and AI platform)
 *   eyebrow   what every team does with it (his verbs, minus "act":
 *             agents are in preview and a person decides)
 *   headline  the role it plays
 *   lede      how, and the organisation-wide gain
 * His "in weeks, not quarters" is held until he confirms (see
 * founder-wireframe claims list), so it stays out of the lede.
 * Replaced the rotating "Every answer / number / decision ... is already
 * in your data" headline.
 */

import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

export default function AkashicHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-background" aria-hidden />

      <ScrollRevealRail>
        <div className="flex flex-col items-center justify-center min-h-[50vh] pt-24 pb-12 text-center lg:pt-28 lg:pb-14">
          <ScrollReveal>
            <figure className="group relative mb-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-subtle-stroke p-[1px] shadow-sm transition-shadow hover:shadow">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#266DF2_100%)] opacity-75 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors group-hover:bg-background sm:text-sm">
                <span className="inline-flex items-center font-semibold text-primary-text">
                  <AkashicLogo className="h-5 w-5" />
                  <span className="-ml-1">kashic</span>
                </span>
                <span className="mx-1 h-3.5 w-px bg-default-stroke" />
                <span className="font-medium text-primary-text">The governed data and AI platform</span>
              </span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Ask <span className="text-overcast">&middot;</span> Predict{" "}
              <span className="text-overcast">&middot;</span> Decide
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140} className="w-full min-w-0 px-4 sm:px-6">
            <h1 className="mx-auto mt-6 max-w-[24em] text-balance text-[38px] font-semibold leading-[1.1] tracking-tightest text-primary-text sm:text-5xl md:text-6xl lg:text-7xl">
              The intelligence layer{" "}
              <span className="sm:block">
                behind every{" "}
                <span className="relative whitespace-nowrap">
                  decision.
                  <span
                    className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-[calc(100%-0.28em)] rounded-full bg-blue/35"
                    aria-hidden
                  />
                </span>
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[38em] text-balance text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Akashic brings your data, analytics and AI onto one governed platform,
              ready for agents. Every team works from the same figures, each one traced
              to its source.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#talk-to-our-team" className="btn-primary">
                Talk to our team
              </Link>
              <Link href="#akashic-in-action" className="btn-secondary">
                See it answer a question
              </Link>
            </div>
          </ScrollReveal>


        </div>
      </ScrollRevealRail>
    </section>
  );
}
