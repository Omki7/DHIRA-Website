
"use client";

import { useState, useEffect } from "react";

export default function HeroProducts() {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % 3);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getPos = (p: number) => {
    return p === 0 ? "center" : p === 1 ? "right" : "left";
  };

  const rp = [0, 1, 2].map((i) => (i - activeCard + 3) % 3);
  const pos0 = getPos(rp[0]);
  const pos1 = getPos(rp[1]);
  const pos2 = getPos(rp[2]);

  return (
    <div style={{ padding: "36px 0 58px", minHeight: "792px", fontFamily: "Inter, system-ui, sans-serif" }} className="w-full max-w-[1152px] mx-auto mt-8 relative z-10 mb-24">
      <div className="mx-auto mb-12 flex w-fit items-center gap-10">
        {[
          { id: 0, label: "Data Pipelines" },
          { id: 1, label: "Conversational AI" },
          { id: 2, label: "Data Models" }
        ].map((tab) => {
          const isActive = activeCard === tab.id;
          return (
            <div
              key={tab.id}
              onClick={() => setActiveCard(tab.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setActiveCard(tab.id)}
              className={`group relative flex cursor-pointer select-none items-center gap-2.5 pb-2 text-[17px] tracking-tight transition-colors duration-200 ${
                isActive ? "text-primary-text" : "text-tertiary-text hover:text-secondary-text"
              }`}
              style={{ fontFamily: "Inter, sans-serif", fontWeight: isActive ? 600 : 400 }}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full transition-all duration-200 ${
                  isActive ? "scale-100 bg-blue opacity-100" : "scale-50 bg-tertiary-text opacity-40 group-hover:opacity-70"
                }`}
              />
              {tab.label}
              <span
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
      <div style={{ position: "relative", height: "610px", width: "100%" }}>
        <div
          className="hs-card"
          data-pos={pos0}
          onClick={() => rp[0] !== 0 && setActiveCard(0)}
          dangerouslySetInnerHTML={{ __html: `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#fff">
      <div style="height:42px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;padding:0 15px;gap:9px;flex-shrink:0;background:#FAFAFB">
        <svg viewBox="0 0 200 200" width="20" height="20" fill="none" style="overflow:visible;flex-shrink:0"><line x1="100" y1="50" x2="58" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="100" y1="50" x2="142" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="79" y1="103" x2="121" y2="103" stroke="#3E63DD" stroke-width="12"/><circle cx="58" cy="156" r="16" fill="#1A1C1D"/><circle cx="142" cy="156" r="16" fill="#1A1C1D"/><circle cx="79" cy="103" r="14" fill="#1A1C1D"/><circle cx="121" cy="103" r="14" fill="#1A1C1D"/><circle cx="100" cy="50" r="18" fill="#3E63DD"/><circle cx="124" cy="30" r="8" fill="#3E63DD" opacity="0.6"/><circle cx="80" cy="26" r="6" fill="#3E63DD" opacity="0.45"/></svg>
        <span style="font-size:12.5px;font-weight:700;color:#1A1C1D;letter-spacing:-0.02em">Akashic</span>
        <span style="font-size:11px;color:#8E8F91">/</span><span style="font-size:11px;color:#5C5E63">Pipelines</span>
        <span style="font-size:11px;color:#8E8F91">/</span><span style="font-size:11px;color:#1A1C1D;font-weight:600">Sales Performance</span>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;gap:6px;height:24px;padding:0 9px;border:1px solid #EEEFF1;border-radius:7px;background:#fff"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></div>
        <div style="display:flex;align-items:center;gap:7px;padding-left:3px"><span style="font-size:11px;color:#5C5E63;font-weight:500">Priya Mehta</span><div style="width:25px;height:25px;border-radius:50%;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:600">PM</span></div></div>
      </div>
      <div style="height:44px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;padding:0 14px;gap:13px;flex-shrink:0">
        <div style="height:28px;padding:0 10px;border:1px solid #EEEFF1;border-radius:7px;display:flex;align-items:center;gap:6px;cursor:pointer;background:#fff"><span style="font-size:11.5px;color:#1A1C1D;font-weight:500">Actions</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
        <div style="width:1px;height:20px;background:#EEEFF1"></div>
        <div style="display:flex;align-items:center;gap:6px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style="font-size:11.5px;color:#1B8A5F;font-weight:600">Validated</span></div>
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer;height:28px;padding:0 11px;background:#1A1C1D;border-radius:7px"><svg width="11" height="11" viewBox="0 0 24 24" fill="#fff" stroke="none"><polygon points="6 3 20 12 6 21 6 3"/></svg><span style="font-size:11.5px;color:#fff;font-weight:600">Run</span></div>
        <div style="display:flex;align-items:center;gap:6px;cursor:pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;color:#5C5E63;font-weight:500">Every hour</span></div>
        <div style="flex:1"></div>
        <span style="font-size:10.5px;color:#8E8F91">Last run 6m ago · 1m 14s</span>
        <div style="height:25px;padding:0 10px;background:#EAF7F0;border:1px solid #BEE6D1;border-radius:20px;display:flex;align-items:center;gap:6px"><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;animation:softpulse 2s infinite"></span><span style="font-size:11px;color:#1B8A5F;font-weight:600">Live</span></div>
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:212px;border-right:1px solid #EEEFF1;display:flex;flex-direction:column;flex-shrink:0;background:#FAFAFB">
          <div style="padding:10px 11px 8px"><div style="background:#fff;border:1px solid #EEEFF1;border-radius:8px;padding:6px 9px;display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-size:11px;color:#8E8F91">Search sources</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91;border:1px solid #EEEFF1;border-radius:4px;padding:1px 4px">⌘K</span></div></div>
          <div style="flex:1;overflow:hidden;padding:0 9px">
            <div style="display:flex;align-items:center;justify-content:space-between;padding:7px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">BUSINESS SYSTEMS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">5</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px" style-hover="{background:'#F1F3F9'}"><div style="width:19px;height:19px;border-radius:5px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="11" height="11" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Salesforce</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">CRM</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">N</span></div><span style="font-size:11.5px;color:#1A1C1D">NetSuite</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">ERP</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#FF7A59;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:11px;color:#fff;font-weight:700">h</span></div><span style="font-size:11.5px;color:#1A1C1D">HubSpot</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">Mktg</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#0875A8;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:8px;color:#fff;font-weight:700">W</span></div><span style="font-size:11.5px;color:#1A1C1D">Workday</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">HR</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#04A77F;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:8px;color:#fff;font-weight:700">Z</span></div><span style="font-size:11.5px;color:#1A1C1D">Zendesk</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">CX</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">FILES &amp; SHEETS</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px;background:#EEF1FC"><div style="width:19px;height:19px;border-radius:5px;background:#1E7A45;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9px;color:#fff;font-weight:700">X</span></div><span style="font-size:11.5px;color:#1A1C1D;font-weight:600">Sales Plan FY26</span><div style="flex:1"></div><span style="width:5px;height:5px;border-radius:50%;background:#3E63DD"></span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#1A8E5F;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4"><path d="M9 3v18M3 9h18"/></svg></div><span style="font-size:11.5px;color:#1A1C1D">Forecast Sheet</span></div>
            </div>
            <div style="display:flex;align-items:center;justify-content:space-between;padding:9px 3px 4px"><span style="font-size:9.5px;font-weight:700;color:#8E8F91;letter-spacing:0.07em">DATABASES</span><span style="font-size:9px;color:#8E8F91;background:#F3F3F4;border-radius:5px;padding:0 5px;font-weight:600">2</span></div>
            <div style="display:flex;flex-direction:column;gap:1px">
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#336791;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:7px;color:#fff;font-weight:700">PG</span></div><span style="font-size:11.5px;color:#1A1C1D">Orders DB</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">Postgres</span></div>
              <div style="display:flex;align-items:center;gap:8px;padding:5px 7px;border-radius:7px"><div style="width:19px;height:19px;border-radius:5px;background:#00618A;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:7px;color:#fff;font-weight:700">My</span></div><span style="font-size:11.5px;color:#1A1C1D">Store POS</span><div style="flex:1"></div><span style="font-size:9px;color:#8E8F91">MySQL</span></div>
            </div>
          </div>
          <div style="padding:9px 12px;border-top:1px solid #EEEFF1;display:flex;align-items:center;gap:7px"><div style="width:18px;height:18px;border-radius:5px;background:#29B5E8;display:flex;align-items:center;justify-content:center"><span style="font-size:9px;color:#fff">❄</span></div><div style="min-width:0"><div style="font-size:10.5px;color:#1A1C1D;font-weight:600">Snowflake</div><div style="font-size:8.5px;color:#8E8F91">Destination warehouse</div></div></div>
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:#FAFAFB;background-image:radial-gradient(circle,#E8E8E9 1px,transparent 1px);background-size:22px 22px">
          <svg width="611" height="496" viewBox="0 0 611 496" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M172,86 C 214,86 208,214 250,218" stroke="#C3C6CF" fill="none" stroke-width="1.6"/>
            <path d="M172,246 L 250,238" stroke="#C3C6CF" fill="none" stroke-width="1.6"/>
            <path d="M172,402 C 214,402 208,262 250,258" stroke="#C3C6CF" fill="none" stroke-width="1.6"/>
            <path d="M400,238 C 424,238 422,210 446,210" stroke="#3E63DD" fill="none" stroke-width="2" stroke-dasharray="4 4" style="animation:dashmove .7s linear infinite"/>
            <path d="M400,238 C 424,238 422,330 446,330" stroke="#C3C6CF" fill="none" stroke-width="1.6"/>
            <circle cx="250" cy="218" r="3" fill="#B7BAC4"/><circle cx="250" cy="238" r="3" fill="#B7BAC4"/><circle cx="250" cy="258" r="3" fill="#B7BAC4"/>
            <circle cx="446" cy="210" r="3.5" fill="#3E63DD"/><circle cx="446" cy="330" r="3" fill="#B7BAC4"/>
          </svg>
          <div style="position:absolute;left:18px;top:46px;width:154px;background:#fff;border:1px solid #EEEFF1;border-radius:11px;box-shadow:0 5px 16px rgba(22,24,40,0.07);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#2A9BE0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:#1A1C1D">Salesforce</div><div style="font-size:9px;color:#8E8F91">Customer orders</div></div><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-6.2-8.6"/><path d="M22 4 12 14.01l-3-3"/></svg><span style="font-size:9px;color:#5C5E63">Synced 4m · 82,401 rows</span></div>
          </div>
          <div style="position:absolute;left:18px;top:212px;width:154px;background:#fff;border:1px solid #EEEFF1;border-radius:11px;box-shadow:0 5px 16px rgba(22,24,40,0.07);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#1E7A45;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:12px;color:#fff;font-weight:700">X</span></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:#1A1C1D">Sales Plan FY26</div><div style="font-size:9px;color:#8E8F91">Regional targets</div></div><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg><span style="font-size:9px;color:#5C5E63">Excel · updated daily</span></div>
          </div>
          <div style="position:absolute;left:18px;top:362px;width:154px;background:#fff;border:1px solid #EEEFF1;border-radius:11px;box-shadow:0 5px 16px rgba(22,24,40,0.07);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 10px 8px"><div style="width:26px;height:26px;border-radius:7px;background:#1F2A52;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:12px;color:#fff;font-weight:700">N</span></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:600;color:#1A1C1D">NetSuite</div><div style="font-size:9px;color:#8E8F91">Billed invoices</div></div><span style="width:6px;height:6px;border-radius:50%;background:#1F9D6B;flex-shrink:0"></span></div>
            <div style="border-top:1px solid #EEEFF1;background:#FAFAFB;padding:5px 10px;display:flex;align-items:center;gap:5px"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg><span style="font-size:9px;color:#5C5E63">ERP · synced hourly</span></div>
          </div>
          <div style="position:absolute;left:250px;top:190px;width:150px;background:#fff;border:1.5px solid #C8D2F5;border-radius:11px;box-shadow:0 8px 22px rgba(62,99,221,0.12);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 11px;background:linear-gradient(135deg,#F2F5FE,#EAF0FE)"><div style="width:26px;height:26px;border-radius:7px;background:#3E63DD;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 6 4-4 4 4M12 2v14M4 18c4 0 4 4 8 4s4-4 8-4"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:700;color:#1A1C1D">Unify Sales</div><div style="font-size:9px;color:#3E63DD">Combine sources</div></div></div>
            <div style="padding:8px 11px 9px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;gap:6px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round"><path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 1 1 0 10h-2M8 12h8"/></svg><span style="font-size:10px;color:#5C5E63">Match on <b style="color:#1A1C1D">Customer</b> + <b style="color:#1A1C1D">Region</b></span></div>
              <div style="display:flex;align-items:center;gap:6px"><span style="font-size:10px;color:#8E8F91">3 inputs</span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2.4" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span style="font-size:10px;color:#1A1C1D;font-weight:600">1 unified table</span></div>
            </div>
          </div>
          <div style="position:absolute;left:446px;top:150px;width:150px;background:#fff;border:1px solid #EEEFF1;border-radius:11px;box-shadow:0 6px 18px rgba(22,24,40,0.08);overflow:hidden">
            <div style="display:flex;align-items:center;gap:8px;padding:9px 11px;border-bottom:1px solid #F1F2F5"><div style="width:26px;height:26px;border-radius:7px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg></div><div style="min-width:0;flex:1"><div style="font-size:12px;font-weight:700;color:#1A1C1D">Sales Performance</div><div style="font-size:9px;color:#8E8F91">Business model</div></div></div>
            <div style="padding:8px 11px;display:flex;flex-direction:column;gap:6px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Tables</span><span style="font-size:10px;color:#1A1C1D;font-weight:600">5</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10px;color:#5C5E63">Refreshed</span><span style="font-size:10px;color:#1A1C1D;font-weight:600">6m ago</span></div>
              <div style="height:24px;border-radius:6px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;gap:5px"><span style="width:5px;height:5px;border-radius:50%;background:#1F9D6B;animation:softpulse 2s infinite"></span><span style="font-size:10px;color:#1B8A5F;font-weight:600">Powering 3 dashboards</span></div>
            </div>
          </div>
          <div style="position:absolute;left:446px;top:308px;width:150px;background:#fff;border:1px solid #EEEFF1;border-radius:11px;box-shadow:0 5px 16px rgba(22,24,40,0.06);padding:9px 11px;display:flex;align-items:center;gap:9px">
            <div style="width:26px;height:26px;border-radius:7px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg></div>
            <div style="min-width:0"><div style="font-size:11.5px;font-weight:600;color:#1A1C1D">Quality checks</div><div style="font-size:9.5px;color:#5C5E63">24 rules · all passing</div></div>
          </div>
          <div style="position:absolute;bottom:14px;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #EEEFF1;border-radius:9px;padding:5px 9px;display:flex;align-items:center;gap:9px;box-shadow:0 4px 14px rgba(20,22,40,0.09)">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14"/></svg>
            <span style="font-size:11px;color:#1A1C1D;font-weight:600;min-width:32px;text-align:center">100%</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer"><path d="M5 12h14M12 5v14"/></svg>
          </div>
        </div>
      </div>
    </div>` }}
        />
        <div
          className="hs-card"
          data-pos={pos1}
          onClick={() => rp[1] !== 0 && setActiveCard(1)}
          dangerouslySetInnerHTML={{ __html: `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#fff">
      <div style="height:42px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;padding:0 15px;gap:9px;flex-shrink:0;background:#FAFAFB">
        <svg viewBox="0 0 200 200" width="20" height="20" fill="none" style="overflow:visible;flex-shrink:0"><line x1="100" y1="50" x2="58" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="100" y1="50" x2="142" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="79" y1="103" x2="121" y2="103" stroke="#3E63DD" stroke-width="12"/><circle cx="58" cy="156" r="16" fill="#1A1C1D"/><circle cx="142" cy="156" r="16" fill="#1A1C1D"/><circle cx="79" cy="103" r="14" fill="#1A1C1D"/><circle cx="121" cy="103" r="14" fill="#1A1C1D"/><circle cx="100" cy="50" r="18" fill="#3E63DD"/><circle cx="124" cy="30" r="8" fill="#3E63DD" opacity="0.6"/><circle cx="80" cy="26" r="6" fill="#3E63DD" opacity="0.45"/></svg>
        <span style="font-size:12.5px;font-weight:700;color:#1A1C1D;letter-spacing:-0.02em">Akashic</span>
        <span style="font-size:11px;color:#8E8F91">/</span><span style="font-size:11px;color:#5C5E63">Ask</span>
        <span style="font-size:11px;color:#8E8F91">/</span><span style="font-size:11px;color:#1A1C1D;font-weight:600">Sales Performance</span>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;gap:6px;height:24px;padding:0 9px;border:1px solid #EEEFF1;border-radius:7px;background:#fff"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg><span style="font-size:11px;color:#5C5E63;font-weight:500">New chat</span></div>
        <div style="width:25px;height:25px;border-radius:50%;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:600">PM</span></div>
      </div>
      <div style="flex:1;display:flex;flex-direction:column;overflow:hidden">
        <div style="flex:1;overflow-y:auto;padding:18px 22px;display:flex;flex-direction:column;gap:15px">
          <div style="display:flex;justify-content:flex-end;gap:9px;align-items:flex-start">
            <div style="max-width:72%;background:#EEF1FC;border:1px solid #C8D2F5;border-radius:14px 14px 5px 14px;padding:10px 14px"><p style="margin:0;font-size:13px;color:#1A1C1D;line-height:1.5;font-weight:500">Which sales regions are behind plan this quarter, and what's driving it?</p></div>
            <div style="width:27px;height:27px;border-radius:50%;background:#1A1C1D;display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:9.5px;color:#fff;font-weight:600">PM</span></div>
          </div>
          <div style="display:flex;gap:10px;align-items:flex-start">
            <div style="width:27px;height:27px;border-radius:8px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;box-shadow:0 3px 9px rgba(62,99,221,0.28)"><svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="none"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z"/></svg></div>
            <div style="flex:1;min-width:0">
              <div style="display:flex;align-items:center;gap:7px;margin-bottom:10px">
                <span style="font-size:10px;font-weight:600;color:#8E8F91;letter-spacing:0.04em">GROUNDED IN</span>
                <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 9px 4px 5px;background:#EEF1FC;border:1px solid #C8D2F5;border-radius:8px"><div style="width:16px;height:16px;border-radius:4px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">Sales Performance</span></div>
                <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 9px 4px 5px;background:#EAF6FD;border:1px solid #CBE6F8;border-radius:8px"><div style="width:16px;height:16px;border-radius:4px;background:#2A9BE0;display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="#fff"><path d="M14.5 6.5a4.5 4.5 0 0 0-8.4-1.6A3.7 3.7 0 0 0 1 8.4a3.7 3.7 0 0 0 1 7.1h11a4 4 0 0 0 1.5-7.7 4.5 4.5 0 0 0 0-1.3z"/></svg></div><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">Salesforce</span></div>
                <div style="display:inline-flex;align-items:center;gap:6px;padding:4px 9px 4px 5px;background:#FDF0F4;border:1px solid #F6D7E1;border-radius:8px"><div style="width:16px;height:16px;border-radius:4px;background:#E5547B;display:flex;align-items:center;justify-content:center"><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg></div><span style="font-size:10.5px;color:#1A1C1D;font-weight:600">Q2 Board Review</span><span style="font-size:9px;color:#B07289;font-weight:600">p.8</span></div>
                <div style="flex:1"></div>
                <div style="display:inline-flex;align-items:center;gap:4px;cursor:pointer"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:10px;color:#1B8A5F;font-weight:600">Verified lineage</span></div>
              </div>
              <p style="margin:0 0 13px;font-size:13.5px;color:#1A1C1D;line-height:1.62">Two regions are tracking well below plan. <strong style="color:#1A1C1D">South</strong> and <strong style="color:#1A1C1D">East</strong> are pacing 29–37% under target, driven by delayed store openings and inventory shortfalls flagged in the board review.</p>
              <div style="border:1px solid #EEEFF1;border-radius:13px;padding:14px 16px;margin-bottom:13px;background:#fff;box-shadow:0 2px 8px rgba(22,24,40,0.03)">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:13px">
                  <span style="font-size:12px;font-weight:600;color:#1A1C1D">Revenue vs target by region · Q2</span>
                  <div style="display:flex;align-items:center;gap:11px"><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:#3E9E78"></span><span style="font-size:9.5px;color:#5C5E63">On track</span></span><span style="display:inline-flex;align-items:center;gap:4px"><span style="width:8px;height:8px;border-radius:2px;background:#E5547B"></span><span style="font-size:9.5px;color:#5C5E63">Behind</span></span></div>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px">
                  <div style="display:flex;align-items:center;gap:11px"><span style="width:54px;font-size:11px;color:#5C5E63;flex-shrink:0">North</span><div style="flex:1;height:14px;background:#F3F3F4;border-radius:7px;overflow:hidden"><div style="width:100%;height:100%;background:linear-gradient(90deg,#46AD83,#3E9E78);border-radius:7px"></div></div><span style="width:36px;font-size:11px;color:#1A1C1D;font-weight:600;text-align:right;flex-shrink:0">104%</span></div>
                  <div style="display:flex;align-items:center;gap:11px"><span style="width:54px;font-size:11px;color:#5C5E63;flex-shrink:0">West</span><div style="flex:1;height:14px;background:#F3F3F4;border-radius:7px;overflow:hidden"><div style="width:93%;height:100%;background:linear-gradient(90deg,#46AD83,#3E9E78);border-radius:7px"></div></div><span style="width:36px;font-size:11px;color:#1A1C1D;font-weight:600;text-align:right;flex-shrink:0">97%</span></div>
                  <div style="display:flex;align-items:center;gap:11px"><span style="width:54px;font-size:11px;color:#5C5E63;flex-shrink:0">Central</span><div style="flex:1;height:14px;background:#F3F3F4;border-radius:7px;overflow:hidden"><div style="width:84%;height:100%;background:linear-gradient(90deg,#E8B45A,#E0A93B);border-radius:7px"></div></div><span style="width:36px;font-size:11px;color:#1A1C1D;font-weight:600;text-align:right;flex-shrink:0">88%</span></div>
                  <div style="display:flex;align-items:center;gap:11px"><span style="width:54px;font-size:11px;color:#C13059;font-weight:600;flex-shrink:0">South</span><div style="flex:1;height:14px;background:#F3F3F4;border-radius:7px;overflow:hidden"><div style="width:71%;height:100%;background:linear-gradient(90deg,#EA6488,#E5547B);border-radius:7px"></div></div><span style="width:36px;font-size:11px;color:#C13059;font-weight:700;text-align:right;flex-shrink:0">71%</span></div>
                  <div style="display:flex;align-items:center;gap:11px"><span style="width:54px;font-size:11px;color:#C13059;font-weight:600;flex-shrink:0">East</span><div style="flex:1;height:14px;background:#F3F3F4;border-radius:7px;overflow:hidden"><div style="width:63%;height:100%;background:linear-gradient(90deg,#EA6488,#E5547B);border-radius:7px"></div></div><span style="width:36px;font-size:11px;color:#C13059;font-weight:700;text-align:right;flex-shrink:0">63%</span></div>
                </div>
              </div>
              <div style="display:flex;gap:11px;background:#F3F5FE;border:1px solid #D8E0FA;border-radius:12px;padding:12px 14px">
                <div style="width:30px;height:30px;border-radius:8px;background:#fff;border:1px solid #C8D2F5;display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/></svg></div>
                <div style="min-width:0">
                  <div style="font-size:12.5px;font-weight:600;color:#1A1C1D;margin-bottom:3px">Recommended focus</div>
                  <div style="font-size:12px;color:#5C5E63;line-height:1.55">The combined shortfall is <strong style="color:#1A1C1D">₹3.8 Cr</strong>. Recovering East to 90% of plan would add back <strong style="color:#1A1C1D">₹1.6 Cr</strong> in H2. The single biggest lever this half.</div>
                  <div style="margin-top:9px;display:flex;gap:7px"><div style="display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 11px;background:#3E63DD;border-radius:7px;cursor:pointer"><span style="font-size:10.5px;color:#fff;font-weight:600">Build recovery plan</span></div><div style="display:inline-flex;align-items:center;gap:5px;height:26px;padding:0 11px;background:#fff;border:1px solid #C8D2F5;border-radius:7px;cursor:pointer"><span style="font-size:10.5px;color:#3E63DD;font-weight:600">Open lineage</span></div></div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:2px;margin-top:11px">
                <div style="width:29px;height:27px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid #EEEFF1"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#5C5E63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg></div>
                <div style="width:29px;height:27px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg></div>
                <div style="width:29px;height:27px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg></div>
                <div style="width:29px;height:27px;border-radius:7px;display:flex;align-items:center;justify-content:center;cursor:pointer"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg></div>
                <div style="flex:1"></div>
                <span style="font-size:10px;color:#8E8F91">Answered in 2.1s · 5 sources</span>
              </div>
            </div>
          </div>
        </div>
        <div style="border-top:1px solid #EEEFF1;padding:12px 18px;flex-shrink:0;background:#FAFAFB">
          <div style="border:1.5px solid #3E63DD;border-radius:12px;padding:9px 11px;display:flex;align-items:center;gap:10px;box-shadow:0 0 0 3px rgba(62,99,221,0.09)">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="cursor:pointer;flex-shrink:0"><path d="M5 12h14M12 5v14"/></svg>
            <input style="flex:1;border:none;outline:none;font-size:13px;color:#1A1C1D;font-family:Inter,sans-serif;background:transparent" placeholder="Ask a follow-up… e.g. break East down by store" readonly="true"/>
            <div style="display:flex;align-items:center;gap:6px;padding:4px 9px;background:#F3F3F4;border-radius:7px;cursor:pointer;flex-shrink:0"><div style="width:13px;height:13px;border-radius:3px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg></div><span style="font-size:11px;color:#1A1C1D;font-weight:500">Sales Performance</span><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="3" stroke-linecap="round"><path d="m6 9 6 6 6-6"/></svg></div>
            <div style="width:30px;height:30px;background:#3E63DD;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;box-shadow:0 3px 8px rgba(62,99,221,0.3)"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 7-7 7 7M12 19V5"/></svg></div>
          </div>
        </div>
      </div>
    </div>` }}
        />
        <div
          className="hs-card"
          data-pos={pos2}
          onClick={() => rp[2] !== 0 && setActiveCard(2)}
          dangerouslySetInnerHTML={{ __html: `<div style="width:100%;height:100%;display:flex;flex-direction:column;font-family:Inter,sans-serif;background:#fff">
      <div style="height:42px;border-bottom:1px solid #EEEFF1;display:flex;align-items:center;padding:0 15px;gap:9px;flex-shrink:0;background:#FAFAFB">
        <svg viewBox="0 0 200 200" width="20" height="20" fill="none" style="overflow:visible;flex-shrink:0"><line x1="100" y1="50" x2="58" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="100" y1="50" x2="142" y2="156" stroke="#1c1d1f" stroke-width="12"/><line x1="79" y1="103" x2="121" y2="103" stroke="#3E63DD" stroke-width="12"/><circle cx="58" cy="156" r="16" fill="#1A1C1D"/><circle cx="142" cy="156" r="16" fill="#1A1C1D"/><circle cx="79" cy="103" r="14" fill="#1A1C1D"/><circle cx="121" cy="103" r="14" fill="#1A1C1D"/><circle cx="100" cy="50" r="18" fill="#3E63DD"/><circle cx="124" cy="30" r="8" fill="#3E63DD" opacity="0.6"/><circle cx="80" cy="26" r="6" fill="#3E63DD" opacity="0.45"/></svg>
        <span style="font-size:12.5px;font-weight:700;color:#1A1C1D;letter-spacing:-0.02em">Akashic</span>
        <span style="font-size:11px;color:#8E8F91">/</span><span style="font-size:11px;color:#5C5E63">Models</span>
        <span style="font-size:11px;color:#8E8F91">/</span><span style="font-size:11px;color:#1A1C1D;font-weight:600">Sales Performance</span>
        <div style="flex:1"></div>
        <div style="display:flex;align-items:center;gap:6px;height:24px;padding:0 10px;background:#EAF7F0;border:1px solid #BEE6D1;border-radius:7px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1F9D6B" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg><span style="font-size:11px;color:#1B8A5F;font-weight:600">Verified</span></div>
        <div style="width:25px;height:25px;border-radius:50%;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><span style="font-size:10px;color:#fff;font-weight:600">PM</span></div>
      </div>
      <div style="flex:1;display:flex;overflow:hidden">
        <div style="width:214px;border-right:1px solid #EEEFF1;display:flex;flex-direction:column;flex-shrink:0;background:#FAFAFB">
          <div style="padding:11px 13px 9px;display:flex;align-items:center;gap:8px"><div style="width:24px;height:24px;border-radius:7px;background:linear-gradient(135deg,#3E63DD,#6E56CF);display:flex;align-items:center;justify-content:center;flex-shrink:0"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg></div><div style="min-width:0"><div style="font-size:12.5px;font-weight:700;color:#1A1C1D;white-space:nowrap">Sales Performance</div><div style="font-size:9px;color:#8E8F91">Business model</div></div></div>
          <div style="padding:0 11px 9px"><div style="background:#fff;border:1px solid #EEEFF1;border-radius:8px;padding:6px 9px;display:flex;align-items:center;gap:6px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E8F91" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg><span style="font-size:11px;color:#8E8F91">Search the model</span></div></div>
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
        </div>
        <div style="flex:1;position:relative;overflow:hidden;background:#FAFAFB;background-image:radial-gradient(circle,#E8E8E9 1px,transparent 1px);background-size:22px 22px">
          <svg width="611" height="496" viewBox="0 0 611 496" style="position:absolute;top:0;left:0;pointer-events:none">
            <path d="M172,118 C 205,118 200,200 230,205" stroke="#A99CF6" fill="none" stroke-width="1.6"/>
            <path d="M172,360 C 205,360 200,270 230,262" stroke="#A99CF6" fill="none" stroke-width="1.6"/>
            <path d="M398,205 C 425,205 422,118 452,118" stroke="#A99CF6" fill="none" stroke-width="1.6"/>
            <path d="M398,262 C 425,262 422,360 452,360" stroke="#A99CF6" fill="none" stroke-width="1.6"/>
            <circle cx="230" cy="205" r="3.5" fill="#3E63DD"/><circle cx="230" cy="262" r="3.5" fill="#3E63DD"/>
            <circle cx="398" cy="205" r="3.5" fill="#3E63DD"/><circle cx="398" cy="262" r="3.5" fill="#3E63DD"/>
            <circle cx="172" cy="118" r="3" fill="#7C5CFC"/><circle cx="172" cy="360" r="3" fill="#7C5CFC"/>
            <circle cx="452" cy="118" r="3" fill="#7C5CFC"/><circle cx="452" cy="360" r="3" fill="#7C5CFC"/>
          </svg>
          <div style="position:absolute;left:22px;top:78px;width:150px;background:#fff;border:1px solid #E3DDFB;border-radius:11px;box-shadow:0 5px 16px rgba(124,92,252,0.08);overflow:hidden">
            <div style="height:33px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Customer</span><div style="flex:1"></div><span style="font-size:8.5px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Name</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Segment</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="font-size:8.5px;color:#9787E0;font-style:italic;padding-top:2px">aka: account, buyer, client</div>
            </div>
          </div>
          <div style="position:absolute;left:22px;top:318px;width:150px;background:#fff;border:1px solid #E3DDFB;border-radius:11px;box-shadow:0 5px 16px rgba(124,92,252,0.08);overflow:hidden">
            <div style="height:33px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Region</span><div style="flex:1"></div><span style="font-size:8.5px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Name</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Target</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">money</span></div>
              <div style="font-size:8.5px;color:#9787E0;font-style:italic;padding-top:2px">aka: territory, area, market</div>
            </div>
          </div>
          <div style="position:absolute;left:230px;top:128px;width:168px;background:#fff;border:1.5px solid #3E63DD;border-radius:12px;box-shadow:0 12px 30px rgba(62,99,221,0.18);overflow:hidden">
            <div style="height:36px;background:linear-gradient(135deg,#3E63DD,#5870E8);display:flex;align-items:center;gap:8px;padding:0 12px"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg><span style="font-size:12.5px;font-weight:700;color:#fff">Sales</span><div style="flex:1"></div><span style="font-size:8.5px;color:#C7D3F7;font-weight:600">FACT</span></div>
            <div style="padding:8px 12px 6px"><div style="font-size:9.5px;color:#5C5E63;line-height:1.4;font-style:italic">One row per completed sale</div></div>
            <div style="padding:0 12px 4px"><span style="font-size:8.5px;font-weight:700;color:#1F9D6B;letter-spacing:0.05em">MEASURES</span></div>
            <div style="padding:0 12px;display:flex;flex-direction:column;gap:4px">
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Revenue</span><div style="flex:1"></div><span style="font-size:8px;color:#5C5E63;font-family:ui-monospace,monospace;white-space:nowrap">paid value</span></div>
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Units Sold</span><div style="flex:1"></div><span style="font-size:8px;color:#5C5E63;font-family:ui-monospace,monospace;white-space:nowrap">count</span></div>
              <div style="display:flex;align-items:center;gap:7px"><span style="width:14px;height:14px;border-radius:4px;background:#EAF7F0;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:9px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D;font-weight:500;white-space:nowrap">Discount</span><div style="flex:1"></div><span style="font-size:8px;color:#5C5E63;font-family:ui-monospace,monospace;white-space:nowrap">avg</span></div>
            </div>
            <div style="padding:7px 12px 4px"><span style="font-size:8.5px;font-weight:700;color:#7C5CFC;letter-spacing:0.05em">LINKED TO</span></div>
            <div style="padding:0 12px 10px;display:flex;flex-wrap:wrap;gap:4px">
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Customer</span>
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Product</span>
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Region</span>
              <span style="font-size:9px;color:#6B5BC0;background:#F4F1FE;border:1px solid #E3DDFB;border-radius:5px;padding:2px 6px">Date</span>
            </div>
          </div>
          <div style="position:absolute;left:452px;top:78px;width:138px;background:#fff;border:1px solid #E3DDFB;border-radius:11px;box-shadow:0 5px 16px rgba(124,92,252,0.08);overflow:hidden">
            <div style="height:33px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Product</span><div style="flex:1"></div><span style="font-size:8.5px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Name</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Category</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">text</span></div>
              <div style="font-size:8.5px;color:#9787E0;font-style:italic;padding-top:2px">aka: item, SKU</div>
            </div>
          </div>
          <div style="position:absolute;left:452px;top:318px;width:138px;background:#fff;border:1px solid #E3DDFB;border-radius:11px;box-shadow:0 5px 16px rgba(124,92,252,0.08);overflow:hidden">
            <div style="height:33px;background:#F4F1FE;border-bottom:1px solid #ECE6FD;display:flex;align-items:center;gap:7px;padding:0 11px"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#7C5CFC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg><span style="font-size:11.5px;font-weight:600;color:#1A1C1D">Date</span><div style="flex:1"></div><span style="font-size:8.5px;color:#9787E0;font-weight:600">DIM</span></div>
            <div style="padding:6px 11px 8px;display:flex;flex-direction:column;gap:5px">
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Quarter</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">period</span></div>
              <div style="display:flex;align-items:center;justify-content:space-between"><span style="font-size:10.5px;color:#1A1C1D">Fiscal Year</span><span style="font-size:9px;color:#8E8F91;font-family:ui-monospace,monospace">year</span></div>
              <div style="font-size:8.5px;color:#9787E0;font-style:italic;padding-top:2px">aka: period, calendar</div>
            </div>
          </div>
          <div style="position:absolute;top:14px;left:14px;display:inline-flex;align-items:center;gap:6px;background:#fff;border:1px solid #C8D2F5;border-radius:20px;padding:5px 11px;box-shadow:0 3px 10px rgba(20,22,40,0.06)">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#3E63DD" stroke="none"><path d="M9.94 14.06A2 2 0 0 0 8.5 12.6L2.4 11a.5.5 0 0 1 0-.96L8.5 8.5a2 2 0 0 0 1.44-1.44L11.52 1a.5.5 0 0 1 .96 0l1.58 6.06A2 2 0 0 0 15.5 8.5l6.1 1.58a.5.5 0 0 1 0 .96l-6.1 1.46a2 2 0 0 0-1.44 1.46l-1.58 6.06a.5.5 0 0 1-.96 0z"/></svg>
            <span style="font-size:10.5px;color:#1A1C1D;font-weight:500">Ready to answer questions in plain language</span>
          </div>
          <div style="position:absolute;bottom:14px;right:14px;background:#fff;border:1px solid #EEEFF1;border-radius:8px;padding:6px 11px;display:flex;align-items:center;gap:12px;box-shadow:0 4px 14px rgba(20,22,40,0.08)">
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;background:#3E63DD"></span><span style="font-size:10.5px;color:#1A1C1D">1 fact</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="width:8px;height:8px;border-radius:2px;border:1.5px solid #7C5CFC"></span><span style="font-size:10.5px;color:#1A1C1D">4 dimensions</span></span>
            <span style="display:inline-flex;align-items:center;gap:5px"><span style="font-size:10px;color:#1F9D6B;font-weight:700">∑</span><span style="font-size:10.5px;color:#1A1C1D">3 metrics</span></span>
          </div>
        </div>
      </div>
    </div>` }}
        />
      </div>
      <div style={{ marginTop: "30px", textAlign: "center", fontFamily: "Inter, sans-serif" }}>
        <span style={{ fontSize: "11px", fontWeight: "600", letterSpacing: "0.16em", color: "#8E8F91" }}>
          FROM EVERY SOURCE — ONE TRUSTED ANSWER
        </span>
      </div>
    </div>
  );
}
