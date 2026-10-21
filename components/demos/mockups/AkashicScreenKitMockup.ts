/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The screen kit for the /akashic hero stage (AkashicModuleScreensMockup):
 * shared desktop-app chrome (window bar, top bar, global module rail) plus
 * the Data Pipelines canvas and Warehouse star schema. Every screen on the stage
 * renders through these helpers, so the seven read as one product. Static
 * HTML strings consumed via dangerouslySetInnerHTML.
 *
 * Restored 20 Oct 2026 (founder: bring the live wireframes back, smaller and
 * illustrative). From git 3b9d8c4, where it was HeroProductScreensMockup.
 *
 * ONE DEMO WORLD, IN USD. These numbers are canon for every wireframe on
 * /akashic:
 *   Sales Performance · Q2 FY26 · $25.4M net revenue · 82,401 fact rows
 *   plan attainment: North 106 · West 102 · Central 99 · East 97 · South 92
 *   South is the only laggard, 8% short, on two unsigned distributor
 *   renewals; the gap is $80,500 (matches [01] AkashicFourMoves)
 *   top accounts: Whitmore Retail $4.2M · Kirkwood Traders $3.1M ·
 *   Ardmore Foods $2.4M
 * Never reintroduce ₹ here: the enterprise demo world is $, the
 * public-programmes world is ₹, and they never share a screen.
 */

/* ---------------------------------------------------------------- */
/* Design tokens (keep every screen on the same system)             */
/*   text:    rgb(var(--ink)) / rgb(var(--secondary-text)) / rgb(var(--tertiary-text))                           */
/*   borders: rgb(var(--card-line)) (cards, chrome) · rgb(var(--subtle-stroke)) (soft dividers)     */
/*   accents: blue rgb(var(--blue)) · green rgb(var(--positive)) · amber #E0A93B          */
/*            rose #E5547B/rgb(var(--diagram-pink)) · purple #7C5CFC                 */
/*   shadow:  0 1px 2px rgba(18,20,26,0.05) — flat, crisp, no glow  */
/* ---------------------------------------------------------------- */

const LOGO = `<svg viewBox="0 0 200 200" width="19" height="19" fill="none" style="overflow:visible;flex-shrink:0"><line x1="100" y1="50" x2="58" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="100" y1="50" x2="142" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="79" y1="103" x2="121" y2="103" stroke="rgb(var(--blue))" stroke-width="12"/><circle cx="58" cy="156" r="16" fill="rgb(var(--ink))"/><circle cx="142" cy="156" r="16" fill="rgb(var(--ink))"/><circle cx="79" cy="103" r="14" fill="rgb(var(--ink))"/><circle cx="121" cy="103" r="14" fill="rgb(var(--ink))"/><circle cx="100" cy="50" r="18" fill="rgb(var(--blue))"/><circle cx="124" cy="30" r="8" fill="rgb(var(--blue))" opacity="0.6"/><circle cx="80" cy="26" r="6" fill="rgb(var(--blue))" opacity="0.45"/></svg>`;

const SPARKLE_PATH = `M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z`;

export const LIVE_CHIP = `<div style="height:24px;padding:0 9px;background:rgb(var(--positive-subtle));border:1px solid rgb(var(--positive-border));border-radius:20px;display:flex;align-items:center;gap:5px;flex-shrink:0"><span style="width:6px;height:6px;border-radius:50%;background:rgb(var(--positive));animation:softpulse 2.4s infinite"></span><span style="font-size:10.5px;color:rgb(var(--positive-text));font-weight:600">Live</span></div>`;

/* Browser-style window bar — identical on every screen. */
export const WINDOW_BAR = `<div style="position:relative;height:36px;display:flex;align-items:center;padding:0 14px;background:rgb(var(--primary-bg));border-bottom:1px solid rgb(var(--card-line));flex-shrink:0;gap:7px">
  <div style="width:11px;height:11px;border-radius:50%;background:#EC6A5F"></div>
  <div style="width:11px;height:11px;border-radius:50%;background:#F4BF50"></div>
  <div style="width:11px;height:11px;border-radius:50%;background:#61C454"></div>
  <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;height:22px;padding:0 34px;background:rgb(var(--tertiary-bg));border-radius:6px">
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
    <span style="font-size:10px;color:rgb(var(--inkSoft));letter-spacing:0.01em">app.akashic.dhira.ai</span>
  </div>
</div>`;

/* App top bar — logo, breadcrumb, global search, notifications, user. */
export function appTopBar(section: string, page: string) {
  return `<div style="height:42px;border-bottom:1px solid rgb(var(--card-line));display:flex;align-items:center;padding:0 14px;gap:9px;flex-shrink:0;background:rgb(var(--screen-surface))">
    ${LOGO}
    <span style="font-size:12.5px;font-weight:700;color:rgb(var(--ink));letter-spacing:-0.02em;margin-left:-13px">kashic</span>
    <span aria-hidden="true" style="font-size:11px;color:rgb(var(--line))">/</span><span style="font-size:11px;color:rgb(var(--secondary-text));cursor:pointer">${section}</span>
    <span aria-hidden="true" style="font-size:11px;color:rgb(var(--line))">/</span><span style="font-size:11px;color:rgb(var(--ink));font-weight:600">${page}</span>
    <div style="flex:1"></div>
    <div style="display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:1px solid rgb(var(--card-line));border-radius:7px;background:rgb(var(--primary-bg));width:148px">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <span style="font-size:10.5px;color:rgb(var(--tertiary-text))">Search</span>
      <div style="flex:1"></div>
      <span style="font-size:8.5px;color:rgb(var(--tertiary-text));border:1px solid rgb(var(--card-line));border-radius:4px;padding:1px 4px;background:rgb(var(--screen-surface))">⌘K</span>
    </div>
    <div style="position:relative;width:26px;height:26px;border-radius:7px;border:1px solid rgb(var(--card-line));background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;flex-shrink:0;cursor:pointer" title="Notifications">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span style="position:absolute;top:-5px;right:-5px;min-width:13px;height:13px;border-radius:7px;background:#B93158;border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;font-size:7.5px;color:#fff;font-weight:700;padding:0 2px;line-height:1">3</span>
    </div>
    <div style="display:flex;align-items:center;gap:3px;flex-shrink:0;cursor:pointer" title="Account">
      <div style="width:25px;height:25px;border-radius:50%;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:600">AR</span></div>
      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </div>`;
}

/* Global module rail — the "one platform" cue on every screen. */
const RAIL_ICONS: Array<[string, string]> = [
  ["pipelines", `<rect x="3" y="3" width="8" height="8" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect x="13" y="13" width="8" height="8" rx="2"/>`],
  ["master", `<circle cx="9" cy="9" r="6"/><circle cx="15" cy="15" r="6"/>`],
  ["warehouse", `<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/><path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"/>`],
  ["ml", `<path d="M10 2v7.5L4.2 19a1.7 1.7 0 0 0 1.5 2.5h12.6a1.7 1.7 0 0 0 1.5-2.5L14 9.5V2"/><path d="M8.5 2h7M7 16h10"/>`],
  ["ask", ``],
  ["bi", `<path d="M3 3v18h18"/><path d="M8 17v-5M13 17V8M18 17v-9"/>`],
  ["governance", `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>`],
];

export function moduleRail(active: string) {
  const items = RAIL_ICONS.map(([key, paths]) => {
    const on = key === active;
    const c = on ? "rgb(var(--blue))" : "rgb(var(--tertiary-text))";
    const svg =
      key === "ask"
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="${c}" stroke="none"><path d="${SPARKLE_PATH}"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
    return `<div style="position:relative;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;${on ? "background:rgb(var(--blue-subtle));" : ""}cursor:pointer">${on ? `<span style="position:absolute;left:-8px;top:7px;width:3px;height:16px;border-radius:0 2px 2px 0;background:#3E63DD"></span>` : ""}${svg}</div>`;
  }).join("");
  return `<div style="width:46px;border-right:1px solid rgb(var(--card-line));background:rgb(var(--primary-bg));display:flex;flex-direction:column;align-items:center;padding:9px 0 10px;gap:4px;flex-shrink:0">
    <div style="width:28px;height:28px;border-radius:8px;background:rgb(var(--blue-solid));display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0" title="DHIRA workspace"><span style="font-size:10px;color:#fff;font-weight:700;letter-spacing:0.02em">DH</span></div>
    <div style="width:22px;height:1px;background:rgb(var(--card-line));margin:2px 0 3px;flex-shrink:0"></div>
    ${items}
    <div style="flex:1"></div>
    <div style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Help & docs"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.4-3 4"/><path d="M12 17h.01"/></svg></div>
    <div style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Settings"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg></div>
  </div>`;
}

/* Shared sidebar search box. */
export function sidebarSearch(placeholder: string) {
  return `<div style="padding:10px 11px 8px"><div style="background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));border-radius:8px;padding:6px 9px;display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-size:11px;color:rgb(var(--tertiary-text))">${placeholder}</span></div></div>`;
}

/* ---------------------------------------------------------------- */
/* Data Pipelines — visual pipeline canvas, sources → unify → model      */
/* ---------------------------------------------------------------- */
export const PIPELINES_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:var(--font-sans);background:rgb(var(--primary-bg))">
  ${WINDOW_BAR}
  ${appTopBar("Data Pipelines", "Sales Performance")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("pipelines")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid rgb(var(--card-line));display:flex;align-items:center;padding:0 14px;gap:10px;flex-shrink:0;background:rgb(var(--screen-surface))">
        <span style="font-size:12px;font-weight:700;color:rgb(var(--ink));letter-spacing:-0.01em;white-space:nowrap">Sales Performance</span>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer;height:27px;padding:0 11px;background:rgb(var(--anchor));border-radius:7px;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg><span style="font-size:11.5px;color:#fff;font-weight:600">Run</span></div>
        <div style="display:flex;align-items:center;height:27px;background:rgb(var(--tertiary-bg));border-radius:8px;padding:2px;flex-shrink:0">
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;background:rgb(var(--screen-surface));border-radius:6px;font-size:10.5px;font-weight:600;color:rgb(var(--ink));box-shadow:none">Canvas</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Runs</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Logs</span>
        </div>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="height:24px;padding:0 9px;background:rgb(var(--positive-subtle));border:1px solid rgb(var(--positive-border));border-radius:20px;display:flex;align-items:center;gap:5px;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:10.5px;color:rgb(var(--positive-text));font-weight:600">Verified</span></div>
        <div style="height:27px;padding:0 10px;border:1px solid rgb(var(--card-line));border-radius:7px;background:rgb(var(--screen-surface));display:flex;align-items:center;gap:6px;cursor:pointer;flex-shrink:0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;color:rgb(var(--secondary-text));font-weight:500">Schedule: Hourly</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;flex-shrink:0">
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff;font-weight:700">AR</span></div>
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;margin-left:-7px"><span style="font-size:9px;color:#fff;font-weight:700">DK</span></div>
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--tertiary-bg));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;margin-left:-7px"><span style="font-size:9px;color:rgb(var(--secondary-text));font-weight:700">+2</span></div>
        </div>
        <span style="font-size:10.5px;color:rgb(var(--tertiary-text))">Run #1,284 · 6m ago · 82,401 rows</span>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid rgb(var(--card-line));display:flex;flex-direction:column;flex-shrink:0;background:rgb(var(--screen-surface))">
          ${sidebarSearch("Search sources")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>BUSINESS SYSTEMS</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">4</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Salesforce</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">CRM</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:rgb(var(--primary-bg))"><svg width="7" height="11" viewBox="0 0 8 12" fill="rgb(var(--line))" style="flex-shrink:0;margin-right:-3px"><circle cx="2" cy="2" r="1"/><circle cx="6" cy="2" r="1"/><circle cx="2" cy="6" r="1"/><circle cx="6" cy="6" r="1"/><circle cx="2" cy="10" r="1"/><circle cx="6" cy="10" r="1"/></svg><div style="width:19px;height:19px;border-radius:5px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">N</span></div><span style="font-size:11.5px;color:rgb(var(--ink))">NetSuite</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">ERP</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#FF7A59;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span aria-hidden="true" style="font-size:11px;color:#fff;font-weight:700">h</span></div><span style="font-size:11.5px;color:rgb(var(--ink))">HubSpot</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">Mktg</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#0875A8;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">W</span></div><span style="font-size:11.5px;color:rgb(var(--ink))">Workday</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">HR</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>FILES &amp; SHEETS</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#1E7A45;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">X</span></div><span style="font-size:11.5px;color:rgb(var(--ink))">Sales Plan FY26</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">Excel</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#1A8E5F;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M9 3v18M3 9h18"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Forecast Sheet</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>DATABASES</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#336791;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">PG</span></div><span style="font-size:11.5px;color:rgb(var(--ink))">Orders DB</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">Postgres</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#00618A;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">My</span></div><span style="font-size:11.5px;color:rgb(var(--ink))">Store POS</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">MySQL</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>STREAMING</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">1</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:rgb(var(--anchor));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9z"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Store Events</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">Kafka</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#29B5E8;display:flex;align-items:center;justify-content:center"><span aria-hidden="true" style="font-size:9px;color:#fff">❄</span></div><div style="min-width:0"><div style="font-size:10.5px;color:rgb(var(--ink));font-weight:600">Snowflake</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Destination warehouse</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:rgb(var(--screen-surface));background-image:radial-gradient(circle,rgb(var(--lineSoft)) 1px,transparent 1px);background-size:22px 22px">
          <svg width="674" height="482" viewBox="0 0 674 482" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M172,80 C 213,80 207,200 248,204" stroke="rgb(var(--line))" fill="none" stroke-width="1.2"/>
            <path d="M172,232 L 248,224" stroke="rgb(var(--line))" fill="none" stroke-width="1.2"/>
            <path d="M172,384 C 213,384 207,248 248,244" stroke="rgb(var(--line))" fill="none" stroke-width="1.2"/>
            <path d="M412,224 C 434,224 434,196 454,196" stroke="rgb(var(--blue))" fill="none" stroke-width="1.6"/>
            <path d="M412,224 C 434,224 434,316 454,316" stroke="rgb(var(--line))" fill="none" stroke-width="1.2"/>
            <path d="M243,199.7 L248,204 L243,208.3" stroke="rgb(var(--tertiary-text))" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M243,219.7 L248,224 L243,228.3" stroke="rgb(var(--tertiary-text))" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M243,239.7 L248,244 L243,248.3" stroke="rgb(var(--tertiary-text))" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M449,191.7 L454,196 L449,200.3" stroke="rgb(var(--blue))" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M449,311.7 L454,316 L449,320.3" stroke="rgb(var(--tertiary-text))" fill="none" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="254" cy="204" r="3" fill="rgb(var(--tertiary-text))"/><circle cx="254" cy="224" r="3" fill="rgb(var(--tertiary-text))"/><circle cx="254" cy="244" r="3" fill="rgb(var(--tertiary-text))"/>
            <circle cx="460" cy="196" r="3.5" fill="rgb(var(--blue))"/><circle cx="460" cy="316" r="3" fill="rgb(var(--tertiary-text))"/>
            <circle r="2.1" fill="rgb(var(--tertiary-text))"><animateMotion dur="3.2s" begin="0s" repeatCount="indefinite" path="M172,80 C 213,80 207,200 248,204"/></circle>
            <circle r="2.1" fill="rgb(var(--tertiary-text))"><animateMotion dur="3.2s" begin="-1.1s" repeatCount="indefinite" path="M172,232 L 248,224"/></circle>
            <circle r="2.1" fill="rgb(var(--tertiary-text))"><animateMotion dur="3.2s" begin="-2.2s" repeatCount="indefinite" path="M172,384 C 213,384 207,248 248,244"/></circle>
            <circle r="2.4" fill="rgb(var(--blue))"><animateMotion dur="2.2s" begin="-0.6s" repeatCount="indefinite" path="M412,224 C 434,224 434,196 454,196"/></circle>
            <g font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="9">
              <rect x="173" y="133" width="74" height="15" rx="7.5" fill="rgb(var(--screen-surface))" stroke="rgb(var(--card-line))"/><text x="210" y="144" text-anchor="middle" fill="rgb(var(--secondary-text))">82.4k orders</text>
              <rect x="178" y="220.5" width="64" height="15" rx="7.5" fill="rgb(var(--screen-surface))" stroke="rgb(var(--card-line))"/><text x="210" y="231.5" text-anchor="middle" fill="rgb(var(--secondary-text))">60 targets</text>
              <rect x="168" y="308" width="84" height="15" rx="7.5" fill="rgb(var(--screen-surface))" stroke="rgb(var(--card-line))"/><text x="210" y="319" text-anchor="middle" fill="rgb(var(--secondary-text))">81.1k invoices</text>
              <rect x="413.5" y="202.5" width="41" height="15" rx="7.5" fill="rgb(var(--panel))" stroke="rgb(var(--blue-border))"/><text x="434" y="213.5" text-anchor="middle" fill="rgb(var(--blue))" font-weight="600">82.4k</text>
              <rect x="413.5" y="262.5" width="41" height="15" rx="7.5" fill="rgb(var(--screen-surface))" stroke="rgb(var(--card-line))"/><text x="434" y="273.5" text-anchor="middle" fill="rgb(var(--secondary-text))">82.4k</text>
            </g>
          </svg>
          <div style="position:absolute;top:12px;left:18px;width:154px;text-align:center"><span style="font-size:9px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.08em;font-family:var(--font-mono)">SOURCES · 3</span></div>
          <div style="position:absolute;top:12px;left:254px;width:158px;text-align:center"><span style="font-size:9px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.08em;font-family:var(--font-mono)">TRANSFORM · 1</span></div>
          <div style="position:absolute;top:12px;left:460px;width:150px;text-align:center"><span style="font-size:9px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.08em;font-family:var(--font-mono)">OUTPUTS · 2</span></div>
          <div style="position:absolute;left:18px;top:40px;width:154px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:rgb(var(--ink))">Salesforce</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Completed orders</div></div></div>
            <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.4" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6"/><path d="M22 4 12 14.01l-3-3"/></svg><span style="font-size:9px;color:rgb(var(--secondary-text))">82,401 rows · one per order</span></div>
          </div>
          <div style="position:absolute;left:18px;top:198px;width:154px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#1E7A45;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:12px;color:#fff;font-weight:700">X</span></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:rgb(var(--ink))">Sales Plan FY26</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Regional targets</div></div></div>
            <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><span style="font-size:9px;color:rgb(var(--secondary-text))">60 rows · 5 regions × 12 mo</span></div>
          </div>
          <div style="position:absolute;left:18px;top:344px;width:154px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:12px;color:#fff;font-weight:700">N</span></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:rgb(var(--ink))">NetSuite</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Billed invoices</div></div></div>
            <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span style="font-size:9px;color:rgb(var(--secondary-text))">81,072 rows · one per invoice</span></div>
          </div>
          <div style="position:absolute;left:254px;top:176px;width:158px;background:rgb(var(--screen-surface));border:1.5px solid rgb(var(--blue));border-radius:11px;box-shadow:none">
            <div style="position:absolute;top:-3.5px;left:-3.5px;width:6px;height:6px;background:rgb(var(--screen-surface));border:1.2px solid rgb(var(--blue));border-radius:1.5px"></div>
            <div style="position:absolute;top:-3.5px;right:-3.5px;width:6px;height:6px;background:rgb(var(--screen-surface));border:1.2px solid rgb(var(--blue));border-radius:1.5px"></div>
            <div style="position:absolute;bottom:-3.5px;left:-3.5px;width:6px;height:6px;background:rgb(var(--screen-surface));border:1.2px solid rgb(var(--blue));border-radius:1.5px"></div>
            <div style="position:absolute;bottom:-3.5px;right:-3.5px;width:6px;height:6px;background:rgb(var(--screen-surface));border:1.2px solid rgb(var(--blue));border-radius:1.5px"></div>
            <div style="display:flex;align-items:center;gap:8px;padding:9px 11px;background:rgb(var(--panel));border-radius:9.5px 9.5px 0 0"><div style="width:26px;height:26px;border-radius:7px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6 4-4 4 4M12 2v14M4 18c4 0 4 4 8 4s4-4 8-4"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:700;color:rgb(var(--ink))">Unify Sales</div><div style="font-size:9px;color:rgb(var(--blue));white-space:nowrap">Join · 3 inputs</div></div><svg width="11" height="11" viewBox="0 0 24 24" fill="rgb(var(--tertiary-text))" style="cursor:pointer;flex-shrink:0"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg></div>
            <div style="padding:7px 11px 8px;display:flex;flex-direction:column;gap:4px">
              <span style="font-size:9px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.05em">JOINS ON</span>
              <div style="display:flex;align-items:center;gap:6px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg><span style="font-size:10px;color:rgb(var(--secondary-text))">Invoices</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--ink));font-family:var(--font-mono)">order_no</span></div>
              <div style="display:flex;align-items:center;gap:6px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg><span style="font-size:10px;color:rgb(var(--secondary-text))">Plan</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--ink));font-family:var(--font-mono)">region + month</span></div>
              <span style="font-size:9px;font-weight:700;color:rgb(var(--blue));letter-spacing:0.05em;padding-top:3px">OUTPUT</span>
              <div style="display:flex;align-items:baseline"><span style="font-size:9.5px;color:rgb(var(--ink));font-weight:600;font-family:var(--font-mono)">fact_sales</span><span style="font-size:9.5px;color:rgb(var(--secondary-text))"> · 1 row per sale</span></div>
            </div>
            <div style="border-top:1px solid rgb(var(--blue-subtle));background:rgb(var(--panel));padding:5px 11px;display:flex;align-items:center;gap:5px;border-radius:0 0 9.5px 9.5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.4" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6"/><path d="M22 4 12 14.01l-3-3"/></svg><span style="font-size:9px;color:rgb(var(--secondary-text))">82,401 rows · 0 rejected</span></div>
          </div>
          <div style="position:absolute;left:460px;top:136px;width:150px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 11px;border-bottom:1px solid rgb(var(--tertiary-bg))"><div style="width:26px;height:26px;border-radius:7px;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:700;color:rgb(var(--ink))">Sales Performance</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Business model</div></div></div>
            <div style="padding:8px 11px;display:flex;flex-direction:column;gap:6px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text))">Tables</span><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">fact + 4 dims</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text))">Fact rows</span><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">82,401</span></div>
              <div style="height:24px;border-radius:6px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:rgb(var(--positive));animation:softpulse 2.4s infinite"></span><span style="font-size:10px;color:rgb(var(--positive-text));font-weight:600">Powering 3 dashboards</span></div>
            </div>
          </div>
          <div style="position:absolute;left:460px;top:294px;width:150px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;padding:9px 11px;display:flex;align-items:center;gap:9px">
            <div style="width:26px;height:26px;border-radius:7px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg></div>
            <div style="min-width:0"><div style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Quality checks</div><div style="font-size:9.5px;color:rgb(var(--secondary-text))">23 passing · <b style="color:rgb(var(--diagram-gold));font-weight:600">1 warning</b></div></div>
          </div>
          <div style="position:absolute;bottom:12px;left:14px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;padding:5px 9px;display:flex;align-items:center;gap:9px;box-shadow:none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
            <span style="font-size:10.5px;color:rgb(var(--ink));font-weight:600;min-width:30px;text-align:center">100%</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
            <div style="width:1px;height:14px;background:rgb(var(--card-line))"></div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
          <div style="position:absolute;top:34px;right:14px;display:flex;flex-direction:column;gap:1px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:9px;box-shadow:none;padding:3px">
            <div style="width:26px;height:26px;border-radius:6px;background:rgb(var(--blue-subtle));display:flex;align-items:center;justify-content:center;cursor:pointer" title="Select"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--blue))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/></svg></div>
            <div style="width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Pan"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 11V6a2 2 0 0 0-4 0v5"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg></div>
            <div style="width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Add step"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/></svg></div>
            <div style="width:26px;height:26px;border-radius:6px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Comment"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;width:108px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:9px;box-shadow:none;padding:5px">
            <div style="position:relative;height:56px;background:rgb(var(--primary-bg));border-radius:5px;overflow:hidden">
              <span style="position:absolute;left:8px;top:7px;width:15px;height:8px;border:1px solid rgb(var(--line));border-radius:2px;background:rgb(var(--screen-surface))"></span>
              <span style="position:absolute;left:8px;top:24px;width:15px;height:8px;border:1px solid rgb(var(--line));border-radius:2px;background:rgb(var(--screen-surface))"></span>
              <span style="position:absolute;left:8px;top:41px;width:15px;height:8px;border:1px solid rgb(var(--line));border-radius:2px;background:rgb(var(--screen-surface))"></span>
              <span style="position:absolute;left:44px;top:23px;width:17px;height:10px;border:1px solid #9DB1F0;border-radius:2px;background:rgb(var(--blue-subtle))"></span>
              <span style="position:absolute;left:80px;top:14px;width:17px;height:8px;border:1px solid rgb(var(--line));border-radius:2px;background:rgb(var(--screen-surface))"></span>
              <span style="position:absolute;left:80px;top:34px;width:17px;height:8px;border:1px solid rgb(var(--line));border-radius:2px;background:rgb(var(--screen-surface))"></span>
              <span style="position:absolute;left:2px;top:2px;right:2px;bottom:2px;border:1.2px solid #B9C7F2;border-radius:3px"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- */
/* Ask — conversational answers grounded in the governed model      */
/* ---------------------------------------------------------------- */
export const MODELS_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:var(--font-sans);background:rgb(var(--primary-bg))">
  ${WINDOW_BAR}
  ${appTopBar("Warehouse", "Sales Performance")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("warehouse")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid rgb(var(--card-line));display:flex;align-items:center;padding:0 14px;gap:10px;flex-shrink:0;background:rgb(var(--screen-surface))">
        <span style="font-size:12px;font-weight:700;color:rgb(var(--ink));letter-spacing:-0.01em;white-space:nowrap">Sales Performance</span>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="height:27px;padding:0 11px;background:rgb(var(--anchor));border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg><span style="font-size:11.5px;color:#fff;font-weight:600">Add table</span></div>
        <div style="display:flex;align-items:center;height:27px;background:rgb(var(--tertiary-bg));border-radius:8px;padding:2px;flex-shrink:0">
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;background:rgb(var(--screen-surface));border-radius:6px;font-size:10.5px;font-weight:600;color:rgb(var(--ink));box-shadow:none">Diagram</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Data</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Quality</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Docs</span>
        </div>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:11.5px;color:rgb(var(--positive-text));font-weight:600">Verified · v1.4</span></div>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;flex-shrink:0">
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff;font-weight:700">AR</span></div>
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;margin-left:-7px"><span style="font-size:9px;color:#fff;font-weight:700">DK</span></div>
        </div>
        <span style="font-size:10.5px;color:rgb(var(--tertiary-text))">82,401 fact rows · refreshed 6m ago</span>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid rgb(var(--card-line));display:flex;flex-direction:column;flex-shrink:0;background:rgb(var(--screen-surface))">
          ${sidebarSearch("Search the model")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;gap:6px;padding:6px 3px 4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 12h7M11 5v14M18 8v8"/></svg><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.06em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>METRICS</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">3</span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.4" stroke-linecap="round" style="cursor:pointer;margin-left:6px;flex-shrink:0"><path d="M12 5v14M5 12h14"/></svg></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:rgb(var(--positive));font-weight:700">∑</span></div><span style="font-size:11.5px;color:rgb(var(--ink));font-weight:500">Revenue</span><div style="flex:1"></div><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:rgb(var(--primary-bg))"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:rgb(var(--positive));font-weight:700">∑</span></div><span style="font-size:11.5px;color:rgb(var(--ink));font-weight:500;white-space:nowrap">Units Sold</span><div style="flex:1"></div><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:rgb(var(--positive));font-weight:700">%</span></div><span style="font-size:11.5px;color:rgb(var(--ink));font-weight:500;white-space:nowrap">Plan Attainment</span><div style="flex:1"></div><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;padding:11px 3px 4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="rgb(var(--blue))" stroke="none"><rect x="3" y="3" width="18" height="18" rx="3"/></svg><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.06em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>FACTS</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">1</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:rgb(var(--blue-subtle))"><div style="width:18px;height:18px;border-radius:5px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink));font-weight:600">Sales</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">82.4k</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;padding:11px 3px 4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/></svg><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.06em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>DIMENSIONS</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">4</span><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.4" stroke-linecap="round" style="cursor:pointer;margin-left:6px;flex-shrink:0"><path d="M12 5v14M5 12h14"/></svg></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid rgb(var(--diagram-purple-line));background:rgb(var(--diagram-purple-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Customer</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid rgb(var(--diagram-purple-line));background:rgb(var(--diagram-purple-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Product</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid rgb(var(--diagram-purple-line));background:rgb(var(--diagram-purple-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Region</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid rgb(var(--diagram-purple-line));background:rgb(var(--diagram-purple-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Date</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#29B5E8;display:flex;align-items:center;justify-content:center"><span aria-hidden="true" style="font-size:9px;color:#fff">❄</span></div><div style="min-width:0"><div style="font-size:10.5px;color:rgb(var(--ink));font-weight:600">snowflake_prod.gold</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">5 tables · dbt-managed</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:rgb(var(--screen-surface));background-image:radial-gradient(circle,rgb(var(--lineSoft)) 1px,transparent 1px);background-size:22px 22px">
          <svg width="674" height="482" viewBox="0 0 674 482" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M172,108 C 205,108 200,190 230,195" stroke="rgb(var(--diagram-purple-line))" fill="none" stroke-width="1.5"/>
            <path d="M172,336 C 205,336 200,258 230,252" stroke="rgb(var(--diagram-purple-line))" fill="none" stroke-width="1.5"/>
            <path d="M398,195 C 425,195 422,108 452,108" stroke="rgb(var(--diagram-purple-line))" fill="none" stroke-width="1.5"/>
            <path d="M398,252 C 425,252 422,336 452,336" stroke="rgb(var(--diagram-purple-line))" fill="none" stroke-width="1.5"/>
            <circle cx="230" cy="195" r="3.5" fill="rgb(var(--blue))"/><circle cx="230" cy="252" r="3.5" fill="rgb(var(--blue))"/>
            <circle cx="398" cy="195" r="3.5" fill="rgb(var(--blue))"/><circle cx="398" cy="252" r="3.5" fill="rgb(var(--blue))"/>
            <circle cx="172" cy="108" r="3" fill="#7C5CFC"/><circle cx="172" cy="336" r="3" fill="#7C5CFC"/>
            <circle cx="452" cy="108" r="3" fill="#7C5CFC"/><circle cx="452" cy="336" r="3" fill="#7C5CFC"/>
            <g font-family="ui-monospace,SFMono-Regular,Menlo,monospace" font-size="9" font-weight="600" fill="rgb(var(--tertiary-text))">
              <text x="180" y="100" text-anchor="middle">1</text><text x="221" y="187" text-anchor="middle">N</text>
              <text x="180" y="329" text-anchor="middle">1</text><text x="221" y="247" text-anchor="middle">N</text>
              <text x="444" y="100" text-anchor="middle">1</text><text x="404" y="187" text-anchor="middle">N</text>
              <text x="444" y="329" text-anchor="middle">1</text><text x="404" y="247" text-anchor="middle">N</text>
            </g>
          </svg>
          <div style="position:absolute;left:22px;top:68px;width:150px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--diagram-purple-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="height:32px;background:rgb(var(--diagram-purple-bg));border-bottom:1px solid rgb(var(--diagram-purple-line));display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg><span style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Customer</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 7px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">customer_id</span><div style="flex:1"></div><span style="font-size:9px;color:#C08A2D;font-weight:700">PK</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Name</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Segment</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">text</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: account, buyer</div>
            </div>
            <div style="border-top:1px solid rgb(var(--tertiary-bg));background:rgb(var(--primary-bg));padding:4px 11px;display:flex;align-items:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:rgb(var(--positive))"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">12,447 rows · updated 6m ago</span></div>
          </div>
          <div style="position:absolute;left:22px;top:296px;width:150px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--diagram-purple-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="height:32px;background:rgb(var(--diagram-purple-bg));border-bottom:1px solid rgb(var(--diagram-purple-line));display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg><span style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Region</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 7px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">region_id</span><div style="flex:1"></div><span style="font-size:9px;color:#C08A2D;font-weight:700">PK</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Name</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Target</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">numeric</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: territory, market</div>
            </div>
            <div style="border-top:1px solid rgb(var(--tertiary-bg));background:rgb(var(--primary-bg));padding:4px 11px;display:flex;align-items:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:rgb(var(--positive))"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">5 rows · updated 6m ago</span></div>
          </div>
          <div style="position:absolute;left:230px;top:118px;width:168px;background:rgb(var(--screen-surface));border:1.5px solid rgb(var(--blue));border-radius:11px;box-shadow:none;overflow:hidden">
            <div style="height:34px;background:rgb(var(--blue-solid));display:flex;align-items:center;gap:8px;padding:0 12px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg><span style="font-size:12px;font-weight:700;color:#fff">Sales</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--blue-border));font-weight:600">FACT</span><svg width="11" height="11" viewBox="0 0 24 24" fill="rgb(var(--blue-border))" style="cursor:pointer;margin-left:2px;flex-shrink:0"><circle cx="12" cy="5" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="12" cy="19" r="1.8"/></svg></div>
            <div style="padding:7px 12px 5px"><div style="font-size:9.5px;color:rgb(var(--secondary-text));line-height:1.4">One row per completed sale</div></div>
            <div style="padding:0 12px 4px"><span style="font-size:9px;font-weight:700;color:rgb(var(--positive));letter-spacing:0.05em">MEASURES</span></div>
            <div style="padding:0 12px;display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:rgb(var(--positive));font-weight:700">∑</span><span style="font-size:10.5px;color:rgb(var(--ink));font-weight:500;white-space:nowrap">Revenue</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--secondary-text));font-family:var(--font-mono);white-space:nowrap">paid value</span></div>
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:rgb(var(--positive));font-weight:700">∑</span><span style="font-size:10.5px;color:rgb(var(--ink));font-weight:500;white-space:nowrap">Units Sold</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--secondary-text));font-family:var(--font-mono);white-space:nowrap">count</span></div>
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:rgb(var(--positive-subtle));display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:rgb(var(--positive));font-weight:700">x̄</span><span style="font-size:10.5px;color:rgb(var(--ink));font-weight:500;white-space:nowrap">Discount</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--secondary-text));font-family:var(--font-mono);white-space:nowrap">avg</span></div>
            </div>
            <div style="padding:7px 12px 4px"><span style="font-size:9px;font-weight:700;color:#C08A2D;letter-spacing:0.05em">KEYS</span></div>
            <div style="padding:0 12px 10px;display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;align-items:center;gap:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">customer_id</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">→ Customer</span></div>
              <div style="display:flex;align-items:center;gap:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">product_id</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">→ Product</span></div>
              <div style="display:flex;align-items:center;gap:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">region_id</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">→ Region</span></div>
              <div style="display:flex;align-items:center;gap:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">date_id</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">→ Date</span></div>
            </div>
            <div style="border-top:1px solid rgb(var(--blue-subtle));background:rgb(var(--panel));padding:4px 12px;display:flex;align-items:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:rgb(var(--positive))"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">82,401 rows · updated 6m ago</span></div>
          </div>
          <div style="position:absolute;left:452px;top:68px;width:138px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--diagram-purple-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="height:32px;background:rgb(var(--diagram-purple-bg));border-bottom:1px solid rgb(var(--diagram-purple-line));display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><span style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Product</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 7px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">product_id</span><div style="flex:1"></div><span style="font-size:9px;color:#C08A2D;font-weight:700">PK</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Name</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Category</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">text</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: item, SKU</div>
            </div>
            <div style="border-top:1px solid rgb(var(--tertiary-bg));background:rgb(var(--primary-bg));padding:4px 11px;display:flex;align-items:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:rgb(var(--positive))"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">3,412 rows · updated 6m ago</span></div>
          </div>
          <div style="position:absolute;left:452px;top:296px;width:138px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--diagram-purple-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="height:32px;background:rgb(var(--diagram-purple-bg));border-bottom:1px solid rgb(var(--diagram-purple-line));display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Date</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 7px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#C08A2D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/></svg><span style="font-size:9.5px;color:rgb(var(--ink));font-family:var(--font-mono)">date_id</span><div style="flex:1"></div><span style="font-size:9px;color:#C08A2D;font-weight:700">PK</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Quarter</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:rgb(var(--ink))">Fiscal Year</span><span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">int</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: period, calendar</div>
            </div>
            <div style="border-top:1px solid rgb(var(--tertiary-bg));background:rgb(var(--primary-bg));padding:4px 11px;display:flex;align-items:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:rgb(var(--positive))"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">1,096 rows · updated 6m ago</span></div>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;padding:5px 11px;display:flex;align-items:center;gap:12px;box-shadow:none">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#3E63DD"></span><span style="font-size:10px;color:rgb(var(--ink))">1 fact</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;border:1.5px solid #7C5CFC"></span><span style="font-size:10px;color:rgb(var(--ink))">4 dimensions</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="font-size:10px;color:rgb(var(--positive));font-weight:700">∑</span><span style="font-size:10px;color:rgb(var(--ink))">3 metrics</span></span>
          </div>
          <div style="position:absolute;bottom:12px;left:14px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;padding:5px 9px;display:flex;align-items:center;gap:9px;box-shadow:none">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
            <span style="font-size:10.5px;color:rgb(var(--ink));font-weight:600;min-width:30px;text-align:center">100%</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
            <div style="width:1px;height:14px;background:rgb(var(--card-line))"></div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
