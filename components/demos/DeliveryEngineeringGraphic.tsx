"use client";

/*
 * Data & AI Engineering Topology Graphic — Ambient background ornament
 * Visually represents platform core, data pipelines, AI engine nodes, and custom code architecture.
 */

export default function DeliveryEngineeringGraphic({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden
      className={`w-full h-full ${className}`}
    >
      <defs>
        {/* Radial Gradient for Platform Core */}
        <radialGradient id="del-core-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3E63DD" stopOpacity="0" />
        </radialGradient>
        {/* Blue Line Gradient */}
        <linearGradient id="del-line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3E63DD" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#C8D2F5" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Ambient Core Glow */}
      <circle cx="200" cy="200" r="140" fill="url(#del-core-glow)" />

      {/* Concentric Architecture Rings */}
      <circle cx="200" cy="200" r="155" stroke="#C8D2F5" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" className="animate-[spin_120s_linear_infinite]" />
      <circle cx="200" cy="200" r="115" stroke="#3E63DD" strokeWidth="1" opacity="0.35" />
      <circle cx="200" cy="200" r="75" stroke="#3E63DD" strokeWidth="1.5" opacity="0.4" />

      {/* Connecting Data Pipelines / Rays */}
      <line x1="200" y1="200" x2="200" y2="50" stroke="url(#del-line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="330" y2="140" stroke="url(#del-line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="310" y2="300" stroke="url(#del-line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="90" y2="300" stroke="url(#del-line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />
      <line x1="200" y1="200" x2="70" y2="140" stroke="url(#del-line-grad)" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Outer Domain Nodes */}
      {/* Node 1: AI & ML Engine (Top) */}
      <g transform="translate(200, 50)">
        <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="2" />
        <circle cx="0" cy="0" r="6" fill="#3E63DD" />
        <text x="24" y="4" fill="#1A1C1D" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7">AI &amp; ML Engine</text>
      </g>

      {/* Node 2: Data Platform & Lakehouse (Top Right) */}
      <g transform="translate(330, 140)">
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#3E63DD" />
        <text x="-95" y="-12" fill="#1A1C1D" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7">Data Platform</text>
      </g>

      {/* Node 3: Custom Code & APIs (Bottom Right) */}
      <g transform="translate(310, 300)">
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#3E63DD" />
        <text x="22" y="4" fill="#1A1C1D" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7">Custom Code</text>
      </g>

      {/* Node 4: Product Engineering (Bottom Left) */}
      <g transform="translate(90, 300)">
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#3E63DD" />
        <text x="-95" y="4" fill="#1A1C1D" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7">SaaS / Cloud</text>
      </g>

      {/* Node 5: Senior Squad Sync (Top Left) */}
      <g transform="translate(70, 140)">
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="2" />
        <circle cx="0" cy="0" r="5" fill="#3E63DD" />
        <text x="-90" y="-12" fill="#1A1C1D" fontSize="10" fontFamily="monospace" fontWeight="bold" opacity="0.7">Squad Sync</text>
      </g>

      {/* Central Platform Core Node */}
      <circle cx="200" cy="200" r="28" fill="#FFFFFF" stroke="#3E63DD" strokeWidth="3" />
      <circle cx="200" cy="200" r="18" fill="#3E63DD" />
      <circle cx="200" cy="200" r="7" fill="#FFFFFF" />

      {/* Orbiting Pulsing Signal Particles */}
      <circle cx="200" cy="115" r="3.5" fill="#3E63DD" className="animate-ping" />
      <circle cx="275" cy="200" r="3.5" fill="#3E63DD" className="animate-pulse" />
      <circle cx="145" cy="255" r="3.5" fill="#3E63DD" className="animate-pulse" />
    </svg>
  );
}
