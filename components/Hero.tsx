"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AkashicLogo from "./AkashicLogo";
import HeroProducts from "./HeroProducts";
import HeroConnections from "./HeroConnections";

/* Rotating "act on" phrase — same context, different emotional lever. */
const heroPhrases = [
  "stand on",
  "build on",
  "decide on",
  "commit to",
  "act on",
];
const PHRASE_INTERVAL = 2600;

const quoteWords = [
  "“I",
  "didn’t",
  "realize",
  "how",
  "much",
  "I’d",
  "stopped",
  "trusting",
  "our",
  "own",
  "numbers,",
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
  const [phraseIndex, setPhraseIndex] = useState(0);
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
      
      // Calculate progress starting after the hero has fully scrolled out
      // We divide by window.innerHeight * 1.5 because the sticky track is 150vh long
      const scrolledPastHero = Math.max(0, scrollPos - heroHeight);
      const progress = Math.max(0, Math.min(scrolledPastHero / (window.innerHeight * 1.5), 1));
      
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

  /* Rotating phrase — respects reduced-motion (fades only, still cycles) */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interval = PHRASE_INTERVAL + (prefersReduced ? 1400 : 0);
    const id = setInterval(() => {
      setPhraseIndex((i) => (i + 1) % heroPhrases.length);
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      {/* Quote section — tall sticky backdrop */}
      <section
        className="relative w-full bg-blue"
        style={{ height: `calc(150vh + ${heroHeight}px)` }}
      >
        <div className="dot-grid absolute inset-0 opacity-20 invert" />

        <div className="sticky top-16 flex h-[calc(100vh-64px)] w-full flex-col items-center justify-center text-center px-4">
          <div className="w-full flex justify-center">
            <p className="max-w-[18em] text-[35px] font-medium leading-[1.1] tracking-tight text-white lg:text-[56px]">
              {quoteWords.map((word, i) => {
                const isActive = quoteProgress * totalWords >= i + 0.3;
                return (
                  <span key={i} className="inline">
                    <span
                      className="transition-colors duration-[250ms] ease-settle"
                      style={{
                        color: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.4)",
                      }}
                    >
                      {word}
                    </span>
                    {i < totalWords - 1 && <span className="inline"> </span>}
                    {(word === "again.”" || word === "numbers,") && (
                      <br className="hidden md:block" />
                    )}
                  </span>
                );
              })}
            </p>
          </div>
          {/* Author attribution — statically visible immediately as part of the quote */}
          <div className="mt-8 flex flex-col items-center text-sm text-white/70">
            <span className="font-semibold text-white">Carlson Magun</span>
            <span>Head of Business · intapp</span>
          </div>
        </div>
      </section>

      {/* Hero content layer — absolute positioned to act as a rising curtain */}
      <div
        ref={heroRef}
        className="absolute inset-x-0 top-0 z-10 flex w-full flex-col bg-primary-bg"
      >
        <div className="rail-container border-x-0">
          {/* Centered text block — sized so the wireframe cards peek ~20% in the opening viewport */}
          <div className="flex min-h-[68vh] flex-col items-center justify-center pt-24 pb-10 text-center lg:pt-28 lg:pb-12">
          <figure className="group relative mb-10 inline-flex items-center justify-center overflow-hidden rounded-full bg-subtle-stroke p-[1px] shadow-sm transition-shadow hover:shadow">
            {/* The spinning proton gradient */}
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#266DF2_100%)] opacity-75 transition-opacity group-hover:opacity-100" />
            
            {/* Inner pill content */}
            <span className="relative flex items-center gap-2 rounded-full bg-white/95 backdrop-blur-md px-3.5 py-1.5 text-xs transition-colors group-hover:bg-white sm:text-sm">
              <span className="text-secondary-text font-normal">Powered by</span>
              <span className="inline-flex items-center font-semibold text-primary-text">
                <AkashicLogo className="h-5 w-5" />
                <span className="-ml-1">kashic</span>
              </span>
              <span className="mx-1 h-3.5 w-px bg-default-stroke" />
              <span className="font-medium text-primary-text">The complete record of your data</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-secondary-text ml-0.5 transition-transform group-hover:translate-x-0.5">
                <path d="M2.5 6H9.5M9.5 6L6 2.5M9.5 6L6 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </figure>
          
          <h1 className="max-w-[22em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
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
          <p className="mt-8 max-w-[44em] text-balance text-lg text-secondary-text md:text-xl font-normal leading-snug">
            <span className="block whitespace-nowrap">DHIRA brings all of your data and AI together, grounded in the full picture.</span>
            <span className="block">Every answer is one you can trace, trust, and act on.</span>
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

          {/* Product UI mockup — peeks from the bottom. The shrunken hero text block plus removed translate-y lets ~20% of the cards show on load. */}
          <div className="relative -mt-6 w-full pb-24 lg:-mt-10 lg:pb-32">
            <HeroConnections />
            <div className="flex flex-col items-center w-full relative z-10 -mb-[300px] lg:-mb-[450px]">
              <HeroProducts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
