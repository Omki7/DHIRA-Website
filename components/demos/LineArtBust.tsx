/*
 * Friendly line-art bust (head + shoulders) used inside decorative SVG
 * scenes. Shared by CareersHiring's step scenes and AboutWho's journey.
 * Pure ornament: no data, no state.
 */

export default function Bust({
  cx,
  cy,
  r,
  tone = "ink",
  smile = true,
}: {
  cx: number;
  cy: number;
  r: number;
  tone?: "ink" | "blue" | "soft";
  smile?: boolean;
}) {
  const stroke = tone === "blue" ? "stroke-blue" : tone === "soft" ? "stroke-overcast" : "stroke-ink";
  const fill = tone === "blue" ? "fill-blue" : tone === "soft" ? "fill-overcast" : "fill-ink";
  return (
    <g fill="none" strokeWidth={2.3} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={cx} cy={cy} r={r} className={stroke} />
      {smile && <path d={`M ${cx - r * 0.44} ${cy + r * 0.2} q ${r * 0.44} ${r * 0.5} ${r * 0.88} 0`} className={stroke} />}
      <circle cx={cx - r * 0.36} cy={cy - r * 0.12} r={1.4} className={fill} stroke="none" />
      <circle cx={cx + r * 0.36} cy={cy - r * 0.12} r={1.4} className={fill} stroke="none" />
      <path
        d={`M ${cx - r * 2} ${cy + r * 3.5} C ${cx - r * 2} ${cy + r * 1.55}, ${cx + r * 2} ${cy + r * 1.55}, ${cx + r * 2} ${cy + r * 3.5}`}
        className={stroke}
      />
    </g>
  );
}
