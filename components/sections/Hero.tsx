"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import HeroProductsMockup from "@/components/demos/mockups/HeroProductsMockup";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

// Decorative background canvas: client-only + deferred so its animation JS is
// off the initial critical path (it's absolutely positioned, so no layout shift).
const HeroConnections = dynamic(() => import("@/components/demos/HeroConnections"), {
  ssr: false,
});

/* Sticky quote track, in viewport heights.
   The quote panel is `sticky top-16` inside a section `QUOTE_TRACK_VH + heroHeight`
   tall, so it UNSTICKS and starts scrolling away once scrollY passes
   `heroHeight + (QUOTE_TRACK_VH - 100)vh`. The word-by-word ink has to finish
   inside that window.

   It once did not: the track was 150vh (a 50vh sticky window) while the reveal
   was spread over 150vh of scroll, so the quote was only a third inked at the
   moment it began leaving, and hit full ink when it was already off screen.
   The reader never saw the sentence land.

   THE INVARIANT, which any future retune must hold:
       QUOTE_REVEAL_VH  <  QUOTE_TRACK_VH - 100
   The difference between them is the beat the finished quote holds still.

   Track cut 200 → 140 (23 Jul 2026, hero pass) — 2.5 screens for one
   testimonial was the single most expensive stretch on the page. The reveal
   comes down with it: at a 140 track the sticky window is 40vh, so 30 inks the
   sentence with 10vh of hold left. 55 was considered and is NOT usable here —
   it breaks the invariant above and leaves the quote half-grey as it leaves. */
const QUOTE_TRACK_VH = 140;
const QUOTE_REVEAL_VH = 30;

const quoteWords = [
  "“I",
  "didn’t",
  "realise",
  "how",
  "much",
  "I’d",
  "stopped",
  "trusting",
  "our",
  "own",
  "numbers",
  "until",
  "the",
  "day",
  "I",
  "finally",
  "could",
  "again.”",
];

export default function Hero() {
  const [quoteProgress, setQuoteProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const [heroHeight, setHeroHeight] = useState(1200);

  useEffect(() => {
    if (!heroRef.current) return;

    // Set initial
    setHeroHeight(heroRef.current.offsetHeight);

    // Watch for resizes
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setHeroHeight(entry.contentRect.height);
      }
    });

    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;

      // Progress starts once the hero curtain has fully risen and finishes
      // while the quote is still stuck to the viewport — see QUOTE_REVEAL_VH.
      const scrolledPastHero = Math.max(0, scrollPos - heroHeight);
      const revealDistance = (window.innerHeight * QUOTE_REVEAL_VH) / 100;
      const progress = revealDistance > 0
        ? Math.max(0, Math.min(scrolledPastHero / revealDistance, 1))
        : 1;

      setQuoteProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [heroHeight]);

  const totalWords = quoteWords.length;

  return (
    <div id="hero" className="relative">
      {/* Quote section — tall sticky backdrop */}
      <section
        className="relative w-full bg-blue-subtle"
        style={{ height: `calc(${QUOTE_TRACK_VH}vh + ${heroHeight}px)` }}
      >
        <div className="dot-grid absolute inset-0 opacity-60" />

        <div className="sticky top-16 flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center text-center px-4">
          <div className="w-full flex justify-center">
            <p className="max-w-[18em] text-[35px] font-medium leading-[1.1] tracking-tight text-ink lg:text-[56px]">
              {quoteWords.map((word, i) => {
                const isActive = quoteProgress * totalWords >= i + 0.3;
                return (
                  <span key={i} className="inline">
                    <span
                      className="transition-colors duration-[250ms] ease-settle"
                      style={{
                        color: isActive ? "#1A1C1D" : "rgba(26, 28, 29, 0.35)",
                      }}
                    >
                      {word}
                    </span>
                    {i < totalWords - 1 && <span className="inline"> </span>}
                    {word === "trusting" && (
                      <br className="hidden md:block" />
                    )}
                  </span>
                );
              })}
            </p>
          </div>
          {/* Author attribution — statically visible immediately as part of the quote */}
          <div className="mt-8 flex flex-col items-center text-sm text-inkSoft">
            <span className="font-semibold text-ink">Ananya Rao</span>
            <span>Chief Operating Officer · Nexora</span>
          </div>
        </div>
      </section>

      {/* Hero content layer — absolute positioned to act as a rising curtain */}
      <div
        ref={heroRef}
        className="absolute inset-x-0 top-0 z-10 flex w-full flex-col bg-background"
      >
        <ScrollRevealRail>
          {/* Centered text block — sized so the wireframe cards peek in the opening viewport */}
          <div className="flex min-h-[55vh] flex-col items-center justify-center pt-24 pb-4 text-center lg:pt-28 lg:pb-8">
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
              <span className="relative flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors group-hover:bg-white sm:text-sm">
                {/* WAS "Powered by Akashic" (23 Jul 2026, hero pass).
                    "Powered by X" is a badge you wear when X belongs to
                    someone else — Powered by Stripe, Powered by AWS — so on
                    DHIRA's own homepage it read as if we licence a third
                    party's platform, and it never told the reader Akashic is
                    ours. "Akashic by DHIRA" states the ownership and
                    introduces both names in the order the rest of the hero
                    uses them: the headline makes Akashic's claim, the subhead
                    says what DHIRA does on top of it. */}
                <span className="inline-flex items-center font-semibold text-primary-text">
                  <AkashicLogo className="h-5 w-5" />
                  <span className="-ml-1">kashic</span>
                </span>
                <span className="font-normal text-secondary-text">by DHIRA</span>
                <span className="mx-1 h-3.5 w-px bg-default-stroke" />
                <span className="font-medium text-primary-text">Deployed at national scale</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-secondary-text ml-0.5 transition-transform ease-settle group-hover:translate-x-0.5">
                  <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            {/* THE HEADLINE NOW STATES WHAT AKASHIC DOES (23 Jul 2026).
                It used to be "Answers are easy. Answers you can [stand on /
                build on / decide on / commit to] are not." — a problem
                statement, on a page whose [01] is a better-argued version of
                the same problem two screens later. So the most valuable line
                on the site was spent restating a pain instead of claiming a
                position, and a stranger reached [01] still not knowing whether
                DHIRA sells a product, a service or a consultancy.

                This sentence is not new copy: it is the caption that was
                already sitting under the hero mockup in 10px grey mono, "FROM
                EVERY SOURCE · ONE TRUSTED ANSWER", promoted to the size the
                claim deserves. The page kept writing the right sentence and
                then hiding it — the same thing the closing paragraph does.

                Two-tone setup/payoff in `inkSoft` → `ink`, which is the site's
                one headline grammar ([01], [05], [08] all run it). It also now
                rhymes deliberately with [01]'s "You asked for one number. You
                got three." — same two-clause rhythm, opposite polarity: the
                hero makes the promise, [01] shows the pain that earns it.

                The rotating word is gone with it. Four synonyms for one idea
                meant the sentence never landed, and no screenshot, OG image or
                share ever caught the phrase we meant. The blue underline it
                carried survives, moved onto "trace" — the one word in the
                headline that is the actual differentiator. */}
            <h1 className="max-w-[20em] text-5xl font-semibold leading-[1.05] tracking-tightest md:text-6xl lg:text-7xl">
              <span className="block text-inkSoft">Every system you run.</span>
              <span className="block text-primary-text">
                One answer you can{" "}
                <span className="relative inline-block whitespace-nowrap">
                  trace.
                  <span
                    aria-hidden
                    className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                  />
                </span>
              </span>
            </h1>

            {/* THE SUBHEAD SAYS WHAT DHIRA DOES ON TOP.
                The old block ("DHIRA brings your data and AI together,
                grounded in the full picture…") could have run on Informatica,
                Snowflake or a 2010 MDM vendor without changing a word, and it
                restated the headline's own promise rather than adding to it.

                An earlier note here argued the hero should NOT carry the
                platform/engineering split, on the grounds that the badge and
                [03]'s bridge already did. That was wrong, and the badge was
                the evidence: it said "Powered by Akashic", which is not the
                same fact. The split is the most important thing about this
                company and it was first stated at [04], nine screens down,
                where it read as a re-brief rather than a reveal.

                Sentence one names the category and the product; sentence two
                names both halves of the company. The "Akashic optional / or
                your own stack" nuance stays at [04] — it is a second-order
                detail and the hero should not carry every fact.
                "knowledge layer", never "knowledge graph" — sitewide. */}
            <p className="mt-8 max-w-[38em] text-lg text-secondary-text md:text-xl font-normal leading-relaxed">
              {/* BOTH {" "} here are load-bearing, for two different reasons.
                  The second one is the long-standing case: JSX drops the
                  whitespace around the newline before the <br>, so below `sm`
                  — where the break is hidden — the two sentences close up.

                  The first one is new and was caught in the browser, not in
                  review: the space between `</span>` and "is" disappeared in
                  the build, rendering "Akashicis DHIRA's". Any time a text run
                  begins immediately after a closing tag and then wraps to the
                  next source line, write the separator explicitly rather than
                  trusting the literal space. */}
              <span className="text-primary-text">Akashic</span>{" "}
              is DHIRA&apos;s data and AI platform: every source unified into one governed
              knowledge layer, every answer traceable to where it came from.{" "}
              <br className="hidden sm:block" />
              We deploy it inside your infrastructure, and build what runs on it.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              {/* Was "See Akashic in action", which promises a demo and
                  delivers a scroll to [02]. The label says what it does. */}
              <Link href="#platform" className="btn-primary">
                See how Akashic works
              </Link>
              <Link href="#talk-to-our-team" className="btn-secondary">
                Talk to our team
              </Link>
            </div>
          </div>

          {/* Product UI mockup — peeks from the bottom. Negative pull is kept
              small so the module tabs never crowd the CTA buttons above. */}
          <div className="relative -mt-8 w-full pb-0 lg:-mt-12">
            <HeroConnections />
            <div className="flex flex-col items-center w-full relative z-10">
              <HeroProductsMockup />
            </div>
          </div>
        </ScrollRevealRail>
      </div>
    </div>
  );
}
