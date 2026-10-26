/*
 * EisPill — the one button shape on /solutions/enterprise-intelligence.
 *
 * The reference styling this page follows uses a single 44px rounded-full
 * control at 14px/500 everywhere: hero CTAs, panel CTAs, tab switchers, the
 * closing slab. Three tones cover every appearance it makes. Anything that
 * needs a fourth belongs in this file, not inline at the call site.
 */

import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "solid" | "outline" | "ghost";

const TONES: Record<Tone, string> = {
  /* On a photographic ground: white fill, black label. */
  solid: "bg-action text-on-action hover:bg-action-hover",
  /* On white: a hairline, no fill. */
  outline: "border border-eis-line text-eis-ink hover:bg-eis-chip",
  /* On a photographic ground, secondary to `solid`. */
  ghost:
    "border border-line text-ink  hover:bg-tertiary-bg",
};

const BASE =
  "inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-colors duration-250 ease-settle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue";

export default function EisPill({
  href,
  tone = "solid",
  className = "",
  children,
}: {
  href: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${BASE} ${TONES[tone]} ${className}`}>
      {children}
    </Link>
  );
}
