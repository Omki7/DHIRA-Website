"use client";

import useDrawn from "@/shared/hooks/useDrawn";
import styles from "./AboutClose.module.scss";

/*
 * The close's drawing: [03]'s elevation returns at full width, so the page
 * ends where [03] began. The same three systems [03] draws solid (education,
 * health, labour: the three live programmes, nothing added) are joined by
 * the solid blue layer; the layer runs on, dashed, to one system standing
 * apart, with an open ring where its join would be. That system is the
 * reader's. Drawn once on entering view; the final state under reduced
 * motion. Decorative: the heading carries the claim.
 *
 * Labels sit under the ground. They are placed with the `translate`
 * property, not `transform`, because `.ad-fade` animates `transform`.
 */

const VIEW_W = 880;
const VIEW_H = 236;
const GROUND = 188;
const LAYER = 32;
const BLUE = "rgb(var(--blue-400))";
const INK = "rgb(var(--ink))";

const JOINED_SILOS = [
  { x: 150, w: 44, h: 110 },
  { x: 300, w: 50, h: 138 },
  { x: 450, w: 44, h: 118 },
];
const YOURS = { x: 724, w: 52, h: 124 };
const LAYER_START = 96;
const LAYER_END = 504;

const delay = (seconds: number) => ({ ["--ad-delay" as string]: `${seconds}s` });
const labelPosition = (x: number) => ({ left: `${(x / VIEW_W) * 100}%`, top: `${((GROUND + 14) / VIEW_H) * 100}%` });

function Floors({ x, w, h, stroke, opacity }: { x: number; w: number; h: number; stroke: string; opacity: number }) {
  const count = Math.floor((h - 10) / 14);
  return (
    <>
      {Array.from({ length: count }, (_, floor) => (
        <line key={floor} x1={x - w / 2 + 6} x2={x + w / 2 - 6} y1={GROUND - 12 - floor * 14} y2={GROUND - 12 - floor * 14} stroke={stroke} strokeOpacity={opacity} />
      ))}
    </>
  );
}

export interface NextJoinDrawingProps {
  joined: string[];
  yours: string;
}

export function NextJoinDrawing({ joined, yours }: NextJoinDrawingProps) {
  const [ref, drawn] = useDrawn<HTMLDivElement>(0.4);
  const yoursTop = GROUND - YOURS.h;
  const silos = JOINED_SILOS.slice(0, joined.length);

  return (
    <div ref={ref} data-drawn={drawn} className={styles.drawing} aria-hidden>
      <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={styles.drawingSvg}>
        <line x1="24" x2={VIEW_W - 24} y1={GROUND} y2={GROUND} stroke={INK} strokeOpacity=".45" strokeWidth="1.2" />
        {Array.from({ length: 69 }, (_, k) => 30 + k * 12).map((x) => (
          <line key={x} x1={x} x2={x - 7} y1={GROUND + 1} y2={GROUND + 8} stroke={INK} strokeOpacity=".13" />
        ))}

        {silos.map((silo, index) => (
          <g key={silo.x}>
            <path
              d={`M${silo.x - silo.w / 2} ${GROUND}V${GROUND - silo.h}H${silo.x + silo.w / 2}V${GROUND}`}
              pathLength={1}
              fill="none"
              stroke={BLUE}
              strokeWidth="1.5"
              className="ad-draw"
              style={{ ...delay(index * 0.08), ["--ad-dur" as string]: "0.9s" }}
            />
            <g className="ad-fade" style={delay(0.5 + index * 0.05)}>
              <Floors {...silo} stroke={BLUE} opacity={0.35} />
            </g>
            <path d={`M${silo.x} ${LAYER}V${GROUND - silo.h}`} pathLength={1} fill="none" stroke={BLUE} strokeWidth="1.5" className="ad-draw" style={{ ...delay(0.9), ["--ad-dur" as string]: "0.5s" }} />
          </g>
        ))}
        <path d={`M${LAYER_START} ${LAYER}H${LAYER_END}`} pathLength={1} fill="none" stroke={BLUE} strokeWidth="3" strokeLinecap="round" className="ad-draw" style={{ ...delay(0.6), ["--ad-dur" as string]: "0.6s" }} />
        {silos.map((silo) => (
          <circle key={`node-${silo.x}`} cx={silo.x} cy={LAYER} r="4.5" fill={BLUE} className="ad-fade" style={delay(1.1)} />
        ))}

        <line x1={LAYER_END + 12} x2={VIEW_W - 24} y1={LAYER} y2={LAYER} stroke={BLUE} strokeOpacity=".6" strokeWidth="1.2" strokeDasharray="4 6" className="ad-fade" style={delay(1.3)} />
        <path
          d={`M${YOURS.x - YOURS.w / 2} ${GROUND}V${yoursTop}H${YOURS.x + YOURS.w / 2}V${GROUND}`}
          pathLength={1}
          fill="none"
          stroke={INK}
          strokeOpacity=".55"
          strokeWidth="1.3"
          className="ad-draw"
          style={{ ...delay(1.2), ["--ad-dur" as string]: "0.9s" }}
        />
        <g className="ad-fade" style={delay(1.6)}>
          <Floors {...YOURS} stroke={INK} opacity={0.1} />
        </g>
        <line x1={YOURS.x} x2={YOURS.x} y1={LAYER + 7} y2={yoursTop - 4} stroke={BLUE} strokeWidth="1.5" strokeDasharray="3 5" className="ad-fade" style={delay(1.8)} />
        <circle cx={YOURS.x} cy={LAYER} r="5.5" fill="rgb(var(--depth))" stroke={BLUE} strokeWidth="1.5" className="ad-fade" style={delay(1.9)} />
      </svg>

      {silos.map((silo, index) => (
        <span key={joined[index]} className={`${styles.siloLabel} ad-fade`} style={{ ...delay(1.2 + index * 0.05), ...labelPosition(silo.x) }}>
          {joined[index]}
        </span>
      ))}
      <span className={`${styles.yours} ad-fade`} style={{ ...delay(2), ...labelPosition(YOURS.x) }}>
        {yours}
      </span>
    </div>
  );
}
