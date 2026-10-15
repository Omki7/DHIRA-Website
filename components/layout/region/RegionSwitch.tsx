"use client";

import { useRouter } from "next/navigation";
import useRegion, { chooseRegion } from "@/hooks/useRegion";
import { REGIONS, basePath, regionHref, type Region } from "@/lib/region";

/* The footer's region switch (added 15 Oct 2026), on the dark ribbon. On a
   regional page it records the choice and opens the other version; on a
   page that is the same everywhere it records the choice, so site links
   follow it from then on. */

const ORDER: Region[] = ["intl", "in"];

export default function RegionSwitch() {
  const router = useRouter();
  const { pathname, page, region } = useRegion();

  const pick = (next: Region) => {
    chooseRegion(next);
    if (page && page !== next) router.push(regionHref(basePath(pathname), next) + window.location.hash);
  };

  return (
    <div role="group" aria-label="Region" className="flex items-center gap-3 text-xs">
      <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-white/50">Region</span>
      {ORDER.map((option, k) => (
        <span key={option} className="flex items-center gap-3">
          {k > 0 && <span aria-hidden className="h-3 w-px bg-white/20" />}
          <button
            type="button"
            aria-pressed={region === option}
            onClick={() => pick(option)}
            className="text-white/50 transition-colors duration-250 ease-settle hover:text-white/80 aria-pressed:text-white"
          >
            {REGIONS[option].label}
          </button>
        </span>
      ))}
    </div>
  );
}
