/*
 * [03] By industry and function: two registers side by side. Each line names
 * the solutions that fit it, linked to their row above or their own page.
 * Function rows carry the ids the nav's "By function" links target
 * (#function-<slug>). The page's one soft blue band (Rule 5a).
 * The mappings are drafted from the founder's copy; see the note in
 * lib/solutionsSections.ts.
 */

import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import SectionHeader from "@/components/ui/SectionHeader";
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
            className="grid scroll-mt-28 gap-1.5 border-b border-lineSoft py-4 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-6"
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
    <section
      id="industries"
      className="scroll-mt-24 bg-band pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={80}>
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <Register id="industry-list" title={content.industryTitle} rows={content.industries} links={links} />
            <Register id="functions" title={content.functionTitle} rows={content.functions} links={links} />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
