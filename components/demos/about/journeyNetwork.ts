import { JOURNEY_MOMENTS, type JourneyThread } from "@/lib/aboutJourney";

type Colour = readonly [number, number, number];
type Knot = readonly [number, number];
interface Thread {
  id: string;
  knots: readonly Knot[];
  colour: Colour;
  weight: number;
  fibres: number;
  open?: boolean;
  future?: boolean;
}
interface Sample { x: number; y: number; at: number; fade: number }

const GOLD: Colour = [161, 123, 65];
const BLUE: Colour = [66, 104, 173];
const TEAL: Colour = [45, 131, 125];
const VIOLET: Colour = [122, 91, 164];
const ROSE: Colour = [161, 104, 136];
const MOMENT_COLOURS: Colour[] = JOURNEY_MOMENTS.map(({ colour }) => [
  parseInt(colour.slice(1, 3), 16), parseInt(colour.slice(3, 5), 16), parseInt(colour.slice(5, 7), 16),
]);
const clamp = (value: number) => Math.max(0, Math.min(1, value));
const ease = (value: number) => { const t = clamp(value); return t * t * (3 - 2 * t); };
const mix = (a: Colour, b: Colour, t: number): Colour => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const rgba = (colour: Colour, opacity: number) => `rgba(${colour[0]},${colour[1]},${colour[2]},${opacity})`;

const SPINE: readonly Knot[] = [[-2, 34], [-0.65, -14], [0, 0], [0.65, 18], [1, 12], [1.6, -9], [2, -17], [2.7, -5], [3, 0], [3.7, 19], [4, 15], [4.65, -4], [5, -12], [5.6, -6], [6, 0], [6.6, 13], [7, 8], [7.6, -4], [8, 0], [8.7, 16], [10.6, -8]];

// Uneven, authored control points give each part of the history its own silhouette.
function ordinate(knots: readonly Knot[], at: number): number {
  let segment = 0;
  while (segment < knots.length - 2 && at > knots[segment + 1][0]) segment++;
  const a = knots[segment], b = knots[segment + 1];
  const previous = knots[Math.max(0, segment - 1)], next = knots[Math.min(knots.length - 1, segment + 2)];
  const distance = b[0] - a[0], t = clamp((at - a[0]) / distance);
  const before = (b[1] - previous[1]) / (b[0] - previous[0]);
  const after = (next[1] - a[1]) / (next[0] - a[0]);
  return (2 * t ** 3 - 3 * t ** 2 + 1) * a[1] + (t ** 3 - 2 * t ** 2 + t) * before * distance
    + (-2 * t ** 3 + 3 * t ** 2) * b[1] + (t ** 3 - t ** 2) * after * distance;
}
const spine = (at: number) => ordinate(SPINE, at);

const RESEARCH: readonly Knot[] = [[1, spine(1)], [1.32, -12], [1.92, -83], [2.35, -109], [2.7, -58], [3, spine(3)]];
const DELIVERY: readonly Knot[] = [[2, spine(2)], [2.36, 11], [2.84, 88], [3.55, 118], [4, 101], [4.8, 133], [5.5, 106], [6.6, 74], [7.25, 58], [8.4, 95], [10.5, 53]];
const ML: readonly Knot[] = [[4, spine(4)], [4.25, -4], [4.75, -101], [5.2, -143], [5.8, -120], [6.25, -103], [6.7, -42], [7, spine(7)]];
const AI: readonly Knot[] = [[5, ordinate(ML, 5)], [5.34, -150], [5.88, -184], [6.25, -171], [6.65, -69], [7, spine(7)]];
const KNOWLEDGE: readonly Knot[] = [[6, spine(6)], [6.18, -14], [6.47, -67], [6.74, -53], [7, spine(7)]];
const DOCUMENTS: readonly Knot[] = [[6.35, 134], [6.55, 121], [6.76, 68], [7, spine(7)]];
const AGENTS: readonly Knot[] = [[8, spine(8)], [8.28, -11], [8.66, -66], [9.12, -115], [9.72, -132], [10.6, -206]];
const OVERSIGHT: readonly Knot[] = [[8, spine(8)], [8.33, 17], [8.85, 79], [9.38, 125], [10.6, 150]];

const THREADS: readonly Thread[] = [
  { id: "national-delivery", knots: DELIVERY, colour: TEAL, weight: 0.95, fibres: 7, open: true },
  { id: "platform-research", knots: RESEARCH, colour: BLUE, weight: 1.15, fibres: 9 },
  { id: "machine-learning", knots: ML, colour: VIOLET, weight: 1.15, fibres: 8 },
  { id: "artificial-intelligence", knots: AI, colour: VIOLET, weight: 0.8, fibres: 6 },
  { id: "knowledge", knots: KNOWLEDGE, colour: BLUE, weight: 0.9, fibres: 6 },
  { id: "recognition", knots: [[6, spine(6)], [6.16, 22], [6.28, 68], [6.46, 122], [6.8, 137], [7.2, 120]], colour: GOLD, weight: 0.8, fibres: 5, open: true },
  { id: "documents", knots: DOCUMENTS, colour: TEAL, weight: 0.7, fibres: 5 },
  { id: "agents", knots: AGENTS, colour: VIOLET, weight: 1, fibres: 9, open: true, future: true },
  { id: "oversight", knots: OVERSIGHT, colour: ROSE, weight: 0.85, fibres: 7, open: true, future: true },
  { id: "learning-programme", knots: [[4, ordinate(DELIVERY, 4)], [4.24, 111], [4.65, 173], [5.14, 194]], colour: TEAL, weight: 0.4, fibres: 3, open: true },
  { id: "employment-programme", knots: [[5, ordinate(DELIVERY, 5)], [5.35, 136], [5.92, 193], [6.3, 183]], colour: TEAL, weight: 0.5, fibres: 4, open: true },
  { id: "governance", knots: [[6, spine(6)], [6.23, 28], [6.65, 43], [7, spine(7)]], colour: BLUE, weight: 0.75, fibres: 5 },
  { id: "semantic-context", knots: [[6.13, ordinate(AI, 6.13)], [6.35, -179], [6.7, -213], [7.3, -201]], colour: VIOLET, weight: 0.38, fibres: 3, open: true },
  { id: "connected-work", knots: [[8.75, ordinate(AGENTS, 8.75)], [9, -96], [9.3, -178], [10.6, -220]], colour: BLUE, weight: 0.6, fibres: 5, open: true, future: true },
  { id: "human-agency", knots: [[8.7, ordinate(OVERSIGHT, 8.7)], [9.02, 83], [9.35, 180], [10.4, 210]], colour: ROSE, weight: 0.5, fibres: 4, open: true, future: true },
];

const focusKnots = (thread: JourneyThread) => thread === "time" ? SPINE : THREADS.find((path) => path.id === thread)?.knots ?? SPINE;

function noise(value: number, seed: number): number {
  const hash = (index: number) => { const n = Math.sin(index * 127.1 + seed * 311.7) * 43758.5453; return (n - Math.floor(n)) * 2 - 1; };
  const base = Math.floor(value), t = ease(value - base);
  return hash(base) * (1 - t) + hash(base + 1) * t;
}

// An original temporal landscape. Its camera travels through real milestone forks.
export function createJourneyNetwork(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return null;
  const ctx = context;
  let width = 0, height = 0;

  const resize = () => {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    const density = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * density);
    canvas.height = Math.round(height * density);
    ctx.setTransform(density, 0, 0, density, 0, 0);
  };

  const draw = (momentPosition: number) => {
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const position = Math.max(0, Math.min(JOURNEY_MOMENTS.length - 1, momentPosition));
    const index = Math.floor(position), nextIndex = Math.min(index + 1, JOURNEY_MOMENTS.length - 1);
    const from = JOURNEY_MOMENTS[index], to = JOURNEY_MOMENTS[nextIndex], blend = position - index;
    const progress = from.at + (to.at - from.at) * blend;
    const mobile = width < 700;
    const spacing = width * (mobile ? 0.44 : 0.19);
    const vertical = Math.min(height / 480, 1.25);
    const centreX = width / 2, centreY = height * 0.52;
    const fromY = ordinate(focusKnots(from.thread), progress), toY = ordinate(focusKnots(to.thread), progress);
    const cameraY = fromY + (toY - fromY) * blend;
    const left = progress - centreX / spacing - 0.2, right = progress + centreX / spacing + 0.2;
    const accent = mix(MOMENT_COLOURS[index], MOMENT_COLOURS[nextIndex], blend);
    const focusWeight = (id: string) => (from.thread === id ? 1 - blend : 0) + (to.thread === id ? blend : 0);
    const project = (at: number, y: number) => ({ x: centreX + (at - progress) * spacing, y: centreY + (y - cameraY) * vertical });
    const certainty = (at: number) => 0.28 + 0.72 * (1 - ease((at - progress - 0.05) / 1.25));

    const samplesFor = (thread: Thread, fibre: number, seed: number): Sample[] => {
      const start = thread.knots[0][0], end = thread.knots[thread.knots.length - 1][0];
      const from = Math.max(start, left), to = Math.min(end, right);
      if (to <= from) return [];
      const samples: Sample[] = [];
      const count = Math.ceil((to - from) * spacing / 5);
      for (let i = 0; i <= count; i++) {
        const at = from + (to - from) * i / count, t = (at - start) / (end - start);
        const envelope = Math.sin(Math.PI * t) ** 0.65;
        const drift = noise(at * 2.7 - progress * 0.025, seed) * 3.1 + noise(at * 8, seed + 14) * 0.85;
        const spread = fibre * (2.4 + 1.2 * noise(at * 1.1, seed + 2));
        const y = ordinate(thread.knots, at) + envelope * (spread + drift * Math.abs(fibre) * 0.4);
        const point = project(at, y);
        const taper = thread.open ? 1 - ease((t - 0.55) / 0.45) * 0.96 : 1;
        samples.push({ ...point, at, fade: certainty(at) * taper });
      }
      return samples;
    };
    const path = (samples: readonly Sample[]) => {
      ctx.beginPath();
      samples.forEach((point, index) => index ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    };
    const gradient = (samples: readonly Sample[], colour: Colour, opacity: number) => {
      const first = samples[0], last = samples[samples.length - 1];
      const paint = ctx.createLinearGradient(first.x, 0, last.x, 0);
      for (let i = 0; i <= 8; i++) {
        const point = samples[Math.round(i / 8 * (samples.length - 1))];
        paint.addColorStop(i / 8, rgba(colour, opacity * point.fade));
      }
      return paint;
    };

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    const drawThread = (thread: Thread, index: number) => {
      const samples = samplesFor(thread, 0, index);
      if (!samples.length) return;
      const future = (thread.future ? 0.58 : 1) * (0.45 + 0.55 * focusWeight(thread.id));
      // A narrow coloured atmosphere and a sharp core give the strands depth on white.
      path(samples);
      ctx.strokeStyle = gradient(samples, thread.colour, 0.055 * future);
      ctx.lineWidth = 10 * thread.weight;
      ctx.stroke();
      const fibres = Math.min(thread.fibres, 5);
      for (let fibre = -fibres / 2; fibre <= fibres / 2; fibre++) {
        const filament = samplesFor(thread, fibre, index * 17 + Math.floor(fibre + 12));
        path(filament);
        ctx.strokeStyle = gradient(filament, mix(thread.colour, accent, 0.1), (0.17 + 0.11 * (1 - Math.abs(fibre) / thread.fibres)) * future);
        ctx.lineWidth = 0.35 + thread.weight * 0.3;
        ctx.stroke();
      }
      path(samples);
      ctx.strokeStyle = gradient(samples, thread.colour, 0.68 * future);
      ctx.lineWidth = 0.65 + thread.weight * 0.6;
      ctx.stroke();

      const birth = thread.knots[0][0];
      if (birth >= left && birth <= right && thread.weight > 0.6) {
        const point = project(birth, thread.knots[0][1]);
        const opacity = certainty(birth) * future;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 2.25, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.strokeStyle = rgba(thread.colour, opacity * 0.8);
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }
    };

    // The continuous trunk is the calendar; branches are its work and possibilities.
    const trunk: Thread = { id: "time", knots: SPINE, colour: mix(GOLD, BLUE, ease(progress / 3)), weight: 1.3, fibres: 7 };
    [trunk, ...THREADS].map((thread, seed) => ({ thread, seed }))
      .sort((a, b) => focusWeight(a.thread.id) - focusWeight(b.thread.id))
      .forEach(({ thread, seed }) => drawThread(thread, seed));

    // Tiny forks inherit their parent's tangent and fade into the temporal landscape.
    THREADS.filter((thread) => thread.weight > 0.7).forEach((thread, branch) => {
      const start = thread.knots[0][0], end = thread.knots[thread.knots.length - 1][0];
      for (let fork = 0; fork < 2; fork++) {
        const at = start + (end - start) * (0.3 + fork * 0.3);
        if (at < left - 0.5 || at > right) continue;
        const origin = ordinate(thread.knots, at), sign = origin > spine(at) ? 1 : -1;
        const extent = 0.26 + (noise(branch, fork + 7) + 1) * 0.13;
        const rise = sign * (23 + 17 * (noise(branch, fork + 12) + 1));
        const twig: Thread = { id: "twig", knots: [[at, origin], [at + extent * 0.4, origin + rise * 0.15], [at + extent, origin + rise]], colour: thread.colour, weight: 0.16, fibres: 1, open: true, future: thread.future };
        const samples = samplesFor(twig, 0, branch + fork);
        if (!samples.length) continue;
        path(samples);
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = gradient(samples, twig.colour, 0.4);
        ctx.stroke();
      }
    });

    for (let event = 0; event < JOURNEY_MOMENTS.length; event++) {
      const moment = JOURNEY_MOMENTS[event];
      const point = project(moment.at, ordinate(focusKnots(moment.thread), moment.at));
      if (point.x < 0 || point.x > width || Math.hypot(point.x - centreX, point.y - centreY) < 8) continue;
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2.1, 0, Math.PI * 2);
      ctx.fillStyle = rgba(MOMENT_COLOURS[event], certainty(moment.at) * 0.8);
      ctx.fill();
    }

    // This fixed observation point connects the central year to the moving timeline.
    const halo = ctx.createRadialGradient(centreX, centreY, 0, centreX, centreY, 21);
    halo.addColorStop(0, rgba(accent, 0.16));
    halo.addColorStop(1, rgba(accent, 0));
    ctx.fillStyle = halo;
    ctx.beginPath(); ctx.arc(centreX, centreY, 21, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = rgba(accent, 0.28); ctx.lineWidth = 0.7;
    ctx.beginPath(); ctx.moveTo(centreX, centreY - 35); ctx.lineTo(centreX, centreY - 10); ctx.stroke();
    ctx.beginPath(); ctx.arc(centreX, centreY, 6, 0, Math.PI * 2);
    ctx.fillStyle = "white"; ctx.fill();
    ctx.strokeStyle = rgba(accent, 0.8); ctx.lineWidth = 1; ctx.stroke();
    ctx.beginPath(); ctx.arc(centreX, centreY, 2.25, 0, Math.PI * 2);
    ctx.fillStyle = rgba(accent, 1); ctx.fill();
  };
  return { resize, draw };
}
