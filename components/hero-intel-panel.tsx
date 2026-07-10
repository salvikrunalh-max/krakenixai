"use client";

import { useEffect, useState } from "react";

const TZ = "America/Chicago";

function formatCompactClock(now: Date) {
  const time = now.toLocaleTimeString("en-US", {
    timeZone: TZ,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  return { time, date };
}

/** Compact local-time strip — no news feed. */
export function HeroIntelPanel() {
  const [clock, setClock] = useState({ time: "--:--", date: "…" });

  useEffect(() => {
    const tick = () => setClock(formatCompactClock(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full">
      <div className="glass-card-cyan !py-2 !px-3 md:!py-2.5 md:!px-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.65rem] md:text-xs font-semibold uppercase tracking-wider text-cyan-bright/90">
            Ardmore · CT
          </p>
          <p className="text-[0.65rem] md:text-xs text-muted-light truncate">{clock.date}</p>
        </div>
        <p className="text-xl md:text-2xl font-bold tabular-nums text-foreground tracking-tight shrink-0">
          {clock.time}
        </p>
      </div>
    </div>
  );
}
