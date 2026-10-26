"use client";

import { useCallback, useSyncExternalStore } from "react";

/* True while the viewport is at least `px` wide, kept in sync with resizes.
   True on the server and during hydration, so a figure renders its desktop
   arrangement first and settles on its small-screen one after. */
export default function useMinWidth(px: number) {
  const query = `(min-width: ${px}px)`;
  const subscribe = useCallback(
    (onChange: () => void) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => true);
}
