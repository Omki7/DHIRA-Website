/*
 * Isometric scene renderer for the sector maps. Pure render: parent passes
 * the scene data, active step, and reduced-motion flag. One kit of iso
 * primitives (grid ground, shadowed buildings with windows/ribs/doors,
 * console on a plinth, masts, pylons) + flow routes with travelling data
 * packets. Inline attributes are computed geometry (Rule 8 exception).
 */

import type { Building, MapScene } from "./mapData";
import { ROUTES, RETURN_ROUTE } from "./mapData";

const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";

type P = [number, number];
const j = (points: P[]) => points.map((p) => p.join(",")).join(" ");

function corners(x: number, y: number, w: number, d: number) {
  const p0: P = [x, y];
  const p1: P = [x + w, y - w * 0.5];
  const p2: P = [x + w - d, y - (w + d) * 0.5];
  const p3: P = [x - d, y - d * 0.5];
  return { p0, p1, p2, p3 };
}
const up = ([px, py]: P, h: number): P => [px, py - h];

function Shadow({ x, y, w, d, dim }: { x: number; y: number; w: number; d: number; dim: boolean }) {
  return (
    <ellipse
      cx={x + (w - d) / 2}
      cy={y - (w + d) / 4 + 4}
      rx={(w + d) * 0.62}
      ry={(w + d) * 0.2}
      fill="#0a0a0c"
      style={{ opacity: dim ? 0.02 : 0.045, transition: `opacity 500ms ${EASE}` }}
    />
  );
}

function Box({
  x,
  y,
  w,
  d,
  h,
  active,
  dim,
  topFill,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  active: boolean;
  dim: boolean;
  topFill?: string;
}) {
  const { p0, p1, p2, p3 } = corners(x, y, w, d);
  const stroke = active ? "#3E63DD" : "#c9cfd8";
  const common = {
    stroke,
    strokeWidth: active ? 1.25 : 1,
    strokeLinejoin: "round" as const,
    style: { transition: `all 500ms ${EASE}` },
  };
  return (
    <g style={{ opacity: dim ? 0.35 : 1, transition: `opacity 500ms ${EASE}` }}>
      <polygon points={j([p0, p3, up(p3, h), up(p0, h)])} fill="#FAFAFB" {...common} />
      <polygon points={j([p0, p1, up(p1, h), up(p0, h)])} fill="#F3F3F4" {...common} />
      <polygon points={j([up(p0, h), up(p1, h), up(p2, h), up(p3, h)])} fill={topFill ?? (active ? "#EEF1FC" : "#FFFFFF")} {...common} />
    </g>
  );
}

/* window rows on the right (p0→p1) and left (p0→p3) faces */
function FaceLines({
  x,
  y,
  w,
  d,
  h,
  active,
  dim,
}: {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  active: boolean;
  dim: boolean;
}) {
  const rows: number[] = [];
  for (let lift = 18; lift < h - 10; lift += 22) rows.push(lift);
  const stroke = active ? "#C8D2F5" : "#e0e3e8";
  return (
    <g style={{ opacity: dim ? 0.3 : 1, transition: `opacity 500ms ${EASE}` }}>
      {rows.map((lift) => (
        <g key={lift}>
          <line
            x1={x + w * 0.14}
            y1={y - w * 0.07 - lift}
            x2={x + w * 0.86}
            y2={y - w * 0.43 - lift}
            stroke={stroke}
            strokeWidth={2.5}
            style={{ transition: `stroke 500ms ${EASE}` }}
          />
          <line
            x1={x - d * 0.14}
            y1={y - d * 0.07 - lift}
            x2={x - d * 0.86}
            y2={y - d * 0.43 - lift}
            stroke={stroke}
            strokeWidth={2.5}
            style={{ transition: `stroke 500ms ${EASE}` }}
          />
        </g>
      ))}
    </g>
  );
}

function BuildingShape({ b, active, dim, reduced }: { b: Building; active: boolean; dim: boolean; reduced: boolean }) {
  const { x, y, w, d, h } = b;
  const stroke = active ? "#3E63DD" : "#c9cfd8";

  switch (b.type) {
    case "tower":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} dim={dim} />
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <FaceLines x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <Box x={x + w * 0.3} y={y - (w + d) * 0.25 - h + w * 0.15} w={16} d={12} h={8} active={active} dim={dim} />
        </g>
      );
    case "stack":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} dim={dim} />
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <Box x={x + w - 24} y={y - (w - 18) * 0.5 - 3} w={12} d={10} h={h + 22} active={active} dim={dim} />
        </g>
      );
    case "block":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} dim={dim} />
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <Box x={x + 8} y={y - 6 - h + 2} w={18} d={14} h={8} active={active} dim={dim} />
        </g>
      );
    case "shed": {
      const doorStroke = active ? "#3E63DD" : "#c9cfd8";
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} dim={dim} />
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          {/* ribs on the left face */}
          <g style={{ opacity: dim ? 0.3 : 0.9, transition: `opacity 500ms ${EASE}` }}>
            {[0.3, 0.55, 0.8].map((t) => (
              <line
                key={t}
                x1={x - d * t}
                y1={y - (d * t) / 2}
                x2={x - d * t}
                y2={y - (d * t) / 2 - h + 6}
                stroke={active ? "#C8D2F5" : "#e0e3e8"}
                strokeWidth={1}
                style={{ transition: `stroke 500ms ${EASE}` }}
              />
            ))}
          </g>
          {/* door on the right face */}
          <polygon
            points={j([
              [x + w * 0.34, y - w * 0.17],
              [x + w * 0.66, y - w * 0.33],
              [x + w * 0.66, y - w * 0.33 - h * 0.55],
              [x + w * 0.34, y - w * 0.17 - h * 0.55],
            ])}
            fill="#FAFAFB"
            stroke={doorStroke}
            strokeWidth={1}
            style={{ transition: `all 500ms ${EASE}`, opacity: dim ? 0.35 : 1 }}
          />
        </g>
      );
    }
    case "unit":
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} dim={dim} />
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <polygon
            points={j([
              [x + w * 0.2, y - w * 0.1 - h * 0.45],
              [x + w * 0.8, y - w * 0.4 - h * 0.45],
              [x + w * 0.8, y - w * 0.4 - h * 0.8],
              [x + w * 0.2, y - w * 0.1 - h * 0.8],
            ])}
            fill={active ? "#EEF1FC" : "#FFFFFF"}
            stroke={stroke}
            strokeWidth={0.8}
            style={{ transition: `all 500ms ${EASE}`, opacity: dim ? 0.35 : 1 }}
          />
        </g>
      );
    case "mast":
      return (
        <g>
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <circle
            cx={x}
            cy={y - h - 8}
            r={4}
            fill={active ? "#3E63DD" : "#c9cfd8"}
            style={{
              transition: `fill 500ms ${EASE}`,
              opacity: dim ? 0.35 : 1,
              animation: active && !reduced ? "ps-pulse 2s infinite" : undefined,
            }}
          />
        </g>
      );
    case "homes":
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <Shadow x={x + i * 46} y={y - i * 23} w={w} d={d} dim={dim} />
              <Box x={x + i * 46} y={y - i * 23} w={w} d={d} h={h} active={active} dim={dim} />
            </g>
          ))}
        </g>
      );
    case "pylons":
      return (
        <g style={{ opacity: dim ? 0.35 : 1, transition: `opacity 500ms ${EASE}` }}>
          {[0, 1].map((i) => {
            const px = x + i * 84;
            const py = y - i * 42;
            return (
              <g key={i} stroke={stroke} strokeWidth={1.1} style={{ transition: `all 500ms ${EASE}` }}>
                <line x1={px - 9} y1={py} x2={px} y2={py - h} />
                <line x1={px + 9} y1={py} x2={px} y2={py - h} />
                <line x1={px - 13} y1={py - h + 16} x2={px + 13} y2={py - h + 16} />
                <line x1={px - 8} y1={py - h + 30} x2={px + 8} y2={py - h + 30} />
              </g>
            );
          })}
          <path
            d={`M ${x} ${y - h + 16} Q ${x + 42} ${y - 21 - h + 34} ${x + 84} ${y - 42 - h + 16}`}
            fill="none"
            stroke={active ? "#C8D2F5" : "#dfe2e8"}
            strokeWidth={1}
            style={{ transition: `stroke 500ms ${EASE}` }}
          />
        </g>
      );
    case "console": {
      const screenX = x + 2;
      const screenY = y - h - 2;
      return (
        <g>
          <Shadow x={x} y={y} w={w} d={d} dim={dim} />
          <Box x={x} y={y} w={w} d={d} h={h} active={active} dim={dim} />
          <Box x={screenX} y={screenY} w={56} d={8} h={42} active={active} dim={dim} topFill="#FFFFFF" />
          {[0.24, 0.5, 0.76].map((t, i) => {
            const bx = screenX + t * 56;
            const by = screenY - t * 28;
            return (
              <line
                key={t}
                x1={bx}
                y1={by - 8}
                x2={bx}
                y2={by - 8 - (12 + i * 6)}
                stroke={active ? "#3E63DD" : "#c9cfd8"}
                strokeWidth={4.5}
                strokeLinecap="round"
                style={{ transition: `stroke 500ms ${EASE}`, opacity: dim ? 0.35 : 1 }}
              />
            );
          })}
        </g>
      );
    }
  }
}

function Label({ b, active, dim }: { b: Building; active: boolean; dim: boolean }) {
  if (!b.label || !b.labelAt) return null;
  const [lx, ly] = b.labelAt;
  const [title, sub] = b.label;
  return (
    <g style={{ opacity: dim ? 0.32 : 1, transition: `opacity 500ms ${EASE}` }}>
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        className="font-mono"
        fontSize={9.5}
        fontWeight={600}
        letterSpacing="0.1em"
        fill={active ? "#3E63DD" : "#5C5E63"}
        style={{ textTransform: "uppercase", transition: `fill 500ms ${EASE}` }}
      >
        {title}
      </text>
      {sub ? (
        <text
          x={lx}
          y={ly + 12}
          textAnchor="middle"
          className="font-mono"
          fontSize={8.5}
          letterSpacing="0.08em"
          fill="#8f99a8"
          style={{ textTransform: "uppercase" }}
        >
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function Flow({
  path,
  on,
  faint,
  packets,
  reduced,
  reverse,
}: {
  path: string;
  on: boolean;
  faint: boolean;
  packets: boolean;
  reduced: boolean;
  reverse?: boolean;
}) {
  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#3E63DD"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeDasharray="1.5 7"
        style={{
          opacity: on ? (faint ? 0.28 : 0.85) : 0,
          transition: `opacity 600ms ${EASE}`,
          animation: reduced || !on ? undefined : `dashmove 1s linear infinite${reverse ? " reverse" : ""}`,
        }}
      />
      {packets && !reduced
        ? [0, -1.3].map((begin) => (
            <circle key={begin} r={3} fill="#3E63DD" opacity={0.9}>
              <animateMotion
                dur="2.6s"
                repeatCount="indefinite"
                begin={`${begin}s`}
                path={path}
                keyPoints={reverse ? "1;0" : "0;1"}
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          ))
        : null}
    </g>
  );
}

export default function SectorMapScene({
  scene,
  step,
  reduced,
}: {
  scene: MapScene;
  step: number;
  reduced: boolean;
}) {
  const floorOn = step >= 1;
  const entOn = step >= 2;
  const backOn = step >= 3;

  const groupActive = (g: 1 | 2 | 3) =>
    g === 1 ? floorOn : g === 2 ? entOn : backOn;
  const groupDim = (g: 1 | 2 | 3) => {
    if (step === 0) return false;
    if (step === 1) return g !== 1;
    if (step === 2) return g === 3;
    return false;
  };

  const plateActive = entOn || backOn;
  const plateDim = step === 1;
  const { alert } = scene;

  return (
    <svg
      viewBox="0 0 960 580"
      className="h-auto w-full"
      role="img"
      aria-label={`Isometric map of a ${scene.noun}: its systems streaming data into the Akashic foundation, with answers flowing back`}
    >
      {/* ground grid */}
      {[
        [430, 215],
        [310, 155],
        [190, 95],
      ].map(([rx, ry]) => (
        <polygon
          key={rx}
          points={j([
            [500 - rx, 340],
            [500, 340 - ry],
            [500 + rx, 340],
            [500, 340 + ry],
          ])}
          fill="none"
          stroke="#eef0f3"
          strokeDasharray="3 6"
        />
      ))}

      {/* Akashic plate */}
      <g>
        <Shadow x={490} y={524} w={180} d={140} dim={plateDim} />
        <Box x={490} y={520} w={180} d={140} h={14} active={plateActive} dim={plateDim} />
        <g style={{ opacity: plateDim ? 0.4 : 1, transition: `opacity 500ms ${EASE}` }}>
          <text
            x={510}
            y={432}
            textAnchor="middle"
            className="font-mono"
            fontSize={11}
            fontWeight={700}
            letterSpacing="0.16em"
            fill={plateActive ? "#3E63DD" : "#5C5E63"}
            style={{ textTransform: "uppercase", transition: `fill 500ms ${EASE}` }}
          >
            Akashic
          </text>
          <text
            x={510}
            y={446}
            textAnchor="middle"
            className="font-mono"
            fontSize={8.5}
            letterSpacing="0.1em"
            fill="#8f99a8"
            style={{ textTransform: "uppercase" }}
          >
            one governed record
          </text>
        </g>
      </g>

      {/* buildings (paint order = data order) */}
      {scene.buildings.map((b, i) => (
        <g key={i}>
          <BuildingShape b={b} active={groupActive(b.group)} dim={groupDim(b.group)} reduced={reduced} />
          <Label b={b} active={groupActive(b.group)} dim={groupDim(b.group)} />
        </g>
      ))}

      {/* flows */}
      {scene.buildings
        .filter((b) => b.slot)
        .map((b) => {
          const on = groupActive(b.group);
          const focus = (step === 1 && b.group === 1) || (step === 2 && b.group === 2);
          return (
            <Flow
              key={b.slot}
              path={ROUTES[b.slot!]}
              on={on}
              faint={on && !focus && step !== 3 ? true : step === 3 ? true : false}
              packets={focus}
              reduced={reduced}
            />
          );
        })}
      <Flow path={RETURN_ROUTE} on={backOn} faint={false} packets={backOn} reduced={reduced} reverse />

      {/* alert chip (final step) */}
      <g style={{ opacity: backOn ? 1 : 0, transition: `opacity 500ms ${EASE} 200ms` }}>
        <line
          x1={alert.tick[0]}
          y1={alert.tick[1]}
          x2={alert.tick[2]}
          y2={alert.tick[3]}
          stroke="#3E63DD"
          strokeWidth={1}
          strokeDasharray="2 3"
        />
        <rect x={alert.x} y={alert.y} width={alert.w} height={26} rx={13} fill="#EEF1FC" stroke="#C8D2F5" />
        <circle
          cx={alert.x + 14}
          cy={alert.y + 13}
          r={3}
          fill="#3E63DD"
          style={{ animation: backOn && !reduced ? "ps-pulse 2s infinite" : undefined }}
        />
        <text
          x={alert.x + 24}
          y={alert.y + 17}
          className="font-mono"
          fontSize={9.5}
          fontWeight={600}
          letterSpacing="0.05em"
          fill="#1A1C1D"
          style={{ textTransform: "uppercase" }}
        >
          {alert.text}
        </text>
      </g>
    </svg>
  );
}
