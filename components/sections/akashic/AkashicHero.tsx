"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";

/* Rotating "answer" word — same context, different noun. */
const heroWords = ["answer", "number", "decision"];
const WORD_INTERVAL = 2600;

export default function AkashicHero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const interval = WORD_INTERVAL + (prefersReduced ? 1400 : 0);
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % heroWords.length);
    }, interval);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="flex flex-col items-center justify-center pt-24 pb-16 text-center lg:pt-32 lg:pb-20">
          <ScrollReveal>
            <figure className="group relative mb-8 inline-flex items-center justify-center overflow-hidden rounded-full bg-subtle-stroke p-[1px] shadow-sm transition-shadow hover:shadow">
              <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,transparent_85%,#266DF2_100%)] opacity-75 transition-opacity group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-xs backdrop-blur-md transition-colors group-hover:bg-white sm:text-sm">
                <span className="inline-flex items-center font-semibold text-primary-text">
                  <AkashicLogo className="h-5 w-5" />
                  <span className="-ml-1">kashic</span>
                </span>
                <span className="mx-1 h-3.5 w-px bg-default-stroke" />
                <span className="font-medium text-primary-text">The complete record of your data</span>
              </span>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
              Grounded data <span className="text-overcast">&middot;</span> Trusted AI{" "}
              <span className="text-overcast">&middot;</span> Decisions you can defend
            </p>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <h1 className="mt-6 max-w-[22em] text-5xl font-semibold leading-[1.05] tracking-tightest text-primary-text md:text-6xl lg:text-7xl">
              Every{" "}
              <span className="inline-grid align-baseline">
                {/* every word occupies the same grid cell, so the cell is always
                    as wide as the widest word and the layout never shifts */}
                {heroWords.map((word, i) => (
                  <span
                    key={word}
                    aria-hidden={i !== wordIndex}
                    className="col-start-1 row-start-1 justify-self-center whitespace-nowrap"
                    style={{
                      opacity: i === wordIndex ? 1 : 0,
                      filter: i === wordIndex ? "blur(0)" : "blur(4px)",
                      transform: i === wordIndex ? "scale(1)" : "scale(0.96)",
                      transition:
                        "opacity 380ms cubic-bezier(0.2,0.8,0.2,1), filter 380ms cubic-bezier(0.2,0.8,0.2,1), transform 380ms cubic-bezier(0.2,0.8,0.2,1)",
                      transitionDelay: i === wordIndex ? "60ms" : "0ms",
                    }}
                  >
                    <span className="relative">
                      {word}
                      <span
                        className="absolute -bottom-[0.06em] left-0 h-[0.08em] w-full rounded-full bg-blue/35"
                        style={{
                          opacity: i === wordIndex ? 1 : 0,
                          transition: "opacity 380ms cubic-bezier(0.2,0.8,0.2,1)",
                          transitionDelay: i === wordIndex ? "180ms" : "0ms",
                        }}
                      />
                    </span>
                  </span>
                ))}
              </span>{" "}
              <span className="whitespace-nowrap">your business needs</span>
              <br />
              is already in your data.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[34em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Your systems hold the numbers. Your documents hold the reasons. Nothing
              joins them. Akashic is one governed platform for enterprise data,
              analytics, and AI: it reads both, and keeps the complete record ready the
              moment a decision needs it.
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
      </div>
    </section>
  );
}
