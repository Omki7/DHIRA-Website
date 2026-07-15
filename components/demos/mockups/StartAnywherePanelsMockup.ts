/**
 * SIMULATED PRODUCT UI — not real Akashic app code.
 * Wireframe stage panels for the "Meet the modules" walkthrough
 * (AkashicModular, /akashic [02]); consumed via dangerouslySetInnerHTML by
 * StartAnywhereWalkthroughMockup. Stages: pipelines, master data, warehouse,
 * ml, ask akashic, bi (governance stage is JSX in the mockup component).
 *
 * Readability contract for these panels: mono text only (no handwriting),
 * nothing under 11.5px, no colour lighter than #6F7988, strokes 1.2px+.
 * One idea per column, three visual groups per panel at most.
 */

export const PANEL_SVGS: string[] = [
// stage 01 — pipelines
`<svg viewBox="0 0 1140 600" preserveAspectRatio="xMidYMid meet" fill="none" style="width:100%; height:100%; display:block" font-family="'Google Sans Mono',ui-monospace,monospace">
  <text data-d="1" x="24" y="42" font-size="12" font-weight="600" letter-spacing="0.12em" fill="#6F7988">SOURCES</text>
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="1" x="24" y="60" width="240" height="92" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="196" width="240" height="92" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="332" width="240" height="92" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="468" width="240" height="92" rx="6" fill="#FFFFFF"></rect>
  </g>
  <g data-d="2" fill="#1A1C1D">
    <text x="42" y="92" font-size="15" font-weight="600">CRM System</text>
    <text x="42" y="115" font-size="12" fill="#6F7988">structured &middot; nightly sync</text>
    <text x="42" y="137" font-size="12.5" fill="#5C5E63">cust record #4471</text>
    <text x="42" y="228" font-size="15" font-weight="600">ERP Ledger</text>
    <text x="42" y="251" font-size="12" fill="#6F7988">structured &middot; live feed</text>
    <text x="42" y="273" font-size="12.5" fill="#5C5E63">acct #4471-B &middot; same tax_id</text>
    <text x="42" y="364" font-size="15" font-weight="600">Invoice PDF</text>
    <text x="42" y="387" font-size="12" fill="#6F7988">document &middot; parsed</text>
    <text x="42" y="409" font-size="12.5" fill="#5C5E63">bill-to: same customer</text>
    <text x="42" y="500" font-size="15" font-weight="600">Live Feeds</text>
    <text x="42" y="523" font-size="12" fill="#6F7988">streaming &middot; events, telemetry</text>
    <text x="42" y="545" font-size="12.5" fill="#5C5E63">order.status events</text>
  </g>
  <g data-d="2">
    <rect x="168" y="76" width="82" height="22" rx="11" stroke="#3E63DD" stroke-width="1.2" fill="#EEF1FC"></rect>
    <text x="209" y="91" font-size="11.5" fill="#3E63DD" text-anchor="middle">customer</text>
    <rect x="168" y="212" width="82" height="22" rx="11" stroke="#3E63DD" stroke-width="1.2" fill="#EEF1FC"></rect>
    <text x="209" y="227" font-size="11.5" fill="#3E63DD" text-anchor="middle">customer</text>
    <rect x="168" y="348" width="82" height="22" rx="11" stroke="#3E63DD" stroke-width="1.2" fill="#EEF1FC"></rect>
    <text x="209" y="363" font-size="11.5" fill="#3E63DD" text-anchor="middle">customer</text>
  </g>
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" fill="none">
    <path data-d="3" d="M264 106 C302 106 306 150 336 158 M336 158 l-10 -6 M336 158 l-9 5"></path>
    <path data-d="3" d="M264 242 C302 242 306 242 336 246 M336 246 l-10 -6 M336 246 l-9 5"></path>
    <path data-d="3" d="M264 378 C302 378 306 338 336 330 M336 330 l-10 -4 M336 330 l-8 7"></path>
    <path data-d="3" d="M264 514 C302 514 306 424 336 414 M336 414 l-10 -3 M336 414 l-7 8"></path>
  </g>
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="4" x="340" y="60" width="310" height="500" rx="6" fill="#FFFFFF"></rect>
    <path data-d="4" d="M340 110 H650" stroke-width="1"></path>
  </g>
  <text data-d="4" x="360" y="94" font-size="13.5" font-weight="600" letter-spacing="0.08em" fill="#1A1C1D">AKASHIC PIPELINES</text>
  <g data-d="5">
    <text x="360" y="154" font-size="12" font-weight="600" fill="#6F7988">01</text>
    <text x="390" y="154" font-size="14" font-weight="600" fill="#1A1C1D">EXTRACT &amp; PARSE</text>
    <text x="390" y="176" font-size="12" fill="#5C5E63">files, tables, streams &rarr; typed rows</text>
    <text x="360" y="250" font-size="12" font-weight="600" fill="#6F7988">02</text>
    <text x="390" y="250" font-size="14" font-weight="600" fill="#1A1C1D">QUALITY CHECKS</text>
    <text x="390" y="272" font-size="12" fill="#5C5E63">schema &middot; types &middot; nulls &middot; duplicates</text>
    <text x="360" y="346" font-size="12" font-weight="600" fill="#6F7988">03</text>
    <text x="390" y="346" font-size="14" font-weight="600" fill="#1A1C1D">CONTRACT STAMP</text>
    <text x="390" y="368" font-size="12" fill="#5C5E63">every record versioned &middot; contract v3</text>
  </g>
  <g data-d="5" stroke="#2F3132" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M368 192 V226 M368 226 l-5 -7 M368 226 l5 -7"></path>
    <path d="M368 288 V322 M368 322 l-5 -7 M368 322 l5 -7"></path>
  </g>
  <g data-d="6" data-pop="1" style="color:#3E63DD" fill="none">
    <circle cx="616" cy="149" r="9" stroke="currentColor" stroke-width="1.5"></circle>
    <path d="M611.5 149 l3.5 4 l6 -8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="616" cy="245" r="9" stroke="currentColor" stroke-width="1.5"></circle>
    <path d="M611.5 245 l3.5 4 l6 -8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="616" cy="341" r="9" stroke="currentColor" stroke-width="1.5"></circle>
    <path d="M611.5 341 l3.5 4 l6 -8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
  <path data-d="6" d="M356 404 H634" stroke="#6F7988" stroke-width="1" stroke-dasharray="4 4"></path>
  <g data-d="6">
    <text x="360" y="440" font-size="12.5" font-weight="600" fill="#3E63DD">FLAGGED &middot; tax_id missing</text>
    <text x="360" y="464" font-size="12" fill="#6F7988">quarantined &middot; never reaches storage</text>
  </g>
  <g stroke="#2F3132" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path data-d="7" d="M650 310 H716 M716 310 l-11 -6 M716 310 l-11 6" stroke-width="1.8"></path>
    <rect data-d="7" x="724" y="60" width="392" height="500" rx="6" fill="#FFFFFF" stroke-width="1.6"></rect>
    <path data-d="7" d="M724 110 H1116" stroke-width="1"></path>
  </g>
  <text data-d="7" x="744" y="94" font-size="13.5" font-weight="600" letter-spacing="0.08em" fill="#1A1C1D">VALIDATED STORAGE</text>
  <g data-d="8">
    <text x="744" y="150" font-size="13" fill="#1A1C1D">orders_raw</text><text x="1096" y="150" font-size="12" fill="#6F7988" text-anchor="end">typed &middot; 14 cols</text>
    <text x="744" y="186" font-size="13" fill="#1A1C1D">events_stream</text><text x="1096" y="186" font-size="12" fill="#6F7988" text-anchor="end">time-ordered</text>
    <text x="744" y="222" font-size="13" fill="#1A1C1D">docs_extracted</text><text x="1096" y="222" font-size="12" fill="#6F7988" text-anchor="end">parsed fields</text>
  </g>
  <rect data-d="8" x="744" y="262" width="352" height="254" rx="6" stroke="#3E63DD" stroke-width="1.8" fill="#F5F7FE"></rect>
  <g data-d="9">
    <text x="768" y="298" font-size="13" font-weight="600" letter-spacing="0.04em" fill="#3E63DD">ONE CUSTOMER &middot; THREE RECORDS</text>
    <text x="768" y="338" font-size="13" fill="#1A1C1D">CRM &middot; cust record #4471</text>
    <text x="768" y="372" font-size="13" fill="#1A1C1D">ERP &middot; acct #4471-B &middot; same tax_id</text>
    <text x="768" y="406" font-size="13" fill="#1A1C1D">PDF &middot; bill-to &middot; not matched yet</text>
  </g>
  <path data-d="9" d="M768 434 H1072" stroke="#3E63DD" stroke-width="0.9" stroke-dasharray="4 4"></path>
  <text data-d="9" x="768" y="468" font-size="13" font-weight="600" fill="#3E63DD">&rarr; merged into one in Module 02</text>
</svg>`,
// stage 02 — master data
`<svg viewBox="0 0 1140 600" preserveAspectRatio="xMidYMid meet" fill="none" style="width:100%; height:100%; display:block" font-family="'Google Sans Mono',ui-monospace,monospace">
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="1" x="24" y="60" width="290" height="132" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="234" width="290" height="132" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="408" width="290" height="132" rx="6" fill="#FFFFFF"></rect>
    <path data-d="1" d="M24 96 H314 M24 270 H314 M24 444 H314" stroke-width="1"></path>
  </g>
  <g data-d="2">
    <text x="44" y="86" font-size="13.5" font-weight="600" fill="#1A1C1D">CUSTOMER #4471</text><text x="294" y="86" font-size="12" fill="#6F7988" text-anchor="end">src: CRM</text>
    <text x="44" y="126" font-size="12.5" fill="#6F7988">tax_id</text><text x="134" y="126" font-size="12.5" fill="#1A1C1D">94-2404110</text>
    <text x="44" y="152" font-size="12.5" fill="#6F7988">address</text><text x="134" y="152" font-size="12.5" fill="#1A1C1D">500 Harbor Blvd</text>
    <text x="44" y="178" font-size="12.5" fill="#6F7988">status</text><text x="134" y="178" font-size="12.5" fill="#1A1C1D">active</text>
  </g>
  <g data-d="2">
    <text x="44" y="260" font-size="13.5" font-weight="600" fill="#1A1C1D">CUSTOMER #4471-B</text><text x="294" y="260" font-size="12" fill="#6F7988" text-anchor="end">src: ERP</text>
    <text x="44" y="300" font-size="12.5" fill="#6F7988">tax_id</text><text x="134" y="300" font-size="12.5" fill="#1A1C1D">94-2404110</text>
    <text x="44" y="326" font-size="12.5" fill="#6F7988">address</text><text x="134" y="326" font-size="12.5" fill="#1A1C1D">500 Harbor Blvd, Ste 2</text>
    <text x="44" y="352" font-size="12.5" fill="#6F7988">terms</text><text x="134" y="352" font-size="12.5" fill="#1A1C1D">net-45</text>
  </g>
  <g data-d="2">
    <text x="44" y="434" font-size="13.5" font-weight="600" fill="#1A1C1D">CUST. (UNMATCHED)</text><text x="294" y="434" font-size="12" fill="#6F7988" text-anchor="end">src: PDF</text>
    <text x="44" y="474" font-size="12.5" fill="#6F7988">tax_id</text><text x="134" y="474" font-size="12.5" fill="#1A1C1D">&mdash;</text>
    <text x="44" y="500" font-size="12.5" fill="#6F7988">address</text><text x="134" y="500" font-size="12.5" fill="#1A1C1D">500 HARBOR BLVD</text>
    <text x="44" y="526" font-size="12.5" fill="#6F7988">phone</text><text x="134" y="526" font-size="12.5" fill="#1A1C1D">+1 415 555-0117</text>
  </g>
  <g stroke="#2F3132" stroke-width="1.5" stroke-linecap="round" fill="none">
    <path data-d="3" d="M314 126 C430 126 480 240 600 268"></path>
    <path data-d="3" d="M314 300 C430 300 480 294 600 292"></path>
    <path data-d="3" d="M314 474 C430 474 480 342 600 316"></path>
  </g>
  <g data-d="4" data-pop="1">
    <rect x="372" y="139" width="160" height="26" rx="13" stroke="#C2C7CE" stroke-width="1.1" fill="#FFFFFF"></rect>
    <text x="452" y="156" font-size="12" fill="#5C5E63" text-anchor="middle">tax_id &middot; exact match</text>
  </g>
  <g data-d="4" data-pop="1">
    <rect x="358" y="283" width="186" height="26" rx="13" stroke="#C2C7CE" stroke-width="1.1" fill="#FFFFFF"></rect>
    <text x="451" y="300" font-size="12" fill="#5C5E63" text-anchor="middle">address similarity 0.97</text>
  </g>
  <g data-d="4" data-pop="1">
    <rect x="356" y="427" width="192" height="26" rx="13" stroke="#C2C7CE" stroke-width="1.1" fill="#FFFFFF"></rect>
    <text x="452" y="444" font-size="12" fill="#5C5E63" text-anchor="middle">fuzzy &middot; steward approved</text>
  </g>
  <g style="color:#3E63DD" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="5" x="604" y="120" width="512" height="380" rx="6" stroke="currentColor" stroke-width="1.8" fill="#F5F7FE"></rect>
    <rect data-d="5" x="612" y="128" width="496" height="364" rx="4" stroke="currentColor" stroke-width="0.7"></rect>
    <path data-d="5" d="M612 186 H1108" stroke="currentColor" stroke-width="0.9"></path>
  </g>
  <g data-d="6">
    <text x="636" y="166" font-size="15" font-weight="600" letter-spacing="0.03em" fill="#3E63DD">GOLDEN RECORD &mdash; CUSTOMER 9042</text>
    <text x="636" y="230" font-size="13" fill="#6F7988">customer_id</text><text x="780" y="230" font-size="14" font-weight="600" fill="#3E63DD">9042</text><text x="1084" y="230" font-size="12" fill="#6F7988" text-anchor="end">issued by master data</text>
    <text x="636" y="266" font-size="13" fill="#6F7988">tax_id</text><text x="780" y="266" font-size="13.5" fill="#1A1C1D">94-2404110</text><text x="1084" y="266" font-size="12" fill="#6F7988" text-anchor="end">exact &middot; 2 sources</text>
    <text x="636" y="302" font-size="13" fill="#6F7988">address</text><text x="780" y="302" font-size="13.5" fill="#1A1C1D">500 Harbor Blvd, Ste 2</text>
    <text x="636" y="338" font-size="13" fill="#6F7988">phone</text><text x="780" y="338" font-size="13.5" fill="#1A1C1D">+1 415 555-0117</text><text x="1084" y="338" font-size="12" fill="#6F7988" text-anchor="end">from pdf</text>
    <text x="636" y="374" font-size="13" fill="#6F7988">terms</text><text x="780" y="374" font-size="13.5" fill="#1A1C1D">net-45</text><text x="1084" y="374" font-size="12" fill="#6F7988" text-anchor="end">from erp</text>
  </g>
  <path data-d="7" d="M636 404 H1084" stroke="#3E63DD" stroke-width="0.9" stroke-dasharray="4 4"></path>
  <g data-d="7">
    <text x="636" y="440" font-size="12.5" fill="#5C5E63">confidence 0.98 &middot; merged from 3 source records</text>
    <text x="636" y="466" font-size="12.5" fill="#6F7988">originals kept in lineage, never deleted</text>
  </g>
</svg>`,
// stage 03 — warehouse
`<svg viewBox="0 0 1140 640" preserveAspectRatio="xMidYMid meet" fill="none" style="width:100%; height:100%; display:block" font-family="'Google Sans Mono',ui-monospace,monospace">
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="1" x="24" y="28" width="1092" height="88" rx="6" fill="#FFFFFF"></rect>
    <path data-d="1" d="M24 64 H1116" stroke-width="1"></path>
  </g>
  <g data-d="2">
    <text x="44" y="52" font-size="13.5" font-weight="600" letter-spacing="0.08em" fill="#1A1C1D">SEMANTIC LAYER</text>
    <text x="1096" y="52" font-size="12" fill="#6F7988" text-anchor="end">metrics defined once &middot; used by ML, Ask and BI</text>
    <text x="44" y="96" font-size="13" font-weight="600" fill="#1A1C1D">net_revenue</text>
    <text x="152" y="96" font-size="13" fill="#5C5E63">= &Sigma; net_amount &minus; discounts</text>
    <text x="560" y="96" font-size="13" font-weight="600" fill="#1A1C1D">order_volume</text>
    <text x="678" y="96" font-size="13" fill="#5C5E63">= count(order_key)</text>
  </g>
  <path data-d="2" d="M570 116 V192 M570 192 l-6 -9 M570 192 l6 -9" stroke="#3E63DD" stroke-width="1.2" stroke-dasharray="4 4" stroke-linecap="round" fill="none"></path>
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="3" x="24" y="236" width="290" height="200" rx="6" fill="#FFFFFF"></rect>
    <path data-d="3" d="M24 288 H314" stroke-width="1"></path>
    <rect data-d="3" x="856" y="180" width="260" height="150" rx="6" fill="#FFFFFF"></rect>
    <path data-d="3" d="M856 232 H1116" stroke-width="1"></path>
    <rect data-d="3" x="856" y="390" width="260" height="150" rx="6" fill="#FFFFFF"></rect>
    <path data-d="3" d="M856 442 H1116" stroke-width="1"></path>
  </g>
  <g data-d="4">
    <text x="44" y="272" font-size="13.5" font-weight="600" fill="#1A1C1D">DIM: CUSTOMER</text>
    <text x="44" y="322" font-size="13" fill="#1A1C1D">customer_key</text><text x="294" y="322" font-size="13.5" font-weight="600" fill="#3E63DD" text-anchor="end">9042</text>
    <text x="44" y="356" font-size="13" fill="#1A1C1D">segment</text><text x="294" y="356" font-size="12.5" fill="#5C5E63" text-anchor="end">enterprise</text>
    <text x="44" y="390" font-size="13" fill="#1A1C1D">tax_id</text><text x="294" y="390" font-size="12.5" fill="#5C5E63" text-anchor="end">&#8226;&#8226;&#8226; masked</text>
    <text x="24" y="470" font-size="12.5" fill="#6F7988">the golden record from Module 02 lives here</text>
  </g>
  <g data-d="4">
    <text x="876" y="216" font-size="13.5" font-weight="600" fill="#1A1C1D">DIM: PRODUCT</text>
    <text x="876" y="264" font-size="13" fill="#1A1C1D">sku</text>
    <text x="876" y="292" font-size="13" fill="#1A1C1D">category</text>
    <text x="876" y="318" font-size="13" fill="#1A1C1D">unit_cost</text>
  </g>
  <g data-d="4">
    <text x="876" y="426" font-size="13.5" font-weight="600" fill="#1A1C1D">DIM: TIME</text>
    <text x="876" y="474" font-size="13" fill="#1A1C1D">calendar_date</text>
    <text x="876" y="502" font-size="13" fill="#1A1C1D">fiscal_qtr</text>
    <text x="876" y="528" font-size="13" fill="#1A1C1D">is_holiday</text>
  </g>
  <g style="color:#3E63DD" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="5" x="440" y="200" width="320" height="330" rx="6" stroke="currentColor" stroke-width="1.8" fill="#F5F7FE"></rect>
    <path data-d="5" d="M440 256 H760" stroke="currentColor" stroke-width="0.9"></path>
  </g>
  <g data-d="6">
    <text x="464" y="238" font-size="15" font-weight="600" letter-spacing="0.04em" fill="#3E63DD">FACT: ORDERS</text>
    <text x="736" y="238" font-size="12" fill="#6F7988" text-anchor="end">1 row / order line</text>
    <text x="464" y="296" font-size="13" fill="#1A1C1D">order_key</text><text x="736" y="296" font-size="13.5" font-weight="600" fill="#3E63DD" text-anchor="end">8814-2207</text>
    <text x="464" y="330" font-size="13" fill="#1A1C1D">customer_key</text><text x="736" y="330" font-size="13.5" font-weight="600" fill="#3E63DD" text-anchor="end">9042</text>
    <text x="464" y="364" font-size="13" fill="#1A1C1D">product_key</text>
    <text x="464" y="398" font-size="13" fill="#1A1C1D">date_key</text>
    <text x="464" y="432" font-size="13" fill="#1A1C1D">quantity</text><text x="736" y="432" font-size="12.5" fill="#5C5E63" text-anchor="end">240</text>
    <text x="464" y="466" font-size="13" fill="#1A1C1D">net_amount</text><text x="736" y="466" font-size="12.5" fill="#5C5E63" text-anchor="end">$18,400</text>
  </g>
  <path data-d="6" d="M464 488 H736" stroke="#3E63DD" stroke-width="0.9" stroke-dasharray="4 4"></path>
  <text data-d="6" x="464" y="514" font-size="12" fill="#6F7988">every dimension: one join away</text>
  <g stroke="#2F3132" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path data-d="7" d="M314 330 H436"></path>
    <path data-d="7" d="M440 330 l-13 -7 M440 330 l-13 0 M440 330 l-13 7"></path>
    <path data-d="7" d="M856 252 C806 252 796 316 766 326"></path>
    <path data-d="7" d="M760 328 l13 -7 M760 328 l13 0 M760 328 l12 6"></path>
    <path data-d="7" d="M856 462 C806 462 796 416 766 402"></path>
    <path data-d="7" d="M760 398 l14 -3 M760 398 l12 5 M760 398 l8 9"></path>
  </g>
  </svg>`,
// stage 04 — ml
`<svg viewBox="0 0 1140 620" preserveAspectRatio="xMidYMid meet" fill="none" style="width:100%; height:100%; display:block" font-family="'Google Sans Mono',ui-monospace,monospace">
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="1" x="24" y="140" width="230" height="70" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="254" width="230" height="70" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="24" y="368" width="230" height="70" rx="6" fill="#FFFFFF"></rect>
  </g>
  <g data-d="2">
    <text x="44" y="168" font-size="13.5" font-weight="600" fill="#1A1C1D">fact_orders</text>
    <text x="44" y="190" font-size="12" fill="#6F7988">24 months of orders</text>
    <text x="44" y="282" font-size="13.5" font-weight="600" fill="#1A1C1D">dim_product</text>
    <text x="44" y="304" font-size="12" fill="#6F7988">category &middot; unit cost</text>
    <text x="44" y="396" font-size="13.5" font-weight="600" fill="#1A1C1D">dim_time</text>
    <text x="44" y="418" font-size="12" fill="#6F7988">seasonality &middot; fiscal weeks</text>
    <text x="24" y="486" font-size="12.5" fill="#6F7988">trained where the data lives,</text>
    <text x="24" y="508" font-size="12.5" fill="#6F7988">nothing exported</text>
  </g>
  <g stroke="#2F3132" stroke-width="1.5" stroke-linecap="round" fill="none">
    <path data-d="3" d="M254 175 C292 175 296 242 322 250 M322 250 l-10 -5 M322 250 l-9 6"></path>
    <path data-d="3" d="M254 289 C292 289 296 290 322 292 M322 292 l-10 -6 M322 292 l-9 5"></path>
    <path data-d="3" d="M254 403 C292 403 296 340 322 332 M322 332 l-10 -3 M322 332 l-8 8"></path>
  </g>
  <g style="color:#3E63DD" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="4" x="330" y="120" width="330" height="380" rx="6" stroke="currentColor" stroke-width="1.8" fill="#F5F7FE"></rect>
    <path data-d="4" d="M330 178 H660" stroke="currentColor" stroke-width="0.9"></path>
    <rect data-d="4" x="548" y="108" width="100" height="24" rx="12" stroke="currentColor" stroke-width="1" fill="#FFFFFF"></rect>
  </g>
  <g data-d="5">
    <text x="598" y="124" font-size="11.5" fill="#3E63DD" text-anchor="middle" letter-spacing="0.06em">MODEL CARD</text>
    <text x="354" y="158" font-size="15" font-weight="600" letter-spacing="0.03em" fill="#3E63DD">DEMAND FORECAST &mdash; v3</text>
    <text x="354" y="222" font-size="12.5" fill="#6F7988">type</text><text x="446" y="222" font-size="13" fill="#1A1C1D">gradient-boosted</text>
    <text x="354" y="264" font-size="12.5" fill="#6F7988">features</text><text x="446" y="264" font-size="13" fill="#1A1C1D">42 &middot; price, promo, season</text>
    <text x="354" y="306" font-size="12.5" fill="#6F7988">backtest</text><text x="446" y="306" font-size="13" fill="#1A1C1D">MAPE 6.2% &middot; 12-wk holdout</text>
    <text x="354" y="348" font-size="12.5" fill="#6F7988">registry</text><text x="446" y="348" font-size="13" fill="#1A1C1D">signed &middot; approved</text>
  </g>
  <path data-d="5" d="M354 388 H636" stroke="#3E63DD" stroke-width="0.9" stroke-dasharray="4 4"></path>
  <text data-d="5" x="354" y="422" font-size="12" fill="#6F7988">monitored: drift &middot; freshness &middot; bias</text>
  <g stroke="#2F3132" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path data-d="6" d="M660 310 H718 M718 310 l-11 -6 M718 310 l-11 6" stroke-width="1.8"></path>
    <rect data-d="6" x="726" y="70" width="390" height="470" rx="6" fill="#FFFFFF" stroke-width="1.6"></rect>
  </g>
  <g data-d="7">
    <text x="746" y="104" font-size="13.5" font-weight="600" letter-spacing="0.06em" fill="#1A1C1D">OUTPUT &mdash; CUSTOMER 9042</text>
    <text x="746" y="126" font-size="12" fill="#6F7988">demand forecast &middot; next 12 weeks</text>
    <text transform="rotate(-90 752 315)" x="752" y="315" font-size="12" fill="#6F7988" text-anchor="middle">units / wk</text>
    <text x="820" y="494" font-size="12" fill="#6F7988">Jul</text><text x="920" y="494" font-size="12" fill="#6F7988">Aug</text><text x="1020" y="494" font-size="12" fill="#6F7988">Sep</text>
  </g>
  <path data-d="7" d="M770 160 V470 H1092" stroke="#2F3132" stroke-width="1.2" stroke-linecap="round" fill="none"></path>
  <path data-d="7" d="M770 420 L806 400 L836 408 L868 380 L900 390 L928 368 L946 352" stroke="#2F3132" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
  <g data-d="8" data-pop="1" style="color:#3E63DD" fill="none">
    <circle cx="868" cy="380" r="8" stroke="currentColor" stroke-width="1.6"></circle>
  </g>
  <path data-d="8" d="M946 352 C990 336 1040 322 1086 306 L1086 396 C1040 386 990 380 946 372 Z" fill="#3E63DD" fill-opacity="0.1"></path>
  <g style="color:#3E63DD" stroke-linecap="round" fill="none">
    <path data-d="8" d="M946 170 V470" stroke="currentColor" stroke-width="1" stroke-dasharray="5 4"></path>
    <path data-d="8" d="M946 352 C990 340 1040 330 1086 318" stroke="currentColor" stroke-width="2.2"></path>
  </g>
  <g data-d="8" fill="#3E63DD">
    <text x="954" y="188" font-size="12">today</text>
    <text x="1086" y="246" font-size="14.5" font-weight="600" text-anchor="end">next qtr &asymp; 12,400 units</text>
    <text x="746" y="524" font-size="12">&#9675; anomaly flagged &middot; 3.1&sigma; &middot; owner alerted</text>
  </g>
  <text data-d="8" x="1086" y="420" font-size="11.5" fill="#6F7988" text-anchor="end">p10&ndash;p90 band</text>
</svg>`,
// stage 05 — ask akashic
`<svg viewBox="0 0 1140 580" preserveAspectRatio="xMidYMid meet" fill="none" style="width:100%; height:100%; display:block" font-family="'Google Sans Mono',ui-monospace,monospace">
  <text data-d="1" x="24" y="40" font-size="13" font-weight="600" letter-spacing="0.1em" fill="#1A1C1D">ASK AKASHIC</text>
  <rect data-d="1" x="24" y="56" width="610" height="104" rx="6" stroke="#2F3132" stroke-width="1.6" fill="#FFFFFF"></rect>
  <g data-d="2" font-family="'Google Sans Text',system-ui,sans-serif" fill="#1A1C1D">
    <text x="48" y="100" font-size="19">What&rsquo;s customer 9042&rsquo;s forecasted</text>
    <text x="48" y="130" font-size="19">demand next quarter?</text>
  </g>
  <path data-d="2" d="M254 114 V136" stroke="#3E63DD" stroke-width="1.6"></path>
  <text data-d="3" x="24" y="204" font-size="12" font-weight="600" letter-spacing="0.1em" fill="#6F7988">GROUNDED ON</text>
  <g stroke="#2F3132" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="3" x="24" y="222" width="536" height="56" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="3" x="24" y="302" width="536" height="56" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="3" x="24" y="382" width="536" height="56" rx="6" fill="#FFFFFF"></rect>
  </g>
  <g style="color:#3E63DD" stroke-linecap="round" fill="none">
    <path data-d="4" d="M180 160 V214 M180 214 l-6 -9 M180 214 l6 -9" stroke="currentColor" stroke-width="1.3"></path>
    <path data-d="4" d="M180 278 V298" stroke="currentColor" stroke-width="1.3"></path>
    <path data-d="4" d="M180 358 V378" stroke="currentColor" stroke-width="1.3"></path>
  </g>
  <g data-d="4" data-pop="1" style="color:#3E63DD" fill="none">
    <circle cx="56" cy="250" r="9" stroke="currentColor" stroke-width="1.5"></circle>
    <path d="M51.5 250 l3.5 4 l6 -8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="56" cy="330" r="9" stroke="currentColor" stroke-width="1.5"></circle>
    <path d="M51.5 330 l3.5 4 l6 -8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
    <circle cx="56" cy="410" r="9" stroke="currentColor" stroke-width="1.5"></circle>
    <path d="M51.5 410 l3.5 4 l6 -8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
  </g>
  <g data-d="5">
    <text x="80" y="255" font-size="13" fill="#1A1C1D">Master Data &middot; golden record 9042</text><text x="544" y="255" font-size="12" fill="#6F7988" text-anchor="end">1 / 3</text>
    <text x="80" y="335" font-size="13" fill="#1A1C1D">Warehouse &middot; order 8814-2207</text><text x="544" y="335" font-size="12" fill="#6F7988" text-anchor="end">2 / 3</text>
    <text x="80" y="415" font-size="13" fill="#1A1C1D">ML &middot; demand-forecast v3 &middot; signed</text><text x="544" y="415" font-size="12" fill="#6F7988" text-anchor="end">3 / 3</text>
  </g>
  <path data-d="6" d="M560 330 H626 M626 330 l-10 -6 M626 330 l-10 6" stroke="#3E63DD" stroke-width="1.6" stroke-linecap="round" fill="none"></path>
  <g style="color:#3E63DD" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="6" x="634" y="200" width="482" height="320" rx="6" stroke="currentColor" stroke-width="1.8" fill="#F5F7FE"></rect>
    <path data-d="6" d="M634 248 H1116" stroke="currentColor" stroke-width="0.9"></path>
  </g>
  <g data-d="7">
    <text x="658" y="232" font-size="12.5" font-weight="600" letter-spacing="0.08em" fill="#3E63DD">ANSWER &middot; GROUNDED</text>
    <text x="658" y="300" font-size="22" font-weight="600" fill="#1A1C1D">&asymp; 12,400 units next quarter</text>
    <text x="658" y="334" font-size="13.5" fill="#5C5E63">+9% vs last quarter &middot; p85 confidence</text>
  </g>
  <path data-d="7" d="M658 366 H1092" stroke="#3E63DD" stroke-width="0.9" stroke-dasharray="4 4"></path>
  <g data-d="7" fill="#6F7988">
    <text x="658" y="398" font-size="12.5">source: fact_orders &middot; order 8814-2207</text>
    <text x="658" y="424" font-size="12.5">model: demand-forecast v3 &middot; signed</text>
    <text x="658" y="450" font-size="12.5">row-level security applied</text>
  </g>
</svg>`,
// stage 06 — bi
`<svg viewBox="0 0 1140 580" preserveAspectRatio="xMidYMid meet" fill="none" style="width:100%; height:100%; display:block" font-family="'Google Sans Mono',ui-monospace,monospace">
  <g stroke="#2F3132" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
    <rect data-d="1" x="24" y="40" width="352" height="380" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="400" y="40" width="352" height="380" rx="6" fill="#FFFFFF"></rect>
    <rect data-d="1" x="776" y="40" width="340" height="380" rx="6" fill="#FFFFFF"></rect>
    <path data-d="1" d="M24 90 H376 M400 90 H752 M776 90 H1116" stroke-width="1"></path>
  </g>
  <g data-d="2" fill="#1A1C1D">
    <text x="44" y="72" font-size="12.5" font-weight="600" letter-spacing="0.06em">ORDERS BY REGION &middot; Q3</text>
    <text x="420" y="72" font-size="12.5" font-weight="600" letter-spacing="0.06em">CUSTOMER 9042 &middot; NEXT QTR</text>
    <text x="796" y="72" font-size="12.5" font-weight="600" letter-spacing="0.06em">FORECAST GAP BY REGION</text>
  </g>
  <g stroke="#2F3132" stroke-width="1.3" stroke-linejoin="round" fill="none">
    <path data-d="3" d="M44 380 H356" stroke-width="1.1"></path>
    <rect data-d="3" x="56" y="270" width="42" height="110"></rect>
    <rect data-d="3" x="116" y="235" width="42" height="145"></rect>
    <rect data-d="3" x="176" y="288" width="42" height="92"></rect>
    <rect data-d="3" x="236" y="302" width="42" height="78"></rect>
  </g>
  <rect data-d="3" x="296" y="210" width="42" height="170" stroke="#3E63DD" stroke-width="1.6" fill="#3E63DD" fill-opacity="0.14"></rect>
  <g data-d="4" font-size="12" fill="#6F7988" text-anchor="middle">
    <text x="77" y="404">NE</text><text x="137" y="404">MW</text><text x="197" y="404">SE</text><text x="257" y="404">SW</text><text x="317" y="404" fill="#3E63DD" font-weight="600">W</text>
  </g>
  <g data-d="4">
    <text x="420" y="152" font-size="38" font-weight="600" fill="#1A1C1D">12,400</text>
    <text x="420" y="180" font-size="13" fill="#3E63DD">units &middot; +9% vs last qtr &middot; p85</text>
    <text x="420" y="396" font-size="12" fill="#6F7988">demand-forecast v3 &middot; same number as Ask</text>
  </g>
  <path data-d="4" d="M420 330 L470 320 L510 324 L560 306 L610 312 L668 290 L732 282" stroke="#6F7988" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
  <g stroke="#2F3132" stroke-width="1.2" stroke-linejoin="round" fill="none">
    <rect data-d="5" x="796" y="150" width="56" height="76"></rect>
    <rect data-d="5" x="860" y="150" width="56" height="76"></rect>
    <rect data-d="5" x="924" y="150" width="56" height="76"></rect>
    <rect data-d="5" x="988" y="150" width="56" height="76"></rect>
  </g>
  <rect data-d="5" x="1052" y="150" width="56" height="76" stroke="#3E63DD" stroke-width="1.6" fill="#3E63DD" fill-opacity="0.12"></rect>
  <g data-d="5" font-size="11.5" fill="#6F7988" text-anchor="middle">
    <text x="824" y="176">NE</text><text x="888" y="176">MW</text><text x="952" y="176">SE</text><text x="1016" y="176">SW</text><text x="1080" y="176" fill="#3E63DD" font-weight="600">W</text>
  </g>
  <g data-d="5" font-size="13" font-weight="600" fill="#1A1C1D" text-anchor="middle">
    <text x="824" y="206">+1.8%</text><text x="888" y="206">+0.6%</text><text x="952" y="206">&minus;0.9%</text><text x="1016" y="206">&minus;2.1%</text><text x="1080" y="206" fill="#3E63DD">&minus;4.2%</text>
  </g>
  <g data-d="5">
    <text x="796" y="290" font-size="12" fill="#6F7988">negative = below forecast</text>
    <text x="796" y="318" font-size="12.5" font-weight="600" fill="#3E63DD">West flagged by ML in Module 04</text>
  </g>
  <g stroke="#3E63DD" stroke-width="1.2" stroke-linecap="round" stroke-dasharray="4 4" fill="none">
    <path data-d="6" d="M200 420 V476"></path>
    <path data-d="6" d="M576 420 V476"></path>
    <path data-d="6" d="M946 420 V476"></path>
  </g>
  <rect data-d="6" x="24" y="480" width="1092" height="72" rx="6" stroke="#2F3132" stroke-width="1.6" fill="#FAFAFB"></rect>
  <g data-d="7">
    <text x="44" y="521" font-size="13" font-weight="600" letter-spacing="0.08em" fill="#1A1C1D">METRIC LAYER</text>
    <text x="240" y="521" font-size="13" fill="#5C5E63">net_revenue &middot; order_volume &middot; forecast_gap</text>
    <text x="1096" y="521" font-size="12.5" fill="#6F7988" text-anchor="end">defined once in Warehouse (03) &middot; every tile reads the same numbers</text>
  </g>
</svg>`,
];
