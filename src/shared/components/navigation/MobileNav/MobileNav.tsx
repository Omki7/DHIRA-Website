"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { NavMenu } from "@/content/navigation";
import type { Link } from "@/content/types";
import { nameOrWordmark } from "@/shared/components/icons/AkashicWordmark";
import { DhiraLogo } from "@/shared/components/icons/DhiraLogo";
import { BackArrow, ChevronRight, CloseIcon } from "@/shared/components/icons/NavIcons";
import { MenuRow } from "@/shared/components/navigation/MenuPanel";
import { NavFeatured } from "@/shared/components/navigation/NavFeatured";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { ThemeSwitch } from "@/shared/components/ui/ThemeSwitch";
import useRegion from "@/shared/hooks/useRegion";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { isCurrentSection } from "@/shared/utils/navigation";
import { forRegion, isShownTo } from "@/shared/utils/region";
import styles from "./MobileNav.module.scss";

/* Below lg: a full-screen drawer that drills down (Figma / Apple pattern)
   instead of an accordion. Level one is a large row per menu (the logo above them
   is home); a menu slides in
   from the right with a Back control and the same lead, groups and featured
   card as the desktop sheet. Rendered outside the sticky header, because a
   transformed or backdrop-filtered ancestor would trap `position: fixed`.
   Scroll locked, focus trapped, Escape and route changes close it.
   Links and featured cards follow the visitor's region, as on the desktop
   sheet (MenuPanel). */

const FOCUSABLE = "a[href], button:not([disabled])";

export interface MobileNavProps {
  menus: NavMenu[];
  cta: Link;
  brandName: string;
  open: boolean;
  pathname: string;
  currentHash?: string;
  onClose: () => void;
}

export function MobileNav({ menus, cta, brandName, open, pathname, currentHash, onClose }: MobileNavProps) {
  const ui = useUi();
  const { region } = useRegion();
  const [level, setLevel] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  /* Reset to level one whenever the drawer closes. */
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (!open) setLevel(null);
  }

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  /* Move focus to the first control of whichever level is now showing.
     `preventScroll`: the level is still sliding in from off-screen, and a
     plain focus() would scroll the overflow-hidden track to reveal it,
     leaving every panel offset once the slide ends. */
  useEffect(() => {
    if (!open) return;
    const track = dialogRef.current?.querySelector<HTMLElement>("[data-track]");
    const panel = track?.querySelector<HTMLElement>(`[data-level="${level ?? "root"}"]`);
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus({ preventScroll: true });
    if (track) track.scrollLeft = 0;
  }, [level, open]);

  if (!open) return null;

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      if (level) setLevel(null);
      else onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (node) => !node.closest("[inert]")
    );
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={ui.nav.siteMenu}
      onKeyDown={onKeyDown}
      className={styles.root}
    >
      <div className={styles.topBar}>
        <RegionLink href="/" aria-label={ui.homeLink} onClick={onClose} className={styles.brand}>
          <DhiraLogo className={styles.logo} />
          <span className={styles.brandName}>{brandName}</span>
        </RegionLink>
        <button type="button" className="btn-ghost" onClick={onClose} aria-label={ui.nav.closeMenu}>
          <CloseIcon />
        </button>
      </div>

      <nav aria-label={ui.nav.primary} data-track className={styles.track}>
        {/* Level one */}
        <div
          data-level="root"
          inert={level !== null}
          className={cx(styles.levelOne, level ? styles.levelOneAway : undefined)}
        >
          <ul>
            {menus.map((menu) => (
              <li key={menu.id} className={styles.menuItem}>
                <button
                  type="button"
                  onClick={() => setLevel(menu.id)}
                  aria-controls={`mobile-panel-${menu.id}`}
                  className={styles.menuButton}
                >
                  <span className={styles.menuLabel}>
                    {menu.label}
                    {isCurrentSection(menu, pathname) && <span aria-hidden className={styles.currentDot} />}
                  </span>
                  <ChevronRight className={styles.menuChevron} />
                </button>
              </li>
            ))}
          </ul>
          <div className={styles.themeRow}>
            <ThemeSwitch labelled />
          </div>
        </div>

        {/* Level two, one per menu */}
        {menus.map((menu) => {
          const active = level === menu.id;
          return (
            <div
              key={menu.id}
              id={`mobile-panel-${menu.id}`}
              data-level={menu.id}
              inert={!active}
              aria-hidden={!active}
              className={cx(styles.levelTwo, active && styles.levelTwoActive)}
            >
              <button
                type="button"
                onClick={() => setLevel(null)}
                className={styles.back}
              >
                <BackArrow />
                {ui.nav.allMenus}
              </button>

              <div className={styles.lead}>
                <p className={styles.leadTitle}>{nameOrWordmark(menu.lead.title)}</p>
                <p className={styles.leadText}>{menu.lead.text}</p>
                <RegionLink
                  href={menu.lead.href}
                  onClick={onClose}
                  className={styles.leadLink}
                >
                  {menu.lead.cta}
                  <span aria-hidden>&rarr;</span>
                </RegionLink>
              </div>

              {menu.groups.map((group) => (
                <div key={group.heading} className={styles.group}>
                  <p className={styles.groupHeading}>{group.heading}</p>
                  <ul className={styles.groupList} onClick={onClose}>
                    {group.links
                      .filter((link) => isShownTo(link.audience, region))
                      .map((link) => (
                        <li key={`${link.label}-${link.href}`} className={styles.groupItem}>
                          <MenuRow link={link} pathname={pathname} currentHash={currentHash} />
                        </li>
                      ))}
                  </ul>
                </div>
              ))}

              <div className={styles.featured} onClick={onClose}>
                <NavFeatured feature={forRegion(menu.feature, region)} drawn={active} />
              </div>
            </div>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <RegionLink href={cta.href} onClick={onClose} className={`btn-primary btn-lg ${styles.cta}`}>
          {cta.label}
        </RegionLink>
      </div>
    </div>
  );
}
