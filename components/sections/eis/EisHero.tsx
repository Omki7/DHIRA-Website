"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EisAtmosphere from "@/components/ui/eis/EisAtmosphere";
import EisPill from "@/components/ui/eis/EisPill";
import EisBrowserChromeMockup from "@/components/demos/mockups/EisBrowserChromeMockup";
import EisBriefScreenMockup from "@/components/demos/mockups/eis/EisBriefScreenMockup";
import { DOMAINS } from "@/lib/eisDomains";

/* The questions an executive actually opens EIS with. Deliberately drawn from
   four different industries rather than four flavours of the same one: a
   plant director and a retail COO must both see themselves in the first
   thing that types itself on this page. */
const PROMPTS = [
  "Which plant stops production first, and why?",
  "Where will we run out of stock before peak?",
  "Which portfolio is closest to breaching its limit?",
  "What could take the firm down this quarter?",
];

/* The systems EIS reads. Shown as overlapping tiles at the end of the
   subline, so the claim "read live from" lands on named software rather
   than on the word "integrations". */
/* `inset` is per-logo because these marks are not one aspect ratio: SAP and
   Oracle are wide wordmarks that need horizontal room, PostgreSQL is a tall
   glyph. A single inset makes the wide ones microscopic. */
const SOURCES = [
  { src: "/universal-context/sap.svg", label: "SAP", inset: "inset-[34%_10%]", tilt: "-4deg" },
  { src: "/universal-context/salesforce.svg", label: "Salesforce", inset: "inset-[30%_12%]", tilt: "4deg" },
  { src: "/universal-context/oracle.svg", label: "Oracle", inset: "inset-[40%_8%]", tilt: "-4deg" },
  { src: "/universal-context/postgresql.svg", label: "PostgreSQL", inset: "inset-[18%]", tilt: "4deg" },
];

export default function EisHero() {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [still, setStill] = useState(false);
  /* The industry switcher. It is a page control rather than an app control:
     one deployment reads one organisation. What it demonstrates is that the
     pillars, the systems, the signal and the action are all industry-shaped,
     which is the thing a plant director cannot tell from a screenshot of an
     IT services firm. */
  const [domainKey, setDomainKey] = useState(DOMAINS[0].key);
  const domain = DOMAINS.find((d) => d.key === domainKey) ?? DOMAINS[0];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStill(true);
      setTyped(PROMPTS[0]);
    }
  }, []);

  useEffect(() => {
    if (still) return;
    const target = PROMPTS[index];
    let timer: ReturnType<typeof setTimeout>;

    if (!deleting && typed !== target) {
      timer = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 42);
    } else if (!deleting && typed === target) {
      timer = setTimeout(() => setDeleting(true), 2600);
    } else if (deleting && typed !== "") {
      timer = setTimeout(() => setTyped(target.slice(0, typed.length - 1)), 18);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % PROMPTS.length);
    }
    return () => clearTimeout(timer);
  }, [typed, deleting, index, still]);

  return (
    <section id="hero" className="relative overflow-hidden pb-0">
      <EisAtmosphere variant="hero" />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 pb-14 pt-20 sm:pt-28 lg:pb-16">
        <div className="mx-auto max-w-5xl text-center">
          {/* Caps at 6.75rem rather than the reference's 7.5rem: "Your whole
              business." is four syllables longer than the line this is
              modelled on and overruns the 1440 container at that size. */}
          <h1 className="font-heading text-[3.25rem] font-normal leading-[0.92] tracking-tighter text-white sm:text-[4.5rem] md:text-[5.75rem] lg:text-[6.75rem]">
            Your whole business.
            <br />
            Answering for itself.
          </h1>

          {/* The ask bar. Presentational: it demonstrates the input, it does
              not accept one, so it is not a form control. */}
          <div className="mt-8 w-full lg:mt-10">
            <div className="relative mx-auto flex w-full max-w-[700px] items-center overflow-hidden rounded-full border border-white/20 bg-white/10 p-1.5 pl-5 backdrop-blur-md lg:p-2 lg:pl-6">
              <div className="flex min-w-0 flex-1 select-none items-center text-left text-sm tracking-tight text-white lg:text-base">
                <span className="truncate">{typed}</span>
                {!still && (
                  <span className="ml-0.5 inline-block h-[1.1em] w-[2px] shrink-0 animate-pulse bg-white/80" />
                )}
              </div>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-eis-ink lg:h-12 lg:w-12">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 19V5m0 0l-6 6m6-6l6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-2xl text-xl leading-tight tracking-[-0.01em] text-white/80 sm:text-2xl">
            Intelligence and action for whatever you run,
            <br className="hidden sm:block" /> read live from
            <span
              className="relative -top-[1.5px] ml-2 inline-flex items-center align-middle"
              aria-label={`Reads ${SOURCES.map((s) => s.label).join(", ")}`}
            >
              {SOURCES.map((s, i) => (
                <span
                  key={s.label}
                  title={s.label}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-tile bg-white ring-1 ring-black/5"
                  style={{
                    marginLeft: i === 0 ? 0 : -4,
                    zIndex: SOURCES.length - i,
                    transform: `rotate(${s.tilt})`,
                  }}
                >
                  <span className="relative block h-full w-full">
                    <span className={`absolute ${s.inset}`}>
                      <Image src={s.src} alt="" fill sizes="20px" className="object-contain" />
                    </span>
                  </span>
                </span>
              ))}
            </span>
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <EisPill href="#talk-to-our-team">See it with your own data</EisPill>
            <EisPill href="#the-loop" tone="ghost">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                <path d="M15.74 10.7c-.29 1.13-1.69 1.92-4.47 3.5-2.69 1.53-4.04 2.29-5.12 1.99a2.6 2.6 0 01-1.19-.71c-.79-.8-.79-2.36-.79-5.48s0-4.68.8-5.48c.32-.34.73-.58 1.18-.7 1.08-.31 2.43.45 5.12 1.98 2.78 1.58 4.18 2.37 4.47 3.49.12.46.12.95 0 1.41z" />
              </svg>
              How the loop closes
            </EisPill>
          </div>
        </div>

        {/* Industry switcher. Sits between the promise and the product,
            because the product below only means something once you have said
            which world it is running in. */}
        <div className="mt-10 flex justify-center lg:mt-12">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-white/25 bg-white/15 p-1 backdrop-blur-md">
            {DOMAINS.map((d) => (
              <button
                key={d.key}
                type="button"
                onClick={() => setDomainKey(d.key)}
                aria-pressed={d.key === domainKey}
                className={`rounded-full px-3.5 py-2 text-[13px] font-medium transition-colors duration-250 sm:px-4 ${
                  d.key === domainKey
                    ? "bg-white text-eis-ink"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {d.tab}
              </button>
            ))}
          </div>
        </div>

        {/* The product, floating on the ground rather than framed by it. The
            glass wrapper is what stops the chrome from cutting a hard
            rectangle out of the sky.
            Everything inside is driven from the selected industry: the pillar
            tiles, the source systems, the converged signal and the action all
            change together, because that is the claim. */}
        <div className="relative mx-auto mt-6 w-full max-w-5xl overflow-hidden rounded-xl border border-white/20 bg-white/15 p-2 backdrop-blur-md">
          <EisBrowserChromeMockup url="akashic.dhira.ai/eis">
            <EisBriefScreenMockup key={domain.key} domain={domain} />
          </EisBrowserChromeMockup>
        </div>
      </div>
    </section>
  );
}
