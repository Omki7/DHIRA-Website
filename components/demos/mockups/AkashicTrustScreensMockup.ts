/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Four governance screens for the /akashic [05] Enterprise Trust panels:
 * roles & access, lineage, audit log, data residency. Same window chrome,
 * module rail and design tokens as the hero screens (imported from
 * HeroProductScreensMockup) so the trust checks read as live screens of
 * the same product. Layouts reference OpenMetadata's governance UX (roles
 * table, lineage canvas, activity feed) re-skinned to Akashic. Demo data
 * continues the [01] South-region world (−8%, Brennan & Sons, 09:41).
 * Static HTML strings consumed via dangerouslySetInnerHTML — see AGENTS.md
 * §8a before refactoring.
 */

import {
  WINDOW_BAR,
  LIVE_CHIP,
  moduleRail,
} from "@/components/demos/mockups/HeroProductScreensMockup";

const LOGO = `<svg viewBox="0 0 200 200" width="18" height="18" fill="none" style="overflow:visible;flex-shrink:0"><line x1="100" y1="50" x2="58" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="100" y1="50" x2="142" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="79" y1="103" x2="121" y2="103" stroke="#3E63DD" stroke-width="12"/><circle cx="58" cy="156" r="16" fill="#1A1C1D"/><circle cx="142" cy="156" r="16" fill="#1A1C1D"/><circle cx="79" cy="103" r="14" fill="#1A1C1D"/><circle cx="121" cy="103" r="14" fill="#1A1C1D"/><circle cx="100" cy="50" r="18" fill="#3E63DD"/><circle cx="124" cy="30" r="8" fill="#3E63DD" opacity="0.6"/><circle cx="80" cy="26" r="6" fill="#3E63DD" opacity="0.45"/></svg>`;

/* Compact top bar for the half-width trust screens: breadcrumb + right
   slot + user avatar (search and bell dropped to fit the narrower frame). */
function govTopBar(section: string, page: string, right = "") {
  return `<div style="height:40px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 12px;gap:8px;flex-shrink:0;background:#fff;overflow:hidden">
    ${LOGO}
    <span style="font-size:12.5px;font-weight:700;color:#1A1C1D;letter-spacing:-0.02em">Akashic</span>
    <span style="font-size:11px;color:#C4C5C9">/</span><span style="font-size:11px;color:#5C5E63;white-space:nowrap">${section}</span>
    <span style="font-size:11px;color:#C4C5C9">/</span><span style="font-size:11px;color:#1A1C1D;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${page}</span>
    <div style="flex:1"></div>
    ${right}
    <div style="width:25px;height:25px;border-radius:50%;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:600">AR</span></div>
  </div>`;
}

function tabRow(tabs: Array<[string, boolean]>, right = "") {
  const items = tabs
    .map(
      ([label, on]) =>
        `<div style="height:38px;display:flex;align-items:center;padding:0 2px;margin-right:16px;border-bottom:2px solid ${on ? "#3E63DD" : "transparent"};box-sizing:border-box"><span style="font-size:11.5px;color:${on ? "#1A1C1D" : "#8E8F91"};font-weight:${on ? "600" : "500"};white-space:nowrap">${label}</span></div>`
    )
    .join("");
  return `<div style="height:38px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;flex-shrink:0;background:#fff;overflow:hidden">${items}<div style="flex:1"></div>${right}</div>`;
}

type ChipKind = "blue" | "gray" | "rose" | "green";
const CHIP_STYLE: Record<ChipKind, string> = {
  blue: "background:#EEF1FC;border:1px solid #D5DDF8;color:#3E63DD",
  gray: "background:#F3F3F4;border:1px solid #E9EAEE;color:#5C5E63",
  rose: "background:#FDF0F2;border:1px solid #F5CBD4;color:#C13059",
  green: "background:#EAF7F0;border:1px solid #CBE8D9;color:#1B8A5F",
};
function chip(label: string, kind: ChipKind = "blue") {
  return `<span style="display:inline-flex;align-items:center;height:20px;padding:0 8px;border-radius:20px;font-size:9.5px;font-weight:600;white-space:nowrap;${CHIP_STYLE[kind]}">${label}</span>`;
}

function avatar(initials: string, gradient: string) {
  return `<div style="width:24px;height:24px;border-radius:50%;background:${gradient};display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9.5px;color:#fff;font-weight:600">${initials}</span></div>`;
}

const SPARKLE = `<svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z"/></svg>`;

const LOCK_GREEN = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1B8A5F" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

function screenShell(topBar: string, rail: string, body: string) {
  return `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB;overflow:hidden">
  ${WINDOW_BAR}
  ${topBar}
  <div style="flex:1;display:flex;overflow:hidden">
    ${rail}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">${body}</div>
  </div>
</div>`;
}

/* ---------------------------------------------------------------- */
/* Roles & access — who can see the answer, and at what level        */
/* ---------------------------------------------------------------- */

const ROLE_GRID = "display:grid;grid-template-columns:minmax(140px,1.4fr) minmax(125px,1.25fr) minmax(120px,1fr);gap:8px;align-items:center";

function roleRow(av: string, name: string, sub: string, access: string, chips: string) {
  return `<div style="${ROLE_GRID};padding:9px 14px;border-bottom:1px solid #EEEFF1;background:#fff">
    <div style="display:flex;align-items:center;gap:8px;min-width:0">
      ${av}
      <div style="min-width:0"><div style="font-size:11.5px;font-weight:600;color:#1A1C1D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div><div style="font-size:9.5px;color:#8E8F91;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sub}</div></div>
    </div>
    <div style="font-size:10.5px;color:#1A1C1D;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${access}</div>
    <div style="display:flex;gap:5px;flex-wrap:wrap">${chips}</div>
  </div>`;
}

export const ROLES_SCREEN_HTML = screenShell(
  govTopBar("Governance", "Roles & access", chip("Synced with SSO", "gray")),
  moduleRail("governance"),
  `${tabRow(
    [["Roles", true], ["Policies", false], ["Users", false]],
    `<span style="font-size:10.5px;color:#8E8F91;white-space:nowrap">3 roles · 2 policies</span>`
  )}
  <div style="${ROLE_GRID};padding:7px 14px;background:#FAFAFB;border-bottom:1px solid #E9EAEE">
    <span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">ROLE</span>
    <span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">ON THIS ANSWER</span>
    <span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">PERMISSIONS</span>
  </div>
  ${roleRow(
    avatar("RH", "linear-gradient(135deg,#3E63DD,#6E56CF)"),
    "Regional head",
    "South region · sales",
    "Full answer · can act on it",
    chip("Read") + chip("Write")
  )}
  ${roleRow(
    avatar("AN", "linear-gradient(135deg,#E5547B,#C13059)"),
    "Analyst",
    "Finance",
    "Can view · cannot export",
    chip("Read") + chip("Export denied", "rose")
  )}
  ${roleRow(
    avatar("AU", "linear-gradient(135deg,#1F9D6B,#0F7A50)"),
    "External auditor",
    "Read-only seat",
    "Sees everything · changes nothing",
    chip("Read-only", "gray")
  )}
  <div style="flex:1;background:#fff"></div>
  <div style="border-top:1px solid #E9EAEE;background:#fff;padding:8px 14px;display:flex;align-items:center;gap:7px;flex-shrink:0">
    ${LOCK_GREEN}
    <span style="font-size:10.5px;color:#1B8A5F;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Enforced at query time · row and column level</span>
    <div style="flex:1"></div>
    <span style="font-size:10px;color:#8E8F91;white-space:nowrap">Updated 2 days ago</span>
  </div>`
);

/* ---------------------------------------------------------------- */
/* Lineage — the −8% figure traced upstream to systems and the email */
/* ---------------------------------------------------------------- */

function srcNode(iconTile: string, name: string, sub: string, cited = false) {
  return `<div style="background:#fff;border:1px solid ${cited ? "#C8D2F5" : "#E9EAEE"};border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
    <div style="display:flex;align-items:center;gap:7px;padding:7px 9px">
      ${iconTile}
      <div style="min-width:0;flex:1"><div style="font-size:10.5px;font-weight:600;color:#1A1C1D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div><div style="font-size:9px;color:#8E8F91;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sub}</div></div>
    </div>
  </div>`;
}

const TILE_SAP = `<div style="width:20px;height:20px;border-radius:6px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:7px;color:#fff;font-weight:700;letter-spacing:0.03em">SAP</span></div>`;
const TILE_SF = `<div style="width:20px;height:20px;border-radius:6px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="12" height="12" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div>`;
const TILE_DOC = `<div style="width:20px;height:20px;border-radius:6px;background:#E5547B;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div>`;

export const LINEAGE_SCREEN_HTML = screenShell(
  govTopBar("Warehouse", "revenue_vs_target", chip("Model", "gray")),
  moduleRail("warehouse"),
  `${tabRow(
    [["Overview", false], ["Schema", false], ["Quality", false], ["Lineage", true]],
    `<span style="font-size:10.5px;color:#8E8F91;white-space:nowrap">Upstream 3 · Downstream 1</span>`
  )}
  <div style="flex:1;position:relative;overflow:hidden;background:#fff;background-image:radial-gradient(circle,#E9E9EB 1px,transparent 1px);background-size:22px 22px;display:flex;align-items:center;gap:0;padding:12px 12px 38px">
    <div style="flex:1.15;min-width:0;display:flex;flex-direction:column;gap:8px">
      ${srcNode(TILE_SAP, "orders", "SAP ERP · table")}
      ${srcNode(TILE_SF, "renewals", "Salesforce · object")}
      ${srcNode(TILE_DOC, "renewal_email.eml", "Brennan &amp; Sons · document", true)}
    </div>
    <svg width="24" height="164" viewBox="0 0 24 164" preserveAspectRatio="none" style="flex-shrink:0" fill="none">
      <path d="M1 26 C 13 26 11 82 23 82" stroke="#D0D3DB" stroke-width="1.2"/>
      <path d="M1 82 L 23 82" stroke="#D0D3DB" stroke-width="1.2"/>
      <path d="M1 138 C 13 138 11 82 23 82" stroke="#3E63DD" stroke-width="1.6"/>
    </svg>
    <div style="flex:1.15;min-width:0">
      <div style="background:#fff;border:1.5px solid #3E63DD;border-radius:11px;box-shadow:0 1px 3px rgba(62,99,221,0.12);overflow:hidden">
        <div style="height:28px;background:linear-gradient(135deg,#3E63DD,#5870E8);display:flex;align-items:center;gap:7px;padding:0 10px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5"/></svg><span style="font-size:10px;font-weight:700;color:#fff;font-family:ui-monospace,monospace;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">revenue_vs_target</span></div>
        <div style="padding:7px 10px;display:flex;flex-direction:column;gap:4px">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px"><span style="font-size:9.5px;color:#5C5E63;font-family:ui-monospace,monospace">actual</span><span style="font-size:9px;color:#8E8F91;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">sum(orders.net)</span></div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px"><span style="font-size:9.5px;color:#5C5E63;font-family:ui-monospace,monospace">target</span><span style="font-size:9px;color:#8E8F91;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">fy_plan.q3</span></div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:6px"><span style="font-size:9.5px;color:#5C5E63;font-family:ui-monospace,monospace">context</span><span style="font-size:9px;color:#3E63DD;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">renewal_email.eml</span></div>
        </div>
      </div>
    </div>
    <svg width="22" height="12" viewBox="0 0 22 12" style="flex-shrink:0" fill="none">
      <path d="M1 6 L 17 6" stroke="#3E63DD" stroke-width="1.6"/>
      <path d="M14 2 L 19 6 L 14 10" stroke="#3E63DD" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    <div style="flex:1;min-width:0">
      <div style="background:#fff;border:1px solid #E9EAEE;border-radius:11px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
        <div style="display:flex;align-items:center;gap:7px;padding:7px 10px 5px"><div style="width:20px;height:20px;border-radius:6px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0">${SPARKLE}</div><div style="min-width:0"><div style="font-size:10.5px;font-weight:600;color:#1A1C1D">The answer</div><div style="font-size:9px;color:#8E8F91">Ask Akashic · 09:41</div></div></div>
        <div style="padding:2px 10px 8px"><span style="font-size:14px;font-weight:700;color:#1A1C1D;letter-spacing:-0.02em">−8% vs target</span></div>
        <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px">${LOCK_GREEN}<span style="font-size:9px;color:#1B8A5F;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Grounded · trace complete</span></div>
      </div>
    </div>
    <div style="position:absolute;bottom:10px;left:12px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:4px 9px;box-shadow:0 1px 2px rgba(18,20,26,0.05)"><span style="font-size:9.5px;color:#5C5E63;font-family:ui-monospace,monospace">144 records · column-level trace</span></div>
    <div style="position:absolute;bottom:10px;right:12px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:4px 9px;display:flex;align-items:center;gap:9px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M5 12h14"/></svg>
      <span style="font-size:10px;color:#1A1C1D;font-weight:600">100%</span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
    </div>
  </div>`
);

/* ---------------------------------------------------------------- */
/* Audit log — every touch on the answer, timestamped, append-only   */
/* ---------------------------------------------------------------- */

function filterChip(label: string) {
  return `<div style="height:26px;padding:0 9px;border:1px solid #E9EAEE;border-radius:7px;display:flex;align-items:center;gap:6px;background:#fff;flex-shrink:0"><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">${label}</span><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>`;
}

function auditRow(av: string, actor: string, action: string, time: string, flag = "") {
  return `<div style="display:flex;align-items:center;gap:9px;padding:8px 14px;border-bottom:1px solid #EEEFF1;background:${flag ? "#FDF7F8" : "#fff"}">
    ${av}
    <span style="font-size:11px;color:#5C5E63;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap"><span style="color:#1A1C1D;font-weight:600">${actor}</span> ${action}</span>
    <div style="flex:1"></div>
    ${flag ? chip(flag, "rose") : ""}
    <span style="font-size:9.5px;color:#8E8F91;font-family:ui-monospace,monospace;flex-shrink:0">${time}</span>
  </div>`;
}

const AVATAR_SYS = `<div style="width:24px;height:24px;border-radius:7px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0">${SPARKLE}</div>`;

export const AUDIT_SCREEN_HTML = screenShell(
  govTopBar("Governance", "Audit log", LIVE_CHIP),
  moduleRail("governance"),
  `<div style="height:38px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:8px;flex-shrink:0;background:#fff;overflow:hidden">
    ${filterChip("User · All")}
    ${filterChip("Action · All")}
    ${filterChip("Today")}
    <div style="flex:1"></div>
    <span style="font-size:10.5px;color:#8E8F91;white-space:nowrap">1,204 events today</span>
  </div>
  ${auditRow(AVATAR_SYS, "Akashic", "generated the answer · grounded in 2 systems · 3 documents", "09:41:07")}
  ${auditRow(avatar("RH", "linear-gradient(135deg,#3E63DD,#6E56CF)"), "Regional head", "received the answer", "09:41:22")}
  ${auditRow(avatar("AN", "linear-gradient(135deg,#E5547B,#C13059)"), "Analyst", "viewed the answer", "09:43:05")}
  ${auditRow(avatar("AN", "linear-gradient(135deg,#E5547B,#C13059)"), "Analyst", "attempted export", "09:44:51", "Denied · policy")}
  ${auditRow(avatar("AU", "linear-gradient(135deg,#1F9D6B,#0F7A50)"), "External auditor", "was granted read-only access", "09:47:10")}
  <div style="flex:1;background:#fff"></div>
  <div style="border-top:1px solid #E9EAEE;background:#fff;padding:8px 14px;display:flex;align-items:center;gap:7px;flex-shrink:0">
    ${LOCK_GREEN}
    <span style="font-size:10.5px;color:#1B8A5F;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Append-only · every event kept</span>
    <div style="flex:1"></div>
    <span style="font-size:10px;color:#8E8F91;white-space:nowrap">Showing 5 of 1,204</span>
  </div>`
);

/* ---------------------------------------------------------------- */
/* Data residency — everything inside the boundary, nothing across   */
/* ---------------------------------------------------------------- */

function perimeterNode(label: string, sub: string) {
  return `<div style="flex:1;min-width:0;background:#fff;border:1px solid #E9EAEE;border-radius:9px;box-shadow:0 1px 2px rgba(18,20,26,0.05);padding:7px 5px;text-align:center">
    <div style="font-size:10px;font-weight:600;color:#1A1C1D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${label}</div>
    <div style="font-size:8.5px;color:#8E8F91;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${sub}</div>
  </div>`;
}

export const RESIDENCY_SCREEN_HTML = screenShell(
  govTopBar("Governance", "Data residency", chip("Policy · In-region only", "green")),
  moduleRail("governance"),
  `<div style="height:38px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:8px;flex-shrink:0;background:#fff;overflow:hidden">
    ${chip("Region · in-country")}
    ${chip("Sovereign deploy", "gray")}
    <div style="flex:1"></div>
    <span style="font-size:10.5px;color:#8E8F91;font-family:ui-monospace,monospace;white-space:nowrap">egress today · 0 bytes</span>
  </div>
  <div style="flex:1;position:relative;overflow:hidden;background:#fff;background-image:radial-gradient(circle,#E9E9EB 1px,transparent 1px);background-size:22px 22px;display:flex;align-items:center;gap:0;padding:18px 10px">
    <div style="flex:1.6;min-width:0;position:relative;border:1.5px dashed #A9B8EA;border-radius:12px;background:rgba(238,241,252,0.55);padding:20px 10px 14px">
      <span style="position:absolute;top:-8px;left:12px;background:#fff;padding:0 6px;font-size:8.5px;font-weight:700;letter-spacing:0.08em;color:#3E63DD;font-family:ui-monospace,monospace;white-space:nowrap">YOUR JURISDICTION</span>
      <div style="display:flex;align-items:center;gap:6px">
        ${perimeterNode("Stored", "encrypted at rest")}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style="flex-shrink:0"><path d="M1 5 L 10 5" stroke="#3E63DD" stroke-width="1.4"/><path d="M8 2 L 12 5 L 8 8" stroke="#3E63DD" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${perimeterNode("Processed", "all compute in-region")}
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" style="flex-shrink:0"><path d="M1 5 L 10 5" stroke="#3E63DD" stroke-width="1.4"/><path d="M8 2 L 12 5 L 8 8" stroke="#3E63DD" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        ${perimeterNode("Answered", "delivered in-region")}
      </div>
      <div style="display:flex;align-items:center;justify-content:center;gap:5px;margin-top:10px">${LOCK_GREEN}<span style="font-size:9px;color:#1B8A5F;font-weight:600">Every byte accounted for</span></div>
    </div>
    <div style="width:48px;flex-shrink:0;position:relative;height:48px">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="position:absolute;inset:0">
        <path d="M2 24 L 46 24" stroke="#E5547B" stroke-width="1.4" stroke-dasharray="4 4"/>
      </svg>
      <span style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#FDF0F2;border:1px solid #F5CBD4;border-radius:20px;padding:2px 6px;font-size:8.5px;font-weight:700;color:#C13059;white-space:nowrap">0 bytes</span>
    </div>
    <div style="width:84px;flex-shrink:0;background:#FAFAFB;border:1px solid #E9EAEE;border-radius:10px;padding:10px 9px;opacity:0.75">
      <div style="font-size:9.5px;font-weight:600;color:#8E8F91">Other regions</div>
      <div style="font-size:8.5px;color:#B4BAC2">nothing sent</div>
    </div>
  </div>
  <div style="border-top:1px solid #E9EAEE;background:#fff;padding:8px 14px;display:flex;align-items:center;gap:7px;flex-shrink:0">
    ${LOCK_GREEN}
    <span style="font-size:10.5px;color:#1B8A5F;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">In-region only · enforced by policy, not promise</span>
    <div style="flex:1"></div>
    <span style="font-size:10px;color:#8E8F91;white-space:nowrap">Cloud · on-prem · hybrid</span>
  </div>`
);
