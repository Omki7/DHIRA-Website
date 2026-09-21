"use client";

/*
 * [04] How We Show Up — The Way We Show Up.
 * 4-Card visual grid with connected sequential process flow indicators and bespoke editorial imagery.
 * Four commitments: We listen first → We build together → We work openly → We tell the truth.
 */

import Link from "next/link";
import Image from "next/image";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

interface CommitmentCard {
  id: string;
  num: string;
  name: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const COMMITMENTS: CommitmentCard[] = [
  {
    id: "listen",
    num: "01",
    name: "We listen first.",
    description: "Every engagement begins with understanding your operational reality, your legacy systems, your constraints, and your goals.",
    imageSrc: "/about/listen.jpg",
    imageAlt: "Engineers conducting architecture discovery and context analysis",
  },
  {
    id: "together",
    num: "02",
    name: "We build together.",
    description: "Your team learns the architecture as we build it. By the time we hand over, you are equipped, not dependent.",
    imageSrc: "/about/build.jpg",
    imageAlt: "Engineers collaborating in a pair programming sprint",
  },
  {
    id: "open",
    num: "03",
    name: "We work openly.",
    description: "Inspectable systems, clear communications, and transparent decisions. No black boxes, hidden locks, or proprietary dead-ends.",
    imageSrc: "/about/open.jpg",
    imageAlt: "Modular transparent software architecture and open pipelines",
  },
  {
    id: "truth",
    num: "04",
    name: "We tell the truth.",
    description: "If Akashic or an approach is not the right fit, we say so immediately. We would rather earn your long-term trust than close a deal.",
    imageSrc: "/about/truth.jpg",
    imageAlt: "Senior software architect providing direct verified guidance",
  },
];

export default function AboutHow() {
  return (
    <section
      id="how-we-work"
      className="scroll-mt-24 border-t border-lineSoft bg-background pt-16 pb-24 lg:pt-20 lg:pb-32"
    >
      <ScrollRevealRail>
        {/* --- SECTION HEADER --- */}
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[04]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;How we show up</span>
            </p>
            <span className="hidden text-overcast sm:inline">/ Four commitments</span>
          </div>

          <div className="mt-5 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-ink md:text-4xl lg:text-5xl">
                The way we show up.
              </h2>
              <p className="mt-3 max-w-[36em] text-base leading-relaxed text-secondary-text sm:text-lg">
                Four commitments. The same on the first day of an engagement as the last.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="#talk-to-our-team" className="btn-secondary text-xs">
                Talk to our team &rarr;
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* --- HORIZONTAL PROCESS FLOW STEPPER RAIL (DESKTOP) --- */}
        <ScrollReveal delay={80}>
          <div className="mt-10 hidden lg:block">
            <div className="relative flex items-center justify-between rounded-2xl border border-subtle-stroke bg-primary-bg/80 p-3.5 shadow-sm">
              {/* Connected Dashed Line */}
              <div
                className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-0.5 border-t-2 border-dashed border-blue-border/70"
                aria-hidden
              />

              {COMMITMENTS.map((c, idx) => (
                <div
                  key={c.id}
                  className="relative z-10 flex items-center gap-2.5 bg-white px-4 py-1.5 rounded-full border border-subtle-stroke shadow-sm"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue text-white font-mono text-[10px] font-bold">
                    {c.num}
                  </span>
                  <span className="font-semibold text-xs text-ink">{c.name}</span>
                  {idx < COMMITMENTS.length - 1 && (
                    <span className="hidden xl:inline text-blue font-bold text-xs ml-1">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* --- 4-CARD VISUAL FEATURE GRID --- */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {COMMITMENTS.map((card, idx) => (
            <ScrollReveal key={card.id} delay={100 + idx * 60}>
              <div className="group flex h-full flex-col justify-between">
                <div>
                  {/* Clean Visual Image Container */}
                  <div className="relative aspect-[1.15] w-full overflow-hidden rounded-2xl border border-subtle-stroke bg-primary-bg shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-blue-border group-hover:shadow-frame">
                    <Image
                      src={card.imageSrc}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Gradient darkening overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-black/15" />

                    {/* Number Badge Overlay */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-vault/85 font-mono text-[10px] font-bold text-white backdrop-blur-md border border-white/20">
                        {card.num}
                      </span>
                    </div>
                  </div>

                  {/* Text Details Underneath Image */}
                  <div className="mt-4">
                    <h3 className="text-xl font-bold text-ink group-hover:text-blue transition-colors">
                      {card.name}
                    </h3>
                    <p className="mt-2 text-sm text-secondary-text leading-relaxed font-sans">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </ScrollRevealRail>
    </section>
  );
}
