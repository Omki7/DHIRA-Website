"use client";

import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import EisAtmosphere from "@/components/ui/eis/EisAtmosphere";
import type { EisPage } from "@/content/pages/solutions-eis";

/* The core executive questions from the CEO wireframe */
const CATEGORIES = ["PEOPLE & MARGIN", "CLOUD & FINOPS", "WHAT-IF FORECAST", "DECISION RUNWAY"];

const ART: Record<string, { inset: string; tilt: string }> = {
  "/universal-context/sap.svg": { inset: "inset-[34%_10%]", tilt: "-4deg" },
  "/universal-context/salesforce.svg": { inset: "inset-[30%_12%]", tilt: "4deg" },
  "/universal-context/oracle.svg": { inset: "inset-[40%_8%]", tilt: "-4deg" },
  "/universal-context/postgresql.svg": { inset: "inset-[18%]", tilt: "4deg" },
};
const DEFAULT_ART = { inset: "inset-[24%]", tilt: "0deg" };

export default function EisHero({
  content,
}: {
  content: EisPage["hero"];
  domains?: EisPage["domains"];
}) {
  const PROMPTS = content.prompts;
  const SOURCES = content.sources.map((source) => ({
    ...source,
    ...(ART[source.src] ?? DEFAULT_ART),
  }));
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const still = usePrefersReducedMotion();

  useEffect(() => {
    if (still) return;
    const target = PROMPTS[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && typed !== target) {
      timer = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 40);
    } else if (!deleting && typed === target) {
      timer = setTimeout(() => setDeleting(true), 2800);
    } else if (deleting && typed !== "") {
      timer = setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 18);
    } else {
      timer = setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % PROMPTS.length);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [typed, deleting, index, still, PROMPTS]);

  return (
    <section id="hero" className="relative overflow-hidden pb-16 pt-6 sm:pb-20 lg:pb-24">
      <EisAtmosphere variant="hero" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl pt-16 text-center sm:pt-24 lg:pt-28">
          {/* Status Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-lineSoft bg-background/90 px-4 py-1.5 shadow-sm backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-positive animate-pulse" aria-hidden="true" />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink">
              {content.badge}
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="font-heading text-[3rem] font-semibold leading-[0.94] tracking-tightest text-ink sm:text-[4.25rem] md:text-[5.25rem] lg:text-[6rem]">
            {content.title[0]}
            <br />
            <span className="text-inkSoft">{content.title[1]}</span>
          </h1>

          {/* High-tech Interactive Command / Ask Bar */}
          <div className="mt-10 w-full sm:mt-12">
            <div className="relative mx-auto flex w-full max-w-[740px] items-center gap-3 overflow-hidden rounded-full border border-line bg-background p-2 pl-4 shadow-sm transition-all duration-200 hover:border-blue sm:pl-5">
              <span className="flex-shrink-0 rounded-[5px] border border-blue-border bg-blue-subtle px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-blue">
                {CATEGORIES[index % CATEGORIES.length]}
              </span>
              <div className="flex min-w-0 flex-1 select-none items-center text-left text-sm tracking-tight text-ink sm:text-base">
                <span className="truncate">{still ? PROMPTS[0] : typed}</span>
                {!still && (
                  <span className="ml-0.5 inline-block h-[1.1em] w-[2px] shrink-0 animate-pulse bg-blue" />
                )}
              </div>
              <a
                href="#your-lens"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-background transition-transform duration-200 hover:scale-105 sm:h-11 sm:w-11"
                title="View live role cockpit"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
            <p className="mt-3 font-mono text-[11px] text-tertiary-text">
              Grounds every answer in ERPNext, Salesforce &amp; SAP · ERPNext live today · More connectors on roadmap
            </p>
          </div>

          {/* Subline with live connector logos */}
          <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-2 text-base text-secondary-text sm:text-lg">
            <span>{content.lede.lead}</span>
            <span>{content.lede.tail}</span>
            <span
              className="inline-flex items-center gap-1.5 align-middle"
              aria-label={`${content.readsLabel} ${SOURCES.map((s) => s.label).join(", ")}`}
            >
              {SOURCES.map((s) => (
                <span
                  key={s.label}
                  title={s.label}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-tile border border-lineSoft bg-background shadow-sm"
                >
                  <span className="relative block h-4 w-4">
                    <Image src={s.src} alt="" fill sizes="16px" className="object-contain" />
                  </span>
                </span>
              ))}
            </span>
          </div>

          {/* Call to action buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="#talk-to-our-team" className="btn-primary">
              {content.primary.label}
            </Link>
            <a
              href={content.secondary.href}
              className="inline-flex items-center gap-2 rounded-btn border border-default-stroke bg-background px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-primary-bg"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
              <span>{content.secondary.label}</span>
            </a>
          </div>

          {/* Executive Trust Badges */}
          <div className="mx-auto mt-14 max-w-4xl border-t border-lineSoft pt-8 sm:mt-16">
            <div className="grid grid-cols-2 gap-4 text-left sm:grid-cols-4 sm:gap-6">
              <div className="border-l border-lineSoft pl-4">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-positive" />
                  <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                    Zero Reporting Lag
                  </span>
                </div>
                <p className="mt-1 text-[13px] text-secondary-text">Live operating reality without 3-week reporting cycles</p>
              </div>
              <div className="border-l border-lineSoft pl-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  Unified Ground Truth
                </span>
                <p className="mt-1 text-[13px] text-secondary-text">CEO, CFO, and COO aligned on identical numbers</p>
              </div>
              <div className="border-l border-lineSoft pl-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  Early Risk Warning
                </span>
                <p className="mt-1 text-[13px] text-secondary-text">Margin and contract slippage detected 30 days early</p>
              </div>
              <div className="border-l border-lineSoft pl-4">
                <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-ink">
                  Governed Execution
                </span>
                <p className="mt-1 text-[13px] text-secondary-text">Human-authorized actions with immutable audit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
