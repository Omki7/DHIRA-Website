/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Shared desktop-app chrome (window bar, top bar, global module rail) plus
 * the three home-hero screens (Akashic Data Pipelines canvas, Ask Akashic chat, Akashic Data Warehouse
 * star schema). The chrome helpers are exported so every screen in
 * AkashicModuleScreensMockup renders as the same product: same window,
 * same top bar, same left module rail with a different active module.
 * Static HTML strings consumed via dangerouslySetInnerHTML — see AGENTS.md
 * §8a and the note on HeroProductsMockup before refactoring.
 */

/* ---------------------------------------------------------------- */
/* Design tokens (keep every screen on the same system)             */
/*   text:    #1A1C1D / #5C5E63 / #8E8F91                           */
/*   borders: #E9EAEE (cards, chrome) · #EEEFF1 (soft dividers)     */
/*   accents: blue #3E63DD · green #1F9D6B · amber #E0A93B          */
/*            rose #E5547B/#C13059 · purple #7C5CFC                 */
/*   shadow:  0 1px 2px rgba(18,20,26,0.05) — flat, crisp, no glow  */
/* ---------------------------------------------------------------- */

const LOGO = `<svg viewBox="0 0 200 200" width="19" height="19" fill="none" style="overflow:visible;flex-shrink:0"><line x1="100" y1="50" x2="58" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="100" y1="50" x2="142" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="79" y1="103" x2="121" y2="103" stroke="#3E63DD" stroke-width="12"/><circle cx="58" cy="156" r="16" fill="#1A1C1D"/><circle cx="142" cy="156" r="16" fill="#1A1C1D"/><circle cx="79" cy="103" r="14" fill="#1A1C1D"/><circle cx="121" cy="103" r="14" fill="#1A1C1D"/><circle cx="100" cy="50" r="18" fill="#3E63DD"/><circle cx="124" cy="30" r="8" fill="#3E63DD" opacity="0.6"/><circle cx="80" cy="26" r="6" fill="#3E63DD" opacity="0.45"/></svg>`;

const SPARKLE_PATH = `M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z`;

export const LIVE_CHIP = `<div style="height:24px;padding:0 9px;background:#EAF7F0;border:1px solid #CBE8D9;border-radius:20px;display:flex;align-items:center;gap:5px;flex-shrink:0"><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;animation:softpulse 2s infinite"></span><span style="font-size:10.5px;color:#1B8A5F;font-weight:600">Live</span></div>`;

/* Browser-style window bar — identical on every screen. */
export const WINDOW_BAR = `<div style="position:relative;height:36px;display:flex;align-items:center;padding:0 14px;background:#F6F6F7;border-bottom:1px solid #E9EAEE;flex-shrink:0;gap:7px">
  <div style="width:11px;height:11px;border-radius:50%;background:#EC6A5F"></div>
  <div style="width:11px;height:11px;border-radius:50%;background:#F4BF50"></div>
  <div style="width:11px;height:11px;border-radius:50%;background:#61C454"></div>
  <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);display:flex;align-items:center;gap:6px;height:22px;padding:0 34px;background:#ECECEE;border-radius:6px">
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>
    <span style="font-size:10px;color:#7A7C80;letter-spacing:0.01em">app.akashic.dhira.io</span>
  </div>
</div>`;

/* App top bar — logo, breadcrumb, global search, notifications, user. */
export function appTopBar(section: string, page: string) {
  return `<div style="height:42px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:9px;flex-shrink:0;background:#fff">
    ${LOGO}
    <span style="font-size:12.5px;font-weight:700;color:#1A1C1D;letter-spacing:-0.02em">Akashic</span>
    <span style="font-size:11px;color:#C4C5C9">/</span><span style="font-size:11px;color:#5C5E63">${section}</span>
    <span style="font-size:11px;color:#C4C5C9">/</span><span style="font-size:11px;color:#1A1C1D;font-weight:600">${page}</span>
    <div style="flex:1"></div>
    <div style="display:flex;align-items:center;gap:6px;height:26px;padding:0 8px;border:1px solid #E9EAEE;border-radius:7px;background:#FAFAFB;width:148px">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <span style="font-size:10.5px;color:#8E8F91">Search</span>
      <div style="flex:1"></div>
      <span style="font-size:8.5px;color:#8E8F91;border:1px solid #E9EAEE;border-radius:4px;padding:1px 4px;background:#fff">⌘K</span>
    </div>
    <div style="position:relative;width:26px;height:26px;border-radius:7px;border:1px solid #E9EAEE;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span style="position:absolute;top:4px;right:5px;width:5px;height:5px;border-radius:50%;background:#E5547B;border:1px solid #fff"></span>
    </div>
    <div style="width:25px;height:25px;border-radius:50%;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:600">PM</span></div>
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
    const c = on ? "#3E63DD" : "#8E8F91";
    const svg =
      key === "ask"
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="${c}" stroke="none"><path d="${SPARKLE_PATH}"/></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
    return `<div style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0;${on ? "background:#EEF1FC;" : ""}cursor:pointer">${svg}</div>`;
  }).join("");
  return `<div style="width:46px;border-right:1px solid #E9EAEE;background:#FBFBFC;display:flex;flex-direction:column;align-items:center;padding:9px 0 10px;gap:4px;flex-shrink:0">
    ${items}
    <div style="flex:1"></div>
    <div style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 2.4-3 4"/><path d="M12 17h.01"/></svg></div>
    <div style="width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/></svg></div>
  </div>`;
}

/* Shared sidebar search box. */
export function sidebarSearch(placeholder: string) {
  return `<div style="padding:10px 11px 8px"><div style="background:#FAFAFB;border:1px solid #E9EAEE;border-radius:8px;padding:6px 9px;display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-size:11px;color:#8E8F91">${placeholder}</span></div></div>`;
}

/* ---------------------------------------------------------------- */
/* Pipelines — visual pipeline canvas, sources → unify → model      */
/* ---------------------------------------------------------------- */
export const PIPELINES_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB">
  ${WINDOW_BAR}
  ${appTopBar("Pipelines", "Sales Performance")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("pipelines")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:12px;flex-shrink:0;background:#fff">
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer;height:27px;padding:0 11px;background:#1A1C1D;border-radius:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg><span style="font-size:11.5px;color:#fff;font-weight:600">Run</span></div>
        <div style="height:27px;padding:0 10px;border:1px solid #E9EAEE;border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;background:#fff"><span style="font-size:11.5px;color:#1A1C1D;font-weight:500">Actions</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="width:1px;height:18px;background:#E9EAEE"></div>
        <div style="display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:11.5px;color:#1B8A5F;font-weight:600">Validated</span></div>
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;color:#5C5E63;font-weight:500">Every hour</span></div>
        <div style="flex:1"></div>
        <span style="font-size:10.5px;color:#8E8F91">Last run 6m ago · 1m 14s · 82,401 rows</span>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid #E9EAEE;display:flex;flex-direction:column;flex-shrink:0;background:#fff">
          ${sidebarSearch("Search sources")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">BUSINESS SYSTEMS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">5</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Salesforce</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">CRM</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">N</span></div><span style="font-size:11.5px;color:#1A1C1D">NetSuite</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">ERP</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#FF7A59;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:#fff;font-weight:700">h</span></div><span style="font-size:11.5px;color:#1A1C1D">HubSpot</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">Mktg</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#0875A8;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">W</span></div><span style="font-size:11.5px;color:#1A1C1D">Workday</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">HR</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#04A77F;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">Z</span></div><span style="font-size:11.5px;color:#1A1C1D">Zendesk</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">CX</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">FILES &amp; SHEETS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:#EEF1FC"><div style="width:19px;height:19px;border-radius:5px;background:#1E7A45;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">X</span></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:600">Sales Plan FY26</span><div style="flex:1"></div><span style="width:5px;height:5px;border-radius:50%;background:#3E63DD"></span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#1A8E5F;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M9 3v18M3 9h18"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Forecast Sheet</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">DATABASES</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#336791;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">PG</span></div><span style="font-size:11.5px;color:#1A1C1D">Orders DB</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">Postgres</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#00618A;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">My</span></div><span style="font-size:11.5px;color:#1A1C1D">Store POS</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">MySQL</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#29B5E8;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff">❄</span></div><div style="min-width:0"><div style="font-size:10.5px;color:#1A1C1D;font-weight:600">Snowflake</div><div style="font-size:9px;color:#8E8F91">Destination warehouse</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:#fff;background-image:radial-gradient(circle,#E9E9EB 1px,transparent 1px);background-size:22px 22px">
          <svg width="674" height="482" viewBox="0 0 674 482" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M172,80 C 214,80 208,200 250,204" stroke="#D0D3DB" fill="none" stroke-width="1.2"/>
            <path d="M172,232 L 250,224" stroke="#D0D3DB" fill="none" stroke-width="1.2"/>
            <path d="M172,384 C 214,384 208,248 250,244" stroke="#D0D3DB" fill="none" stroke-width="1.2"/>
            <path d="M400,224 C 424,224 422,196 446,196" stroke="#3E63DD" fill="none" stroke-width="1.6"/>
            <path d="M400,224 C 424,224 422,316 446,316" stroke="#D0D3DB" fill="none" stroke-width="1.2"/>
            <circle cx="250" cy="204" r="3" fill="#B7BAC4"/><circle cx="250" cy="224" r="3" fill="#B7BAC4"/><circle cx="250" cy="244" r="3" fill="#B7BAC4"/>
            <circle cx="446" cy="196" r="3.5" fill="#3E63DD"/><circle cx="446" cy="316" r="3" fill="#B7BAC4"/>
          </svg>
          <div style="position:absolute;left:18px;top:40px;width:154px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:#1A1C1D">Salesforce</div><div style="font-size:9px;color:#8E8F91">Customer orders</div></div><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6"/><path d="M22 4 12 14.01l-3-3"/></svg><span style="font-size:9px;color:#5C5E63">Synced 4m · 82,401 rows</span></div>
          </div>
          <div style="position:absolute;left:18px;top:198px;width:154px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#1E7A45;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:12px;color:#fff;font-weight:700">X</span></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:#1A1C1D">Sales Plan FY26</div><div style="font-size:9px;color:#8E8F91">Regional targets</div></div><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><span style="font-size:9px;color:#5C5E63">Excel · updated daily</span></div>
          </div>
          <div style="position:absolute;left:18px;top:344px;width:154px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:12px;color:#fff;font-weight:700">N</span></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:#1A1C1D">NetSuite</div><div style="font-size:9px;color:#8E8F91">Billed invoices</div></div><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span style="font-size:9px;color:#5C5E63">ERP · synced hourly</span></div>
          </div>
          <div style="position:absolute;left:250px;top:176px;width:150px;background:#fff;border:1px solid #C8D2F5;border-radius:10px;box-shadow:0 1px 3px rgba(62,99,221,0.10);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 11px;background:#F5F7FE"><div style="width:26px;height:26px;border-radius:7px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6 4-4 4 4M12 2v14M4 18c4 0 4 4 8 4s4-4 8-4"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:700;color:#1A1C1D">Unify Sales</div><div style="font-size:9px;color:#3E63DD">Transform</div></div></div>
            <div style="padding:8px 11px 9px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;gap:6px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg><span style="font-size:10px;color:#5C5E63">Match on <b style="color:#1A1C1D">Customer</b> + <b style="color:#1A1C1D">Region</b></span></div>
              <div style="display:flex;align-items:center;gap:6px"><span style="font-size:10px;color:#8E8F91">3 inputs</span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span style="font-size:10px;color:#1A1C1D;font-weight:600">1 unified table</span></div>
            </div>
          </div>
          <div style="position:absolute;left:446px;top:136px;width:150px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 11px;border-bottom:1px solid #F1F2F5"><div style="width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:700;color:#1A1C1D">Sales Performance</div><div style="font-size:9px;color:#8E8F91">Business model</div></div></div>
            <div style="padding:8px 11px;display:flex;flex-direction:column;gap:6px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Tables</span><span style="font-size:10px;color:#1A1C1D;font-weight:600">5</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Refreshed</span><span style="font-size:10px;color:#1A1C1D;font-weight:600">6m ago</span></div>
              <div style="height:24px;border-radius:6px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:#1F9D6B;animation:softpulse 2s infinite"></span><span style="font-size:10px;color:#1B8A5F;font-weight:600">Powering 3 dashboards</span></div>
            </div>
          </div>
          <div style="position:absolute;left:446px;top:294px;width:150px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);padding:9px 11px;display:flex;align-items:center;gap:9px">
            <div style="width:26px;height:26px;border-radius:7px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg></div>
            <div style="min-width:0"><div style="font-size:11.5px;font-weight:600;color:#1A1C1D">Quality checks</div><div style="font-size:9.5px;color:#5C5E63">24 rules · all passing</div></div>
          </div>
          <div style="position:absolute;bottom:12px;left:14px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:5px 9px;display:flex;align-items:center;gap:9px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
            <span style="font-size:10.5px;color:#1A1C1D;font-weight:600;min-width:30px;text-align:center">100%</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
            <div style="width:1px;height:14px;background:#E9EAEE"></div>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:5px 10px;display:flex;align-items:center;gap:6px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
            <span style="font-size:10px;color:#5C5E63">Run #1,284 succeeded · contract v3</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- */
/* Ask — conversational answers grounded in the governed model      */
/* ---------------------------------------------------------------- */
export const ASK_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB">
  ${WINDOW_BAR}
  ${appTopBar("Ask", "Regions behind plan")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("ask")}
    <div style="flex:1;display:flex;overflow:hidden;min-width:0">
      <div style="width:200px;border-right:1px solid #E9EAEE;display:flex;flex-direction:column;flex-shrink:0;background:#fff">
        <div style="padding:10px 11px 6px"><div style="border:1px solid #E9EAEE;border-radius:8px;padding:6px 9px;display:flex;align-items:center;gap:7px;cursor:pointer;background:#fff"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1A1C1D" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span style="font-size:11px;color:#1A1C1D;font-weight:600">New chat</span><div style="flex:1"></div><span style="font-size:8.5px;color:#8E8F91;border:1px solid #E9EAEE;border-radius:4px;padding:1px 4px">⌘N</span></div></div>
        <div style="flex:1;overflow:hidden;padding:0 9px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">TODAY</span></div>
          <div style="display:flex;flex-direction:column;gap:1px">
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px;background:#EEF1FC"><span style="font-size:11px;color:#1A1C1D;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Regions behind plan</span></div>
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px"><span style="font-size:11px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Stockout risk · Store 114</span></div>
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px"><span style="font-size:11px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Margin by channel, Q2</span></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">LAST WEEK</span></div>
          <div style="display:flex;flex-direction:column;gap:1px">
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px"><span style="font-size:11px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Churn drivers · enterprise</span></div>
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px"><span style="font-size:11px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Board pack numbers</span></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">CONTEXTS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
          <div style="display:flex;flex-direction:column;gap:1px">
            <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11px;color:#1A1C1D">Sales Performance</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:#F3F3F4;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11px;color:#1A1C1D">Inventory Health</span></div>
          </div>
        </div>
        <div style="padding:9px 12px;border-top:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="${SPARKLE_PATH}"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;color:#1A1C1D;font-weight:600">Ask Akashic</div><div style="font-size:9px;color:#8E8F91">42 metrics · 5 sources</div></div></div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:#fff;min-width:0">
        <div style="height:40px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;padding:0 16px;gap:10px;flex-shrink:0;background:#fff">
          <span style="font-size:12px;font-weight:600;color:#1A1C1D">Regions behind plan this quarter</span>
          <div style="display:inline-flex;align-items:center;gap:4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:10px;color:#1B8A5F;font-weight:600">Verified lineage</span></div>
          <div style="flex:1"></div>
          <span style="font-size:10px;color:#8E8F91">warehouse + 1 document · 2.1s</span>
          <div style="width:26px;height:26px;border-radius:7px;border:1px solid #E9EAEE;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></div>
        </div>
        <div style="flex:1;overflow-y:auto;padding:12px 0 0;display:flex;flex-direction:column">
          <div style="width:100%;max-width:600px;margin:0 auto;padding:0 20px;display:flex;flex-direction:column;gap:11px">
            <div style="display:flex;justify-content:flex-end">
              <div style="max-width:78%;background:#EEF1FC;border-radius:13px 13px 4px 13px;padding:8px 12px"><p style="margin:0;font-size:12.5px;color:#1A1C1D;line-height:1.5;font-weight:500">Which sales regions are behind plan this quarter, and what's driving it?</p></div>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start">
              <div style="width:25px;height:25px;border-radius:7px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px"><svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="none"><path d="${SPARKLE_PATH}"/></svg></div>
              <div style="flex:1;min-width:0">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:9px;flex-wrap:wrap">
                  <span style="font-size:9.5px;font-weight:600;color:#8E8F91;letter-spacing:0.03em">GROUNDED IN</span>
                  <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px 3px 4px;background:#fff;border:1px solid #E9EAEE;border-radius:7px"><div style="width:15px;height:15px;border-radius:4px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:10px;color:#1A1C1D;font-weight:600">Sales Performance</span></div>
                  <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px 3px 4px;background:#fff;border:1px solid #E9EAEE;border-radius:7px"><div style="width:15px;height:15px;border-radius:4px;background:#3E63DD;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff;font-weight:700">❄</span></div><span style="font-size:10px;color:#1A1C1D;font-weight:600">fact_sales</span><span style="font-size:8.5px;color:#8E8F91">gold</span></div>
                  <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px 3px 4px;background:#fff;border:1px solid #E9EAEE;border-radius:7px"><div style="width:15px;height:15px;border-radius:4px;background:#E5547B;display:flex;align-items:center;justify-content:center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div><span style="font-size:10px;color:#1A1C1D;font-weight:600">Q2 Board Review</span><span style="font-size:8.5px;color:#8E8F91">PDF · p.8</span></div>
                </div>
                <p style="margin:0 0 9px;font-size:13px;color:#1A1C1D;line-height:1.6">Two regions are tracking well below plan. Comparing warehouse revenue against the targets in your board deck, <strong style="color:#1A1C1D">South</strong> and <strong style="color:#1A1C1D">East</strong> are pacing 29–37% under target, driven by delayed store openings and inventory shortfalls.</p>
                <div style="display:flex;align-items:center;gap:7px;margin-bottom:10px;padding:6px 11px;background:#FAFAFB;border:1px solid #EEEFF1;border-radius:9px;flex-wrap:wrap">
                  <span style="font-size:10px;color:#7C5CFC;font-weight:700;font-family:ui-monospace,monospace">ƒx</span>
                  <span style="font-size:9.5px;color:#5C5E63;font-family:ui-monospace,monospace">attainment = net_revenue ÷ plan_target</span>
                  <span style="width:1px;height:10px;background:#E9EAEE"></span>
                  <span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">revenue: warehouse · targets: parsed from PDF p.8</span>
                  <div style="flex:1"></div>
                  <span style="font-size:9px;color:#1B8A5F;font-weight:600">computed on the fly</span>
                </div>
                <div style="border:1px solid #E9EAEE;border-radius:12px;padding:11px 14px;margin-bottom:10px;background:#fff">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                    <span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Plan attainment by region · Q2</span>
                    <div style="display:flex;align-items:center;gap:10px"><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:#3E9E78"></span><span style="font-size:9.5px;color:#5C5E63">On track</span></span><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:#E5547B"></span><span style="font-size:9.5px;color:#5C5E63">Behind</span></span></div>
                  </div>
                  <div style="display:flex;align-items:center;gap:20px">
                    <svg width="122" height="122" viewBox="0 0 150 150" style="flex-shrink:0">
                      <circle cx="75" cy="75" r="30" fill="none" stroke="#F1F2F5" stroke-width="1"/>
                      <circle cx="75" cy="75" r="45" fill="none" stroke="#F1F2F5" stroke-width="1"/>
                      <circle cx="75" cy="75" r="60" fill="none" stroke="#B7BAC4" stroke-width="1" stroke-dasharray="3 3"/>
                      <path d="M75,75 L75,12.6 A62.4,62.4 0 0 1 134.3,55.7 Z" fill="#3E9E78" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
                      <path d="M75,75 L130.4,57 A58.2,58.2 0 0 1 109.2,122.1 Z" fill="#3E9E78" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
                      <path d="M75,75 L106.1,117.7 A52.8,52.8 0 0 1 43.9,117.7 Z" fill="#E0A93B" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
                      <path d="M75,75 L50,109.5 A42.6,42.6 0 0 1 34.5,61.8 Z" fill="#E5547B" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
                      <path d="M75,75 L39.1,63.3 A37.8,37.8 0 0 1 75,37.2 Z" fill="#C96C87" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/>
                      <text x="120" y="26" font-size="9.5" fill="#8E8F91" font-family="ui-monospace,monospace">100%</text>
                    </svg>
                    <div style="flex:1;display:flex;flex-direction:column;gap:5px;min-width:0">
                      <div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:2px;background:#3E9E78;flex-shrink:0"></span><span style="width:46px;font-size:10.5px;color:#5C5E63">North</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">104%</span><span style="font-size:9px;color:#8E8F91">ahead of plan</span></div>
                      <div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:2px;background:#3E9E78;flex-shrink:0"></span><span style="width:46px;font-size:10.5px;color:#5C5E63">West</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">97%</span><span style="font-size:9px;color:#8E8F91">on track</span></div>
                      <div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:2px;background:#E0A93B;flex-shrink:0"></span><span style="width:46px;font-size:10.5px;color:#5C5E63">Central</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">88%</span><span style="font-size:9px;color:#8E8F91">watch</span></div>
                      <div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:2px;background:#E5547B;flex-shrink:0"></span><span style="width:46px;font-size:10.5px;color:#C13059;font-weight:600">South</span><span style="font-size:10.5px;color:#C13059;font-weight:700">71%</span><span style="font-size:9px;color:#8E8F91">behind</span></div>
                      <div style="display:flex;align-items:center;gap:8px"><span style="width:8px;height:8px;border-radius:2px;background:#C96C87;flex-shrink:0"></span><span style="width:46px;font-size:10.5px;color:#C13059;font-weight:600">East</span><span style="font-size:10.5px;color:#C13059;font-weight:700">63%</span><span style="font-size:9px;color:#8E8F91">behind</span></div>
                    </div>
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:8px;padding-top:7px;border-top:1px solid #F1F2F5">
                    <span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">plan_attainment · metric layer</span>
                    <span style="font-size:9px;color:#8E8F91">dashed ring = 100% target · as of 06:16 IST</span>
                  </div>
                </div>
                <div style="background:#F7F9FE;border-left:2px solid #3E63DD;border-radius:0 10px 10px 0;padding:10px 13px">
                  <div style="font-size:11.5px;font-weight:600;color:#1A1C1D;margin-bottom:3px">Suggested action</div>
                  <div style="font-size:11.5px;color:#5C5E63;line-height:1.5">The combined shortfall is <strong style="color:#1A1C1D">₹3.8 Cr</strong>. Recovering East to 90% of plan adds back <strong style="color:#1A1C1D">₹1.6 Cr</strong> in H2.</div>
                  <div style="margin-top:8px;display:flex;gap:7px"><div style="display:inline-flex;align-items:center;height:25px;padding:0 11px;background:#3E63DD;border-radius:7px;cursor:pointer"><span style="font-size:10.5px;color:#fff;font-weight:600">Build recovery plan</span></div><div style="display:inline-flex;align-items:center;height:25px;padding:0 11px;background:#fff;border:1px solid #E9EAEE;border-radius:7px;cursor:pointer"><span style="font-size:10.5px;color:#3E63DD;font-weight:600">Open lineage</span></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="flex-shrink:0;background:#fff;padding:10px 20px 12px">
          <div style="width:100%;max-width:600px;margin:0 auto">
            <div style="border:1px solid #E4E5E9;border-radius:12px;padding:8px 10px;display:flex;align-items:center;gap:9px;background:#fff;box-shadow:0 1px 2px rgba(18,20,26,0.04)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer;flex-shrink:0"><path d="M5 12h14M12 5v14"/></svg>
              <input style="flex:1;border:none;outline:none;font-size:12.5px;color:#1A1C1D;font-family:Inter,sans-serif;background:transparent" placeholder="Ask a follow-up…" readonly="true"/>
              <div style="display:flex;align-items:center;gap:5px;padding:3px 8px;background:#FAFAFB;border:1px solid #EEEFF1;border-radius:7px;cursor:pointer;flex-shrink:0"><div style="width:12px;height:12px;border-radius:3px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:10.5px;color:#1A1C1D;font-weight:500">Sales Performance</span><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
              <div style="width:28px;height:28px;background:linear-gradient(135deg,#3E63DD,#6E56CF);border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7M12 19V5"/></svg></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:5px;margin-top:7px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span style="font-size:9px;color:#8E8F91">Answers respect your row-level access · every claim traceable to source</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- */
/* Warehouse — governed star schema, facts + dimensions + metrics   */
/* ---------------------------------------------------------------- */
export const MODELS_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB">
  ${WINDOW_BAR}
  ${appTopBar("Warehouse", "Sales Performance")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("warehouse")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:12px;flex-shrink:0;background:#fff">
        <div style="height:27px;padding:0 10px;border:1px solid #E9EAEE;border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;background:#fff"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg><span style="font-size:11.5px;color:#1A1C1D;font-weight:500">Add table</span></div>
        <div style="height:27px;padding:0 10px;border:1px solid #E9EAEE;border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;background:#fff"><span style="font-size:11.5px;color:#1A1C1D;font-weight:500">Schema</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="width:1px;height:18px;background:#E9EAEE"></div>
        <div style="display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:11.5px;color:#1B8A5F;font-weight:600">Verified · v1.4</span></div>
        <div style="flex:1"></div>
        <span style="font-size:10.5px;color:#8E8F91">8.1M rows · refreshed 6m ago</span>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid #E9EAEE;display:flex;flex-direction:column;flex-shrink:0;background:#fff">
          ${sidebarSearch("Search the model")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;gap:6px;padding:6px 3px 4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19V5M4 12h7M11 5v14M18 8v8"/></svg><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.06em">METRICS</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:#1F9D6B;font-weight:700">∑</span></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:500">Revenue</span><div style="flex:1"></div><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:#1F9D6B;font-weight:700">∑</span></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Units Sold</span><div style="flex:1"></div><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#1F9D6B;font-weight:700">%</span></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Plan Attainment</span><div style="flex:1"></div><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;padding:11px 3px 4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="#3E63DD" stroke="none"><rect x="3" y="3" width="18" height="18" rx="3"/></svg><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.06em">FACTS</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">1</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:#EEF1FC"><div style="width:18px;height:18px;border-radius:5px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:600">Sales</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">8.1M</span></div>
            </div>
            <div style="display:flex;align-items:center;gap:6px;padding:11px 3px 4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/></svg><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.06em">DIMENSIONS</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">4</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid #C9BCFB;background:#F4F1FE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Customer</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid #C9BCFB;background:#F4F1FE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Product</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid #C9BCFB;background:#F4F1FE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Region</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;border:1.5px solid #C9BCFB;background:#F4F1FE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Date</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#29B5E8;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff">❄</span></div><div style="min-width:0"><div style="font-size:10.5px;color:#1A1C1D;font-weight:600">snowflake_prod.gold</div><div style="font-size:9px;color:#8E8F91">5 tables · dbt-managed</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:#fff;background-image:radial-gradient(circle,#E9E9EB 1px,transparent 1px);background-size:22px 22px">
          <svg width="674" height="482" viewBox="0 0 674 482" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M172,108 C 205,108 200,190 230,195" stroke="#C9BFF3" fill="none" stroke-width="1.5"/>
            <path d="M172,350 C 205,350 200,260 230,252" stroke="#C9BFF3" fill="none" stroke-width="1.5"/>
            <path d="M398,195 C 425,195 422,108 452,108" stroke="#C9BFF3" fill="none" stroke-width="1.5"/>
            <path d="M398,252 C 425,252 422,350 452,350" stroke="#C9BFF3" fill="none" stroke-width="1.5"/>
            <circle cx="230" cy="195" r="3.5" fill="#3E63DD"/><circle cx="230" cy="252" r="3.5" fill="#3E63DD"/>
            <circle cx="398" cy="195" r="3.5" fill="#3E63DD"/><circle cx="398" cy="252" r="3.5" fill="#3E63DD"/>
            <circle cx="172" cy="108" r="3" fill="#7C5CFC"/><circle cx="172" cy="350" r="3" fill="#7C5CFC"/>
            <circle cx="452" cy="108" r="3" fill="#7C5CFC"/><circle cx="452" cy="350" r="3" fill="#7C5CFC"/>
          </svg>
          <div style="position:absolute;left:22px;top:68px;width:150px;background:#fff;border:1px solid #E3DDFB;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.04);overflow:hidden">
            <div style="height:32px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Customer</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Name</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Segment</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: account, buyer</div>
            </div>
          </div>
          <div style="position:absolute;left:22px;top:310px;width:150px;background:#fff;border:1px solid #E3DDFB;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.04);overflow:hidden">
            <div style="height:32px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Region</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Name</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Target</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">money</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: territory, market</div>
            </div>
          </div>
          <div style="position:absolute;left:230px;top:118px;width:168px;background:#fff;border:1.5px solid #3E63DD;border-radius:11px;box-shadow:0 1px 3px rgba(62,99,221,0.12);overflow:hidden">
            <div style="height:34px;background:linear-gradient(135deg,#3E63DD,#5870E8);display:flex;align-items:center;gap:8px;padding:0 12px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg><span style="font-size:12px;font-weight:700;color:#fff">Sales</span><div style="flex:1"></div><span style="font-size:9px;color:#C7D3F7;font-weight:600">FACT</span></div>
            <div style="padding:7px 12px 5px"><div style="font-size:9.5px;color:#5C5E63;line-height:1.4">One row per completed sale</div></div>
            <div style="padding:0 12px 4px"><span style="font-size:9px;font-weight:700;color:#1F9D6B;letter-spacing:0.05em">MEASURES</span></div>
            <div style="padding:0 12px;display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Revenue</span><div style="flex:1"></div><span style="font-size:9px;color:#5C5E63;font-family:ui-monospace,monospace;white-space:nowrap">paid value</span></div>
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Units Sold</span><div style="flex:1"></div><span style="font-size:9px;color:#5C5E63;font-family:ui-monospace,monospace;white-space:nowrap">count</span></div>
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Discount</span><div style="flex:1"></div><span style="font-size:9px;color:#5C5E63;font-family:ui-monospace,monospace;white-space:nowrap">avg</span></div>
            </div>
            <div style="padding:7px 12px 4px"><span style="font-size:9px;font-weight:700;color:#7C5CFC;letter-spacing:0.05em">LINKED TO</span></div>
            <div style="padding:0 12px 10px;display:flex;flex-wrap:wrap;gap:4px">
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Customer</span>
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Product</span>
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Region</span>
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Date</span>
            </div>
          </div>
          <div style="position:absolute;left:452px;top:68px;width:138px;background:#fff;border:1px solid #E3DDFB;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.04);overflow:hidden">
            <div style="height:32px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Product</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Name</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Category</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: item, SKU</div>
            </div>
          </div>
          <div style="position:absolute;left:452px;top:310px;width:138px;background:#fff;border:1px solid #E3DDFB;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.04);overflow:hidden">
            <div style="height:32px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Date</span><div style="flex:1"></div><span style="font-size:9px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Quarter</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">period</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Fiscal Year</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">year</span></div>
              <div style="font-size:9px;color:#9787E0;padding-top:2px">synonyms: period, calendar</div>
            </div>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:5px 11px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#3E63DD"></span><span style="font-size:10px;color:#1A1C1D">1 fact</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;border:1.5px solid #7C5CFC"></span><span style="font-size:10px;color:#1A1C1D">4 dimensions</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="font-size:10px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10px;color:#1A1C1D">3 metrics</span></span>
          </div>
          <div style="position:absolute;bottom:12px;left:14px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:5px 9px;display:flex;align-items:center;gap:9px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
            <span style="font-size:10.5px;color:#1A1C1D;font-weight:600;min-width:30px;text-align:center">100%</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
