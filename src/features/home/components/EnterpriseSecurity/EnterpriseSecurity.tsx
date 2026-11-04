/**
 * Section [09]: Governance — company trust, not product features.
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
 * the page's own dashed/hairline language — not floating chips. Certifications
 * and the laws followed are separate groups (UX review, 23 Oct 2026).
 */

"use client";

import { useEffect, useRef, useState } from "react";
import type { HomeGovernance } from "@/content/pages/home";
import { FigureEyebrow, ScrollReveal, ScrollRevealRail, TwoToneTitle } from "@/shared/components/ui";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { cx } from "@/shared/utils/cx";
import styles from "./EnterpriseSecurity.module.scss";

/* The KPIs and frameworks are content (content/pages/home.ts governance).
   Each framework's `id` picks its mark below. */

/* ─── Compliance icon ─────────────────────────────────────────────────────── */
function FrameworkIcon({ id, className = styles.frameworkIcon }: { id: string; className?: string }) {
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
      className={styles.trustLine}
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
                stroke="rgb(var(--blue-border))"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className={styles.hairline}
              />
            );
          })}
        </g>
      </g>

      {/* the line itself, drawn in (pathLength normalises the draw animation) */}
      <path
        d={CURVE_D}
        fill="none"
        stroke="rgb(var(--blue))"
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
export interface EnterpriseSecurityProps {
  content: HomeGovernance;
}

export function EnterpriseSecurity({ content }: EnterpriseSecurityProps) {
  const { kpis: KPIS, frameworkGroups: GROUPS } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [curveSeen, setCurveSeen] = useState(false);
  const curveVisible = reduced || curveSeen;

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setCurveSeen(true), 250);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <section
      id="governance"
      ref={sectionRef}
      className={styles.section}
    >
      <ScrollRevealRail>

        {/* The site's one eyebrow (ui/FigureEyebrow). The title sits in the
            chart's calm left, so this section composes the header parts
            itself instead of using ui/SectionHeader. */}
        <ScrollReveal>
          <FigureEyebrow num={content.eyebrow.number} label={content.eyebrow.label} />
        </ScrollReveal>

        {/* Full-bleed rising chart, with the header + KPIs floating over its
            calm left — the Attio arrangement. The chart bleeds off the right
            edge; the text never competes with the steep right-hand rise. */}
        <div className={styles.stage}>
          {/* The chart bleeds to the right viewport edge. On desktop it is a
              full-bleed layer behind the (left-only) content; on narrow screens
              the content spans full width, so the chart drops to a rising band
              BELOW it — the curve never crosses the numbers. */}
          <div
            aria-hidden="true"
            className={styles.chart}
          >
            <TrustLine visible={curveVisible} />
          </div>

          <ScrollReveal delay={60} className={styles.copyReveal}>
            <div className={styles.copy}>
              {/* The "Built for trust" pill that sat above the headline was a
                  second eyebrow; removed 20 Oct 2026. */}
              <TwoToneTitle setup={content.title.setup} payoff={content.title.payoff} className={styles.title} />

              <div className={styles.kpis}>
                {KPIS.map((k) => (
                  <div key={k.label} className={styles.kpi}>
                    <div className={styles.kpiFigure}>
                      {k.figure}
                    </div>
                    <div className={styles.kpiLabel}>
                      {k.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Certification bar — flat, integrated, in the page's own dashed /
            hairline language. Monochrome marks on thin dividers, not chips.
            Certifications and the laws followed are two labelled groups. */}
        <ScrollReveal delay={220}>
          <div className={styles.certifications}>
            {GROUPS.map((group, g) => (
              <div
                key={group.label}
                style={{ flexGrow: group.items.length, flexBasis: 0 }}
                className={g > 0 ? styles.groupFollowing : styles.groupFirst}
              >
                <p className={styles.groupLabel}>{group.label}</p>
                <div className={styles.frameworks}>
                  {group.items.map((fw, i) => (
                    <div
                      key={fw.id}
                      className={cx(styles.framework, i > 0 && styles.frameworkFollowing)}
                    >
                      <FrameworkIcon id={fw.id} className={styles.frameworkMark} />
                      <div className={styles.frameworkText}>
                        <div className={styles.frameworkLabel}>{fw.label}</div>
                        <div className={styles.frameworkSub}>{fw.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </ScrollRevealRail>
    </section>
  );
}
