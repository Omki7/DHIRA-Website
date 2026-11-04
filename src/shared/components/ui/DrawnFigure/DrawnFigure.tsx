"use client";

import type { ReactNode } from "react";
import useDrawn from "@/shared/hooks/useDrawn";

export interface DrawnFigureProps {
  children: ReactNode;
  className?: string;
  /** Share of the element in view before it draws (useDrawn). */
  threshold?: number;
}

/* Flips `data-drawn` once its content enters view, so the `.ad-*` drawing
   kit (globals.css) inside plays once; under reduced motion it starts drawn.
   Only this wrapper runs in the browser: the drawings and links inside stay
   Server Components. */
export function DrawnFigure({ children, className, threshold = 0.3 }: DrawnFigureProps) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(threshold);
  return (
    <div ref={ref} data-drawn={drawn} className={className}>
      {children}
    </div>
  );
}
