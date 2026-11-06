import "server-only";
import { env } from "@/config/env";
import type {
  CareerQa,
  CustomerStory,
  Faq,
  GlossaryTerm,
  HiringStep,
  Insight,
  InsightCategory,
  JobOpening,
  MediaKit,
  Person,
  PressRelease,
  Programme,
  Recognition,
  SiteSetting,
  StrapiList,
  StrapiSingle,
  Testimonial,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Dhira CMS API Client (Strapi v5)                                  */
/* ------------------------------------------------------------------ */
/* Implements the 15 CMS endpoints defined in api-contract.md.
   - Public and read-only (no auth header needed).
   - Server-only execution with Next.js ISR (revalidate: 60s).
   - Timeouts and network failure fail safely to null, allowing
     adapters in src/services/content to fall back to typed local docs. */

const TIMEOUT_MS = 5000;
let cmsUnavailableUntil = 0;
const COOLDOWN_MS = 30000;

export function cmsImageUrl(relativeOrAbsoluteUrl?: string | null): string {
  if (!relativeOrAbsoluteUrl) return "";
  if (relativeOrAbsoluteUrl.startsWith("http://") || relativeOrAbsoluteUrl.startsWith("https://")) {
    return relativeOrAbsoluteUrl;
  }
  const base = env.cmsUrl.replace(/\/$/, "");
  const path = relativeOrAbsoluteUrl.startsWith("/") ? relativeOrAbsoluteUrl : `/${relativeOrAbsoluteUrl}`;
  return `${base}${path}`;
}

async function fetchFromCms<T>(pathAndQuery: string, tags?: string[]): Promise<T | null> {
  const now = Date.now();
  if (now < cmsUnavailableUntil) {
    return null;
  }

  const url = `${env.cmsUrl.replace(/\/$/, "")}${pathAndQuery.startsWith("/") ? pathAndQuery : `/${pathAndQuery}`}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    console.log(`[CMS API] -> GET ${url}`);
    const res = await fetch(url, {
      signal: controller.signal,
      next: {
        revalidate: 60,
        ...(tags && tags.length > 0 ? { tags } : {}),
      },
      headers: {
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      if (res.status === 404) {
        console.log(`[CMS API] <- 404 Not Found: ${pathAndQuery}`);
        return null;
      }
      console.warn(`[CMS API] <- HTTP ${res.status} from ${pathAndQuery}`);
      return null;
    }

    // Success - reset breaker
    cmsUnavailableUntil = 0;
    console.log(`[CMS API] <- ${res.status} OK: ${pathAndQuery}`);
    return (await res.json()) as T;
  } catch (error) {
    cmsUnavailableUntil = Date.now() + COOLDOWN_MS;
    if (error instanceof Error && error.name === "AbortError") {
      console.warn(`[CMS API] Timed out (${TIMEOUT_MS}ms) for ${url}. Circuit breaker opened for 30s.`);
    } else {
      console.warn(
        `[CMS API] Unreachable at ${url}: ${error instanceof Error ? error.message : String(error)}. Circuit breaker opened for 30s.`,
      );
    }
    return null;
  } finally {
    clearTimeout(timer);
  }
}

/* ------------------------------------------------------------------ */
/*  Site-Wide Singletons                                              */
/* ------------------------------------------------------------------ */

export async function getCmsSiteSetting(): Promise<SiteSetting | null> {
  const query =
    "/api/site-setting?populate[announcementBar]=true&populate[headerCta]=true&populate[navigation][populate][lead]=true&populate[navigation][populate][groups][populate][items]=true&populate[navigation][populate][feature]=true&populate[offices]=true&populate[contactRoutes]=true&populate[footerColumns][populate][links]=true&populate[legalLinks]=true&populate[social]=true";
  const res = await fetchFromCms<StrapiSingle<SiteSetting>>(query, ["site-setting"]);
  return res?.data ?? null;
}

export async function getCmsMediaKit(): Promise<MediaKit | null> {
  const query = "/api/media-kit?populate[marks][populate][file]=true&populate[colours]=true&populate[typefaces]=true";
  const res = await fetchFromCms<StrapiSingle<MediaKit>>(query, ["media-kit"]);
  return res?.data ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: Customer Stories & Programmes                        */
/* ------------------------------------------------------------------ */

export async function getCmsProgrammes(): Promise<Programme[] | null> {
  const query =
    "/api/programmes?sort=order:asc&populate[photo]=true&populate[metrics]=true&populate[story][fields][0]=slug&populate[story][fields][1]=title";
  const res = await fetchFromCms<StrapiList<Programme>>(query, ["programmes"]);
  return res?.data ?? null;
}

export async function getCmsCustomerStories(): Promise<CustomerStory[] | null> {
  const query =
    "/api/customer-stories?sort=title:asc&fields[0]=title&fields[1]=slug&fields[2]=programmeName&fields[3]=sector&fields[4]=summary&populate[photo]=true&populate[metrics]=true";
  const res = await fetchFromCms<StrapiList<CustomerStory>>(query, ["customer-stories"]);
  return res?.data ?? null;
}

export async function getCmsCustomerStory(slug: string): Promise<CustomerStory | null> {
  const query = `/api/customer-stories?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[photo]=true&populate[metrics]=true&populate[sections]=true&populate[seo]=true&populate[related][fields][0]=title&populate[related][fields][1]=slug&populate[related][fields][2]=programmeName&populate[related][fields][3]=sector&populate[related][fields][4]=summary`;
  const res = await fetchFromCms<StrapiList<CustomerStory>>(query, [`customer-story:${slug}`]);
  return res?.data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: Testimonials                                         */
/* ------------------------------------------------------------------ */

export async function getCmsTestimonials(placement?: "home" | "akashic"): Promise<Testimonial[] | null> {
  const placementFilter = placement ? `&filters[placements][$containsi]=${encodeURIComponent(placement)}` : "";
  const query = `/api/testimonials?sort=order:asc&populate[photo]=true${placementFilter}`;
  const res = await fetchFromCms<StrapiList<Testimonial>>(query, ["testimonials"]);
  return res?.data ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: FAQs                                                 */
/* ------------------------------------------------------------------ */

export async function getCmsFaqs(page: Faq["page"]): Promise<Faq[] | null> {
  const query = `/api/faqs?filters[page][$eq]=${encodeURIComponent(page)}&sort=order:asc&pagination[pageSize]=100`;
  const res = await fetchFromCms<StrapiList<Faq>>(query, [`faqs:${page}`]);
  return res?.data ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: Insights                                             */
/* ------------------------------------------------------------------ */

export async function getCmsInsightCategories(): Promise<InsightCategory[] | null> {
  const query = "/api/insight-categories?sort=order:asc";
  const res = await fetchFromCms<StrapiList<InsightCategory>>(query, ["insight-categories"]);
  return res?.data ?? null;
}

export async function getCmsInsights(): Promise<Insight[] | null> {
  const query =
    "/api/insights?sort=publishedDate:desc&pagination[pageSize]=100&fields[0]=title&fields[1]=slug&fields[2]=dek&fields[3]=author&fields[4]=publishedDate&fields[5]=readMinutes&fields[6]=isFeatured&fields[7]=isPreview&populate[category][fields][0]=name&populate[category][fields][1]=slug&populate[coverImage]=true";
  const res = await fetchFromCms<StrapiList<Insight>>(query, ["insights"]);
  return res?.data ?? null;
}

export async function getCmsInsight(slug: string): Promise<Insight | null> {
  const query = `/api/insights?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[category]=true&populate[body]=true&populate[sources]=true&populate[seo][populate][shareImage]=true&populate[coverImage]=true&populate[related][fields][0]=title&populate[related][fields][1]=slug&populate[related][fields][2]=dek`;
  const res = await fetchFromCms<StrapiList<Insight>>(query, [`insight:${slug}`]);
  return res?.data?.[0] ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: Glossary Terms                                       */
/* ------------------------------------------------------------------ */

export async function getCmsGlossaryTerms(): Promise<GlossaryTerm[] | null> {
  const query = "/api/glossary-terms?sort=term:asc&pagination[pageSize]=100";
  const res = await fetchFromCms<StrapiList<GlossaryTerm>>(query, ["glossary-terms"]);
  return res?.data ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: People (Leadership & Team Grid)                      */
/* ------------------------------------------------------------------ */

export async function getCmsLeaders(): Promise<Person[] | null> {
  const query =
    "/api/people?filters[group][$in][0]=founder&filters[group][$in][1]=leadership&sort[0]=group:asc&sort[1]=order:asc&populate[photo]=true";
  const res = await fetchFromCms<StrapiList<Person>>(query, ["people:leaders"]);
  return res?.data ?? null;
}

export async function getCmsTeam(): Promise<Person[] | null> {
  const query =
    "/api/people?filters[teamOrder][$notNull]=true&sort=teamOrder:asc&pagination[pageSize]=100&populate[photo]=true";
  const res = await fetchFromCms<StrapiList<Person>>(query, ["people:team"]);
  return res?.data ?? null;
}

export async function getCmsMediaPortraits(): Promise<Person[] | null> {
  const query =
    "/api/people?filters[downloadablePortrait][$notNull]=true&sort=order:asc&fields[0]=name&fields[1]=jobTitle&populate[downloadablePortrait]=true";
  const res = await fetchFromCms<StrapiList<Person>>(query, ["people:portraits"]);
  return res?.data ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: Press Releases & Recognitions                        */
/* ------------------------------------------------------------------ */

export async function getCmsPressReleases(): Promise<PressRelease[] | null> {
  const query =
    "/api/press-releases?sort=releaseDate:desc&fields[0]=headline&fields[1]=slug&fields[2]=releaseDate&fields[3]=summary&fields[4]=datelinePlaces";
  const res = await fetchFromCms<StrapiList<PressRelease>>(query, ["press-releases"]);
  return res?.data ?? null;
}

export async function getCmsPressRelease(slug: string): Promise<PressRelease | null> {
  const query = `/api/press-releases?filters[slug][$eq]=${encodeURIComponent(slug)}&populate[sections]=true&populate[pullQuote]=true&populate[seo]=true&populate[relatedInsights][fields][0]=title&populate[relatedInsights][fields][1]=slug`;
  const res = await fetchFromCms<StrapiList<PressRelease>>(query, [`press-release:${slug}`]);
  return res?.data?.[0] ?? null;
}

export async function getCmsRecognitions(): Promise<Recognition[] | null> {
  const query = "/api/recognitions?sort=order:asc";
  const res = await fetchFromCms<StrapiList<Recognition>>(query, ["recognitions"]);
  return res?.data ?? null;
}

/* ------------------------------------------------------------------ */
/*  Collections: Careers (Roles, Q&A, Hiring Steps)                   */
/* ------------------------------------------------------------------ */

export async function getCmsJobOpenings(): Promise<JobOpening[] | null> {
  const query = "/api/job-openings?filters[isOpen][$eq]=true&sort=order:asc";
  const res = await fetchFromCms<StrapiList<JobOpening>>(query, ["job-openings"]);
  return res?.data ?? null;
}

export async function getCmsCareerQas(): Promise<CareerQa[] | null> {
  const query = "/api/career-qas?sort=order:asc";
  const res = await fetchFromCms<StrapiList<CareerQa>>(query, ["career-qas"]);
  return res?.data ?? null;
}

export async function getCmsHiringSteps(): Promise<HiringStep[] | null> {
  const query = "/api/hiring-steps?sort=order:asc";
  const res = await fetchFromCms<StrapiList<HiringStep>>(query, ["hiring-steps"]);
  return res?.data ?? null;
}
