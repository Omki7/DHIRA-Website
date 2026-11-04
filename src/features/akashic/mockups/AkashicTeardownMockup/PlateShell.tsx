import type { CSSProperties, ReactNode } from "react";
import { AkashicPlateScreensMockup, FACE_H, FACE_W } from "../AkashicPlateScreensMockup";
import {
  ACC,
  H,
  PLATE_TAGS,
  SEAL,
  TH,
  W,
  inkA,
  mono,
} from "./teardownData";

export function PlateScreen({ i }: { i: number }) {
  return (
    <div style={{ position: "absolute", left: (W - FACE_W) / 2, top: (H - FACE_H) / 2 }}>
      <AkashicPlateScreensMockup index={i} />
    </div>
  );
}

export function PlateShell({
  i,
  extra,
  children,
}: {
  i: number;
  extra?: ReactNode;
  children: ReactNode;
}) {
  const side = (key: string, st: CSSProperties, child?: ReactNode) => (
    <div key={key} data-ak-side={i} style={{ position: "absolute", transformOrigin: "0 0", ...st }}>
      {child}
    </div>
  );
  return (
    <div
      data-ak={`plate-${i}`}
      style={{
        position: "absolute",
        left: -W / 2,
        top: -H / 2,
        width: W,
        height: H,
        transformStyle: "preserve-3d",
        transform: `translateZ(${i * (TH + SEAL)}px)`,
      }}
    >
      <div
        data-ak={`shadow-${i}`}
        style={{
          position: "absolute",
          inset: -6,
          borderRadius: 20,
          background: "transparent",
          transform: "translateZ(-9px)",
          opacity: 0,
        }}
      />
      {side("n", {
        left: 0,
        top: 0,
        width: W,
        height: TH,
        transform: `translateZ(${TH}px) rotateX(-90deg)`,
        background: "rgb(var(--plate-north))",
      })}
      {side(
        "s",
        {
          left: 0,
          top: H,
          width: W,
          height: TH,
          transform: `translateZ(${TH}px) rotateX(-90deg)`,
          background: "rgb(var(--plate-south))",
        },
        <span
          data-ak-led={i}
          style={{
            position: "absolute",
            left: W / 2 - 9,
            top: 6.5,
            width: 18,
            height: 3,
            borderRadius: 2,
            background: ACC,
            opacity: 0.3,
          }}
        />,
      )}
      {side("w", {
        left: 0,
        top: 0,
        width: TH,
        height: H,
        transform: `translateZ(${TH}px) rotateY(90deg)`,
        background: "rgb(var(--plate-west))",
      })}
      {side("e", {
        left: W,
        top: 0,
        width: TH,
        height: H,
        transform: `translateZ(${TH}px) rotateY(90deg)`,
        background: "rgb(var(--plate-east))",
      })}
      <div
        data-ak={`top-${i}`}
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          transform: `translateZ(${TH}px)`,
          border: `1px solid ${inkA(0.36)}`,
          boxShadow: "none",
          overflow: "hidden",
        }}
      >
        <div
          data-ak={`surf-${i}`}
          style={{ position: "absolute", inset: 0, borderRadius: 13, background: "rgb(var(--plate-top))" }}
        />
        <div
          data-ak={`ghost-${i}`}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            backgroundImage: `repeating-linear-gradient(0deg, ${inkA(0.06)} 0px, ${inkA(0.06)} 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, ${inkA(0.06)} 0px, ${inkA(0.06)} 1px, transparent 1px, transparent 24px)`,
          }}
        />
        <div style={{ position: "absolute", inset: 12, border: `1px solid ${inkA(0.1)}`, borderRadius: 8 }} />
        {[
          [9, 9],
          [536, 9],
          [9, 376],
          [536, 376],
        ].map((p) => (
          <div
            key={`${p[0]}-${p[1]}`}
            style={{
              position: "absolute",
              left: p[0],
              top: p[1],
              width: 6,
              height: 6,
              borderRadius: "50%",
              border: `1px solid ${inkA(0.28)}`,
              background: "rgb(var(--background))",
            }}
          />
        ))}
        {extra}
        <div data-ak={`sch-${i}`} style={{ position: "absolute", inset: 0, opacity: 0 }}>
          <div style={{ position: "absolute", inset: 0, visibility: "hidden" }}>{children}</div>
          <PlateScreen i={i} />
        </div>
      </div>
      <div
        data-ak={`tag-${i}`}
        style={{
          position: "absolute",
          left: 2,
          top: H + 10,
          transform: `translateZ(${TH}px)`,
          ...mono,
          fontSize: 11.5,
          fontWeight: 500,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: inkA(0.8),
          opacity: 0,
        }}
      >
        {PLATE_TAGS[i]}
      </div>
    </div>
  );
}

export function FaceChip({
  label,
  dot,
  style,
}: {
  label: string;
  dot?: string;
  style: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 6,
        height: 23,
        padding: "0 9px",
        borderRadius: 999,
        border: "1px solid rgb(var(--subtle-stroke))",
        background: "rgb(var(--background) / 0.92)",
        ...style,
      }}
    >
      {dot && <span style={{ display: "block", width: 6, height: 6, borderRadius: "50%", background: dot }} />}
      <span style={{ ...mono, fontSize: 10.5, fontWeight: 500, letterSpacing: "0.1em", color: inkA(0.85) }}>
        {label}
      </span>
    </div>
  );
}

export const POINT_GLYPHS: Record<string, ReactNode> = {
  database: (
    <>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
      <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
    </>
  ),
  funnel: <path d="M3 4h18l-7 8v6l-4 2v-8L3 4z" />,
  stream: (
    <>
      <path d="M17 2l4 4-4 4" />
      <path d="M21 6H8a5 5 0 0 0-5 5" />
      <path d="M7 22l-4-4 4-4" />
      <path d="M3 18h13a5 5 0 0 0 5-5" />
    </>
  ),
  merge: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 9v3a6 6 0 0 0 6 6h3" />
    </>
  ),
  sliders: (
    <>
      <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3" />
      <path d="M1 14h6M9 8h6M17 16h6" />
    </>
  ),
  graph: (
    <>
      <circle cx="5" cy="19" r="2.5" />
      <circle cx="12" cy="6" r="2.5" />
      <circle cx="19" cy="15" r="2.5" />
      <path d="M6.5 17L10.5 8M14 7.5l3.5 6M7.5 18.6l9-3.2" />
    </>
  ),
  cube: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  cloud: <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />,
  cpu: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
    </>
  ),
  eye: (
    <>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  trace: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M12 19h4.5a3.5 3.5 0 0 0 0-7h-9a3.5 3.5 0 0 1 0-7H12" />
    </>
  ),
  quote: (
    <>
      <path d="M10 11H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6c0 2-1 3.5-3 4.5" />
      <path d="M20 11h-4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6c0 2-1 3.5-3 4.5" />
    </>
  ),
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  sparkle: <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2z" />,
  bell: (
    <>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.83 3.98" />
    </>
  ),
  shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  key: (
    <>
      <circle cx="7.5" cy="16.5" r="4.5" />
      <path d="M10.7 13.3L21 3M15 4l3 3M18 7l2 2" />
    </>
  ),
  badge: (
    <>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.5 12.9L17 22l-5-3-5 3 1.5-9.1" />
    </>
  ),
};

export function PointIcon({ glyph }: { glyph: string }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {POINT_GLYPHS[glyph]}
    </svg>
  );
}
