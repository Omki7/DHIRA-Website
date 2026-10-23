"use client";

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import AkashicLogo from "@/components/icons/AkashicLogo";
import type { HomeClose } from "@/content/pages/home";

/*
 * [10] Ready when you are.
 *
 * The closing card and footer follow the selected appearance. The pale blue
 * light treatment shares the same geometry as the layered midnight version.
 *
 * The typographic polish built during the blue round stays: `closeRule` draws
 * the hairline under the headline on reveal, and the two ambient auras drift
 * on offset cycles (`closeFloat`) so the card is never quite still. Both are
 * decorative and stop dead under the global reduced-motion override.
 */

export default function Closure({ content }: { content: HomeClose }) {
  return (
    <section
      id="get-started"
      aria-labelledby="get-started-h"
      className="relative overflow-hidden bg-background pt-10 pb-12 lg:pt-14 lg:pb-16"
    >
      {/* Alias anchor: the nav CTA targets #talk-to-our-team / #login on every page */}
      <span id="talk-to-our-team" className="absolute -top-24" aria-hidden />
      <span id="login" className="absolute -top-24" aria-hidden />
      <ScrollRevealRail className="z-10">
        {/* Immersive typography-first card */}
        <ScrollReveal delay={120}>
          <div className="group/card relative overflow-hidden rounded-outer border border-line bg-vault px-6 py-24 text-ink  transition-all duration-500 ease-settle hover:border-line md:py-32 lg:py-40">
            {/* Custom dot-grid background */}
            

{/* Glowing blue ambient background — offset centre, counter-drifting */}
            

            {/* Immersive Typography CTA Content */}
            <div className="relative z-10 mx-auto flex max-w-[54rem] flex-col items-center text-center">
              {/* Minimalist Accent Badge */}
              <div className="mb-8 flex items-center gap-2 rounded-full border border-line bg-background px-3 py-1 font-mono text-[11px] tracking-eyebrow text-secondary-text">
                <AkashicLogo className="h-3.5 w-3.5" accentColor="rgb(var(--diagram-gold))" />
                <span className="uppercase">{content.badge}</span>
              </div>

              <h2
                id="get-started-h"
                className="text-balance  pb-1 text-[44px] font-medium leading-[1.03] tracking-tighter text-ink sm:text-[60px] md:text-[80px] lg:text-[96px]"
              >
                {content.title}
              </h2>

              {/* Hairline that draws itself in under the headline. */}
              <span
                aria-hidden
                className="mt-6 h-px w-[min(420px,70%)] origin-center animate-[closeRule_900ms_cubic-bezier(0.2,0.8,0.2,1)_320ms_both] bg-blue"
              />

              <p className="mt-7 max-w-[34em] text-base leading-relaxed text-secondary-text md:text-lg lg:text-xl">
                {/* The explicit {" "} are load-bearing — JSX drops the
                    whitespace around the newline before a <br>, so below `sm`,
                    where these breaks are hidden, the lines closed up into
                    "streaming data.Resolve core entities" and "knowledge
                    layer,and run enterprise intelligence". */}
                {/* Last line rewritten 14 Oct 2026: "run enterprise
                    intelligence" now reads as the Enterprise Intelligence
                    solution. It ends on /akashic's hero promise instead. */}
                {content.body.map((line, k) => (
                  <span key={line}>
                    {line}
                    {k < content.body.length - 1 && (
                      <>
                        {" "}
                        <br className="hidden sm:block" />
                      </>
                    )}
                  </span>
                ))}
              </p>

              {/* Centered CTA Buttons */}
              <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
                <Link
                  href={content.primary.href}
                  className="btn-primary btn-lg transition-transform duration-200 ease-settle hover:-translate-y-0.5"
                >
                  {content.primary.label}
                </Link>
                {/* Was `#platform` — at the closing CTA, half the exits
                    pointed BACK UP the page the reader has just finished. A
                    close should only offer forward moves, so this goes to the
                    platform page. */}
                <Link
                  href={content.secondary.href}
                  className="btn-secondary btn-lg transition-transform duration-200 ease-settle hover:-translate-y-0.5"
                >
                  {content.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
