"use client";

import { useEffect, useRef, useState } from "react";

interface ResponsiveCanvasProps {
  children: React.ReactNode;
  originalWidth: number;
  originalHeight: number;
  className?: string;
}

export default function ResponsiveCanvas({ children, originalWidth, originalHeight, className = "" }: ResponsiveCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      if (cw === 0) return; // Wait until container has a width
      // padding adjustment: using cw - 28 like in the original script
      const s = Math.min(1, (cw - 28) / originalWidth);
      setScale(Math.max(0.1, s));
    };

    updateScale();

    const observer = new ResizeObserver(updateScale);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [originalWidth]);

  const hasPosition = className.includes("absolute") || className.includes("fixed") || className.includes("relative");
  const positionClass = hasPosition ? "" : "relative";

  return (
    <div ref={containerRef} className={`${positionClass} flex items-center justify-center overflow-hidden ${className}`}>
      <div
        style={{
          width: originalWidth,
          height: originalHeight,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
          position: "absolute",
          left: "50%",
          top: "50%",
          marginLeft: `-${originalWidth / 2}px`,
          marginTop: `-${originalHeight / 2}px`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
