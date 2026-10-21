"use client";

/*
 * Days, hours and minutes to the Akashic 1.0 launch (the founder's wireframe
 * carries the same countdown). The clock is read as an external store that
 * ticks once a minute: the server and hydration render show the date line,
 * so markup always matches, and the count fills in straight after. No
 * animation. After launch it reads the `live` line. Copy:
 * content/pages/akashic-release.ts `countdown`.
 */

import { useSyncExternalStore } from "react";
import type { AkashicReleasePage } from "@/content/pages/akashic-release";

const MINUTE = 60000;

function subscribe(onTick: () => void) {
  const timer = window.setInterval(onTick, MINUTE);
  return () => window.clearInterval(timer);
}
/* The current minute, so the snapshot is stable between ticks. */
const getSnapshot = () => Math.floor(Date.now() / MINUTE);
const getServerSnapshot = () => null;

export default function LaunchCountdown({ launchAt, content: c }: { launchAt: string; content: AkashicReleasePage["countdown"] }) {
  const minute = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (minute === null) return <span>{c.before}</span>;
  const minutesLeft = Math.max(0, Math.ceil((new Date(launchAt).getTime() - minute * MINUTE) / MINUTE) - 1);
  if (minute * MINUTE >= new Date(launchAt).getTime()) return <span className="text-blue">{c.live}</span>;
  const days = Math.floor(minutesLeft / 1440);
  const hours = Math.floor((minutesLeft % 1440) / 60);
  const minutes = minutesLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span aria-label={`${days} ${c.days}, ${hours} ${c.hours} ${c.and} ${minutes} ${c.minutes} ${c.untilLaunch}`}>
      <span className="text-ink">{days}</span>&nbsp;{c.days}&nbsp;&nbsp;&nbsp;
      <span className="text-ink">{pad(hours)}</span>&nbsp;{c.hours}&nbsp;&nbsp;&nbsp;
      <span className="text-ink">{pad(minutes)}</span>&nbsp;{c.minutes}&nbsp;&nbsp;&nbsp;{c.toLaunch}
    </span>
  );
}
