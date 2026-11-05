"use client";

/*
 * SIMULATED PRODUCT UI — Akashic modular teardown (AGENTS.md §8a).
 * The /akashic [02] "Introducing Akashic" stage: a machined product unit
 * (faceplate wordmark, edge status LEDs, blue seam accents) opens into
 * six plates (pipelines → BI) over an always-on governance frame, then
 * reseals for the "start anywhere" close where individual plates pull
 * out like drawers to show any subset works on its own.
 *
 * Since 5 Nov 2026 (platform audit): the scene runs from lg up only; below
 * lg the same markup reads as a plain column (AkashicModular). Scroll is the
 * only input: the engine never moves the page by itself, never rewrites the
 * URL (module links land on the anchor spans in AkashicModular), and its
 * frame loop stops as soon as nothing is moving.
 */

import { useEffect, useRef, type CSSProperties, type RefObject } from "react";
import type { AkashicPage } from "@/content/pages/akashic";
import { FigureEyebrow, PreviewTag } from "@/shared/components/ui";
import useMinWidth from "@/shared/hooks/useMinWidth";
import usePrefersReducedMotion from "@/shared/hooks/usePrefersReducedMotion";
import { PlateShell, PointIcon } from "./PlateShell";
import {
  Plate0PipelinesSketch,
  Plate1MasterDataSketch,
  Plate2WarehouseSketch,
  Plate3MlSketch,
  Plate4AskSketch,
  Plate5BiSketch,
  Plate5ExtraWordmark,
} from "./PlateSketches";
import {
  ACC,
  COMBO_SETS,
  H,
  HUD_NAMES,
  OPEN,
  SEAL,
  TEARDOWN_SEGS_VH,
  TH,
  clamp,
  inkA,
  lerp,
  mono,
  setText,
  ss,
} from "./teardownData";
import styles from "./AkashicTeardownMockup.module.scss";

export { MODULE_ANCHOR_ALIASES, TEARDOWN_TRACK_VH, moduleAnchorVh } from "./teardownData";

export interface AkashicTeardownMockupProps {
  content: AkashicPage["howItWorks"];
  trackRef: RefObject<HTMLDivElement | null>;
  curtainHeight: number;
}

export function AkashicTeardownMockup({ content, trackRef, curtainHeight }: AkashicTeardownMockupProps) {
  const MODULES = content.modules;
  const rootRef = useRef<HTMLDivElement>(null);
  const curtainRef = useRef(curtainHeight);
  const boundsRef = useRef<number[]>([0]);
  const geomRef = useRef({ trackTop: 0, trackH: 1, vh: 800 });
  const reduced = usePrefersReducedMotion();
  const reducedRef = useRef(reduced);
  const measureRef = useRef<() => void>(() => {});
  /* The pinned scene runs from lg up; below it the markup is a plain column. */
  const pinned = useMinWidth(1024);

  /* A HUD tick scrolls to the middle of its module's segment, the same
     place the module's anchor span lands. */
  const goToModule = (c: number) => {
    if (measureRef.current) measureRef.current();
    const b = boundsRef.current;
    if (!b || b.length < c + 3) return;
    const dest = geomRef.current.trackTop + curtainRef.current + b[c + 1] + (b[c + 2] - b[c + 1]) * 0.5;
    window.scrollTo({ top: dest, behavior: reducedRef.current ? "instant" : "smooth" });
  };

  useEffect(() => {
    curtainRef.current = curtainHeight;
    geomRef.current.trackH = 1;
  }, [curtainHeight]);

  useEffect(() => {
    reducedRef.current = reduced;
  }, [reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !pinned) return;

    const el: Record<string, HTMLElement | SVGElement> = {};
    root.querySelectorAll<HTMLElement>("[data-ak]").forEach((n) => {
      el[n.dataset.ak as string] = n;
    });
    const get = (k: string) => el[k] as HTMLElement;
    const sides: HTMLElement[][] = [];
    const leds: HTMLElement[] = [];
    for (let i = 0; i < 6; i++) {
      sides.push(Array.from(root.querySelectorAll<HTMLElement>(`[data-ak-side="${i}"]`)));
      leds.push(root.querySelector<HTMLElement>(`[data-ak-led="${i}"]`) as HTMLElement);
    }
    const pipeDots = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-dot]")).map((n) => ({
      el: n,
      px: +(n.dataset.px as string),
      py: +(n.dataset.py as string),
      qx: +(n.dataset.qx as string),
      qy: +(n.dataset.qy as string),
      phase: +(n.dataset.phase as string),
    }));
    const frags = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-frag]")).map((n) => ({
      el: n,
      x0: +(n.dataset.x0 as string),
      y0: +(n.dataset.y0 as string),
      x1: +(n.dataset.x1 as string),
      y1: +(n.dataset.y1 as string),
      r0: +(n.dataset.r0 as string),
      merge: n.dataset.merge === "1",
    }));
    const tickLines = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-tickline]"));
    const tickNums = Array.from(root.querySelectorAll<HTMLElement>("[data-ak-ticknum]"));

    const whL = [0, 1, 2].map((i) => el[`wh-l${i}`] as SVGPathElement);
    const whLen = whL.map((p) => p.getTotalLength());
    whL.forEach((p, i) => {
      p.style.strokeDasharray = `${whLen[i]}`;
      p.style.strokeDashoffset = `${whLen[i]}`;
    });
    const mlFit = el["ml-fit"] as SVGPathElement;
    const fitLen = mlFit.getTotalLength();
    mlFit.style.strokeDasharray = `${fitLen}`;
    mlFit.style.strokeDashoffset = `${fitLen}`;
    const spark = el["spark"] as SVGPathElement;
    const sparkLen = spark.getTotalLength();
    spark.style.strokeDasharray = `${sparkLen}`;
    spark.style.strokeDashoffset = `${sparkLen}`;

    let fit = 1;
    let mobile = false;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      mobile = vw < 768;
      fit = mobile ? clamp(vw / 700, 0.4, 0.8) : clamp(Math.min(vw / 1500, vh / 950), 0.42, 1.05);
      (el["scene"] as HTMLElement).style.perspectiveOrigin = mobile ? "50% 40%" : "62% 44%";
      const track = trackRef.current;
      if (track) {
        geomRef.current.trackTop = track.getBoundingClientRect().top + window.scrollY;
        geomRef.current.trackH = track.offsetHeight;
      }
      geomRef.current.vh = vh;
      const b = [0];
      let acc = 0;
      for (const s of TEARDOWN_SEGS_VH) {
        acc += (s * vh) / 100;
        b.push(acc);
      }
      boundsRef.current = b;
    };
    measure();
    measureRef.current = measure;
    const onResize = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("resize", onResize);

    let sy = 0;
    let lastQN = -1;
    let lastCombo = -1;
    let capAlpha = 0;
    const pullCur = [0, 0, 0, 0, 0, 0];
    const ringCur = [0, 0, 0, 0, 0, 0];
    const dimCur = [0, 0, 0, 0, 0, 0];
    let painted = false;
    let raf = 0;

    const layout = (cpos: number, time: number) => {
      const tAnim = reducedRef.current ? 0 : time;
      const X = ss(cpos, 0.55, 1.4) * (1 - ss(cpos, 8.02, 8.5));
      const gap = lerp(SEAL, OPEN, X);
      const step = TH + gap;

      let fpos: number;
      if (cpos < 1) fpos = 0;
      else if (cpos < 7) {
        const c = Math.floor(cpos - 1);
        const tt = cpos - 1 - c;
        fpos = c < 5 ? c + ss(tt, 0.86, 1) : 5;
      } else if (cpos < 8) fpos = lerp(5, 2.5, ss(cpos - 7, 0, 0.5));
      else fpos = 2.5;

      const FW = ss(cpos, 0.8, 1.2) * (1 - ss(cpos, 6.85, 7.35));
      const G = ss(cpos, 7.08, 7.5);
      const Gout = 1 - ss(cpos, 8.02, 8.45);
      const Z8 = ss(cpos, 8.0, 8.55);

      const comboIdx = cpos >= 9.5 ? 2 : cpos >= 9.0 ? 1 : cpos >= 8.5 ? 0 : -1;
      const ease = reducedRef.current ? 1 : 0.13;
      let settling = 0;
      for (let i = 0; i < 6; i++) {
        let pullT = 0,
          ringT = 0,
          dimT = 0;
        if (comboIdx >= 0) {
          const entry = COMBO_SETS[comboIdx].find((e) => e[0] === i);
          if (entry) {
            pullT = 140 * entry[1];
            ringT = comboIdx === 2 ? 0.6 : 1;
          } else dimT = 1;
        }
        pullCur[i] += (pullT - pullCur[i]) * ease;
        ringCur[i] += (ringT - ringCur[i]) * ease;
        dimCur[i] += (dimT - dimCur[i]) * ease;
        settling = Math.max(settling, Math.abs(pullT - pullCur[i]) / 140, Math.abs(ringT - ringCur[i]), Math.abs(dimT - dimCur[i]));
      }
      const pull = pullCur;
      const ring = ringCur;
      const dim = dimCur;

      const rotX = 50 - 2.5 * ss(cpos, 1, 7) + 3 * ss(cpos, 7.05, 7.7);
      const rotZ = -42 + 7 * ss(cpos, 0.6, 7.6) - 4 * ss(cpos, 8, 8.7);
      const scale = (0.94 + 0.1 * ss(cpos, 0.6, 1.5) - 0.26 * ss(cpos, 7.0, 7.7) - 0.06 * Z8) * fit;
      const sinX = Math.sin((rotX * Math.PI) / 180);
      const idleW = Math.max(1 - ss(cpos, 0.35, 0.75), ss(cpos, 9.72, 9.95));
      const bob = Math.sin(tAnim * 1.5) * 4 * idleW;
      const ty = (fpos * step + TH) * sinX * scale - 30 + bob;

      const rig = get("rig");
      const baseLeft = mobile ? 50 : 62;
      const baseTop = mobile ? 63 : 54;
      const closeTop = mobile ? 74 : 70;
      rig.style.left = `${lerp(baseLeft, 50, Z8)}%`;
      rig.style.top = `${lerp(baseTop, closeTop, Z8)}%`;
      rig.style.transform = `translate3d(0px,${ty.toFixed(1)}px,0px) rotateX(${rotX.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale3d(${scale.toFixed(3)},${scale.toFixed(3)},${scale.toFixed(3)})`;

      const sealedW = 1 - X;
      const gArr: number[] = [];
      const aliveArr: number[] = [];
      const FArr: number[] = [];
      for (let i = 0; i < 6; i++) {
        // A plate comes alive as it lifts (the end of the previous module's
        // segment), so the focused plate is never an empty frame.
        const alive = ss(cpos, 0.9 + i, 1.2 + i);
        const S = Math.max(1 - 0.88 * X, alive);
        let F = FW * Math.max(0, 1 - Math.abs(fpos - i));
        F = F * F * (3 - 2 * F);
        const g = ss(cpos, 0.95 + i, 1.45 + i);
        gArr.push(g);
        aliveArr.push(alive);
        FArr.push(F);
        const drawn = Math.abs(pull[i]) / 140;
        const P = Math.max(1 - X, alive);
        get(`plate-${i}`).style.transform = `translateZ(${(i * step + 26 * F + 10 * drawn).toFixed(1)}px) translateX(${pull[i].toFixed(1)}px)`;
        get(`surf-${i}`).style.opacity = `${P * (1 - 0.42 * dim[i])}`;
        get(`ghost-${i}`).style.opacity = ((1 - P) * X * 0.4).toFixed(3);
        const top = get(`top-${i}`);
        top.style.borderColor = inkA(0.14 + 0.22 * S);
        const effF = Math.max(F, ring[i] * 0.85);
        top.style.outline = effF > 0.01 ? `1.5px solid ${ACC}` : "none";
        const sOp = `${(0.1 + 0.9 * P) * (1 - 0.35 * dim[i])}`;
        for (const sd of sides[i]) sd.style.opacity = sOp;
        leds[i].style.opacity = (
          Math.min(1, sealedW * (0.28 + 0.22 * (1 + Math.sin(tAnim * 2 + i * 0.8)) * 0.5) + ring[i]) *
          (1 - 0.65 * dim[i])
        ).toFixed(3);
        get(`shadow-${i}`).style.opacity = (X * 0.45 * P).toFixed(3);
        const tag = get(`tag-${i}`);
        tag.style.top = `${cpos < 8 ? -30 : H + 10}px`;
        tag.style.opacity = Math.max(X * alive * F, drawn).toFixed(3);
        tag.style.color = ACC;
        let schOp = alive * (0.5 + 0.5 * F);
        if (i === 5) schOp *= X;
        else schOp = Math.min(1, schOp + 0.55 * ring[i]);
        get(`sch-${i}`).style.opacity = schOp.toFixed(3);
      }
      const word = get("word");
      word.style.opacity = sealedW.toFixed(3);
      get("faceled").style.opacity = (0.45 + 0.55 * (1 + Math.sin(tAnim * 2.2)) * 0.5).toFixed(3);

      const railLen = 5 * step + TH + 26;
      const railOp = 0.06 * X + 0.92 * G * Gout;
      for (let i = 0; i < 4; i++) {
        const r = get(`rail-${i}`);
        r.style.opacity = Math.min(1, railOp * (1 - i * 0.06)).toFixed(3);
        r.style.transform = `rotateX(90deg) scaleY(${(railLen / 600).toFixed(4)})`;
      }
      const st = ss(cpos, 7.2, 7.9);
      const scan = get("scan");
      scan.style.opacity = (Math.sin(st * Math.PI) * 0.9 * G).toFixed(3);
      scan.style.transform = `translateZ(${(st * (5 * step + TH)).toFixed(1)}px)`;
      for (let i = 0; i < 3; i++) {
        const gv = get(`gov-${i}`);
        gv.style.opacity = (ss(G, 0.35 + i * 0.18, 0.6 + i * 0.18) * Gout).toFixed(3);
        gv.style.transform = `translate3d(0px,0px,${((1.1 + i * 1.5) * step).toFixed(1)}px) rotateZ(${(-rotZ).toFixed(2)}deg) rotateX(${(-rotX).toFixed(2)}deg)`;
      }
      get("floorshadow").style.opacity = (0.4 + 0.25 * X).toFixed(3);

      const bg = ss(cpos, 5.45, 5.8) * (1 - ss(cpos, 6.2, 6.55));
      const beam = get("beam");
      beam.style.opacity = bg.toFixed(3);
      beam.style.transform = `translateZ(${(4 * step).toFixed(1)}px) rotateX(-90deg) scaleY(${(((4 * step - 6) / 560) * bg).toFixed(4)})`;

      for (let b = 0; b <= 8; b++) {
        const t = get(`txt-${b}`);
        let op: number, y: number;
        if (b === 0) {
          const o = ss(cpos, 0.5, 0.92);
          op = 1 - o;
          y = -o * 44;
        } else if (b === 8) {
          const iIn = ss(cpos, 8.3, 8.72);
          op = iIn;
          y = (1 - iIn) * 26;
        } else {
          const d = cpos - b;
          const iIn = b === 1 ? ss(d, 0.04, 0.2) : ss(d, 0, 0.14);
          const iOut = b === 7 ? ss(d, 0.86, 1.06) : ss(d, 0.86, 1);
          op = iIn * (1 - iOut);
          y = (1 - iIn) * 34 - iOut * 34;
        }
        t.style.opacity = op.toFixed(3);
        t.style.transform = `translateY(${y.toFixed(1)}px)`;
        t.style.pointerEvents = op > 0.5 ? "auto" : "none";
      }

      const combo = get("combo");
      if (comboIdx !== lastCombo) {
        if (comboIdx >= 0) combo.textContent = `${comboIdx + 1} / ${COMBO_SETS.length} · ${content.combos[comboIdx]}`;
        capAlpha = 0;
        lastCombo = comboIdx;
      }
      const capTarget = comboIdx >= 0 ? 1 : 0;
      capAlpha += (capTarget - capAlpha) * (reducedRef.current ? 1 : 0.1);
      settling = Math.max(settling, Math.abs(capTarget - capAlpha));
      combo.style.opacity = capAlpha.toFixed(3);

      const depth = Math.min(100, Math.round((cpos / 10) * 100));
      setText(get("pct"), `${String(depth).padStart(3, "0")}%`);
      get("prog").style.width = `${depth}%`;
      const mi = Math.floor(cpos);
      setText(get("hudmod"), mi === 0 ? content.hud.sealed : mi >= 8 ? content.hud.modular : HUD_NAMES[mi - 1]);
      for (let c = 0; c < 7; c++) {
        const on = mi - 1 === c;
        tickLines[c].style.background = on ? ACC : inkA(0.4);
        tickLines[c].style.height = on ? "22px" : "16px";
        tickNums[c].style.color = on ? ACC : inkA(0.72);
      }

      const hud = get("hud");
      if (hud) {
        const isStartAnywhere = cpos >= 8.0;
        hud.style.opacity = isStartAnywhere ? "0" : "1";
        hud.style.pointerEvents = isStartAnywhere ? "none" : "auto";
      }

      /* schematics */
      if (aliveArr[0] > 0.02) {
        for (const d of pipeDots) {
          const u = (d.phase + gArr[0] * 0.9 + tAnim * 0.12 * (0.25 + 0.75 * Math.max(FArr[0], ring[0]))) % 1;
          d.el.style.transform = `translate(${lerp(d.px, d.qx, u).toFixed(1)}px,${lerp(d.py, d.qy, u).toFixed(1)}px)`;
          d.el.style.background = u > 0.62 ? ACC : inkA(0.5);
          d.el.style.opacity = u < 0.04 || u > 0.97 ? "0" : "0.9";
        }
      }
      if (aliveArr[1] > 0.02) {
        const e = ss(gArr[1], 0.05, 0.9);
        for (const f of frags) {
          f.el.style.transform = `translate(${lerp(f.x0, f.x1, e).toFixed(1)}px,${lerp(f.y0, f.y1, e).toFixed(1)}px) rotate(${lerp(f.r0, 0, e).toFixed(1)}deg)`;
          f.el.style.opacity = f.merge ? `${1 - ss(gArr[1], 0.72, 0.88)}` : "1";
        }
        const go = ss(gArr[1], 0.78, 0.96);
        const gold = get("gold");
        gold.style.opacity = go.toFixed(3);
        gold.style.transform = `scale(${(0.85 + 0.15 * go).toFixed(3)})`;
        get("goldlab").style.opacity = go.toFixed(3);
      }
      for (let j = 0; j < 3; j++) {
        const tj = ss(gArr[2], 0.05 + j * 0.1, 0.35 + j * 0.1);
        const tEl = get(`wh-t${j}`);
        tEl.style.opacity = tj.toFixed(3);
        tEl.style.transform = `translateY(${((1 - tj) * 14).toFixed(1)}px)`;
        const lj = ss(gArr[2], 0.42 + j * 0.14, 0.72 + j * 0.14);
        get(`wh-g${j}`).style.opacity = Math.min(1, lj * 1.4).toFixed(3);
        whL[j].style.strokeDashoffset = ((1 - lj) * whLen[j]).toFixed(1);
      }
      get("ml-dots").style.opacity = (ss(gArr[3], 0.02, 0.3) * 0.9).toFixed(3);
      mlFit.style.strokeDashoffset = ((1 - ss(gArr[3], 0.08, 0.6)) * fitLen).toFixed(1);
      const fco = ss(gArr[3], 0.6, 0.85);
      get("ml-fc").style.opacity = fco.toFixed(3);
      get("ml-fclab").style.opacity = fco.toFixed(3);
      get("ml-band").style.opacity = ss(gArr[3], 0.72, 0.95).toFixed(3);
      const n = Math.round(ss(gArr[4], 0.15, 0.55) * content.askQuestion.length);
      if (n !== lastQN) {
        get("ask-q").textContent = content.askQuestion.slice(0, n);
        lastQN = n;
      }
      const ao = ss(gArr[4], 0.62, 0.8);
      const aska = get("ask-a");
      aska.style.opacity = ao.toFixed(3);
      aska.style.transform = `translateY(${((1 - ao) * 10).toFixed(1)}px)`;
      for (let j = 0; j < 6; j++) {
        get(`bar-${j}`).style.transform = `scaleY(${ss(gArr[5], 0.1 + j * 0.07, 0.42 + j * 0.07).toFixed(3)})`;
      }
      spark.style.strokeDashoffset = ((1 - ss(gArr[5], 0.35, 0.75)) * sparkLen).toFixed(1);
      setText(get("kpi"), `${(94.2 * ss(gArr[5], 0.25, 0.7)).toFixed(1)}%`);
      return settling > 0.002;
    };

    const inRangeAt = (y: number) => {
      const { trackTop, vh, trackH } = geomRef.current;
      return y > trackTop - vh * 1.5 && y < trackTop + trackH + vh * 0.5;
    };

    /* Ambient motion (the data dots, LEDs, the idle bob) runs on a clock that
       only advances while frames run, so it resumes where it stopped. */
    let clock = 0;
    let lastT = 0;

    const frame = (tms: number) => {
      raf = 0;
      const { trackTop, vh } = geomRef.current;
      if (geomRef.current.trackH <= 1) measure();
      const trackH = geomRef.current.trackH;
      const y = window.scrollY;
      if (!inRangeAt(y) && painted) {
        lastT = 0;
        return;
      }
      clock += lastT ? Math.min(64, tms - lastT) : 16;
      lastT = tms;

      const passed = clamp(y - trackTop, 0, Math.max(1, trackH - vh));
      const target = Math.max(0, passed - curtainRef.current);
      sy += (target - sy) * (reducedRef.current ? 1 : 0.16);
      if (Math.abs(target - sy) < 0.4) sy = target;

      const b = boundsRef.current;
      let s = 0;
      while (s < 9 && sy >= b[s + 1]) s++;
      let len = b[s + 1] - b[s];
      if (s === 9) len = Math.max(1, len - vh);
      const t = clamp((sy - b[s]) / len, 0, 1);
      const easing = layout(s + t, clock / 1000);
      painted = true;

      // Keep going only while something still moves; scroll wakes it again.
      if (sy !== target || easing) raf = requestAnimationFrame(frame);
      else lastT = 0;
    };
    const wake = () => {
      if (!raf && inRangeAt(window.scrollY)) raf = requestAnimationFrame(frame);
    };
    window.addEventListener("scroll", wake, { passive: true });
    /* Re-measure when anything above the track changes height (fonts,
       images, sections that settle after load). */
    const pageObserver = new ResizeObserver(() => {
      measure();
      wake();
    });
    pageObserver.observe(document.body);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      pageObserver.disconnect();
      window.removeEventListener("scroll", wake);
      window.removeEventListener("resize", onResize);
    };
  }, [trackRef, content, pinned]);

  return (
    <div ref={rootRef} className={styles.root}>
      {/* 3D scene */}
      <div data-ak="scene" className={styles.scene} style={{ perspective: 1900, perspectiveOrigin: "62% 44%" }}>
        <div
          data-ak="rig"
          style={{
            position: "absolute",
            left: "62%",
            top: "54%",
            width: 0,
            height: 0,
            transformStyle: "preserve-3d",
            transform: "translate3d(0,-30px,0) rotateX(50deg) rotateZ(-42deg) scale3d(0.94,0.94,0.94)",
            willChange: "transform",
          }}
        >
          {/* floor */}
          <div
            style={{
              position: "absolute",
              left: -650,
              top: -500,
              width: 1300,
              height: 1000,
              transform: "translateZ(-26px)",
              backgroundImage: `repeating-linear-gradient(0deg, ${inkA(0.05)} 0px, ${inkA(0.05)} 1px, transparent 1px, transparent 56px), repeating-linear-gradient(90deg, ${inkA(0.05)} 0px, ${inkA(0.05)} 1px, transparent 1px, transparent 56px)`,
              WebkitMaskImage: "radial-gradient(closest-side, black 30%, transparent 92%)",
              maskImage: "radial-gradient(closest-side, black 30%, transparent 92%)",
            }}
          />
          <div
            data-ak="floorshadow"
            style={{
              position: "absolute",
              left: -410,
              top: -310,
              width: 820,
              height: 620,
              transform: "translateZ(-25px)",
              background: "transparent",
              opacity: 0.5,
            }}
          />

          {/* governance rails */}
          {[
            [-292, -212],
            [292, -212],
            [-292, 212],
            [292, 212],
          ].map((p, i) => (
            <div
              key={i}
              data-ak={`rail-${i}`}
              style={{
                position: "absolute",
                left: p[0],
                top: p[1],
                width: 1,
                height: 600,
                transformOrigin: "0 0",
                transform: "rotateX(90deg) scaleY(0.06)",
                background: ACC,
                opacity: 0.06,
              }}
            />
          ))}

          {/* audit scan plane */}
          <div
            data-ak="scan"
            style={{
              position: "absolute",
              left: -296,
              top: -216,
              width: 592,
              height: 432,
              border: `1px solid ${ACC}`,
              borderRadius: 18,
              background: "transparent",
              transform: "translateZ(0px)",
              opacity: 0,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 8,
                top: -18,
                ...mono,
                fontSize: 10.5,
                fontWeight: 500,
                letterSpacing: "0.16em",
                color: ACC,
              }}
            >
              AUDIT SWEEP
            </div>
          </div>

          {/* grounding beam */}
          <div
            data-ak="beam"
            style={{
              position: "absolute",
              left: -1,
              top: 0,
              width: 2,
              height: 560,
              transformOrigin: "0 0",
              transform: "translateZ(76px) rotateX(-90deg) scaleY(0)",
              background: ACC,
              opacity: 0,
            }}
          />

          {/* governance billboard labels */}
          {["ACCESS", "LINEAGE", "AUDIT"].map((label, i) => (
            <div
              key={label}
              data-ak={`gov-${i}`}
              style={{
                position: "absolute",
                left: 306,
                top: 216,
                width: 170,
                ...mono,
                fontSize: 11.5,
                fontWeight: 500,
                letterSpacing: "0.16em",
                color: inkA(0.85),
                opacity: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ display: "block", width: 22, height: 1, background: ACC }} />
              <span>{label}</span>
            </div>
          ))}

          {/* plate 0 · pipelines */}
          <PlateShell i={0}>
            <Plate0PipelinesSketch />
          </PlateShell>

          {/* plate 1 · master data */}
          <PlateShell i={1}>
            <Plate1MasterDataSketch />
          </PlateShell>

          {/* plate 2 · warehouse */}
          <PlateShell i={2}>
            <Plate2WarehouseSketch />
          </PlateShell>

          {/* plate 3 · ml */}
          <PlateShell i={3}>
            <Plate3MlSketch />
          </PlateShell>

          {/* plate 4 · ask */}
          <PlateShell i={4}>
            <Plate4AskSketch />
          </PlateShell>

          {/* plate 5 · bi */}
          <PlateShell i={5} extra={<Plate5ExtraWordmark />}>
            <Plate5BiSketch />
          </PlateShell>
        </div>
      </div>

      {/* narrative rail */}
      <div className={styles.narrativeRail0}>
        <div data-ak="txt-0">
          <h2 className={styles.headline0}>
            <span className={styles.headline0Soft}>{content.title.setup}</span>{" "}
            <span className={styles.headline0Block}>{content.title.payoff}</span>
          </h2>
          <p className={styles.lede0}>{content.lede}</p>
        </div>
      </div>

      {MODULES.map((m, i) => (
        <div
          key={m.name}
          className={styles.narrativeRailModule}
          style={{ "--stack-order": 3 + 2 * i } as CSSProperties}
        >
          <div data-ak={`txt-${i + 1}`} style={{ position: "relative", opacity: 0 }}>
            <span aria-hidden className={styles.modNum}>
              0{i + 1}
            </span>
            <p className={styles.modEyebrow}>
              <span className={styles.modEyebrowBlue}>
                0{i + 1} / {String(MODULES.length).padStart(2, "0")}
              </span>
              <span className={styles.modEyebrowLine} aria-hidden />
              <span className={styles.modKicker}>{m.kicker}</span>
            </p>
            <h3 className={styles.modTitle}>{m.name}</h3>
            <p className={styles.modLede}>{m.lede}</p>
            <ul className={styles.modPoints}>
              {m.points.map((pt) => (
                <li key={pt.text} className={styles.modPointItem}>
                  <span className={styles.modPointBadge}>
                    <PointIcon glyph={pt.icon} />
                  </span>
                  <span className={styles.modPointText}>
                    {pt.text}
                    {pt.preview && <PreviewTag className={styles.previewTagWrap} />}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* close chapter */}
      <div className={styles.narrativeRailClose}>
        <div data-ak="txt-8" style={{ opacity: 0 }}>
          <p className={styles.closeEyebrow}>
            <span className={styles.closeEyebrowBlue}>{content.close.kicker[0]}</span>
            <span className={styles.modEyebrowLine} aria-hidden />
            <span className={styles.closeEyebrowSoft}>{content.close.kicker[1]}</span>
          </p>
          <h3 className={styles.closeTitle}>{content.close.title}</h3>
          <p className={styles.closeBody}>{content.close.body}</p>
          <div className={styles.closeTaglineWrap}>
            <span className={styles.closeTagline}>{content.close.tagline}</span>
          </div>
        </div>
      </div>

      {/* drawer-combo caption */}
      <div data-ak="combo" className={styles.comboBadge} style={{ opacity: 0 }} />

      {/* frame chrome */}
      <div className={styles.frameChromeTop}>
        <FigureEyebrow
          num={content.eyebrow.number}
          label={content.frameLabel.replace(/^\[\d+\]\s*/, "") || content.eyebrow.label}
        />
      </div>

      <div data-ak="hud" className={styles.hud}>
        <div className={styles.hudModLeft}>
          <span className={styles.hudModDim}>{content.hud.module}</span>
          <span data-ak="hudmod" className={styles.hudModInk}>
            {content.hud.sealed}
          </span>
        </div>
        <div className={styles.hudTicks}>
          {HUD_NAMES.map((name, c) => (
            <button
              key={name}
              type="button"
              title={`${content.hud.module} 0${c + 1}: ${name}`}
              aria-label={`${content.hud.goTo} 0${c + 1}: ${name.toLowerCase()}`}
              onClick={() => goToModule(c)}
              className={styles.hudTickBtn}
            >
              <span data-ak-tickline className={styles.hudTickLine} style={{ height: 16, background: inkA(0.4) }} />
              <span data-ak-ticknum className={styles.hudTickNum} style={{ color: inkA(0.72) }}>
                0{c + 1}
              </span>
            </button>
          ))}
        </div>
        <div className={styles.hudDepthRight}>
          <span className={styles.hudModDim}>{content.hud.depth}</span>
          <span data-ak="pct" className={styles.hudModInk}>
            000%
          </span>
        </div>
        <span data-ak="prog" className={styles.hudProgress} style={{ width: "0%" }} aria-hidden />
      </div>
    </div>
  );
}
