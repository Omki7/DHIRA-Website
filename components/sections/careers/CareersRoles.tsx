"use client";

/*
 * [03] Open roles: the board.
 *
 * The same four seats the hero's seating plan leaves empty, now as rows:
 * one source (lib/careersRoles.ts) so the plan, this board and the homepage
 * JoinTheTeam board cannot drift apart. Each row carries the chair glyph
 * from the hero, which is what ties the drawing to the list.
 *
 * The department filter chips are gone: with four roles they hid up to three
 * of them behind a click and argued that the board was longer than it is.
 *
 * The whole row is the Apply target (a stretched link), not just the word.
 * Apply anchors to #talk-to-our-team, which opens the site contact dialog,
 * until an ATS or careers inbox is wired.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
import SectionCoda from "@/components/ui/SectionCoda";
import { ROLES } from "@/lib/careersRoles";

function ChairGlyph() {
  return (
    <svg viewBox="0 0 34 20" className="h-5 w-[34px] shrink-0" aria-hidden>
      <rect x="1" y="1" width="32" height="18" rx="5" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="1.4" />
    </svg>
  );
}

export default function CareersRoles() {
  return (
    <section
      id="open-roles"
      className="scroll-mt-24 bg-background pt-12 pb-20 lg:pt-16 lg:pb-24"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="Open roles"
          live={`${ROLES.length} seats open`}
          setup="Small team."
          payoff="Specific seats."
          lede="Hiring follows the mission, never the org chart. Each seat owns real scope."
        />

        <ol className="mt-10 border-t border-lineSoft lg:mt-12">
          {ROLES.map((role, idx) => (
            <li key={role.title} className="group relative border-b border-lineSoft transition-colors duration-150 hover:bg-blue-subtle/40">
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-200 ease-out group-hover:scale-y-100"
              />
              <ScrollReveal delay={60 + idx * 50}>
                <div className="grid grid-cols-1 gap-3 py-6 transition-[padding] duration-150 md:grid-cols-12 md:items-baseline md:gap-8 md:pl-5 md:group-hover:pl-6">
                  <div className="flex items-center gap-3 md:col-span-3">
                    <ChairGlyph />
                    <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">
                      {role.dept}
                    </span>
                  </div>
                  <div className="md:col-span-5">
                    <h3 className="text-[20px] font-semibold leading-snug tracking-tight text-ink">
                      {role.title}
                    </h3>
                    <p className="mt-1 text-pretty text-[15px] leading-relaxed text-inkSoft">{role.desc}</p>
                  </div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft md:col-span-3">
                    {role.location} &middot; {role.type}
                  </p>
                  <Link
                    href="#talk-to-our-team"
                    aria-label={`Apply for ${role.title}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue transition-colors duration-150 after:absolute after:inset-0 after:content-[''] group-hover:text-blue-hover focus-visible:outline-none focus-visible:after:rounded-tile focus-visible:after:ring-2 focus-visible:after:ring-blue md:col-span-1 md:justify-end"
                  >
                    Apply
                    <span aria-hidden className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      &#8599;
                    </span>
                  </Link>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ol>

        <ScrollReveal delay={180}>
          <SectionCoda lead="No perfect fit? Write anyway." payoff="Proof of work beats a perfect CV." />
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
