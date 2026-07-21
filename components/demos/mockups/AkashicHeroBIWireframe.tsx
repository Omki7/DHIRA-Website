"use client";

/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * The BI screen of the /akashic module carousel: a polished Sales Overview
 * dashboard (KPI tiles, revenue-vs-plan area chart, channel donut, top
 * accounts) beside an Ask Akashic chat panel. Clicking a suggested query
 * answers from the demo-data world (AGENTS.md §8a); the "Add a tile" query
 * inserts a new Attainment-by-region tile into the dashboard live. Chrome
 * (window bar, top bar, module rail) is shared with every other screen via
 * HeroProductScreensMockup so the carousel reads as one product.
 */

import React, { useEffect, useRef, useState } from "react";
import {
  WINDOW_BAR,
  LIVE_CHIP,
  appTopBar,
  moduleRail,
} from "@/components/demos/mockups/HeroProductScreensMockup";

type QueryId = "south" | "channel" | "tile";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  sources?: string[];
  addedTile?: boolean;
}

const SUGGESTIONS: Array<{ id: QueryId; label: string }> = [
  { id: "channel", label: "How is gross margin trending?" },
  { id: "south", label: "Is any region behind plan?" },
  { id: "tile", label: "Add a tile: attainment by region" },
];

const ANSWERS: Record<QueryId, { text: string; sources: string[] }> = {
  south: {
    text: "South is the only region behind plan, at 92% of target — 8% short. The gap traces to two distributor renewals still unsigned; every other region is at or above plan.",
    sources: ["fact_sales · gold", "plan_attainment", "renewals"],
  },
  channel: {
    text: "Gross margin is 34.6%, up 1.2 pts vs Q1. Direct pricing held while freight costs eased, and Online margin improved 2.1 pts on higher average order value.",
    sources: ["net_margin", "fact_sales · gold"],
  },
  tile: {
    text: "Done — I added “Attainment by region” to Sales Overview. It's pinned to the metric layer, so it stays in sync with every refresh.",
    sources: ["plan_attainment"],
  },
};

const REGION_BARS = [
  { name: "North", pct: 106, width: 96, color: "#3E9E78", behind: false },
  { name: "West", pct: 102, width: 92, color: "#3E9E78", behind: false },
  { name: "Central", pct: 99, width: 89, color: "#3E9E78", behind: false },
  { name: "East", pct: 97, width: 88, color: "#3E9E78", behind: false },
  { name: "South", pct: 92, width: 83, color: "#E0A93B", behind: true },
];

export default function AkashicHeroBIWireframe() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [used, setUsed] = useState<QueryId[]>([]);
  const [tileAdded, setTileAdded] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, isTyping]);

  const handleSuggestionClick = (query: QueryId) => {
    if (isTyping || used.includes(query)) return;
    const label = SUGGESTIONS.find((s) => s.id === query)?.label ?? "";
    setMessages((prev) => [...prev, { id: `user-${Date.now()}`, sender: "user", text: label }]);
    setUsed((prev) => [...prev, query]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: ANSWERS[query].text,
          sources: ANSWERS[query].sources,
          addedTile: query === "tile",
        },
      ]);
      if (query === "tile") setTileAdded(true);
    }, 1400);
  };

  const handleRestart = () => {
    setMessages([]);
    setUsed([]);
    setIsTyping(false);
    setTileAdded(false);
  };

  const remaining = SUGGESTIONS.filter((s) => !used.includes(s.id));

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-[#FAFAFB] text-left font-sans text-[#1A1C1D]" style={{ fontFamily: "var(--font-sans)" }}>
      <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: WINDOW_BAR + appTopBar("BI", "Sales Overview") }} />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <div style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: moduleRail("bi") }} />

        {/* Dashboard */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="flex h-10 flex-shrink-0 items-center gap-2.5 border-b border-[#E9EAEE] bg-white px-3.5">
            <span className="text-xs font-bold">Sales Overview</span>
            <span className="inline-flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></svg>
              <span className="text-[10px] font-semibold text-[#1B8A5F]">Verified</span>
            </span>
            <span className="h-[18px] w-px bg-[#E9EAEE]" />
            {["Q2 FY26", "All regions"].map((f) => (
              <span key={f} className="flex h-[26px] cursor-pointer items-center gap-1.5 rounded-[7px] border border-[#E9EAEE] bg-white px-2">
                <span className="text-[11px] font-medium">{f}</span>
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" strokeWidth="3" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg>
              </span>
            ))}
            <span className="flex-1" />
            <span className="text-[10.5px] text-[#8E8F91]">Refreshed 2m ago</span>
            <span className="h-[18px] w-px bg-[#E9EAEE]" />
            <span title="Export" className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[7px] border border-[#E9EAEE] bg-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m7 10 5 5 5-5" /><path d="M12 15V3" /></svg>
            </span>
            <span title="More" className="flex h-[26px] w-[26px] cursor-pointer items-center justify-center rounded-[7px] border border-[#E9EAEE] bg-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#5C5E63"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
            </span>
            <span className="flex h-[26px] cursor-pointer items-center gap-1.5 rounded-[7px] bg-[#1A1C1D] px-2.5">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>
              <span className="text-[10.5px] font-semibold text-white">Share</span>
            </span>
            <span style={{ display: "contents" }} dangerouslySetInnerHTML={{ __html: LIVE_CHIP }} />
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-[9px] overflow-hidden bg-[#F6F7F8] p-[11px]">
            {/* KPI row */}
            <div className="flex flex-shrink-0 gap-[9px]">
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[#E9EAEE] bg-white px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap text-[8.5px] font-bold tracking-[0.06em] text-[#8E8F91]">NET REVENUE</div>
                  <div className="mt-px whitespace-nowrap text-[16px] font-bold tracking-tight">$25.4M</div>
                  <div className="mt-px whitespace-nowrap text-[9px] font-semibold text-[#1B8A5F]">▲ 6.4% vs Q1</div>
                </div>
                <svg width="52" height="22" viewBox="0 0 52 22" className="flex-shrink-0"><path d="M1 17 L9 14 L17 15 L25 11 L33 12 L41 7 L51 4" stroke="#3E9E78" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[#E9EAEE] bg-white px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap text-[8.5px] font-bold tracking-[0.06em] text-[#8E8F91]">PLAN ATTAINMENT</div>
                  <div className="mt-px text-[16px] font-bold">98%</div>
                  <div className="mt-px whitespace-nowrap text-[9px] font-semibold text-[#1B8A5F]">▲ 2 pts vs Q1</div>
                </div>
                <svg width="52" height="22" viewBox="0 0 52 22" className="flex-shrink-0"><path d="M1 16 L9 14 L17 15 L25 11 L33 10 L41 7 L51 5" stroke="#3E9E78" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[#E9EAEE] bg-white px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap text-[8.5px] font-bold tracking-[0.06em] text-[#8E8F91]">ACTIVE ACCOUNTS</div>
                  <div className="mt-px whitespace-nowrap text-[16px] font-bold tracking-tight">1,284</div>
                  <div className="mt-px whitespace-nowrap text-[9px] font-semibold text-[#C13059]">▼ 18 vs Q1</div>
                </div>
                <svg width="52" height="22" viewBox="0 0 52 22" className="flex-shrink-0"><path d="M1 8 L9 9 L17 11 L25 10 L33 13 L41 14 L51 16" stroke="#C13059" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-[10px] border border-[#E9EAEE] bg-white px-3 py-2">
                <div className="min-w-0 flex-1">
                  <div className="whitespace-nowrap text-[8.5px] font-bold tracking-[0.06em] text-[#8E8F91]">ORDERS · Q2</div>
                  <div className="mt-px text-[16px] font-bold">82,401</div>
                  <div className="mt-px whitespace-nowrap text-[9px] font-semibold text-[#1B8A5F]">▲ 2,113 vs Q1</div>
                </div>
                <svg width="52" height="22" viewBox="0 0 52 22" className="flex-shrink-0"><path d="M1 16 L9 15 L17 12 L25 13 L33 9 L41 8 L51 5" stroke="#3E9E78" strokeWidth="1.5" fill="none" strokeLinecap="round" /></svg>
              </div>
            </div>

            {/* Charts row */}
            <div className="flex min-h-0 flex-[1.15] gap-[9px]">
              <div className="flex min-w-0 flex-[1.5] flex-col rounded-[10px] border border-[#E9EAEE] bg-white px-[13px] py-[10px]">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold">Revenue vs plan · weekly</span>
                  <span className="flex items-center gap-2.5">
                    <span className="inline-flex items-center gap-1"><span className="h-0.5 w-2.5 bg-[#3E63DD]" /><span className="text-[9px] text-[#5C5E63]">actual</span></span>
                    <span className="inline-flex items-center gap-1"><span className="h-0.5 w-2.5 bg-[#B7BAC4]" /><span className="text-[9px] text-[#5C5E63]">plan</span></span>
                  </span>
                </div>
                <div className="relative min-h-0 flex-1">
                  <span className="absolute left-0 top-[25%] -translate-y-full pb-px text-[7.5px] leading-none text-[#B4BAC2]">$2.4M</span>
                  <span className="absolute left-0 top-[50%] -translate-y-full pb-px text-[7.5px] leading-none text-[#B4BAC2]">$1.6M</span>
                  <span className="absolute left-0 top-[75%] -translate-y-full pb-px text-[7.5px] leading-none text-[#B4BAC2]">$0.8M</span>
                  <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                    <line x1="0" y1="20" x2="200" y2="20" stroke="#F1F2F5" strokeWidth="1" />
                    <line x1="0" y1="40" x2="200" y2="40" stroke="#F1F2F5" strokeWidth="1" />
                    <line x1="0" y1="60" x2="200" y2="60" stroke="#F1F2F5" strokeWidth="1" />
                    <path d="M0 44 L18 40 L36 38 L54 33 L72 30 L90 26 L108 24 L126 20 L144 17 L162 14 L180 11 L200 8" stroke="#B7BAC4" strokeWidth="1.4" fill="none" strokeDasharray="4 3" strokeLinecap="round" />
                    <path d="M0 52 L18 46 L36 48 L54 40 L72 43 L90 34 L108 38 L126 30 L144 35 L162 26 L180 30 L200 22" stroke="#3E63DD" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0 52 L18 46 L36 48 L54 40 L72 43 L90 34 L108 38 L126 30 L144 35 L162 26 L180 30 L200 22 L200 80 L0 80 Z" fill="#3E63DD" fillOpacity="0.07" />
                  </svg>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  {["W1", "W4", "W8", "W12"].map((w) => (
                    <span key={w} className="text-[9px] text-[#8E8F91]">{w}</span>
                  ))}
                </div>
              </div>
              <div className="flex min-w-0 flex-1 flex-col rounded-[10px] border border-[#E9EAEE] bg-white px-[13px] py-[10px]">
                <span className="mb-1 text-[11px] font-semibold">Revenue by channel</span>
                <div className="flex min-h-0 flex-1 items-center gap-3">
                  <div className="relative h-[74px] w-[74px] flex-shrink-0">
                    <svg width="74" height="74" viewBox="0 0 74 74">
                      <circle cx="37" cy="37" r="26" fill="none" stroke="#3E63DD" strokeWidth="11" strokeDasharray="75.1 163.4" transform="rotate(-90 37 37)" />
                      <circle cx="37" cy="37" r="26" fill="none" stroke="#7C5CFC" strokeWidth="11" strokeDasharray="52.3 163.4" transform="rotate(75.6 37 37)" />
                      <circle cx="37" cy="37" r="26" fill="none" stroke="#2A9BE0" strokeWidth="11" strokeDasharray="35 163.4" transform="rotate(190.8 37 37)" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold">$25.4M</span>
                      <span className="text-[7.5px] text-[#8E8F91]">net</span>
                    </div>
                  </div>
                  <div className="flex min-w-0 flex-col gap-[5px]">
                    {[
                      { name: "Direct", pct: "46%", color: "#3E63DD", note: "" },
                      { name: "Partner", pct: "32%", color: "#7C5CFC", note: "" },
                      { name: "Online", pct: "22%", color: "#2A9BE0", note: "▲ 18% QoQ" },
                    ].map((c) => (
                      <div key={c.name} className="flex items-center gap-1.5 whitespace-nowrap">
                        <span className="h-2 w-2 flex-shrink-0 rounded-[2px]" style={{ background: c.color }} />
                        <span className="text-[9.5px] text-[#5C5E63]">{c.name}</span>
                        <span className="text-[9.5px] font-semibold">{c.pct}</span>
                        {c.note && <span className="text-[8.5px] font-semibold text-[#1B8A5F]">{c.note}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row — the chat can add a tile here */}
            <div className="flex min-h-0 flex-1 gap-[9px]">
              <div className="flex min-w-0 flex-1 flex-col rounded-[10px] border border-[#E9EAEE] bg-white px-[13px] py-[10px]">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[11px] font-semibold">Top accounts</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#8E8F91" className="cursor-pointer"><circle cx="5" cy="12" r="1.6" /><circle cx="12" cy="12" r="1.6" /><circle cx="19" cy="12" r="1.6" /></svg>
                </div>
                <div className="flex items-center border-b border-[#F1F2F5] pb-1">
                  <span className="flex-[1.4] text-[8.5px] font-semibold tracking-[0.04em] text-[#8E8F91]">ACCOUNT</span>
                  <span className="w-11 text-right text-[8.5px] font-semibold text-[#8E8F91]">REV</span>
                  <span className="w-9 text-right text-[8.5px] font-semibold text-[#8E8F91]">ATT.</span>
                </div>
                <div className="flex min-h-0 flex-1 flex-col justify-around">
                  {[
                    { name: "Whitmore Retail", rev: "$4.2M", att: "112%", color: "#1B8A5F" },
                    { name: "Kirkwood Traders", rev: "$3.1M", att: "98%", color: "#1A1C1D" },
                    { name: "Ardmore Foods", rev: "$2.4M", att: "87%", color: "#C13059" },
                  ].map((a) => (
                    <div key={a.name} className="flex items-center">
                      <span className="flex-[1.4] truncate text-[10px] font-medium">{a.name}</span>
                      <span className="w-11 text-right text-[10px]">{a.rev}</span>
                      <span className="w-9 text-right text-[10px] font-semibold" style={{ color: a.color }}>{a.att}</span>
                    </div>
                  ))}
                </div>
                <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded border border-[#EEEFF1] bg-[#FAFAFB] px-1.5 py-0.5 font-mono text-[8px] text-[#8E8F91]"><span className="font-bold text-[#7C5CFC]">ƒx</span>net_revenue · top 3</span>
              </div>

              {tileAdded ? (
                <div className="flex min-w-0 flex-[1.25] flex-col rounded-[10px] border-[1.5px] border-[#3E63DD] bg-white px-[13px] py-[10px] shadow-[0_2px_8px_rgba(62,99,221,0.14)]">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[11px] font-semibold">Attainment by region</span>
                    <span className="rounded bg-[#EEF1FC] px-1.5 py-0.5 text-[8px] font-semibold text-[#3E63DD]">Added by Ask Akashic</span>
                  </div>
                  <div className="flex min-h-0 flex-1 flex-col justify-around">
                    {REGION_BARS.map((r) => (
                      <div key={r.name} className="flex items-center gap-2">
                        <span className={`w-9 flex-shrink-0 text-[9.5px] ${r.behind ? "font-semibold text-[#A97B12]" : "text-[#5C5E63]"}`}>{r.name}</span>
                        <div className="h-[9px] flex-1 overflow-hidden rounded-[3px] bg-[#F3F3F4]">
                          <div className="h-full" style={{ width: `${r.width}%`, background: r.color }} />
                        </div>
                        <span className={`w-7 flex-shrink-0 text-right text-[9.5px] font-semibold ${r.behind ? "font-bold text-[#A97B12]" : "text-[#1A1C1D]"}`}>{r.pct}%</span>
                      </div>
                    ))}
                  </div>
                  <span className="mt-1.5 inline-flex w-fit items-center gap-1 rounded border border-[#EEEFF1] bg-[#FAFAFB] px-1.5 py-0.5 font-mono text-[8px] text-[#8E8F91]"><span className="font-bold text-[#7C5CFC]">ƒx</span>plan_attainment · target 100%</span>
                </div>
              ) : (
                <div className="flex min-w-0 flex-[1.25] flex-col rounded-[10px] border border-dashed border-[#C8D2F5] bg-[#F9FAFE] px-[13px] py-[10px]">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <svg className="h-2.5 w-2.5 flex-shrink-0 text-[#7C5CFC]" viewBox="0 0 24 24" fill="currentColor"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z" /></svg>
                      <span className="text-[8.5px] font-bold tracking-[0.06em] text-[#8E8F91]">SUGGESTED TILE</span>
                    </span>
                    <span className="cursor-pointer rounded-full bg-[#3E63DD] px-2 py-0.5 text-[8.5px] font-semibold text-white">Add</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#5C5E63]">Attainment by region</span>
                  <div className="mt-1.5 flex min-h-0 flex-1 flex-col justify-around opacity-50">
                    {REGION_BARS.map((r) => (
                      <div key={r.name} className="flex items-center gap-2">
                        <span className="w-9 flex-shrink-0 text-[9px] text-[#8E8F91]">{r.name}</span>
                        <div className="h-[7px] flex-1 overflow-hidden rounded-[3px] bg-[#EDEFF3]">
                          <div className="h-full bg-[#C4CBD8]" style={{ width: `${r.width}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  <span className="mt-1 text-[8.5px] text-[#8E8F91]">Or ask Akashic: “add a tile: attainment by region”.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Ask Akashic chat */}
        <div className="flex w-[286px] flex-shrink-0 flex-col border-l border-[#E9EAEE] bg-white">
          <div className="flex h-10 flex-shrink-0 items-center gap-2 border-b border-[#EEEFF1] px-3">
            <div className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-gradient-to-br from-[#3E63DD] to-[#6E56CF] text-white">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z" /></svg>
            </div>
            <div className="min-w-0">
              <div className="text-[11px] font-bold leading-tight">Ask Akashic</div>
              <div className="text-[8.5px] leading-tight text-[#8E8F91]">Chatting with Sales Overview</div>
            </div>
            <div className="flex-1" />
            <button
              type="button"
              className="rounded border border-transparent p-1 text-[#8E8F91] transition-colors hover:border-[#E9EAEE] hover:bg-[#FAFAFB] hover:text-[#5C5E63]"
              title="Collapse panel"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m9 6 6 6-6 6" /><path strokeLinecap="round" d="M19 5v14" /></svg>
            </button>
            <button
              onClick={handleRestart}
              type="button"
              className="rounded border border-transparent p-1 text-[#8E8F91] transition-colors hover:border-[#E9EAEE] hover:bg-[#FAFAFB] hover:text-[#5C5E63]"
              title="Restart chat"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
            </button>
          </div>

          <div ref={threadRef} className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto p-3">
            {messages.length === 0 && (
              <div className="flex flex-col items-center gap-1.5 rounded-lg border border-[#E9EAEE] bg-[#FAFAFB] px-3 py-5 text-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#3E63DD] to-[#6E56CF] text-white">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z" /></svg>
                </div>
                <p className="mt-1 text-[11.5px] font-semibold text-[#1A1C1D]">Ask about this dashboard</p>
                <p className="max-w-[200px] text-[10px] leading-relaxed text-[#8E8F91]">Answers come from the governed metric layer, with lineage on every claim.</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}>
                <div
                  className={`max-w-[92%] rounded-lg p-2.5 text-[11px] leading-relaxed ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-[#EEF1FC] font-medium text-[#1A1C1D]"
                      : "rounded-bl-none border border-[#E9EAEE] bg-[#FAFAFB] text-[#1A1C1D]"
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.sender === "bot" && msg.addedTile && (
                    <div className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-[#CBE8D9] bg-[#EAF7F0] px-2 py-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                      <span className="text-[9px] font-semibold text-[#1B8A5F]">Tile added to Sales Overview</span>
                    </div>
                  )}
                  {msg.sender === "bot" && msg.sources && msg.sources.length > 0 && (
                    <div className="mt-2 flex flex-wrap items-center gap-1 border-t border-[#E9EAEE] pt-2">
                      <span className="mr-0.5 font-mono text-[8px] uppercase tracking-wider text-[#8E8F91]">Grounded in</span>
                      {msg.sources.map((src) => (
                        <span key={src} className="inline-flex items-center rounded border border-[#E9EAEE] bg-white px-1.5 py-0.5 font-mono text-[8.5px] font-semibold text-[#3E63DD]">
                          {src}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-2">
                <div className="flex h-5 w-5 items-center justify-center rounded-md bg-gradient-to-br from-[#3E63DD] to-[#6E56CF] text-white">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z" /></svg>
                </div>
                <div className="rounded-lg rounded-bl-none border border-[#E9EAEE] bg-[#FAFAFB] p-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3E63DD]" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3E63DD]" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[#3E63DD]" style={{ animationDelay: "300ms" }} />
                    <span className="ml-1 font-mono text-[8px] uppercase tracking-wider text-[#8E8F91]">Querying metric layer…</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex-shrink-0 border-t border-[#EEEFF1] p-2.5">
            {remaining.length > 0 && !isTyping && (
              <div className="mb-2 flex flex-col gap-1.5">
                {remaining.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSuggestionClick(s.id)}
                    type="button"
                    className="flex items-center gap-2 rounded-md border border-[#E9EAEE] bg-[#FAFAFB] px-2.5 py-1.5 text-left text-[10.5px] text-[#5C5E63] transition-colors hover:border-[#3E63DD] hover:text-[#3E63DD]"
                  >
                    <svg className="h-2.5 w-2.5 flex-shrink-0 text-[#7C5CFC]" viewBox="0 0 24 24" fill="currentColor"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z" /></svg>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-center gap-2 rounded-lg border border-[#E4E5E9] bg-white px-2.5 py-1.5">
              <span className="min-w-0 flex-1 text-[11px] text-[#8E8F91]">Ask about this data…</span>
              <div title="Dictate" className="flex h-[22px] w-[22px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md border border-[#E9EAEE] bg-white text-[#5C5E63]">
                <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><path d="M12 19v3" /></svg>
              </div>
              <div className="flex h-[22px] w-[22px] flex-shrink-0 cursor-pointer items-center justify-center rounded-md bg-gradient-to-br from-[#3E63DD] to-[#6E56CF] text-white">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m5 12 7-7 7 7M12 19V5" /></svg>
              </div>
            </div>
            <div className="mt-1.5 flex items-center justify-center gap-1 text-[8.5px] font-medium text-[#8E8F91]">
              <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Answers respect row-level access · lineage auditable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
