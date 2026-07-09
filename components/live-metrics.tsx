"use client";

import { useEffect, useState } from "react";

function MetricCard({
  label,
  value,
  unit,
  accent = false,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg bg-white/[0.04] border border-white/10 p-2 sm:p-3 text-center">
      <p className="text-xs sm:text-sm uppercase tracking-widest text-muted-light mb-1">{label}</p>
      <p
        className={`text-xl sm:text-2xl font-bold tabular-nums metric-flash ${
          accent ? "text-cyan-bright" : "text-foreground"
        }`}
        key={value}
      >
        {value}
        {unit && <span className="text-sm text-muted ml-0.5 font-medium">{unit}</span>}
      </p>
    </div>
  );
}

export function LiveMetrics() {
  const [time, setTime] = useState("--:--:--");
  const [responseMs, setResponseMs] = useState(11);
  const [leads, setLeads] = useState(1284);
  const [cpu, setCpu] = useState(9);
  const [rtt, setRtt] = useState(9);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
      setResponseMs((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(8, Math.min(14, prev + delta));
      });
      if (Math.random() > 0.7) {
        setLeads((prev) => prev + 1);
      }
      setCpu((prev) => Math.max(6, Math.min(18, prev + (Math.random() > 0.5 ? 1 : -1))));
      setRtt((prev) => Math.max(7, Math.min(12, prev + (Math.random() > 0.5 ? 1 : -1))));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass-card-emerald card-compact w-full h-full">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
          </span>
          <span className="text-xs font-mono text-emerald">krakenix://live-core</span>
        </div>
        <span className="text-xs font-mono text-muted-light tabular-nums">{time}</span>
      </div>

      <div className="grid grid-cols-3 gap-1.5 sm:gap-3 mb-3 sm:mb-4">
        <MetricCard label="Response" value={String(responseMs)} unit="s" accent />
        <MetricCard label="Uptime" value="99.98" unit="%" />
        <MetricCard label="Leads/24h" value={leads.toLocaleString()} />
      </div>

      <div className="border-t border-cyan/15 pt-3">
        <p className="text-xs font-mono text-muted-light mb-2">infra.monitor / region us-central</p>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { label: "CPU", value: `${cpu}%` },
            { label: "RTT", value: `${rtt}ms` },
            { label: "QUEUE", value: "0" },
            { label: "REQ", value: leads.toLocaleString() },
          ].map((m) => (
            <div key={m.label} className="rounded-lg py-1.5 bg-black/20">
              <p className="text-xs uppercase tracking-wider text-muted-light">{m.label}</p>
              <p className="text-xs font-mono text-cyan-bright tabular-nums font-medium">{m.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
