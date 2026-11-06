import "server-only";
import { cache } from "react";
import { customerStories as localCustomerStories } from "@/content/collections/customer-stories";
import { glossaryTerms as localGlossaryTerms } from "@/content/collections/glossary";
import { legalDocs } from "@/content/collections/legal";
import { insights as localInsights } from "@/content/collections/insights";
import { leaders as localLeaders } from "@/content/collections/leaders";
import { pressReleases as localPressReleases } from "@/content/collections/press-releases";
import { roles as localRoles } from "@/content/collections/roles";
import { navigation as localNavigation } from "@/content/navigation";
import { about as localAbout } from "@/content/pages/about";
import { akashic as localAkashic } from "@/content/pages/akashic";
import { akashicRelease } from "@/content/pages/akashic-release";
import { careers as localCareers } from "@/content/pages/careers";
import { contactPage } from "@/content/pages/contact";
import { customersPage } from "@/content/pages/customers";
import { services as localServices } from "@/content/pages/services";
import { glossaryPage } from "@/content/pages/glossary";
import { home as localHome } from "@/content/pages/home";
import { newsroomPage as localNewsroomPage } from "@/content/pages/newsroom";
import { notFoundPage } from "@/content/pages/not-found";
import { partnersPage } from "@/content/pages/partners";
import { insightsPage } from "@/content/pages/insights";
import { pricing as localPricing } from "@/content/pages/pricing";
import { sectorPages, sectorSections, sectorTemplate, type SectorSlug } from "@/content/pages/sectors";
import { sectorMaps } from "@/content/pages/sectors-map";
import { sectorsPublicSector } from "@/content/pages/sectors-public-sector";
import { solutions } from "@/content/pages/solutions";
import { solutionsEis } from "@/content/pages/solutions-eis";
import { solutionsLife } from "@/content/pages/solutions-life";
import { site as localSite } from "@/content/site";
import { siteMap } from "@/content/site-map";
import { ui } from "@/content/ui";
import {
  getCmsCareerQas,
  getCmsCustomerStories,
  getCmsCustomerStory,
  getCmsFaqs,
  getCmsGlossaryTerms,
  getCmsHiringSteps,
  getCmsInsight,
  getCmsInsightCategories,
  getCmsInsights,
  getCmsJobOpenings,
  getCmsLeaders,
  getCmsMediaKit,
  getCmsMediaPortraits,
  getCmsPressRelease,
  getCmsPressReleases,
  getCmsProgrammes,
  getCmsRecognitions,
  getCmsSiteSetting,
  getCmsTeam,
  getCmsTestimonials,
  cmsImageUrl,
  adaptCustomerStory,
  adaptFaq,
  adaptGlossaryTerm,
  adaptInsight,
  adaptJobOpeningToRole,
  adaptNavigation,
  adaptPersonToLeader,
  adaptPersonToTeamMember,
  adaptPressRelease,
} from "@/services/cms";
import type { Faq } from "@/content/types";

/* ------------------------------------------------------------------ */
/*  Content API: the only way routes read content                      */
/* ------------------------------------------------------------------ */
/* Every page, layout and route handler reads its content through these
   functions; components never import a content document directly (they
   receive it as props, or read interface strings with useUi()).

   CMS Integration:
   - Queries the Dhira CMS (Strapi) via typed client functions in
     src/services/cms/client.ts.
   - Adapts CMS schemas to the existing page and component contracts.
   - Falls back gracefully to local content in src/content/ when the CMS
     is unreachable, maintaining build and offline stability.
   - All getters are async and wrapped in React cache() so data is fetched
     at most once per request. */

/* ---------------- Singletons ---------------- */

export const getSiteSettings = cache(async () => {
  const cmsSite = await getCmsSiteSetting();
  if (!cmsSite) return localSite;

  return {
    ...localSite,
    tagline: cmsSite.footerTagline ?? localSite.tagline,
    email: cmsSite.contactEmail ?? localSite.email,
    productLine: cmsSite.copyright ?? localSite.productLine,
    offices:
      cmsSite.offices && cmsSite.offices.length > 0
        ? cmsSite.offices.map((o) => ({
            city: o.name,
            country: o.country ?? "",
            region: o.region ?? "",
            zone: o.timeZone ?? "",
          }))
        : localSite.offices,
    social:
      cmsSite.social && cmsSite.social.length > 0
        ? cmsSite.social.map((s) => ({ label: s.platform, href: s.url }))
        : localSite.social,
  };
});

export const getNavigation = cache(async () => {
  const cmsSite = await getCmsSiteSetting();
  if (!cmsSite) return localNavigation;
  return adaptNavigation(cmsSite, localNavigation);
});

export const getUiStrings = cache(async () => ui);

/** The site map's static route groups and copy (lib/routes.ts adds the collections). */
export const getSiteMap = cache(async () => siteMap);

/* ---------------- Pages ---------------- */

const pages = {
  home: localHome,
  about: localAbout,
  akashic: localAkashic,
  "akashic/1-0": akashicRelease,
  careers: localCareers,
  services: localServices,
  solutions,
  "solutions/enterprise-intelligence": solutionsEis,
  "solutions/life": solutionsLife,
  "sectors/public-sector": sectorsPublicSector,
  pricing: localPricing,
  insights: insightsPage,
  customers: customersPage,
  newsroom: localNewsroomPage,
  glossary: glossaryPage,
  contact: contactPage,
  partners: partnersPage,
  "not-found": notFoundPage,
};

export type PageKey = keyof typeof pages;

export const getPage = cache(async <K extends PageKey>(key: K): Promise<(typeof pages)[K]> => {
  switch (key) {
    case "home": {
      const [cmsTestimonials, cmsProgrammes] = await Promise.all([getCmsTestimonials("home"), getCmsProgrammes()]);
      void cmsProgrammes;
      if (!cmsTestimonials || cmsTestimonials.length === 0) return pages[key];

      return {
        ...localHome,
        voices: {
          ...localHome.voices,
          dispatches: cmsTestimonials.map((t, idx) => ({
            quote: t.quote,
            name: t.name,
            role: t.role ?? "",
            org: t.organisation ?? "",
            index: String(idx + 1).padStart(2, "0"),
            avatarPath: t.photo ? cmsImageUrl(t.photo.url) : localHome.voices.dispatches[idx]?.avatarPath ?? "",
          })),
        },
      } as (typeof pages)[K];
    }

    case "about": {
      const cmsTeam = await getCmsTeam();
      if (!cmsTeam || cmsTeam.length === 0) return pages[key];

      return {
        ...localAbout,
        culture: {
          ...localAbout.culture,
          team: {
            ...localAbout.culture.team,
            members: cmsTeam.map(adaptPersonToTeamMember),
          },
        },
      } as (typeof pages)[K];
    }

    case "akashic": {
      const cmsFaqs = await getCmsFaqs("akashic");
      if (!cmsFaqs || cmsFaqs.length === 0) return pages[key];

      return {
        ...localAkashic,
        faq: {
          ...localAkashic.faq,
          items: cmsFaqs.map(adaptFaq),
        },
      } as (typeof pages)[K];
    }

    case "careers": {
      const [cmsQas, cmsSteps] = await Promise.all([getCmsCareerQas(), getCmsHiringSteps()]);
      let page = localCareers;

      if (cmsQas && cmsQas.length > 0) {
        page = {
          ...page,
          culture: {
            ...page.culture,
            qa: {
              fresher: cmsQas.map((item, idx) => ({
                num: item.code ?? `W${String(idx + 1).padStart(2, "0")}`,
                principle: item.principle ?? "",
                question: item.questionFresher,
                answer: item.answerFresher,
              })),
              experienced: cmsQas.map((item, idx) => ({
                num: item.code ?? `W${String(idx + 1).padStart(2, "0")}`,
                principle: item.principle ?? "",
                question: item.questionExperienced ?? item.questionFresher,
                answer: item.answerExperienced ?? item.answerFresher,
              })),
            },
          },
        };
      }

      if (cmsSteps && cmsSteps.length > 0) {
        page = {
          ...page,
          hiring: {
            ...page.hiring,
            steps: cmsSteps.map((s, idx) => ({
              num: String(s.order ?? idx + 1).padStart(2, "0"),
              name: s.title,
              tag: localCareers.hiring.steps[idx]?.tag ?? "Step",
              description: s.text ?? "",
            })),
          },
        };
      }

      return page as (typeof pages)[K];
    }

    case "services": {
      const cmsFaqs = await getCmsFaqs("services");
      if (!cmsFaqs || cmsFaqs.length === 0) return pages[key];

      const grouped: Record<string, Faq[]> = {};
      for (const f of cmsFaqs) {
        const groupName = f.group || "General";
        if (!grouped[groupName]) grouped[groupName] = [];
        grouped[groupName].push(adaptFaq(f));
      }

      return {
        ...localServices,
        faq: {
          ...localServices.faq,
          groups: Object.entries(grouped).map(([heading, items]) => ({
            heading,
            items,
          })),
        },
      } as (typeof pages)[K];
    }

    case "pricing": {
      const cmsFaqs = await getCmsFaqs("pricing");
      if (!cmsFaqs || cmsFaqs.length === 0) return pages[key];

      const grouped: Record<string, Faq[]> = {};
      for (const f of cmsFaqs) {
        const groupName = f.group || "Plans and terms";
        if (!grouped[groupName]) grouped[groupName] = [];
        grouped[groupName].push(adaptFaq(f));
      }

      return {
        ...localPricing,
        faq: {
          ...localPricing.faq,
          groups: Object.entries(grouped).map(([heading, items]) => ({
            heading,
            items,
          })),
        },
      } as (typeof pages)[K];
    }

    case "newsroom": {
      const [cmsRecognitions, cmsMediaKit, cmsPortraits] = await Promise.all([
        getCmsRecognitions(),
        getCmsMediaKit(),
        getCmsMediaPortraits(),
      ]);
      void cmsPortraits;
      let page = localNewsroomPage;

      if (cmsRecognitions && cmsRecognitions.length > 0) {
        page = {
          ...page,
          recognition: {
            ...page.recognition,
            items: cmsRecognitions.map((r) => ({
              year: r.year ?? "",
              name: r.title,
              detail: r.result ?? "",
            })),
          },
        };
      }

      if (cmsMediaKit) {
        page = {
          ...page,
          boilerplate: cmsMediaKit.boilerplate ?? page.boilerplate,
        };
      }

      return page as (typeof pages)[K];
    }

    default:
      return pages[key];
  }
});

/** One sector page: its document, its map scene, and the strings and
    section index every sector page shares. */
export const getSector = cache(async (slug: SectorSlug) => ({
  content: sectorPages[slug],
  map: sectorMaps[slug],
  template: sectorTemplate,
  sections: sectorSections,
}));

/* ---------------- Collections ---------------- */

export const getCustomerStories = cache(async () => {
  const cmsStories = await getCmsCustomerStories();
  if (!cmsStories || cmsStories.length === 0) return localCustomerStories;
  return cmsStories.map(adaptCustomerStory);
});

export const getCustomerStory = cache(async (id: string) => {
  const cmsStory = await getCmsCustomerStory(id);
  if (cmsStory) return adaptCustomerStory(cmsStory);
  return localCustomerStories.find((story) => story.id === id) ?? null;
});

export const getRoles = cache(async () => {
  const cmsRoles = await getCmsJobOpenings();
  if (!cmsRoles || cmsRoles.length === 0) return localRoles;
  return cmsRoles.map(adaptJobOpeningToRole);
});

/** The policy pages (privacy, terms, cookies, accessibility, website policies). */
export const getLegalDocs = cache(async () => legalDocs);

export const getLegalDoc = cache(async (slug: string) => legalDocs.find((doc) => doc.slug === slug) ?? null);

/** Glossary terms, in authored order (lib/glossary.ts groups them A to Z). */
export const getGlossary = cache(async () => {
  const cmsTerms = await getCmsGlossaryTerms();
  if (!cmsTerms || cmsTerms.length === 0) return localGlossaryTerms;
  return cmsTerms.map(adaptGlossaryTerm);
});

export const getLeaders = cache(async () => {
  const cmsLeaders = await getCmsLeaders();
  if (!cmsLeaders || cmsLeaders.length === 0) return localLeaders;
  return cmsLeaders.map(adaptPersonToLeader);
});

/** Press releases, newest first. */
export const getPressReleases = cache(async () => {
  const cmsReleases = await getCmsPressReleases();
  if (!cmsReleases || cmsReleases.length === 0) {
    return [...localPressReleases].sort((a, b) => b.date.localeCompare(a.date));
  }
  return cmsReleases.map(adaptPressRelease).sort((a, b) => b.date.localeCompare(a.date));
});

export const getPressRelease = cache(async (slug: string) => {
  const cmsRelease = await getCmsPressRelease(slug);
  if (cmsRelease) return adaptPressRelease(cmsRelease);
  return localPressReleases.find((release) => release.slug === slug) ?? null;
});

/** Insights, newest first. */
export const getInsights = cache(async () => {
  const [cmsInsights, cmsCategories] = await Promise.all([getCmsInsights(), getCmsInsightCategories()]);
  void cmsCategories;
  if (!cmsInsights || cmsInsights.length === 0) {
    return [...localInsights].sort((a, b) => b.date.localeCompare(a.date));
  }
  return cmsInsights.map((i) => adaptInsight(i)).sort((a, b) => b.date.localeCompare(a.date));
});

export const getInsight = cache(async (slug: string) => {
  const cmsInsight = await getCmsInsight(slug);
  if (cmsInsight) return adaptInsight(cmsInsight);
  return localInsights.find((insight) => insight.slug === slug) ?? null;
});

/** Up to `count` other articles: same category first, then newest. */
export const getRelatedInsights = cache(async (slug: string, count = 2) => {
  const current = await getInsight(slug);
  const others = (await getInsights()).filter((insight) => insight.slug !== slug);
  return [
    ...others.filter((insight) => insight.category === current?.category),
    ...others.filter((insight) => insight.category !== current?.category),
  ].slice(0, count);
});
