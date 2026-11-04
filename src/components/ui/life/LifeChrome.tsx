/*
 * Akashic Life — shared page chrome.
 *
 * The four marks the redesigned /solutions/life is built out of. They are
 * here rather than inline because every one of them appears in five or more
 * sections, and the page's whole coherence rests on them being identical
 * each time: one eyebrow, one glyph, one pill, one hairline.
 *
 * Scoped to this page (see the `life-*` token block in tailwind.config.ts).
 * Nothing here should be imported by another route.
 */

import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Eyebrow — `[NN]`, then a letterspaced label.                       */
/*                                                                     */
/*  This used to lead with a thin cross glyph instead of a number. The */
/*  cross was coherent within the page, but `[NN]  SECTION NAME` is    */
/*  the site's single strongest structural signature — it runs down    */
/*  the homepage, /akashic and /services — and a reader arriving here  */
/*  from any of them met nine section labels in a different notation.  */
/*  A distinct palette is this page's character; a distinct way of     */
/*  numbering the document is a different design philosophy.           */
/*                                                                     */
/*  Numbers follow LIFE_SECTIONS order, so the eyebrow and the         */
/*  PageMinimap agree. Gaps are expected and deliberate: [05] Altitude */
/*  and [08] Stake are full-screen single statements that carry no     */
/*  eyebrow at all, the same way the homepage skips one.               */
/* ------------------------------------------------------------------ */

export function LifeEyebrow({
  num,
  children,
  tone = "dark",
  className = "",
}: {
  /** Two-digit section number, e.g. "01". Matches LIFE_SECTIONS order. */
  num: string;
  children: React.ReactNode;
  /** `dark` = on a navy ground, `light` = on the ice/cream grounds. */
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <p
      className={`alife-eyebrow ${
        tone === "dark" ? "text-ink" : "text-life-deep"
      } ${className}`}
    >
      {/* The number sits back from the label, as everywhere else on the site
          (`text-overcast` against `text-inkSoft`). */}
      <span className={tone === "dark" ? "text-inkSoft" : "text-overcast"}>
        [{num}]
      </span>
      {children}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  Glyph — the hollow square. Marks a body block the way a bullet     */
/*  would, but reads as an instrument marker rather than a list item.  */
/*  Also used, at 12px, as the target reticle in the record anatomy.   */
/* ------------------------------------------------------------------ */

export function LifeGlyph({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden
      className={`block border-[1.5px] border-life-cyan ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Pill — the page's button shape.                                    */
/*  The site's `.btn-primary` is a 10px-radius ink rectangle; this     */
/*  page runs a full-radius cyan capsule instead, so it is declared    */
/*  here once rather than hand-rolled per section.                     */
/*                                                                     */
/*  The SHAPE and COLOUR are this page's own. The TYPE is not: the     */
/*  label used to be 11.5px mono uppercase at 0.14em, which is this    */
/*  site's EYEBROW setting, so a Life button read as a section label   */
/*  rather than a control — and the sticky Nav's own sentence-case     */
/*  "Talk to our team" sits permanently a few pixels above the hero's  */
/*  "TALK TO OUR TEAM", the same words in two typographic systems on   */
/*  one screen. It now takes the 14px/500 sentence case every other    */
/*  control on the site uses, including LifeClose further down THIS    */
/*  page, which never stopped using `.btn-primary-invert`.             */
/* ------------------------------------------------------------------ */

export function LifePill({
  href,
  children,
  variant = "cyan",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  /** `cyan` and `ghost` pair on dark grounds; `navy` is for the light ones.
      The site puts TWO buttons under every hero and every closing card, so
      the cyan capsule never appears alone. */
  variant?: "cyan" | "ghost" | "navy";
  className?: string;
}) {
  const skin =
    variant === "cyan"
      ? "bg-life-cyan text-on-action  hover:bg-life-blue"
      : variant === "ghost"
        ? "border border-line text-ink hover:border-line hover:bg-tertiary-bg"
        : "bg-life-cyan text-on-action  hover:bg-life-blue";

  return (
    <Link
      href={href}
      className={`inline-flex h-[46px] items-center justify-center rounded-full px-7 text-sm font-medium transition-all duration-200 ease-settle hover:-translate-y-0.5 ${skin} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Corner arc — the hairline quarter-circle that sits in the top-left */
/*  of every full-width section. It is the page's join: the same mark  */
/*  repeating down the scroll is what makes ten very different grounds */
/*  read as one document.                                              */
/*                                                                     */
/*  Sits flush rather than bleeding off the corner, so no section       */
/*  needs `overflow-hidden` to contain it. Several of these sections    */
/*  pin a column with `position: sticky`, and an `overflow-hidden`      */
/*  ancestor silently turns sticky back into static — the column just   */
/*  sits at its start position and the rest of the track renders empty. */
/* ------------------------------------------------------------------ */

export function LifeCornerArc({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <svg
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 h-[72px] w-[72px]"
    >
      <path
        d="M72 0.5H26C11.9 0.5 0.5 11.9 0.5 26v46"
        stroke={tone === "dark" ? "rgb(var(--life-cyan) / .26)" : "rgb(var(--life-navy) / .18)"}
        strokeWidth="1"
      />
    </svg>
  );
}
