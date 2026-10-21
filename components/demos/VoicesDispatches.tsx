"use client";

import Image from "next/image";
import { useState } from "react";
import type { HomeVoices } from "@/content/pages/home";

// A reader-led interview spread. The quote stays still until the reader moves on.
export default function VoicesDispatches({ content }: { content: HomeVoices }) {
  const HOME_VOICES = content.dispatches;
  const { highlight } = content;
  const [active, setActive] = useState(0);
  const dispatch = HOME_VOICES[active];

  return (
    <div className="mt-10 grid gap-9 lg:mt-14 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-16 xl:gap-24">
      <div className="flex items-start gap-6 lg:block">
        <div className="relative w-28 shrink-0 sm:w-36 lg:w-[200px]">
          <div className="overflow-hidden rounded-t-[100px] bg-primary-bg">
            <Image key={dispatch.avatarPath} src={dispatch.avatarPath} alt={dispatch.name} width={240} height={300} sizes="(min-width: 1024px) 200px, 144px" className="aspect-[4/5] w-full object-cover object-top grayscale mix-blend-multiply" />
          </div>
          <span aria-hidden="true" className="absolute -right-4 bottom-4 flex h-11 w-11 items-center justify-center rounded-full border border-blue-border bg-band font-mono text-[11px] text-blue">{dispatch.index}</span>
        </div>
        <div className="mt-2 lg:mt-7">
          <p className="text-[16px] font-semibold tracking-tight text-ink">{dispatch.name}</p>
          <p className="mt-1 max-w-[22ch] text-[13px] leading-relaxed text-inkSoft">{dispatch.role}</p>
          <p className="mt-3 font-mono text-[10px] uppercase tracking-eyebrow text-blue">{dispatch.org}</p>
        </div>
      </div>

      <div className="min-w-0">
        <div className="relative grid" aria-live="polite" aria-atomic="true">
          <span aria-hidden="true" className="absolute -top-8 right-0 font-display text-[140px] leading-none text-blue-border sm:-top-12 sm:text-[190px]">“</span>
          {HOME_VOICES.map((item, index) => (
            <blockquote key={item.index} aria-hidden={index !== active} className={`relative col-start-1 row-start-1 font-display text-[27px] leading-[1.26] tracking-tight text-ink sm:text-[34px] lg:text-[39px] xl:text-[43px] ${index === active ? "visible" : "invisible"}`}>
              {item.quote.split(new RegExp(`(${highlight})`, "g")).map((part, i) => part === highlight ? <span key={i} className="text-blue">{part}</span> : part)}
            </blockquote>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-4 border-t border-blue-border pt-5 lg:mt-10">
          <p className="mr-auto font-mono text-[10px] uppercase tracking-eyebrow text-inkSoft">{dispatch.index} / 0{HOME_VOICES.length}</p>
          <button type="button" aria-label={content.previous} onClick={() => setActive((active + HOME_VOICES.length - 1) % HOME_VOICES.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-border text-ink transition-colors hover:bg-background motion-reduce:transition-none"><span aria-hidden="true">←</span></button>
          <button type="button" aria-label={content.next} onClick={() => setActive((active + 1) % HOME_VOICES.length)} className="flex h-11 w-11 items-center justify-center rounded-full border border-blue-border text-ink transition-colors hover:bg-background motion-reduce:transition-none"><span aria-hidden="true">→</span></button>
        </div>
      </div>

      <div role="group" aria-label={content.chooser} className="col-span-full grid grid-cols-1 border-t border-blue-border sm:grid-cols-3">
        {HOME_VOICES.map((item, index) => (
          <button key={item.index} type="button" aria-pressed={active === index} onClick={() => setActive(index)} className={`group relative flex min-h-20 items-center gap-4 border-b border-blue-border py-5 text-left sm:border-b-0 sm:px-5 lg:px-7 ${active === index ? "text-ink" : "text-inkSoft"}`}>
            <span className={`absolute inset-x-0 top-0 h-px ${active === index ? "bg-blue" : "bg-transparent"}`} />
            <span className={`font-mono text-[10px] ${active === index ? "text-blue" : "text-inkSoft"}`}>{item.index}</span>
            <span><span className="block text-[14px] font-medium">{item.name}</span><span className="mt-1 block text-[12px] text-inkSoft">{item.org}</span></span>
            <span aria-hidden="true" className="ml-auto text-lg text-blue">{active === index ? "↗" : ""}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
