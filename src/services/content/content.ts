import "server-only";
import { cache } from "react";
import { customerStories } from "@/content/collections/customer-stories";
import { glossaryTerms } from "@/content/collections/glossary";
import { legalDocs } from "@/content/collections/legal";
import { insights } from "@/content/collections/insights";
import { leaders } from "@/content/collections/leaders";
import { pressReleases } from "@/content/collections/press-releases";
import { roles } from "@/content/collections/roles";
import { navigation } from "@/content/navigation";
import { about } from "@/content/pages/about";
import { akashic } from "@/content/pages/akashic";
import { akashicRelease } from "@/content/pages/akashic-release";
import { careers } from "@/content/pages/careers";
import { contactPage } from "@/content/pages/contact";
import { customersPage } from "@/content/pages/customers";
import { glossaryPage } from "@/content/pages/glossary";
import { home } from "@/content/pages/home";
import { insightsPage } from "@/content/pages/insights";
import { newsroomPage } from "@/content/pages/newsroom";
import { notFoundPage } from "@/content/pages/not-found";
import { partnersPage } from "@/content/pages/partners";
import { pricing } from "@/content/pages/pricing";
import { sectorPages, sectorSections, sectorTemplate, type SectorSlug } from "@/content/pages/sectors";
import { sectorMaps } from "@/content/pages/sectors-map";
import { sectorsPublicSector } from "@/content/pages/sectors-public-sector";
import { services } from "@/content/pages/services";
import { solutions } from "@/content/pages/solutions";
import { solutionsEis } from "@/content/pages/solutions-eis";
import { solutionsLife } from "@/content/pages/solutions-life";
import { site } from "@/content/site";
import { siteMap } from "@/content/site-map";
import { ui } from "@/content/ui";

/* ------------------------------------------------------------------ */
/*  Content API: the only way routes read content                      */
/* ------------------------------------------------------------------ */
/* Every page, layout and route handler reads its content through these
   functions; components never import a content document directly (they
   receive it as props, or read interface strings with useUi()).

   Every function returns a local, typed document from src/content/. The
   site has no CMS (17 Nov 2026, user: the Strapi integration of 6 Nov was
   removed; content is edited in the files and ships with the build). The
   functions stay async and wrapped in React cache() so a page reads each
   document once per render however many components ask, and so a future
   source could change these bodies without touching a call site.

   Naming: getX returns a singleton or one document; getXs returns a
   collection; getX(id) returns one entry or null (the route calls
   notFound()). */

/* ---------------- Singletons ---------------- */

export const getSiteSettings = cache(async () => site);

export const getNavigation = cache(async () => navigation);

export const getUiStrings = cache(async () => ui);

/** The site map's static route groups and copy (lib/routes.ts adds the collections). */
export const getSiteMap = cache(async () => siteMap);

/* ---------------- Pages ---------------- */

const pages = {
  home,
  about,
  akashic,
  "akashic/1-0": akashicRelease,
  careers,
  services,
  solutions,
  "solutions/enterprise-intelligence": solutionsEis,
  "solutions/life": solutionsLife,
  "sectors/public-sector": sectorsPublicSector,
  pricing,
  insights: insightsPage,
  customers: customersPage,
  newsroom: newsroomPage,
  glossary: glossaryPage,
  contact: contactPage,
  partners: partnersPage,
  "not-found": notFoundPage,
};

export type PageKey = keyof typeof pages;

export const getPage = cache(async <K extends PageKey>(key: K): Promise<(typeof pages)[K]> => pages[key]);

/** One sector page: its document, its map scene, and the strings and
    section index every sector page shares. */
export const getSector = cache(async (slug: SectorSlug) => ({
  content: sectorPages[slug],
  map: sectorMaps[slug],
  template: sectorTemplate,
  sections: sectorSections,
}));

/* ---------------- Collections ---------------- */

export const getCustomerStories = cache(async () => customerStories);

export const getCustomerStory = cache(async (id: string) => customerStories.find((story) => story.id === id) ?? null);

export const getRoles = cache(async () => roles);

/** The policy pages (privacy, terms, cookies, accessibility, website policies). */
export const getLegalDocs = cache(async () => legalDocs);

export const getLegalDoc = cache(async (slug: string) => legalDocs.find((doc) => doc.slug === slug) ?? null);

/** Glossary terms, in authored order (lib/glossary.ts groups them A to Z). */
export const getGlossary = cache(async () => glossaryTerms);

export const getLeaders = cache(async () => leaders);

/** Press releases, newest first. */
export const getPressReleases = cache(async () => [...pressReleases].sort((a, b) => b.date.localeCompare(a.date)));

export const getPressRelease = cache(async (slug: string) => pressReleases.find((release) => release.slug === slug) ?? null);

/** Insights, newest first. */
export const getInsights = cache(async () => [...insights].sort((a, b) => b.date.localeCompare(a.date)));

export const getInsight = cache(async (slug: string) => insights.find((insight) => insight.slug === slug) ?? null);

/** Up to `count` other articles: same category first, then newest. */
export const getRelatedInsights = cache(async (slug: string, count = 2) => {
  const current = await getInsight(slug);
  const others = (await getInsights()).filter((insight) => insight.slug !== slug);
  return [
    ...others.filter((insight) => insight.category === current?.category),
    ...others.filter((insight) => insight.category !== current?.category),
  ].slice(0, count);
});
