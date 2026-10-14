"use client";

import { useId } from "react";
import { ABOUT_HERO } from "@/lib/aboutSections";

const SOURCES = [108, 244, 380];
const LANES = Array.from({ length: 12 }, (_, index) => {
  const group = Math.floor(index / 4);
  const sourceY = SOURCES[group] + (index % 4 - 1.5) * 12;
  const laneY = 244 + (index - 5.5) * 7;
  return { group, sourceY, laneY, path: `M82 ${sourceY}H135C208 ${sourceY} 202 ${laneY} 282 ${laneY}H486` };
});

export default function DecisionTrace() {
  const uid = useId();
  return (
    <figure className="mx-auto w-full max-w-[600px]">
      <div className="relative">
        <svg viewBox="0 0 560 480" className="w-full" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
          <title id={`${uid}-title`}>From your records to decisions</title>
          <desc id={`${uid}-desc`}>Records, documents and streams connect through one governed foundation. A blue line traces a decision back to its original record. Lines are illustrative, not measured data.</desc>
          <g fill="none" stroke="#E4E7EC" strokeWidth="1">
            <path d="M32 38h14m-7-7v14M514 38h14m-7-7v14M32 442h14m-7-7v14M514 442h14m-7-7v14" />
          </g>
          {SOURCES.map((y, group) => (
            <g key={y}>
              <text x="64" y={y - 36} className="fill-secondary-text font-mono text-[11px] uppercase tracking-[0.08em]">{ABOUT_HERO.visual.sources[group]}</text>
              <path d={`M64 ${y - 22}v44M59 ${y - 22}h10M59 ${y + 22}h10`} fill="none" stroke="#9DA7B4" strokeWidth="1" />
            </g>
          ))}
          {LANES.map((lane, index) => (
            <g key={index}>
              <path d={lane.path} fill="none" stroke="#727F91" strokeWidth="1" />
              <circle cx="82" cy={lane.sourceY} r="2.3" fill="#FFFFFF" stroke="#727F91" strokeWidth="1" />
            </g>
          ))}
          <path d="M304 186v-34h36M304 302v55h36" fill="none" stroke="#A4ADBA" strokeWidth="1" />
          <text x="349" y="156" className="fill-secondary-text font-mono text-[10px] uppercase tracking-[0.08em]">Governed</text>
          <text x="349" y="361" className="fill-secondary-text font-mono text-[10px] uppercase tracking-[0.08em]">Traceable</text>
          <rect x="298" y="194" width="12" height="100" rx="6" fill="#FFFFFF" stroke="#354258" strokeWidth="1.2" />
          <path d="M486 194v100m-5-100h10m-10 100h10" fill="none" stroke="#3E63DD" strokeWidth="1.2" />
          <text x="486" y="177" textAnchor="middle" className="fill-ink font-heading text-[18px] font-medium">{ABOUT_HERO.visual.outcome}</text>
          <path d={LANES[2].path} fill="none" stroke="#3E63DD" strokeWidth="1.8" />
          <circle cx="82" cy={LANES[2].sourceY} r="3" fill="#3E63DD" />
          <circle cx="486" cy={LANES[2].laneY} r="3.5" fill="#3E63DD" />
          <text x="316" y="419" textAnchor="middle" className="fill-secondary-text font-sans text-[13px]">{ABOUT_HERO.visual.foundation}</text>
          <path d="M282 390h68" stroke="#D3D8DF" strokeWidth="1" />
        </svg>
      </div>
      <figcaption className="mx-5 border-t border-lineSoft pt-4 text-center text-[12px] leading-relaxed text-secondary-text sm:mx-8">{ABOUT_HERO.visual.caption}</figcaption>
    </figure>
  );
}

