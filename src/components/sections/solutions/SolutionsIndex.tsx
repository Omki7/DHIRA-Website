/*
 * [03] By industry & [04] By function: two dedicated registers. Each line names
 * the solutions that fit it, linked to their row above or their own page.
 * Function rows carry the ids the nav's "By function" links target
 * (#function-<slug>). The page's one soft blue band (Rule 5a).
 */

import Link from "next/link";
import { ScrollReveal } from "@/shared/components/ui";
import { ScrollRevealRail } from "@/shared/components/ui";
import { SectionHeader } from "@/shared/components/ui";
import type { IndexRow, SolutionsPage } from "@/content/pages/solutions";

type SolutionLinks = Record<string, { name: string; href: string }>;

function Register({ id, title, rows, links }: { id: string; title: string; rows: IndexRow[]; links: SolutionLinks }) {
  return (
    <div id={id} className="scroll-mt-24">
      <p className="border-b border-lineSoft pb-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{title}</p>
      <ul>
        {rows.map((row) => (
          <li
            key={row.label}
            id={row.id}
            className="grid scroll-mt-28 gap-1.5 border-b border-lineSoft py-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6 target:bg-blue/10 target:px-3 target:rounded-card transition-all duration-300"
          >
            {row.href ? (
              <Link
                href={row.href}
                className="group inline-flex items-center gap-1.5 self-start text-[16px] font-semibold text-ink transition-colors duration-150 hover:text-blue"
              >
                {row.label}
                <span aria-hidden className="text-overcast transition-transform duration-200 ease-settle group-hover:translate-x-0.5 group-hover:text-blue">
                  &rarr;
                </span>
              </Link>
            ) : (
              <span className="text-[16px] font-semibold text-ink">{row.label}</span>
            )}
            <span className="flex flex-wrap gap-x-5 gap-y-1.5">
              {row.solutions.map((solutionId) => {
                const solution = links[solutionId];
                if (!solution) return null;
                return (
                  <Link
                    key={solutionId}
                    href={solution.href}
                    className="text-[15px] text-secondary-text underline decoration-line underline-offset-4 transition-colors duration-150 hover:text-blue hover:decoration-blue"
                  >
                    {solution.name}
                  </Link>
                );
              })}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Every solution by id: featured ones link to their page, the rest to their card here. */
function solutionLinks(featured: SolutionsPage["featured"]["items"], more: SolutionsPage["more"]["items"]): SolutionLinks {
  return Object.fromEntries([
    ...featured.map((s) => [s.id, { name: s.name, href: s.href.startsWith("/") ? s.href : `#${s.id}` }]),
    ...more.map((s) => [s.id, { name: s.name, href: `#${s.id}` }]),
  ]);
}

export default function SolutionsIndex({
  content,
  featured,
  more,
}: {
  content: SolutionsPage["index"];
  featured: SolutionsPage["featured"]["items"];
  more: SolutionsPage["more"]["items"];
}) {
  const links = solutionLinks(featured, more);
  return (
    <>
      <section
        id="industries"
        className="scroll-mt-24 bg-band pb-16 pt-16 lg:pb-20 lg:pt-20"
      >
        <ScrollRevealRail>
          <SectionHeader
            num="03"
            label="By industry"
            setup="Find your starting point."
            payoff="By the sector you serve."
            lede="Each line names the solutions that fit your industry, so the first conversation starts from your domain."
          />

          <ScrollReveal delay={80}>
            <div className="mt-12 max-w-4xl lg:mt-16">
              <Register id="industry-list" title={content.industryTitle} rows={content.industries} links={links} />
            </div>
          </ScrollReveal>
        </ScrollRevealRail>
      </section>

      <section
        id="functions"
        className="scroll-mt-24 border-t border-lineSoft bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
      >
        <ScrollRevealRail>
          <SectionHeader
            num="04"
            label="By function"
            setup="Or by the team you lead."
            payoff="Configured for the outcome."
            lede="Akashic configured around each business function, with shared data, governance and lineage."
          />

          <ScrollReveal delay={80}>
            <div className="mt-12 max-w-4xl lg:mt-16">
              <Register id="function-list" title={content.functionTitle} rows={content.functions} links={links} />
            </div>
          </ScrollReveal>
        </ScrollRevealRail>
      </section>
    </>
  );
}
