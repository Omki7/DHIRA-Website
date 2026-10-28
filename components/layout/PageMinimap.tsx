"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useUi } from "@/components/providers/UiProvider";
import type { PageSection } from "@/content/types";
import { usePageScrollSpy } from "@/hooks/usePageScrollSpy";

const CLOSE_DELAY_MS = 600;

interface PageMinimapProps {
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

export default function PageMinimap({
  sections,
  "aria-label": ariaLabel,
}: PageMinimapProps) {
  const ui = useUi();
  const { activeId, scrollTo } = usePageScrollSpy(sections);
  const [expanded, setExpanded] = useState(false);
  const [atFooter, setAtFooter] = useState(false);
  const [labelWidth, setLabelWidth] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === activeId));

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

  if (!sections.length) return null;

  const railStyle = {
    "--minimap-count": sections.length,
    "--minimap-active": activeIndex,
    "--minimap-progress": sections.length > 1 ? activeIndex / (sections.length - 1) : 0,
    ...(labelWidth ? { "--minimap-open-w": `${labelWidth + 44 + 8}px` } : {}),
  } as CSSProperties;

  return (
    <>
      {/* The drawer is a sibling under the rail, not inside it, so the
          scroller's horizontal clip never cuts its shadow. */}
      <div
        aria-hidden="true"
        data-expanded={expanded}
        className="page-minimap-sheet pointer-events-none fixed right-0 top-1/2 z-[39] hidden lg:block"
        style={railStyle}
      />
      <nav
        ref={navRef}
        aria-label={ariaLabel ?? ui.pageSections}
        data-expanded={expanded}
        data-hidden={atFooter}
        className="page-minimap pointer-events-none fixed top-1/2 z-40 hidden -translate-y-1/2 py-2 lg:block"
        style={railStyle}
        onPointerEnter={(event) => { if (event.pointerType !== "touch") open(); }}
        onPointerLeave={close}
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
        <div className="page-minimap-scroll relative">
          <div className="relative">
            <span aria-hidden="true" className="page-minimap-trail pointer-events-none absolute right-[21.5px] w-px origin-top" />
            <span aria-hidden="true" className="page-minimap-marker pointer-events-none absolute right-[18px] top-0 z-10 h-2 w-2 rounded-full" />
            <ul>
              {sections.map((section, index) => {
                const number = section.eyebrow?.replace(/[\[\]]/g, "") ?? String(index).padStart(2, "0");

                return <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    data-section-link
                    data-passed={index < activeIndex}
                    aria-label={`${number} ${section.label}`}
                    aria-current={section.id === activeId ? "location" : undefined}
                    className="page-minimap-link pointer-events-auto relative ml-auto flex w-11 items-center justify-end rounded-chip focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-4 focus-visible:outline-blue"
                    onClick={(event) => {
                      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
                      event.preventDefault();
                      scrollTo(section.id, event.detail === 0);
                    }}
                  >
                    <span className="page-minimap-label pointer-events-none absolute right-11 flex items-baseline gap-3 whitespace-nowrap text-[13px] leading-5">
                      <span>{section.label}</span>
                      <span className="page-minimap-number w-4 text-right font-mono text-[10px] font-normal tabular-nums">{number}</span>
                    </span>
                    <span aria-hidden="true" className="flex h-full w-11 shrink-0 items-center justify-center">
                      <span className="page-minimap-dot h-1 w-1 rounded-full" />
                    </span>
                  </a>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
