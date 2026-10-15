"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import RegionLink from "@/components/ui/RegionLink";
import DhiraLogo from "@/components/icons/DhiraLogo";
import ThemeSwitch from "@/components/layout/ThemeSwitch";
import { NAV_CTA, NAV_MENUS, isCurrentSection } from "@/lib/navigation";
import { MenuRow } from "./MenuPanel";
import NavFeatured from "./NavFeatured";
import { BackArrow, ChevronRight, CloseIcon } from "./NavIcons";

/* Below lg: a full-screen drawer that drills down (Figma / Apple pattern)
   instead of an accordion. Level one is a large row per menu (the logo above them
   is home); a menu slides in
   from the right with a Back control and the same lead, groups and featured
   card as the desktop sheet. Rendered outside the sticky header, because a
   transformed or backdrop-filtered ancestor would trap `position: fixed`.
   Scroll locked, focus trapped, Escape and route changes close it. */

const FOCUSABLE = "a[href], button:not([disabled])";

export default function MobileNav({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
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
      aria-label="Site menu"
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[60] flex flex-col bg-background lg:hidden"
    >
      <div className="flex h-[72px] shrink-0 items-center justify-between border-b border-subtle-stroke px-4 sm:px-6">
        <RegionLink href="/" aria-label="DHIRA homepage" onClick={onClose} className="flex items-center gap-1.5 text-primary-text">
          <DhiraLogo className="h-9 w-9" />
          <span className="text-[22px] font-semibold tracking-tight">DHIRA</span>
        </RegionLink>
        <button type="button" className="btn-ghost" onClick={onClose} aria-label="Close menu">
          <CloseIcon />
        </button>
      </div>

      <nav aria-label="Primary" data-track className="relative flex-1 overflow-hidden">
        {/* Level one */}
        <div
          data-level="root"
          inert={level !== null}
          className={`absolute inset-0 overflow-y-auto px-4 pb-8 pt-2 transition-[transform,opacity] duration-250 ease-settle sm:px-6 ${
            level ? "pointer-events-none -translate-x-1/4 opacity-0" : "translate-x-0 opacity-100"
          }`}
        >
          <ul>
            {NAV_MENUS.map((menu) => (
              <li key={menu.id} className="border-b border-subtle-stroke">
                <button
                  type="button"
                  onClick={() => setLevel(menu.id)}
                  aria-controls={`mobile-panel-${menu.id}`}
                  className="flex min-h-[60px] w-full items-center justify-between text-left text-[20px] font-semibold tracking-[-0.01em] text-ink"
                >
                  <span className="flex items-center gap-2.5">
                    {menu.label}
                    {isCurrentSection(menu, pathname) && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue" />}
                  </span>
                  <ChevronRight className="text-overcast" />
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between border-b border-subtle-stroke pb-5">
            <ThemeSwitch labelled />
          </div>
        </div>

        {/* Level two, one per menu */}
        {NAV_MENUS.map((menu) => {
          const active = level === menu.id;
          return (
            <div
              key={menu.id}
              id={`mobile-panel-${menu.id}`}
              data-level={menu.id}
              inert={!active}
              aria-hidden={!active}
              className={`absolute inset-0 overflow-y-auto bg-background px-4 pb-10 pt-2 transition-transform duration-250 ease-settle sm:px-6 ${
                active ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                type="button"
                onClick={() => setLevel(null)}
                className="-ml-1 inline-flex min-h-[44px] items-center gap-2 px-1 text-[14px] font-medium text-secondary-text"
              >
                <BackArrow />
                All menus
              </button>

              <div className="mt-2 border-b border-subtle-stroke pb-5">
                <p className="font-heading text-[26px] font-semibold leading-tight tracking-[-0.02em] text-ink">{menu.lead.title}</p>
                <p className="mt-2 text-balance text-[15px] leading-[1.55] text-secondary-text">{menu.lead.text}</p>
                <RegionLink
                  href={menu.lead.href}
                  onClick={onClose}
                  className="mt-3 inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-medium text-blue"
                >
                  {menu.lead.cta}
                  <span aria-hidden>&rarr;</span>
                </RegionLink>
              </div>

              {menu.groups.map((group) => (
                <div key={group.heading} className="border-b border-subtle-stroke py-5">
                  <p className="pb-2 font-mono text-[11px] font-medium uppercase tracking-eyebrow text-overcast">{group.heading}</p>
                  <ul className="-mx-3" onClick={onClose}>
                    {group.links.map((link) => (
                      <li key={`${link.label}-${link.href}`} className="[&>a]:min-h-[44px] [&>a]:justify-center">
                        <MenuRow link={link} pathname={pathname} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="pt-6" onClick={onClose}>
                <NavFeatured feature={menu.feature} drawn={active} />
              </div>
            </div>
          );
        })}
      </nav>

      <div className="shrink-0 border-t border-subtle-stroke bg-background px-4 py-4 sm:px-6">
        <RegionLink href={NAV_CTA.href} onClick={onClose} className="btn-primary btn-lg w-full">
          {NAV_CTA.label}
        </RegionLink>
      </div>
    </div>
  );
}
