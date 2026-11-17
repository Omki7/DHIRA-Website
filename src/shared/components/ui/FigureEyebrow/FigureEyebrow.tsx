"use client";

import type { CSSProperties, ReactNode } from "react";
import { cx } from "@/shared/utils/cx";
import styles from "./FigureEyebrow.module.scss";

/*
 * THE section eyebrow, on every page (DESIGN_SYSTEM, "Section grammar";
 * founder, 20 Oct 2026: one format across the site). A dashed hairline above
 * and below, `[NN]  LABEL` in 11px mono on the left: number `overcast`, label
 * `inkSoft`. Always left-aligned, never centred, never coloured, no dots.
 * Sections render it through `ui/SectionHeader`; use it directly only where
 * a section cannot.
 *
 * A section inside a chapter (content/types PageSection) carries
 * "Chapter / Part" as its label: `[02]  WHAT WE OFFER / SOLUTIONS`, the
 * chapter as the section index names it, then the section. The slash sits
 * back in `overcast`. When a phone is too narrow for the line, a status tag
 * drops under the words first; then the chapter gives way (ellipsis) and
 * the part stays whole. The words are plain inline text, so a copied
 * eyebrow reads as one line.
 *
 * `tag` sets a required status mark after the label (PreviewTag on agents).
 * `live` puts the pulsing NOW HIRING marker in the right slot (careers only).
 * `bare` drops the rail inside a card (the closing `DrawingSetClose`).
 */

export interface FigureEyebrowProps {
  num?: string;
  /** "Label", or "Chapter / Part" for a section inside a chapter. */
  label: string;
  /** A status mark set after the label, e.g. `PreviewTag` on a section
      about agents. The claims rules require it; it is not decoration. */
  tag?: ReactNode;
  live?: string;
  dark?: boolean;
  bare?: boolean;
}

const PART_SEPARATOR = " / ";

/** Splits an eyebrow label into its chapter and, when it has one, its part. */
export function splitEyebrowLabel(label: string): { chapter: string; part?: string } {
  const at = label.indexOf(PART_SEPARATOR);
  if (at < 0) return { chapter: label };
  return { chapter: label.slice(0, at), part: label.slice(at + PART_SEPARATOR.length) };
}

export interface EyebrowLabelProps {
  label: string;
  /** Colours the slash: the class the eyebrow gives its number. */
  slashClassName?: string;
  /** False when no `[NN]` number precedes the words on their line. */
  numbered?: boolean;
}

/** `[NN]` and the two spaces after it, in characters. */
const NUMBER_CHARS = 6;

/** An eyebrow's words, "Chapter / Part" set as above. `FigureEyebrow` uses
    it; so do the few eyebrows still drawn by hand (the sector pages). */
export function EyebrowLabel({ label, slashClassName, numbered = true }: EyebrowLabelProps) {
  const { chapter, part } = splitEyebrowLabel(label);
  if (!part) return <>{chapter}</>;
  const reserve = part.length + PART_SEPARATOR.length + (numbered ? NUMBER_CHARS : 0);
  return (
    <span className={styles.wordsWithPart} style={{ "--eyebrow-reserve": reserve } as CSSProperties}>
      <span className={styles.chapter}>{chapter}</span>
      <span className={slashClassName}>{PART_SEPARATOR}</span>
      {part}
    </span>
  );
}

export function FigureEyebrow({
  num,
  label,
  tag,
  live,
  dark = false,
  bare = false,
}: FigureEyebrowProps) {
  const rail = bare ? undefined : cx(styles.rail, dark ? styles.railDark : styles.railLight);
  const numClass = dark ? styles.numDark : styles.num;
  /* `data-section-eyebrow` marks where a section starts: jumps land here
     (shared/utils/navigation sectionScrollTop). A bare eyebrow sits inside
     a card, so its section lands on its own top instead. */
  return (
    <div className={cx(styles.root, rail, live && styles.withLive)} data-section-eyebrow={bare ? undefined : ""}>
      <p className={styles.line}>
        <span className={styles.text}>
          {num && <span className={numClass}>[{num}]&nbsp;&nbsp;</span>}
          <span className={dark ? styles.labelDark : styles.label}>
            <EyebrowLabel label={label} slashClassName={numClass} numbered={Boolean(num)} />
          </span>
        </span>
        {tag}
      </p>
      {live && (
        <span className={styles.live}>
          <span className={styles.liveDot} aria-hidden />
          {live}
        </span>
      )}
    </div>
  );
}
