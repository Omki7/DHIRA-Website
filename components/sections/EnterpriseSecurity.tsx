/**
 * Section [08]: Governance — company trust, not product features.
 *
 * Layout modelled directly on Attio's "Run at any scale" section (studied via
 * screenshot, 21 Jul): a blue kicker pill, a two-tone headline (dark statement
 * + short gray line — NOT a paragraph), a 2x2 KPI grid with thin blue left
 * bars, and ONE elegant rising line whose area is filled with fine vertical
 * hairlines (the "minor texture").
 *
 * The chart is a FULL-BLEED background (not a right-hand column) — exactly like
 * Attio: the curve is calm on the left, where the headline + KPIs float over
 * it, and rises smoothly to a moderate exit at the top-right, bleeding off the
 * right edge. Curve is a genuine power curve (t^2.3) sampled to a smooth
 * polyline, so there is no flat-then-vertical "hockey-stick" kink. The texture
 * fills the whole area beneath it, full width.
 *
 * Content stays company-level (how DHIRA operates with your data); the product
 * policy engine lives on the Akashic page. The compliance frameworks are a
 * flat, integrated certification bar — monochrome marks on thin dividers, in
 * the page's own dashed/hairline language — not floating chips.
 */

"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* ─── Company governance posture (KPIs) ───────────────────────────────────── */
const KPIS = [
  { figure: "Zero", label: "keys or data we hold" },
  { figure: "100%", label: "in your own infrastructure" },
  { figure: "In-region", label: "data residency" },
  { figure: "Never", label: "used to train models" },
];

/* ─── Compliance frameworks ───────────────────────────────────────────────── */
const FRAMEWORKS = [
  { id: "dpdp",   label: "DPDP Act",      sub: "India data protection" },
  { id: "iso",    label: "ISO 27001",     sub: "Information security" },
  { id: "soc2",   label: "SOC 2 Type II", sub: "Trust & availability" },
  { id: "gdpr",   label: "GDPR",          sub: "EU data privacy" },
  { id: "certin", label: "CERT-In",       sub: "Cyber compliance" },
];

/* ─── Compliance icon ─────────────────────────────────────────────────────── */
function FrameworkIcon({ id, className = "h-8 w-8" }: { id: string; className?: string }) {
  if (id === "dpdp") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 20a6 6 0 0 1 6-6h2a6 6 0 0 1 0 12h-2a6 6 0 0 1-6-6Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
  if (id === "iso") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="20" y="17" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" fontWeight="600">ISO</text>
      <text x="20" y="27" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="currentColor">27001</text>
    </svg>
  );
  if (id === "soc2") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 21l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
  if (id === "gdpr") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="8"  r="2" fill="currentColor" />
      <circle cx="29" cy="11" r="1.4" fill="currentColor" opacity="0.4" />
      <circle cx="34" cy="20" r="2" fill="currentColor" />
      <circle cx="29" cy="29" r="1.4" fill="currentColor" opacity="0.4" />
      <circle cx="20" cy="32" r="2" fill="currentColor" />
      <circle cx="11" cy="29" r="1.4" fill="currentColor" opacity="0.4" />
      <circle cx="6"  cy="20" r="2" fill="currentColor" />
      <circle cx="11" cy="11" r="1.4" fill="currentColor" opacity="0.4" />
      <circle cx="20" cy="20" r="3.5" fill="currentColor" />
    </svg>
  );
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className}>
      <path d="M20 4 L34 11 L34 23 C34 30 27 35 20 38 C13 35 6 30 6 23 L6 11 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 21l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── The elegant rising line (Attio-style: line + fine vertical-hairline fill)
   A genuine power curve y = t^2.3 (calm on the left, gently accelerating to a
   moderate exit at top-right) sampled to a smooth polyline — no kink, no
   flat-then-vertical hockey stick. The area beneath is filled across the FULL
   width with fine vertical hairlines, so the texture reads as one calm field. */
const CW = 1440; // viewBox width (stretched to the container)
const CH = 480; // viewBox height
const BASE_Y = 452; // curve height at the left edge (near the base)
const TOP_Y = 22; // curve height at the right edge (near the top)
const POWER = 2.6; // >1 = calm start, gradual acceleration; ~Attio's slope
const SAMPLES = 220;
const N_LINES = 170;

const CURVE_D =
  "M " +
  Array.from({ length: SAMPLES + 1 }, (_, i) => {
    const t = i / SAMPLES;
    const x = t * CW;
    const y = BASE_Y - (BASE_Y - TOP_Y) * Math.pow(t, POWER);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" L ");
const AREA_D = `${CURVE_D} L ${CW} ${CH} L 0 ${CH} Z`;

function TrustLine({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${CW} ${CH}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="tl-area">
          <path d={AREA_D} />
        </clipPath>
      </defs>

      {/* fine vertical hairlines, revealed with a left-to-right wipe — the texture */}
      <g
        style={{
          clipPath: visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
          transition: visible ? "clip-path 2.4s cubic-bezier(0.2,0.8,0.2,1)" : "none",
        }}
      >
        <g clipPath="url(#tl-area)">
          {Array.from({ length: N_LINES + 1 }).map((_, i) => {
            const x = (i * CW) / N_LINES;
            return (
              <line
                key={i}
                x1={x}
                y1="0"
                x2={x}
                y2={CH}
                stroke="#C8D2F5"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className="opacity-60"
              />
            );
          })}
        </g>
      </g>

      {/* the line itself, drawn in (pathLength normalises the draw animation) */}
      <path
        d={CURVE_D}
        fill="none"
        stroke="#3E63DD"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        style={{
          strokeDasharray: "1 1",
          strokeDashoffset: visible ? 0 : 1,
          transition: visible ? "stroke-dashoffset 2.3s cubic-bezier(0.2,0.8,0.2,1)" : "none",
        }}
      />
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function EnterpriseSecurity() {
  const sectionRef = useRef<HTMLElement>(null);
  const [curveVisible, setCurveVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurveVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCurveVisible(true), 250);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="governance"
      ref={sectionRef}
      aria-labelledby="gov-h"
      className="relative overflow-hidden bg-white pt-12 pb-24 lg:pt-16 lg:pb-32"
    >
      <ScrollRevealRail>

        {/* Eyebrow */}
        <ScrollReveal>
          <div className="mb-12 flex items-center border-b border-t border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[08]</span>
              &nbsp;&nbsp;GOVERNANCE
            </span>
          </div>
        </ScrollReveal>

        {/* Full-bleed rising chart, with the header + KPIs floating over its
            calm left — the Attio arrangement. The chart bleeds off the right
            edge; the text never competes with the steep right-hand rise. */}
        <div className="relative pb-[168px] sm:min-h-[460px] sm:pb-[248px] lg:min-h-[560px] lg:pb-20">
          {/* The chart bleeds to the right viewport edge. On desktop it is a
              full-bleed layer behind the (left-only) content; on narrow screens
              the content spans full width, so the chart drops to a rising band
              BELOW it — the curve never crosses the numbers. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 -mr-4 h-[150px] sm:-mr-6 sm:h-[220px] lg:top-0 lg:-mr-8 lg:h-auto"
          >
            <TrustLine visible={curveVisible} />
          </div>

          <ScrollReveal delay={60} className="relative z-10">
            <div className="max-w-[540px]">
              <span className="inline-flex items-center rounded-full bg-blue-subtle px-3 py-1 text-[13px] font-medium text-blue">
                Built for trust
              </span>

              <h2
                id="gov-h"
                className="mt-6 text-[38px] font-semibold leading-[1.08] tracking-tighter sm:text-[44px] lg:text-[52px]"
              >
                <span className="block text-ink">Trusted at any scale.</span>
                <span className="block text-inkSoft">Enterprise governance, inside your walls.</span>
              </h2>

              <div className="mt-11 grid grid-cols-2 gap-x-10 gap-y-9">
                {KPIS.map((k) => (
                  <div key={k.label} className="border-l-2 border-blue pl-4">
                    <div className="text-[30px] font-semibold leading-none tracking-tight text-ink lg:text-[36px]">
                      {k.figure}
                    </div>
                    <div className="mt-2.5 text-[14px] leading-snug text-inkSoft">
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Certification bar — flat, integrated, in the page's own dashed /
            hairline language. Monochrome marks on thin dividers, not chips. */}
        <ScrollReveal delay={220}>
          <div className="border-t border-dashed border-lineSoft pt-9">
            <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-10">
              <p className="shrink-0 text-[14px] font-medium text-inkSoft">
                Independently certified
              </p>

              <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-3 lg:grid-cols-5 lg:gap-x-0">
                {FRAMEWORKS.map((fw, i) => (
                  <div
                    key={fw.id}
                    className={`flex items-center gap-3 lg:justify-center lg:px-5 ${
                      i > 0 ? "lg:border-l lg:border-lineSoft" : ""
                    }`}
                  >
                    <FrameworkIcon id={fw.id} className="h-7 w-7 shrink-0 text-inkSoft" />
                    <div className="leading-tight">
                      <div className="text-[13px] font-semibold text-ink">{fw.label}</div>
                      <div className="mt-0.5 text-[11.5px] text-overcast">{fw.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>

      </ScrollRevealRail>
    </section>
  );
}
