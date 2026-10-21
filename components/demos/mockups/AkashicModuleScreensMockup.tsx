"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The /akashic hero stage: the seven live module screens, drawn small, with
 * the context tentacles hanging beneath them.
 *
 * HISTORY. Full app windows (920×600, centre card scaled to 1058×690) stood
 * here until 15 Oct 2026, when one-moment drawings replaced them
 * (AkashicModuleMomentsMockup, now the homepage [02] tease). On 20 Oct 2026
 * the founder asked for these screens back, with the tentacles, "smaller and
 * more illustrative, to tease". Screens and tentacles restored from git
 * 3b9d8c4.
 *
 * THE TEASE, so the next edit keeps it:
 *   1. Small. The centre screen renders at 0.56 of its native 920×600, so the
 *      layout and the shapes read and the 11px product text does not. The
 *      caption under the stage carries the claim in legible type.
 *   2. A fragment, not a window. Every screen dissolves into the page over
 *      its lower third (a mask), so no screen is ever shown whole.
 *   3. Neighbours recede. Side screens are smaller, paler and desaturated;
 *      the ones beyond them are a trace at the frame's edge.
 *   4. Nothing inside a screen is interactive. A side screen is a button that
 *      brings it to the centre; so is its tentacle.
 *   5. The tentacles are the index: each module names what it adds to the
 *      organisation's context, and its four lines turn blue while its screen
 *      is in front.
 *
 * Claims: the old Ask screen's "Suggested action" block was cut on restore
 * (agents and answers never propose the next move), and the sparkle and
 * purple gradient that marked AI became plain blue (DESIGN_SYSTEM, AI
 * positioning). The ONE demo world is in AkashicScreenKitMockup's header.
 */

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Link from "next/link";
import ContextTentacles from "@/components/demos/akashic/ContextTentacles";
import AkashicBIScreenMockup from "@/components/demos/mockups/AkashicBIScreenMockup";
import {
  PIPELINES_SCREEN_HTML,
  MODELS_SCREEN_HTML,
  WINDOW_BAR,
  LIVE_CHIP,
  appTopBar,
  moduleRail,
  sidebarSearch,
} from "@/components/demos/mockups/AkashicScreenKitMockup";
import useOnScreen from "@/hooks/useOnScreen";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";

/* ---------------------------------------------------------------- */
/* Ask Akashic — /akashic-local fork of the shared hero Ask screen.  */
/* The shared screen answers "is any region behind plan" (South 92%, */
/* two unsigned renewals) — the demo spine [01] owns on this page.   */
/* Rather than restate South's attainment a third time in one page,  */
/* the /akashic showcase asks a non-colliding question: channel      */
/* growth. Both screens now read from the same figure set.           */
/* ---------------------------------------------------------------- */
const ASK_SPARKLE = "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z";
const CHANNEL_BARS = [
  { name: "Direct", pct: 46, color: "rgb(var(--blue))", note: "" },
  { name: "Partner", pct: 32, color: "#7C5CFC", note: "" },
  { name: "Online", pct: 22, color: "#2A9BE0", note: "▲ 18% QoQ" },
];
const ASK_SCREEN_CHANNEL_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:var(--font-sans);background:rgb(var(--primary-bg))">
  ${WINDOW_BAR}
  ${appTopBar("Ask", "Channel growth")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("ask")}
    <div style="flex:1;display:flex;overflow:hidden;min-width:0">
      <div style="width:200px;border-right:1px solid rgb(var(--card-line));display:flex;flex-direction:column;flex-shrink:0;background:rgb(var(--screen-surface))">
        <div style="padding:10px 11px 6px"><div style="border:1px solid rgb(var(--card-line));border-radius:8px;padding:6px 9px;display:flex;align-items:center;gap:7px;cursor:pointer;background:rgb(var(--screen-surface))"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--ink))" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span style="font-size:11px;color:rgb(var(--ink));font-weight:600">New chat</span><div style="flex:1"></div><span style="font-size:8.5px;color:rgb(var(--tertiary-text));border:1px solid rgb(var(--card-line));border-radius:4px;padding:1px 4px">⌘N</span></div></div>
        <div style="flex:1;overflow:hidden;padding:0 9px">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>TODAY</span></div>
          <div style="display:flex;flex-direction:column;gap:1px">
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px;background:rgb(var(--blue-subtle))"><span style="font-size:11px;color:rgb(var(--ink));font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Channel growth</span></div>
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px"><span style="font-size:11px;color:rgb(var(--secondary-text));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Fastest-growing accounts</span></div>
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px;background:rgb(var(--primary-bg))"><span style="font-size:11px;color:rgb(var(--secondary-text));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Margin by channel, Q2</span></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>LAST WEEK</span></div>
          <div style="display:flex;flex-direction:column;gap:1px">
            <div style="display:flex;align-items:center;gap:7px;padding:5.5px 7px;border-radius:7px"><span style="font-size:11px;color:rgb(var(--secondary-text));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Board pack numbers</span></div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>CONTEXTS</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">1</span></div>
          <div style="display:flex;flex-direction:column;gap:1px">
            <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11px;color:rgb(var(--ink))">Sales Performance</span></div>
          </div>
        </div>
        <div style="padding:9px 12px;border-top:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none"><path d="${ASK_SPARKLE}"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;color:rgb(var(--ink));font-weight:600">Ask Akashic</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">3 metrics · 3 sources</div></div></div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:rgb(var(--screen-surface));min-width:0">
        <div style="height:40px;border-bottom:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;padding:0 16px;gap:10px;flex-shrink:0;background:rgb(var(--screen-surface))">
          <span style="font-size:12px;font-weight:600;color:rgb(var(--ink))">Channel growth</span>
          <div style="display:inline-flex;align-items:center;gap:4px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:10px;color:rgb(var(--positive-text));font-weight:600">Verified lineage</span></div>
          <div style="flex:1"></div>
          <span style="font-size:10px;color:rgb(var(--tertiary-text))">warehouse · 1.4s</span>
          <div style="width:26px;height:26px;border-radius:7px;border:1px solid rgb(var(--card-line));display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/></svg></div>
          ${LIVE_CHIP}
        </div>
        <div style="flex:1;overflow-y:auto;padding:12px 0 14px;background:rgb(var(--primary-bg));display:flex;flex-direction:column">
          <div style="width:100%;max-width:600px;margin:0 auto;padding:0 20px;display:flex;flex-direction:column;gap:11px">
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:3px">
              <div style="max-width:78%;background:rgb(var(--blue-subtle));border-radius:13px 13px 4px 13px;padding:8px 12px"><p style="margin:0;font-size:12.5px;color:rgb(var(--ink));line-height:1.5;font-weight:500">Which channel is growing fastest this quarter?</p></div>
              <span style="font-size:8.5px;color:rgb(var(--tertiary-text));padding-right:2px">2m ago</span>
            </div>
            <div style="display:flex;gap:10px;align-items:flex-start">
              <div style="width:25px;height:25px;border-radius:7px;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px"><svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="none"><path d="${ASK_SPARKLE}"/></svg></div>
              <div style="flex:1;min-width:0;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:12px;padding:12px 14px">
                <div style="display:flex;align-items:center;gap:6px;margin-bottom:9px;flex-wrap:wrap">
                  <span style="font-size:9.5px;font-weight:600;color:rgb(var(--tertiary-text));letter-spacing:0.03em">GROUNDED IN</span>
                  <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px 3px 4px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:7px"><div style="width:15px;height:15px;border-radius:4px;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">Sales Performance</span></div>
                  <div style="display:inline-flex;align-items:center;gap:5px;padding:3px 8px 3px 4px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:7px"><div style="width:15px;height:15px;border-radius:4px;background:#3E63DD;display:flex;align-items:center;justify-content:center"><span aria-hidden="true" style="font-size:9px;color:#fff;font-weight:700">❄</span></div><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">net_revenue</span><span style="font-size:8.5px;color:rgb(var(--tertiary-text))">gold</span></div>
                </div>
                <p style="margin:0 0 9px;font-size:13px;color:rgb(var(--ink));line-height:1.6">Online is your fastest-growing channel, <strong style="color:rgb(var(--ink))">up 18% quarter on quarter</strong> and now 22% of revenue. Direct grew 6% and Partner was flat. At this pace, Online overtakes Partner by Q4.</p>
                <div style="display:flex;align-items:center;gap:7px;margin-bottom:10px;padding:6px 11px;background:rgb(var(--primary-bg));border:1px solid rgb(var(--subtle-stroke));border-radius:9px;flex-wrap:wrap">
                  <span style="font-size:10px;color:rgb(var(--diagram-purple));font-weight:700;font-family:var(--font-mono)">ƒx</span>
                  <span style="font-size:9.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">share = channel_revenue ÷ net_revenue</span>
                  <span style="width:1px;height:10px;background:rgb(var(--card-line))"></span>
                  <span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">net_revenue: warehouse · gold</span>
                  <div style="flex:1"></div>
                  <span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">computed on the fly</span>
                </div>
                <div style="border:1px solid rgb(var(--card-line));border-radius:12px;padding:11px 14px;margin-bottom:10px;background:rgb(var(--screen-surface))">
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
                    <span style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Revenue share by channel · Q2</span>
                    <span style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">net_revenue · metric layer</span>
                  </div>
                  <div style="display:flex;flex-direction:column;gap:8px">
                    ${CHANNEL_BARS.map(
                      (c) => `<div style="display:flex;align-items:center;gap:9px">
                      <span style="width:48px;font-size:10.5px;color:rgb(var(--secondary-text));flex-shrink:0">${c.name}</span>
                      <div style="flex:1;height:9px;background:rgb(var(--tertiary-bg));border-radius:5px;overflow:hidden"><div style="width:${c.pct * 2}%;height:100%;background:${c.color};border-radius:5px"></div></div>
                      <span style="width:30px;text-align:right;font-size:10.5px;color:rgb(var(--ink));font-weight:600;flex-shrink:0">${c.pct}%</span>
                      <span style="width:64px;text-align:right;font-size:9px;font-weight:600;color:rgb(var(--positive-text));flex-shrink:0">${c.note}</span>
                    </div>`
                    ).join("")}
                  </div>
                  <div style="display:flex;align-items:center;justify-content:space-between;margin-top:9px;padding-top:7px;border-top:1px solid rgb(var(--tertiary-bg))">
                    <span style="font-size:9px;color:rgb(var(--tertiary-text))">share of $25.4M net revenue</span>
                    <span style="font-size:9px;color:rgb(var(--tertiary-text))">Q2 FY26 · vs Q1</span>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:2px;margin-top:9px">
                  <div style="display:inline-flex;align-items:center;gap:5px;height:25px;padding:0 10px;border:1px solid rgb(var(--card-line));border-radius:8px;cursor:pointer;background:rgb(var(--screen-surface));margin-right:4px" title="Read this answer aloud"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">Listen</span><span style="font-size:9px;color:rgb(var(--tertiary-text))">0:31</span></div>
                  <div style="width:25px;height:25px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Copy"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></div>
                  <div style="width:25px;height:25px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Good answer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></div>
                  <div style="width:25px;height:25px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Poor answer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg></div>
                  <div style="width:25px;height:25px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer" title="Re-run"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg></div>
                  <div style="flex:1"></div>
                  <span style="font-size:9px;color:rgb(var(--tertiary-text))">2 sources · full trace saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="flex-shrink:0;background:rgb(var(--screen-surface));border-top:1px solid rgb(var(--subtle-stroke));padding:10px 20px 12px">
          <div style="width:100%;max-width:600px;margin:0 auto">
            <div style="border:1px solid rgb(var(--card-line));border-radius:12px;padding:8px 10px;display:flex;align-items:center;gap:9px;background:rgb(var(--screen-surface));box-shadow:none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer;flex-shrink:0"><path d="M5 12h14M12 5v14"/></svg>
              <span style="flex:1;font-size:12.5px;color:rgb(var(--tertiary-text))">Ask a follow-up…</span>
              <div style="display:flex;align-items:center;gap:5px;padding:3px 8px;background:rgb(var(--primary-bg));border:1px solid rgb(var(--subtle-stroke));border-radius:7px;cursor:pointer;flex-shrink:0"><div style="width:12px;height:12px;border-radius:3px;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center"><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:10.5px;color:rgb(var(--ink));font-weight:500">Sales Performance</span><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
              <div style="width:28px;height:28px;border:1px solid rgb(var(--card-line));border-radius:8px;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0" title="Dictate"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><path d="M12 19v3"/></svg></div>
              <div style="width:28px;height:28px;background:rgb(var(--blue));border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7M12 19V5"/></svg></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:center;gap:5px;margin-top:7px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg><span style="font-size:9px;color:rgb(var(--tertiary-text))">Answers respect your row-level access · every claim traceable to source</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- */
/* Master Data — three source records merge into one golden record   */

/* ---------------------------------------------------------------- */
/* Master Data — three source records merge into one golden record   */
/* ---------------------------------------------------------------- */
const MASTER_DATA_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:var(--font-sans);background:rgb(var(--primary-bg))">
  ${WINDOW_BAR}
  ${appTopBar("Master Data", "Customers")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("master")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid rgb(var(--card-line));display:flex;align-items:center;padding:0 14px;gap:10px;flex-shrink:0;background:rgb(var(--screen-surface))">
        <span style="font-size:12px;font-weight:700;color:rgb(var(--ink));letter-spacing:-0.01em;white-space:nowrap">Customers</span>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="height:27px;padding:0 11px;background:rgb(var(--anchor));border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;flex-shrink:0"><span style="font-size:11.5px;color:#fff;font-weight:600">Actions</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="display:flex;align-items:center;height:27px;background:rgb(var(--tertiary-bg));border-radius:8px;padding:2px;flex-shrink:0">
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;background:rgb(var(--screen-surface));border-radius:6px;font-size:10.5px;font-weight:600;color:rgb(var(--ink));box-shadow:none">Canvas</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Records</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Rules</span>
          <span style="height:23px;display:flex;align-items:center;padding:0 10px;font-size:10.5px;color:rgb(var(--secondary-text));cursor:pointer">Queue</span>
        </div>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="height:27px;padding:0 10px;border:1px solid rgb(var(--card-line));border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;background:rgb(var(--screen-surface));flex-shrink:0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg><span style="font-size:11.5px;color:rgb(var(--secondary-text));font-weight:500">Match rules v12</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="height:27px;padding:0 10px;background:rgb(var(--blue-subtle));border:1px solid rgb(var(--blue-border));border-radius:20px;display:flex;align-items:center;gap:5px;cursor:pointer;flex-shrink:0"><span style="font-size:10.5px;color:rgb(var(--blue));font-weight:600">Auto-merge ≥ 0.95</span><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--blue))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="height:27px;padding:0 10px;border:1px solid rgb(var(--card-line));border-radius:20px;display:flex;align-items:center;gap:5px;background:rgb(var(--screen-surface));cursor:pointer;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-1a7 7 0 0 1 14 0v1"/><path d="M19 8v6M22 11h-6"/></svg><span style="font-size:10.5px;color:rgb(var(--secondary-text));font-weight:500">Review queue · 3</span></div>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;flex-shrink:0">
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff;font-weight:700">AR</span></div>
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;margin-left:-7px"><span style="font-size:9px;color:#fff;font-weight:700">DK</span></div>
        </div>
        <span style="font-size:10.5px;color:rgb(var(--tertiary-text))">12,447 golden records · 0 open conflicts</span>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid rgb(var(--card-line));display:flex;flex-direction:column;flex-shrink:0;background:rgb(var(--screen-surface))">
          ${sidebarSearch("Search entities")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>ENTITIES</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">4</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:rgb(var(--blue-subtle))"><div style="width:19px;height:19px;border-radius:5px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink));font-weight:600">Customers</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">12,447</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:rgb(var(--primary-bg))"><div style="width:19px;height:19px;border-radius:5px;background:rgb(var(--tertiary-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M14 9h1M14 13h1"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Vendors</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">3,208</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:rgb(var(--tertiary-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Products</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">18,662</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:rgb(var(--tertiary-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span style="font-size:11.5px;color:rgb(var(--ink))">Locations</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">214</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>MATCH KEYS</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">tax_id</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">exact</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">address</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">fuzzy ≥ 0.9</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">phone</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">exact</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>SURVIVORSHIP</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="font-size:11px;color:rgb(var(--ink))">Terms</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">prefer ERP</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="font-size:11px;color:rgb(var(--ink))">Address</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">most recent</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--blue-subtle));display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--blue))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;color:rgb(var(--ink));font-weight:600">4 stewards</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">3 merges pending review</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:rgb(var(--screen-surface));background-image:radial-gradient(circle,rgb(var(--lineSoft)) 1px,transparent 1px);background-size:22px 22px">
          <svg width="674" height="482" viewBox="0 0 674 482" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M180,90 C 230,90 240,180 288,196" stroke="rgb(var(--line))" fill="none" stroke-width="1.2"/>
            <path d="M180,230 L 288,230" stroke="rgb(var(--line))" fill="none" stroke-width="1.2"/>
            <path d="M180,370 C 230,370 240,280 288,262" stroke="rgb(var(--blue))" fill="none" stroke-width="1.6"/>
            <circle cx="288" cy="196" r="3" fill="rgb(var(--tertiary-text))"/><circle cx="288" cy="230" r="3" fill="rgb(var(--tertiary-text))"/><circle cx="288" cy="262" r="3.5" fill="rgb(var(--blue))"/>
          </svg>
          <div style="position:absolute;left:20px;top:56px;width:160px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 7px"><div style="width:24px;height:24px;border-radius:7px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Whitmore Retail</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Salesforce · #4471</div></div></div>
            <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:5px 10px"><span style="display:block;font-size:9px;color:rgb(var(--secondary-text));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">tax_id 94-2404110 · Harbor Blvd</span></div>
          </div>
          <div style="position:absolute;left:20px;top:196px;width:160px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 7px"><div style="width:24px;height:24px;border-radius:7px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:#fff;font-weight:700">N</span></div><div style="min-width:0;flex:1"><div style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">Whitmore Retail Pvt</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">NetSuite · #4471-B</div></div></div>
            <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:5px 10px"><span style="display:block;font-size:9px;color:rgb(var(--secondary-text));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">same tax_id · Ste 2 · net-45</span></div>
          </div>
          <div style="position:absolute;left:20px;top:336px;width:160px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:10px;box-shadow:none;overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 7px"><div style="width:24px;height:24px;border-radius:7px;background:#E5547B;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:11.5px;font-weight:600;color:rgb(var(--ink))">WHITMORE RETAIL</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">Invoice PDF · bill-to</div></div></div>
            <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:5px 10px"><span style="display:block;font-size:9px;color:rgb(var(--diagram-gold));font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">no tax_id · fuzzy match 0.97</span></div>
          </div>
          <div style="position:absolute;left:288px;top:148px;width:186px;background:rgb(var(--screen-surface));border:1.5px solid rgb(var(--blue));border-radius:11px;box-shadow:none;overflow:hidden">
            <div style="height:34px;background:rgb(var(--blue-solid));display:flex;align-items:center;gap:8px;padding:0 12px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg><span style="font-size:12px;font-weight:700;color:#fff">Golden record</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--blue-border));font-weight:600">CU-9042</span></div>
            <div style="padding:9px 12px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text))">Name</span><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">Whitmore Retail</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text))">tax_id</span><span style="font-size:10px;color:rgb(var(--ink));font-family:var(--font-mono)">94-2404110</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text))">Address</span><span style="font-size:10px;color:rgb(var(--ink))">500 Harbor Blvd, Ste 2</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text))">Terms</span><span style="font-size:10px;color:rgb(var(--ink))">net-45 <span style="color:rgb(var(--tertiary-text))">· from ERP</span></span></div>
            </div>
            <div style="border-top:1px solid rgb(var(--blue-subtle));background:rgb(var(--primary-bg));padding:6px 12px;display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:9.5px;color:rgb(var(--positive-text));font-weight:600">Confidence 0.98 · 3 sources</span><div style="flex:1"></div><span style="font-size:9.5px;color:rgb(var(--blue));font-weight:600;cursor:pointer">Open record →</span></div>
          </div>
          <div style="position:absolute;left:196px;top:100px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:20px;padding:2px 8px;font-size:9px;color:rgb(var(--secondary-text));font-family:var(--font-mono);box-shadow:none">tax_id · exact match</div>
          <div style="position:absolute;left:202px;top:378px;background:rgb(var(--panel));border:1px solid rgb(var(--blue-border));border-radius:20px;padding:2px 8px;font-size:9px;color:rgb(var(--blue));font-family:var(--font-mono);box-shadow:none">steward approved · 2m ago</div>
          <div style="position:absolute;left:508px;top:176px;width:100px;background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));border-radius:9px;padding:8px 10px">
            <div style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">#4471</div>
            <div style="font-size:9px;color:rgb(var(--tertiary-text))">superseded</div>
          </div>
          <div style="position:absolute;left:508px;top:246px;width:100px;background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));border-radius:9px;padding:8px 10px">
            <div style="font-size:9px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">#4471-B</div>
            <div style="font-size:9px;color:rgb(var(--tertiary-text))">superseded</div>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;padding:5px 11px;display:flex;align-items:center;gap:12px;box-shadow:none">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#3E63DD"></span><span style="font-size:10px;color:rgb(var(--ink))">1 golden record</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;border:1.5px solid rgb(var(--tertiary-text))"></span><span style="font-size:10px;color:rgb(var(--ink))">2 superseded · lineage kept</span></span>
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

/* ---------------------------------------------------------------- */
/* ML — notebook + experiment tracking, trained where data lives     */
/* ---------------------------------------------------------------- */
const ML_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:var(--font-sans);background:rgb(var(--primary-bg))">
  ${WINDOW_BAR}
  ${appTopBar("ML", "forecast_training.ipynb")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("ml")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid rgb(var(--card-line));display:flex;align-items:center;padding:0 14px;gap:12px;flex-shrink:0;background:rgb(var(--screen-surface))">
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer;height:27px;padding:0 11px;background:rgb(var(--anchor));border-radius:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg><span style="font-size:11.5px;color:#fff;font-weight:600">Run all</span></div>
        <div style="width:26px;height:27px;border:1px solid rgb(var(--card-line));border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:rgb(var(--screen-surface))"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></div>
        <div style="width:1px;height:18px;background:rgb(var(--card-line))"></div>
        <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:rgb(var(--positive))"></span><span style="font-size:11px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">Python 3.11 · idle</span></div>
        <div style="height:27px;padding:0 10px;border:1px solid rgb(var(--card-line));border-radius:7px;background:rgb(var(--screen-surface));display:flex;align-items:center;gap:6px;cursor:pointer;flex-shrink:0"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;color:rgb(var(--secondary-text));font-weight:500">Schedule: Weekly</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;flex-shrink:0">
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff;font-weight:700">AR</span></div>
          <div style="width:22px;height:22px;border-radius:50%;background:rgb(var(--blue-solid));border:1.5px solid #fff;display:flex;align-items:center;justify-content:center;margin-left:-7px"><span style="font-size:9px;color:#fff;font-weight:700">DK</span></div>
        </div>
        <span style="font-size:10.5px;color:rgb(var(--tertiary-text))">Autosaved 2m ago</span>
        <div style="height:24px;padding:0 9px;background:rgb(var(--positive-subtle));border:1px solid rgb(var(--positive-border));border-radius:20px;display:flex;align-items:center;gap:5px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:10.5px;color:rgb(var(--positive-text));font-weight:600">v3 · Production</span></div>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid rgb(var(--card-line));display:flex;flex-direction:column;flex-shrink:0;background:rgb(var(--screen-surface))">
          ${sidebarSearch("Search experiments")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>EXPERIMENTS</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:rgb(var(--blue-subtle))"><div style="width:19px;height:19px;border-radius:5px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg></div><span style="font-size:11px;color:rgb(var(--ink));font-weight:600;font-family:var(--font-mono)">demand_forecast</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">24</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:rgb(var(--tertiary-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">churn_risk</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">11</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:rgb(var(--tertiary-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M12 22V12M3 7l9 5 9-5"/></svg></div><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">stockout_alert</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">6</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>MODEL REGISTRY</span><span style="font-size:9px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:rgb(var(--positive));flex-shrink:0"></span><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">demand_forecast</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">v3 · prod</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:#E0A93B;flex-shrink:0"></span><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">churn_risk</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--diagram-gold));font-weight:600">v2 · staging</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:rgb(var(--tertiary-text));flex-shrink:0"></span><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">stockout_alert</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">v1 · dev</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>COMPUTE</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:rgb(var(--positive));animation:softpulse 2.4s infinite;flex-shrink:0"></span><span style="font-size:11px;color:rgb(var(--ink));font-family:var(--font-mono)">ml-gpu-01</span><div style="flex:1"></div><span style="font-size:9px;color:rgb(var(--tertiary-text))">4× T4</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:rgb(var(--blue-subtle));display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--blue))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;color:rgb(var(--ink));font-weight:600">Feature store</div><div style="font-size:9px;color:rgb(var(--tertiary-text))">42 features · governed</div></div></div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:rgb(var(--screen-surface));min-width:0;padding:12px 14px;gap:7px">
          <div style="display:flex;border:1px solid rgb(var(--card-line));border-radius:8px;background:rgb(var(--screen-surface));overflow:hidden;flex-shrink:0">
            <div style="width:40px;background:rgb(var(--primary-bg));border-right:1px solid rgb(var(--subtle-stroke));padding-top:9px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:rgb(var(--blue));font-family:var(--font-mono);font-weight:600">[1]</span></div>
            <pre style="margin:0;padding:8px 12px;font-size:10.5px;line-height:1.7;font-family:var(--font-mono);color:rgb(var(--ink));flex:1;overflow:hidden"><span style="color:rgb(var(--diagram-purple))">import</span> akashic.ml <span style="color:rgb(var(--diagram-purple))">as</span> ml

fs = ml.<span style="color:rgb(var(--blue))">features</span>(<span style="color:rgb(var(--positive-text))">"sales_performance"</span>)
train, test = fs.<span style="color:rgb(var(--blue))">split</span>(holdout_weeks=<span style="color:rgb(var(--diagram-pink))">12</span>)</pre>
          </div>
          <div style="display:flex;border:1px solid rgb(var(--blue-border));border-radius:8px;background:rgb(var(--screen-surface));overflow:hidden;flex-shrink:0">
            <div style="width:40px;background:rgb(var(--blue-subtle));border-right:1px solid rgb(var(--blue-border));padding-top:9px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:rgb(var(--blue));font-family:var(--font-mono);font-weight:600">[2]</span></div>
            <pre style="margin:0;padding:8px 12px;font-size:10.5px;line-height:1.7;font-family:var(--font-mono);color:rgb(var(--ink));flex:1;overflow:hidden">run = ml.<span style="color:rgb(var(--blue))">train</span>(<span style="color:rgb(var(--positive-text))">"demand_forecast"</span>, algo=<span style="color:rgb(var(--positive-text))">"xgboost"</span>,
    learning_rate=<span style="color:rgb(var(--diagram-pink))">0.08</span>, max_depth=<span style="color:rgb(var(--diagram-pink))">6</span>, n_estimators=<span style="color:rgb(var(--diagram-pink))">400</span>)
run.<span style="color:rgb(var(--blue))">evaluate</span>(test)</pre>
          </div>
          <div style="display:flex;flex-shrink:0">
            <div style="width:40px;padding-top:8px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:rgb(var(--diagram-pink));font-family:var(--font-mono);font-weight:600">[2]</span></div>
            <div style="flex:1;display:flex;align-items:center;gap:10px;padding:5px 0 3px;min-width:0">
              <div style="display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 9px;background:rgb(var(--positive-subtle));border:1px solid rgb(var(--positive-border));border-radius:6px"><span style="font-size:10px;color:rgb(var(--positive-text));font-weight:700;font-family:var(--font-mono)">MAPE 6.2%</span><span style="font-size:8.5px;color:rgb(var(--positive-text));background:rgb(var(--screen-surface));border-radius:4px;padding:0 4px;font-weight:600">best</span></div>
              <span style="font-size:10px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">RMSE 412</span>
              <span style="font-size:10px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">R² 0.94</span>
              <div style="flex:1"></div>
              <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
                <svg width="120" height="30" viewBox="0 0 120 30"><path d="M2 6 L20 12 L38 17 L56 21 L74 23 L92 25 L118 26" stroke="rgb(var(--blue))" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M2 4 L20 9 L38 13 L56 18 L74 21 L92 24 L118 25.5" stroke="#E0A93B" stroke-width="1.4" fill="none" stroke-dasharray="3 3" stroke-linecap="round"/></svg>
                <div style="display:flex;flex-direction:column;gap:2px"><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:9px;height:2px;background:#3E63DD"></span><span style="font-size:8.5px;color:rgb(var(--tertiary-text))">train</span></span><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:9px;height:2px;background:#E0A93B"></span><span style="font-size:8.5px;color:rgb(var(--tertiary-text))">val</span></span></div>
              </div>
            </div>
          </div>
          <div style="display:flex;border:1px solid rgb(var(--card-line));border-radius:8px;background:rgb(var(--screen-surface));overflow:hidden;flex-shrink:0">
            <div style="width:40px;background:rgb(var(--primary-bg));border-right:1px solid rgb(var(--subtle-stroke));padding-top:9px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:rgb(var(--blue));font-family:var(--font-mono);font-weight:600">[3]</span></div>
            <pre style="margin:0;padding:8px 12px;font-size:10.5px;line-height:1.7;font-family:var(--font-mono);color:rgb(var(--ink));flex:1;overflow:hidden">run.<span style="color:rgb(var(--blue))">forecast</span>(horizon=<span style="color:rgb(var(--diagram-pink))">12</span>).<span style="color:rgb(var(--blue))">plot</span>()</pre>
          </div>
          <div style="display:flex;flex:1;min-height:0">
            <div style="width:40px;padding-top:8px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:rgb(var(--diagram-pink));font-family:var(--font-mono);font-weight:600">[3]</span></div>
            <div style="flex:1;border:1px solid rgb(var(--subtle-stroke));border-radius:8px;background:rgb(var(--screen-surface));padding:10px 13px;display:flex;flex-direction:column;min-width:0">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
                <span style="font-size:10.5px;font-weight:600;color:rgb(var(--ink))">Demand forecast · next 12 weeks</span>
                <div style="display:flex;align-items:center;gap:10px"><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:rgb(var(--anchor))"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">actuals</span></span><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:#3E63DD"></span><span style="font-size:9px;color:rgb(var(--secondary-text))">forecast · p10–p90</span></span></div>
              </div>
              <div style="flex:1;position:relative;min-height:0">
                <svg viewBox="0 0 300 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%">
                  <path d="M195 26 L300 12 L300 60 L195 49 Z" fill="rgb(var(--blue))" fill-opacity="0.09"/>
                  <path d="M0 74 L28 63 L52 68 L80 48 L108 55 L136 42 L164 48 L195 34" stroke="rgb(var(--ink))" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M195 34 L300 21" stroke="rgb(var(--blue))" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="6 4"/>
                  <line x1="195" y1="4" x2="195" y2="96" stroke="rgb(var(--blue))" stroke-width="1" stroke-dasharray="3 4" opacity="0.55"/>
                </svg>
                <span style="position:absolute;left:66.5%;top:0;font-size:8.5px;color:rgb(var(--blue));font-weight:600">today</span>
                <span style="position:absolute;right:0;top:30%;font-size:10px;color:rgb(var(--ink));font-weight:700;background:rgb(var(--screen-surface));border:1px solid rgb(var(--blue-border));border-radius:6px;padding:2px 7px">≈12,400 units next qtr</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
                <span style="font-size:9px;color:rgb(var(--tertiary-text))">Jul</span><span style="font-size:9px;color:rgb(var(--tertiary-text))">Aug</span><span style="font-size:9px;color:rgb(var(--tertiary-text))">Sep</span><span style="font-size:9px;color:rgb(var(--tertiary-text))">Oct</span><span style="font-size:9px;color:rgb(var(--tertiary-text))">Nov</span><span style="font-size:9px;color:rgb(var(--tertiary-text))">Dec</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width:224px;border-left:1px solid rgb(var(--card-line));background:rgb(var(--screen-surface));display:flex;flex-direction:column;flex-shrink:0;overflow:hidden">
          <div style="padding:11px 13px 8px;border-bottom:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;gap:7px"><span style="font-size:11.5px;font-weight:700;color:rgb(var(--ink))">Runs</span><span style="font-size:9.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">demand_forecast</span><div style="flex:1"></div><span style="font-size:9.5px;color:rgb(var(--secondary-text));cursor:pointer" title="Compare runs">Compare</span><span style="font-size:9.5px;color:rgb(var(--blue));font-weight:600;cursor:pointer">+ New</span></div>
          <div style="padding:8px 10px;display:flex;flex-direction:column;gap:3px">
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px;background:rgb(var(--blue-subtle));border:1px solid rgb(var(--blue-border))"><span style="font-size:9.5px;color:rgb(var(--blue));font-family:var(--font-mono);font-weight:700">#24</span><span style="font-size:10px;color:rgb(var(--ink));font-weight:600">MAPE 6.2%</span><div style="flex:1"></div><span style="font-size:8.5px;color:rgb(var(--positive-text));background:rgb(var(--positive-subtle));border:1px solid rgb(var(--positive-border));border-radius:4px;padding:1px 5px;font-weight:600">prod</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px;background:rgb(var(--primary-bg))"><span style="font-size:9.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">#23</span><span style="font-size:10px;color:rgb(var(--secondary-text))">MAPE 6.9%</span><div style="flex:1"></div><span style="font-size:8.5px;color:rgb(var(--tertiary-text))">2d ago</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px"><span style="font-size:9.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">#22</span><span style="font-size:10px;color:rgb(var(--secondary-text))">MAPE 7.4%</span><div style="flex:1"></div><span style="font-size:8.5px;color:rgb(var(--tertiary-text))">4d ago</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px"><span style="font-size:9.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">#19</span><span style="font-size:10px;color:rgb(var(--secondary-text))">MAPE 9.8%</span><div style="flex:1"></div><span style="font-size:8.5px;color:rgb(var(--tertiary-text))">1w ago</span></div>
          </div>
          <div style="padding:2px 13px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>PARAMETERS</span></div>
          <div style="padding:0 13px;display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">learning_rate</span><span style="font-size:10px;color:rgb(var(--ink));font-family:var(--font-mono)">0.08</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">max_depth</span><span style="font-size:10px;color:rgb(var(--ink));font-family:var(--font-mono)">6</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">n_estimators</span><span style="font-size:10px;color:rgb(var(--ink));font-family:var(--font-mono)">400</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">holdout</span><span style="font-size:10px;color:rgb(var(--ink));font-family:var(--font-mono)">12 wk</span></div>
          </div>
          <div style="padding:10px 13px 4px"><span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;font-weight:700;color:rgb(var(--tertiary-text));letter-spacing:0.07em;cursor:pointer"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>MONITORS</span></div>
          <div style="padding:0 13px;display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--ink))">Drift · PSI 0.04</span><span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">ok</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--ink))">Feature freshness</span><span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">ok</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:rgb(var(--ink))">Bias · region</span><span style="font-size:9px;color:rgb(var(--positive-text));font-weight:600">ok</span></div>
          </div>
          <div style="flex:1"></div>
          <div style="margin:10px;border:1px solid rgb(var(--positive-border));background:rgb(var(--positive-subtle));border-radius:9px;padding:9px 11px">
            <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:rgb(var(--positive));animation:softpulse 2.4s infinite"></span><span style="font-size:10.5px;color:rgb(var(--ink));font-weight:600">v3 serving</span></div>
            <div style="font-size:9px;color:rgb(var(--secondary-text));margin-top:3px;font-family:var(--font-mono)">1.2M preds/day · p95 41ms</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- */
/* Governance — catalog entity page: lineage, metadata, quality      */
/* ---------------------------------------------------------------- */
const GOVERNANCE_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:var(--font-sans);background:rgb(var(--primary-bg))">
  ${WINDOW_BAR}
  ${appTopBar("Governance", "fact_sales")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("governance")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <!-- Breadcrumbs & Asset Header (OpenMetadata style) -->
      <div style="border-bottom:1px solid rgb(var(--card-line));padding:10px 14px;background:rgb(var(--screen-surface));flex-shrink:0;display:flex;flex-direction:column;gap:5px">
        <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">
          <span style="cursor:pointer">Database service</span>
          <span aria-hidden="true" style="color:rgb(var(--line))">/</span>
          <span>snowflake_prod</span>
          <span aria-hidden="true" style="color:rgb(var(--line))">/</span>
          <span>gold</span>
          <span aria-hidden="true" style="color:rgb(var(--line))">/</span>
          <span style="color:rgb(var(--ink));font-weight:600">fact_sales</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--blue))" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
            </svg>
            <span style="font-size:14px;color:rgb(var(--ink));font-weight:700;font-family:var(--font-mono)">fact_sales</span>
            <div style="width:1px;height:12px;background:rgb(var(--card-line));margin:0 2px"></div>
            <span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;color:rgb(var(--secondary-text));background:rgb(var(--tertiary-bg));padding:2px 6px;border-radius:4px">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/></svg>
              Sales
            </span>
            <span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;color:rgb(var(--secondary-text))">
              <div style="width:14px;height:14px;border-radius:50%;background:rgb(var(--blue));display:flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:600">KI</div>
              Kavya Iyer
            </span>
            <span style="font-size:9px;color:rgb(var(--diagram-gold));background:rgb(var(--diagram-gold-bg));border:1px solid rgb(var(--diagram-gold-line));border-radius:4px;padding:1px 5px;font-weight:600">Tier 1</span>
            <span style="font-size:9.5px;color:rgb(var(--tertiary-text))">Type: <b style="color:rgb(var(--ink));font-weight:600">Fact table</b></span>
            <span style="font-size:9.5px;color:rgb(var(--tertiary-text))">Usage: <b style="color:rgb(var(--ink));font-weight:600">94th pctile</b></span>
          </div>
          <div style="display:flex;align-items:center;gap:8px">
            <div style="display:flex;align-items:center;gap:10px;border:1px solid rgb(var(--card-line));border-radius:6px;padding:3px 8px;background:rgb(var(--primary-bg))">
              <span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:rgb(var(--secondary-text))"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>110 upvotes</span>
              <span style="width:1px;height:10px;background:rgb(var(--card-line))"></span>
              <span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:rgb(var(--secondary-text))"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>27 watching</span>
              <span style="width:1px;height:10px;background:rgb(var(--card-line))"></span>
              <span style="display:inline-flex;align-items:center;gap:3px;font-size:9px;color:rgb(var(--secondary-text))"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>20 starred</span>
            </div>
            ${LIVE_CHIP}
          </div>
        </div>
      </div>

      <!-- Tab rows (OpenMetadata style) -->
      <div style="height:32px;border-bottom:1px solid rgb(var(--card-line));display:flex;align-items:center;padding:0 14px;gap:16px;flex-shrink:0;background:rgb(var(--screen-surface))">
        <span style="font-size:10.5px;color:rgb(var(--secondary-text));padding:8px 0;cursor:pointer">Schema <span style="font-size:8.5px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));padding:1px 4px;border-radius:4px">12</span></span>
        <span style="font-size:10.5px;color:rgb(var(--secondary-text));padding:8px 0;cursor:pointer">Activity feed & tasks <span style="font-size:8.5px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));padding:1px 4px;border-radius:4px">23</span></span>
        <span style="font-size:10.5px;color:rgb(var(--secondary-text));padding:8px 0;cursor:pointer">Sample data</span>
        <span style="font-size:10.5px;color:rgb(var(--secondary-text));padding:8px 0;cursor:pointer">Queries <span style="font-size:8.5px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));padding:1px 4px;border-radius:4px">10</span></span>
        <span style="font-size:10.5px;color:rgb(var(--secondary-text));padding:8px 0;cursor:pointer">Profiler & data quality</span>
        <span style="font-size:10.5px;color:rgb(var(--blue));font-weight:600;padding:8px 0 6px;border-bottom:2px solid rgb(var(--blue));cursor:default">Lineage</span>
        <span style="font-size:10.5px;color:rgb(var(--secondary-text));padding:8px 0;cursor:pointer">Custom properties</span>
      </div>

      <!-- Lineage Canvas Area -->
      <div style="flex:1;position:relative;overflow:hidden;background:rgb(var(--screen-surface));background-image:radial-gradient(circle,rgb(var(--lineSoft)) 1.1px,transparent 1.1px);background-size:16px 16px;min-width:0">
        <!-- Search Lineage -->
        <div style="position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px;z-index:5">
          <div style="background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;padding:3.5px 8px;display:flex;align-items:center;gap:6px;box-shadow:none">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <span style="font-size:9.5px;color:rgb(var(--tertiary-text));width:90px">Search lineage</span>
          </div>
          <span style="font-size:9.5px;color:rgb(var(--blue));font-weight:600;cursor:pointer">Advanced ></span>
          <div style="background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;padding:3.5px 7px;display:flex;align-items:center;gap:4px;cursor:pointer;box-shadow:none"><span style="font-size:9px;color:rgb(var(--secondary-text))">Upstream</span><span style="font-size:9px;color:rgb(var(--ink));font-weight:700">2</span><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
          <div style="background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;padding:3.5px 7px;display:flex;align-items:center;gap:4px;cursor:pointer;box-shadow:none"><span style="font-size:9px;color:rgb(var(--secondary-text))">Downstream</span><span style="font-size:9px;color:rgb(var(--ink));font-weight:700">1</span><svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
          <div style="background:rgb(var(--blue-subtle));border:1px solid rgb(var(--blue-border));border-radius:6px;padding:3.5px 7px;display:flex;align-items:center;gap:5px;cursor:pointer"><span style="font-size:9px;color:rgb(var(--blue));font-weight:600">Column level</span><span style="position:relative;width:16px;height:9px;border-radius:5px;background:#3E63DD;display:inline-block"><span style="position:absolute;right:1px;top:1px;width:7px;height:7px;border-radius:50%;background:rgb(var(--screen-surface))"></span></span></div>
        </div>

        <!-- SVG Lineage Paths — solid fine lines, OpenMetadata style -->
        <svg width="620" height="380" viewBox="0 0 620 380" style="position:absolute;top:0;left:0;pointer-events:none;z-index:1">
          <defs>
            <marker id="gov-arr" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1.5 1 L6.5 4 L1.5 7" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></marker>
            <marker id="gov-arr-active" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1.5 1 L6.5 4 L1.5 7" fill="none" stroke="rgb(var(--blue))" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker>
          </defs>
          <!-- Upstream: table-level (sf.orders) + column-level (ns.invoices) -->
          <path d="M166,71 C196,71 194,80 222,80" stroke="rgb(var(--line))" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <path d="M166,217 C196,217 194,170 222,170" stroke="rgb(var(--blue))" fill="none" stroke-width="1.5" marker-end="url(#gov-arr-active)"/>
          <path d="M166,250 C196,250 194,186 222,186" stroke="rgb(var(--line))" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <path d="M166,266 C196,266 194,203 222,203" stroke="rgb(var(--line))" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <!-- Downstream: fan out from fact_sales -->
          <path d="M396,80 C422,80 420,83 442,83" stroke="rgb(var(--line))" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <path d="M396,80 C424,80 418,179 442,179" stroke="rgb(var(--blue))" fill="none" stroke-width="1.5" marker-end="url(#gov-arr-active)"/>
          <path d="M396,80 C424,80 418,275 442,275" stroke="rgb(var(--line))" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <!-- Source ports -->
          <circle cx="166" cy="71" r="1.8" fill="rgb(var(--tertiary-text))"/>
          <circle cx="166" cy="217" r="2.2" fill="rgb(var(--blue))"/>
          <circle cx="166" cy="250" r="1.8" fill="rgb(var(--tertiary-text))"/>
          <circle cx="166" cy="266" r="1.8" fill="rgb(var(--tertiary-text))"/>
          <circle cx="396" cy="80" r="2.2" fill="rgb(var(--blue))"/>
        </svg>

        <!-- Upstream Nodes -->
        <!-- Salesforce orders node -->
        <div style="position:absolute;left:12px;top:36px;width:154px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;box-shadow:none;font-family:var(--font-sans)">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">+</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">-</div>
          
          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:115px">sf_prod / orders</span>
              <span style="font-size:7px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div>
              <div style="min-width:0">
                <div style="font-size:10px;font-weight:700;color:rgb(var(--ink));font-family:var(--font-mono);line-height:1">sf.orders</div>
                <div style="font-size:8px;color:rgb(var(--tertiary-text));line-height:1;margin-top:2px">Raw customer orders</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:4px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:rgb(var(--secondary-text));font-weight:500;display:inline-flex;align-items:center;gap:2px">7 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
            <div style="display:flex;gap:2px">
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--positive-text));background:rgb(var(--positive-subtle));padding:0 3px;border-radius:3px">07</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--diagram-gold));background:rgb(var(--diagram-gold-bg));padding:0 3px;border-radius:3px">02</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--diagram-pink));background:rgb(var(--diagram-pink-bg));padding:0 3px;border-radius:3px">00</span>
            </div>
          </div>
        </div>

        <!-- NetSuite invoices node (expanded) -->
        <div style="position:absolute;left:12px;top:124px;width:154px;background:rgb(var(--screen-surface));border:1.5px solid rgb(var(--blue));border-radius:8px;box-shadow:none;font-family:var(--font-sans);z-index:3">
          <div style="position:absolute;left:-7px;top:20px;width:14px;height:14px;border:1px solid rgb(var(--blue));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--blue));cursor:pointer;z-index:2">+</div>
          <div style="position:absolute;right:-7px;top:20px;width:14px;height:14px;border:1px solid rgb(var(--blue));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--blue));cursor:pointer;z-index:2">-</div>

          <div style="padding:6px 8px 4px;background:rgb(var(--panel));border-top-left-radius:6.5px;border-top-right-radius:6.5px;border-bottom:1px solid rgb(var(--blue-subtle))">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:rgb(var(--blue));font-weight:600;font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:115px">netsuite_erp / invoices</span>
              <span style="font-size:7px;color:rgb(var(--blue));background:rgb(var(--blue-subtle));border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:8.5px;color:#fff;font-weight:700;font-family:var(--font-sans)">N</span></div>
              <div style="min-width:0">
                <div style="font-size:10px;font-weight:700;color:rgb(var(--ink));font-family:var(--font-mono);line-height:1">ns.invoices</div>
                <div style="font-size:8px;color:rgb(var(--tertiary-text));line-height:1;margin-top:2px">Billed invoices</div>
              </div>
            </div>
          </div>
          
          <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:4px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgb(var(--subtle-stroke))">
            <span style="font-size:8.5px;color:rgb(var(--ink));font-weight:600;display:inline-flex;align-items:center;gap:2px">7 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m18 15-6-6-6 6"/></svg></span>
            <div style="display:flex;gap:2px">
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--positive-text));background:rgb(var(--positive-subtle));padding:0 3px;border-radius:3px">31</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--diagram-gold));background:rgb(var(--diagram-gold-bg));padding:0 3px;border-radius:3px">01</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--diagram-pink));background:rgb(var(--diagram-pink-bg));padding:0 3px;border-radius:3px">01</span>
            </div>
          </div>

          <div style="padding:4px">
            <div style="background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));border-radius:4px;padding:2px 5px;display:flex;align-items:center;gap:4px;margin-bottom:4px">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span style="font-size:8px;color:rgb(var(--tertiary-text));width:100%">Search columns</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:1.5px">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;background:rgb(var(--panel));border-radius:3px"><span style="font-size:8.5px;color:rgb(var(--blue));font-weight:600;font-family:var(--font-mono)">customer_id</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">varchar</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">invoice_id</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">bigint</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">amount</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">numeric</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">invoice_date</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">date</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">status</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">varchar</span></div>
            </div>
            <div style="text-align:center;padding:4px 0 2px;border-top:1px solid rgb(var(--subtle-stroke));margin-top:4px"><span style="font-size:8px;color:rgb(var(--blue));font-weight:600;cursor:pointer">Show more columns</span></div>
          </div>
        </div>

        <!-- Middle Node: fact_sales -->
        <div style="position:absolute;left:224px;top:60px;width:172px;background:rgb(var(--screen-surface));border:1.5px solid rgb(var(--blue));border-radius:8px;box-shadow:none;font-family:var(--font-sans);z-index:3">
          <div style="position:absolute;left:-7px;top:20px;width:14px;height:14px;border:1px solid rgb(var(--blue));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--blue));cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:20px;width:14px;height:14px;border:1px solid rgb(var(--blue));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--blue));cursor:pointer;z-index:2">-</div>

          <div style="padding:6px 8px 4px;background:rgb(var(--panel));border-top-left-radius:6.5px;border-top-right-radius:6.5px;border-bottom:1px solid rgb(var(--blue-subtle))">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:rgb(var(--blue));font-weight:600;font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px">snowflake_prod / gold</span>
              <span style="font-size:7px;color:rgb(var(--blue));background:rgb(var(--blue-subtle));border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span aria-hidden="true" style="font-size:10px;color:#fff;font-weight:700">❄</span></div>
              <div style="min-width:0">
                <div style="font-size:10px;font-weight:700;color:rgb(var(--ink));font-family:var(--font-mono);line-height:1">fact_sales</div>
                <div style="font-size:8px;color:rgb(var(--tertiary-text));line-height:1;margin-top:2px">Gold · sales fact table</div>
              </div>
            </div>
          </div>
          
          <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:4px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgb(var(--subtle-stroke))">
            <span style="font-size:8.5px;color:rgb(var(--ink));font-weight:600;display:inline-flex;align-items:center;gap:2px">15 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m18 15-6-6-6 6"/></svg></span>
            <div style="display:flex;gap:2px">
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--positive-text));background:rgb(var(--positive-subtle));padding:0 3px;border-radius:3px">40</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--diagram-gold));background:rgb(var(--diagram-gold-bg));padding:0 3px;border-radius:3px">00</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:rgb(var(--diagram-pink));background:rgb(var(--diagram-pink-bg));padding:0 3px;border-radius:3px">03</span>
            </div>
          </div>

          <div style="padding:4px">
            <div style="background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));border-radius:4px;padding:2px 5px;display:flex;align-items:center;gap:4px;margin-bottom:4px">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span style="font-size:8px;color:rgb(var(--tertiary-text));width:100%">Search columns</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:1.5px">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">order_id</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">bigint</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;background:rgb(var(--panel));border-radius:3px"><span style="font-size:8.5px;color:rgb(var(--blue));font-weight:600;font-family:var(--font-mono)">customer_id</span><span style="font-size:7.5px;color:rgb(var(--blue));background:rgb(var(--blue-subtle));border-radius:2px;padding:0 2px;font-weight:600">FK</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;background:rgb(var(--panel));border-radius:3px"><span style="font-size:8.5px;color:rgb(var(--blue));font-weight:600;font-family:var(--font-mono)">net_amount</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">numeric</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--secondary-text));font-family:var(--font-mono)">region_id</span><span style="font-size:7px;color:rgb(var(--tertiary-text))">int</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:rgb(var(--diagram-pink));font-family:var(--font-mono)">tax_id</span><span style="font-size:7.5px;color:rgb(var(--diagram-pink));background:rgb(var(--diagram-pink-bg));border-radius:2px;padding:0 3px;font-weight:600">PII · masked</span></div>
            </div>
            <div style="text-align:center;padding:4px 0 2px;border-top:1px solid rgb(var(--subtle-stroke));margin-top:4px"><span style="font-size:8px;color:rgb(var(--blue));font-weight:600;cursor:pointer">Show more columns</span></div>
          </div>
        </div>

        <!-- Downstream Nodes -->
        <!-- Tableau sales node -->
        <div style="position:absolute;left:444px;top:48px;width:140px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;box-shadow:none;font-family:var(--font-sans)">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">+</div>

          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">tableau_ops</span>
              <span style="font-size:7px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Dashboard</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E5484D" stroke-width="2.5"><path d="M12 2v20M2 12h20M7 7l10 10M7 17L17 7"/></svg></div>
              <div style="min-width:0">
                <div style="font-size:9.5px;font-weight:700;color:rgb(var(--ink));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">tableau_sales</div>
                <div style="font-size:8px;color:rgb(var(--tertiary-text));line-height:1;margin-top:2px">Dashboard</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:4px 8px;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:rgb(var(--secondary-text));font-weight:500;display:inline-flex;align-items:center;gap:2px">Dashboard <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        </div>

        <!-- demand_forecast model node -->
        <div style="position:absolute;left:444px;top:144px;width:140px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;box-shadow:none;font-family:var(--font-sans)">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">+</div>

          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">ml_inference</span>
              <span style="font-size:7px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Model</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:rgb(var(--diagram-purple-bg));display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--diagram-purple))" stroke-width="2.5"><path d="M10 2v7.5L4.2 19a1.7 1.7 0 0 0 1.5 2.5h12.6a1.7 1.7 0 0 0 1.5-2.5L14 9.5V2"/><path d="M8.5 2h7"/></svg></div>
              <div style="min-width:0">
                <div style="font-size:9.5px;font-weight:700;color:rgb(var(--ink));white-space:nowrap;overflow:hidden;text-overflow:ellipsis">demand_forecast</div>
                <div style="font-size:8px;color:rgb(var(--tertiary-text));line-height:1;margin-top:2px">Model · v3</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:4px 8px;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:rgb(var(--secondary-text));font-weight:500;display:inline-flex;align-items:center;gap:2px">Model <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        </div>

        <!-- finance_ledger table node -->
        <div style="position:absolute;left:444px;top:240px;width:140px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;box-shadow:none;font-family:var(--font-sans)">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid rgb(var(--line));border-radius:50%;background:rgb(var(--screen-surface));display:flex;align-items:center;justify-content:center;font-size:8px;color:rgb(var(--tertiary-text));cursor:pointer;z-index:2">+</div>

          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:rgb(var(--tertiary-text));font-family:var(--font-mono)">snowflake_prod / gold</span>
              <span style="font-size:7px;color:rgb(var(--tertiary-text));background:rgb(var(--tertiary-bg));border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span aria-hidden="true" style="font-size:10px;color:#fff;font-weight:700">❄</span></div>
              <div style="min-width:0">
                <div style="font-size:9.5px;font-weight:700;color:rgb(var(--ink));font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">finance_ledger</div>
                <div style="font-size:8px;color:rgb(var(--tertiary-text));line-height:1;margin-top:2px">Table · finance</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgb(var(--subtle-stroke));background:rgb(var(--primary-bg));padding:4px 8px;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:rgb(var(--secondary-text));font-weight:500;display:inline-flex;align-items:center;gap:2px">7 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        </div>

        <!-- Floating panel (Edge Information) -->
        <div style="position:absolute;right:10px;top:10px;bottom:10px;width:242px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:8px;box-shadow:none;display:flex;flex-direction:column;overflow:hidden;z-index:5;font-family:var(--font-sans)">
          <div style="padding:8px 10px;border-bottom:1px solid rgb(var(--subtle-stroke));display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:10.5px;font-weight:700;color:rgb(var(--ink))">Edge information</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--tertiary-text))" stroke-width="2.5" style="cursor:pointer"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </div>
          <div style="padding:10px;display:flex;flex-direction:column;gap:8px;flex:1;min-height:0">
            <div style="display:grid;grid-template-columns:46px 1fr;gap:4px;font-size:9.5px">
              <span style="color:rgb(var(--tertiary-text))">Source:</span>
              <span style="color:rgb(var(--blue));font-weight:600;font-family:var(--font-mono)">ns.invoices</span>
              <span style="color:rgb(var(--tertiary-text))">Target:</span>
              <span style="color:rgb(var(--ink));font-weight:600;font-family:var(--font-mono)">fact_sales</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:2px">
              <span style="font-size:8px;color:rgb(var(--tertiary-text));font-weight:600;text-transform:uppercase;letter-spacing:0.03em">Description</span>
              <span style="font-size:9.5px;color:rgb(var(--secondary-text));line-height:1.4">Joins billed invoice totals onto orders on order_no to produce net_amount per sale. Runs daily at 02:00.</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;flex:1;min-height:0">
              <span style="font-size:8.5px;color:rgb(var(--tertiary-text));font-weight:600;text-transform:uppercase;letter-spacing:0.03em">SQL Query</span>
              
              <!-- Monospace Code Editor mockup -->
              <div style="flex:1;background:rgb(var(--primary-bg));border:1px solid rgb(var(--card-line));border-radius:6px;padding:6px;font-family:var(--font-mono);font-size:8.5px;line-height:1.35;overflow-y:auto;color:rgb(var(--secondary-text))">
                <span style="color:rgb(var(--diagram-purple));font-weight:600">WITH</span> invoice_totals <span style="color:rgb(var(--diagram-purple));font-weight:600">AS</span> (<br/>
                &nbsp;&nbsp;<span style="color:rgb(var(--blue));font-weight:600">SELECT</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;order_no,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:rgb(var(--blue));font-weight:600">SUM</span>(amount) <span style="color:rgb(var(--diagram-purple));font-weight:600">AS</span> billed_amount<br/>
                &nbsp;&nbsp;<span style="color:rgb(var(--blue));font-weight:600">FROM</span> stg_invoices<br/>
                &nbsp;&nbsp;<span style="color:rgb(var(--blue));font-weight:600">GROUP BY</span> order_no<br/>
                )<br/>
                <span style="color:rgb(var(--blue));font-weight:600">SELECT</span><br/>
                &nbsp;&nbsp;o.*,<br/>
                &nbsp;&nbsp;i.billed_amount <span style="color:rgb(var(--diagram-purple));font-weight:600">AS</span> net_amount<br/>
                <span style="color:rgb(var(--blue));font-weight:600">FROM</span> stg_orders o<br/>
                <span style="color:rgb(var(--blue));font-weight:600">LEFT JOIN</span> invoice_totals i<br/>
                &nbsp;&nbsp;<span style="color:rgb(var(--blue));font-weight:600">ON</span> o.order_no = i.order_no;
              </div>
            </div>
            <div style="display:flex;gap:6px;padding-top:8px;border-top:1px solid rgb(var(--subtle-stroke))">
              <div style="flex:1;display:inline-flex;align-items:center;justify-content:center;height:24px;background:#3E63DD;border-radius:6px;cursor:pointer"><span style="font-size:10px;color:#fff;font-weight:600">Open pipeline</span></div>
              <div style="display:inline-flex;align-items:center;justify-content:center;height:24px;padding:0 12px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;cursor:pointer"><span style="font-size:10px;color:rgb(var(--secondary-text));font-weight:600">Edit</span></div>
            </div>
          </div>
        </div>

        <!-- Canvas bottom controls -->
        <div style="position:absolute;bottom:10px;left:10px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;padding:4px 8px;display:flex;align-items:center;gap:8px;box-shadow:none">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
          <span style="font-size:9.5px;color:rgb(var(--ink));font-weight:600;min-width:24px;text-align:center">100%</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
          <div style="width:1px;height:10px;background:rgb(var(--card-line))"></div>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--secondary-text))" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </div>

        <!-- Test-count legend: decodes the green/amber/red chips on every node -->
        <div style="position:absolute;bottom:10px;left:148px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;padding:4px 9px;display:flex;align-items:center;gap:8px;box-shadow:none">
          <span style="font-size:8px;color:rgb(var(--tertiary-text));font-weight:700;letter-spacing:0.06em">TESTS</span>
          <span style="display:inline-flex;align-items:center;gap:3px"><span style="width:7px;height:7px;border-radius:2px;background:rgb(var(--positive-subtle));border:1px solid rgb(var(--positive-border))"></span><span style="font-size:8.5px;color:rgb(var(--secondary-text))">passed</span></span>
          <span style="display:inline-flex;align-items:center;gap:3px"><span style="width:7px;height:7px;border-radius:2px;background:rgb(var(--diagram-gold-bg));border:1px solid rgb(var(--diagram-gold-line))"></span><span style="font-size:8.5px;color:rgb(var(--secondary-text))">warning</span></span>
          <span style="display:inline-flex;align-items:center;gap:3px"><span style="width:7px;height:7px;border-radius:2px;background:rgb(var(--diagram-pink-bg));border:1px solid rgb(var(--diagram-pink))"></span><span style="font-size:8.5px;color:rgb(var(--secondary-text))">failed</span></span>
        </div>

        <!-- Security indicator -->
        <div style="position:absolute;bottom:10px;right:262px;background:rgb(var(--screen-surface));border:1px solid rgb(var(--card-line));border-radius:6px;padding:4px 8px;display:flex;align-items:center;gap:5px;box-shadow:none">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--positive))" stroke-width="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
          <span style="font-size:9.5px;color:rgb(var(--secondary-text))">Row-level security enforced · 4,211 events audited</span>
        </div>
      </div>
    </div>
  </div>
</div>`;


type Screen = {
  module: string;
  /** What the module adds to the organisation's context: its tentacle label. */
  adds: string;
  /** One legible line under the stage: the claim the small screen stands for. */
  caption: string;
  html?: string;
};

/* Order is the platform's: Foundation, then Intelligence, then Governance. */
const SCREENS: Screen[] = [
  { module: "Pipelines", adds: "Connected sources", caption: "Three sources join into one governed table. Nothing rejected.", html: PIPELINES_SCREEN_HTML },
  { module: "Master Data", adds: "Resolved entities", caption: "Three spellings, one record. Every field keeps its source.", html: MASTER_DATA_SCREEN_HTML },
  { module: "Warehouse", adds: "Shared definitions", caption: "A metric defined once. BI, Ask and ML all read the same one.", html: MODELS_SCREEN_HTML },
  { module: "ML", adds: "Forecasts", caption: "Models trained on governed data, with every run on record.", html: ML_SCREEN_HTML },
  { module: "Ask Akashic", adds: "Cited answers", caption: "Plain questions, answered from governed metrics, every figure cited.", html: ASK_SCREEN_CHANNEL_HTML },
  { module: "BI", adds: "Dashboards and alerts", caption: "Dashboards on governed metrics. Ask for a tile and it lands." },
  { module: "Governance", adds: "Lineage and access", caption: "Every column traced upstream and down. Access set by role.", html: GOVERNANCE_SCREEN_HTML },
];

const N = SCREENS.length;
const SCREEN_DURATION_MS = 8500;
const NATIVE_W = 920;
const NATIVE_H = 600;
/* The front screen's scale: small enough that the product text stops reading. */
const FRONT_SCALE = 0.56;

/* Where a screen sits for its distance from the front (computed geometry,
   Rule 8). `w` is the stage width; the centre scale shrinks with it. */
function placement(rp: number, w: number): CSSProperties {
  const sc = Math.min(FRONT_SCALE, (w - 24) / NATIVE_W);
  const wide = w >= 768;
  const step = rp === 0 ? 0 : rp <= N / 2 ? rp : rp - N; // -3..3
  const d = Math.abs(step);
  const side = Math.sign(step);
  if (d === 0) return { transform: `translate(-50%, 0) scale(${sc})`, opacity: 1, zIndex: 30 };
  if (!wide || d > 2) return { transform: `translate(-50%, ${sc * 60}px) scale(${sc * 0.7})`, opacity: 0, zIndex: 0, pointerEvents: "none" };
  const x = side * w * (d === 1 ? 0.27 : 0.44);
  const s = sc * (d === 1 ? 0.8 : 0.64);
  return {
    transform: `translate(calc(-50% + ${x}px), ${d === 1 ? 26 : 50}px) rotate(${side * d * 1.5}deg) scale(${s})`,
    opacity: d === 1 ? 0.62 : 0.26,
    zIndex: 30 - d * 10,
    filter: "saturate(0.55)",
  };
}

export default function AkashicModuleScreensMockup() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  // Off screen, nothing cycles (Rule 6a).
  const onScreen = useOnScreen(rootRef);
  const [active, setActive] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [width, setWidth] = useState(1152);

  const select = (i: number) => {
    setActive(i);
    setResetKey((k) => k + 1);
  };

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    setWidth(el.offsetWidth);
    const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced || !onScreen) return;
    const timer = setTimeout(() => setActive((a) => (a + 1) % N), SCREEN_DURATION_MS);
    return () => clearTimeout(timer);
  }, [active, resetKey, reduced, onScreen]);

  // The screens' own SMIL loops rest under reduced motion.
  useEffect(() => {
    stageRef.current?.querySelectorAll("svg").forEach((svg) => (reduced ? svg.pauseAnimations() : svg.unpauseAnimations()));
  }, [reduced, active]);

  const sc = Math.min(FRONT_SCALE, (width - 24) / NATIVE_W);
  const s = SCREENS[active];

  return (
    <div ref={rootRef} className="relative z-10 mx-auto w-full max-w-[1152px]">
      {/* The stage. Decorative: the caption and the index carry the content. */}
      <div
        ref={stageRef}
        aria-hidden
        className="relative w-full [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
        style={{ height: Math.round(NATIVE_H * sc * 0.86) + 40 }}
      >
        {SCREENS.map((screen, i) => {
          const rp = (i - active + N) % N;
          const front = rp === 0;
          return (
            <div
              key={screen.module}
              onClick={() => !front && select(i)}
              className={`absolute left-1/2 top-0 overflow-hidden rounded-[14px] border border-card-line bg-[rgb(var(--screen-raised))]  transition-[transform,opacity,filter] duration-500 ease-settle [mask-image:linear-gradient(to_bottom,black_58%,transparent_96%)] motion-reduce:transition-none ${
                front ? "" : "cursor-pointer"
              }`}
              style={{ width: NATIVE_W, height: NATIVE_H, transformOrigin: "center top", ...placement(rp, width) }}
            >
              <div className="pointer-events-none h-full w-full select-none">
                {screen.html ? <div className="h-full w-full" dangerouslySetInnerHTML={{ __html: screen.html }} /> : <AkashicBIScreenMockup />}
              </div>
            </div>
          );
        })}
      </div>

      <p className="relative z-40 mx-auto -mt-2 min-h-[3rem] max-w-[56rem] px-4 text-center text-[13.5px] leading-relaxed text-secondary-text md:text-[14.5px]">
        <span key={active} className="inline-block animate-[ps-rise_420ms_cubic-bezier(0.2,0.8,0.2,1)_both]">
          <span className="text-primary-text">{s.module}.</span> {s.caption}
        </span>{" "}
        <Link href="#talk-to-our-team" className="whitespace-nowrap font-medium text-blue underline-offset-4 hover:underline">
          See it with your own data
        </Link>
      </p>

      <ContextTentacles
        nodes={SCREENS.map(({ module, adds }) => ({ module, adds }))}
        active={active}
        resetKey={resetKey}
        durationMs={reduced ? 0 : SCREEN_DURATION_MS}
        onSelect={select}
      />
    </div>
  );
}
