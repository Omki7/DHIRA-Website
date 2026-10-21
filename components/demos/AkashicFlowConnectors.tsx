/*
 * Lineage connectors for the Akashic product page — blue-on-white kin of
 * the home page's fine-line language. Drawn like data lineage: clean
 * static edges into port nodes, NO marching-dash animation (that read as
 * demo-ware and violates the AGENTS motion budget — no perpetual motion
 * on graph backdrops). Purely decorative line-drawing, no data. Shared by
 * AkashicModules and AkashicArchitecture so the page speaks one connective
 * language. Every connector terminates in a port Node.
 */

const LANES = [167, 500, 833];

export function FlowPath({ d }: { d: string }) {
  return (
    <g>
      {/* soft rail + crisp edge, both static — a lineage line, not a stream */}
      <path d={d} stroke="rgb(var(--blue-border))" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.5" />
      <path d={d} stroke="rgb(var(--blue))" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.65" />
    </g>
  );
}

export function Node({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r="4.5" fill="rgb(var(--background))" stroke="rgb(var(--blue))" strokeWidth="1.4" opacity="0.9" />
      <circle cx={x} cy={y} r="2" fill="rgb(var(--blue))" />
    </g>
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

export function MobileConn() {
  return (
    <div className="flex flex-col items-center py-3 md:hidden" aria-hidden>
      <span className="h-2 w-2 rounded-full border-2 border-blue-border bg-background" />
      <div className="h-8 w-px bg-blue-border" />
      <span className="h-2 w-2 rounded-full border-2 border-blue-border bg-background" />
    </div>
  );
}
