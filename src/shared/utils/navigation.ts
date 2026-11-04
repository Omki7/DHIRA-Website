import type { NavMenu } from "@/content/navigation";

/* Navigation logic. The menus themselves are content (content/navigation.ts). */

/** True when `pathname` sits inside a menu's section. */
export function isCurrentSection(menu: NavMenu, pathname: string): boolean {
  return menu.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/**
 * Smoothly scrolls to an in-page hash anchor with 120px header clearance
 * and syncs window history and hash events.
 */
export function scrollToHashTarget(href: string): boolean {
  if (typeof window === "undefined" || !href.includes("#")) return false;
  const hash = href.split("#")[1];
  if (!hash) return false;
  const element = document.getElementById(hash);
  if (element) {
    const headerOffset = 120; // 100px sticky nav + 20px clearance
    const top = Math.max(0, element.getBoundingClientRect().top + window.scrollY - headerOffset);
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
