import type { InsightCover as Cover } from "@/content/collections/insights";

/* Original editorial geometry. These are conceptual illustrations, not
   product screens, charts or representations of measured business results. */
export default function InsightCover({ kind, className = "" }: { kind: Cover; className?: string }) {
  return (
    <div aria-hidden="true" className={`overflow-hidden bg-depth ${className}`}>
      <svg viewBox="0 0 640 400" fill="none" className="h-full w-full text-inkSoft">
        <path d="M0 336H640M80 0V400M560 0V400" className="stroke-lineSoft" strokeWidth="1" />
        <circle cx="320" cy="200" r="158" className="stroke-line" strokeWidth="1" />
        <g strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {kind === "handoff" && <>
            <path d="M96 253 226 187 352 253 222 319Z" className="fill-background stroke-line" />
            <path d="M96 230 226 164 352 230 222 296Z" className="fill-background stroke-line" />
            <path d="M96 207 226 141 352 207 222 273Z" className="fill-background stroke-inkSoft" />
            <path d="M319 236 433 179 546 236 432 294Z" className="fill-depth-raised stroke-inkSoft" />
            <path d="M319 210 433 153 546 210 432 268Z" className="fill-background stroke-inkSoft" />
            <path d="M222 207V167C222 72 433 72 433 168V210" className="stroke-blue" strokeWidth="3" />
            <circle cx="222" cy="207" r="7" className="fill-blue stroke-depth" strokeWidth="3" />
            <circle cx="433" cy="210" r="7" className="fill-blue stroke-depth" strokeWidth="3" />
            <path d="m419 195 14 15 14-15" className="stroke-blue" strokeWidth="3" />
          </>}
          {kind === "definitions" && <>
            {[0,1,2].map(i=><g key={i} transform={`translate(${145+i*110} ${102+i*27})`}>
              <rect width="132" height="172" rx="6" className="fill-background stroke-inkSoft" />
              <path d="M22 28H63M22 48H108M22 61H108" className="stroke-line" />
              <circle cx="66" cy="114" r="30" className={i===1?"stroke-blue":"stroke-inkSoft"} />
              <path d="M45 114H87M66 93V135" className={i===1?"stroke-blue":"stroke-inkSoft"} />
            </g>)}
          </>}
          {kind === "authority" && <>
            <path d="M162 300V150a158 90 0 0 1 316 0V300" className="stroke-line" />
            <path d="M214 300V155a106 63 0 0 1 212 0V300" className="stroke-inkSoft" strokeWidth="2" />
            <path d="M268 300V158a52 34 0 0 1 104 0V300" className="stroke-line" />
            <path d="M140 300H500M320 340V244" className="stroke-inkSoft" />
            <path d="M178 222H462" className="stroke-blue" strokeWidth="10" />
            <circle cx="320" cy="222" r="32" className="fill-background stroke-blue" strokeWidth="2" />
            <path d="M311 210V234M329 210V234" className="stroke-blue" strokeWidth="3" />
          </>}
          {kind === "connections" && <>
            <path d="m320 82 150 85v99l-150 74-150-74v-99Z" className="stroke-line" />
            <path d="M320 82V200M170 167 320 200 470 167M170 266 320 200 470 266M320 200V340" className="stroke-inkSoft" />
            <path d="m320 142 64 35v72l-64 36-64-36v-72Z" className="fill-background stroke-blue" />
            <path d="m256 177 64 36 64-36M320 213V285" className="stroke-blue" />
            {[[320,82],[470,167],[470,266],[320,340],[170,266],[170,167]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="11" className="fill-background stroke-inkSoft" />)}
          </>}
          {kind === "economics" && <>
            <path d="M320 133V307M266 308H374M160 144H480" className="stroke-inkSoft" strokeWidth="3" />
            <circle cx="320" cy="144" r="17" className="fill-background stroke-blue" />
            <path d="m186 144-52 108h104Zm268 0-52 108h104Z" className="stroke-inkSoft" />
            <path d="M134 252q52 69 104 0M402 252q52 69 104 0" className="fill-background stroke-blue" strokeWidth="2" />
            <circle cx="186" cy="228" r="14" className="fill-blue-subtle stroke-blue" />
            <rect x="437" y="210" width="34" height="34" rx="3" className="fill-blue-subtle stroke-blue" />
          </>}
          {kind === "permissions" && <>
            <rect x="155" y="103" width="330" height="215" rx="8" className="fill-background stroke-line" />
            <path d="M155 145H485M205 103V318M435 103V318" className="stroke-line" />
            <rect x="246" y="178" width="148" height="111" rx="7" className="fill-depth-raised stroke-blue" />
            <path d="M279 178V143a41 41 0 0 1 82 0v35" className="stroke-blue" strokeWidth="3" />
            <circle cx="320" cy="225" r="10" className="fill-background stroke-blue" />
            <path d="M320 235V254" className="stroke-blue" strokeWidth="3" />
          </>}
          {kind === "ownership" && <>
            <path d="M286 97H183v208h103V97Z" className="fill-background stroke-inkSoft" />
            <path d="M354 97h103v208H354V97Z" className="fill-background stroke-inkSoft" />
            <path d="M234 149H354V253H234Z" className="fill-depth-raised stroke-blue" />
            <path d="M286 149h120v104H286Z" className="fill-background stroke-blue" />
            <path d="M320 89V313" className="stroke-line" strokeDasharray="5 7" />
            <circle cx="320" cy="201" r="24" className="fill-blue-subtle stroke-blue" />
          </>}
          {kind === "inclusion" && <>
            {Array.from({length:35},(_,i)=>{const x=158+(i%7)*54,y=96+Math.floor(i/7)*52;return <circle key={i} cx={x} cy={y} r="15" className={i===24?"fill-background stroke-blue":"fill-background stroke-line"} strokeDasharray={i===24?"3 5":undefined} />;})}
            <path d="M320 252V340H514V63H320V96" className="stroke-blue" strokeWidth="2" />
            <circle cx="320" cy="96" r="15" className="fill-blue-subtle stroke-blue" />
          </>}
          {kind === "foundation" && <>
            {[64,32,0].map((y,i)=><path key={y} transform={`translate(0 ${y})`} d="m320 118 178 89-178 89-178-89Z" className={i===2?"fill-background stroke-blue":"fill-depth-raised stroke-inkSoft"} />)}
            <path d="M260 144V87l60-30 60 30v57l-60 30Z" className="fill-background stroke-blue" />
            <path d="m260 87 60 30 60-30M320 117V174" className="stroke-blue" />
          </>}
          {kind === "deployment" && <>
            <rect x="139" y="79" width="362" height="245" rx="9" className="stroke-line" strokeDasharray="6 8" />
            <rect x="190" y="118" width="260" height="167" rx="7" className="fill-background stroke-inkSoft" />
            <rect x="242" y="158" width="156" height="87" rx="5" className="fill-depth-raised stroke-blue" />
            <path d="M86 201H242M398 201H554" className="stroke-blue" />
            <circle cx="86" cy="201" r="12" className="fill-background stroke-blue" />
            <circle cx="554" cy="201" r="12" className="fill-background stroke-blue" />
            <circle cx="320" cy="201" r="18" className="fill-background stroke-blue" />
          </>}
          {kind === "forecast" && <>
            <path d="M120 295H520M320 80V310" className="stroke-line" />
            <path d="m121 268 50-35 45 12 56-74 48 21" className="stroke-inkSoft" strokeWidth="3" />
            <path d="M320 192q95-77 200-98M320 192q95 6 200-43M320 192q95 62 200 28" className="stroke-blue" strokeDasharray="6 7" strokeWidth="2" />
            <circle cx="320" cy="192" r="8" className="fill-blue stroke-depth" strokeWidth="3" />
          </>}
          {kind === "evidence" && <>
            <rect x="180" y="101" width="225" height="220" rx="7" className="fill-depth-raised stroke-line" />
            <rect x="204" y="80" width="225" height="220" rx="7" className="fill-background stroke-inkSoft" />
            <path d="M235 119H326M235 144H395M235 159H395M235 246H316M235 263H348" className="stroke-line" />
            <circle cx="385" cy="208" r="58" className="fill-background stroke-blue" strokeWidth="2" />
            <circle cx="385" cy="208" r="35" className="stroke-blue" />
            <path d="M385 162V254M339 208H431" className="stroke-blue" />
            <circle cx="385" cy="208" r="8" className="fill-blue" stroke="none" />
          </>}
        </g>
      </svg>
    </div>
  );
}
