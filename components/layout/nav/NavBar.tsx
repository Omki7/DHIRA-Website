"use client";

import type { FocusEvent, KeyboardEvent as ReactKeyboardEvent, PointerEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import RegionLink from "@/components/ui/RegionLink";
import { usePathname } from "next/navigation";
import DhiraLogo from "@/components/icons/DhiraLogo";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import AnnouncementBar from "@/components/layout/nav/AnnouncementBar";
import MegaSheet, { type SheetMotion } from "@/components/layout/nav/MegaSheet";
import MobileNav from "@/components/layout/nav/MobileNav";
import { Chevron, MenuIcon } from "@/components/layout/nav/NavIcons";
import useMenuIntent from "@/hooks/useMenuIntent";
import { useUi } from "@/components/providers/UiProvider";
import type { Navigation } from "@/content/navigation";
import { isCurrentSection } from "@/lib/navigation";
import { basePath } from "@/lib/region";

/* ------------------------------------------------------------------ */
/*  Site header bar (rebuilt 14 Oct 2026)                              */
/* ------------------------------------------------------------------ */
/* Platform · Solutions · Services · Resources · About; every label and link
   comes from the Navigation document (content/navigation.ts), loaded by the
   server shell layout/Nav.tsx. No "Home" item: the logo is home, as on every
   reference site and the founder's wireframe (dropped 14 Oct 2026). The
   logo is the mark, the wordmark, then the full form after a hairline pipe
   (restored 15 Oct 2026, user).
   Desktop: one shared sheet attached to the header (nav/MegaSheet), hover
   intent and close grace (hooks/useMenuIntent), a blue-black scrim over the
   page, an ink underline that slides to the open trigger, and a blue bar
   that stays under the section being viewed.
   Mobile: a drill-down drawer (nav/MobileNav).
   Two things hold the rest of the site up, keep them: the root is a
   `<header data-scrolled>` (about-page.css styles `.about-page > header`), and
   the bar is 72px (sticky offsets across the site are measured against it).
   The announcement bar sits above the header in normal flow for the same
   reason. */

const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

/* The current section rests in ink with a 2px blue bar on the header's
   bottom edge, under its label: inset by the 12px side padding on the left
   and by padding + chevron + gap (32px) on the right. The open menu's ink
   underline slides over it. */
const triggerClass = (open: boolean, current: boolean) =>
  `relative inline-flex h-10 items-center gap-1.5 rounded-btn px-3 text-[15px] font-medium transition-colors duration-150 ${
    open || current ? "text-ink" : "text-secondary-text hover:text-ink"
  } ${current ? "after:absolute after:-bottom-4 after:left-3 after:right-8 after:h-[2px] after:rounded-full after:bg-blue" : ""}`;

export type Brand = { name: string; expansion: string };

/** The full form with each initial in bold, so they spell the name down the
    line. Weight only, never colour (founder, 20 Oct 2026). */
function Expansion({ text }: { text: string }) {
  return (
    <>
      {text.split(" ").map((word, k) => (
        <span key={k}>
          {k > 0 && " "}
          {/^[A-Z]/.test(word) ? (
            <>
              <span className="font-extrabold">{word[0]}</span>
              {word.slice(1)}
            </>
          ) : (
            word
          )}
        </span>
      ))}
    </>
  );
}

export default function NavBar({ navigation, brand }: { navigation: Navigation; brand: Brand }) {
  const { menus, announcement, cta } = navigation;
  const ui = useUi();
  const ORDER = menus.map((menu) => menu.id);
  /* Without the region prefix, so /in/pricing marks the same menu items as /pricing. */
  const pathname = basePath(usePathname() ?? "/");
  const { openId, hoverTrigger, leaveTrigger, enterRegion, leaveRegion, toggle, close } = useMenuIntent();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

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

  /* Hide on scroll down (30px), show on scroll up (15px) or near the top.
     State is only set when it flips, so a scroll frame costs no render. */
  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;
    let isScrolled: boolean | null = null;
    let isVisible = true;

    const show = (next: boolean) => {
      if (next === isVisible) return;
      isVisible = next;
      setVisible(next);
    };

    const handleScroll = () => {
      const currentY = window.scrollY;
      const nextScrolled = currentY > 64;
      if (nextScrolled !== isScrolled) {
        isScrolled = nextScrolled;
        setScrolled(nextScrolled);
      }
      const delta = currentY - lastY;

      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += delta;

      if (currentY < 10) {
        show(true);
        accumulatedDelta = 0;
      } else if (accumulatedDelta > 30) {
        show(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        show(true);
        accumulatedDelta = 0;
      }

      lastY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        className={`sticky top-0 z-50 border-b border-subtle-stroke bg-background transition-[transform,background-color] duration-300 ease-settle ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <nav aria-label={ui.nav.primary} className="relative">
          <div
            ref={barRef}
            className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8"
          >
            <div className="flex min-w-0 items-center gap-6">
              {/* The full form hides at lg (1024 to 1279px), where five menus
                  and the CTA leave it no room. */}
              <RegionLink
                href="/"
                aria-label={ui.homeLink}
                className="flex shrink-0 items-center gap-3 text-primary-text"
                onPointerEnter={restOnPlainItem}
              >
                <div className="flex items-center gap-1.5">
                  <DhiraLogo className="h-9 w-9" />
                  <span className="text-[22px] font-semibold tracking-tight">{brand.name}</span>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden max-w-[150px] border-l border-default-stroke pl-3 text-[11px] leading-[1.25] tracking-[0.04em] text-secondary-text md:block lg:hidden xl:block"
                >
                  <Expansion text={brand.expansion} />
                </span>
              </RegionLink>

              <ul className="hidden items-center gap-0.5 lg:flex">
                {menus.map((item) => {
                  const open = openId === item.id;
                  const current = isCurrentSection(item, pathname);
                  return (
                    <li key={item.id}>
                      <button
                        ref={(node) => {
                          triggers.current[item.id] = node;
                        }}
                        type="button"
                        aria-expanded={open}
                        aria-controls={`nav-panel-${item.id}`}
                        aria-current={current ? "true" : undefined}
                        className={triggerClass(open, current)}
                        onPointerEnter={(event) => isMouse(event) && hoverTrigger(item.id)}
                        onPointerLeave={(event) => isMouse(event) && leaveTrigger()}
                        onClick={(event) => toggle(item.id, event.detail > 0)}
                        onKeyDown={onTriggerKeyDown(item.id)}
                      >
                        <span
                          ref={(node) => {
                            labels.current[item.id] = node;
                          }}
                        >
                          {item.label}
                        </span>
                        <Chevron open={open} className="text-overcast" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex shrink-0 items-center gap-2" onPointerEnter={restOnPlainItem}>
              <ThemeSwitch />
              <RegionLink
                ref={ctaRef}
                href={cta.href}
                className="btn-primary hidden text-sm sm:inline-flex"
                onPointerEnter={restOnPlainItem}
                onClick={close}
              >
                {cta.label}
              </RegionLink>
              <button
                type="button"
                className="btn-ghost lg:hidden"
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
              className={`pointer-events-none absolute bottom-0 hidden h-[2px] rounded-full bg-ink lg:block ${
                travel.motion === "fade" ? "transition-opacity duration-150" : "transition-[left,width,opacity] duration-250 ease-settle"
              } ${openId ? "opacity-100" : "opacity-0"}`}
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
        className={`fixed inset-0 z-40 hidden bg-scrim/20 transition-[opacity,visibility] duration-250 ease-settle lg:block ${
          openId ? "visible opacity-100 " : "invisible opacity-0"
        }`}
      />

      <MobileNav
        menus={menus}
        cta={cta}
        brandName={brand.name}
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}
