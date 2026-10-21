import type { ReactNode } from "react";
import AkashicLogo from "@/components/icons/AkashicLogo";

/*
 * The Akashic wordmark: the logo stands in for the "A", then "kashic".
 * THE way Akashic is written wherever it stands alone as a name (badges,
 * labels, menu titles, card headers, the [03] base, mockup chrome); inside
 * a sentence it stays the plain word (user, 21 Oct 2026). Sized in em, so
 * it takes the size, weight, colour and case of the text around it.
 * Screen readers hear "Akashic".
 */
export default function AkashicWordmark({
  className = "",
  primaryColor,
  accentColor,
}: {
  className?: string;
  primaryColor?: string;
  accentColor?: string;
}) {
  return (
    <span className={`inline-flex items-center whitespace-nowrap ${className}`}>
      <span className="sr-only">Akashic</span>
      <AkashicLogo className="h-[1.4em] w-[1.4em] shrink-0" primaryColor={primaryColor} accentColor={accentColor} />
      <span aria-hidden="true" className="-ml-[0.3em]">
        kashic
      </span>
    </span>
  );
}

/** For content-driven labels: the wordmark when the label is the bare name
    "Akashic", the text as given otherwise ("Ask Akashic", "Akashic 1.0"). */
export function nameOrWordmark(label: string): ReactNode {
  return label.trim() === "Akashic" ? <AkashicWordmark /> : label;
}
