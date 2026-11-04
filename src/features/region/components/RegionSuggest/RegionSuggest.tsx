"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUi } from "@/shared/providers/UiProvider";
import useRegion, { chooseRegion } from "@/shared/hooks/useRegion";
import { cx } from "@/shared/utils/cx";
import { basePath, regionHref, regionalPage } from "@/shared/utils/region";
import styles from "./RegionSuggest.module.scss";

/* The suggestion card (added 15 Oct 2026). Mounted once in the root layout;
   renders only on a regional page whose region differs from the visitor's
   time zone guess, and only until the visitor chooses. It never redirects:
   a forced redirect hides one version from search crawlers and traps people
   who travel or use a VPN. Fixed bottom left, clear of the right-edge
   minimap; it overlays rather than pushing the page, so nothing shifts. */

export function RegionSuggest() {
  const router = useRouter();
  const { region: copy } = useUi();
  const { pathname, page, choice, detected } = useRegion();
  const [closed, setClosed] = useState(false);
  const regional = regionalPage(pathname);

  if (closed || !regional || !page || choice || !detected || detected === page) return null;

  const target = detected;

  const view = () => {
    chooseRegion(target);
    router.push(regionHref(basePath(pathname), target) + window.location.hash);
  };
  const stay = () => {
    chooseRegion(page);
    setClosed(true);
  };

  return (
    <aside
      aria-label={copy.suggestion}
      className={styles.card}
    >
      <p className={styles.region}>{copy.names[target]}</p>
      <p className={styles.question}>
        {copy.question[target]}
      </p>
      <p className={styles.offer}>
        {copy.hasVersion[target]} {copy.offers[regional]?.[target]}
      </p>
      <div className={styles.actions}>
        <button type="button" className={cx("btn-primary", styles.action)} onClick={view}>
          {copy.view[target]}
        </button>
        <button type="button" className={cx("btn-ghost", styles.action)} onClick={stay}>
          {copy.stay}
        </button>
      </div>
    </aside>
  );
}
