"use client";

import type { ReactNode } from "react";
import useRegion from "@/shared/hooks/useRegion";
import { isShownTo, type Region } from "@/shared/utils/region";

/* Content for one audience inside a Server Component (4 Nov 2026, user:
   careers is for India only). Renders `children` when the visitor's region
   is `region` (shared/hooks/useRegion: the page's own, their choice, else
   the device time zone) and `fallback` otherwise. With no `region` it
   always renders, so a list can pass each item's optional `audience`
   straight through. The server does not know the visitor, so the static
   HTML carries the international version (see shared/utils/region.ts). */

export interface RegionOnlyProps {
  /** Who sees `children`. Unset: everyone. */
  region?: Region;
  /** What everyone else sees. Nothing by default. */
  fallback?: ReactNode;
  children: ReactNode;
}

export function RegionOnly({ region, fallback = null, children }: RegionOnlyProps) {
  const visitor = useRegion().region;
  return <>{isShownTo(region, visitor) ? children : fallback}</>;
}
