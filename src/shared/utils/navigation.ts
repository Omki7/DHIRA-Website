import type { NavMenu } from "@/content/navigation";

/* Navigation logic. The menus themselves are content (content/navigation.ts). */

/** True when `pathname` sits inside a menu's section. */
export function isCurrentSection(menu: NavMenu, pathname: string): boolean {
  return menu.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

/** True when a link points at the page being viewed (hash links never count). */
export function isCurrentPage(href: string, pathname: string): boolean {
  return !href.includes("#") && href === pathname;
}
