"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { getServerTheme, getTheme, setTheme, subscribeTheme, supportsTheme } from "@/lib/theme";

export default function ThemeSwitch({ labelled = false }: { labelled?: boolean }) {
  const pathname = usePathname() ?? "/";
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);
  const supported = supportsTheme(pathname);

  useEffect(() => {
    // Once hydrated, the page marker scopes colours across client navigation.
    document.documentElement.removeAttribute("data-theme-boot");
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = supported && theme === "dark" ? "#0B1019" : "#FFFFFF";
  }, [pathname, supported, theme]);

  if (!supported) return null;

  return (
    <div className="theme-control">
      {labelled && <span className="theme-control-label">Appearance</span>}
      <button
        type="button"
        role="switch"
        aria-label="Dark mode"
        aria-checked={theme === "dark"}
        title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        className="theme-switch"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        <span className="theme-switch-track" aria-hidden="true">
          <span className="theme-switch-thumb" />
          <svg className="theme-switch-sun" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="3.5" />
            <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
          </svg>
          <svg className="theme-switch-moon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.5 13.2A8.5 8.5 0 0 1 10.8 3.5a8.5 8.5 0 1 0 9.7 9.7Z" />
          </svg>
        </span>
      </button>
    </div>
  );
}
