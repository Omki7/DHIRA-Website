import React from "react";

interface FlyingEagleSketchProps {
  className?: string;
  strokeColor?: string;
  accentColor?: string;
}

export default function FlyingEagleSketch({
  className = "w-32 h-24 text-ink",
  strokeColor = "currentColor",
  accentColor = "#D9A034",
}: FlyingEagleSketchProps) {
  return (
    <div className={`relative inline-block ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 142 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        <g stroke={strokeColor} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          {/* Eagle Beak & Head */}
          <path d="M72 26 C76 24 82 25 86 28 L92 31 L87 33 C82 35 77 36 74 40" />
          <circle cx="80" cy="29" r="1.2" fill={strokeColor} stroke="none" />

          {/* Torso & Spine */}
          <path d="M68 44 C70 36 74 33 76 28" />
          <path d="M64 48 C66 56 68 62 70 68" strokeDasharray="2 3" opacity="0.7" />

          {/* Left Wing (Soaring Up and Out) */}
          <path d="M68 42 C52 28 30 16 8 20 C18 30 32 38 52 46" strokeWidth="2" />
          {/* Left Wing Feather Strokes */}
          <path d="M12 21 C22 30 36 38 56 45" opacity="0.75" />
          <path d="M18 23 C26 31 40 40 58 47" opacity="0.5" />
          <path d="M8 20 C4 18 2 16 1 14" opacity="0.7" />
          <path d="M12 21 C8 19 5 17 4 15" opacity="0.7" />
          <path d="M16 22 C12 20 9 18 8 16" opacity="0.7" />

          {/* Right Wing (Soaring Up and Out) */}
          <path d="M74 42 C90 28 112 16 134 20 C124 30 110 38 90 46" strokeWidth="2" />
          {/* Right Wing Feather Strokes */}
          <path d="M130 21 C120 30 106 38 86 45" opacity="0.75" />
          <path d="M124 23 C116 31 102 40 84 47" opacity="0.5" />
          <path d="M134 20 C138 18 140 16 141 14" opacity="0.7" />
          <path d="M130 21 C134 19 137 17 138 15" opacity="0.7" />
          <path d="M126 22 C130 20 133 18 134 16" opacity="0.7" />

          {/* Fan Tail Feathers */}
          <path d="M62 50 L50 74 C58 77 66 78 74 77 L80 74 L68 50" />
          <path d="M57 75 L65 52" opacity="0.6" />
          <path d="M62 76 L66 52" opacity="0.6" />
          <path d="M68 76 L67 52" opacity="0.6" />

          {/* Warm Amber Sun Circle behind eagle */}
          <circle cx="71" cy="42" r="18" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.45" />

          {/* Thermal / Wind Currents */}
          <path d="M14 54 C28 58 42 56 52 52" stroke={accentColor} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" />
          <path d="M88 52 C98 56 112 58 126 54" stroke={accentColor} strokeWidth="1.2" strokeDasharray="3 3" opacity="0.55" />
        </g>
      </svg>
    </div>
  );
}
