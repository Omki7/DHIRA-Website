/**
 * Section [08]: Governance — Enterprise-grade, by design.
 *
 * Inspired by Attio's scale+compliance section. Two visual zones:
 *   Upper: Bold headline + 4-stat grid (left) + animated trust-coverage
 *          curve SVG (right) — no card boxes, gap-as-divider pattern.
 *   Lower: "Enterprise-ready" compliance strip with framework badges.
 *
 * Audience: General executive (what it means) + CISO (how it works).
 * No invented certifications (Rule 4). bg-white (Rule 5). No checkmarks (Rule 2).
 * Animations respect prefers-reduced-motion (Rule 6).
 */

"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";

/* ─── Stats ──────────────────────────────────────────────────────────────── */
const STATS = [
  {
    figure: "100%",
    label: "Policy coverage",
    sub: "Every BI query, AI answer, and ML output obeys the same rules.",
  },
  {
    figure: "<2 ms",
    label: "Access-decision latency",
    sub: "Enforcement at the graph layer. No separate permission gateway.",
  },
  {
    figure: "Zero",
    label: "Key custody by DHIRA",
    sub: "Akashic runs inside your cloud boundary. We hold no encryption keys.",
  },
  {
    figure: "Always",
    label: "Immutable audit trail",
    sub: "Every query is stamped, sealed, and traceable to its source dataset.",
  },
];

/* ─── Compliance frameworks ───────────────────────────────────────────────── */
const FRAMEWORKS = [
  { id: "dpdp",   label: "DPDP Act",      sub: "India Data Protection" },
  { id: "iso",    label: "ISO 27001",      sub: "Information Security" },
  { id: "soc2",   label: "SOC 2 Type II",  sub: "Trust & Availability" },
  { id: "gdpr",   label: "GDPR",           sub: "EU Data Privacy" },
  { id: "certin", label: "CERT-In",        sub: "Cyber Compliance" },
];

/* ─── Compliance icon ─────────────────────────────────────────────────────── */
function FrameworkIcon({ id }: { id: string }) {
  if (id === "dpdp") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8">
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 20a6 6 0 0 1 6-6h2a6 6 0 0 1 0 12h-2a6 6 0 0 1-6-6Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="2" fill="currentColor" />
    </svg>
  );
  if (id === "iso") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8">
      <rect x="4" y="4" width="32" height="32" rx="4" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <text x="20" y="17" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="currentColor" fontWeight="600">ISO</text>
      <text x="20" y="27" textAnchor="middle" fontSize="6.5" fontFamily="monospace" fill="currentColor">27001</text>
    </svg>
  );
  if (id === "soc2") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8">
      <polygon points="20,4 36,13 36,27 20,36 4,27 4,13" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 21l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
  if (id === "gdpr") return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8">
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
    <svg viewBox="0 0 40 40" aria-hidden="true" className="h-8 w-8">
      <path d="M20 4 L34 11 L34 23 C34 30 27 35 20 38 C13 35 6 30 6 23 L6 11 Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 21l4 4 8-8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* ─── Animated trust-coverage curve ──────────────────────────────────────── */
function TrustCurve({ visible }: { visible: boolean }) {
  const pathD =
    "M 0 260 C 60 255, 120 240, 180 210 C 240 178, 290 148, 340 108 C 380 78, 420 52, 480 20";

  return (
    <svg
      viewBox="0 0 480 280"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <linearGradient id="trustGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#3E63DD" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Vertical grid lines */}
      {[80, 160, 240, 320, 400].map((x) => (
        <line
          key={x}
          x1={x} y1={0} x2={x} y2={280}
          stroke="#E4E7EC"
          strokeWidth="1"
          strokeDasharray="3 5"
        />
      ))}

      {/* Area fill */}
      <path
        d={`${pathD} L 480 280 L 0 280 Z`}
        fill="url(#trustGrad)"
        style={{
          clipPath: visible ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition: visible ? "clip-path 2.2s cubic-bezier(0.2,0.8,0.2,1)" : "none",
        }}
      />

      {/* Main curve stroke */}
      <path
        d={pathD}
        fill="none"
        stroke="rgba(62,99,221,0.5)"
        strokeWidth="1.8"
        strokeLinecap="round"
        style={{
          strokeDasharray: 700,
          strokeDashoffset: visible ? 0 : 700,
          transition: visible ? "stroke-dashoffset 2s cubic-bezier(0.2,0.8,0.2,1)" : "none",
        }}
      />

      {/* Glowing endpoint dot */}
      {visible && (
        <circle cx="480" cy="20" r="3.5" fill="rgba(62,99,221,0.5)">
          <animate attributeName="opacity" values="1;0.4;1" dur="2.4s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}

/* ─── Component ───────────────────────────────────────────────────────────── */
export default function EnterpriseSecurity() {
  const sectionRef = useRef<HTMLDivElement>(null);
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
          setTimeout(() => setCurveVisible(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="governance"
      ref={sectionRef}
      aria-labelledby="gov-h"
      className="overflow-hidden bg-white py-32 lg:py-40"
    >
      <ScrollRevealRail>

        {/* Eyebrow */}
        <ScrollReveal>
          <div className="mb-10 flex items-center justify-between border-b border-t border-dashed border-lineSoft py-[17px] px-[2px] font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <span>
              <span className="text-overcast">[08]</span>
              &nbsp;&nbsp;GOVERNANCE
            </span>
            <span className="text-overcast">/ ENTERPRISE TRUST</span>
          </div>
        </ScrollReveal>

        {/* Upper zone: headline + stats (left) + curve (right) */}
        <div className="relative grid grid-cols-1 gap-0 lg:grid-cols-2">

          {/* LEFT: Headline + stat grid */}
          <ScrollReveal delay={60}>
            <div className="pb-12 pr-0 lg:pb-0 lg:pr-16">

              <h2
                id="gov-h"
                className="text-balance text-[40px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[48px] lg:text-[64px]"
              >
                Governed at the source.
              </h2>
              <p className="mt-4 max-w-[28em] text-xl leading-relaxed text-inkSoft">
                The controls your board asks about are built into the platform itself.
              </p>

              {/* Vertical stat sequence */}
              <div className="mt-10 flex flex-col divide-y divide-lineSoft">
                {STATS.map((s) => (
                  <div key={s.label} className="py-6 pr-6">
                    <div className="text-[32px] font-semibold leading-none tracking-tight tabular-nums text-ink lg:text-[38px]">
                      {s.figure}
                    </div>
                    <div className="mt-1.5 text-[13px] font-medium text-inkSoft">
                      {s.label}
                    </div>
                    <p className="mt-2 text-[13px] leading-relaxed text-overcast">
                      {s.sub}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* RIGHT: Trust-coverage curve */}
          <ScrollReveal delay={180}>
            <div className="relative h-[320px] w-full overflow-hidden border-l border-lineSoft lg:h-full lg:min-h-[340px]">
              <TrustCurve visible={curveVisible} />

              {/* Top label */}
              <div
                className="absolute right-4 top-5 text-right font-mono text-[10px] uppercase tracking-eyebrow text-overcast"
                style={{
                  opacity: curveVisible ? 1 : 0,
                  transition: "opacity 0.8s ease 1.8s",
                }}
              >
                Trust Coverage
              </div>

              {/* Curve-end annotation */}
              <div
                className="absolute right-5 top-8 rounded-[6px] border border-blue-border bg-blue-subtle px-3 py-1.5"
                style={{
                  opacity: curveVisible ? 1 : 0,
                  transform: curveVisible ? "translateY(0)" : "translateY(8px)",
                  transition: "opacity 0.6s ease 2s, transform 0.6s ease 2s",
                }}
              >
                <span className="font-mono text-[10px] uppercase tracking-eyebrow text-blue">
                  Full coverage
                </span>
              </div>

              {/* Bottom label */}
              <div
                className="absolute bottom-4 right-4 font-mono text-[10px] uppercase tracking-eyebrow text-overcast"
                style={{
                  opacity: curveVisible ? 1 : 0,
                  transition: "opacity 0.8s ease 1.8s",
                }}
              >
                Time in production
              </div>
            </div>
          </ScrollReveal>

        </div>

        {/* Lower zone: compliance strip */}
        <ScrollReveal delay={280}>
          <div className="mt-12 overflow-hidden border border-lineSoft">
            <div className="flex flex-col divide-y divide-lineSoft lg:flex-row lg:divide-x lg:divide-y-0">

              {/* Text block */}
              <div className="flex-shrink-0 p-8 lg:w-72">
                <p className="text-base font-semibold leading-snug text-ink">
                  Enterprise-ready, by design.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-inkSoft">
                  Akashic satisfies the compliance frameworks your legal, security,
                  and procurement teams require, without bespoke integrations.
                </p>
              </div>

              {/* Framework badges */}
              {FRAMEWORKS.map((fw) => (
                <div
                  key={fw.id}
                  className="flex flex-1 flex-row items-center gap-4 p-6 lg:flex-col lg:items-center lg:justify-center lg:gap-3 lg:p-8"
                >
                  <div className="text-inkSoft">
                    <FrameworkIcon id={fw.id} />
                  </div>
                  <div className="lg:text-center">
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-eyebrow text-ink">
                      {fw.label}
                    </div>
                    <div className="mt-0.5 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      {fw.sub}
                    </div>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </ScrollReveal>

        {/* Footer note */}
        <ScrollReveal delay={360}>
          <p className="mt-8 text-sm leading-relaxed text-overcast">
            <span className="font-medium text-inkSoft">
              Governance is not a feature you add later.
            </span>{" "}
            It is the architecture Akashic starts with: policy enforced at the knowledge graph,
            provenance on every output, deployed inside your own infrastructure boundary.
          </p>
        </ScrollReveal>

      </ScrollRevealRail>
    </section>
  );
}
