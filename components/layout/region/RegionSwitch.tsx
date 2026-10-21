"use client";

import { useRouter } from "next/navigation";
import { useUi } from "@/components/providers/UiProvider";
import useRegion, { chooseRegion } from "@/hooks/useRegion";
import { basePath, regionHref, type Region } from "@/lib/region";

/* The footer's region switch (added 15 Oct 2026), on the dark ribbon. On a
   regional page it records the choice and opens the other version; on a
   page that is the same everywhere it records the choice, so site links
   follow it from then on. */

const ORDER: Region[] = ["intl", "in"];

export default function RegionSwitch() {
  const router = useRouter();
  const { region: copy } = useUi();
  const { pathname, page, region } = useRegion();

  const pick = (next: Region) => {
    chooseRegion(next);
    if (page && page !== next) router.push(regionHref(basePath(pathname), next) + window.location.hash);
  };

  return (
    <div role="group" aria-label={copy.label} className="flex items-center gap-3 text-xs">
      <span className="font-mono text-[11px] font-medium uppercase tracking-eyebrow text-inkSoft">{copy.label}</span>
      {ORDER.map((option, k) => (
        <span key={option} className="flex items-center gap-3">
          {k > 0 && <span aria-hidden className="h-3 w-px bg-tertiary-bg" />}
          <button
            type="button"
            aria-pressed={region === option}
            onClick={() => pick(option)}
            className="text-inkSoft transition-colors duration-250 ease-settle hover:text-secondary-text aria-pressed:text-ink"
          >
            {copy.names[option]}
          </button>
        </span>
      ))}
    </div>
  );
}
