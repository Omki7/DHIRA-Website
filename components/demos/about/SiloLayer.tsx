"use client";
import useDrawn from "@/hooks/useDrawn";
const VB_W=1000, VB_H=246, GROUND=184, LAYER=30, BLUE="rgb(var(--blue-400))";
const HEIGHTS=[84,106,118,124,94,76,132,122,70,118,88,112,66,98];
/* Which silo (by position) each deployment drops into, in content order. */
const DROPS=[2,7,11];
type Deployment={name:string;figure:string};
type KeyLabels={solid:string;dashed:string;layer:string};
export default function SiloLayer({systems,deployments,keyLabels}:{systems:string[];deployments:Deployment[];keyLabels:KeyLabels}){
 const SILOS=HEIGHTS.slice(0,systems.length).map((h,k)=>({x:68+k*66,w:32+((k*7)%4)*5,h,fn:systems[k]}));
 const DEPLOYMENTS=deployments.map((d,k)=>({...d,at:DROPS[k]}));
 const JOINED=new Set(DEPLOYMENTS.map(d=>d.at));
 const [ref,drawn]=useDrawn<HTMLDivElement>(.3);
 return <div ref={ref} data-drawn={drawn} className="relative w-full" style={{aspectRatio:`${VB_W} / ${VB_H}`}}>
 <svg viewBox="0 0 1000 246" className="absolute inset-0 h-full w-full" aria-hidden>
 <line x1="16" x2="984" y1={GROUND} y2={GROUND} stroke="rgb(var(--ink))" strokeOpacity=".45" strokeWidth="1.2" />
 {Array.from({length:81},(_,k)=>20+k*12).map(x=><line key={x} x1={x} x2={x-7} y1={GROUND+1} y2={GROUND+8} stroke="rgb(var(--ink))" strokeOpacity=".13" />)}
 {SILOS.map((s,k)=>{const joined=JOINED.has(k);return <g key={s.fn}>
 <path d={`M${s.x-s.w/2} ${GROUND}V${GROUND-s.h}H${s.x+s.w/2}V${GROUND}`} pathLength={1} fill="none" stroke={joined?BLUE:"rgb(var(--ink))"} strokeOpacity={joined?.95:.3} strokeWidth={joined?1.5:1.1} className="ad-draw" style={{["--ad-delay" as string]:`${k*.04}s`,["--ad-dur" as string]:"1.1s"}} />
 <g className="ad-fade" style={{["--ad-delay" as string]:`${.6+k*.03}s`}}>{Array.from({length:Math.floor((s.h-10)/14)},(_,f)=><line key={f} x1={s.x-s.w/2+5} x2={s.x+s.w/2-5} y1={GROUND-12-f*14} y2={GROUND-12-f*14} stroke={joined?BLUE:"rgb(var(--ink))"} strokeOpacity={joined?.35:.08} />)}</g>
 {joined?<path d={`M${s.x} ${LAYER}V${GROUND-s.h}`} pathLength={1} fill="none" stroke={BLUE} strokeWidth="1.5" className="ad-draw" style={{["--ad-delay" as string]:"1.3s",["--ad-dur" as string]:"0.7s"}} />:<line x1={s.x} x2={s.x} y1={LAYER+4} y2={GROUND-s.h-4} stroke="rgb(var(--ink))" strokeOpacity=".16" strokeDasharray="2 5" className="ad-fade" style={{["--ad-delay" as string]:"1.7s"}} />}
 </g>})}
 <line x1="16" x2="984" y1={LAYER} y2={LAYER} stroke={BLUE} strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="4 6" className="ad-fade" style={{["--ad-delay" as string]:"1.9s"}} />
 {DEPLOYMENTS.map(d=><g key={d.at}><path d={`M${SILOS[d.at].x-44} ${LAYER}H${SILOS[d.at].x+44}`} pathLength={1} fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" className="ad-draw" style={{["--ad-delay" as string]:"1s",["--ad-dur" as string]:"0.6s"}} /><circle cx={SILOS[d.at].x} cy={LAYER} r="4" fill={BLUE} className="ad-fade" style={{["--ad-delay" as string]:"1.2s"}} /></g>)}
 </svg>
 {SILOS.map((s,k)=><span key={s.fn} className="absolute hidden -translate-x-1/2 -translate-y-full md:block" style={{left:`${s.x/VB_W*100}%`,top:`${(GROUND-s.h-6)/VB_H*100}%`}}><span className={`ad-fade block whitespace-nowrap bg-depth px-1 font-mono text-[10px] uppercase tracking-[0.08em] ${JOINED.has(k)?"text-blue-300":"text-uc-dim"}`} style={{["--ad-delay" as string]:`${.8+k*.03}s`}}>{s.fn}</span></span>)}
 {DEPLOYMENTS.map(d=><div key={d.at} className="absolute hidden -translate-x-1/2 text-center xl:block" style={{left:`${SILOS[d.at].x/VB_W*100}%`,top:`${(GROUND+18)/VB_H*100}%`}}><div className="ad-fade whitespace-nowrap" style={{["--ad-delay" as string]:"1.5s"}}><p className="font-mono text-[11px] uppercase tracking-[0.08em] text-uc-text">{d.name}</p><p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-blue-300">{d.figure}</p></div></div>)}
 <p className="absolute left-0 right-0 hidden -translate-y-full justify-between pb-2 font-mono text-[11px] uppercase tracking-[0.08em] sm:flex" style={{top:`${LAYER/VB_H*100}%`}}><span className="ad-fade block text-uc-mute" style={{["--ad-delay" as string]:"2s"}}>{keyLabels.solid} <span className="text-blue-300">{keyLabels.dashed}</span></span><span className="ad-fade block text-blue-300" style={{["--ad-delay" as string]:"2s"}}>{keyLabels.layer}</span></p>
 </div>;
}

