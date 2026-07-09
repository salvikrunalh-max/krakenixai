"use client";

import { useEffect, useState } from "react";
import type { AiHeadline } from "@/lib/ai-news-fallback";
import { AI_NEWS_FALLBACK } from "@/lib/ai-news-fallback";

const TZ = "America/Chicago";

function formatDateTime(now: Date) {
  const time = now.toLocaleTimeString("en-US", {
    timeZone: TZ,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const date = now.toLocaleDateString("en-US", {
    timeZone: TZ,
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return { time, date };
}

export function HeroIntelPanel() {
  const [clock, setClock] = useState({ time: "--:--:--", date: "Loading…" });
  const [headlines, setHeadlines] = useState<AiHeadline[]>(AI_NEWS_FALLBACK);

  useEffect(() => {
    const tick = () => setClock(formatDateTime(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    fetch("/api/ai-news")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.headlines) && data.headlines.length > 0) {
          setHeadlines(data.headlines);
        }
      })
      .catch(() => {});
  }, []);

  const [featured, ...rest] = headlines;

  return (
    <div className="w-full space-y-2">
      <div className="glass-card-cyan card-compact">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <span className="text-[0.6875rem] md:text-sm font-semibold text-foreground">Local time</span>
          <span className="text-[0.6875rem] md:text-sm text-muted-light">Ardmore</span>
        </div>
        <p className="text-lg md:text-4xl font-bold tabular-nums text-foreground tracking-tight">
          {clock.time}
        </p>
        <p className="text-[0.6875rem] md:text-base text-muted-light mt-0.5 hidden md:block">{clock.date}</p>
      </div>

      <div className="glass-card card-compact !p-2.5 md:!p-6 hidden md:block">
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-foreground">AI News</h3>
            <p className="text-xs sm:text-sm text-muted-light">Top headlines · hourly</p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-cyan-bright bg-cyan/10 border border-cyan/25 rounded-full px-2.5 py-1">
            Live
          </span>
        </div>

        {featured && (
          <a
            href={featured.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group mb-4 pb-4 border-b border-white/10"
          >
            <h4 className="text-base sm:text-lg font-bold text-foreground leading-snug group-hover:text-cyan-bright transition-colors">
              {featured.title}
            </h4>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-sm">
              <span className="font-medium text-cyan-bright">{featured.source}</span>
              <span className="text-muted">·</span>
              <span className="text-muted-light">{featured.date}</span>
              <span className="text-muted">·</span>
              <span className="text-muted-light">{featured.time}</span>
            </div>
          </a>
        )}

        <ul className="space-y-2 sm:space-y-3">
          {rest.slice(0, 3).map((h, i) => (
            <li key={`${h.url}-${i}`}>
              <a
                href={h.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <p className="text-sm font-semibold text-foreground leading-snug group-hover:text-cyan-bright transition-colors line-clamp-2">
                  {h.title}
                </p>
                <p className="text-sm text-muted-light mt-1">
                  <span className="text-muted-light">{h.source}</span>
                  <span className="mx-1.5 text-muted">·</span>
                  <span>{h.date}</span>
                  <span className="mx-1.5 text-muted">·</span>
                  <span>{h.time}</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
