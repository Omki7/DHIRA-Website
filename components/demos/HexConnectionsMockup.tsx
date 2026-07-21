"use client";

import React, { useEffect, useRef, useState } from "react";

const NODES = [
  { id: "sources", label: "Connected\nsources" },
  { id: "metrics", label: "Governed\nmetrics" },
  { id: "records", label: "Golden\nrecords" },
  { id: "graph", label: "Organizational\ncontext", isCenter: true },
  { id: "lineage", label: "Lineage\n& history" },
  { id: "policies", label: "Access\npolicies" },
  { id: "documents", label: "Linked\ndocuments" },
];

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

  // Calculate positions
  const centerIndex = 3;
  // Make the spread proportional to width
  const spacing = width / (NODES.length + 1);
  const nodePositions = NODES.map((node, i) => ({
    ...node,
    x: spacing * (i + 1),
    y: 36,
  }));

  const centerX = width / 2;
  const bottomY = 200; // Where lines converge

  // Helper to generate symmetric smooth curve path
  const generatePath = (startX: number, startY: number, endX: number, endY: number) => {
    const controlPointY = startY + (endY - startY) * 0.8;
    return `M ${startX} ${startY} C ${startX} ${controlPointY}, ${endX} ${controlPointY}, ${endX} ${endY}`;
  };

  return (
    <div 
      ref={containerRef} 
      className="relative w-full max-w-[1440px] mx-auto h-[230px] overflow-hidden select-none mb-6"
      style={{ fontFamily: "var(--font-sans)" }}
    >
      {/* Horizontal Axis Line */}
      <div className="absolute top-[36px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-default-stroke to-transparent opacity-60" />

      {/* SVG Layer for Connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: "visible" }}>
        {nodePositions.map((node, i) => {
          const isCenter = node.isCenter;
          const lines = isCenter ? 2 : 4;
          
          return Array.from({ length: lines }).map((_, lineIndex) => {
            // Spread the endpoints around the center
            const spreadWidth = isCenter ? 30 : 120;
            const offset = (lineIndex - (lines - 1) / 2) * (spreadWidth / lines);
            const targetX = centerX + offset;
            
            // Adjust start Y slightly so they fan out from the node
            const startY = node.y + (isCenter ? 30 : 14);
            const path = generatePath(node.x, startY, targetX, bottomY);
            
            // Generate some dots on the path for that specific Hex tech visual
            const t = 0.4 + (lineIndex * 0.15); // Parametric t value approx
            const dotY = startY + (bottomY - startY) * t;
            const dotX = node.x + (targetX - node.x) * t * t; // Roughly cubic curve position
            
            return (
              <g key={`${node.id}-${lineIndex}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="#1A1C1D"
                  strokeWidth="0.8"
                  strokeOpacity="0.18"
                />
                <circle 
                  cx={dotX} 
                  cy={dotY} 
                  r="1.5" 
                  fill="#1A1C1D" 
                  opacity="0.3" 
                />
              </g>
            );
          });
        })}

        {/* Central convergence point dots at the bottom */}
        <circle cx={centerX - 40} cy={bottomY} r="2" fill="#1A1C1D" opacity="0.1" />
        <circle cx={centerX - 15} cy={bottomY} r="2.5" fill="#1A1C1D" opacity="0.3" />
        <circle cx={centerX} cy={bottomY} r="3" fill="#1A1C1D" opacity="0.5" />
        <circle cx={centerX + 15} cy={bottomY} r="2.5" fill="#1A1C1D" opacity="0.3" />
        <circle cx={centerX + 40} cy={bottomY} r="2" fill="#1A1C1D" opacity="0.1" />
      </svg>

      {/* HTML Layer for Labels */}
      {nodePositions.map((node) => (
        <div
          key={node.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center"
          style={{ 
            left: `${node.x}px`, 
            top: `${node.y}px`
          }}
        >
          {node.isCenter ? (
            <div className="relative flex items-center justify-center px-8 py-4 border border-[#E0E2E8] bg-[#FAFAFB]/90 backdrop-blur-md shadow-sm z-10"
                 style={{ 
                   backgroundImage: "repeating-linear-gradient(45deg, rgba(229,72,77,0.03) 0, rgba(229,72,77,0.03) 1px, transparent 1px, transparent 8px)" 
                 }}>
              <span className="text-[14px] font-medium text-primary-text leading-snug whitespace-pre-wrap tracking-tight">
                {node.label}
              </span>
            </div>
          ) : (
            <div className="flex flex-col items-center z-10 bg-white/60 backdrop-blur-sm px-2 py-1 rounded-md">
              <span className="text-[12px] font-medium text-secondary-text leading-snug whitespace-pre-wrap mb-2">
                {node.label}
              </span>
              <div className="w-[4px] h-[4px] rounded-full bg-secondary-text opacity-40" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
