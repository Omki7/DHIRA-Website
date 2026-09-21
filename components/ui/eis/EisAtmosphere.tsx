/*
 * EisAtmosphere — the /solutions/eis page's photographic backdrop, rendered
 * entirely in CSS and SVG.
 *
 * The reference this page is styled against grounds every major surface on a
 * real landscape photograph: hazy sky over receding ridges. We render the same
 * effect procedurally instead of shipping stock photography, which keeps the
 * page free of licensed assets and lets each surface pick its own depth.
 *
 * Three things make a flat gradient read as atmosphere:
 *   1. Aerial perspective. Ridges lose contrast and shift toward the haze
 *      value with distance, so `far` is nearly the sky and `near` is not.
 *   2. Fog. A pale band sits *between* the ridge layers, not on top of them.
 *   3. Grain. A very low-opacity turbulence tile kills the banding that a
 *      600px-tall CSS gradient otherwise shows on wide screens.
 *
 * No animation, so nothing here needs a reduced-motion branch.
 */

type Variant = "hero" | "overcast" | "dusk";

/* Inline feTurbulence tile — self-contained, no network request. Opacity is
   deliberately near-invisible; it exists to break gradient banding, not to
   read as texture. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='0.42'/%3E%3C/svg%3E\")";

const SKY: Record<Variant, string> = {
  /* Full depth: high sky through a warm horizon, for the top of the page.
     The value range matters more than the hues: a sky that only travels
     #6F to #B7 reads as a flat wash, so the top is pushed down to #5E7C9E
     and the horizon is allowed to go almost white before the warm stop. */
  hero: "linear-gradient(180deg,#5E7C9E 0%,#6F8CAC 10%,#89A3BE 24%,#A8BCCE 40%,#C6D2DC 56%,#DDE3E6 70%,#EFEDE6 82%,#F6F2E8 90%,#F4F5F0 100%)",
  /* Flat, close, diffused: the backdrop for a card, where the subject is the
     panel floating on it rather than the distance behind it. Still needs a
     real value range or the tile reads as grey card stock behind a white
     card, and the two whites fight. */
  overcast:
    "linear-gradient(160deg,#95A8BA 0%,#A9B8C6 26%,#BEC8CF 50%,#CFCEC7 74%,#DBD6CB 100%)",
  /* The closing slab. One value, deep enough to carry white type at AA. */
  dusk: "linear-gradient(180deg,#7B93AD 0%,#8DA1B8 40%,#9BACC0 72%,#A7B5C6 100%)",
};

/* Cloud masses. Wide, soft-edged ellipses at low alpha — the softness is what
   sells them, so the stops run all the way to transparent. */
const CLOUDS: Record<Variant, string> = {
  hero: [
    "radial-gradient(58% 24% at 22% 30%,rgba(255,255,255,0.34) 0%,rgba(255,255,255,0) 70%)",
    "radial-gradient(46% 18% at 78% 20%,rgba(255,255,255,0.26) 0%,rgba(255,255,255,0) 72%)",
    "radial-gradient(70% 22% at 55% 62%,rgba(255,255,255,0.40) 0%,rgba(255,255,255,0) 74%)",
    "radial-gradient(40% 30% at 8% 74%,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0) 70%)",
  ].join(","),
  overcast: [
    "radial-gradient(64% 40% at 30% 24%,rgba(255,255,255,0.42) 0%,rgba(255,255,255,0) 72%)",
    "radial-gradient(52% 32% at 82% 66%,rgba(255,255,255,0.30) 0%,rgba(255,255,255,0) 74%)",
    "radial-gradient(48% 26% at 12% 88%,rgba(255,255,255,0.24) 0%,rgba(255,255,255,0) 70%)",
  ].join(","),
  /* The panel slabs are the widest surfaces on the page, so a two-blob sky
     bands visibly across 1400px. More masses, plus a corner vignette, give
     the eye something to resolve at that width. */
  dusk: [
    "radial-gradient(64% 40% at 22% 14%,rgba(255,255,255,0.30) 0%,rgba(255,255,255,0) 70%)",
    "radial-gradient(50% 26% at 62% 34%,rgba(255,255,255,0.20) 0%,rgba(255,255,255,0) 72%)",
    "radial-gradient(58% 30% at 88% 72%,rgba(255,255,255,0.22) 0%,rgba(255,255,255,0) 74%)",
    "radial-gradient(44% 34% at 8% 84%,rgba(46,68,96,0.20) 0%,rgba(46,68,96,0) 70%)",
    "radial-gradient(120% 80% at 50% 50%,rgba(46,68,96,0) 46%,rgba(46,68,96,0.22) 100%)",
  ].join(","),
};

export default function EisAtmosphere({
  variant = "hero",
  className = "",
  ridges = true,
}: {
  variant?: Variant;
  className?: string;
  /* Ridges are the expensive part of the illusion and only earn their place
     where there is vertical room to show distance. Off for short cards. */
  ridges?: boolean;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute inset-0" style={{ background: SKY[variant] }} />
      <div className="absolute inset-0" style={{ background: CLOUDS[variant] }} />

      {ridges && (
        <svg
          className="absolute inset-x-0 bottom-0 h-[42%] w-full"
          viewBox="0 0 1440 420"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            {/* Each ridge fades upward into the haze. That vertical fade is
                the fog sitting in front of it, and it is why the layers read
                as distance rather than as stacked shapes. The three ramps
                are deliberately far apart in value — a 10% step between
                layers disappears the moment the grain goes over the top. */}
            <linearGradient id="eisRidgeFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B3C1CD" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#9CAEBE" stopOpacity="0.62" />
              <stop offset="100%" stopColor="#93A7B9" stopOpacity="0.86" />
            </linearGradient>
            <linearGradient id="eisRidgeMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8DA2B5" stopOpacity="0.14" />
              <stop offset="55%" stopColor="#7690A6" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#6B879F" stopOpacity="0.96" />
            </linearGradient>
            <linearGradient id="eisRidgeNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#5F7B94" stopOpacity="0.30" />
              <stop offset="45%" stopColor="#4E6C87" stopOpacity="0.94" />
              <stop offset="100%" stopColor="#43607A" stopOpacity="1" />
            </linearGradient>
            {/* One low, wide band of valley mist. Kept shallow: enough to
                soften where the ridges meet, not enough to grey them out. */}
            <linearGradient id="eisFog" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E9EAE5" stopOpacity="0" />
              <stop offset="100%" stopColor="#E9EAE5" stopOpacity="0.32" />
            </linearGradient>
          </defs>

          <path
            d="M0 150 C 150 104 268 132 392 120 C 540 106 640 58 792 76 C 946 94 1044 142 1180 132 C 1290 124 1372 100 1440 108 L1440 420 L0 420 Z"
            fill="url(#eisRidgeFar)"
          />
          <path
            d="M0 226 C 128 194 246 220 372 208 C 528 192 626 148 780 170 C 928 191 1030 232 1168 222 C 1288 214 1376 192 1440 202 L1440 420 L0 420 Z"
            fill="url(#eisRidgeMid)"
          />
          <path
            d="M0 316 C 142 286 244 308 386 300 C 546 291 654 254 812 274 C 962 293 1064 326 1196 320 C 1310 315 1382 298 1440 306 L1440 420 L0 420 Z"
            fill="url(#eisRidgeNear)"
          />
          <rect x="0" y="180" width="1440" height="150" fill="url(#eisFog)" />
        </svg>
      )}

      {/* Ground fog. Without it the nearest ridge meets the section edge as a
          flat band of solid colour, which reads as a colour block rather than
          as terrain. Fading it to the cream of the band below also removes
          the seam between this section and the next. */}
      {ridges && (
        <div
          className="absolute inset-x-0 bottom-0 h-[16%]"
          style={{
            background:
              "linear-gradient(180deg,rgba(244,245,240,0) 0%,rgba(244,245,240,0.10) 45%,rgba(244,245,240,0.55) 80%,#F4F5F0 100%)",
          }}
        />
      )}

      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: GRAIN, backgroundSize: "140px 140px" }}
      />
    </div>
  );
}
