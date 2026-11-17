"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import type { PageSection } from "@/content/types";
import { usePageScrollSpy } from "@/shared/hooks/usePageScrollSpy";
import { useUi } from "@/shared/providers/UiProvider";
import { sectionIndexRows } from "@/shared/utils/navigation";
import styles from "./PageMinimap.module.scss";

const CLOSE_DELAY_MS = 600;

export interface PageMinimapProps {
  sections: PageSection[];
  "aria-label"?: string;
}

function keepLinkVisible(link: HTMLAnchorElement) {
  const scroller = link.closest<HTMLElement>(".page-minimap-scroll");
  if (!scroller?.clientHeight) return;
  const row = link.getBoundingClientRect();
  const viewport = scroller.getBoundingClientRect();
  if (row.top < viewport.top) scroller.scrollTop += row.top - viewport.top;
  else if (row.bottom > viewport.bottom) scroller.scrollTop += row.bottom - viewport.bottom;
}

/* One row per chapter, not per section (17 Nov 2026, user: indexes of
   eleven and fourteen rows put readers off). The spy still follows every
   section, so the address bar names the exact one; the row holding it
   lights, and a row jumps to its chapter's first section. */
export function PageMinimap({
  sections,
  "aria-label": ariaLabel,
}: PageMinimapProps) {
  const ui = useUi();
  const { activeId, scrollTo } = usePageScrollSpy(sections);
  const rows = useMemo(() => sectionIndexRows(sections), [sections]);
  const [expanded, setExpanded] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = Math.max(0, rows.findIndex((row) => row.ids.includes(activeId)));
  const currentRow = rows[activeIndex];

  useEffect(() => () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  // The drawer hugs the longest title, so measure the labels once they can
  // lay out: on mount, after webfonts swap in, and when the rail first shows.
  useEffect(() => {
    let live = true;
    const measure = () => {
      const labels = navRef.current?.querySelectorAll<HTMLElement>(".page-minimap-label");
      if (!live || !labels) return;
      const widest = Math.max(0, ...Array.from(labels, (label) => label.getBoundingClientRect().width));
      if (widest) setLabelWidth(Math.ceil(widest));
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    measure();
    document.fonts.ready.then(measure);
    desktop.addEventListener("change", measure);
    return () => {
      live = false;
      desktop.removeEventListener("change", measure);
    };
  }, [sections]);

  // The rail maps the page's sections, not the site footer: it steps aside
  // once the footer's top is 120px into the screen, where the tallest rail
  // ends (globals.css caps it at 100dvh - 240px, centred). The line used to
  // be the middle of the screen; the footer, cut to about 450px on 28 Oct
  // 2026, never rises that far, so the rail stayed over it.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAtFooter(entry.isIntersecting);
        if (entry.isIntersecting) setExpanded(false);
      },
      { rootMargin: "0px 0px -120px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const link = navRef.current?.querySelector<HTMLAnchorElement>('a[aria-current="location"]');
    if (link) keepLinkVisible(link);
  }, [activeId]);

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setExpanded(true);
  };

  const close = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      if (!navRef.current?.querySelector("a:focus-visible")) setExpanded(false);
    }, CLOSE_DELAY_MS);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setExpanded(false);
      return;
    }

    const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("a"));
    const index = links.findIndex((link) => link === document.activeElement);
    let nextIndex: number;

    switch (event.key) {
      case "ArrowDown": nextIndex = Math.min(index + 1, links.length - 1); break;
      case "ArrowUp": nextIndex = Math.max(index - 1, 0); break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = links.length - 1; break;
      default: return;
    }

    event.preventDefault();
    open();
    links[nextIndex]?.focus({ preventScroll: true });
  };

  if (!currentRow) return null;

  const railStyle = {
    "--minimap-count": rows.length,
    "--minimap-active": activeIndex,
    "--minimap-progress": rows.length > 1 ? activeIndex / (rows.length - 1) : 0,
    ...(labelWidth ? { "--minimap-open-w": `${labelWidth + 44 + 16}px` } : {}),
  } as CSSProperties;

  return (
    <>
      {/* The drawer is a sibling under the rail, not inside it, so the
          scroller's horizontal clip never cuts its shadow. */}
      <div
        aria-hidden="true"
        data-expanded={expanded}
        className={`hidden lg:block page-minimap-sheet ${styles.sheet}`}
        style={railStyle}
      />
      <nav
        ref={navRef}
        aria-label={ariaLabel ?? ui.pageSections}
        data-expanded={expanded}
        data-hidden={atFooter}
        className={`hidden lg:block page-minimap ${styles.rail}`}
        style={railStyle}
        onPointerEnter={(event) => { if (event.pointerType !== "touch") open(); }}
        onPointerLeave={close}
        onClick={open}
        onFocus={(event) => {
          open();
          if (event.target instanceof HTMLAnchorElement) keepLinkVisible(event.target);
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget) && !event.currentTarget.matches(":hover")) {
            setExpanded(false);
          }
        }}
        onKeyDown={handleKeyDown}
      >
        <div className={`page-minimap-scroll ${styles.scroll}`}>
          <div className={styles.track}>
            <span aria-hidden="true" className={`page-minimap-trail ${styles.trail}`} />
            <span aria-hidden="true" className={`page-minimap-marker ${styles.marker}`} />
            <ul>
              {rows.map((row, index) => (
                <li key={row.id}>
                  <a
                    href={`#${row.id}`}
                    data-section-link
                    data-passed={index < activeIndex}
                    aria-label={`${row.number} ${row.label}`}
                    aria-current={index === activeIndex ? "location" : undefined}
                    className={`page-minimap-link ${styles.link}`}
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                      event.preventDefault();
                      scrollTo(row.id, event.detail === 0);
                    }}
                  >
                    <span className={`page-minimap-label ${styles.label}`}>
                      <span>{row.label}</span>
                    </span>
                    <span aria-hidden="true" className={styles.dotSlot}>
                      <span className={`page-minimap-dot ${styles.dot}`}>
                        <span className={`page-minimap-num ${styles.num}`}>{row.number}</span>
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Floating Section Indicator (under lg) */}
      <div
        className={`${styles.mobileIndicator} ${
          atFooter ? "opacity-0 pointer-events-none translate-y-3" : "opacity-100 translate-y-0"
        }`}
      >
        {/* Mobile Section Picker Popover */}
        {mobileMenuOpen && (
          <>
            <div
              className={styles.mobileOverlay}
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className={styles.mobilePopover}>
              <p className={styles.mobilePopoverHeader}>
                {ui.pageSections ?? "Page Sections"}
              </p>
              <ul className={styles.mobilePopoverList}>
                {rows.map((row, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <li key={row.id}>
                      <button
                        type="button"
                        onClick={() => {
                          scrollTo(row.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`${styles.mobilePopoverBtn} ${
                          isActive ? styles.mobilePopoverActiveBtn : ""
                        }`}
                      >
                        <span
                          className={`${styles.mobilePopoverBadge} ${
                            isActive ? styles.mobilePopoverActiveBadge : ""
                          }`}
                        >
                          {row.number}
                        </span>
                        <span className="truncate">{row.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}

        {/* Floating Indicator Capsule */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={`Current section: ${currentRow.number} ${currentRow.label}. Tap to jump to sections.`}
          className={styles.mobileCapsule}
        >
          <span className={styles.mobileBadge}>
            {currentRow.number}
          </span>
          <span className={styles.mobileLabel}>
            {currentRow.label}
          </span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            className={`${styles.mobileChevron} ${mobileMenuOpen ? "rotate-180" : ""}`}
            aria-hidden="true"
          >
            <path d="M2.5 4.5L6 8L9.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  );
}
