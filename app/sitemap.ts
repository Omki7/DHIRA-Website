import type { MetadataRoute } from "next";
import { REGIONAL_PAGES, REGIONS, regionPath } from "@/lib/region";
import { SITE, absoluteUrl } from "@/lib/site";
import { ALL_ROUTES } from "@/lib/siteRoutes";

/* sitemap.xml from the one route list (lib/siteRoutes.ts). Pages with an
   India version (lib/region.ts REGIONAL_PAGES) list both URLs, each with
   hreflang alternates, so search serves each country its own page. */

export default function sitemap(): MetadataRoute.Sitemap {
  const regional = new Map(REGIONAL_PAGES.map((page) => [page.path, page]));

  const languagesFor = (path: string) => ({
    [REGIONS.intl.hreflang]: absoluteUrl(regionPath(path, "intl")),
    [REGIONS.in.hreflang]: absoluteUrl(regionPath(path, "in")),
  });

  return ALL_ROUTES.flatMap((route) => {
    const lastModified = route.updated ?? SITE.lastUpdated;
    const priority = route.path === "/" ? 1 : route.path.split("/").length > 2 ? 0.6 : 0.8;
    if (!regional.has(route.path)) {
      return [{ url: absoluteUrl(route.path), lastModified, priority }];
    }
    const alternates = { languages: languagesFor(route.path) };
    return [
      { url: absoluteUrl(regionPath(route.path, "intl")), lastModified, priority, alternates },
      { url: absoluteUrl(regionPath(route.path, "in")), lastModified, priority, alternates },
    ];
  });
}
