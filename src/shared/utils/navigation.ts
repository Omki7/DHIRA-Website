import type { NavMenu } from "@/content/navigation";

/* Navigation logic. The menus themselves are content (content/navigation.ts). */

/** True when `pathname` sits inside a menu's section. */
export function isCurrentSection(menu: NavMenu, pathname: string): boolean {
  return menu.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/* Where a jump to a section lands (user, 5 Nov 2026: every jump "lands a
   bit down", with the content starting mid-screen). A page section lands
   on its eyebrow (`ui/FigureEyebrow`, data-section-eyebrow) with a little
   air above it, whatever the section's own top padding. Anything else
   (a sub-anchor such as a [09] sheet) lands with a small margin. The
   header slides away while the page scrolls down and comes back on the
   way up (NavBar useHeaderVisibility), so only an upward jump leaves room
   for it. Offsets are layout offsets, so a scroll reveal's 16px rise does
   not skew the landing; an eyebrow inside a sticky scene falls back to its
   section's top. */
const EYEBROW_AIR = 32;
const EYEBROW_AIR_PHONE = 24;
const ANCHOR_AIR = 24;
/** An eyebrow further than this below its section's top is not its start. */
const EYEBROW_REACH = 400;
/** A shorter move down leaves the header showing (it hides after 30px). */
const HEADER_HIDE_TRAVEL = 40;
const HEADER_FALLBACK = 72;

function layoutTop(element: HTMLElement): number {
  let top = 0;
  for (let node: HTMLElement | null = element; node; node = node.offsetParent as HTMLElement | null) {
    top += node.offsetTop;
  }
  return top;
}

function isPageSection(element: HTMLElement): boolean {
  return element.tagName === "SECTION" && !element.parentElement?.closest("section");
}

/** The document y at which `target`'s content should meet the top edge. */
function startOf(target: HTMLElement): number {
  const top = layoutTop(target);
  if (!isPageSection(target)) return top - ANCHOR_AIR;

  const eyebrow = target.querySelector<HTMLElement>("[data-section-eyebrow]");
  if (!eyebrow) return top;
  for (let node = eyebrow.parentElement; node && node !== target; node = node.parentElement) {
    const position = getComputedStyle(node).position;
    if (position === "sticky" || position === "fixed") return top;
  }
  const offset = layoutTop(eyebrow) - layoutTop(target);
  if (offset < 0 || offset > EYEBROW_REACH) return top;
  const air = window.matchMedia("(min-width: 1024px)").matches ? EYEBROW_AIR : EYEBROW_AIR_PHONE;
  return Math.max(top, top + offset - air);
}

/** The scroll position that lands `target` where it starts (see above). */
export function sectionScrollTop(target: HTMLElement): number {
  const start = startOf(target);
  const headerHides = start - window.scrollY > HEADER_HIDE_TRAVEL;
  const header = document.querySelector<HTMLElement>("header[data-scrolled]")?.offsetHeight ?? HEADER_FALLBACK;
  return Math.max(0, Math.round(headerHides ? start : start - header));
}

/**
 * Smoothly scrolls to an in-page hash anchor, landing it where it starts
 * (`sectionScrollTop`), and syncs window history and hash events.
 */
export function scrollToHashTarget(href: string): boolean {
  if (typeof window === "undefined" || !href.includes("#")) return false;
  const hash = href.split("#")[1];
  if (!hash) return false;
  const element = document.getElementById(decodeURIComponent(hash));
  if (element) {
    const top = sectionScrollTop(element);
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: prefersReduced ? "instant" : "smooth" });

    const targetHash = `#${hash}`;
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, "", targetHash);
    }
    window.dispatchEvent(new CustomEvent("akashic-hashchange", { detail: targetHash }));
    return true;
  }
  return false;
}

const HASH_ALIASES: Record<string, string[]> = {
  "intelligent-procurement": ["intelligent-procurement", "ipms", "built-on-akashic"],
  "data-pipelines": ["data-pipelines", "pipelines", "modules-data-pipelines"],
  "master-data": ["master-data", "master", "modules-master-data"],
  "data-warehouse": ["data-warehouse", "warehouse", "modules-data-warehouse"],
  "knowledge-layer": ["knowledge-layer", "modules-knowledge-layer"],
  "business-semantics": ["business-semantics", "modules-business-semantics"],
  "ai-studio": ["ai-studio", "modules-ai-studio"],
  "ai-agents": ["ai-agents", "modules-ai-agents", "agents"],
  "leadership": ["leadership", "people"],
  "impact": ["impact", "scale"],
  "advisory": ["advisory", "capabilities"],
  "model-saas": ["model-saas", "saas"],
  "model-whitelabel": ["model-whitelabel", "whitelabel"],
  "model-customai": ["model-customai", "customai"],
  "model-augmentation": ["model-augmentation", "augmentation"],
};

function matchesHash(targetHash: string, currentHash: string): boolean {
  const target = targetHash.toLowerCase();
  const current = currentHash.replace(/^#/, "").toLowerCase();
  if (target === current) return true;

  const aliases = HASH_ALIASES[target];
  if (aliases && aliases.includes(current)) return true;

  for (const [key, list] of Object.entries(HASH_ALIASES)) {
    if (list.includes(target) && (key === current || list.includes(current))) {
      return true;
    }
  }

  return false;
}

/** True when a link points at the page being viewed (or the active hash section on that page). */
export function isCurrentPage(href: string, pathname: string, currentHash = ""): boolean {
  const cleanHash = currentHash.replace(/^#/, "").trim().toLowerCase();
  const isTopSection = !cleanHash || cleanHash === "hero" || cleanHash === "main";

  if (href.includes("#")) {
    const [pagePath, hash] = href.split("#");
    const normalizedPagePath = pagePath || "/";
    if (pathname === normalizedPagePath) {
      if (isTopSection) return false;
      return matchesHash(hash, cleanHash);
    }
    return false;
  }

  // Exact page match without hash
  if (href === pathname) {
    return isTopSection;
  }

  return false;
}
