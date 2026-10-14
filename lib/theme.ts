export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "dhira-appearance";
export const THEME_ROUTES = ["/", "/akashic", "/about"] as const;
const THEME_EVENT = "dhira:appearance";

export const supportsTheme = (pathname: string) =>
  THEME_ROUTES.some((route) => route === (pathname.replace(/\/$/, "") || "/"));

// Runs before the body paints. A first visit always starts in light mode.
export const THEME_INIT_SCRIPT = `(()=>{let t="light";try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")t="dark"}catch{}const r=document.documentElement;r.dataset.theme=t;const p=location.pathname.replace(/\\/$/,"")||"/";const supported=${JSON.stringify(THEME_ROUTES)}.includes(p);if(supported)r.dataset.themeBoot="";const m=document.querySelector('meta[name="theme-color"]');if(m)m.content=t==="dark"&&supported?"#0B1019":"#FFFFFF"})()`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function getServerTheme(): Theme {
  return "light";
}

export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // The current tab still works when storage is unavailable.
  }
  window.dispatchEvent(new Event(THEME_EVENT));
}

export function subscribeTheme(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    onChange();
  };
  window.addEventListener(THEME_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(THEME_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}
