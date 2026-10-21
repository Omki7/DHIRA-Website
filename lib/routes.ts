import "server-only";
import { cache } from "react";
import type { RouteGroup, SiteRoute } from "@/content/site-map";
import { getCustomerStories, getInsights, getPressReleases, getSiteMap } from "./content";

/* The full route list: the site map's static groups with each collection's
   entries listed straight after its hub. Read by sitemap.xml, the HTML site
   map and llms.txt. */
export const getRouteGroups = cache(async (): Promise<RouteGroup[]> => {
  const [siteMap, insights, stories, releases] = await Promise.all([getSiteMap(), getInsights(), getCustomerStories(), getPressReleases()]);
  const children: Record<string, SiteRoute[]> = {
    "/insights": insights.map((insight) => ({ path: `/insights/${insight.slug}`, title: insight.title, description: insight.dek, updated: insight.date })),
    "/customers": stories.map((story) => ({ path: `/customers/${story.id}`, title: story.title, description: story.description })),
    "/newsroom": releases.map((release) => ({ path: `/newsroom/${release.slug}`, title: release.title, description: release.dek, updated: release.date })),
  };
  return siteMap.groups.map((group) => ({
    heading: group.heading,
    routes: group.routes.flatMap((route) => [route, ...(children[route.path] ?? [])]),
  }));
});

export const getAllRoutes = cache(async () => (await getRouteGroups()).flatMap((group) => group.routes));
