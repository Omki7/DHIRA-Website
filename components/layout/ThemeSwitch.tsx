"use client";

import { useEffect, useSyncExternalStore } from "react";
import { useUi } from "@/components/providers/UiProvider";
import { getServerTheme, getTheme, setTheme, subscribeTheme } from "@/lib/theme";

export default function ThemeSwitch({ labelled = false }: { labelled?: boolean }) {
  const { theme: copy } = useUi();
  const theme = useSyncExternalStore(subscribeTheme, getTheme, getServerTheme);

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = theme === "dark" ? "#0B1220" : "#FCFDFE";
  }, [theme]);

  return (
    <div className="theme-control">
      {labelled && <span className="theme-control-label">{copy.label}</span>}
      <button
        type="button"
        role="switch"
        aria-label={copy.toggle}
        aria-checked={theme === "dark"}
        title={theme === "dark" ? copy.toLight : copy.toDark}
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
