/*
 * Renders the typed long-form blocks in lib/richText.ts: articles, press
 * releases and the legal pages. One reading measure, the site's type stack,
 * hairline rules instead of boxes. Lists are numbered in mono or marked with
 * a small square, never ticked (Rule 2).
 *
 * `size` sets the reading scale: `essay` for Insights (26 Oct 2026: a
 * long-form blog scale, larger ink text with room between paragraphs and a
 * framed closing note), `article` for the newsroom, `legal` for policy
 * pages, which run a step smaller and denser.
 */

import type { ReactNode } from "react";
import Link from "next/link";
import type { Block } from "@/content/types";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass =
  "text-blue underline decoration-blue/30 underline-offset-[3px] transition-colors duration-150 hover:decoration-blue";

/** Turns [label](href) inside a string into links. */
function inline(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    const [whole, label, href] = match;
    const at = match.index ?? 0;
    if (at > last) parts.push(text.slice(last, at));
    if (href.startsWith("/") || href.startsWith("#")) {
      parts.push(
        <Link key={at} href={href} className={linkClass}>
          {label}
        </Link>
      );
    } else {
      const external = href.startsWith("http");
      parts.push(
        <a key={at} href={href} className={linkClass} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {label}
        </a>
      );
    }
    last = at + whole.length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function RichText({ blocks, size = "article" }: { blocks: Block[]; size?: "essay" | "article" | "legal" }) {
  const essay = size === "essay";
  const body = {
    essay: "text-ink/[0.86] text-[18px] leading-[1.75] sm:text-[19px] sm:leading-[1.72]",
    article: "text-secondary-text text-[17px] leading-[1.75]",
    legal: "text-secondary-text text-[15.5px] leading-[1.7]",
  }[size];
  return (
    <div className={body}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className={`text-pretty first:mt-0 ${essay ? "mt-7" : "mt-5"}`}>
                {inline(block.text)}
              </p>
            );
          case "h2":
            return (
              <h2
                key={key}
                id={block.id}
                className={`scroll-mt-28 text-balance font-heading font-semibold tracking-[-0.02em] text-ink first:mt-0 ${
                  essay ? "mt-16 text-[26px] leading-[1.2] lg:text-[30px]" : size === "article" ? "mt-14 text-[26px] leading-[1.2] lg:text-[28px]" : "mt-12 text-[22px] leading-[1.25]"
                }`}
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="mt-8 text-balance text-[18px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={key} className="mt-5 space-y-2.5">
                {block.items.map((item) => (
                  <li key={item} className="grid grid-cols-[18px_1fr] gap-2">
                    <span aria-hidden className="mt-[0.72em] h-[5px] w-[5px] rounded-[1px] bg-overcast" />
                    <span className="text-pretty">{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="mt-6 border-y border-dashed border-lineSoft">
                {block.items.map((item, k) => (
                  <li key={item} className="grid grid-cols-[36px_1fr] gap-3 border-b border-dashed border-lineSoft py-3.5 last:border-b-0">
                    <span className="pt-[0.35em] font-mono text-[11px] tracking-eyebrow text-overcast">{pad(k + 1)}</span>
                    <span className="text-pretty text-ink">{inline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <figure key={key} className={essay ? "my-14 border-y border-lineSoft py-10" : "mt-10 border-l-2 border-blue pl-6"}>
                <blockquote className={`text-balance font-display text-ink ${essay ? "text-[28px] leading-[1.28] lg:text-[34px]" : "text-[24px] leading-[1.35] lg:text-[26px]"}`}>
                  {block.text}
                </blockquote>
                {block.cite && (
                  <figcaption className="mt-3 font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{block.cite}</figcaption>
                )}
              </figure>
            );
          case "note":
            return (
              <aside key={key} className={essay ? "mt-10 rounded-outer border border-subtle-stroke bg-primary-bg p-6 sm:p-8" : "mt-8 border-y border-lineSoft py-5"}>
                <p className="font-mono text-[11px] uppercase tracking-eyebrow text-overcast">{block.label}</p>
                <p className={`text-pretty text-ink ${essay ? "mt-3 text-[17px] leading-[1.65]" : "mt-2 text-[15px] leading-relaxed"}`}>{inline(block.text)}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
