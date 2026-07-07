"use client";
import React from 'react';
import Link from 'next/link';
import ScrollRevealRail from '@/components/ui/ScrollRevealRail';
import ScrollReveal from '@/components/ui/ScrollReveal';
import AkashicLogo from '@/components/icons/AkashicLogo';
import DynamicSketchIcon from '@/components/icons/DynamicSketchIcon';
import { ModIcon, HConn, VConn, DropConn, DagConn } from '@/components/demos/mockups/PlatformConnectors';
import PlatformBIChartMockup from '@/components/demos/mockups/PlatformBIChartMockup';

export default function PowerfulPlatform() {
  const accentColor = '#FFFFFF';

  return (
    <section id="platform" className="w-full bg-[#3E63DD] font-sans text-white relative">
      <div className="rail-container relative overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32" style={{ "--accent": accentColor } as React.CSSProperties}>
        <div style={{ '--accent': accentColor, fontFamily: "Inter,sans-serif", color: "#FFFFFF", width: "100%", overflow: "hidden", paddingBottom: "2px" } as React.CSSProperties}>

          {/* ===== HEADLINE ===== */}
          <div style={{ padding: "0 24px" }}>
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", gap: "48px",
              padding: "50px 2px",
              borderTop: "1px solid rgba(255,255,255,0.15)",
              borderBottom: "1px dashed rgba(255,255,255,0.15)"
            }}>
              <div style={{ maxWidth: "940px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.7)" }}>
                  <span><span style={{ color: "rgba(255,255,255,0.4)" }}>[02]</span>&nbsp;&nbsp;Meet Akashic</span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>&nbsp;&nbsp;/&nbsp;&nbsp;The platform</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                  <h2 className="text-[40px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-semibold leading-[1.1] tracking-tighter text-white max-w-[940px] m-0">Stop guessing. Get grounded.</h2>
                  <p className="text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-[1.45] tracking-normal text-white/65 max-w-[640px] m-0">
                    Every shape of data, linked and governed.
                    <br className="hidden md:block" />
                    Answers come from fact, not probability.
                  </p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", height: "100%", flexShrink: 0 }}>
                <AkashicLogo className="h-32 w-32 text-white" primaryColor="#FFFFFF" accentColor="rgba(255,255,255,0.8)" />
                <span style={{ fontSize: "64px", fontWeight: "600", color: "#FFFFFF", marginLeft: "-25px", letterSpacing: "-0.04em", display: "inline-block", transform: "translateY(-3px)" }}>kashic</span>
              </div>
            </div>
          </div>

          {/* ===== THE FLOW ===== */}
          <div style={{ padding: "46px 24px 12px", display: "flex", flexDirection: "column", gap: "64px" }}>

            {/* ══════════ ROW 1: INGEST & UNIFY ══════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[32px] lg:gap-[72px] items-center">

              {/* Row 1 Left — unchanged */}
              <div>
                <div style={{ fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>The platform &middot; end to end</div>
                <h3 style={{ margin: "0 0 20px", fontSize: "28px", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em", color: "#FFFFFF" }}>{"One question,"}<br />{"answered end to end."}</h3>
                <div style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(62,99,221,0.18)",
                  borderRadius: "28px",
                  padding: "8px 10px 8px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  marginBottom: "20px",
                  boxShadow: "0 4px 14px rgba(8,16,60,0.06), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", flex: 1, minWidth: 0 }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#3E63DD" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span style={{ fontSize: "13px", color: "#1A1C1D", fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      &ldquo;Why is the South region behind plan?&rdquo;
                      <span style={{ color: "#3E63DD", fontWeight: "bold", marginLeft: "2px", animation: "ps-caret-blink 1s step-end infinite" }}>|</span>
                    </span>
                  </div>
                  <span style={{
                    background: "#3E63DD",
                    color: "#FFFFFF",
                    fontSize: "9px",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "14px",
                    letterSpacing: "0.06em",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    boxShadow: "0 2px 5px rgba(62,99,221,0.2)",
                    flexShrink: 0
                  }}>
                    ASK
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </span>
                </div>
                <p style={{ margin: "0 0 12px", fontSize: "15px", lineHeight: "1.6", color: "rgba(255,255,255,0.7)" }}>Watch the answer travel one governed path:</p>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px", marginBottom: "20px" }}>
                  {["Unify","Store","Forecast","Visualise"].map((label, i, arr) => (
                    <React.Fragment key={label}>
                      <span style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.25)", color: "#FFFFFF", fontSize: "10.5px", fontWeight: "600", padding: "3px 7px", borderRadius: "5px", textTransform: "uppercase", letterSpacing: "0.03em" }}>{label}</span>
                      {i < arr.length - 1 && <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px" }}>&rarr;</span>}
                    </React.Fragment>
                  ))}
                </div>
                <p style={{ margin: "0 0 34px", fontSize: "15px", lineHeight: "1.6", color: "rgba(255,255,255,0.7)" }}>...and receive an answer in plain language your team can trust.</p>

                {/* Left rail */}
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "6.5px", top: "22px", bottom: "-80px", width: "1.5px", background: "linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) 60%, rgba(255,255,255,0.15) 100%)", borderRadius: "2px" }}>
                    <span style={{ position: "absolute", left: "50%", top: "0", width: "7px", height: "7px", borderRadius: "50%", background: "#FFFFFF", transform: "translate(-50%,-50%)", boxShadow: "0 0 0 4px rgba(255,255,255,0.2)", animation: "ps-pktV 3.4s cubic-bezier(.5,0,.5,1) infinite" }} />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "14px 1fr", columnGap: "18px", alignItems: "center", minHeight: "30px" }}><div /><div style={{ fontFamily: "ui-monospace,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Ingest &amp; Unify</div></div>
                  {[
                    { name: "Data Pipelines", desc: "Connect every source the moment it changes." },
                    { name: "Master Data", desc: "One trusted record per customer, product, and place." },
                  ].map((item) => (
                    <div key={item.name} style={{ display: "grid", gridTemplateColumns: "14px 1fr", columnGap: "18px", alignItems: "start", minHeight: "56px", borderRadius: "11px", transition: "background .18s ease" }} className="hover:bg-white/5">
                      <div style={{ display: "flex", justifyContent: "center", paddingTop: "2px" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "transparent", border: "2px solid rgba(255,255,255,0.45)", display: "flex", marginTop: "3px" }} /></div>
                      <div style={{ paddingRight: "6px" }}><div style={{ fontSize: "15.5px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "-0.01em" }}>{item.name}</div><div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "3px", lineHeight: "1.45" }}>{item.desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 1 Right */}
              <div style={{ position: "relative", animation: "ps-rise .7s cubic-bezier(.22,1,.36,1) both" }}>
                {/* Row label */}
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "#FFFFFF", fontWeight: "600" }}>Ingest &amp; Unify</span>
                  <span style={{ flex: "1", height: "1px", background: "rgba(255,255,255,0.2)" }} />
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>South region &middot; live</span>
                </div>

                <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 max-w-[780px] w-full">

                  {/* ══ DATA PIPELINES CARD ══ */}
                  <div className="ps-mc" id="akashic-data-pipelines" style={{ flex: 1, minWidth: 0, minHeight: "286px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {/* Header */}
                    <div className="ps-mc-hd" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <ModIcon text="Akashic Data Pipelines" />
                      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "1px" }}>
                        <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#1A1C1D", letterSpacing: "-0.01em" }}>Data Pipelines</span>
                        <span style={{ fontSize: "11px", color: "#8E9196" }}>Real-time ingestion</span>
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px", background: "#EDF7F1", border: "1px solid #CBE8D7", borderRadius: "8px" }}>
                        <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#30A46C", animation: "ps-pulse 2s infinite" }} />
                        <span style={{ fontSize: "9px", color: "#1B7A47", fontWeight: "700", letterSpacing: "0.03em" }}>LIVE</span>
                      </span>
                    </div>
                    <div style={{ padding: "0 17px 17px", display: "flex", flexDirection: "column", gap: "12px", flex: 1 }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                        {[
                          { icon: <span style={{ fontSize: "11px", fontWeight: "700", color: "#fff" }}>SF</span>, bg: "#00A1E0", name: "Salesforce", sub: "CRM · accounts & pipeline", rate: "1,240/s", pct: "90%", barColor: "#3E63DD" },
                          { icon: <span style={{ fontSize: "9px", fontWeight: "700", color: "#fff" }}>NS</span>, bg: "#1F2A44", name: "NetSuite", sub: "ERP · orders & revenue", rate: "840/s", pct: "70%", barColor: "#3E63DD" },
                          { icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/></svg>, bg: "#E8491D", name: "Field Reports", sub: "PDF · unstructured parsing", rate: "parsed", pct: "45%", barColor: "#C0883A", rateColor: "#C0883A" },
                        ].map((src) => (
                          <div key={src.name} style={{ display: "flex", alignItems: "center", gap: "11px", border: "1px solid #EEEEF3", borderRadius: "12px", padding: "11px 13px", background: "#FBFBFE" }}>
                            <div style={{ width: "25px", height: "25px", borderRadius: "6px", background: src.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{src.icon}</div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: "13px", fontWeight: "600", color: "#16181D" }}>{src.name}</div>
                              <div style={{ fontSize: "10.5px", color: "#9A9AA0", marginTop: "2px" }}>{src.sub}</div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "end", gap: "5px", flexShrink: 0 }}>
                              <span style={{ fontSize: "11px", fontWeight: "600", color: src.rateColor || "#1A1C1D" }}>{src.rate}</span>
                              <div style={{ width: "60px", height: "4px", background: "#EAEAEF", borderRadius: "2px", overflow: "hidden" }}>
                                <div style={{ width: src.pct, height: "100%", background: src.barColor, borderRadius: "2px" }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div style={{ flex: 1 }}></div>
                      {/* Status footer */}
                      <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        background: "#EBF8F3", 
                        border: "1px solid #CBEFDF", 
                        borderRadius: "10px", 
                        padding: "10px 14px", 
                        marginTop: "4px" 
                      }}>
                        <div style={{ display: "flex", alignItems: "start", gap: "8px" }}>
                          <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#30A46C", marginTop: "5px", flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#1B7A47" }}>4,200 rows/s &middot; 0 errors</div>
                            <div style={{ fontSize: "11px", color: "#4FB582", marginTop: "1px" }}>3 active sources</div>
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "1px", height: "24px", background: "#CBEFDF" }} />
                          <div style={{ display: "flex", flexDirection: "column", alignItems: "end" }}>
                            <div style={{ fontSize: "9px", fontFamily: "ui-monospace,monospace", letterSpacing: "0.08em", color: "#7C828C", fontWeight: "600" }}>LATENCY</div>
                            <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#1B7A47" }}>23ms</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <HConn />

                  {/* ══ MASTER DATA CARD ══ */}
                  <div className="ps-mc" id="akashic-master-data" style={{ flex: 1, minWidth: 0 }}>
                    {/* Header */}
                    <div className="ps-mc-hd" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <ModIcon text="Akashic Master Data" />
                      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "1px" }}>
                        <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#1A1C1D", letterSpacing: "-0.01em" }}>Master Data</span>
                        <span style={{ fontSize: "11px", color: "#8E9196" }}>Entity resolution</span>
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px", background: "#EDF7F1", border: "1px solid #CBE8D7", borderRadius: "8px" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1B7A47" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        <span style={{ fontSize: "9.5px", fontWeight: "700", color: "#1B7A47" }}>98% conf</span>
                      </span>
                    </div>
                    <div style={{ padding: "0 17px 17px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ fontSize: "12px", color: "#86888F", fontWeight: "500", marginTop: "4px", marginBottom: "2px" }}>One entity, three variants</div>
                      {/* Raw source rows — nested card container */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px", background: "#F7F8FA", border: "1px solid #EAEAEF", borderRadius: "10px", padding: "8px 10px" }}>
                        {[
                          { val: '"South Rgn"', src: "salesforce" },
                          { val: '"Region: South"', src: "netsuite" },
                          { val: '"S. District 7"', src: "field app" },
                        ].map((row) => (
                          <div key={row.src} style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#C2C5CC", flexShrink: 0 }} />
                              <span style={{ fontSize: "11.5px", color: "#1A1C1D", fontFamily: "ui-monospace,monospace" }}>{row.val}</span>
                            </div>
                            <span style={{ fontSize: "9px", color: "#7C828C", background: "#F1F2F4", borderRadius: "4px", padding: "2px 6px", fontFamily: "ui-monospace,monospace" }}>{row.src}</span>
                          </div>
                        ))}
                      </div>
                      {/* Merge divider */}
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "4px 0" }}>
                        <div style={{ flex: 1, height: "1px", background: "#EAEAEF" }} />
                        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#1B7A47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                          <span style={{ fontSize: "11px", fontWeight: "600", color: "#6E7178" }}>merged</span>
                        </div>
                        <div style={{ flex: 1, height: "1px", background: "#EAEAEF" }} />
                      </div>
                      {/* Golden record */}
                      <div style={{ border: "1.5px solid #3E63DD", borderRadius: "14px", padding: "14px", background: "linear-gradient(180deg,#F6F8FF,#fff)", boxShadow: "0 6px 18px rgba(62,99,221,0.08)" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                          <div style={{ width: "30px", height: "30px", borderRadius: "6px", background: "#3E63DD", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                          </div>
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontSize: "14.5px", fontWeight: "700", color: "#16181D" }}>South Region</div>
                            <div style={{ fontSize: "11px", color: "#3E63DD", fontWeight: "500", marginTop: "1px" }}>Golden record &middot; 3 sources merged</div>
                          </div>
                        </div>
                        <div style={{ borderTop: "1px dashed #D3D8E8", marginTop: "12px", paddingTop: "11px", display: "flex", gap: "8px" }}>
                          {[{ label: "REGION", val: "SR-07" }, { label: "SITES", val: "42 stores" }, { label: "Q3 TARGET", val: "₹38Cr" }].map((f) => (
                            <div key={f.label} style={{ flex: 1 }}>
                              <div style={{ fontSize: "9px", color: "#9A9AA0", fontFamily: "ui-monospace,monospace", fontWeight: "600" }}>{f.label}</div>
                              <div style={{ fontSize: "13px", color: "#16181D", fontWeight: "700", marginTop: "2px" }}>{f.val}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <VConn />
              </div>
            </div>

            {/* ══════════ ROW 2: STORE & PREDICT ══════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[32px] lg:gap-[72px] items-center">

              {/* Row 2 Left — unchanged */}
              <div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "6.5px", top: "-48px", bottom: "-80px", width: "1.5px", background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0.15) 100%)", borderRadius: "2px" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "14px 1fr", columnGap: "18px", alignItems: "center", minHeight: "30px" }}><div /><div style={{ fontFamily: "ui-monospace,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Store &amp; Predict</div></div>
                  {[
                    { name: "Data Warehouse", desc: "A secure, query-ready home for all of your data." },
                    { name: "Machine Learning", desc: "Forecast revenue, demand, and risk you can trust." },
                  ].map((item) => (
                    <div key={item.name} style={{ display: "grid", gridTemplateColumns: "14px 1fr", columnGap: "18px", alignItems: "start", minHeight: "56px", borderRadius: "11px", transition: "background .18s ease" }} className="hover:bg-white/5">
                      <div style={{ display: "flex", justifyContent: "center", paddingTop: "2px" }}><span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "transparent", border: "2px solid rgba(255,255,255,0.45)", display: "flex", marginTop: "3px" }} /></div>
                      <div style={{ paddingRight: "6px" }}><div style={{ fontSize: "15.5px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "-0.01em" }}>{item.name}</div><div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "3px", lineHeight: "1.45" }}>{item.desc}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 Right */}
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "#FFFFFF", fontWeight: "600" }}>Store &amp; Predict</span>
                  <span style={{ flex: "1", height: "1px", background: "rgba(255,255,255,0.2)" }} />
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>governed features</span>
                </div>

                <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 max-w-[780px] w-full">

                  {/* ══ DATA WAREHOUSE CARD ══ */}
                  <div className="ps-mc" id="akashic-data-warehouse" style={{ flex: 1, minWidth: 0 }}>
                    <div className="ps-mc-hd" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <ModIcon text="Akashic Data Warehouse" />
                      <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "1px" }}>
                        <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#1A1C1D", letterSpacing: "-0.01em" }}>Data Warehouse</span>
                        <span style={{ fontSize: "11px", color: "#8E9196" }}>Medallion architecture</span>
                      </div>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px", background: "#EDF7F1", border: "1px solid #CBE8D7", borderRadius: "8px" }}>
                        <span style={{ fontSize: "9px", color: "#1B7A47", fontWeight: "700", letterSpacing: "0.03em" }}>ACID</span>
                      </span>
                    </div>
                    <div style={{ padding: "16px 17px 17px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      
                      {/* BRONZE */}
                      <div style={{ display: "flex", flexDirection: "column", border: "1px solid #EAD4B3", borderRadius: "13px", padding: "12px 14px", background: "#FCFAF6" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#C0883A" }}></span>
                            <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "9px", letterSpacing: "0.07em", color: "#B07F36", fontWeight: "700" }}>BRONZE</span>
                          </div>
                          <div style={{ fontSize: "13px", color: "#16181D" }}>
                            <span style={{ fontWeight: "700" }}>12.4M</span>
                            <span style={{ color: "#9A9AA0", marginLeft: "4px", fontSize: "10.5px" }}>rows</span>
                          </div>
                        </div>
                        <div style={{ fontSize: "12.5px", color: "#6E6F71", marginTop: "3px" }}>Raw landing zone</div>
                        <div style={{ height: "4px", background: "#DDA653", borderRadius: "2px", marginTop: "10px" }} />
                      </div>

                      {/* Connector 1 */}
                      <div style={{ display: "flex", justifyContent: "center", margin: "1px 0" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CDD0D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M19 12l-7 7-7-7"/>
                        </svg>
                      </div>

                      {/* SILVER */}
                      <div style={{ display: "flex", flexDirection: "column", border: "1px solid #E2E4EB", borderRadius: "13px", padding: "12px 14px", background: "#FFFFFF" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#9AA0AA" }}></span>
                            <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "9px", letterSpacing: "0.07em", color: "#7C828C", fontWeight: "700" }}>SILVER</span>
                          </div>
                          <div style={{ fontSize: "13px", color: "#16181D" }}>
                            <span style={{ fontWeight: "700" }}>9.8M</span>
                            <span style={{ color: "#9A9AA0", marginLeft: "4px", fontSize: "10.5px" }}>rows</span>
                          </div>
                        </div>
                        <div style={{ fontSize: "12.5px", color: "#6E6F71", marginTop: "3px" }}>Cleaned &middot; conformed &middot; deduped</div>
                        <div style={{ height: "4px", background: "#EAEAEF", borderRadius: "2px", overflow: "hidden", marginTop: "10px" }}>
                          <div style={{ width: "75%", height: "100%", background: "#AFB4C0", borderRadius: "2px" }} />
                        </div>
                      </div>

                      {/* Connector 2 */}
                      <div style={{ display: "flex", justifyContent: "center", margin: "1px 0" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#CDD0D6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 5v14M19 12l-7 7-7-7"/>
                        </svg>
                      </div>

                      {/* GOLD */}
                      <div style={{ display: "flex", flexDirection: "column", border: "1.5px solid #3E63DD", borderRadius: "13px", padding: "12px 14px", background: "linear-gradient(180deg,#F6F8FF,#fff)", boxShadow: "0 6px 18px rgba(62,99,221,0.08)" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#3E63DD" }}></span>
                            <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "9px", letterSpacing: "0.07em", color: "#3E63DD", fontWeight: "700" }}>GOLD</span>
                            <span style={{ display: "inline-flex", fontSize: "9px", color: "#3E63DD", background: "#EEF1FC", border: "1px solid #C8D2F5", borderRadius: "4px", padding: "1px 5px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.02em" }}>governed</span>
                          </div>
                          <div style={{ fontSize: "13px", color: "#16181D" }}>
                            <span style={{ fontWeight: "700" }}>1.2M</span>
                            <span style={{ color: "#9A9AA0", marginLeft: "4px", fontSize: "10.5px" }}>entities</span>
                          </div>
                        </div>
                        <div style={{ fontSize: "12.5px", color: "#3E63DD", fontWeight: "600", marginTop: "3px" }}>Governed serving layer</div>
                        <div style={{ height: "4px", background: "#E2E7FC", borderRadius: "2px", overflow: "hidden", marginTop: "10px" }}>
                          <div style={{ width: "12%", height: "100%", background: "#3E63DD", borderRadius: "2px" }} />
                        </div>
                      </div>

                    </div>
                  </div>

                  <HConn />
                  {/* ══ MACHINE LEARNING CARD ══ */}
                  <div className="ps-mc" id="akashic-machine-learning" style={{ flex: 1, minWidth: 0 }}>
                    <div className="ps-mc-hd" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <ModIcon text="Akashic Machine Learning" />
                       <div style={{ display: "flex", flexDirection: "column", flex: 1, gap: "1px" }}>
                        <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#1A1C1D", letterSpacing: "-0.01em" }}>Machine Learning</span>
                        <span style={{ fontSize: "11px", color: "#8E9196" }}>Q3 revenue forecast</span>
                      </div>
                    </div>
                    <div style={{ padding: "16px 17px 17px", display: "flex", flexDirection: "column", gap: "10px" }}>
                      <div style={{ fontSize: "9px", fontFamily: "ui-monospace,monospace", letterSpacing: "0.08em", color: "#8E9196", fontWeight: "600" }}>FORECAST &middot; BOOSTED TREES</div>
                      <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                        <span style={{ fontSize: "32px", fontWeight: "750", color: "#16181D", letterSpacing: "-0.025em" }}>&#8377;27.4Cr</span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "4px 8px", background: "#EDF7F1", border: "1px solid #CBE8D7", borderRadius: "8px", fontSize: "9.5px", fontWeight: "700", color: "#1B7A47", whiteSpace: "nowrap" }}>92% confidence</span>
                      </div>
                      <div style={{ fontSize: "12.5px", color: "#1B7A47", fontWeight: "600", marginTop: "-4px" }}>&rarr; +11.4% projected vs Q2</div>
                      
                      {/* Chart container */}
                      <div style={{ border: "1px solid #EAEAEF", borderRadius: "10px", padding: "12px 14px", background: "#FFFFFF", marginTop: "4px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "8px" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10.5px", color: "#54565F", fontWeight: "500" }}>
                            <span style={{ width: "12px", height: "2.5px", background: "#3E63DD", display: "inline-block", borderRadius: "1px" }} />
                            Actual
                          </span>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "10.5px", color: "#54565F", fontWeight: "500" }}>
                            <span style={{ width: "12px", height: "0", borderTop: "2.5px dashed #3E63DD", display: "inline-block" }} />
                            Forecast
                          </span>
                        </div>
                        <div style={{ flex: 1, position: "relative", minHeight: "75px" }}>
                          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 240 100" preserveAspectRatio="none">
                            <line x1="0" y1="28" x2="240" y2="28" stroke="#F1F1F4" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
                            <line x1="0" y1="62" x2="240" y2="62" stroke="#F1F1F4" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
                            <line x1="120" y1="6" x2="120" y2="94" stroke="#CFD2D9" strokeWidth="1" strokeDasharray="3 3" vectorEffect="non-scaling-stroke"/>
                            <path d="M0,72 L48,66 L96,68 L120,58" fill="none" stroke="#3E63DD" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
                            <path d="M120,58 L168,46 L216,32 L240,24" fill="none" stroke="#3E63DD" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" vectorEffect="non-scaling-stroke"/>
                          </svg>
                          <span style={{ position: "absolute", right: "-3px", top: "24%", transform: "translateY(-50%)", width: "9px", height: "9px", borderRadius: "50%", background: "#3E63DD", border: "2px solid #fff", boxShadow: "0 1px 5px rgba(62,99,221,0.55)" }}></span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}><span style={{ fontSize: "9.5px", color: "#B0B0B5" }}>Apr</span><span style={{ fontSize: "9.5px", color: "#3E63DD", fontWeight: "600" }}>now</span><span style={{ fontSize: "9.5px", color: "#B0B0B5" }}>Sep</span></div>
                      </div>

                      {/* Footer info */}
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", color: "#9A9AA0", borderTop: "1px solid #F0F0F3", paddingTop: "11px", marginTop: "4px" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#30A46C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        <span style={{ fontSize: "11px", flex: 1, color: "#7C828C" }}>No leakage &middot; lineage enforced</span>
                        <span style={{ fontSize: "9px", fontFamily: "ui-monospace,monospace", color: "#6E6F71", background: "#F6F6F8", border: "1px solid #EEEEF3", borderRadius: "5px", padding: "2px 7px" }}>MAPE 4.2%</span>
                      </div>
                    </div>
                  </div>
                  <VConn />
                </div>

              </div>
            </div>

            {/* ══════════ ROW 3: EXPLORE & ASK ══════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[32px] lg:gap-[72px] items-center">

              {/* Row 3 Left — unchanged */}
              <div>
                <div style={{ position: "relative" }}>
                  <div style={{ position: "absolute", left: "6.5px", top: "-48px", bottom: "22px", width: "1.5px", background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.8) 100%)", borderRadius: "2px" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "14px 1fr", columnGap: "18px", alignItems: "center", minHeight: "30px" }}><div /><div style={{ fontFamily: "ui-monospace,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>Explore &amp; Ask</div></div>
                  {[
                    { name: "Business Intelligence", desc: "Live dashboards that refresh with no manual exports." },
                    { name: "Ask AI", desc: "Plain language answers, returned with their sources.", dark: true },
                  ].map((item) => (
                    <div key={item.name} style={{ display: "grid", gridTemplateColumns: "14px 1fr", columnGap: "18px", alignItems: "start", minHeight: "56px", borderRadius: "11px", transition: "background .18s ease" }} className="hover:bg-white/5">
                      <div style={{ display: "flex", justifyContent: "center", paddingTop: "2px" }}>
                        <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.dark ? "#1A1C1D" : "transparent", border: "2px solid #FFFFFF", display: "flex", marginTop: "3px", boxShadow: item.dark ? "0 0 0 3px rgba(26,28,29,0.15)" : "none" }} />
                      </div>
                      <div style={{ paddingRight: "6px" }}>
                        <div style={{ fontSize: "15.5px", fontWeight: "600", color: "#FFFFFF", letterSpacing: "-0.01em" }}>{item.name}</div>
                        <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)", marginTop: "3px", lineHeight: "1.45" }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 3 Right */}
              <div style={{ position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "10.5px", letterSpacing: "0.13em", textTransform: "uppercase", color: "#FFFFFF", fontWeight: "600" }}>Explore &amp; Ask</span>
                  <span style={{ flex: "1", height: "1px", background: "rgba(255,255,255,0.2)" }} />
                  <span style={{ fontFamily: "ui-monospace,monospace", fontSize: "10px", color: "rgba(255,255,255,0.5)" }}>ready to act on</span>
                </div>

                <div className="relative flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 max-w-[780px] w-full">
                  <PlatformBIChartMockup id="akashic-bi" />

                  <HConn />
                  {/* ══ ASK AI CARD (dark) ══ */}
                  <div className="ps-mc-dark relative" id="akashic-knowledge" style={{ flex: 1, minWidth: 0 }}>
                    <div id="akashic-insights" className="absolute -top-24" />
                    <div className="ps-mc-hd">
                      <ModIcon text="Akashic Knowledge" light />
                      <span style={{ fontSize: "14.5px", fontWeight: "600", color: "#FFFFFF", flex: 1, letterSpacing: "-0.01em" }}>Ask AI</span>
                    </div>
                    <div style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
                    <div style={{ padding: "14px 20px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
                      {/* User bubble */}
                      <div style={{ alignSelf: "flex-end", maxWidth: "90%", background: "#3E63DD", borderRadius: "12px 12px 4px 12px", padding: "9px 13px" }}>
                        <p style={{ margin: 0, fontSize: "12.5px", color: "#fff", lineHeight: "1.45" }}>Why is the South region behind plan?</p>
                      </div>
                      {/* Answer */}
                      <div style={{ background: "#23252D", border: "1px solid #31333C", borderRadius: "12px", padding: "13px", flex: 1, display: "flex", flexDirection: "column" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "11px" }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7E97F5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="1.4"/><circle cx="5" cy="12" r="1.4"/><circle cx="5" cy="18" r="1.4"/><path d="M6.5 6H13a3 3 0 0 1 3 3v0"/><path d="M6.5 12H17"/><path d="M6.5 18H13a3 3 0 0 0 3-3v0"/></svg>
                          <span style={{ fontSize: "10px", color: "#9A9DA8", flex: 1 }}>Reasoned over 3 governed sources</span>
                        </div>
                        <p style={{ margin: "0 0 12px", fontSize: "12.5px", color: "#E8E9EE", lineHeight: "1.5" }}>South is at <strong style={{ color: "#fff" }}>71% of target</strong>. Delayed store openings reduced attainment, according to the Q2 board report.</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "42px", fontSize: "9.5px", color: "#E76E8E", fontWeight: 600 }}>South</span><div style={{ flex: 1, height: "8px", background: "#31333C", borderRadius: "5px", overflow: "hidden" }}><div style={{ width: "71%", height: "100%", background: "#E76E8E", borderRadius: "5px" }}></div></div><span style={{ fontSize: "9.5px", color: "#E76E8E", fontWeight: 700 }}>71%</span></div>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}><span style={{ width: "42px", fontSize: "9.5px", color: "#9A9DA8" }}>Plan</span><div style={{ flex: 1, height: "8px", background: "#31333C", borderRadius: "5px", overflow: "hidden" }}><div style={{ width: "100%", height: "100%", background: "#54565F", borderRadius: "5px" }}></div></div><span style={{ fontSize: "9.5px", color: "#9A9DA8", fontWeight: 600 }}>100%</span></div>
                        </div>
                        <div style={{ flex: 1 }}></div>
                        <div style={{ display: "flex", alignItems: "center", gap: "7px", flexWrap: "wrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "3px 8px", background: "rgba(48,164,108,0.16)", borderRadius: "6px" }}><svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#4FD693" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span style={{ fontSize: "9px", fontWeight: 600, color: "#4FD693", letterSpacing: "0.03em" }}>LINEAGE VERIFIED</span></span>
                          <span style={{ fontSize: "9.5px", color: "#9A9DA8", background: "#31333C", borderRadius: "6px", padding: "3px 8px", fontFamily: "ui-monospace,monospace" }}>Q2 Report &middot; p8</span>
                          <span style={{ fontSize: "9.5px", color: "#9A9DA8", background: "#31333C", borderRadius: "6px", padding: "3px 8px", fontFamily: "ui-monospace,monospace" }}>gold.regions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DropConn />
              </div>

            </div>

            {/* ══════════ ROW 4: GOVERNANCE FOUNDATION ══════════ */}
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-[32px] lg:gap-[72px] items-center">

              {/* Row 4 Left — unchanged */}
              <div>
                <h3 style={{ fontSize: "28px", lineHeight: "1.2", fontWeight: "600", letterSpacing: "-0.02em", color: "#FFFFFF", textWrap: "balance" }}>
                  Every answer is traceable,
                  <br className="hidden sm:block" />
                  trustworthy, and ready to act on.
                </h3>
                <p style={{ margin: "12px 0 0", fontSize: "15px", lineHeight: "1.6", color: "rgba(255,255,255,0.7)" }}>
                  Ask your data anything. Agents act on the answer,
                  <br className="hidden sm:block" />
                  all on the same governed foundation.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "24px" }}>
                  <Link href="#platform" className="btn-secondary" style={{ color: "#16181D" }}>Explore the platform</Link>
                  <Link href="#get-started" className="btn-ghost" style={{ color: "#FFFFFF" }}>Book a demo</Link>
                </div>
              </div>

              {/* Row 4 Right */}
              <div style={{ maxWidth: "780px", width: "100%" }}>
                {/* ══ GOVERNANCE FOUNDATION PANEL ══ */}
                <div id="akashic-data-governance" style={{ border: "1px solid #DDE0EE", borderRadius: "16px", background: "linear-gradient(180deg,#FCFCFE,#F8F9FD)", boxShadow: "0 1px 2px rgba(17,18,38,0.04), 0 24px 52px -22px rgba(17,18,38,0.18), inset 0 1px 0 rgba(255,255,255,0.9)", position: "relative", overflow: "hidden" }}>
                  {/* Top accent line */}
                  <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: "2px", background: "linear-gradient(90deg,transparent,#3E63DD,transparent)", opacity: 0.45 }} />

                  <div style={{ padding: "18px 20px 20px" }}>
                    {/* Header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                        <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "#EEF0FC", border: "1px solid rgba(62,99,221,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <DynamicSketchIcon text="Akashic Data Governance" className="w-4 h-4 text-[#3E63DD]" />
                        </div>
                        <div>
                          <span style={{ fontSize: "14.5px", fontWeight: "700", color: "#1A1C1D", letterSpacing: "-0.01em", display: "block" }}>Data Governance</span>
                          <span style={{ fontSize: "10.5px", color: "#54565F", fontWeight: "600", fontFamily: "ui-monospace,monospace" }}>Foundation layer &middot; always on</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "7px", flexWrap: "wrap" }}>
                        {[
                          { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1B7A47" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>, label: "Lineage verified" },
                          { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3A3C42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>, label: "PII masked" },
                          { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3A3C42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6"/></svg>, label: "Role-based access" },
                          { icon: <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#3A3C42" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 14h6M9 17h4"/></svg>, label: "Full audit log" },
                        ].map((b) => (
                          <span key={b.label} style={{ display: "inline-flex", alignItems: "center", gap: "5px", padding: "5px 10px", background: "#fff", border: "1px solid #DDE0EE", borderRadius: "7px", fontSize: "11px", fontWeight: "600", color: "#3A3C42", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                            {b.icon}{b.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* ══ Horizontal lineage DAG (OpenMetadata style) ══ */}
                    <div style={{ marginTop: "18px", background: "#FAFBFE", border: "1px solid #ECEDF4", borderRadius: "12px", padding: "16px 18px" }}>
                      <div style={{ fontSize: "9.5px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.11em", color: "#54565F", marginBottom: "14px", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span>Lineage Trace</span>
                        <span style={{ flex: 1, height: "1px", background: "rgba(0,0,0,0.08)" }} />
                        <span style={{ fontWeight: "700", textTransform: "none", letterSpacing: "0", color: "#3E63DD" }}>Q3 Revenue Forecast</span>
                      </div>

                      {/* DAG nodes row */}
                      <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0">

                        {/* Node 1: Source Systems */}
                        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E5E7F0", borderRadius: "10px", padding: "12px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#EEF0FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <DynamicSketchIcon text="Sources" className="w-[9px] h-[9px] text-[#3E63DD]" />
                            </div>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#1A1C1D" }}>Source Systems</span>
                          </div>
                          <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
                            <span style={{ fontSize: "9px", background: "#00A1E0", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>Salesforce</span>
                            <span style={{ fontSize: "9px", background: "#1F2A44", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>NetSuite</span>
                            <span style={{ fontSize: "9px", background: "#E8491D", color: "#fff", padding: "2px 6px", borderRadius: "4px", fontWeight: "600" }}>Field App</span>
                          </div>
                        </div>

                        <DagConn />

                        {/* Node 2: Master Data */}
                        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E5E7F0", borderRadius: "10px", padding: "12px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#EEF0FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <DynamicSketchIcon text="Master Data" className="w-[9px] h-[9px] text-[#3E63DD]" />
                            </div>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#1A1C1D" }}>Master Data</span>
                          </div>
                          <div style={{ fontSize: "10.5px", color: "#54565F", fontWeight: "600" }}>Entity resolved</div>
                          <div style={{ fontSize: "9.5px", color: "#1B7A47", fontWeight: "700", marginTop: "3px" }}>98% confidence</div>
                        </div>

                        <DagConn />

                        {/* Node 3: Knowledge Graph */}
                        <div style={{ flex: 1, background: "#FFFFFF", border: "1px solid #E5E7F0", borderRadius: "10px", padding: "12px 14px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#EEF0FC", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <DynamicSketchIcon text="Knowledge Graph" className="w-[9px] h-[9px] text-[#3E63DD]" />
                            </div>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#1A1C1D" }}>Knowledge Graph</span>
                          </div>
                          <div style={{ fontSize: "10.5px", color: "#54565F", fontWeight: "600" }}>Revenue concepts</div>
                          <div style={{ fontSize: "9.5px", color: "#3E63DD", fontWeight: "700", marginTop: "3px" }}>Semantically unified</div>
                        </div>

                        <DagConn />

                        {/* Node 4: Dashboard — verified */}
                        <div style={{ flex: 1, background: "#FFFFFF", border: "1.5px solid #A2E0C1", borderRadius: "10px", padding: "12px 14px", boxShadow: "0 2px 8px rgba(48,164,108,0.06)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "6px" }}>
                            <div style={{ width: "18px", height: "18px", borderRadius: "4px", background: "#EDF7F1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1B7A47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                            </div>
                            <span style={{ fontSize: "11.5px", fontWeight: "700", color: "#1A1C1D" }}>Q3 Dashboard</span>
                          </div>
                          <div style={{ fontSize: "10.5px", color: "#1B7A47", fontWeight: "700" }}>Answer verified</div>
                          <div style={{ fontSize: "9.5px", color: "#54565F", fontWeight: "600", marginTop: "3px" }}>Lineage: 4 hops</div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
