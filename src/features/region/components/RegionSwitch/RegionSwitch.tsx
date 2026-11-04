"use client";

import { useRouter } from "next/navigation";
import { useUi } from "@/shared/providers/UiProvider";
import useRegion, { chooseRegion } from "@/shared/hooks/useRegion";
import { basePath, regionHref, type Region } from "@/shared/utils/region";
import styles from "./RegionSwitch.module.scss";

/* The footer's region switch (added 15 Oct 2026), on the dark ribbon. On a
   regional page it records the choice and opens the other version; on a
   page that is the same everywhere it records the choice, so site links
   follow it from then on. */

const ORDER: Region[] = ["intl", "in"];

export function RegionSwitch() {
  const router = useRouter();
  const { region: copy } = useUi();
  const { pathname, page, region } = useRegion();

  const pick = (next: Region) => {
    chooseRegion(next);
    if (page && page !== next) router.push(regionHref(basePath(pathname), next) + window.location.hash);
  };

  return (
    <div role="group" aria-label={copy.label} className={styles.group}>
      <span className={styles.label}>{copy.label}</span>
      {ORDER.map((option, k) => (
        <span key={option} className={styles.item}>
          {k > 0 && <span aria-hidden className={styles.divider} />}
          <button
            type="button"
            aria-pressed={region === option}
            onClick={() => pick(option)}
            className={styles.option}
          >
            {copy.names[option]}
          </button>
        </span>
      ))}
    </div>
  );
}
