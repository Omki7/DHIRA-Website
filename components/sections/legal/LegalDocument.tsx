/*
 * One layout for every policy page: a plain text hero (label, title,
 * summary, last updated), then the document at reading measure beside a
 * sticky contents list, then the other policies. Dense on purpose: these
 * pages are for reading and citing, not for a story. Documents: the legal
 * collection (content/collections/legal.ts); labels: interface strings.
 */

import Link from "next/link";
import RichText from "@/components/ui/RichText";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import type { LegalDoc } from "@/content/collections/legal";
import { getUiStrings } from "@/lib/content";
import { formatDate, outline } from "@/lib/richText";

export default async function LegalDocument({ doc, others }: { doc: LegalDoc; others: LegalDoc[] }) {
  const { legal, longform } = await getUiStrings();
  const contents = outline(doc.blocks);
  return (
    <article className="bg-background">
      <header className="border-b border-lineSoft pb-12 pt-14 lg:pb-16 lg:pt-20">
        <ScrollRevealRail>
          <p className="font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
            <Link href="/legal" className="transition-colors duration-150 hover:text-ink">
              {legal.crumb}
            </Link>
          </p>
          <h1 className="mt-8 text-balance text-[36px] font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-[44px] lg:text-[52px]">
            {doc.title}
          </h1>
          <p className="mt-6 max-w-[38em] text-pretty text-lg leading-relaxed text-secondary-text">{doc.summary}</p>
          <p className="mt-8 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
            {legal.lastUpdated} {formatDate(doc.updated)}
          </p>
        </ScrollRevealRail>
      </header>

      <ScrollRevealRail>
        <div className="grid gap-12 pb-20 pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-28 lg:pt-16">
          <aside className="lg:col-span-3">
            <nav aria-label={longform.contents} className="lg:sticky lg:top-28">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{longform.contents}</p>
              <ol className="mt-3 space-y-2 border-l border-lineSoft">
                {contents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-[14px] leading-snug text-secondary-text transition-colors duration-150 hover:border-blue hover:text-ink"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <div className="min-w-0 lg:col-span-7">
            <RichText blocks={doc.blocks} size="legal" />
            <div className="mt-16 border-t border-lineSoft pt-6">
              <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{legal.otherPolicies}</p>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                {others.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${item.slug}`} className="text-[15px] text-blue underline decoration-blue/30 underline-offset-[3px] hover:decoration-blue">
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollRevealRail>
    </article>
  );
}
