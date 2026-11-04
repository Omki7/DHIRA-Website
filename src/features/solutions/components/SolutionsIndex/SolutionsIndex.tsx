import Link from "next/link";
import type { IndexRow, SolutionsPage } from "@/content/pages/solutions";
import { ScrollReveal, ScrollRevealRail, SectionHeader } from "@/shared/components/ui";
import styles from "./SolutionsIndex.module.scss";

export interface SolutionsIndexProps {
  content: SolutionsPage["index"];
  featured: SolutionsPage["featured"]["items"];
  more: SolutionsPage["more"]["items"];
}

type SolutionLinks = Record<string, { name: string; href: string }>;

function Register({ id, title, rows, links }: { id: string; title: string; rows: IndexRow[]; links: SolutionLinks }) {
  return (
    <div id={id} className={styles.register}>
      <p className={styles.registerTitle}>{title}</p>
      <ul className={styles.rows}>
        {rows.map((row) => (
          <li key={row.label} id={row.id} className={styles.row}>
            {row.href ? (
              <Link href={row.href} className={styles.rowLink}>
                {row.label}
                <span aria-hidden className={styles.rowArrow}>
                  &rarr;
                </span>
              </Link>
            ) : (
              <span className={styles.rowLabel}>{row.label}</span>
            )}
            <span className={styles.fits}>
              {row.solutions.map((solutionId) => {
                const solution = links[solutionId];
                if (!solution) return null;
                return (
                  <Link key={solutionId} href={solution.href} className={styles.fit}>
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

/** Every solution by id: featured ones link to their page, the rest to their row here. */
function solutionLinks(featured: SolutionsIndexProps["featured"], more: SolutionsIndexProps["more"]): SolutionLinks {
  return Object.fromEntries([
    ...featured.map((s) => [s.id, { name: s.name, href: s.href.startsWith("/") ? s.href : `#${s.id}` }]),
    ...more.map((s) => [s.id, { name: s.name, href: `#${s.id}` }]),
  ]);
}

/*
 * [industries] By industry and function (kept, user's pick, 5 Nov 2026;
 * moved into features/solutions as an SCSS Module without visual change).
 * Two registers side by side; each line names the solutions that fit it,
 * linked to their row above or their own page. Function rows carry the ids
 * the nav's "By function" links target (#function-<slug>). The page's one
 * soft blue band (Rule 5a).
 */
export function SolutionsIndex({ content, featured, more }: SolutionsIndexProps) {
  const links = solutionLinks(featured, more);
  return (
    <section id="industries" className={styles.section}>
      <ScrollRevealRail>
        <SectionHeader
          num={content.num}
          label={content.label}
          setup={content.setup}
          payoff={content.payoff}
          lede={content.lede}
        />

        <ScrollReveal delay={80}>
          <div className={styles.registers}>
            <Register id="industry-list" title={content.industryTitle} rows={content.industries} links={links} />
            <Register id="functions" title={content.functionTitle} rows={content.functions} links={links} />
          </div>
        </ScrollReveal>
      </ScrollRevealRail>
    </section>
  );
}
