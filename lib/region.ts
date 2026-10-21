import type { Metadata } from "next";

/* ------------------------------------------------------------------ */
/*  Regions: International and India (added 15 Oct 2026)               */
/* ------------------------------------------------------------------ */
/* The founder asked for region based pages, some India specific and others
   US/International, as Trigyn runs (15 Oct 2026). One site, two audiences:
   a page's international version keeps its usual path and its India version
   lives at /in + path. Only the pages listed in REGIONAL_PAGES have an India
   version; every other page is one page for everyone.

   There is one company (DHIRA Software Labs Pvt. Ltd.) and no US customer
   proof yet, so the two versions differ in how a buyer buys (currency, tax,
   procurement routes), never in invented customers or figures (Rule 4).

   Nobody is redirected. A regional page can suggest its other version
   (components/layout/region/RegionSuggest), and site links follow the
   visitor's region (components/ui/RegionLink, hooks/useRegion).

   This file is routing logic. The words (region names, the suggestion
   card's offer lines) are content: content/ui.ts `region`. */

export type Region = "intl" | "in";

export const REGIONS: Record<Region, { hreflang: string; locale: string }> = {
  intl: { hreflang: "en", locale: "en_GB" },
  in: { hreflang: "en-IN", locale: "en_IN" },
};

/* The international paths that have an India version at /in + path. Add a
   path only once its /in route exists, with its offer lines in content/ui.ts.
   Empty since 21 Oct 2026: /in/pricing went when pricing became USD only
   (user). While it is empty the footer hides its region switch and the
   suggestion card never shows; the routing stays for the next regional page. */
export const REGIONAL_PATHS: string[] = [];

const trim = (path: string) => path.replace(/\/$/, "") || "/";

/** The path without its region prefix: /in/pricing → /pricing. */
export function basePath(pathname: string): string {
  const path = trim(pathname);
  if (path === "/in") return "/";
  return path.startsWith("/in/") ? path.slice(3) : path;
}

/** The international path of the regional page a path belongs to, in either version. */
export const regionalPage = (pathname: string) => REGIONAL_PATHS.find((path) => path === basePath(pathname));

/** The region of the page at `pathname`, or null for a page that is the same everywhere. */
export function pageRegion(pathname: string): Region | null {
  if (!regionalPage(pathname)) return null;
  return basePath(pathname) === trim(pathname) ? "intl" : "in";
}

/** A regional page's path in `region`: /pricing → /in/pricing for India. */
export const regionPath = (base: string, region: Region) => (region === "intl" ? base : base === "/" ? "/in" : `/in${base}`);

/** A site href in `region`. Query and hash survive. External and hash only
    hrefs, and paths with no India version, come back unchanged. */
export function regionHref(href: string, region: Region): string {
  if (!href.startsWith("/")) return href;
  const cut = href.search(/[?#]/);
  const path = cut === -1 ? href : href.slice(0, cut);
  const page = regionalPage(path);
  return page ? regionPath(page, region) + (cut === -1 ? "" : href.slice(cut)) : href;
}

/** Canonical plus hreflang alternates for a page that has both versions. */
export function regionAlternates(path: string, region: Region): NonNullable<Metadata["alternates"]> {
  return {
    canonical: regionPath(path, region),
    languages: {
      [REGIONS.intl.hreflang]: regionPath(path, "intl"),
      [REGIONS.in.hreflang]: regionPath(path, "in"),
      "x-default": regionPath(path, "intl"),
    },
  };
}
