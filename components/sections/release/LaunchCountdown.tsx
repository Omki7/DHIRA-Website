"use client";

/*
 * Days, hours and minutes to the Akashic 1.0 launch (the founder's wireframe
 * carries the same countdown). Server and first paint show the date only,
 * so hydration never mismatches; the count fills in after mount and ticks
 * once a minute, with no animation. After launch it reads "Generally
 * available now".
 */

import { useEffect, useState } from "react";

function remaining(target: number) {
  const ms = Math.max(0, target - Date.now());
  const minutes = Math.floor(ms / 60000);
  return { days: Math.floor(minutes / 1440), hours: Math.floor((minutes % 1440) / 60), minutes: minutes % 60, done: ms === 0 };
}

export default function LaunchCountdown({ launchAt }: { launchAt: string }) {
  const target = new Date(launchAt).getTime();
  const [left, setLeft] = useState<ReturnType<typeof remaining> | null>(null);

  useEffect(() => {
    setLeft(remaining(target));
    const timer = window.setInterval(() => setLeft(remaining(target)), 60000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!left) return <span>Launch on 1 November 2026</span>;
  if (left.done) return <span className="text-blue">Generally available now</span>;
  const pad = (n: number) => String(n).padStart(2, "0");
  return (
    <span aria-label={`${left.days} days, ${left.hours} hours and ${left.minutes} minutes until launch`}>
      <span className="text-ink">{left.days}</span>&nbsp;days&nbsp;&nbsp;&nbsp;
      <span className="text-ink">{pad(left.hours)}</span>&nbsp;hours&nbsp;&nbsp;&nbsp;
      <span className="text-ink">{pad(left.minutes)}</span>&nbsp;minutes&nbsp;&nbsp;&nbsp;to launch
    </span>
  );
}
