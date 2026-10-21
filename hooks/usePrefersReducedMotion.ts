"use client";

import { useSyncExternalStore } from "react";

/* True when the visitor asks for reduced motion (Design Rule 6), and kept
   in sync if the setting changes. False on the server and during
   hydration, so markup matches; components derive their resting state
   from it instead of setting state in an effect. */

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

const getSnapshot = () => window.matchMedia(QUERY).matches;
const getServerSnapshot = () => false;

export default function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
