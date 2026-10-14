"use client";

import React, { useEffect, useRef, useState } from "react";

// One node per module screen in the carousel directly above, in the SAME
// order as TABS in mockups/AkashicModuleScreensMockup.tsx, so a reader can
// match each label to the wireframe it names. Each label is what that module
// contributes to the organisation's context; all seven curves converge on the
// context box below them. Reorder the carousel and you must reorder this.
const NODES = [
  { id: "pipelines", label: "Connected\nsources" }, //  Pipelines
  { id: "master-data", label: "Golden\nrecords" }, //   Master Data
  { id: "warehouse", label: "Governed\nmetrics" }, //   Warehouse
  { id: "ml", label: "Models\n& forecasts" }, //        ML
  { id: "ask", label: "Grounded\nanswers" }, //         Ask Akashic
  { id: "bi", label: "KPIs\n& targets" }, //           BI
  { id: "governance", label: "Lineage\n& access" }, //  Governance
];

const ROW_Y = 36; // the module row
const CONVERGE_Y = 190; // top edge of the context box: every curve ends here
const LINES_PER_NODE = 4;
const SPREAD = 120; // endpoint fan across the box's top edge

export default function HexConnectionsMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(1000);

  useEffect(() => {
    if (!containerRef.current) return;
    setWidth(containerRef.current.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Make the spread proportional to width
  const spacing = width / (NODES.length + 1);
  const nodePositions = NODES.map((node, i) => ({
    ...node,
    x: spacing * (i + 1),
    y: ROW_Y,
  }));

  const centerX = width / 2;

  // Helper to generate symmetric smooth curve path
  const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
    const controlPointY = startY + (endY - startY) * 0.8;
    return `M ${startX} ${startY} C ${startX} ${controlPointY}, ${endX} ${controlPointY}, ${endX} ${endY}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[1440px] mx-auto h-[276px] overflow-hidden select-none mb-6"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Horizontal Axis Line */}
      <div className="absolute top-[36px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-default-stroke to-transparent opacity-60" />

      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        {nodePositions.map((node) =>
          Array.from({ length: LINES_PER_NODE }).map((_, lineIndex) => {
            // Spread the endpoints along the context box's top edge
            const offset = (lineIndex - (LINES_PER_NODE - 1) / 2) * (SPREAD / LINES_PER_NODE);
            const targetX = centerX + offset;

            // Start just under the node's dot so the lines fan out from it
            const startY = node.y + 14;
            const path = generatePath(node.x, startY, targetX, CONVERGE_Y);

            // Generate some dots on the path for that specific Hex tech visual
            const t = 0.4 + lineIndex * 0.15; // Parametric t value approx
            const dotY = startY + (CONVERGE_Y - startY) * t;
            const dotX = node.x + (targetX - node.x) * t * t; // Roughly cubic curve position

            return (
              <g key={`${node.id}-${lineIndex}`}>
                <path d={path} fill="none" stroke="rgb(var(--ink))" strokeWidth="0.8" strokeOpacity="0.18" />
                <circle cx={dotX} cy={dotY} r="1.5" fill="rgb(var(--ink))" opacity="0.3" />
              </g>
            );
          })
        )}
      </svg>

      {/* HTML Layer for Labels */}
      {nodePositions.map((node) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center"
          style={{
            left: `${node.x}px`,
            top: `${node.y}px`,
          }}
        >
          <div className="flex flex-col items-center z-10 bg-background/60 backdrop-blur-sm px-2 py-1 rounded-md">
            <span className="text-[12px] font-medium text-secondary-text leading-snug whitespace-pre-wrap mb-2">
              {node.label}
            </span>
            <div className="w-[4px] h-[4px] rounded-full bg-secondary-text opacity-40" />
          </div>
        </div>
      ))}

      {/* Where the curves unite: the seven modules combine into one context */}
      <div
        className="absolute z-10 -translate-x-1/2 flex items-center justify-center px-8 py-4 border border-line bg-primary-bg/90 backdrop-blur-md shadow-sm text-center"
        style={{
          left: `${centerX}px`,
          top: `${CONVERGE_Y}px`,
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(229,72,77,0.03) 0, rgba(229,72,77,0.03) 1px, transparent 1px, transparent 8px)",
        }}
      >
        <span className="text-[14px] font-medium text-primary-text leading-snug whitespace-pre-wrap tracking-tight">
          {"Organisational\ncontext"}
        </span>
      </div>
    </div>
  );
}
