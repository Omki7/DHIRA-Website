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
import { FUNCTION_INDEX, INDUSTRY_INDEX, SOLUTION_LINKS, type IndexRow } from "@/lib/solutionsSections";

function Register({ id, title, rows }: { id: string; title: string; rows: IndexRow[] }) {
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
                <span aria-hidden className="text-overcast transition-transform duration-250 ease-settle group-hover:translate-x-0.5 group-hover:text-blue">
                  &rarr;
                </span>
              </Link>
            ) : (
              <span className="text-[16px] font-semibold text-ink">{row.label}</span>
            )}
            <span className="flex flex-wrap gap-x-5 gap-y-1.5">
              {row.solutions.map((solutionId) => {
                const solution = SOLUTION_LINKS[solutionId];
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

export default function SolutionsIndex() {
  return (
    <section
      id="industries"
      className="scroll-mt-24 bg-[linear-gradient(180deg,#FFFFFF_0%,#F1F5FE_16%,#F1F5FE_84%,#FFFFFF_100%)] pb-20 pt-16 lg:pb-28 lg:pt-20"
    >
      <ScrollRevealRail>
        <SectionHeader
          num="03"
          label="By industry and function"
          setup="Find your starting point."
          payoff="By the sector you serve, or the team you lead."
          lede="Each line names the solutions that fit, so the first conversation starts from your problem."
        />

        <ScrollReveal delay={80}>
          <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-2 lg:gap-16">
            <Register id="industry-list" title="By industry" rows={INDUSTRY_INDEX} />
            <Register id="functions" title="By function" rows={FUNCTION_INDEX} />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
