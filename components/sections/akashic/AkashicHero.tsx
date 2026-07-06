"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AkashicLogo from "@/components/icons/AkashicLogo";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { MiniStack } from "@/components/sections/akashic/AkashicCardChrome";

/* Rotating "answer" word — same context, different noun. */
const heroWords = ["answer", "insight", "signal", "verdict"];
const WORD_INTERVAL = 2600;

function HeroFlow() {
  return (
    <svg width="72" height="24" viewBox="0 0 72 24" fill="none" aria-hidden className="shrink-0" style={{ overflow: "visible" }}>
      <path d="M 0 12 Q 36 8, 72 12" stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
      <path d="M 0 12 Q 36 8, 72 12" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="14 58" fill="none" opacity="0.8">
        <animate attributeName="stroke-dashoffset" values="72;0" dur="2.2s" repeatCount="indefinite" />
      </path>
      <circle cx="0" cy="12" r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
      <circle cx="0" cy="12" r="1.8" fill="#3E63DD" />
      <circle cx="72" cy="12" r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
      <circle cx="72" cy="12" r="1.8" fill="#3E63DD" />
    </svg>
  );
}

const heroSources = [
  { name: "CRMs", dot: "#00A1E0" },
  { name: "PDFs", dot: "#E8491D" },
  { name: "Live feeds", dot: "#3E63DD" },
];

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
    <section className="relative overflow-hidden bg-background">
      <div className="dot-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-white" aria-hidden />

      <div className="rail-container relative border-x-0">
        <div className="flex min-h-[56vh] flex-col items-center justify-center pt-24 pb-20 text-center lg:pt-32 lg:pb-24">
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
              The platform behind every{" "}
              <span className="relative inline-block align-baseline">
                {/* invisible spacer — sized to the longest word so layout never shifts */}
                <span className="invisible whitespace-nowrap">insight</span>
                {heroWords.map((word, i) => (
                  <span
                    key={word}
                    aria-hidden={i !== wordIndex}
                    className="absolute left-0 top-0 whitespace-nowrap"
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
              </span>
              <br />
              <span className="whitespace-nowrap">DHIRA gives.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={220}>
            <p className="mt-8 max-w-[34em] text-lg font-normal leading-relaxed text-secondary-text md:text-xl">
              Wherever your data lives. One platform that keeps it current, connected,
              and ready the moment a decision needs it.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link href="#talk-to-our-team" className="btn-primary">
                Talk to our team
              </Link>
              <Link href="#how-it-works" className="btn-secondary">
                See how it works
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={380}>
            <div className="mt-16 hidden items-center gap-4 md:flex">
              <div className="flex flex-col gap-1.5">
                {heroSources.map((src) => (
                  <span
                    key={src.name}
                    className="inline-flex items-center gap-1.5 rounded-full border border-subtle-stroke bg-white px-2.5 py-1 text-[10.5px] font-medium text-ink shadow-card"
                  >
                    <span className="h-1 w-1 rounded-full" style={{ background: src.dot }} />
                    {src.name}
                  </span>
                ))}
              </div>
              <HeroFlow />
              <MiniStack />
              <HeroFlow />
              <div className="rounded-[12px] border border-subtle-stroke bg-white px-4 py-3 text-left shadow-card">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#30A46C] animate-[ps-pulse_2s_infinite]" />
                  <span className="text-[12px] font-semibold text-ink">Answer, ready to defend</span>
                </div>
                <div className="mt-1 text-[11px] text-inkSoft">Traceable to its source. In time to act.</div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
