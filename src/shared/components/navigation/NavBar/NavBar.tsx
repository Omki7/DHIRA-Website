"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { FocusEvent, KeyboardEvent as ReactKeyboardEvent, MouseEvent, PointerEvent } from "react";
import type { Navigation } from "@/content/navigation";
import { MenuIcon } from "@/shared/components/icons/NavIcons";
import { AnnouncementBar } from "@/shared/components/navigation/AnnouncementBar";
import { MegaSheet, type SheetMotion } from "@/shared/components/navigation/MegaSheet";
import { MobileNav } from "@/shared/components/navigation/MobileNav";
import { RegionLink } from "@/shared/components/navigation/RegionLink";
import { ThemeSwitch } from "@/shared/components/ui/ThemeSwitch";
import useMenuIntent from "@/shared/hooks/useMenuIntent";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { useUi } from "@/shared/providers/UiProvider";
import { cx } from "@/shared/utils/cx";
import { isCurrentPage } from "@/shared/utils/navigation";
import { basePath } from "@/shared/utils/region";
import { BrandLink, type Brand } from "./BrandLink";
import { DesktopMenu } from "./DesktopMenu";
import { useHeaderVisibility } from "./useHeaderVisibility";
import styles from "./NavBar.module.scss";

/* ------------------------------------------------------------------ */
/*  Site header bar (rebuilt 14 Oct 2026)                              */
/* ------------------------------------------------------------------ */
/* Platform · Solutions · Services · Resources · About; every label and link
   comes from the Navigation document (content/navigation.ts), loaded by the
   server shell layout/Nav.tsx. No "Home" item: the logo is home, as on every
   reference site and the founder's wireframe (dropped 14 Oct 2026). The
   logo is the mark, the wordmark, then the full form after a hairline pipe
   (restored 15 Oct 2026, user).
   Desktop: one shared sheet attached to the header (navigation/MegaSheet), hover
   intent and close grace (shared/hooks/useMenuIntent), a blue-black scrim over the
   page, an ink underline that slides to the open trigger, and a blue bar
   that stays under the section being viewed. Each label is a link to its
   menu lead's page, so one click lands on that page's hero (23 Oct 2026,
   user); the chevron beside it is the disclosure button.
   Mobile: a drill-down drawer (navigation/MobileNav).
   Two things hold the rest of the site up, keep them: the root is a
   `<header data-scrolled>` (about-page.css styles `.about-page > header`), and
   the bar is 72px (sticky offsets across the site are measured against it).
   The announcement bar sits above the header in normal flow for the same
   reason. */

const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

export interface NavBarProps {
  navigation: Navigation;
  brand: Brand;
}

export function NavBar({ navigation, brand }: NavBarProps) {
  const { menus, announcement, cta } = navigation;
  const ui = useUi();
  const ORDER = menus.map((menu) => menu.id);
  /* Without the region prefix, so /in/pricing marks the same menu items as /pricing. */
  const pathname = basePath(usePathname() ?? "/");
  const reducedMotion = usePrefersReducedMotion();
  const { openId, hoverTrigger, leaveTrigger, enterRegion, leaveRegion, toggle, close } = useMenuIntent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const { visible, scrolled } = useHeaderVisibility();

  useEffect(() => {
    let unmounted = false;
    const syncHash = () => {
      queueMicrotask(() => {
        if (!unmounted && typeof window !== "undefined") {
          setCurrentHash(window.location.hash);
        }
      });
    };
    syncHash();
    window.addEventListener("hashchange", syncHash);
    window.addEventListener("popstate", syncHash);
    window.addEventListener("akashic-hashchange", syncHash);
    return () => {
      unmounted = true;
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("popstate", syncHash);
      window.removeEventListener("akashic-hashchange", syncHash);
    };
  }, [pathname]);

  const barRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const triggers = useRef<Record<string, HTMLButtonElement | null>>({});
  const labels = useRef<Record<string, HTMLSpanElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });
  const [threadX, setThreadX] = useState(0);

  /* Direction of travel between menus: the incoming panel slides in from the
     side it was reached from. A first open just fades. */
  const [travel, setTravel] = useState<{ id: string | null; motion: SheetMotion }>({ id: null, motion: "fade" });
  if (openId !== travel.id) {
    const from = travel.id;
    let motion: SheetMotion = travel.motion;
    if (openId) {
      motion = !from ? "fade" : ORDER.indexOf(openId) > ORDER.indexOf(from) ? "from-right" : "from-left";
    }
    setTravel({ id: openId, motion });
  }

  /* Featured figures draw the first time their menu opens, then stay drawn.
     One frame late on purpose: a figure must paint undrawn before it can
     draw in. */
  const [drawn, setDrawn] = useState<ReadonlySet<string>>(() => new Set());
  useEffect(() => {
    if (!openId || drawn.has(openId)) return;
    const frame = requestAnimationFrame(() => setDrawn((previous) => new Set(previous).add(openId)));
    return () => cancelAnimationFrame(frame);
  }, [openId, drawn]);

  /* A route change closes everything. The router is the external system
     here, and close() also clears the hover-intent timers, so this stays
     an effect rather than a render-time adjustment. */
  useEffect(() => {
    close();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setMobileOpen(false);
  }, [pathname, close]);

  /* Escape closes the open menu and hands focus back to its trigger. */
  useEffect(() => {
    if (!openId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      close();
      triggers.current[openId]?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openId, close]);

  /* Underline and blue-thread positions follow the open trigger's label. */
  useLayoutEffect(() => {
    if (!openId) return;
    const measure = () => {
      const label = labels.current[openId];
      const bar = barRef.current;
      if (!label || !bar) return;
      const labelBox = label.getBoundingClientRect();
      const barBox = bar.getBoundingClientRect();
      setUnderline({ left: labelBox.left - barBox.left, width: labelBox.width });
      setThreadX(labelBox.left + labelBox.width / 2);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [openId]);

  const showHeader = visible || mobileOpen || openId !== null;

  /* Pointer resting on a non-menu item (logo, Home, CTA) starts the close grace. */
  const restOnPlainItem = (event: PointerEvent) => {
    if (isMouse(event)) leaveRegion();
  };

  /* A label goes straight to its menu lead's page. Already on it, the label
     scrolls back up to the hero: the router does not scroll for a link to
     the URL being viewed. New-tab clicks keep the browser's default. */
  const onLabelClick = (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    close();
    if (!isCurrentPage(href, pathname)) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };

  /* Focus leaving the header (keyboard) closes the menu. */
  const onHeaderBlur = (event: FocusEvent<HTMLElement>) => {
    const next = event.relatedTarget;
    if (openId && next instanceof Node && !event.currentTarget.contains(next)) close();
  };

  /* The sheet is not next to its trigger in the DOM, so carry focus across:
     Tab (or ArrowDown) from an open trigger enters its panel. */
  const onTriggerKeyDown = (id: string) => (event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const intoPanel = event.key === "ArrowDown" || (event.key === "Tab" && !event.shiftKey && openId === id);
    if (!intoPanel) return;
    event.preventDefault();
    if (openId !== id) toggle(id, false);
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`#nav-panel-${id} a[href]`)?.focus());
  };

  /* ...and Tab past a panel's last link moves on to the next trigger. */
  const onTabOut = (id: string, backwards: boolean) => {
    if (backwards) {
      triggers.current[id]?.focus();
      return;
    }
    const next = ORDER[ORDER.indexOf(id) + 1];
    close();
    const nextControl = next
      ? triggers.current[next]
      : barRef.current?.querySelector<HTMLButtonElement>(".theme-switch") ?? ctaRef.current;
    nextControl?.focus();
  };

  return (
    <>
      <AnnouncementBar announcement={announcement} />

      <header
        data-scrolled={scrolled}
        data-menu-open={openId !== null}
        onPointerEnter={(event) => isMouse(event) && enterRegion()}
        onPointerLeave={(event) => isMouse(event) && leaveRegion()}
        onBlur={onHeaderBlur}
        className={cx(styles.header, !showHeader && styles.headerHidden)}
      >
        <nav aria-label={ui.nav.primary} className={styles.nav}>
          <div
            ref={barRef}
            className={styles.bar}
          >
            <div className={styles.start}>
              <BrandLink brand={brand} onPointerEnter={restOnPlainItem} />

              <DesktopMenu
                menus={menus}
                openId={openId}
                pathname={pathname}
                labels={labels}
                triggers={triggers}
                hoverTrigger={hoverTrigger}
                leaveTrigger={leaveTrigger}
                toggle={toggle}
                onLabelClick={onLabelClick}
                onTriggerKeyDown={onTriggerKeyDown}
              />
            </div>

            <div className={styles.end} onPointerEnter={restOnPlainItem}>
              <ThemeSwitch />
              <RegionLink
                ref={ctaRef}
                href={cta.href}
                className={`btn-primary ${styles.cta}`}
                onPointerEnter={restOnPlainItem}
                onClick={close}
              >
                {cta.label}
              </RegionLink>
              <button
                type="button"
                className={`btn-ghost ${styles.menuButton}`}
                onClick={() => {
                  close();
                  setMobileOpen(true);
                }}
                aria-label={ui.nav.openMenu}
                aria-expanded={mobileOpen}
              >
                <MenuIcon />
              </button>
            </div>

            {/* The ink underline under the open trigger. Slides between
                triggers; on a first open it appears in place. */}
            <span
              aria-hidden
              className={cx(
                styles.underline,
                travel.motion !== "fade" && styles.underlineSlide,
                openId ? styles.underlineShown : undefined,
              )}
              style={{ left: underline.left, width: underline.width }}
            />
          </div>

          <MegaSheet
            menus={menus}
            openId={openId}
            motion={travel.motion}
            threadX={threadX}
            drawn={drawn}
            pathname={pathname}
            currentHash={currentHash}
            onNavigate={close}
            onTabOut={onTabOut}
          />
        </nav>
      </header>

      {/* Focus scrim: blue-black (Rule 5), never neutral black. Clicking it
          closes the menu. Desktop only; the drawer covers the screen. The
          blur exists only while open: a full-screen backdrop-filter left on
          the page is re-blurred on every scroll frame. */}
      <div
        aria-hidden
        onClick={close}
        className={cx(styles.scrim, openId ? styles.scrimShown : undefined)}
      />

      <MobileNav
        menus={menus}
        cta={cta}
        brandName={brand.name}
        open={mobileOpen}
        pathname={pathname}
        currentHash={currentHash}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
