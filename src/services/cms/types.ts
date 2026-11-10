/**
 * Dhira CMS TypeScript Types
 * Generated from the Dhira CMS API Contract (v1.0 - 2026-11-05).
 * Fields marked with `?:` are only present when requested with `populate`.
 */

export interface StrapiList<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingle<T> {
  data: T;
  meta: Record<string, never>;
}

export interface StrapiError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details?: unknown;
  };
}

export interface MediaFormat {
  url: string;
  width: number;
  height: number;
  mime: string;
}

export interface Media {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number | null;
  height: number | null;
  mime: string;
  size: number;
  /** Relative URL: prefix with CMS base address */
  url: string;
  formats: Partial<Record<"thumbnail" | "small" | "medium" | "large", MediaFormat>> | null;
}

/** Colour */
export interface BrandColour {
  id: number;
  name: string | null;
  hex: string;
}

/** Brand mark */
export interface BrandMark {
  id: number;
  label: string;
  background: null | "light" | "dark";
  file?: Media | null;
}

/** Typeface */
export interface BrandTypeface {
  id: number;
  name: string;
  usage: string | null;
}

/** Callout */
export interface SharedCallout {
  id: number;
  title: string | null;
  /** Markdown text */
  body: string;
}

export interface BlockSharedCallout extends SharedCallout {
  __component: "shared.callout";
}

/** Link */
export interface SharedLink {
  id: number;
  label: string;
  url: string;
}

/** Metric */
export interface SharedMetric {
  id: number;
  value: string;
  label: string;
}

/** Pull quote */
export interface SharedPullQuote {
  id: number;
  text: string;
  personName: string | null;
}

/** Quote */
export interface SharedQuote {
  id: number;
  text: string;
  attribution: string | null;
}

export interface BlockSharedQuote extends SharedQuote {
  __component: "shared.quote";
}

/** Section */
export interface SharedSection {
  id: number;
  heading: string | null;
  anchor: string | null;
  /** Markdown text */
  body: string;
}

export interface BlockSharedSection extends SharedSection {
  __component: "shared.section";
}

/** SEO */
export interface SharedSeo {
  id: number;
  seoTitle: string | null;
  seoDescription: string | null;
  shareImage?: Media | null;
}

/** Source */
export interface SharedSource {
  id: number;
  label: string;
  publisher: string | null;
  url: string | null;
}

/** Announcement bar */
export interface SiteAnnouncementBar {
  id: number;
  enabled: boolean | null;
  label: string | null;
  text: string;
  ctaLabel: string | null;
  url: string | null;
}

/** Contact route */
export interface SiteContactRoute {
  id: number;
  title: string;
  description: string | null;
  linkLabel: string | null;
  url: string;
}

/** Footer column */
export interface SiteFooterColumn {
  id: number;
  title: string;
  links?: SharedLink[];
}

/** Menu feature card */
export interface SiteMenuFeature {
  id: number;
  eyebrow: string | null;
  title: string;
  caption: string | null;
  url: string | null;
  ctaLabel: string | null;
}

/** Menu intro */
export interface SiteMenuLead {
  id: number;
  title: string;
  text: string | null;
  url: string | null;
  ctaLabel: string | null;
}

/** Menu group */
export interface SiteNavGroup {
  id: number;
  heading: string;
  items?: SiteNavItem[];
}

/** Menu item */
export interface SiteNavItem {
  id: number;
  label: string;
  url: string;
  caption: string | null;
  isPreview: boolean | null;
}

/** Menu */
export interface SiteNavMenu {
  id: number;
  key: string;
  label: string;
  activePaths: string | null;
  lead?: SiteMenuLead | null;
  groups?: SiteNavGroup[];
  feature?: SiteMenuFeature | null;
}

/** Office */
export interface SiteOffice {
  id: number;
  name: string;
  region: string | null;
  country: string | null;
  timeZone: string | null;
}

/** Social link */
export interface SiteSocialLink {
  id: number;
  platform: string;
  url: string;
}

/** Careers Q&A — GET /api/career-qas */
export interface CareerQa {
  id: number;
  documentId: string;
  code: string | null;
  principle: string | null;
  questionFresher: string;
  answerFresher: string;
  questionExperienced: string | null;
  answerExperienced: string | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Customer story — GET /api/customer-stories */
export interface CustomerStory {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  programmeName: string;
  sector: string | null;
  summary: string;
  photo?: Media | null;
  photoCaption: string | null;
  metrics?: SharedMetric[];
  sections?: SharedSection[];
  builtOn: string[] | null;
  related?: CustomerStory[];
  seo?: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** FAQ — GET /api/faqs */
export interface Faq {
  id: number;
  documentId: string;
  question: string;
  answer: string /* Markdown */;
  page: "akashic" | "services" | "enterprise-intelligence" | "life" | "pricing" | "careers" | "other";
  group: string | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Glossary term — GET /api/glossary-terms */
export interface GlossaryTerm {
  id: number;
  documentId: string;
  term: string;
  slug: string;
  definition: string;
  inAkashic: string | null;
  seeWhereLabel: string | null;
  seeWhereUrl: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Hiring step — GET /api/hiring-steps */
export interface HiringStep {
  id: number;
  documentId: string;
  title: string;
  text: string | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type InsightBlock = BlockSharedSection | BlockSharedQuote | BlockSharedCallout;

/** Insight (essay) — GET /api/insights */
export interface Insight {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  category?: InsightCategory | null;
  isPreview: boolean | null;
  dek: string;
  author: string | null;
  publishedDate: string /* YYYY-MM-DD */ | null;
  readMinutes: number | null;
  isFeatured: boolean | null;
  authorTagline: string | null;
  coverImage?: Media | null;
  decisionInBrief: string | null /* Markdown */;
  body?: InsightBlock[];
  sources?: SharedSource[];
  related?: Insight[];
  seo?: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Insight category — GET /api/insight-categories */
export interface InsightCategory {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  order: number | null;
  insights?: Insight[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Open role — GET /api/job-openings */
export interface JobOpening {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  team: string;
  location: string | null;
  workType: string | null;
  isOpen: boolean | null;
  description: string | null /* Markdown */;
  applyUrl: string | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Media kit — GET /api/media-kit */
export interface MediaKit {
  id: number;
  documentId: string;
  boilerplate: string | null;
  marks?: BrandMark[];
  colours?: BrandColour[];
  typefaces?: BrandTypeface[];
  pressEmail: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Person — GET /api/people */
export interface Person {
  id: number;
  documentId: string;
  name: string;
  jobTitle: string | null;
  group: "founder" | "leadership" | "colleague";
  order: number | null;
  photo?: Media | null;
  downloadablePortrait?: Media | null;
  linkedinUrl: string | null;
  bio: string | null;
  teamBio: string | null;
  teamOrder: number | null;
  teamKey?: string | null;
  teamPhoto?: Media | null;
  position?: string | null;
  framing?: unknown;
  sourceUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Press release — GET /api/press-releases */
export interface PressRelease {
  id: number;
  documentId: string;
  headline: string;
  slug: string;
  datelinePlaces: string | null;
  releaseDate: string /* YYYY-MM-DD */ | null;
  summary: string | null;
  sections?: SharedSection[];
  pullQuote?: SharedPullQuote | null;
  mediaContactEmail: string | null;
  relatedInsights?: Insight[];
  seo?: SharedSeo | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Programme numbers — GET /api/programmes */
export interface Programme {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  sector: string | null;
  photo?: Media | null;
  metrics?: SharedMetric[];
  order: number | null;
  story?: CustomerStory | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Recognition — GET /api/recognitions */
export interface Recognition {
  id: number;
  documentId: string;
  year: string | null;
  title: string;
  result: string | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Site settings — GET /api/site-setting */
export interface SiteSetting {
  id: number;
  documentId: string;
  logoText: string | null;
  logoSubtext: string | null;
  announcementBar?: SiteAnnouncementBar | null;
  navigation?: SiteNavMenu[];
  headerCta?: SharedLink | null;
  footerTagline: string | null;
  offices?: SiteOffice[];
  contactRoutes?: SiteContactRoute[];
  contactEmail: string | null;
  contactEmailUrl: string | null;
  footerColumns?: SiteFooterColumn[];
  legalLinks?: SharedLink[];
  social?: SiteSocialLink[];
  copyright: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

/** Testimonial — GET /api/testimonials */
export interface Testimonial {
  id: number;
  documentId: string;
  quote: string;
  name: string;
  role: string | null;
  organisation: string | null;
  photo?: Media | null;
  placements: string[] | null;
  order: number | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
