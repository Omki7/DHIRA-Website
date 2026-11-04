/*
 * Renders the typed long-form blocks in src/shared/utils/richText.ts: articles, press
 * releases and the legal pages. One reading measure, the site's type stack,
 * hairline rules instead of boxes. Lists are numbered in mono or marked with
 * a small square, never ticked (Rule 2).
 *
 * `size` sets the reading scale: `essay` for Insights (26 Oct 2026: a
 * long-form blog scale, larger ink text with room between paragraphs and a
 * framed closing note), `article` for the newsroom, `legal` for policy
 * pages, which run a step smaller and denser.
 */

import Link from "next/link";
import type { ReactNode } from "react";
import type { Block } from "@/content/types";
import { cx } from "@/shared/utils/cx";
import styles from "./RichText.module.scss";

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const linkClass = styles.link;

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

export interface RichTextProps {
  blocks: Block[];
  size?: "essay" | "article" | "legal";
}

export function RichText({ blocks, size = "article" }: RichTextProps) {
  const essay = size === "essay";
  const body = {
    essay: styles.bodyEssay,
    article: styles.bodyArticle,
    legal: styles.bodyLegal,
  }[size];
  return (
    <div className={body}>
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className={cx(styles.p, essay ? styles.pEssay : styles.pDefault)}>
                {inline(block.text)}
              </p>
            );
          case "h2":
            return (
              <h2
                key={key}
                id={block.id}
                className={cx(
                  styles.h2,
                  essay ? styles.h2Essay : size === "article" ? styles.h2Article : styles.h2Legal
                )}
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className={styles.h3}>
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={key} className={styles.ul}>
                {block.items.map((item) => (
                  <li key={item} className={styles.ulItem}>
                    <span aria-hidden className={styles.ulMarker} />
                    <span className={styles.ulText}>{inline(item)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className={styles.ol}>
                {block.items.map((item, k) => (
                  <li key={item} className={styles.olItem}>
                    <span className={styles.olNumber}>{pad(k + 1)}</span>
                    <span className={styles.olText}>{inline(item)}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <figure key={key} className={essay ? styles.quoteEssay : styles.quoteDefault}>
                <blockquote className={cx(styles.blockquote, essay ? styles.blockquoteEssay : styles.blockquoteDefault)}>
                  {block.text}
                </blockquote>
                {block.cite && (
                  <figcaption className={styles.cite}>{block.cite}</figcaption>
                )}
              </figure>
            );
          case "note":
            return (
              <aside key={key} className={essay ? styles.noteEssay : styles.noteDefault}>
                <p className={styles.noteLabel}>{block.label}</p>
                <p className={cx(styles.noteText, essay ? styles.noteTextEssay : styles.noteTextDefault)}>{inline(block.text)}</p>
              </aside>
            );
        }
      })}
    </div>
  );
}
