/* Severity drives colour in every EIS wireframe. Kept in one place so a
   row, a tile and a chart bar cannot drift apart. The chip labels are part
   of the simulated product screens (artwork), not page copy. */
export const SEVERITY = {
  high: { dot: "rgb(var(--diagram-pink))", text: "rgb(var(--diagram-pink))", bg: "rgb(var(--diagram-pink-bg))", border: "rgb(var(--red) / .25)", label: "Act now" },
  watch: { dot: "rgb(var(--diagram-gold))", text: "rgb(var(--diagram-gold))", bg: "rgb(var(--diagram-gold-bg))", border: "rgb(var(--diagram-gold-line))", label: "Watch" },
  clear: { dot: "rgb(var(--positive))", text: "rgb(var(--positive-text))", bg: "rgb(var(--positive-subtle))", border: "rgb(var(--positive-border))", label: "Clear" },
} as const;
