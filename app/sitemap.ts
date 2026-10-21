import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/lib/content";
import { REGIONAL_PATHS, REGIONS, regionPath } from "@/lib/region";
import { getAllRoutes } from "@/lib/routes";
import { absoluteUrl } from "@/lib/site";

/* sitemap.xml from the one route list (lib/routes.ts). Pages with an India
   version (lib/region.ts REGIONAL_PATHS) list both URLs, each with hreflang
   alternates, so search serves each country its own page. */

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [routes, site] = await Promise.all([getAllRoutes(), getSiteSettings()]);
  const regional = new Set(REGIONAL_PATHS);

  const languagesFor = (path: string) => ({
    [REGIONS.intl.hreflang]: absoluteUrl(regionPath(path, "intl")),
    [REGIONS.in.hreflang]: absoluteUrl(regionPath(path, "in")),
  });

  return routes.flatMap((route) => {
    const lastModified = route.updated ?? site.lastUpdated;
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
