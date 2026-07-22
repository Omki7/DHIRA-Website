/*
 * [00] EIS Hero — Answering For Itself.
 * Restaged in Keytail-inspired top-to-bottom sky atmosphere.
 */

import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import EisConsoleMockup from "@/components/demos/mockups/EisConsoleMockup";

const systems = [
  { src: "/universal-context/salesforce.svg", label: "Salesforce", inset: "inset-[26%_18%]" },
  { src: "/universal-context/sap.svg", label: "SAP", inset: "inset-[24%]" },
  { src: "/universal-context/netsuite.png", label: "NetSuite", inset: "inset-[32%_14%]" },
  { src: "/universal-context/oracle.svg", label: "Oracle", inset: "inset-[40%_10%]" },
  { src: "/universal-context/postgresql.svg", label: "PostgreSQL", inset: "inset-[25%]" },
];

export default function EisHero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-transparent">
      <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-14 pt-16 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <div className="mx-auto max-w-[900px] text-center">
          <ScrollReveal>
            <p className="font-mono text-[11px] uppercase tracking-eyebrow text-white/50">
              Akashic <span className="text-white/25">&middot;</span> Executive Intelligence System
            </p>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="mx-auto mt-5 max-w-[14em] text-balance text-[40px] font-semibold leading-[1.02] tracking-tightest text-white sm:text-5xl md:text-6xl lg:text-[68px]">
              Your whole business, on one screen,{" "}
              <span className="relative inline-block">
                answering for itself.
                <span
                  className="absolute -bottom-[0.01em] left-0 h-[0.045em] w-full rounded-full bg-blue-400"
                  aria-hidden
                />
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mx-auto mt-7 max-w-[34em] text-[17px] leading-relaxed text-white/70 md:text-lg">
              The executive layer of the Akashic platform. It reads the systems you
              already run, writes your brief before you walk in, and turns the
              decision you make into an action those systems receive.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="#talk-to-our-team"
                className="inline-flex h-11 items-center justify-center rounded-btn bg-white px-5 text-[15px] font-semibold text-slate-900 transition-colors duration-250 ease-settle hover:bg-white/90"
              >
                See it with your own data
              </Link>
              <Link
                href="#the-loop"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-btn border border-white/25 px-5 text-[15px] font-medium text-white transition-colors duration-250 ease-settle hover:border-white/50 hover:bg-white/5"
              >
                How the loop closes
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={300}>
            <div className="mt-10 flex flex-col items-center gap-3.5">
              <p className="font-mono text-[10px] uppercase tracking-eyebrow text-white/40">
                Reads the systems you already run
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {systems.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-1.5 pr-3.5 backdrop-blur-sm"
                  >
                    <span className="relative h-[22px] w-[22px] shrink-0 rounded-full bg-white">
                      <span className={`absolute ${s.inset}`}>
                        <Image
                          src={s.src}
                          alt=""
                          fill
                          sizes="22px"
                          className="object-contain"
                        />
                      </span>
                    </span>
                    <span className="text-[12px] font-medium text-white/80">{s.label}</span>
                  </span>
                ))}
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-white/35">
                  and the rest
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={200}>
          <div className="mx-auto mt-14 max-w-[1180px] lg:mt-16">
            <EisConsoleMockup />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
