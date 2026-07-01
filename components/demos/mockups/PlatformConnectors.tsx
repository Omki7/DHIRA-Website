"use client";

import DynamicSketchIcon from "@/components/icons/DynamicSketchIcon";

/**
 * SIMULATED PRODUCT UI helper — not real Akashic app code.
 * Shared connector SVGs (HConn/VConn/DropConn/DagConn) and the module-card
 * icon badge (ModIcon) used to visually link the fake module cards in
 * PowerfulPlatform's flow diagram and in PlatformBIChartMockup. Purely
 * decorative line-drawing, no data.
 */

export function ModIcon({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div style={{
      width: "34px", height: "34px", borderRadius: "9px",
      background: light
        ? "rgba(255,255,255,0.08)"
        : "linear-gradient(135deg, #E4EAFF 0%, #D4DEFF 100%)",
      border: light
        ? "1px solid rgba(255,255,255,0.14)"
        : "1px solid rgba(62,99,221,0.2)",
      boxShadow: light
        ? "none"
        : "inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 3px rgba(62,99,221,0.14)",
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
    }}>
      <DynamicSketchIcon text={text} className={`w-[16px] h-[16px] ${light ? "text-white" : "text-[#3E63DD]"}`} />
    </div>
  );
}

export function HConn() {
  return (
    <div className="hidden lg:flex items-center justify-center w-[64px] flex-shrink-0 relative">
      <svg width="64" height="24" viewBox="0 0 64 24" fill="none" style={{ overflow: "visible" }}>
        <path d="M 0 12 Q 32 8, 64 12" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" />
        <path d="M 0 12 Q 32 8, 64 12" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeDasharray="16 64" fill="none">
          <animate attributeName="stroke-dashoffset" values="80;0" dur="2.5s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}

export function VConn() {
  return (
    <div className="hidden lg:block" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "-64px", height: "64px", width: "780px", zIndex: 10, pointerEvents: "none" }}>
      <svg width="780" height="64" viewBox="0 0 780 64" fill="none" style={{ overflow: "visible" }}>
        <path d="M 601 0 C 601 32, 179 32, 179 64" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" />
        <path d="M 601 0 C 601 32, 179 32, 179 64" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeDasharray="40 500" fill="none" style={{ animation: "vconn-flow 6.5s cubic-bezier(.5,0,.5,1) infinite" }} />
      </svg>
    </div>
  );
}

export function DropConn() {
  return (
    <div className="hidden lg:block" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "-64px", height: "64px", width: "780px", zIndex: 10, pointerEvents: "none" }}>
      <svg width="780" height="64" viewBox="0 0 780 64" fill="none" style={{ overflow: "visible" }}>
        <path d="M 179 0 C 179 32, 390 32, 390 64" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" />
        <path d="M 601 0 C 601 32, 390 32, 390 64" stroke="rgba(255,255,255,0.15)" strokeWidth="1.2" fill="none" />
        <path d="M 179 0 C 179 32, 390 32, 390 64" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeDasharray="30 310" fill="none" style={{ animation: "dropconn-flow 3.5s cubic-bezier(.5,0,.5,1) infinite" }} />
        <path d="M 601 0 C 601 32, 390 32, 390 64" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" strokeDasharray="30 310" fill="none" style={{ animation: "dropconn-flow 3.5s cubic-bezier(.5,0,.5,1) infinite", animationDelay: "1.75s" }} />
      </svg>
    </div>
  );
}

export function DagConn() {
  return (
    <div className="hidden lg:flex items-center justify-center w-[28px] flex-shrink-0">
      <svg width="28" height="14" viewBox="0 0 28 14" fill="none" style={{ overflow: "visible" }}>
        <path d="M 0 7 Q 14 3, 28 7" stroke="#3E63DD" strokeWidth="1.2" fill="none" opacity={0.25} />
        <path d="M 0 7 Q 14 3, 28 7" stroke="#3E63DD" strokeWidth="1.5" strokeDasharray="8 32" fill="none" opacity={0.8}>
          <animate attributeName="stroke-dashoffset" values="40;0" dur="2s" repeatCount="indefinite" />
        </path>
        <path d="M 24 4.5 L 28 7 L 24 9.5 Z" fill="#3E63DD" opacity={0.75} />
      </svg>
    </div>
  );
}
