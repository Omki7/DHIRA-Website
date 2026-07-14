/*
 * Decorative 24-spoke wheel (Ashoka Chakra motif) in brand blues: outer ring,
 * 24 spokes, 24 rim marks, solid hub, slow continuous rotation. Pure brand
 * ornament (not a reproduction of the State Emblem or the flag rendering).
 */

const SPOKES = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);

export default function AshokaChakra({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden
      className={`animate-[spin_80s_linear_infinite] ${className}`}
    >
      <circle cx="100" cy="100" r="95" stroke="#C8D2F5" strokeWidth="3.5" />
      <circle cx="100" cy="100" r="88" stroke="#3E63DD" strokeWidth="1" opacity="0.3" />
      {SPOKES.map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="17"
          x2="100"
          y2="86"
          stroke="#3E63DD"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
          transform={`rotate(${angle} 100 100)`}
        />
      ))}
      {SPOKES.map((angle) => {
        const rad = ((angle + 7.5) * Math.PI) / 180;
        return (
          <circle
            key={`dot-${angle}`}
            cx={100 + 91 * Math.cos(rad)}
            cy={100 + 91 * Math.sin(rad)}
            r="1.8"
            fill="#3E63DD"
            opacity="0.55"
          />
        );
      })}
      <circle cx="100" cy="100" r="13" fill="#3E63DD" />
      <circle cx="100" cy="100" r="5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}
