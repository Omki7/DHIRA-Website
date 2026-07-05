/*
 * Animated flow connectors for the Akashic product page — blue-on-white
 * cousins of the home section's VConn/DropConn (PlatformConnectors).
 * Purely decorative line-drawing, no data. Shared by AkashicModules and
 * AkashicArchitecture so the page speaks one connective language.
 * Every connector terminates in a port Node so the sections read as one
 * connected circuit.
 */

export const LANES = [167, 500, 833];

export function FlowPath({ d }: { d: string }) {
  return (
    <g>
      <path d={d} stroke="#C8D2F5" strokeWidth="1.2" fill="none" />
      <path
        d={d}
        stroke="#3E63DD"
        strokeWidth="1.5"
        strokeDasharray="5 17"
        fill="none"
        className="animate-[ps-flow_1.8s_linear_infinite]"
        opacity="0.8"
      />
    </g>
  );
}

export function Node({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4" fill="#FFFFFF" stroke="#C8D2F5" strokeWidth="1.2" />
      <circle cx={x} cy={y} r="1.8" fill="#3E63DD" />
    </g>
  );
}

export function FanIn() {
  const sources = [100, 300, 500, 700, 900];
  const targets = [167, 167, 500, 833, 833];
  return (
    <svg
      className="hidden h-14 w-full md:block"
      viewBox="0 0 1000 56"
      preserveAspectRatio="none"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {sources.map((x, i) => (
        <FlowPath key={x} d={`M ${x} 0 C ${x} 30, ${targets[i]} 26, ${targets[i]} 56`} />
      ))}
      {sources.map((x) => (
        <Node key={`s${x}`} x={x} y={0} />
      ))}
      {LANES.map((x) => (
        <Node key={`t${x}`} x={x} y={56} />
      ))}
    </svg>
  );
}

export function MergeDown() {
  return (
    <svg
      className="hidden h-14 w-full md:block"
      viewBox="0 0 1000 56"
      preserveAspectRatio="none"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {LANES.map((x) => (
        <FlowPath key={x} d={`M ${x} 0 C ${x} 30, 500 26, 500 56`} />
      ))}
      {LANES.map((x) => (
        <Node key={`s${x}`} x={x} y={0} />
      ))}
      <Node x={500} y={56} />
    </svg>
  );
}

export function SplitDown() {
  return (
    <svg
      className="hidden h-14 w-full md:block"
      viewBox="0 0 1000 56"
      preserveAspectRatio="none"
      fill="none"
      style={{ overflow: "visible" }}
      aria-hidden
    >
      {LANES.map((x) => (
        <FlowPath key={x} d={`M 500 0 C 500 30, ${x} 26, ${x} 56`} />
      ))}
      <Node x={500} y={0} />
      {LANES.map((x) => (
        <Node key={`t${x}`} x={x} y={56} />
      ))}
    </svg>
  );
}

export function MobileConn() {
  return (
    <div className="flex flex-col items-center py-3 md:hidden" aria-hidden>
      <span className="h-2 w-2 rounded-full border-2 border-blue-border bg-white" />
      <div className="h-8 w-px bg-blue-border" />
      <span className="h-2 w-2 rounded-full border-2 border-blue-border bg-white" />
    </div>
  );
}
