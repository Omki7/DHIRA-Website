import type { PointerEvent } from "react";
import { DhiraLogo } from "@/shared/components/icons/DhiraLogo";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { useUi } from "@/shared/providers/UiProvider";
import styles from "./BrandLink.module.scss";

export type Brand = { name: string; expansion: string };

/** The full form with each initial in bold, so they spell the name down the
    line. Weight only, never colour (founder, 20 Oct 2026). */
function Expansion({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, k) => (
        <span key={k}>
          {k > 0 && " "}
          {/^[A-Z]/.test(word) ? (
            <>
              {/* Medium weight in ink over the regular grey: Google Sans Text
                  has no 600, so anything bolder lands on 700 and shouts at
                  11px (user, 21 Oct 2026). Ink is the wordmark's colour, not
                  an accent. */}
              <span className={styles.initial}>{word[0]}</span>
              {word.slice(1)}
            </>
          ) : (
            word
          )}
        </span>
      ))}
    </>
  );
}

export interface BrandLinkProps {
  brand: Brand;
  onPointerEnter: (event: PointerEvent) => void;
}

/* The header's home link: the mark, the wordmark, then the full form after
   a hairline pipe. */
export function BrandLink({ brand, onPointerEnter }: BrandLinkProps) {
  const ui = useUi();
  /* The full form hides at lg (1024 to 1279px), where five menus
     and the CTA leave it no room. */
  return (
    <RegionLink
      href="/"
      aria-label={ui.homeLink}
      className={styles.root}
      onPointerEnter={onPointerEnter}
    >
      <div className={styles.mark}>
        <DhiraLogo className={styles.logo} />
        <span className={styles.name}>{brand.name}</span>
      </div>
      <span
        aria-hidden="true"
        className={styles.expansion}
      >
        <Expansion text={brand.expansion} />
      </span>
    </RegionLink>
  );
}
