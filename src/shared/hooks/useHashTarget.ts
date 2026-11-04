"use client";

import { useCallback, useSyncExternalStore } from "react";

/* Which of `ids` the URL hash points at, or -1. `aliases` maps older anchors
   onto an id. Next's same-page links change the hash with pushState, which
   fires no hashchange, so same-page anchor clicks are watched too. Used to
   mark the row a nav link lands on (/services [02]). */
export default function useHashTarget(ids: string[], aliases?: Record<string, string>) {
  const subscribe = useCallback((notify: () => void) => {
    const onClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest("a");
      if (anchor && new URL(anchor.href, location.href).pathname === location.pathname) window.setTimeout(notify, 0);
    };
    window.addEventListener("hashchange", notify);
    window.addEventListener("popstate", notify);
    document.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("hashchange", notify);
      window.removeEventListener("popstate", notify);
      document.removeEventListener("click", onClick, true);
    };
  }, []);
  const snapshot = useCallback(() => {
    const hash = window.location.hash.slice(1);
    return ids.indexOf(aliases?.[hash] ?? hash);
  }, [ids, aliases]);
  return useSyncExternalStore(subscribe, snapshot, () => -1);
}
