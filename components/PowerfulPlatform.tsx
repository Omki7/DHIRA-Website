import Link from "next/link";
import ResponsiveCanvas from "@/components/ResponsiveCanvas";
import ScrollReveal from "@/components/ScrollReveal";
import AkashicLogo from "@/components/AkashicLogo";

export default function PowerfulPlatform() {
  return (
    <section className="w-full overflow-hidden bg-primary-bg pb-20 lg:pb-24 font-sans text-ink">
      {/* ===== CONTENT WIDTH WRAPPER ===== */}
      <div className="rail-container">
        {/* Eyebrow header */}
        <div className="mb-10 flex items-center justify-between border-b border-dashed border-lineSoft pb-4 font-mono text-[11px] uppercase tracking-eyebrow text-inkSoft">
          <span className="flex items-center gap-2">
            <span className="text-overcast">[02]</span>
            <span>/</span>
            <span>MEET AKASHIC</span>
          </span>
          <AkashicLogo
            className="h-9 w-9"
            primaryColor="#0B2A4A"
            accentColor="#0F9CA6"
          />
        </div>

        {/* Headline */}
        <div className="max-w-[940px] pb-[40px] pt-[8px]">
          <ScrollReveal>
            <h2 className="text-balance text-[48px] font-semibold leading-[1.1] tracking-tighter text-ink md:text-[56px] lg:text-[64px]">
              Stop guessing. Get grounded.
            </h2>
            <p className="mt-[14px] text-balance text-[32px] font-semibold leading-[1.1] tracking-tighter text-overcast md:text-[40px] lg:text-[48px]">
              Every shape of data, linked and governed. Answers come from fact, not probability.
            </p>
            <div className="mt-[30px] flex items-center gap-[14px]">
              <Link href="#" className="inline-flex items-center gap-[8px] rounded-[10px] bg-action px-[22px] py-[12px] text-[15px] font-semibold text-white transition-colors hover:bg-action-hover">
                Explore the platform
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="#" className="inline-flex items-center gap-[8px] px-[6px] py-[12px] text-[15px] font-semibold text-ink transition-colors hover:text-action">
                Book a demo
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* ===== SECTION SUBHEADER ===== */}
      <div className="rail-container border-t border-lineSoft pb-[32px] pt-[56px]">
        <ScrollReveal delay={100}>
          <div className="mb-[13px] font-mono text-[11.5px] uppercase tracking-[0.13em] text-inkSoft">
            Six capabilities &middot; one platform
          </div>
          <h3 className="max-w-[760px] text-[30px] font-semibold leading-[1.18] tracking-[-0.02em] text-ink">
            Every shape of data, on one governed foundation.
          </h3>
        </ScrollReveal>
      </div>

      {/* ===== FEATURE ROWS ZONE (full-bleed w/ hatch gutters) ===== */}
      <div className="grid grid-cols-[minmax(16px,1fr)_minmax(0,1280px)_minmax(16px,1fr)] border-b border-t border-lineSoft">
        {/* left hatch gutter */}
        <div
          className="border-r border-lineSoft"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #EDEDF0 0 1px, transparent 1px 8px)" }}
        ></div>

        {/* rows */}
        <div>
          {/* ROW 1 : Data Pipeline + Master Data */}
          <div className="grid border-b border-lineSoft lg:grid-cols-[308px_minmax(0,1fr)_312px]">
            {/* text */}
            <div className="flex flex-col border-r border-lineSoft px-[34px] py-[40px]">
              <h4 className="mb-[14px] text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
                Every source, ingested and governed.
              </h4>
              <p className="text-[16px] leading-[1.6] text-accent-text">
                Connect any data source, structured or not. Akashic ingests it automatically, then resolves
                duplicates into one governed definition for every entity.
              </p>
              <div className="flex-1"></div>
              <div className="group mt-[34px] inline-flex cursor-pointer items-center gap-[7px]">
                <span className="text-[14px] font-semibold text-ink">Explore data pipeline</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-settle ease-settle group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* canvas : ingestion pipeline */}
            <div className="group/canvas relative min-h-[430px] overflow-hidden border-r border-lineSoft bg-[#F8F8FA] transition-colors duration-300 hover:bg-[#F1F2F6]"
                 style={{ backgroundImage: "radial-gradient(circle, #DCDCE0 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
              <ResponsiveCanvas originalWidth={600} originalHeight={400} className="absolute inset-0">
                <svg className="absolute inset-0 h-[400px] w-[600px]" viewBox="0 0 600 400">
                  <path d="M150,83 C 205,83 200,180 250,180" stroke="#C6C6CA" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 7" className="animate-[ps-flow_2.6s_linear_infinite]" />
                  <path d="M150,185 L 250,180" stroke="#C6C6CA" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 7" className="animate-[ps-flow_2.2s_linear_infinite]" />
                  <path d="M150,287 C 205,287 200,180 250,180" stroke="#C6C6CA" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="4 7" className="animate-[ps-flow_2.9s_linear_infinite]" />
                  <path d="M376,180 L 430,180" stroke="#266df2" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="6 7" className="animate-[ps-flow_1.1s_linear_infinite]" />
                </svg>
                {/* source chips */}
                <div className="absolute left-[12px] top-[60px] flex w-[138px] items-center gap-[9px] rounded-[11px] border border-[#E6E6E8] bg-white px-[13px] py-[11px] shadow-[0_3px_10px_rgba(20,22,40,0.05)]">
                  <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#635BFF]">
                    <span className="text-[11px] font-bold text-white">S</span>
                  </div>
                  <div>
                    <div className="text-[12.5px] font-semibold text-ink">Stripe</div>
                    <div className="text-[10px] text-inkSoft">Structured</div>
                  </div>
                </div>
                <div className="absolute left-[12px] top-[162px] flex w-[138px] items-center gap-[9px] rounded-[11px] border border-[#E6E6E8] bg-white px-[13px] py-[11px] shadow-[0_3px_10px_rgba(20,22,40,0.05)]">
                  <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#336791]">
                    <span className="text-[9px] font-bold text-white">PG</span>
                  </div>
                  <div>
                    <div className="text-[12.5px] font-semibold text-ink">Postgres</div>
                    <div className="text-[10px] text-inkSoft">Structured</div>
                  </div>
                </div>
                <div className="absolute left-[12px] top-[264px] flex w-[138px] items-center gap-[9px] rounded-[11px] border border-[#E6E6E8] bg-white px-[13px] py-[11px] shadow-[0_3px_10px_rgba(20,22,40,0.05)]">
                  <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-[7px] bg-[#E8491D]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/></svg>
                  </div>
                  <div>
                    <div className="text-[12.5px] font-semibold text-ink">PDF docs</div>
                    <div className="text-[10px] text-[#C0883A]">Unstructured</div>
                  </div>
                </div>
                {/* akashic hub */}
                <div className="absolute left-[250px] top-[150px] w-[126px] animate-[ps-float_4.5s_ease-in-out_infinite] rounded-[12px] border-[1.5px] border-action bg-white p-[13px] shadow-[0_10px_26px_rgba(38,109,242,0.14)]">
                  <div className="mb-[6px] flex items-center gap-[8px]">
                    <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-[7px] bg-action">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 3 21 12 12 21 3 12Z" stroke="white" strokeWidth="2.1" strokeLinejoin="round"/><path d="M12 8.6 15.4 12 12 15.4 8.6 12Z" fill="white"/></svg>
                    </div>
                    <span className="text-[12.5px] font-bold tracking-[-0.01em] text-ink">Akashic</span>
                  </div>
                  <div className="text-[10.5px] leading-[1.4] text-accent-text">Ingest &middot; clean &middot; resolve</div>
                </div>
                {/* golden output */}
                <div className="absolute left-[430px] top-[156px] w-[134px] rounded-[12px] border border-[#BFE3CE] bg-white px-[13px] py-[12px] shadow-[0_6px_16px_rgba(20,22,40,0.06)] transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(20,22,40,0.16)]">
                  <div className="mb-[5px] flex items-center gap-[6px]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#30A46C" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className="text-[12px] font-semibold text-ink">Governed</span>
                  </div>
                  <div className="text-[10.5px] text-inkSoft">1 source of truth</div>
                </div>
              </ResponsiveCanvas>
              {/* status pill */}
              <div className="absolute bottom-[16px] right-[16px] flex items-center gap-[7px] rounded-[8px] border border-[#BFE3CE] bg-white px-[11px] py-[6px] shadow-[0_3px_12px_rgba(20,22,40,0.07)]">
                <span className="h-[7px] w-[7px] animate-[ps-pulse_2s_infinite] rounded-full bg-[#30A46C]"></span>
                <span className="text-[11px] font-medium text-[#1B7A47]">Syncing live &middot; 0 errors</span>
              </div>
            </div>

            {/* rail : master data / entity resolution */}
            <div className="flex flex-col px-[26px] py-[34px]">
              <div className="mb-[16px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-inkSoft">
                Master data &middot; entity resolution
              </div>
              <div className="flex flex-col gap-[7px]">
                <div className="flex items-center gap-[9px] rounded-[9px] border border-[#ECECEF] bg-[#FCFCFD] px-[11px] py-[9px]">
                  <span className="flex-1 text-[12px] text-tertiary-text">Cartwell Inc.</span>
                  <span className="font-mono text-[9.5px] text-overcast">crm</span>
                </div>
                <div className="flex items-center gap-[9px] rounded-[9px] border border-[#ECECEF] bg-[#FCFCFD] px-[11px] py-[9px]">
                  <span className="flex-1 text-[12px] text-tertiary-text">cartwell ltd</span>
                  <span className="font-mono text-[9.5px] text-overcast">billing</span>
                </div>
                <div className="flex items-center gap-[9px] rounded-[9px] border border-[#ECECEF] bg-[#FCFCFD] px-[11px] py-[9px]">
                  <span className="flex-1 text-[12px] text-tertiary-text">Cartwell Retail</span>
                  <span className="font-mono text-[9.5px] text-overcast">support</span>
                </div>
              </div>
              <div className="flex justify-center pb-[6px] pt-[9px]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C2C7D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
              </div>
              <div className="rounded-[11px] border-[1.5px] border-action bg-gradient-to-b from-[#F6F8FF] to-white px-[14px] py-[13px] shadow-[0_8px_22px_rgba(38,109,242,0.08)] transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(38,109,242,0.22)]">
                <div className="flex items-center gap-[9px]">
                  <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[8px] bg-action">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m20 6-11 11-5-5"/></svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[13px] font-semibold text-ink">Cartwell Inc.</div>
                    <div className="text-[10.5px] font-medium text-action">Golden record &middot; 3 merged</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ROW 2 : Knowledge Graph + Conversational AI */}
          <div className="grid border-b border-lineSoft lg:grid-cols-[308px_minmax(0,1fr)_312px]">
            {/* text */}
            <div className="flex flex-col border-r border-lineSoft px-[34px] py-[40px]">
              <h4 className="mb-[14px] text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
                Everything linked. Every answer grounded.
              </h4>
              <p className="text-[16px] leading-[1.6] text-accent-text">
                Structured tables and unstructured documents live together in one knowledge graph. Ask anything in plain language. The answer comes from fact, and traces back to its source.
              </p>
              <div className="flex-1"></div>
              <div className="group mt-[34px] inline-flex cursor-pointer items-center gap-[7px]">
                <span className="text-[14px] font-semibold text-ink">Explore the graph</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-settle ease-settle group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            {/* canvas : knowledge graph */}
            <div className="group/canvas relative min-h-[430px] overflow-hidden border-r border-lineSoft bg-[#F8F8FA] transition-colors duration-300 hover:bg-[#F1F2F6]"
                 style={{ backgroundImage: "radial-gradient(circle, #DCDCE0 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
              <ResponsiveCanvas originalWidth={600} originalHeight={420} className="absolute inset-0">
                <svg className="absolute inset-0 h-[420px] w-[600px]" viewBox="0 0 600 420">
                  <line x1="300" y1="210" x2="100" y2="75" stroke="#266df2" strokeWidth="1.5" opacity="0.5" className="animate-[ps-linep_3s_ease-in-out_0s_infinite]" />
                  <line x1="300" y1="210" x2="500" y2="79" stroke="#266df2" strokeWidth="1.5" opacity="0.5" className="animate-[ps-linep_3s_ease-in-out_0.4s_infinite]" />
                  <line x1="300" y1="210" x2="100" y2="311" stroke="#C6C6CA" strokeWidth="1.5" className="animate-[ps-linep_3.4s_ease-in-out_0.8s_infinite]" />
                  <line x1="300" y1="210" x2="500" y2="321" stroke="#C6C6CA" strokeWidth="1.5" className="animate-[ps-linep_3.4s_ease-in-out_1.2s_infinite]" />
                  <line x1="300" y1="210" x2="300" y2="385" stroke="#C6C6CA" strokeWidth="1.5" className="animate-[ps-linep_3s_ease-in-out_1.6s_infinite]" />
                </svg>
                {/* center node */}
                <div className="absolute left-[236px] top-[146px] flex h-[128px] w-[128px] origin-center animate-[ps-breathe_4s_ease-in-out_infinite] flex-col items-center justify-center rounded-full border-[1.5px] border-action bg-white shadow-[0_12px_30px_rgba(38,109,242,0.16)]">
                  <div className="mb-[6px] flex h-[30px] w-[30px] items-center justify-center rounded-[8px] bg-action">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 3 21 12 12 21 3 12Z" stroke="white" strokeWidth="2.1" strokeLinejoin="round"/><path d="M12 8.6 15.4 12 12 15.4 8.6 12Z" fill="white"/></svg>
                  </div>
                  <span className="text-[12.5px] font-bold text-ink">Cartwell</span>
                  <span className="text-[9.5px] text-inkSoft">Account</span>
                </div>
                {/* satellites */}
                <div className="absolute left-[36px] top-[50px] flex w-[128px] items-center gap-[8px] rounded-[10px] border border-[#E6E6E8] bg-white px-[11px] py-[9px] shadow-[0_4px_12px_rgba(20,22,40,0.05)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#266df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg>
                  <div><div className="text-[12px] font-semibold text-ink">orders</div><div className="text-[9.5px] text-inkSoft">3.4M rows</div></div>
                </div>
                <div className="absolute left-[436px] top-[54px] flex w-[128px] items-center gap-[8px] rounded-[10px] border border-[#E6E6E8] bg-white px-[11px] py-[9px] shadow-[0_4px_12px_rgba(20,22,40,0.05)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#266df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg>
                  <div><div className="text-[12px] font-semibold text-ink">regions</div><div className="text-[9.5px] text-inkSoft">48 rows</div></div>
                </div>
                <div className="absolute left-[30px] top-[286px] flex w-[138px] items-center gap-[8px] rounded-[10px] border border-[#F1DCE3] bg-white px-[11px] py-[9px] shadow-[0_4px_12px_rgba(20,22,40,0.05)]">
                  <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-[6px] bg-[#E5556F]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/></svg>
                  </div>
                  <div><div className="text-[12px] font-semibold text-ink">Q2 Report</div><div className="text-[9.5px] text-[#D14E72]">Unstructured</div></div>
                </div>
                <div className="absolute left-[436px] top-[296px] flex w-[128px] items-center gap-[8px] rounded-[10px] border border-[#E6E6E8] bg-white px-[11px] py-[9px] shadow-[0_4px_12px_rgba(20,22,40,0.05)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#266df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg>
                  <div><div className="text-[12px] font-semibold text-ink">customers</div><div className="text-[9.5px] text-inkSoft">1.2M rows</div></div>
                </div>
                <div className="absolute left-[236px] top-[360px] flex w-[128px] items-center gap-[8px] rounded-[10px] border border-[#E6E6E8] bg-white px-[11px] py-[9px] shadow-[0_4px_12px_rgba(20,22,40,0.05)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#266df2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M3 15h18M12 3v18"/></svg>
                  <div><div className="text-[12px] font-semibold text-ink">invoices</div><div className="text-[9.5px] text-inkSoft">820K rows</div></div>
                </div>
              </ResponsiveCanvas>
            </div>
            {/* rail : conversational answer */}
            <div className="flex flex-col px-[26px] py-[34px]">
              <div className="mb-[16px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-inkSoft">
                Conversational AI
              </div>
              <div className="mb-[14px] max-w-[90%] self-end rounded-[13px_13px_4px_13px] bg-action px-[13px] py-[9px]">
                <p className="text-[12.5px] leading-[1.5] text-white">Why is the South region behind plan?</p>
              </div>
              <div className="rounded-[13px] border border-[#E6E6E8] bg-white px-[14px] py-[13px] shadow-[0_6px_18px_rgba(20,22,40,0.05)] transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,22,40,0.14)]">
                <div className="mb-[10px] inline-flex items-center gap-[4px] rounded-[6px] bg-[#EAF6EF] px-[8px] py-[3px]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#30A46C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                  <span className="text-[8.5px] font-semibold tracking-[0.04em] text-[#1B7A47]">LINEAGE VERIFIED</span>
                </div>
                <p className="mb-[11px] text-[12.5px] leading-[1.55] text-[#2A2C32]">
                  South is at <strong>71% of target</strong>. Delayed store openings, per the Q2 board report (p.8).
                </p>
                <div className="flex items-center gap-[8px]">
                  <span className="w-[42px] text-[10px] font-semibold text-[#D14E72]">South</span>
                  <div className="h-[9px] flex-1 overflow-hidden rounded-[5px] bg-[#F1F1F3]">
                    <div className="h-full w-[71%] rounded-[5px] bg-[#E76E8E]"></div>
                  </div>
                  <span className="text-[10px] font-bold text-[#D14E72]">71%</span>
                </div>
              </div>
              <div className="mt-[12px] flex items-center gap-[6px] text-inkSoft">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>
                <span className="text-[10.5px]">Traced through 6 lineage hops</span>
              </div>
            </div>
          </div>

          {/* ROW 3 : Business Intelligence + Machine Learning */}
          <div className="grid lg:grid-cols-[308px_minmax(0,1fr)_312px]">
            {/* text */}
            <div className="flex flex-col border-r border-lineSoft px-[34px] py-[40px]">
              <h4 className="mb-[14px] text-[22px] font-semibold leading-[1.25] tracking-[-0.015em] text-ink">
                See right now. Predict what&rsquo;s next.
              </h4>
              <p className="text-[16px] leading-[1.6] text-accent-text">
                Dashboards reflect this moment, not last quarter&rsquo;s export. And every prediction is built on governed data, so what you forecast, you can trust.
              </p>
              <div className="flex-1"></div>
              <div className="group mt-[34px] inline-flex cursor-pointer items-center gap-[7px]">
                <span className="text-[14px] font-semibold text-ink">Explore intelligence</span>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-settle ease-settle group-hover:translate-x-1"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            {/* canvas : BI dashboard */}
            <div className="group/canvas relative min-h-[430px] overflow-hidden border-r border-lineSoft bg-[#F8F8FA] p-[26px] transition-colors duration-300 hover:bg-[#F1F2F6]"
                 style={{ backgroundImage: "radial-gradient(circle, #DCDCE0 1px, transparent 1px)", backgroundSize: "22px 22px" }}>
              <div className="flex h-full flex-col overflow-hidden rounded-[14px] border border-[#E6E6E8] bg-white shadow-[0_12px_34px_rgba(20,22,40,0.08)] transition-all duration-250 ease-settle hover:-translate-y-[3px] hover:shadow-[0_22px_50px_rgba(20,22,40,0.16)]">
                <div className="flex h-[42px] shrink-0 items-center gap-[8px] border-b border-[#EEEFF1] px-[15px]">
                  <span className="text-[13px] font-semibold text-ink">Revenue overview</span>
                  <div className="flex-1"></div>
                  <span className="inline-flex items-center gap-[5px] rounded-[6px] border border-[#BFE3CE] bg-[#EAF6EF] px-[9px] py-[3px]">
                    <span className="h-[6px] w-[6px] animate-[ps-pulse_2s_infinite] rounded-full bg-[#30A46C]"></span>
                    <span className="text-[10.5px] font-medium text-[#1B7A47]">Live</span>
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-[14px] p-[16px]">
                  <div className="grid grid-cols-3 gap-[11px]">
                    <div className="rounded-[10px] border border-[#ECECEF] px-[12px] py-[11px]">
                      <div className="mb-[5px] text-[10px] text-inkSoft">Revenue Q2</div>
                      <div className="text-[19px] font-bold tracking-[-0.02em] text-ink">&#8377;24.6Cr</div>
                      <div className="mt-[2px] text-[10px] font-semibold text-[#1B7A47]">&#9650; 8.2%</div>
                    </div>
                    <div className="rounded-[10px] border border-[#ECECEF] px-[12px] py-[11px]">
                      <div className="mb-[5px] text-[10px] text-inkSoft">Attainment</div>
                      <div className="text-[19px] font-bold tracking-[-0.02em] text-ink">86%</div>
                      <div className="mt-[2px] text-[10px] font-semibold text-[#C0883A]">&#9660; 4 pts</div>
                    </div>
                    <div className="rounded-[10px] border border-[#ECECEF] px-[12px] py-[11px]">
                      <div className="mb-[5px] text-[10px] text-inkSoft">Pipeline</div>
                      <div className="text-[19px] font-bold tracking-[-0.02em] text-ink">&#8377;41Cr</div>
                      <div className="mt-[2px] text-[10px] font-semibold text-[#1B7A47]">&#9650; 12%</div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col rounded-[10px] border border-[#ECECEF] px-[15px] py-[14px]">
                    <div className="mb-auto text-[11px] text-accent-text">Attainment by region &middot; % of target</div>
                    <div className="flex h-[118px] items-end justify-between gap-[12px] px-[4px] pt-[14px]">
                      <div className="flex h-full flex-1 flex-col items-center justify-end gap-[6px]">
                        <div className="h-full w-full max-w-[34px] animate-[ps-grow_0.9s_ease-out_0.05s_both] origin-bottom rounded-t-[5px] bg-[#4CAE8C]"></div>
                        <span className="text-[9.5px] text-inkSoft">North</span>
                      </div>
                      <div className="flex h-full flex-1 flex-col items-center justify-end gap-[6px]">
                        <div className="h-[92%] w-full max-w-[34px] animate-[ps-grow_0.9s_ease-out_0.15s_both] origin-bottom rounded-t-[5px] bg-[#4CAE8C]"></div>
                        <span className="text-[9.5px] text-inkSoft">West</span>
                      </div>
                      <div className="flex h-full flex-1 flex-col items-center justify-end gap-[6px]">
                        <div className="h-[84%] w-full max-w-[34px] animate-[ps-grow_0.9s_ease-out_0.25s_both] origin-bottom rounded-t-[5px] bg-[#E8B14E]"></div>
                        <span className="text-[9.5px] text-inkSoft">Central</span>
                      </div>
                      <div className="flex h-full flex-1 flex-col items-center justify-end gap-[6px]">
                        <div className="h-[68%] w-full max-w-[34px] animate-[ps-grow_0.9s_ease-out_0.35s_both] origin-bottom rounded-t-[5px] bg-[#E76E8E]"></div>
                        <span className="text-[9.5px] font-semibold text-[#D14E72]">South</span>
                      </div>
                      <div className="flex h-full flex-1 flex-col items-center justify-end gap-[6px]">
                        <div className="h-[60%] w-full max-w-[34px] animate-[ps-grow_0.9s_ease-out_0.45s_both] origin-bottom rounded-t-[5px] bg-[#E76E8E]"></div>
                        <span className="text-[9.5px] font-semibold text-[#D14E72]">East</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* rail : ML forecast */}
            <div className="flex flex-col px-[26px] py-[34px]">
              <div className="mb-[16px] font-mono text-[10.5px] uppercase tracking-[0.1em] text-inkSoft">
                Machine learning
              </div>
              <div className="rounded-[13px] border border-[#E6E6E8] bg-white px-[16px] py-[15px] shadow-[0_6px_18px_rgba(20,22,40,0.05)] transition-all duration-250 ease-settle hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(20,22,40,0.14)]">
                <div className="mb-[13px] flex items-center gap-[8px]">
                  <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] bg-gradient-to-br from-action to-[#6E56CF]">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.142 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.142 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/></svg>
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-ink">Q3 revenue forecast</div>
                    <div className="text-[10.5px] text-inkSoft">on governed data</div>
                  </div>
                </div>
                <div className="text-[26px] font-bold tracking-[-0.025em] text-ink">&#8377;27.4Cr</div>
                <div className="my-[3px] mb-[13px] text-[11px] font-semibold text-[#1B7A47]">
                  +11.4% projected &middot; 92% confidence
                </div>
                <svg viewBox="0 0 240 56" className="h-[46px] w-full" preserveAspectRatio="none">
                  <path d="M0,44 L40,40 L80,42 L120,30 L160,26 L200,16 L240,8" stroke="#266df2" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="340" className="animate-[ps-draw_1.8s_ease-out_forwards]" />
                  <path d="M0,44 L40,40 L80,42 L120,30 L160,26 L200,16 L240,8 L240,56 L0,56 Z" fill="#266df2" opacity="0.07" />
                </svg>
                <div className="mt-[4px] flex justify-between">
                  <span className="text-[9.5px] text-overcast">Apr</span>
                  <span className="text-[9.5px] text-overcast">Sep</span>
                </div>
              </div>
              <div className="mt-[12px] flex items-center gap-[6px] text-inkSoft">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                <span className="text-[10.5px]">No leakage &middot; lineage enforced</span>
              </div>
            </div>
          </div>
        </div>

        {/* right hatch gutter */}
        <div
          className="border-l border-lineSoft"
          style={{ backgroundImage: "repeating-linear-gradient(135deg, #EDEDF0 0 1px, transparent 1px 8px)" }}
        ></div>
      </div>
    </section>
  );
}
