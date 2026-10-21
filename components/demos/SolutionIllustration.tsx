import type { HomeSolution } from "@/content/pages/home";

/* Editorial process drawings, not screens. The forecast and tender excerpts
   are illustrative; no quantities, clinical values or customer data appear.
   Sources: /solutions (forecast inputs and procurement stages), /solutions/life
   (offline screening, synchronisation and the continuous maternal record). */
function EnterpriseIllustration() {
  return (
    <>
      <text x="24" y="31" className="fill-secondary-text font-mono text-[11px] tracking-[1.2px]">THE BUSINESS, AS IT HAPPENS</text>
      <g className="fill-ink text-[14px]">
        <text x="24" y="71">Invoices</text>
        <text x="24" y="105">Timesheets</text>
        <text x="24" y="139">Opportunities</text>
      </g>
      <g className="stroke-line" strokeWidth="1.2">
        <path d="M111 67h30c46 0 23 105 64 105" />
        <path d="M125 101h16c35 0 28 71 64 71" />
        <path d="M144 135h5c29 0 25 37 56 37" />
      </g>
      <path d="M24 231H376M205 59v172" className="stroke-line" strokeWidth="1" />
      <text x="220" y="77" className="fill-ink text-[16px] font-medium">Rolling forecast</text>
      <text x="220" y="96" className="fill-secondary-text text-[12px]">Revised as records arrive</text>
      <g className="stroke-line">
        {[24, 54, 84, 114, 144, 174, 205, 233, 261, 289, 317, 345, 376].map((x) => <path key={x} d={`M${x} 231v5`} />)}
      </g>
      <path d="M9 211c18 0 29-22 48-18s31-9 49-9 29 12 44 4 36-23 55-16" className="stroke-ink" strokeWidth="2" />
      <path d="M205 172c26 3 29-12 54-8s39 12 58 5 36-7 59-9" className="stroke-default-stroke" strokeWidth="1.5" strokeDasharray="3 5" />
      <path d="M205 172c26 3 29-22 54-27s36 5 58-10 39-16 59-14" className="stroke-blue" strokeWidth="2.2" />
      <circle cx="205" cy="172" r="4" className="fill-background stroke-blue" strokeWidth="2" />
      <circle cx="376" cy="121" r="3" className="fill-blue" />
      <path d="m205 181-7 28" className="stroke-blue-border" />
      <text x="180" y="250" className="fill-secondary-text text-[11px]">Today</text>
      <text x="376" y="250" textAnchor="end" className="fill-secondary-text text-[11px]">12 months ahead</text>
      <text x="376" y="194" textAnchor="end" className="fill-secondary-text text-[11px]">Previous forecast</text>
      <text x="24" y="283" className="fill-secondary-text font-mono text-[10px] tracking-[0.5px]">ILLUSTRATIVE FORECAST</text>
    </>
  );
}

function ProcurementIllustration() {
  return (
    <>
      <text x="24" y="31" className="fill-secondary-text font-mono text-[11px] tracking-[1.2px]">ILLUSTRATIVE PROCUREMENT FLOW</text>
      <g transform="rotate(-3 120 131)">
        <path d="M23 53h191v153H23Z" className="fill-background stroke-line" />
        <text x="39" y="77" className="fill-secondary-text font-mono text-[10px] tracking-[1px]">TENDER REQUIREMENT</text>
        <text x="39" y="106" className="fill-ink text-[16px] font-medium">Delivery experience</text>
        <path d="M39 120h150M39 132h129" className="stroke-line" />
        <path d="M35 146h163v24H35Z" className="fill-blue-subtle" />
        <text x="42" y="162" className="fill-blue text-[12px]">Evidence of prior delivery</text>
        <path d="M39 185h73" className="stroke-line" />
      </g>
      <path d="M199 151c30 0 29-57 57-57 29 0 27 45 27 75" className="stroke-blue" strokeWidth="1.4" />
      <path d="m278 163 5 6 5-6" className="stroke-blue" strokeWidth="1.4" />
      <g transform="rotate(3 273 214)">
        <path d="M177 174h196v86H177Z" className="fill-background stroke-default-stroke" />
        <text x="192" y="196" className="fill-secondary-text font-mono text-[10px] tracking-[1px]">BID EVIDENCE</text>
        <text x="192" y="220" className="fill-ink text-[14px] font-medium">Completion certificate</text>
        <path d="M192 231h161" className="stroke-line" />
        <path d="M192 247h30" className="stroke-blue" strokeWidth="1.5" />
        <text x="229" y="251" className="fill-blue text-[11px]">Source linked</text>
      </g>
      <text x="24" y="283" className="fill-secondary-text text-[12px]">Evidence linked. People approve.</text>
    </>
  );
}

function CareIllustration() {
  return (
    <>
      <text x="24" y="31" className="fill-secondary-text font-mono text-[11px] tracking-[1.2px]">ONE MOTHER. ONE CONTINUOUS RECORD.</text>
      {/* The visit and the health centre sit on the same record's path. */}
      <path d="M55 154c-12 39 20 77 64 76 44-1 45-29 88-29 44 0 47 36 85 34 35-2 51-24 51-50" className="stroke-blue-border" strokeWidth="1.5" />
      <path d="M55 154c-12 39 20 77 64 76" className="stroke-blue" strokeWidth="1.5" strokeDasharray="3 5" />
      <g className="stroke-default-stroke" strokeWidth="1.2">
        <path d="m21 89 34-25 34 25M28 85v48h54V85" />
        <path d="M45 133v-25h20v25M34 95h9m25 0h8" />
        <path d="M314 156h59v61h-59Z M329 156v-14h30v14M336 217v-22h15v22" />
        <path d="M323 172h8m23 0h8m-39 11h8m23 0h8" />
      </g>
      <text x="55" y="155" textAnchor="middle" className="fill-ink text-[12px] font-medium">Home visit</text>
      <text x="55" y="173" textAnchor="middle" className="fill-secondary-text text-[11px]">Works offline</text>
      <text x="344" y="240" textAnchor="middle" className="fill-ink text-[12px] font-medium">Health centre</text>
      <g transform="rotate(2 216 127)">
        <path d="M124 60h179v136H124Z" className="fill-background stroke-default-stroke" />
        <path d="M139 60v136" className="stroke-blue-border" />
        <text x="152" y="84" className="fill-secondary-text font-mono text-[10px] tracking-[0.7px]">ANTENATAL VISIT</text>
        <text x="152" y="108" className="fill-ink text-[16px] font-medium">Mother’s<tspan x="152" dy="19">care record</tspan></text>
        <path d="M152 139h135" className="stroke-line" />
        <text x="152" y="159" className="fill-ink text-[12px]">Risk screening</text>
        <text x="152" y="182" className="fill-blue text-[12px]">Saved on the phone</text>
      </g>
      <path d="m118 227 6 3-5 5M338 223l5-7 3 8" className="stroke-blue" strokeWidth="1.4" />
      <text x="24" y="283" className="fill-secondary-text text-[12px]">Syncs when connected. The record stays together.</text>
    </>
  );
}

export default function SolutionIllustration({ kind, label }: { kind: HomeSolution["id"]; label: string }) {
  return (
    <svg viewBox="0 0 400 304" fill="none" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label} focusable="false" className="h-full w-full max-w-[440px]">
      {kind === "ei" ? <EnterpriseIllustration /> : kind === "ipms" ? <ProcurementIllustration /> : <CareIllustration />}
    </svg>
  );
}
