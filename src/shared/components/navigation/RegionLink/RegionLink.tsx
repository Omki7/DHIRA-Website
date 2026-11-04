"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import useRegion from "@/shared/hooks/useRegion";
import { regionHref } from "@/shared/utils/region";

/* next/link for site paths. A path with an India version (shared/utils/region.ts
   REGIONAL_PAGES) resolves to the visitor's region; every other href passes
   through unchanged, so this is safe to use for any internal link. */

export interface RegionLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
}

export function RegionLink({ href, ...props }: RegionLinkProps) {
  const { region } = useRegion();
  return <Link href={regionHref(href, region)} {...props} />;
}
