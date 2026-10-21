"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUi } from "@/components/providers/UiProvider";
import useRegion, { chooseRegion } from "@/hooks/useRegion";
import { basePath, regionHref, regionalPage } from "@/lib/region";

/* The suggestion card (added 15 Oct 2026). Mounted once in the root layout;
   renders only on a regional page whose region differs from the visitor's
   time zone guess, and only until the visitor chooses. It never redirects:
   a forced redirect hides one version from search crawlers and traps people
   who travel or use a VPN. Fixed bottom left, clear of the right-edge
   minimap; it overlays rather than pushing the page, so nothing shifts. */

export default function RegionSuggest() {
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
      className="fixed inset-x-4 bottom-4 z-[60] rounded-outer border border-subtle-stroke bg-background p-5  motion-safe:animate-fade-in sm:inset-x-auto sm:bottom-6 sm:left-6 sm:w-[23rem]"
    >
      <p className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-blue">{copy.names[target]}</p>
      <p className="mt-2 text-[16px] font-semibold tracking-[-0.01em] text-ink">
        {copy.question[target]}
      </p>
      <p className="mt-1 text-pretty text-[14px] leading-snug text-secondary-text">
        {copy.hasVersion[target]} {copy.offers[regional]?.[target]}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button type="button" className="btn-primary text-sm" onClick={view}>
          {copy.view[target]}
        </button>
        <button type="button" className="btn-ghost text-sm" onClick={stay}>
          {copy.stay}
        </button>
      </div>
    </aside>
  );
}
