/*
 * /glossary: the A to Z letter index (rendered inside PageHero) and the
 * terms, each letter's terms on hairlines. Term anchors (#entity-resolution)
 * are linkable from articles and other pages. Copy:
 * content/pages/glossary.ts; terms: content/collections/glossary.ts.
 */

import Link from "next/link";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { GlossaryPage } from "@/content/pages/glossary";
import type { LetterGroup } from "@/lib/glossary";

export function GlossaryLetters({ groups, label }: { groups: LetterGroup[]; label: string }) {
  return (
    <nav aria-label={label} className="mt-10 flex flex-wrap gap-2 border-t border-dashed border-lineSoft pt-5">
      {groups.map((group) => (
        <a
          key={group.letter}
          href={`#letter-${group.letter}`}
          className="flex h-9 w-9 items-center justify-center rounded-tile border border-subtle-stroke font-mono text-[13px] text-inkSoft transition-colors duration-150 hover:border-blue-border hover:text-blue"
        >
          {group.letter}
        </a>
      ))}
    </nav>
  );
}

export function GlossaryTerms({ groups, content: c }: { groups: LetterGroup[]; content: GlossaryPage["terms"] }) {
  return (
    <section id="terms" className="scroll-mt-24 bg-background pb-20 pt-8 lg:pb-28">
      <ScrollRevealRail>
        {groups.map((group) => (
          <div key={group.letter} id={`letter-${group.letter}`} className="grid scroll-mt-28 gap-6 border-b border-lineSoft py-10 lg:grid-cols-12 lg:gap-10">
            <p aria-hidden className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-overcast/60 lg:col-span-2">
              {group.letter}
            </p>
            <dl className="lg:col-span-10">
              {group.terms.map((item) => (
                <div key={item.id} id={item.id} className="grid scroll-mt-28 gap-2 border-t border-dashed border-lineSoft py-6 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-10">
                  <dt className="text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">{item.term}</dt>
                  <dd>
                    <p className="max-w-[44em] text-pretty text-[16px] leading-relaxed text-secondary-text">{item.definition}</p>
                    {item.inAkashic && (
                      <p className="mt-3 text-[14.5px] leading-relaxed text-ink">
                        <span className="font-mono text-[11px] uppercase tracking-eyebrow text-blue">{c.inAkashicLabel}</span>&nbsp;&nbsp;{item.inAkashic}
                        {item.href && (
                          <>
                            {" "}
                            <Link href={item.href} className="whitespace-nowrap text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
                              {c.seeWhere}
                            </Link>
                          </>
                        )}
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </ScrollRevealRail>
    </section>
  );
}
