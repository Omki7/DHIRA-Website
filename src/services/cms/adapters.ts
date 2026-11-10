import type { Story } from "@/content/collections/customer-stories";
import type { GlossaryTerm } from "@/content/collections/glossary";
import type { Insight, InsightCategory, InsightCover } from "@/content/collections/insights";
import type { Leader } from "@/content/collections/leaders";
import type { PressRelease } from "@/content/collections/press-releases";
import type { Role } from "@/content/collections/roles";
import type { AboutTeamMember } from "@/content/collections/about-team";
import type { Navigation, NavMenu, NavGroup } from "@/content/navigation";
import type { Block, Faq } from "@/content/types";
import { cmsImageUrl } from "./client";
import type {
  CustomerStory as CmsCustomerStory,
  Faq as CmsFaq,
  GlossaryTerm as CmsGlossaryTerm,
  Insight as CmsInsight,
  JobOpening as CmsJobOpening,
  Person as CmsPerson,
  PressRelease as CmsPressRelease,
  SiteSetting as CmsSiteSetting,
} from "./types";

/* ------------------------------------------------------------------ */
/*  Navigation & Site Settings Adapter                                */
/* ------------------------------------------------------------------ */

export function adaptNavigation(cms: CmsSiteSetting, localNav: Navigation): Navigation {
  // 1. Announcement bar
  let announcement = localNav.announcement;
  if (cms.announcementBar) {
    if (cms.announcementBar.enabled === false) {
      announcement = null;
    } else {
      announcement = {
        label: cms.announcementBar.label ?? "",
        text: cms.announcementBar.text,
        cta: cms.announcementBar.ctaLabel ?? "",
        href: cms.announcementBar.url ?? "",
      };
    }
  }

  // 2. Header CTA
  const cta = cms.headerCta ? { label: cms.headerCta.label, href: cms.headerCta.url } : localNav.cta;

  // 3. Footer
  const footer = {
    ...localNav.footer,
    columns:
      cms.footerColumns && cms.footerColumns.length > 0
        ? cms.footerColumns.map((col) => ({
            groups: [
              {
                heading: col.title,
                links: (col.links ?? []).map((l) => ({ label: l.label, href: l.url })),
              },
            ],
          }))
        : localNav.footer.columns,
    legal:
      cms.legalLinks && cms.legalLinks.length > 0
        ? cms.legalLinks.map((l) => ({ label: l.label, href: l.url }))
        : localNav.footer.legal,
    contact: cms.contactEmail
      ? { label: cms.contactEmail, href: cms.contactEmailUrl ?? localNav.footer.contact.href }
      : localNav.footer.contact,
  };

  // 4. Menus & Submenus
  let menus = localNav.menus;
  if (cms.navigation && cms.navigation.length > 0) {
    menus = localNav.menus.map((localMenu): NavMenu => {
      const cmsMenu = cms.navigation?.find((m) => m.key === localMenu.id);
      if (!cmsMenu) return localMenu;

      const activePaths = cmsMenu.activePaths
        ? cmsMenu.activePaths.split(",").map((p) => p.trim())
        : localMenu.match;

      const lead = {
        title: cmsMenu.lead?.title ?? localMenu.lead.title,
        text: cmsMenu.lead?.text ?? localMenu.lead.text,
        href: cmsMenu.lead?.url ?? localMenu.lead.href,
        cta: cmsMenu.lead?.ctaLabel ?? localMenu.lead.cta,
        span: localMenu.lead.span,
      };

      let feature = localMenu.feature;
      if (cmsMenu.feature) {
        const feat = cmsMenu.feature;
        if ("in" in localMenu.feature && "intl" in localMenu.feature) {
          feature = {
            in: {
              ...localMenu.feature.in,
              eyebrow: feat.eyebrow ?? localMenu.feature.in.eyebrow,
              title: feat.title,
              caption: feat.caption ?? localMenu.feature.in.caption,
              href: feat.url ?? localMenu.feature.in.href,
              cta: feat.ctaLabel ?? localMenu.feature.in.cta,
            },
            intl: {
              ...localMenu.feature.intl,
              eyebrow: feat.eyebrow ?? localMenu.feature.intl.eyebrow,
              title: feat.title,
              caption: feat.caption ?? localMenu.feature.intl.caption,
              href: feat.url ?? localMenu.feature.intl.href,
              cta: feat.ctaLabel ?? localMenu.feature.intl.cta,
            },
          };
        } else {
          feature = {
            ...localMenu.feature,
            eyebrow: feat.eyebrow ?? localMenu.feature.eyebrow,
            title: feat.title,
            caption: feat.caption ?? localMenu.feature.caption,
            href: feat.url ?? localMenu.feature.href,
            cta: feat.ctaLabel ?? localMenu.feature.cta,
          };
        }
      }

      const groups: NavGroup[] =
        cmsMenu.groups && cmsMenu.groups.length > 0
          ? cmsMenu.groups.map((cmsGroup, idx): NavGroup => {
              const localGroup = localMenu.groups[idx];
              return {
                heading: cmsGroup.heading,
                span: localGroup?.span ?? 2,
                twoColumn: localGroup?.twoColumn,
                divided: localGroup?.divided,
                links:
                  cmsGroup.items && cmsGroup.items.length > 0
                    ? cmsGroup.items.map((it) => ({
                        label: it.label,
                        href: it.url,
                        caption: it.caption ?? undefined,
                        preview: it.isPreview ?? undefined,
                      }))
                    : (localGroup?.links ?? []),
              };
            })
          : localMenu.groups;

      return {
        id: localMenu.id,
        label: cmsMenu.label,
        match: activePaths,
        lead,
        feature,
        groups,
      };
    });
  }

  return {
    menus,
    announcement,
    cta,
    footer,
  };
}

/* ------------------------------------------------------------------ */
/*  Markdown to Block[] Parser                                        */
/* ------------------------------------------------------------------ */

export function markdownToBlocks(markdown?: string | null): Block[] {
  if (!markdown) return [];
  const blocks: Block[] = [];
  const rawSections = markdown.replace(/\r\n/g, "\n").split(/\n\s*\n/);

  for (const raw of rawSections) {
    const text = raw.trim();
    if (!text) continue;

    // Heading 2: ## Title
    if (text.startsWith("## ")) {
      const heading = text.replace(/^##\s+/, "").trim();
      const id = heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      blocks.push({ type: "h2", id, text: heading });
      continue;
    }

    // Heading 3: ### Title
    if (text.startsWith("### ")) {
      blocks.push({ type: "h3", text: text.replace(/^###\s+/, "").trim() });
      continue;
    }

    // Blockquote: > Quote
    if (text.startsWith("> ")) {
      const quote = text
        .split("\n")
        .map((line) => line.replace(/^>\s?/, ""))
        .join(" ")
        .trim();
      blocks.push({ type: "quote", text: quote });
      continue;
    }

    // Unordered List: - item or * item
    if (/^[-*]\s+/m.test(text)) {
      const items = text
        .split("\n")
        .filter((line) => /^[-*]\s+/.test(line.trim()))
        .map((line) => line.trim().replace(/^[-*]\s+/, ""));
      if (items.length > 0) {
        blocks.push({ type: "ul", items });
        continue;
      }
    }

    // Ordered List: 1. item
    if (/^\d+\.\s+/m.test(text)) {
      const items = text
        .split("\n")
        .filter((line) => /^\d+\.\s+/.test(line.trim()))
        .map((line) => line.trim().replace(/^\d+\.\s+/, ""));
      if (items.length > 0) {
        blocks.push({ type: "ol", items });
        continue;
      }
    }

    // Default: Paragraph
    blocks.push({ type: "p", text });
  }

  return blocks;
}

/* ------------------------------------------------------------------ */
/*  Customer Story Adapter                                            */
/* ------------------------------------------------------------------ */

export function adaptCustomerStory(cms: CmsCustomerStory): Story {
  const bodyBlocks: Block[] = [];
  if (cms.sections && cms.sections.length > 0) {
    for (const sec of cms.sections) {
      if (sec.heading) {
        const id = sec.anchor || sec.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        bodyBlocks.push({ type: "h2", id, text: sec.heading });
      }
      if (sec.body) {
        bodyBlocks.push(...markdownToBlocks(sec.body));
      }
    }
  }

  const rawSector = cms.sector ?? "Country-scale deployment";
  const primarySector = rawSector.split("·")[0]?.trim() || rawSector;

  return {
    id: cms.slug,
    platform: cms.programmeName,
    authority: rawSector,
    sector: primarySector,
    title: cms.title,
    description: cms.summary,
    image: cms.photo ? cmsImageUrl(cms.photo.url) : "/proof/learning.jpg",
    alt: cms.photo?.alternativeText ?? cms.photoCaption ?? cms.title,
    metrics: (cms.metrics ?? []).map((m) => ({ value: m.value, label: m.label })),
    modules: cms.builtOn ?? [],
    body: bodyBlocks,
  };
}

/* ------------------------------------------------------------------ */
/*  Insights Adapter                                                  */
/* ------------------------------------------------------------------ */

const VALID_CATEGORIES: Set<string> = new Set([
  "AI strategy",
  "Data foundations",
  "Governance",
  "Platform decisions",
  "Public sector",
]);

export function adaptInsight(cms: CmsInsight, defaultCover: InsightCover = "handoff"): Insight {
  const blocks: Block[] = [];
  if (cms.body && cms.body.length > 0) {
    for (const item of cms.body) {
      if (item.__component === "shared.section") {
        if (item.heading) {
          const id = item.anchor || item.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
          blocks.push({ type: "h2", id, text: item.heading });
        }
        if (item.body) {
          blocks.push(...markdownToBlocks(item.body));
        }
      } else if (item.__component === "shared.quote") {
        blocks.push({
          type: "quote",
          text: item.text,
          cite: item.attribution ?? undefined,
        });
      } else if (item.__component === "shared.callout") {
        blocks.push({
          type: "note",
          label: item.title ?? "Note",
          text: item.body,
        });
      }
    }
  }

  const catName = cms.category?.name ?? "AI strategy";
  const category: InsightCategory = VALID_CATEGORIES.has(catName) ? (catName as InsightCategory) : "AI strategy";

  return {
    slug: cms.slug,
    title: cms.title,
    dek: cms.dek,
    category,
    cover: defaultCover,
    date: cms.publishedDate ?? new Date().toISOString().split("T")[0],
    author: {
      name: cms.author ?? "DHIRA Team",
      role: cms.authorTagline ?? "Applied AI and Engineering",
    },
    preview: cms.isPreview ?? false,
    takeaway: cms.decisionInBrief ?? cms.dek,
    sources: (cms.sources ?? []).map((s) => ({
      title: s.label,
      publisher: s.publisher ?? "",
      href: s.url ?? "",
    })),
    blocks,
  };
}

/* ------------------------------------------------------------------ */
/*  Glossary Term Adapter                                             */
/* ------------------------------------------------------------------ */

export function adaptGlossaryTerm(cms: CmsGlossaryTerm): GlossaryTerm {
  return {
    id: cms.slug,
    term: cms.term,
    definition: cms.definition,
    inAkashic: cms.inAkashic ?? undefined,
    href: cms.seeWhereUrl ?? undefined,
  };
}

/* ------------------------------------------------------------------ */
/*  Person to Leader / Team Member                                    */
/* ------------------------------------------------------------------ */

export function adaptPersonToLeader(cms: CmsPerson): Leader {
  return {
    id: cms.documentId || cms.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: cms.name,
    role: cms.jobTitle ?? "",
    focus: cms.bio ?? cms.teamBio ?? "",
    image: cms.photo ? cmsImageUrl(cms.photo.url) : "",
    imageClass: "object-center",
  };
}

export function adaptPersonToTeamMember(cms: CmsPerson): AboutTeamMember {
  const id = cms.teamKey || cms.documentId || cms.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const photo = cms.teamPhoto ?? cms.photo;

  let framingObj: { scale: number; x: number; y: number } | undefined;
  if (cms.framing && typeof cms.framing === "object" && "scale" in cms.framing && "x" in cms.framing && "y" in cms.framing) {
    framingObj = cms.framing as { scale: number; x: number; y: number };
  }

  return {
    id,
    name: cms.name,
    role: cms.jobTitle ?? undefined,
    bio: cms.teamBio ?? cms.bio ?? "",
    image: photo ? { src: cmsImageUrl(photo.url), alt: cms.name } : undefined,
    position: cms.position ?? "50% 20%",
    framing: framingObj,
    sourceUrl: cms.sourceUrl ?? undefined,
  };
}

/* ------------------------------------------------------------------ */
/*  Open Roles Adapter                                                */
/* ------------------------------------------------------------------ */

export function adaptJobOpeningToRole(cms: CmsJobOpening): Role {
  return {
    dept: cms.team,
    seat: cms.team,
    title: cms.title,
    desc: cms.description ? cms.description.replace(/^#+\s*/, "").slice(0, 120) : "",
    location: cms.location ?? "Remote",
    type: cms.workType ?? "Full time",
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ Adapter                                                       */
/* ------------------------------------------------------------------ */

export function adaptFaq(cms: CmsFaq): Faq {
  return {
    question: cms.question,
    answer: cms.answer,
  };
}

/* ------------------------------------------------------------------ */
/*  Press Release Adapter                                             */
/* ------------------------------------------------------------------ */

export function adaptPressRelease(cms: CmsPressRelease): PressRelease {
  const blocks: Block[] = [];
  if (cms.sections && cms.sections.length > 0) {
    for (const sec of cms.sections) {
      if (sec.heading) {
        const id = sec.anchor || sec.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        blocks.push({ type: "h2", id, text: sec.heading });
      }
      if (sec.body) {
        blocks.push(...markdownToBlocks(sec.body));
      }
    }
  }

  if (cms.pullQuote) {
    blocks.push({
      type: "quote",
      text: cms.pullQuote.text,
      cite: cms.pullQuote.personName ?? undefined,
    });
  }

  return {
    slug: cms.slug,
    title: cms.headline,
    dek: cms.summary ?? "",
    date: cms.releaseDate ?? new Date().toISOString().split("T")[0],
    dateline: cms.datelinePlaces ?? "Hyderabad and New York",
    blocks,
  };
}
