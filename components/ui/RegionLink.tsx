"use client";

import type { ComponentProps } from "react";
import Link from "next/link";
import useRegion from "@/hooks/useRegion";
import { regionHref } from "@/lib/region";

/* next/link for site paths. A path with an India version (lib/region.ts
   REGIONAL_PAGES) resolves to the visitor's region; every other href passes
   through unchanged, so this is safe to use for any internal link. */

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export default function RegionLink({ href, ...props }: Props) {
  const { region } = useRegion();
  return <Link href={regionHref(href, region)} {...props} />;
}
