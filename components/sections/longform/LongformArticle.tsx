/*
 * The long-form layout shared by Insights articles, press releases and
 * customer stories: a breadcrumb in the mono label style, the h1, the dek,
 * one meta line, then the body at reading measure with a sticky contents
 * list and the share row in the left rail on desktop. Body copy is typed
 * blocks (lib/richText.ts) rendered by ui/RichText.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import RichText from "@/components/ui/RichText";
import ScrollRevealRail from "@/components/ui/ScrollRevealRail";
import ShareLinks from "@/components/ui/ShareLinks";
import type { Block } from "@/content/types";
import { getUiStrings } from "@/lib/content";
import { outline } from "@/lib/richText";

export type Crumb = { label: string; href: string };

export default async function LongformArticle({
  crumbs,
  title,
  dek,
  meta,
  blocks,
  url,
  lead,
}: {
  crumbs: Crumb[];
  title: string;
  dek: string;
  meta: ReactNode;
  blocks: Block[];
  /** Absolute URL, for the share row. */
  url: string;
  /** Optional block above the body (a figure strip, a key facts list). */
  lead?: ReactNode;
}) {
  const ui = await getUiStrings();
  const contents = outline(blocks);
  return (
    <article className="bg-background">
      <header className="border-b border-lineSoft pb-12 pt-14 lg:pb-16 lg:pt-20">
        <ScrollRevealRail>
          <nav aria-label={ui.longform.breadcrumb}>
            <ol className="flex flex-wrap items-center gap-x-2 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">
              {crumbs.map((crumb, index) => (
                <li key={crumb.href} className="flex items-center gap-2">
                  {index > 0 && <span aria-hidden>/</span>}
                  <Link href={crumb.href} className="text-inkSoft transition-colors duration-150 hover:text-ink">
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-8 max-w-[22em] text-balance text-[36px] font-medium leading-[1.08] tracking-[-0.035em] text-ink sm:text-[44px] lg:text-[52px]">
            {title}
          </h1>
          <p className="mt-6 max-w-[38em] text-pretty text-lg leading-relaxed text-secondary-text sm:text-xl">{dek}</p>
          <div className="mt-8 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{meta}</div>
        </ScrollRevealRail>
      </header>

      <ScrollRevealRail>
        <div className="grid gap-12 pb-16 pt-12 lg:grid-cols-12 lg:gap-10 lg:pb-24 lg:pt-16">
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              {contents.length > 1 && (
                <nav aria-label={ui.longform.contents} className="hidden lg:block">
                  <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{ui.longform.contents}</p>
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
              )}
              <div className={contents.length > 1 ? "lg:mt-10" : ""}>
                <ShareLinks url={url} title={title} />
              </div>
            </div>
          </aside>
          <div className="min-w-0 lg:col-span-7">
            {lead}
            <RichText blocks={blocks} />
          </div>
        </div>
      </ScrollRevealRail>
    </article>
  );
}
