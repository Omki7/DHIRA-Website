"use client";

import { AKASHIC_SECTIONS } from "@/lib/akashicSections";
import { useAkashicScrollSpy, useAkashicSmoothScroll } from "@/hooks/useAkashicScrollSpy";

export default function AkashicScrollMinimap() {
  const activeId = useAkashicScrollSpy(AKASHIC_SECTIONS);
  const scrollTo = useAkashicSmoothScroll();

  return (
    <nav
      aria-label="Akashic page sections"
      className="group/nav fixed right-2 top-1/2 z-40 hidden -translate-y-1/2 lg:flex"
    >
      {/* Hover panel — list of all section eyebrows */}
      <div className="pointer-events-none absolute right-full top-1/2 mr-2.5 max-h-[70vh] w-64 -translate-y-1/2 translate-x-1 overflow-y-auto rounded-lg border border-subtle-stroke bg-white px-1 py-2 shadow-card opacity-0 transition-all duration-200 ease-settle group-hover/nav:pointer-events-auto group-hover/nav:translate-x-0 group-hover/nav:opacity-100">
        <ul className="flex flex-col gap-0.5">
          {AKASHIC_SECTIONS.map((section) => {
            const isActive = section.id === activeId;

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={[
                    "flex w-full flex-col items-start rounded-md px-3 py-2 text-left transition-colors duration-150",
                    isActive
                      ? "bg-blue-subtle/50 font-medium text-blue"
                      : "text-secondary-text hover:bg-primary-bg",
                  ].join(" ")}
                >
                  {section.eyebrow && (
                    <span className="font-mono text-[10px] uppercase tracking-eyebrow text-tertiary-text">
                      {section.eyebrow}
                    </span>
                  )}
                  <span className="text-xs leading-snug">
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Dots rail */}
      <div className="flex flex-col items-center gap-2 py-2">
        {AKASHIC_SECTIONS.map((section) => {
          const isActive = section.id === activeId;

          return (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              aria-label={section.eyebrow ? `${section.eyebrow} ${section.label}` : section.label}
              aria-current={isActive ? "location" : undefined}
              className="flex h-4 w-4 items-center justify-center rounded-full focus-visible:outline-none"
            >
              <span
                className={[
                  "rounded-full transition-all duration-200 ease-settle",
                  isActive
                    ? "h-1.5 w-1.5 bg-blue"
                    : "h-1 w-1 bg-tertiary-text/35 group-hover/nav:h-1.5 group-hover/nav:bg-tertiary-text/60",
                ].join(" ")}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
