"use client";

import type { FocusEvent, KeyboardEvent as ReactKeyboardEvent, PointerEvent } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DhiraLogo from "@/components/icons/DhiraLogo";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import AnnouncementBar from "@/components/layout/nav/AnnouncementBar";
import MegaSheet, { type SheetMotion } from "@/components/layout/nav/MegaSheet";
import MobileNav from "@/components/layout/nav/MobileNav";
import { Chevron, MenuIcon } from "@/components/layout/nav/NavIcons";
import useMenuIntent from "@/hooks/useMenuIntent";
import { NAV_CTA, NAV_MENUS, isCurrentSection } from "@/lib/navigation";

/* ------------------------------------------------------------------ */
/*  Site header (rebuilt 14 Oct 2026)                                  */
/* ------------------------------------------------------------------ */
/* Akashic · Solutions · Services · Company; every label and link lives in
   lib/navigation.ts. No "Home" item: the logo is home, as on every
   reference site and the founder's wireframe (dropped 14 Oct 2026).
   Desktop: one shared sheet attached to the header (nav/MegaSheet), hover
   intent and close grace (hooks/useMenuIntent), a blue-black scrim over the
   page, and an ink underline that slides to the open trigger.
   Mobile: a drill-down drawer (nav/MobileNav).
   Two things hold the rest of the site up, keep them: the root is a
   `<header data-scrolled>` (about-page.css styles `.about-page > header`), and
   the bar is 72px (sticky offsets across the site are measured against it).
   The announcement bar sits above the header in normal flow for the same
   reason. */

const ORDER = NAV_MENUS.map((menu) => menu.id);
const isMouse = (event: PointerEvent) => event.pointerType === "mouse";

const triggerClass = (strong: boolean) =>
  `inline-flex h-10 items-center gap-1.5 rounded-btn px-3 text-[15px] font-medium transition-colors duration-150 ${
    strong ? "text-ink" : "text-secondary-text hover:text-ink"
  }`;

export default function Nav() {
  const pathname = usePathname() ?? "/";
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

  /* Hide on scroll down (30px), show on scroll up (15px) or near the top. */
  useEffect(() => {
    let lastY = window.scrollY;
    let accumulatedDelta = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 64);
      const delta = currentY - lastY;

      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }

      accumulatedDelta += delta;

      if (currentY < 10) {
        setVisible(true);
        accumulatedDelta = 0;
      } else if (accumulatedDelta > 30) {
        setVisible(false);
        accumulatedDelta = 0;
      } else if (accumulatedDelta < -15) {
        setVisible(true);
        accumulatedDelta = 0;
      }

      lastY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* A route change closes everything. */
  useEffect(() => {
    close();
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
      <AnnouncementBar />

      <header
        data-scrolled={scrolled}
        data-menu-open={openId !== null}
        onPointerEnter={(event) => isMouse(event) && enterRegion()}
        onPointerLeave={(event) => isMouse(event) && leaveRegion()}
        onBlur={onHeaderBlur}
        className={`sticky top-0 z-50 border-b border-subtle-stroke transition-[transform,background-color] duration-300 ease-settle ${
          openId ? "bg-background" : "bg-background/95 backdrop-blur-md"
        } ${showHeader ? "translate-y-0" : "-translate-y-full"}`}
      >
        <nav aria-label="Primary" className="relative">
          <div
            ref={barRef}
            className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8"
          >
            <div className="flex min-w-0 items-center gap-6">
              <Link
                href="/"
                aria-label="DHIRA homepage"
                className="flex shrink-0 items-center gap-3 text-primary-text"
                onPointerEnter={restOnPlainItem}
              >
                <div className="flex items-center gap-1.5">
                  <DhiraLogo className="h-9 w-9" />
                  <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden max-w-[150px] border-l border-default-stroke pl-3 text-[11px] leading-[1.25] tracking-[0.04em] text-secondary-text md:block"
                >
                  Digital Human Interfaces & Robotic Agents
                </span>
              </Link>

              <ul className="hidden items-center gap-0.5 lg:flex">
                {NAV_MENUS.map((item) => {
                  const open = openId === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        ref={(node) => {
                          triggers.current[item.id] = node;
                        }}
                        type="button"
                        aria-expanded={open}
                        aria-controls={`nav-panel-${item.id}`}
                        className={triggerClass(open || isCurrentSection(item, pathname))}
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
              <Link
                ref={ctaRef}
                href={NAV_CTA.href}
                className="btn-primary hidden text-sm sm:inline-flex"
                onPointerEnter={restOnPlainItem}
                onClick={close}
              >
                {NAV_CTA.label}
              </Link>
              <button
                type="button"
                className="btn-ghost lg:hidden"
                onClick={() => {
                  close();
                  setMobileOpen(true);
                }}
                aria-label="Open menu"
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
            menus={NAV_MENUS}
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
          closes the menu. Desktop only; the drawer covers the screen. */}
      <div
        aria-hidden
        onClick={close}
        className={`fixed inset-0 z-40 hidden bg-depth/20 backdrop-blur-[3px] transition-[opacity,visibility] duration-250 ease-settle lg:block ${
          openId ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      <MobileNav open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />
    </>
  );
}
