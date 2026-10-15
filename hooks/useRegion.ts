"use client";

import { useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { pageRegion, type Region } from "@/lib/region";

/* The visitor's region (see lib/region.ts). Three inputs, in this order:
   the page being viewed (/in/... is India), the region the visitor chose
   (footer switch or the suggestion card, kept in localStorage), and a guess
   from the device time zone. India runs on one zone, so the guess needs no
   lookup service and nothing leaves the browser. During SSR and hydration
   only the page is known, so links render their international hrefs and
   settle after mount. */

const KEY = "dhira-region";
const EVENT = "dhira-region-change";
const INDIA_ZONES = ["Asia/Kolkata", "Asia/Calcutta"];

const isRegion = (value: unknown): value is Region => value === "intl" || value === "in";

function readChoice(): Region | null {
  try {
    const value = localStorage.getItem(KEY);
    return isRegion(value) ? value : null;
  } catch {
    return null;
  }
}

function detect(): Region {
  try {
    return INDIA_ZONES.includes(Intl.DateTimeFormat().resolvedOptions().timeZone) ? "in" : "intl";
  } catch {
    return "intl";
  }
}

/** Record the visitor's choice; every useRegion on the page follows. */
export function chooseRegion(region: Region) {
  try {
    localStorage.setItem(KEY, region);
  } catch {
    /* Storage blocked: the choice lasts until the next page load. */
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

/* One string snapshot so React compares it by value: "<choice>:<detected>". */
const snapshot = () => `${readChoice() ?? "none"}:${detect()}`;
const serverSnapshot = () => "";

export default function useRegion() {
  const pathname = usePathname() ?? "/";
  const snap = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const [rawChoice, rawDetected] = snap.split(":");
  const choice = isRegion(rawChoice) ? rawChoice : null;
  const detected = isRegion(rawDetected) ? rawDetected : null;
  const page = pageRegion(pathname);

  return {
    pathname,
    /** The page's own region; null on a page that is the same everywhere. */
    page,
    /** What the visitor chose; null until they choose. */
    choice,
    /** The time zone guess; null until mounted. */
    detected,
    /** The region site links resolve to. */
    region: page ?? choice ?? detected ?? "intl",
  };
}
