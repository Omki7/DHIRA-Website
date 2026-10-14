"use client";
import { useId } from "react";
import useDrawn from "@/hooks/useDrawn";

const VB_W = 1000, VB_H = 330, X0 = 250, X1 = 760, SURFACE = 96, PRODUCTS_END = 132, PLATFORMS_END = 250, DATA_END = 306;
const PEOPLE = Array.from({ length: 12 }, (_, i) => X0 + 32 + i * 41);
const THREADS = [
  { d: "M292 298C300 262 262 232 280 196S320 150 314 134L314 110", top: 314 },
  { d: "M372 292C352 250 408 226 398 190S350 152 355 134L355 110", top: 355 },
  { d: "M468 300C488 262 440 236 452 200S488 160 478 134L478 110", top: 478 },
  { d: "M566 294C548 256 596 226 590 188S556 154 560 134L560 110", top: 560 },
  { d: "M676 298C690 256 648 232 662 196S692 156 683 134L683 110", top: 683 },
];
const BRANCHES = ["M398 190C416 172 432 158 437 134L437 110", "M590 188C606 170 614 152 601 134L601 110", "M280 196C262 178 272 150 273 134L273 110"];
const BANDS = [
  { n: "01", title: "Products", caption: "Applications people use.", y: 114 },
  { n: "02", title: "Platforms", caption: "Akashic, the foundation.", y: 191 },
  { n: "03", title: "Intelligence", caption: "AI running through both.", y: 272 },
];
function breakLine(x: number) { const mid = (SURFACE + DATA_END) / 2; return `M${x} ${SURFACE - 8}L${x} ${mid - 14}L${x - 7} ${mid - 5}L${x + 7} ${mid + 5}L${x} ${mid + 14}L${x} ${DATA_END + 8}`; }

export default function SystemSection() {
  const [ref, drawn] = useDrawn<HTMLElement>(0.3);
  const id = useId().replace(/:/g, "");
  const pct = (x: number, w: number) => `${x / w * 100}%`;
  function drawing(sfx: string) {
    const pid = id + sfx;
    return <>
      <defs>
        <pattern id={pid + "-hatch"} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="7" stroke="#1A1C1D" strokeOpacity=".13" /></pattern>
        <pattern id={pid + "-stipple"} width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#1A1C1D" fillOpacity=".28" /><circle cx="6.5" cy="6.5" r=".8" fill="#1A1C1D" fillOpacity=".2" /></pattern>
        <clipPath id={pid + "-cut"}><rect x={X0} y={SURFACE + 4} width={X1 - X0} height={DATA_END - SURFACE - 4} /></clipPath>
      </defs>
      <g className="ad-fade">
        <rect x={X0} y={PRODUCTS_END} width={X1-X0} height={PLATFORMS_END-PRODUCTS_END} fill={`url(#${pid}-hatch)`} />
        <rect x={X0} y={PLATFORMS_END} width={X1-X0} height={DATA_END-PLATFORMS_END} fill={`url(#${pid}-stipple)`} />
        <rect x={X0} y={SURFACE} width={X1-X0} height={PRODUCTS_END-SURFACE} fill="#FFFFFF" />
        {[SURFACE, PRODUCTS_END, PLATFORMS_END].map((y,k)=><line key={y} x1={X0} x2={X1} y1={y} y2={y} stroke="#1A1C1D" strokeOpacity={k===0?.75:.35} strokeWidth={k===0?1.4:1} />)}
      </g>
      {[X0,X1].map(x=><path key={x} d={breakLine(x)} fill="none" stroke="#1A1C1D" strokeOpacity=".55" strokeWidth="1.1" className="ad-draw" />)}
      <g clipPath={`url(#${pid}-cut)`}>
        {THREADS.map((t,k)=><path key={t.d} d={t.d} pathLength={1} fill="none" stroke="#3E63DD" strokeWidth="1.8" strokeLinecap="round" className="ad-draw" style={{["--ad-delay" as string]:`${.5+k*.12}s`,["--ad-dur" as string]:"1.6s"}} />)}
        {BRANCHES.map((d,k)=><path key={d} d={d} pathLength={1} fill="none" stroke="#3E63DD" strokeOpacity=".7" strokeWidth="1.2" className="ad-draw" style={{["--ad-delay" as string]:`${1.5+k*.1}s`,["--ad-dur" as string]:"0.9s"}} />)}
      </g>
      {[...THREADS.map(t=>t.top),437,601,273].map((x,k)=><circle key={x} cx={x} cy="110" r="3" className="ad-fade fill-blue" style={{["--ad-delay" as string]:`${1.9+k*.05}s`}} />)}
      {PEOPLE.map((x,k)=><circle key={x} cx={x} cy={SURFACE-12} r="4" className="ad-fade fill-ink" style={{["--ad-delay" as string]:`${.2+k*.03}s`}} />)}
      <g className="ad-fade" style={{["--ad-delay" as string]:"0.9s"}}><rect x="58" y={SURFACE-30} width="118" height="62" rx="8" fill="#FFFFFF" stroke="#64748B" strokeWidth="1.1" strokeDasharray="4 4" /><path d={`M176 ${SURFACE+1}L226 ${SURFACE+1}`} fill="none" stroke="#64748B" strokeWidth="1.1" strokeDasharray="4 4" /><circle cx="226" cy={SURFACE+1} r="2.5" fill="#64748B" /></g>
    </>;
  }
  return <figure ref={ref} data-drawn={drawn}>
    <div className="relative mx-auto hidden max-w-[1200px] lg:block" style={{aspectRatio:`${VB_W} / ${VB_H}`}}>
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="absolute inset-0 h-full w-full" aria-hidden>{drawing("w")}{BANDS.map((b,k)=><g key={b.n} className="ad-fade" style={{["--ad-delay" as string]:`${1.2+k*.15}s`}}><path d={`M${k===2?685:X1+4} ${b.y}L${X1+48} ${b.y}`} stroke="#1A1C1D" strokeOpacity=".45" /><circle cx={k===2?685:X1+4} cy={b.y} r="2.5" fill={k===2?"#3E63DD":"#1A1C1D"} /></g>)}</svg>
      {BANDS.map((b,k)=><div key={b.n} className="absolute" style={{left:pct(X1+58,VB_W),top:pct(b.y,VB_H),transform:"translateY(-50%)"}}><div className="ad-fade" style={{["--ad-delay" as string]:`${1.3+k*.15}s`}}><p className="flex items-baseline gap-2.5"><span className={`font-mono text-[11px] tracking-[0.08em] ${k===2?"text-blue":"text-overcast"}`}>{b.n}</span><span className="text-[18px] font-semibold tracking-tight text-ink">{b.title}</span></p><p className="mt-0.5 whitespace-nowrap pl-[26px] text-[14px] leading-snug text-inkSoft">{b.caption}</p></div></div>)}
      <span className="absolute" style={{left:pct(117,VB_W),top:pct(SURFACE+44,VB_H),transform:"translateX(-50%)"}}><span className="ad-fade block whitespace-nowrap text-center font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">Beside the system</span></span>
      <span className="absolute" style={{left:pct(117,VB_W),top:pct(SURFACE+1,VB_H),transform:"translate(-50%, -50%)"}}><span className="ad-fade block font-mono text-[11px] uppercase tracking-[0.08em] text-overcast">Pilot</span></span>
      <span className="absolute" style={{left:pct(X0,VB_W),top:pct(SURFACE-30,VB_H),transform:"translateY(-100%)"}}><span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft">People</span></span>
      <span className="absolute" style={{left:pct(X0+10,VB_W),top:pct(DATA_END+12,VB_H)}}><span className="ad-fade block whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-inkSoft">Your data</span></span>
    </div>
    <div className="lg:hidden"><div className="relative -mx-2" style={{aspectRatio:"780 / 330"}}><svg viewBox="30 0 780 330" className="absolute inset-0 h-full w-full" aria-hidden>{drawing("m")}</svg></div><dl className="mt-6 space-y-4 border-t border-dashed border-lineSoft pt-5"><div className="flex gap-3"><dt className="w-10 shrink-0 font-mono text-[11px] tracking-[0.08em] text-overcast">Pilot</dt><dd className="text-[14px] leading-snug text-inkSoft">The dashed box: beside the system, never inside it.</dd></div>{BANDS.map((b,k)=><div key={b.n} className="flex gap-3"><dt className={`w-10 shrink-0 font-mono text-[11px] tracking-[0.08em] ${k===2?"text-blue":"text-overcast"}`}>{b.n}</dt><dd className="text-[14px] leading-snug text-inkSoft"><span className="font-semibold text-ink">{b.title}.</span> {b.caption}</dd></div>)}</dl></div>
  </figure>;
}

