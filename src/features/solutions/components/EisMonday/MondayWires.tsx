"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import useDrawn from "@/shared/hooks/useDrawn";
import styles from "./EisMonday.module.scss";

/*
 * The one client leaf of [04]: it measures where each picked change sits in
 * the field and where its decision sits in the list, then draws a curve
 * between them. The rows change height with the copy and the width, so the
 * geometry is read from the layout, not assumed. Each [data-wire-from]
 * flows into the [data-wire-to] with the same value (a decision's number),
 * so several changes can meet in one decision. Only
 * from xl, where the field and the list sit side by side; final state under
 * reduced motion (useDrawn starts drawn).
 */

interface Wire {
  d: string;
  key: number;
}

export interface MondayWiresProps {
  children: ReactNode;
  className?: string;
}

export function MondayWires({ children, className }: MondayWiresProps) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.3);
  const [wires, setWires] = useState<Wire[]>([]);
  const frame = useRef(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const measure = () => {
      frame.current = 0;
      const wide = window.matchMedia("(min-width: 1280px)").matches;
      if (!wide) {
        setWires([]);
        return;
      }
      const box = root.getBoundingClientRect();
      const targets = new Map(
        Array.from(root.querySelectorAll<Element>("[data-wire-to]")).map((el) => [el.getAttribute("data-wire-to"), el]),
      );
      const from = Array.from(root.querySelectorAll<Element>("[data-wire-from]"));
      const next = from.flatMap((dot, i) => {
        const target = targets.get(dot.getAttribute("data-wire-from"));
        if (!target) return [];
        const a = dot.getBoundingClientRect();
        const b = target.getBoundingClientRect();
        const x1 = a.left + a.width / 2 - box.left;
        const y1 = a.top + a.height / 2 - box.top;
        const x2 = b.left - box.left;
        const y2 = b.top + b.height / 2 - box.top;
        const bend = (x2 - x1) * 0.55;
        return [{
          key: i,
          d: `M${x1.toFixed(1)} ${y1.toFixed(1)} C${(x1 + bend).toFixed(1)} ${y1.toFixed(1)}, ${(x2 - bend).toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`,
        }];
      });
      setWires(next);
    };
    const schedule = () => {
      if (!frame.current) frame.current = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    window.addEventListener("resize", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame.current);
      // Forget the cancelled frame, or a remount (Strict Mode) never measures.
      frame.current = 0;
      observer.disconnect();
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);

  return (
    <div ref={ref} className={className} data-drawn={drawn}>
      {children}
      <svg className={styles.wires} aria-hidden="true" focusable="false">
        {wires.map((wire) => (
          <path
            key={wire.key}
            d={wire.d}
            pathLength={1}
            className={styles.wire}
            style={{ ["--d" as string]: `${0.5 + wire.key * 0.08}s` }}
          />
        ))}
      </svg>
    </div>
  );
}
