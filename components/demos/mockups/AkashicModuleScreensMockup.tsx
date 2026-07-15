"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Seven fake module screens for the /akashic product page: the homepage
 * hero's three screens (Pipelines, Ask, Warehouse — shared via
 * HeroProductScreensMockup, along with the app chrome helpers), three
 * built here in the same idiom (Master Data, ML, Governance), and the
 * interactive BI screen rendered from AkashicHeroBIWireframe.
 * Same carousel mechanics as HeroProductsMockup: `.hs-card` fan layout
 * with a `far` off-stage position for the cards not currently visible,
 * auto-cycling every 6000ms. All figures are demo data consistent with
 * the homepage screens (Sales Performance world: 82,401 rows, 104/97/88/
 * 71/63% attainment, ₹3.8 Cr shortfall) and the [04] walkthrough
 * (12,400 units, MAPE 6.2%).
 */

import { useState, useEffect } from "react";
import AkashicHeroBIWireframe from "@/components/demos/mockups/AkashicHeroBIWireframe";
import {
  PIPELINES_SCREEN_HTML,
  ASK_SCREEN_HTML,
  MODELS_SCREEN_HTML,
  WINDOW_BAR,
  LIVE_CHIP,
  appTopBar,
  moduleRail,
  sidebarSearch,
} from "@/components/demos/mockups/HeroProductScreensMockup";

/* ---------------------------------------------------------------- */
/* Master Data — three source records merge into one golden record   */
/* ---------------------------------------------------------------- */
const MASTER_DATA_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB">
  ${WINDOW_BAR}
  ${appTopBar("Master Data", "Customers")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("master")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:12px;flex-shrink:0;background:#fff">
        <div style="height:27px;padding:0 10px;border:1px solid #E9EAEE;border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;background:#fff"><span style="font-size:11.5px;color:#1A1C1D;font-weight:500">Actions</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="width:1px;height:18px;background:#E9EAEE"></div>
        <div style="display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg><span style="font-size:11.5px;color:#5C5E63;font-weight:500">Match rules v12</span></div>
        <div style="height:24px;padding:0 9px;background:#EEF1FC;border:1px solid #D5DDF8;border-radius:20px;display:flex;align-items:center;gap:6px"><span style="font-size:10.5px;color:#3E63DD;font-weight:600">Auto-merge ≥ 0.95</span></div>
        <div style="height:24px;padding:0 9px;border:1px solid #E9EAEE;border-radius:20px;display:flex;align-items:center;gap:5px;background:#fff"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="4"/><path d="M2 21v-1a7 7 0 0 1 14 0v1"/><path d="M19 8v6M22 11h-6"/></svg><span style="font-size:10.5px;color:#5C5E63;font-weight:500">Review queue · 3</span></div>
        <div style="flex:1"></div>
        <span style="font-size:10.5px;color:#8E8F91">12,447 golden records · 0 open conflicts</span>
        ${LIVE_CHIP}
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid #E9EAEE;display:flex;flex-direction:column;flex-shrink:0;background:#fff">
          ${sidebarSearch("Search entities")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">ENTITIES</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">4</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:#EEF1FC"><div style="width:19px;height:19px;border-radius:5px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:600">Customers</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">12,447</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#F3F3F4;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 9h1M9 13h1M14 9h1M14 13h1"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Vendors</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">3,208</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#F3F3F4;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Products</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">18,662</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#F3F3F4;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Locations</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">214</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">MATCH KEYS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">tax_id</span><div style="flex:1"></div><span style="font-size:9px;color:#1B8A5F;font-weight:600">exact</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">address</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">fuzzy ≥ 0.9</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">phone</span><div style="flex:1"></div><span style="font-size:9px;color:#1B8A5F;font-weight:600">exact</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">SURVIVORSHIP</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="font-size:11px;color:#1A1C1D">Terms</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">prefer ERP</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="font-size:11px;color:#1A1C1D">Address</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">most recent</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#EEF1FC;display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;color:#1A1C1D;font-weight:600">4 stewards</div><div style="font-size:9px;color:#8E8F91">3 merges pending review</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:#fff;background-image:radial-gradient(circle,#E9E9EB 1px,transparent 1px);background-size:22px 22px">
          <svg width="674" height="482" viewBox="0 0 674 482" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M180,90 C 230,90 240,180 288,196" stroke="#D0D3DB" fill="none" stroke-width="1.2"/>
            <path d="M180,230 L 288,230" stroke="#D0D3DB" fill="none" stroke-width="1.2"/>
            <path d="M180,370 C 230,370 240,280 288,262" stroke="#3E63DD" fill="none" stroke-width="1.6"/>
            <circle cx="288" cy="196" r="3" fill="#B7BAC4"/><circle cx="288" cy="230" r="3" fill="#B7BAC4"/><circle cx="288" cy="262" r="3.5" fill="#3E63DD"/>
          </svg>
          <div style="position:absolute;left:20px;top:56px;width:160px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 7px"><div style="width:24px;height:24px;border-radius:7px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:11.5px;font-weight:600;color:#1A1C1D">Meridian Retail</div><div style="font-size:9px;color:#8E8F91">Salesforce · #4471</div></div></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px"><span style="display:block;font-size:9px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">tax_id 94-2404110 · Harbor Blvd</span></div>
          </div>
          <div style="position:absolute;left:20px;top:196px;width:160px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 7px"><div style="width:24px;height:24px;border-radius:7px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:#fff;font-weight:700">N</span></div><div style="min-width:0;flex:1"><div style="font-size:11.5px;font-weight:600;color:#1A1C1D">Meridian Retail Pvt</div><div style="font-size:9px;color:#8E8F91">NetSuite · #4471-B</div></div></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px"><span style="display:block;font-size:9px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">same tax_id · Ste 2 · net-45</span></div>
          </div>
          <div style="position:absolute;left:20px;top:336px;width:160px;background:#fff;border:1px solid #E9EAEE;border-radius:10px;box-shadow:0 1px 2px rgba(18,20,26,0.05);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 7px"><div style="width:24px;height:24px;border-radius:7px;background:#E5547B;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:11.5px;font-weight:600;color:#1A1C1D">MERIDIAN RETAIL</div><div style="font-size:9px;color:#8E8F91">Invoice PDF · bill-to</div></div></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px"><span style="display:block;font-size:9px;color:#B07289;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">no tax_id · fuzzy match 0.97</span></div>
          </div>
          <div style="position:absolute;left:288px;top:148px;width:186px;background:#fff;border:1.5px solid #3E63DD;border-radius:11px;box-shadow:0 1px 3px rgba(62,99,221,0.12);overflow:hidden">
            <div style="height:34px;background:linear-gradient(135deg,#3E63DD,#5870E8);display:flex;align-items:center;gap:8px;padding:0 12px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg><span style="font-size:12px;font-weight:700;color:#fff">Golden record</span><div style="flex:1"></div><span style="font-size:9px;color:#C7D3F7;font-weight:600">CU-9042</span></div>
            <div style="padding:9px 12px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Name</span><span style="font-size:10px;color:#1A1C1D;font-weight:600">Meridian Retail</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">tax_id</span><span style="font-size:10px;color:#1A1C1D;font-family:var(--font-mono)">94-2404110</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Address</span><span style="font-size:10px;color:#1A1C1D">500 Harbor Blvd, Ste 2</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Terms</span><span style="font-size:10px;color:#1A1C1D">net-45 <span style="color:#8E8F91">· from ERP</span></span></div>
            </div>
            <div style="border-top:1px solid #E3E8F8;background:#FAFAFB;padding:6px 12px;display:flex;align-items:center;gap:6px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:9.5px;color:#1B8A5F;font-weight:600">Confidence 0.98 · merged from 3 sources</span></div>
          </div>
          <div style="position:absolute;left:200px;top:106px;font-size:9.5px;color:#8E8F91;font-family:var(--font-mono)">tax_id · exact match</div>
          <div style="position:absolute;left:206px;top:384px;font-size:9.5px;color:#3E63DD;font-family:var(--font-mono)">steward approved · 06:12</div>
          <div style="position:absolute;left:508px;top:176px;width:100px;background:#FAFAFB;border:1px solid #E9EAEE;border-radius:9px;padding:8px 10px">
            <div style="font-size:9px;color:#8E8F91;font-family:var(--font-mono)">#4471</div>
            <div style="font-size:9px;color:#B4BAC2">superseded</div>
          </div>
          <div style="position:absolute;left:508px;top:246px;width:100px;background:#FAFAFB;border:1px solid #E9EAEE;border-radius:9px;padding:8px 10px">
            <div style="font-size:9px;color:#8E8F91;font-family:var(--font-mono)">#4471-B</div>
            <div style="font-size:9px;color:#B4BAC2">superseded</div>
          </div>
          <div style="position:absolute;bottom:12px;right:14px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;padding:5px 11px;display:flex;align-items:center;gap:12px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#3E63DD"></span><span style="font-size:10px;color:#1A1C1D">1 golden record</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;border:1.5px solid #B4BAC2"></span><span style="font-size:10px;color:#1A1C1D">2 superseded · lineage kept</span></span>
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

/* ---------------------------------------------------------------- */
/* ML — notebook + experiment tracking, trained where data lives     */
/* ---------------------------------------------------------------- */
const ML_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB">
  ${WINDOW_BAR}
  ${appTopBar("ML", "forecast_training.ipynb")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("ml")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <div style="height:40px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:12px;flex-shrink:0;background:#fff">
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer;height:27px;padding:0 11px;background:#1A1C1D;border-radius:7px"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg><span style="font-size:11.5px;color:#fff;font-weight:600">Run all</span></div>
        <div style="width:26px;height:27px;border:1px solid #E9EAEE;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer;background:#fff"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></div>
        <div style="width:1px;height:18px;background:#E9EAEE"></div>
        <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B"></span><span style="font-size:11px;color:#5C5E63;font-family:var(--font-mono)">Python 3.11 · idle</span></div>
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;color:#5C5E63;font-weight:500">Retrain weekly</span></div>
        <div style="flex:1"></div>
        <span style="font-size:10.5px;color:#8E8F91">Autosaved 2m ago</span>
        <div style="height:24px;padding:0 9px;background:#EAF7F0;border:1px solid #CBE8D9;border-radius:20px;display:flex;align-items:center;gap:5px"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:10.5px;color:#1B8A5F;font-weight:600">v3 · Production</span></div>
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:200px;border-right:1px solid #E9EAEE;display:flex;flex-direction:column;flex-shrink:0;background:#fff">
          ${sidebarSearch("Search experiments")}
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">EXPERIMENTS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:#EEF1FC"><div style="width:19px;height:19px;border-radius:5px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></svg></div><span style="font-size:11px;color:#1A1C1D;font-weight:600;font-family:var(--font-mono)">demand_forecast</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">24</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#F3F3F4;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg></div><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">churn_risk</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">11</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#F3F3F4;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="M12 22V12M3 7l9 5 9-5"/></svg></div><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">stockout_alert</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">6</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">MODEL REGISTRY</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">3</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">demand_forecast</span><div style="flex:1"></div><span style="font-size:9px;color:#1B8A5F;font-weight:600">v3 · prod</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:#E0A93B;flex-shrink:0"></span><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">churn_risk</span><div style="flex:1"></div><span style="font-size:9px;color:#B08419;font-weight:600">v2 · staging</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:#B4BAC2;flex-shrink:0"></span><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">stockout_alert</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">v1 · dev</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">COMPUTE</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:4px 7px"><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;animation:softpulse 2s infinite;flex-shrink:0"></span><span style="font-size:11px;color:#1A1C1D;font-family:var(--font-mono)">ml-gpu-01</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">4× T4</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#EEF1FC;display:flex;align-items:center;justify-content:center"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><div style="min-width:0"><div style="font-size:10.5px;color:#1A1C1D;font-weight:600">Feature store</div><div style="font-size:9px;color:#8E8F91">42 features · governed</div></div></div>
        </div>
        <div style="flex:1;display:flex;flex-direction:column;overflow:hidden;background:#fff;min-width:0;padding:12px 14px;gap:7px">
          <div style="display:flex;border:1px solid #E9EAEE;border-radius:8px;background:#fff;overflow:hidden;flex-shrink:0">
            <div style="width:40px;background:#FAFAFB;border-right:1px solid #EEEFF1;padding-top:9px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:#3E63DD;font-family:var(--font-mono);font-weight:600">[1]</span></div>
            <pre style="margin:0;padding:8px 12px;font-size:10.5px;line-height:1.7;font-family:var(--font-mono);color:#1A1C1D;flex:1;overflow:hidden"><span style="color:#7C5CFC">import</span> akashic.ml <span style="color:#7C5CFC">as</span> ml

fs = ml.<span style="color:#3E63DD">features</span>(<span style="color:#1B8A5F">"sales_performance"</span>)
train, test = fs.<span style="color:#3E63DD">split</span>(holdout_weeks=<span style="color:#C13059">12</span>)</pre>
          </div>
          <div style="display:flex;border:1px solid #C8D2F5;border-radius:8px;background:#fff;overflow:hidden;flex-shrink:0">
            <div style="width:40px;background:#EEF1FC;border-right:1px solid #D5DDF8;padding-top:9px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:#3E63DD;font-family:var(--font-mono);font-weight:600">[2]</span></div>
            <pre style="margin:0;padding:8px 12px;font-size:10.5px;line-height:1.7;font-family:var(--font-mono);color:#1A1C1D;flex:1;overflow:hidden">run = ml.<span style="color:#3E63DD">train</span>(<span style="color:#1B8A5F">"demand_forecast"</span>, algo=<span style="color:#1B8A5F">"xgboost"</span>,
    learning_rate=<span style="color:#C13059">0.08</span>, max_depth=<span style="color:#C13059">6</span>, n_estimators=<span style="color:#C13059">400</span>)
run.<span style="color:#3E63DD">evaluate</span>(test)</pre>
          </div>
          <div style="display:flex;flex-shrink:0">
            <div style="width:40px;padding-top:8px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:#C13059;font-family:var(--font-mono);font-weight:600">[2]</span></div>
            <div style="flex:1;display:flex;align-items:center;gap:10px;padding:5px 0 3px;min-width:0">
              <div style="display:inline-flex;align-items:center;gap:5px;height:24px;padding:0 9px;background:#EAF7F0;border:1px solid #CBE8D9;border-radius:6px"><span style="font-size:10px;color:#1B8A5F;font-weight:700;font-family:var(--font-mono)">MAPE 6.2%</span><span style="font-size:8.5px;color:#1B8A5F;background:#fff;border-radius:4px;padding:0 4px;font-weight:600">best</span></div>
              <span style="font-size:10px;color:#5C5E63;font-family:var(--font-mono)">RMSE 412</span>
              <span style="font-size:10px;color:#5C5E63;font-family:var(--font-mono)">R² 0.94</span>
              <div style="flex:1"></div>
              <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
                <svg width="120" height="30" viewBox="0 0 120 30"><path d="M2 6 L20 12 L38 17 L56 21 L74 23 L92 25 L118 26" stroke="#3E63DD" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M2 4 L20 9 L38 13 L56 18 L74 21 L92 24 L118 25.5" stroke="#E0A93B" stroke-width="1.4" fill="none" stroke-dasharray="3 3" stroke-linecap="round"/></svg>
                <div style="display:flex;flex-direction:column;gap:2px"><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:9px;height:2px;background:#3E63DD"></span><span style="font-size:8.5px;color:#8E8F91">train</span></span><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:9px;height:2px;background:#E0A93B"></span><span style="font-size:8.5px;color:#8E8F91">val</span></span></div>
              </div>
            </div>
          </div>
          <div style="display:flex;border:1px solid #E9EAEE;border-radius:8px;background:#fff;overflow:hidden;flex-shrink:0">
            <div style="width:40px;background:#FAFAFB;border-right:1px solid #EEEFF1;padding-top:9px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:#3E63DD;font-family:var(--font-mono);font-weight:600">[3]</span></div>
            <pre style="margin:0;padding:8px 12px;font-size:10.5px;line-height:1.7;font-family:var(--font-mono);color:#1A1C1D;flex:1;overflow:hidden">run.<span style="color:#3E63DD">forecast</span>(horizon=<span style="color:#C13059">12</span>).<span style="color:#3E63DD">plot</span>()</pre>
          </div>
          <div style="display:flex;flex:1;min-height:0">
            <div style="width:40px;padding-top:8px;text-align:center;flex-shrink:0"><span style="font-size:9px;color:#C13059;font-family:var(--font-mono);font-weight:600">[3]</span></div>
            <div style="flex:1;border:1px solid #EEEFF1;border-radius:8px;background:#FDFDFD;padding:10px 13px;display:flex;flex-direction:column;min-width:0">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:5px">
                <span style="font-size:10.5px;font-weight:600;color:#1A1C1D">Demand forecast · next 12 weeks</span>
                <div style="display:flex;align-items:center;gap:10px"><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:#1A1C1D"></span><span style="font-size:9px;color:#5C5E63">actuals</span></span><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:10px;height:2px;background:#3E63DD"></span><span style="font-size:9px;color:#5C5E63">forecast · p10–p90</span></span></div>
              </div>
              <div style="flex:1;position:relative;min-height:0">
                <svg viewBox="0 0 300 100" preserveAspectRatio="none" style="position:absolute;inset:0;width:100%;height:100%">
                  <path d="M195 26 L300 12 L300 60 L195 49 Z" fill="#3E63DD" fill-opacity="0.09"/>
                  <path d="M0 74 L28 63 L52 68 L80 48 L108 55 L136 42 L164 48 L195 34" stroke="#1A1C1D" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M195 34 L300 21" stroke="#3E63DD" stroke-width="2" fill="none" stroke-linecap="round" stroke-dasharray="6 4"/>
                  <line x1="195" y1="4" x2="195" y2="96" stroke="#3E63DD" stroke-width="1" stroke-dasharray="3 4" opacity="0.55"/>
                </svg>
                <span style="position:absolute;left:66.5%;top:0;font-size:8.5px;color:#3E63DD;font-weight:600">today</span>
                <span style="position:absolute;right:0;top:30%;font-size:10px;color:#1A1C1D;font-weight:700;background:#fff;border:1px solid #D5DDF8;border-radius:6px;padding:2px 7px">≈12,400 units next qtr</span>
              </div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:4px">
                <span style="font-size:9px;color:#8E8F91">Jul</span><span style="font-size:9px;color:#8E8F91">Aug</span><span style="font-size:9px;color:#8E8F91">Sep</span><span style="font-size:9px;color:#8E8F91">Oct</span><span style="font-size:9px;color:#8E8F91">Nov</span><span style="font-size:9px;color:#8E8F91">Dec</span>
              </div>
            </div>
          </div>
        </div>
        <div style="width:224px;border-left:1px solid #E9EAEE;background:#fff;display:flex;flex-direction:column;flex-shrink:0;overflow:hidden">
          <div style="padding:11px 13px 8px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><span style="font-size:11.5px;font-weight:700;color:#1A1C1D">Runs</span><span style="font-size:9.5px;color:#8E8F91;font-family:var(--font-mono)">demand_forecast</span><div style="flex:1"></div><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"/></svg></div>
          <div style="padding:8px 10px;display:flex;flex-direction:column;gap:3px">
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px;background:#EEF1FC;border:1px solid #D5DDF8"><span style="font-size:9.5px;color:#3E63DD;font-family:var(--font-mono);font-weight:700">#24</span><span style="font-size:10px;color:#1A1C1D;font-weight:600">MAPE 6.2%</span><div style="flex:1"></div><span style="font-size:8.5px;color:#1B8A5F;background:#EAF7F0;border:1px solid #CBE8D9;border-radius:4px;padding:1px 5px;font-weight:600">prod</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px"><span style="font-size:9.5px;color:#8E8F91;font-family:var(--font-mono)">#23</span><span style="font-size:10px;color:#5C5E63">MAPE 6.9%</span><div style="flex:1"></div><span style="font-size:8.5px;color:#8E8F91">2d ago</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px"><span style="font-size:9.5px;color:#8E8F91;font-family:var(--font-mono)">#22</span><span style="font-size:10px;color:#5C5E63">MAPE 7.4%</span><div style="flex:1"></div><span style="font-size:8.5px;color:#8E8F91">4d ago</span></div>
            <div style="display:flex;align-items:center;gap:8px;padding:6px 8px;border-radius:7px"><span style="font-size:9.5px;color:#8E8F91;font-family:var(--font-mono)">#19</span><span style="font-size:10px;color:#5C5E63">MAPE 9.8%</span><div style="flex:1"></div><span style="font-size:8.5px;color:#8E8F91">1w ago</span></div>
          </div>
          <div style="padding:2px 13px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">PARAMETERS</span></div>
          <div style="padding:0 13px;display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63;font-family:var(--font-mono)">learning_rate</span><span style="font-size:10px;color:#1A1C1D;font-family:var(--font-mono)">0.08</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63;font-family:var(--font-mono)">max_depth</span><span style="font-size:10px;color:#1A1C1D;font-family:var(--font-mono)">6</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63;font-family:var(--font-mono)">n_estimators</span><span style="font-size:10px;color:#1A1C1D;font-family:var(--font-mono)">400</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63;font-family:var(--font-mono)">holdout</span><span style="font-size:10px;color:#1A1C1D;font-family:var(--font-mono)">12 wk</span></div>
          </div>
          <div style="padding:10px 13px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">MONITORS</span></div>
          <div style="padding:0 13px;display:flex;flex-direction:column;gap:4px">
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#1A1C1D">Drift · PSI 0.04</span><span style="font-size:9px;color:#1B8A5F;font-weight:600">ok</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#1A1C1D">Feature freshness</span><span style="font-size:9px;color:#1B8A5F;font-weight:600">ok</span></div>
            <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#1A1C1D">Bias · region</span><span style="font-size:9px;color:#1B8A5F;font-weight:600">ok</span></div>
          </div>
          <div style="flex:1"></div>
          <div style="margin:10px;border:1px solid #CBE8D9;background:#F4FBF7;border-radius:9px;padding:9px 11px">
            <div style="display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;animation:softpulse 2s infinite"></span><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">v3 serving</span></div>
            <div style="font-size:9px;color:#5C5E63;margin-top:3px;font-family:var(--font-mono)">1.2M preds/day · p95 41ms</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;

/* ---------------------------------------------------------------- */
/* Governance — catalog entity page: lineage, metadata, quality      */
/* ---------------------------------------------------------------- */
const GOVERNANCE_SCREEN_HTML = `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#FAFAFB">
  ${WINDOW_BAR}
  ${appTopBar("Governance", "fact_sales")}
  <div style="flex:1;display:flex;overflow:hidden">
    ${moduleRail("governance")}
    <div style="flex:1;display:flex;flex-direction:column;min-width:0;overflow:hidden">
      <!-- Breadcrumbs & Asset Header (OpenMetadata style) -->
      <div style="border-bottom:1px solid #E9EAEE;padding:10px 14px;background:#fff;flex-shrink:0;display:flex;flex-direction:column;gap:5px">
        <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:#8E8F91;font-family:var(--font-mono)">
          <span>Database Service</span>
          <span style="color:#C4C5C9">/</span>
          <span>snowflake_prod</span>
          <span style="color:#C4C5C9">/</span>
          <span>gold</span>
          <span style="color:#C4C5C9">/</span>
          <span style="color:#1A1C1D;font-weight:600">fact_sales</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px">
          <div style="display:flex;align-items:center;gap:8px">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
              <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
            </svg>
            <span style="font-size:14px;color:#1A1C1D;font-weight:700;font-family:var(--font-mono)">fact_sales</span>
            <div style="width:1px;height:12px;background:#E9EAEE;margin:0 2px"></div>
            <span style="display:inline-flex;align-items:center;gap:3px;font-size:9.5px;color:#5C5E63;background:#F3F3F4;padding:2px 6px;border-radius:4px">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/></svg>
              Fintech
            </span>
            <span style="display:inline-flex;align-items:center;gap:4px;font-size:9.5px;color:#5C5E63">
              <div style="width:14px;height:14px;border-radius:50%;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;color:#fff;font-size:7px;font-weight:600">PM</div>
              Priya Mehta
            </span>
            <span style="font-size:9.5px;color:#8E8F91">Tier: <b style="color:#A97B12;font-weight:600">Tier-1</b></span>
            <span style="font-size:9.5px;color:#8E8F91">Type: <b style="color:#1A1C1D;font-weight:600">Regular</b></span>
            <span style="font-size:9.5px;color:#8E8F91">Usage: <b style="color:#1A1C1D;font-weight:600">94th pctile</b></span>
          </div>
          <div style="display:flex;align-items:center;gap:6px;border:1px solid #E9EAEE;border-radius:6px;padding:3px 6px;background:#FAFAFB">
            <span style="display:inline-flex;align-items:center;gap:2px;font-size:9px;color:#5C5E63"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>110</span>
            <span style="width:1px;height:10px;background:#E9EAEE"></span>
            <span style="display:inline-flex;align-items:center;gap:2px;font-size:9px;color:#5C5E63"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm12-5v7a2 2 0 0 1-2 2h-3"/></svg>0</span>
            <span style="width:1px;height:10px;background:#E9EAEE"></span>
            <span style="display:inline-flex;align-items:center;gap:2px;font-size:9px;color:#5C5E63"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>27</span>
            <span style="width:1px;height:10px;background:#E9EAEE"></span>
            <span style="display:inline-flex;align-items:center;gap:2px;font-size:9px;color:#5C5E63"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>1.0</span>
            <span style="width:1px;height:10px;background:#E9EAEE"></span>
            <span style="display:inline-flex;align-items:center;gap:2px;font-size:9px;color:#5C5E63"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>20</span>
          </div>
        </div>
      </div>

      <!-- Tab rows (OpenMetadata style) -->
      <div style="height:32px;border-bottom:1px solid #E9EAEE;display:flex;align-items:center;padding:0 14px;gap:16px;flex-shrink:0;background:#fff">
        <span style="font-size:10.5px;color:#5C5E63;padding:8px 0;cursor:pointer">Schema <span style="font-size:8.5px;color:#8E8F91">12</span></span>
        <span style="font-size:10.5px;color:#5C5E63;padding:8px 0;cursor:pointer">Activity Feed & Tasks <span style="font-size:8.5px;color:#8E8F91;background:#F3F3F4;padding:1px 4px;border-radius:4px">23</span></span>
        <span style="font-size:10.5px;color:#5C5E63;padding:8px 0;cursor:pointer">Sample Data</span>
        <span style="font-size:10.5px;color:#5C5E63;padding:8px 0;cursor:pointer">Queries <span style="font-size:8.5px;color:#8E8F91">10</span></span>
        <span style="font-size:10.5px;color:#5C5E63;padding:8px 0;cursor:pointer">Profiler & Data Quality</span>
        <span style="font-size:10.5px;color:#3E63DD;font-weight:600;padding:8px 0 6px;border-bottom:2px solid #3E63DD;cursor:default">Lineage</span>
        <span style="font-size:10.5px;color:#5C5E63;padding:8px 0;cursor:pointer">Custom Properties</span>
      </div>

      <!-- Lineage Canvas Area -->
      <div style="flex:1;position:relative;overflow:hidden;background:#fff;background-image:radial-gradient(circle,#E9E9EB 1.1px,transparent 1.1px);background-size:16px 16px;min-width:0">
        <!-- Search Lineage -->
        <div style="position:absolute;top:10px;left:10px;display:flex;align-items:center;gap:6px;z-index:5">
          <div style="background:#fff;border:1px solid #E9EAEE;border-radius:6px;padding:3.5px 8px;display:flex;align-items:center;gap:6px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" placeholder="Search Lineage" style="border:none;outline:none;font-size:9.5px;color:#1A1C1D;width:90px;padding:0;background:transparent" disabled />
          </div>
          <span style="font-size:9.5px;color:#3E63DD;font-weight:600;cursor:pointer">Advanced ></span>
        </div>

        <!-- Announcement Banner -->
        <div style="position:absolute;top:10px;left:180px;right:262px;background:#EEF1FC;border:1px solid #C8D2F5;border-radius:6px;padding:4px 8px;display:flex;align-items:center;gap:6px;z-index:4">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01"/></svg>
          <span style="font-size:9px;color:#3E63DD;font-weight:600">Announcement:</span>
          <span style="font-size:9px;color:#5C5E63;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:320px">Schema Changes: Take a look at this data asset and refer to version logs.</span>
        </div>

        <!-- SVG Lineage Paths — solid fine lines, OpenMetadata style -->
        <svg width="620" height="380" viewBox="0 0 620 380" style="position:absolute;top:0;left:0;pointer-events:none;z-index:1">
          <defs>
            <marker id="gov-arr" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1.5 1 L6.5 4 L1.5 7" fill="none" stroke="#B7BAC4" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></marker>
            <marker id="gov-arr-active" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M1.5 1 L6.5 4 L1.5 7" fill="none" stroke="#3E63DD" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></marker>
          </defs>
          <!-- Upstream: table-level (sf.orders) + column-level (ns.invoices) -->
          <path d="M166,71 C196,71 194,80 222,80" stroke="#D0D3DB" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <path d="M166,217 C196,217 194,170 222,170" stroke="#3E63DD" fill="none" stroke-width="1.5" marker-end="url(#gov-arr-active)"/>
          <path d="M166,250 C196,250 194,186 222,186" stroke="#D0D3DB" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <path d="M166,266 C196,266 194,203 222,203" stroke="#D0D3DB" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <!-- Downstream: fan out from fact_sales -->
          <path d="M396,80 C422,80 420,83 442,83" stroke="#D0D3DB" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <path d="M396,80 C424,80 418,179 442,179" stroke="#3E63DD" fill="none" stroke-width="1.5" marker-end="url(#gov-arr-active)"/>
          <path d="M396,80 C424,80 418,275 442,275" stroke="#D0D3DB" fill="none" stroke-width="1" marker-end="url(#gov-arr)"/>
          <!-- Source ports -->
          <circle cx="166" cy="71" r="1.8" fill="#B7BAC4"/>
          <circle cx="166" cy="217" r="2.2" fill="#3E63DD"/>
          <circle cx="166" cy="250" r="1.8" fill="#B7BAC4"/>
          <circle cx="166" cy="266" r="1.8" fill="#B7BAC4"/>
          <circle cx="396" cy="80" r="2.2" fill="#3E63DD"/>
        </svg>

        <!-- Upstream Nodes -->
        <!-- Salesforce orders node -->
        <div style="position:absolute;left:12px;top:36px;width:154px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;box-shadow:0 1px 2px rgba(18,20,26,0.05);font-family:Inter,sans-serif">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">+</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">-</div>
          
          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:#8E8F91;font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:115px">sf_prod / orders</span>
              <span style="font-size:7px;color:#8E8F91;background:#F3F3F4;border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div>
              <div style="min-width:0">
                <div style="font-size:10px;font-weight:700;color:#1A1C1D;font-family:var(--font-mono);line-height:1">sf.orders</div>
                <div style="font-size:8px;color:#8E8F91;line-height:1;margin-top:2px">Raw customer orders</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:4px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:#5C5E63;font-weight:500;display:inline-flex;align-items:center;gap:2px">7 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
            <div style="display:flex;gap:2px">
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#1B8A5F;background:#EAF7F0;padding:0 3px;border-radius:3px">07</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#A97B12;background:#FFF9E6;padding:0 3px;border-radius:3px">02</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#C13059;background:#FDF0F4;padding:0 3px;border-radius:3px">00</span>
            </div>
          </div>
        </div>

        <!-- NetSuite invoices node (expanded) -->
        <div style="position:absolute;left:12px;top:124px;width:154px;background:#fff;border:1.5px solid #3E63DD;border-radius:8px;box-shadow:0 2px 4px rgba(62,99,221,0.12);font-family:Inter,sans-serif;z-index:3">
          <div style="position:absolute;left:-7px;top:20px;width:14px;height:14px;border:1px solid #3E63DD;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#3E63DD;cursor:pointer;z-index:2">+</div>
          <div style="position:absolute;right:-7px;top:20px;width:14px;height:14px;border:1px solid #3E63DD;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#3E63DD;cursor:pointer;z-index:2">-</div>

          <div style="padding:6px 8px 4px;background:#F5F7FE;border-top-left-radius:6.5px;border-top-right-radius:6.5px;border-bottom:1px solid #E3E8F8">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:#3E63DD;font-weight:600;font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:115px">netsuite_erp / invoices</span>
              <span style="font-size:7px;color:#3E63DD;background:#EEF1FC;border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:8.5px;color:#fff;font-weight:700;font-family:Inter">N</span></div>
              <div style="min-width:0">
                <div style="font-size:10px;font-weight:700;color:#1A1C1D;font-family:var(--font-mono);line-height:1">ns.invoices</div>
                <div style="font-size:8px;color:#8E8F91;line-height:1;margin-top:2px">Billed invoices</div>
              </div>
            </div>
          </div>
          
          <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:4px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #EEEFF1">
            <span style="font-size:8.5px;color:#1A1C1D;font-weight:600;display:inline-flex;align-items:center;gap:2px">7 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m18 15-6-6-6 6"/></svg></span>
            <div style="display:flex;gap:2px">
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#1B8A5F;background:#EAF7F0;padding:0 3px;border-radius:3px">31</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#A97B12;background:#FFF9E6;padding:0 3px;border-radius:3px">01</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#C13059;background:#FDF0F4;padding:0 3px;border-radius:3px">01</span>
            </div>
          </div>

          <div style="padding:4px">
            <div style="background:#FAFAFB;border:1px solid #E9EAEE;border-radius:4px;padding:2px 5px;display:flex;align-items:center;gap:4px;margin-bottom:4px">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" placeholder="Search Columns" style="border:none;outline:none;font-size:8px;color:#1A1C1D;width:100%;padding:0;background:transparent" disabled />
            </div>
            <div style="display:flex;flex-direction:column;gap:1.5px">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;background:#F5F7FE;border-radius:3px"><span style="font-size:8.5px;color:#3E63DD;font-weight:600;font-family:var(--font-mono)">customer_id</span><span style="font-size:7px;color:#8E8F91">varchar</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#5C5E63;font-family:var(--font-mono)">invoice_id</span><span style="font-size:7px;color:#8E8F91">bigint</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#5C5E63;font-family:var(--font-mono)">amount</span><span style="font-size:7px;color:#8E8F91">numeric</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#5C5E63;font-family:var(--font-mono)">invoice_date</span><span style="font-size:7px;color:#8E8F91">date</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#5C5E63;font-family:var(--font-mono)">status</span><span style="font-size:7.5px;color:#1B8A5F;background:#EAF7F0;border-radius:2px;padding:0 2px;font-weight:600">FK</span></div>
            </div>
            <div style="text-align:center;padding:4px 0 2px;border-top:1px solid #EEEFF1;margin-top:4px"><span style="font-size:8px;color:#3E63DD;font-weight:600;cursor:pointer">Show more columns</span></div>
          </div>
        </div>

        <!-- Middle Node: fact_sales -->
        <div style="position:absolute;left:224px;top:60px;width:172px;background:#fff;border:1.5px solid #3E63DD;border-radius:8px;box-shadow:0 3px 6px rgba(62,99,221,0.15);font-family:Inter,sans-serif;z-index:3">
          <div style="position:absolute;left:-7px;top:20px;width:14px;height:14px;border:1px solid #3E63DD;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#3E63DD;cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:20px;width:14px;height:14px;border:1px solid #3E63DD;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#3E63DD;cursor:pointer;z-index:2">-</div>

          <div style="padding:6px 8px 4px;background:#F5F7FE;border-top-left-radius:6.5px;border-top-right-radius:6.5px;border-bottom:1px solid #E3E8F8">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:#3E63DD;font-weight:600;font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px">snowflake_prod / gold</span>
              <span style="font-size:7px;color:#3E63DD;background:#EEF1FC;border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:700">❄</span></div>
              <div style="min-width:0">
                <div style="font-size:10px;font-weight:700;color:#1A1C1D;font-family:var(--font-mono);line-height:1">fact_sales</div>
                <div style="font-size:8px;color:#8E8F91;line-height:1;margin-top:2px">Gold · sales fact table</div>
              </div>
            </div>
          </div>
          
          <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:4px 8px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #EEEFF1">
            <span style="font-size:8.5px;color:#1A1C1D;font-weight:600;display:inline-flex;align-items:center;gap:2px">15 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m18 15-6-6-6 6"/></svg></span>
            <div style="display:flex;gap:2px">
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#1B8A5F;background:#EAF7F0;padding:0 3px;border-radius:3px">40</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#A97B12;background:#FFF9E6;padding:0 3px;border-radius:3px">00</span>
              <span style="font-size:7.5px;font-family:var(--font-mono);font-weight:600;color:#C13059;background:#FDF0F4;padding:0 3px;border-radius:3px">03</span>
            </div>
          </div>

          <div style="padding:4px">
            <div style="background:#FAFAFB;border:1px solid #E9EAEE;border-radius:4px;padding:2px 5px;display:flex;align-items:center;gap:4px;margin-bottom:4px">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input type="text" placeholder="Search Columns" style="border:none;outline:none;font-size:8px;color:#1A1C1D;width:100%;padding:0;background:transparent" disabled />
            </div>
            <div style="display:flex;flex-direction:column;gap:1.5px">
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#5C5E63;font-family:var(--font-mono)">order_id</span><span style="font-size:7px;color:#8E8F91">bigint</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;background:#F5F7FE;border-radius:3px"><span style="font-size:8.5px;color:#3E63DD;font-weight:600;font-family:var(--font-mono)">customer_sk</span><span style="font-size:7.5px;color:#3E63DD;background:#EEF1FC;border-radius:2px;padding:0 2px;font-weight:600">FK</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px;background:#F5F7FE;border-radius:3px"><span style="font-size:8.5px;color:#3E63DD;font-weight:600;font-family:var(--font-mono)">net_amount</span><span style="font-size:7px;color:#8E8F91">numeric</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#5C5E63;font-family:var(--font-mono)">region_key</span><span style="font-size:7px;color:#8E8F91">int</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between;padding:2px 4px"><span style="font-size:8.5px;color:#C13059;font-family:var(--font-mono)">tax_id</span><span style="font-size:7.5px;color:#C13059;background:#FDF0F4;border-radius:2px;padding:0 3px;font-weight:600">PII · masked</span></div>
            </div>
            <div style="text-align:center;padding:4px 0 2px;border-top:1px solid #EEEFF1;margin-top:4px"><span style="font-size:8px;color:#3E63DD;font-weight:600;cursor:pointer">Show more columns</span></div>
          </div>
        </div>

        <!-- Downstream Nodes -->
        <!-- Tableau sales node -->
        <div style="position:absolute;left:444px;top:48px;width:140px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;box-shadow:0 1px 2px rgba(18,20,26,0.05);font-family:Inter,sans-serif">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">+</div>

          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:#8E8F91;font-family:var(--font-mono)">tableau_ops</span>
              <span style="font-size:7px;color:#8E8F91;background:#F3F3F4;border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Dashboard</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#FAFAFB;border:1px solid #E9EAEE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E5484D" stroke-width="2.5"><path d="M12 2v20M2 12h20M7 7l10 10M7 17L17 7"/></svg></div>
              <div style="min-width:0">
                <div style="font-size:9.5px;font-weight:700;color:#1A1C1D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">tableau_sales</div>
                <div style="font-size:8px;color:#8E8F91;line-height:1;margin-top:2px">Dashboard</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:4px 8px;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:#5C5E63;font-weight:500;display:inline-flex;align-items:center;gap:2px">Dashboard <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        </div>

        <!-- demand_forecast model node -->
        <div style="position:absolute;left:444px;top:144px;width:140px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;box-shadow:0 1px 2px rgba(18,20,26,0.05);font-family:Inter,sans-serif">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">+</div>

          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:#8E8F91;font-family:var(--font-mono)">ml_inference</span>
              <span style="font-size:7px;color:#8E8F91;background:#F3F3F4;border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Model</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#F4F1FE;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2.5"><path d="M10 2v7.5L4.2 19a1.7 1.7 0 0 0 1.5 2.5h12.6a1.7 1.7 0 0 0 1.5-2.5L14 9.5V2"/><path d="M8.5 2h7"/></svg></div>
              <div style="min-width:0">
                <div style="font-size:9.5px;font-weight:700;color:#1A1C1D;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">demand_forecast</div>
                <div style="font-size:8px;color:#8E8F91;line-height:1;margin-top:2px">Model · v3</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:4px 8px;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:#5C5E63;font-weight:500;display:inline-flex;align-items:center;gap:2px">Model <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        </div>

        <!-- finance_ledger table node -->
        <div style="position:absolute;left:444px;top:240px;width:140px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;box-shadow:0 1px 2px rgba(18,20,26,0.05);font-family:Inter,sans-serif">
          <div style="position:absolute;left:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">-</div>
          <div style="position:absolute;right:-7px;top:50%;transform:translateY(-50%);width:14px;height:14px;border:1px solid #C4C5C9;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:8px;color:#8E8F91;cursor:pointer;z-index:2">+</div>

          <div style="padding:6px 8px 4px">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px">
              <span style="font-size:7.5px;color:#8E8F91;font-family:var(--font-mono)">snowflake_prod / gold</span>
              <span style="font-size:7px;color:#8E8F91;background:#F3F3F4;border-radius:3px;padding:0 3px;font-weight:600;flex-shrink:0">Table</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              <div style="width:16px;height:16px;border-radius:4px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:700">❄</span></div>
              <div style="min-width:0">
                <div style="font-size:9.5px;font-weight:700;color:#1A1C1D;font-family:var(--font-mono);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">finance_ledger</div>
                <div style="font-size:8px;color:#8E8F91;line-height:1;margin-top:2px">Table · finance</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:4px 8px;border-bottom-left-radius:8px;border-bottom-right-radius:8px">
            <span style="font-size:8.5px;color:#5C5E63;font-weight:500;display:inline-flex;align-items:center;gap:2px">7 Columns <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="m6 9 6 6 6-6"/></svg></span>
          </div>
        </div>

        <!-- Floating panel (Edge Information) -->
        <div style="position:absolute;right:10px;top:10px;bottom:10px;width:242px;background:#fff;border:1px solid #E9EAEE;border-radius:8px;box-shadow:-2px 0 8px rgba(18,20,26,0.06);display:flex;flex-direction:column;overflow:hidden;z-index:5;font-family:Inter,sans-serif">
          <div style="padding:8px 10px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;justify-content:space-between">
            <span style="font-size:10.5px;font-weight:700;color:#1A1C1D">Edge Information</span>
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2.5" style="cursor:pointer"><path d="M18 6 6 18M6 6l12 12"/></svg>
          </div>
          <div style="padding:10px;display:flex;flex-direction:column;gap:8px;flex:1;min-height:0">
            <div style="display:grid;grid-template-columns:46px 1fr;gap:4px;font-size:9.5px">
              <span style="color:#8E8F91">Source:</span>
              <span style="color:#3E63DD;font-weight:600;font-family:var(--font-mono)">ns.invoices</span>
              <span style="color:#8E8F91">Target:</span>
              <span style="color:#1A1C1D;font-weight:600;font-family:var(--font-mono)">fact_sales</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:2px">
              <span style="font-size:8px;color:#8E8F91;font-weight:600;text-transform:uppercase;letter-spacing:0.03em">Description</span>
              <span style="font-size:9.5px;color:#5C5E63;line-height:1.4">Calculate billing sums, sync currency codes, and merge downstream transactions daily.</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:4px;flex:1;min-height:0">
              <span style="font-size:8.5px;color:#8E8F91;font-weight:600;text-transform:uppercase;letter-spacing:0.03em">SQL Query</span>
              
              <!-- Monospace Code Editor mockup -->
              <div style="flex:1;background:#FAFAFB;border:1px solid #E9EAEE;border-radius:6px;padding:6px;font-family:ui-monospace,SFMono-Regular,SF Mono,Menlo,Consolas,Liberation Mono,monospace;font-size:8.5px;line-height:1.35;overflow-y:auto;color:#5C5E63">
                <span style="color:#7C5CFC;font-weight:600">WITH</span> order_counts <span style="color:#7C5CFC;font-weight:600">AS</span> (<br/>
                &nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">SELECT</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;c.customer_id,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">COUNT</span>(o.order_id) <span style="color:#7C5CFC;font-weight:600">AS</span> order_count<br/>
                &nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">FROM</span> stg_customers c<br/>
                &nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">LEFT JOIN</span> stg_orders o <span style="color:#3E63DD;font-weight:600">ON</span> c.customer_id = o.customer_id<br/>
                &nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">GROUP BY</span> c.customer_id<br/>
                ),<br/>
                order_amounts <span style="color:#7C5CFC;font-weight:600">AS</span> (<br/>
                &nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">SELECT</span><br/>
                &nbsp;&nbsp;&nbsp;&nbsp;o.customer_id,<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;o.order_id<br/>
                &nbsp;&nbsp;<span style="color:#3E63DD;font-weight:600">FROM</span> stg_orders o<br/>
                )<br/>
                <span style="color:#3E63DD;font-weight:600">SELECT</span> * <span style="color:#3E63DD;font-weight:600">FROM</span> order_counts;
              </div>
            </div>
          </div>
        </div>

        <!-- Canvas bottom controls -->
        <div style="position:absolute;bottom:10px;left:10px;background:#fff;border:1px solid #E9EAEE;border-radius:6px;padding:4px 8px;display:flex;align-items:center;gap:8px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
          <span style="font-size:9.5px;color:#1A1C1D;font-weight:600;min-width:24px;text-align:center">100%</span>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
          <div style="width:1px;height:10px;background:#E9EAEE"></div>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
        </div>

        <!-- Security indicator -->
        <div style="position:absolute;bottom:10px;right:262px;background:#fff;border:1px solid #E9EAEE;border-radius:6px;padding:4px 8px;display:flex;align-items:center;gap:5px;box-shadow:0 1px 2px rgba(18,20,26,0.05)">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.5"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
          <span style="font-size:9.5px;color:#5C5E63">Row-level security enforced · 4,211 events audited</span>
        </div>
      </div>
    </div>
  </div>
</div>`;

const TABS = [
  { label: "Pipelines", html: PIPELINES_SCREEN_HTML },
  { label: "Master Data", html: MASTER_DATA_SCREEN_HTML },
  { label: "Warehouse", html: MODELS_SCREEN_HTML },
  { label: "ML", html: ML_SCREEN_HTML },
  { label: "Ask Akashic", html: ASK_SCREEN_HTML },
  { label: "BI", html: "" }, // rendered as the interactive AkashicHeroBIWireframe component below
  { label: "Governance", html: GOVERNANCE_SCREEN_HTML },
];

const N = TABS.length;

export default function AkashicModuleScreensMockup() {
  const [activeCard, setActiveCard] = useState(0);
  const [resetTrigger, setResetTrigger] = useState(0);

  const handleSelect = (id: number) => {
    setActiveCard(id);
    setResetTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % N);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeCard, resetTrigger]);

  const getPos = (rp: number) => {
    if (rp === 0) return "center";
    if (rp === 1) return "right";
    if (rp === 2) return "far-right";
    if (rp === N - 2) return "far-left";
    if (rp === N - 1) return "left";
    return "far";
  };

  return (
    <div style={{ padding: "6px 0 58px", fontFamily: "var(--font-sans)" }} className="relative z-10 mx-auto w-full max-w-[1152px]">
      <div className="mx-auto mb-12 flex w-fit max-w-full items-center gap-5 overflow-x-auto px-4 lg:gap-8">
        {TABS.map((tab, id) => {
          const isActive = activeCard === id;
          return (
            <div
              key={tab.label}
              onClick={() => handleSelect(id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSelect(id)}
              className={`group relative flex cursor-pointer select-none items-center gap-2 whitespace-nowrap pb-2 text-[15px] tracking-tight transition-colors duration-200 ${
                isActive ? "text-primary-text" : "text-tertiary-text hover:text-secondary-text"
              }`}
              style={{ fontFamily: "var(--font-sans)", fontWeight: isActive ? 600 : 400 }}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                  isActive ? "scale-100 bg-blue opacity-100" : "scale-50 bg-tertiary-text opacity-40 group-hover:opacity-70"
                }`}
              />
              {tab.label}
              <span
                key={isActive ? `active-${resetTrigger}` : "inactive"}
                className="absolute bottom-0 left-0 h-px bg-tertiary-text/40 transition-all duration-300"
                style={{
                  width: isActive ? "100%" : "0%",
                  animation: isActive ? "progressFill 6s linear forwards" : undefined,
                }}
              />
            </div>
          );
        })}
      </div>
      <div style={{ position: "relative", height: "600px", width: "100%" }}>
        {TABS.map((tab, i) => {
          const rp = (i - activeCard + N) % N;
          const pos = getPos(rp);
          
          if (tab.label === "BI") {
            return (
              <div
                key={tab.label}
                className="hs-card overflow-hidden"
                data-pos={pos}
                onClick={() => rp !== 0 && handleSelect(i)}
              >
                <div className={`w-full h-full ${rp !== 0 ? "pointer-events-none select-none" : ""}`}>
                  <AkashicHeroBIWireframe />
                </div>
              </div>
            );
          }

          return (
            <div
              key={tab.label}
              className="hs-card"
              data-pos={pos}
              onClick={() => rp !== 0 && handleSelect(i)}
              dangerouslySetInnerHTML={{ __html: tab.html }}
            />
          );
        })}
      </div>
    </div>
  );
}
