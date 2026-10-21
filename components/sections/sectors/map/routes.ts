import type { Slot } from "@/content/pages/sectors-map";

/* Shared flow routes: the skeleton positions are identical across scenes,
   so the paths are drawing geometry, not content. */
export const ROUTES: Record<Slot, string> = {
  A: "M 190 340 Q 310 440 442 480",
  B: "M 300 405 Q 380 450 474 470",
  C: "M 408 318 Q 435 400 502 455",
  D: "M 640 300 Q 600 390 556 462",
  E: "M 790 435 Q 690 480 588 460",
};
export const RETURN_ROUTE = "M 548 442 Q 680 350 870 264";

