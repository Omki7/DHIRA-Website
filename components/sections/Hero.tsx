"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* Rotating phrase — same context, different emotional lever.
   "act on" is deliberately absent: the subhead owns it. */
const heroPhrases = [
  "stand on",
  "build on",
  "decide on",
  "commit to",
];
const PHRASE_INTERVAL = 2600;

export default function Hero() {
  const [phraseIndex, setPhraseIndex] = useState(0);

  /* Rotating phrase — rests entirely under reduced motion */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % heroPhrases.length);
    }, PHRASE_INTERVAL);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <ScrollRevealRail>
        {/* Centered text block. The product screen carousel that peeked in
            below it (HeroProductsMockup + HeroConnections) was removed on
            23 Sep 2026 by direction: the homepage is screen-heavy enough.
            The block now fills the opening viewport on its own. */}
        <div className="relative isolate flex min-h-[calc(100svh-4.5rem)] flex-col items-center justify-center px-4 pt-20 pb-24 text-center sm:px-6 lg:pt-24 lg:pb-28">
          {/* Same dot-grid ground as /akashic's hero (AkashicHero.tsx), 22 Sep
              2026 by direction: the two heroes are one component family and
              the homepage was the bare one. Full-bleed from inside the rail
              (the section's overflow-hidden clips the 100vw) and held to the
              headline block, as on /akashic. It fades out at the bottom
              with a mask. */}
          <div
            aria-hidden
            className="dot-grid pointer-events-none absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 opacity-60 [mask-image:linear-gradient(to_bottom,black_calc(100%-12rem),transparent)]"
          />
          {/* Same pill chrome as /akashic's hero (AkashicHero.tsx): a 1px
              `subtle-stroke` rim with a conic gradient spinning inside it, so
              a single blue arc travels the edge. The homepage carried a
              static bordered pill, which read as the plain version of the
              same component one page over. Kept as a Link here (it goes to
              /akashic) where the platform page uses a non-interactive
              <figure>; the arrow and hover lift stay.

              The spin is Tailwind's built-in `spin` keyframe, so it is
              covered by the global reduced-motion override. */}
          <Link
            href="/akashic"
            className="group relative mb-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-subtle-stroke p-[1px] shadow-sm transition-shadow ease-settle hover:shadow"
          >
            <span
              aria-hidden
              className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#266DF2_100%)] opacity-75 transition-opacity group-hover:opacity-100"
            />
            <span className="relative flex items-center gap-2 rounded-full bg-background/95 px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors group-hover:bg-background sm:text-sm">
              <span className="hidden font-normal text-secondary-text min-[380px]:inline">Powered by</span>
              <span className="inline-flex items-center font-semibold text-primary-text">
                <AkashicLogo className="h-5 w-5" />
                <span className="-ml-1">kashic</span>
              </span>
              <span className="mx-1 h-3.5 w-px bg-default-stroke" />
              <span className="font-medium text-primary-text">Deployed at national scale</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-secondary-text ml-0.5 transition-transform ease-settle group-hover:translate-x-0.5">
                <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>

          <h1 className="w-full max-w-[22em] text-[clamp(2rem,10vw,3rem)] font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
            Answers are easy. <br className="hidden md:block" />
            <span className="inline">Answers you can </span>
            <span className="relative inline-block align-baseline">
              {/* invisible spacer — sized to the longest phrase+" are not." so layout never shifts */}
              <span className="invisible whitespace-nowrap">commit to are not.</span>
              {heroPhrases.map((phrase, i) => (
                <span
                  key={phrase}
                  aria-hidden={i !== phraseIndex}
                  className="absolute left-0 top-0 whitespace-nowrap"
                  style={{
                    opacity: i === phraseIndex ? 1 : 0,
                    filter: i === phraseIndex ? "blur(0)" : "blur(4px)",
                    transform: i === phraseIndex ? "scale(1)" : "scale(0.96)",
                    transition: "opacity 380ms cubic-bezier(0.2,0.8,0.2,1), filter 380ms cubic-bezier(0.2,0.8,0.2,1), transform 380ms cubic-bezier(0.2,0.8,0.2,1)",
                    transitionDelay: i === phraseIndex ? "60ms" : "0ms",
                  }}
                >
                  <span className="relative">
                    {phrase}
                    <span
                      className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                      style={{
                        opacity: i === phraseIndex ? 1 : 0,
                        transition: "opacity 380ms cubic-bezier(0.2,0.8,0.2,1)",
                        transitionDelay: i === phraseIndex ? "180ms" : "0ms",
                      }}
                    />
                  </span>
                  <span className="inline"> are not.</span>
                </span>
              ))}
            </span>
          </h1>
          <p className="mt-8 max-w-[38em] text-lg text-secondary-text md:text-xl font-normal leading-relaxed">
            DHIRA brings your data and AI together, grounded in the full picture.{" "}
            <br className="hidden sm:block" />
            Every answer is one you can trace, trust, and act on.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="#platform" className="btn-primary">
              See Akashic in action
            </Link>
            <Link href="#talk-to-our-team" className="btn-secondary">
              Talk to our team
            </Link>
          </div>
        </div>
      </ScrollRevealRail>
    </section>
  );
}
