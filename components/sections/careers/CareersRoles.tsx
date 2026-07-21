"use client";

/*
 * [03] Open Roles — The Board.
 * The canonical roles board (same four roles and dept filters as the home
 * page's JoinTheTeam section, same blue-bar hover signature). Apply anchors
 * to the close section until an ATS or careers inbox is wired.
 */

import Link from "next/link";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const DEPT_FILTERS = ["View all", "Engineering", "Machine Learning", "Product", "Delivery"] as const;
type Dept = (typeof DEPT_FILTERS)[number];

const ROLES: { dept: Dept; title: string; desc: string; location: string; type: string }[] = [
  {
    dept: "Engineering",
    title: "Senior Data Engineer",
    desc: "Build and scale government data pipelines.",
    location: "Remote",
    type: "Full-time",
  },
  {
    dept: "Machine Learning",
    title: "ML Researcher, Grounding Systems",
    desc: "Advance grounding and retrieval systems for public-sector AI.",
    location: "Hyderabad",
    type: "Full-time",
  },
  {
    dept: "Product",
    title: "Product Manager, Akashic Platform",
    desc: "Own the roadmap for our flagship intelligence platform.",
    location: "New York",
    type: "Full-time",
  },
  {
    dept: "Delivery",
    title: "Implementation Lead, Government",
    desc: "Guide large-scale government deployments end to end.",
    location: "Remote",
    type: "Full-time",
  },
];

export default function CareersRoles() {
  const [activeFilter, setActiveFilter] = useState<Dept>("View all");
  const visibleRoles =
    activeFilter === "View all" ? ROLES : ROLES.filter((role) => role.dept === activeFilter);

  return (
    <section id="open-roles" className="scroll-mt-24 border-t border-lineSoft bg-background">
      <div className="rail-container pt-12 pb-24 lg:pt-16 lg:pb-32">
        <ScrollReveal>
          <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-eyebrow">
            <p>
              <span className="text-overcast">[03]</span>
              <span className="text-inkSoft">&nbsp;&nbsp;Open roles</span>
            </p>
            <span className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span
                  className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-50"
                  style={{ animationDuration: "2.4s" }}
                />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
              </span>
              <span className="text-[11px] font-medium tracking-eyebrow text-blue">NOW HIRING</span>
            </span>
          </div>
          <h2 className="mt-5 text-heading-sm font-semibold text-ink md:text-heading-md lg:text-heading-lg">
            The team is small. The openings are specific.
          </h2>
          <p className="mt-5 max-w-[36em] text-lg leading-relaxed text-secondary-text">
            We hire when a mission needs a person, not to fill an org chart. Each
            of these roles ships to production systems from the start.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-2">
            {DEPT_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={[
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-150",
                  activeFilter === filter
                    ? "bg-ink text-white shadow-sm"
                    : "border border-line bg-white/70 text-inkSoft hover:border-ink/30 hover:text-ink",
                ].join(" ")}
              >
                {filter}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={140}>
          <div className="mt-5 border-t border-lineSoft">
            {visibleRoles.map((role) => (
              <div key={role.title} className="group relative border-b border-lineSoft">
                <div
                  aria-hidden
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-blue transition-transform duration-200 ease-out group-hover:scale-y-100"
                />
                <div className="flex items-start justify-between gap-4 py-6 pl-5 pr-1 transition-[padding] duration-150 group-hover:pl-6">
                  <div className="min-w-0">
                    <span className="mb-1.5 inline-block font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
                      {role.dept}
                    </span>
                    <p className="text-[16px] font-semibold leading-snug text-ink md:text-[17px]">
                      {role.title}
                    </p>
                    <p className="mt-1 max-w-[44em] text-sm leading-relaxed text-inkSoft">{role.desc}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="flex items-center gap-1.5 rounded-full border border-lineSoft bg-white px-3 py-1 text-xs text-inkSoft">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M6 1a3.5 3.5 0 0 1 3.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 0 1 6 1Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
                          <circle cx="6" cy="4.5" r="1" fill="currentColor" />
                        </svg>
                        {role.location}
                      </span>
                      <span className="flex items-center gap-1.5 rounded-full border border-lineSoft bg-white px-3 py-1 text-xs text-inkSoft">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1" />
                          <path d="M6 3.5V6l1.5 1.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {role.type}
                      </span>
                    </div>
                  </div>
                  <Link
                    href="#talk-to-our-team"
                    className="mt-1 flex-shrink-0 text-sm font-semibold text-overcast transition-colors duration-150 group-hover:text-ink"
                  >
                    <span className="flex items-center gap-0.5">
                      Apply
                      <span className="inline-block transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                        &#8599;
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={180}>
          <p className="mt-8 font-mono text-[10px] uppercase tracking-eyebrow text-overcast">
            No perfect fit? Write to us anyway &middot; proof of work beats a perfect CV
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
