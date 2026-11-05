/* About [05]: where each person sits in the portrait field.

   The field is a staggered lozenge sized to the roster. Rows widen towards
   the middle and alternate odd and even counts, so every row sits half a
   step across from its neighbours. Each row is laid on a grid of half
   columns (a portrait spans two), which is what makes the stagger possible.
   Background dots carry the pattern out to the edges (decoration only), and
   any position the roster does not fill, always on an outer row, joins them.
   Pure and deterministic: the server and the client draw the same field. */

export interface FieldSlot {
  row: number;
  /** First of the two half columns the circle spans (1-based). */
  column: number;
}

export interface FieldDot extends FieldSlot {
  opacity: number;
}

export interface FieldLayout {
  rows: number;
  /** One position per person, in roster order. */
  people: FieldSlot[];
  ambient: FieldDot[];
}

export interface FieldShape {
  /** The most circles a row can hold. */
  perRow: number;
  /** The middle row's width as a multiple of the row count: keeps the field wide, not tall. */
  ratio: [min: number, max: number];
  /** How many dots it takes the background to fade in from the edge. */
  fade: number;
}

/* An ellipse (or a squarer superellipse) rounded row by row to alternating
   parity, then held so no row is wider than the middle one, or more than one
   circle wider than the row inside it. */
function rowsFor(rows: number, centre: number, power: number): number[] {
  const mid = (rows - 1) / 2;
  const counts = Array.from({ length: rows }, (_, row) => {
    const d = Math.abs(row - mid);
    const ideal = centre * (1 - (d / (mid + 0.5)) ** power) ** (1 / power);
    const parity = (centre + d) % 2;
    return Math.max(parity || 2, Math.round((ideal - parity) / 2) * 2 + parity);
  });
  for (let d = 1; d <= mid; d++) {
    for (const row of [mid - d, mid + d]) {
      const inner = counts[row < mid ? row + 1 : row - 1];
      while (counts[row] > inner + 1 || counts[row] > centre) counts[row] -= 2;
    }
  }
  return counts;
}

/* The smallest shape that seats everyone, favouring few empty positions,
   then few rows. */
function rowCounts(total: number, { perRow, ratio: [min, max] }: FieldShape): number[] {
  let best: { score: number; counts: number[] } | null = null;
  for (let rows = 3; rows <= 25; rows += 2) {
    for (let centre = Math.ceil(rows * min); centre <= Math.min(perRow, rows * max); centre++) {
      for (const power of [2, 2.5, 3]) {
        const counts = rowsFor(rows, centre, power);
        const seats = counts.reduce((sum, count) => sum + count, 0);
        if (seats < total) continue;
        const score = (seats - total) * 2 + rows;
        if (!best || score < best.score) best = { score, counts };
      }
    }
  }
  if (!best) throw new Error(`teamField: no field shape seats ${total} people`);
  return best.counts;
}

export function teamField(total: number, shape: FieldShape): FieldLayout {
  const counts = rowCounts(total, shape);
  const { perRow, fade } = shape;
  const slots = counts.map((count, row) =>
    Array.from({ length: count }, (_, i): FieldSlot => ({ row: row + 1, column: perRow - count + 1 + i * 2 })),
  );

  // Spare positions go to the ends of the outer rows, alternating corners.
  const spareKeys = new Set<string>();
  const ends: [number, "first" | "last"][] = [];
  for (let d = 0; d < counts.length / 2; d++) {
    const top = d;
    const bottom = counts.length - 1 - d;
    ends.push([top, "first"], [bottom, "last"], [top, "last"], [bottom, "first"]);
  }
  const spare = counts.reduce((sum, count) => sum + count, 0) - total;
  for (const [row, end] of ends) {
    if (spareKeys.size === spare) break;
    const slot = end === "first" ? slots[row][0] : slots[row][slots[row].length - 1];
    spareKeys.add(`${slot.row}:${slot.column}`);
  }
  const all = slots.flat();
  const isSpare = (slot: FieldSlot) => spareKeys.has(`${slot.row}:${slot.column}`);

  const ambient = counts.flatMap((count, row) => {
    const first = perRow - count + 1;
    const last = first + (count - 1) * 2;
    const offset = (first + 1) % 2;
    const positions = perRow - offset;
    return Array.from({ length: positions }, (_, i) => ({
      row: row + 1,
      column: i * 2 + 1 + offset,
      opacity: Math.min(0.8, Math.min(i + 1, positions - i) / fade),
    })).filter((dot) => dot.column < first || dot.column > last);
  });

  const spareDots = all.filter(isSpare).map((slot) => ({ ...slot, opacity: 0.8 }));
  return { rows: counts.length, people: all.filter((slot) => !isSpare(slot)), ambient: [...ambient, ...spareDots] };
}

/* Spread the `apart` items through the list, everything else keeping its
   order. The field uses it so people without a photograph never gather in one
   corner, however the roster is appended to. Each lands near its even share
   of the list, nudged by a fixed integer hash so they do not line up into
   diagonals; the nudge stays small enough that no two collide. Integer maths
   only, so the server and every browser agree. */
export function spreadEvenly<T>(items: T[], apart: (item: T) => boolean): T[] {
  const spread = items.filter(apart);
  const rest = items.filter((item) => !apart(item));
  if (!spread.length || !rest.length) return items;
  const gap = items.length / spread.length;
  const reach = Math.max(0, Math.min(0.32, (1 - 1 / gap) / 2));
  const nudge = (i: number) => ((Math.imul(i + 1, 2654435761) >>> 0) % 1001) / 500 - 1;
  const at = new Set(spread.map((_, i) => Math.min(items.length - 1, Math.max(0, Math.floor((i + 0.5 + reach * nudge(i)) * gap)))));
  let s = 0;
  let r = 0;
  return items.map((_, position) => (at.has(position) ? spread[s++] : rest[r++]));
}

/* How much each person stands forward when one is selected: the selected
   person fully, their neighbours nearly, the far side of the field least.
   Distance is in portrait steps; rows sit slightly closer than columns. */
export function spotlight(layout: FieldLayout, active: number, { floor = 0.68, step = 0.07 } = {}): number[] {
  const centre = layout.people[active];
  return layout.people.map((slot, index) => {
    if (index === active || !centre) return 1;
    const distance = Math.hypot((slot.column - centre.column) / 2, (slot.row - centre.row) * 0.92);
    return Math.round(Math.max(floor, 0.96 - step * distance) * 100) / 100;
  });
}
