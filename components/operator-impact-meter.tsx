"use client";

import { useEffect, useState } from "react";
import { FOUNDER_BANNER } from "@/lib/brand";
import { TestItLiveButton } from "./test-it-live-button";
import { CtaButton } from "./cta-button";

const TZ = "America/Chicago";

/** Beta baseline stats — tick slightly so the meter feels live. */
const BASE = {
  leads: 1284,
  uptime: "99.98",
  appointments: 312,
  revenueProtected: 47800,
};

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatClock(now: Date) {
  return now.toLocaleTimeString("en-US", {
    timeZone: TZ,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
}

const EARLY_WINS = [
  "Team leadership delivering 15–20% lifts in satisfaction & revenue",
  "15% error reduction through automated workflows",
  "95% satisfaction on instant client responses",
] as const;

/**
 * Live Operator Impact meter — replaces the old AI News panel.
 */
export function OperatorImpactMeter() {
  const [leads, setLeads] = useState(BASE.leads);
  const [appointments, setAppointments] = useState(BASE.appointments);
  const [revenue, setRevenue] = useState(BASE.revenueProtected);
  const [responseMs, setResponseMs] = useState(12);
  const [clock, setClock] = useState("--:--");

  useEffect(() => {
    const tick = () => {
      setClock(formatClock(new Date()));
      setResponseMs((prev) => {
        const delta = Math.floor(Math.random() * 3) - 1;
        return Math.max(8, Math.min(15, prev + delta));
      });
      if (Math.random() > 0.72) setLeads((n) => n + 1);
      if (Math.random() > 0.88) setAppointments((n) => n + 1);
      if (Math.random() > 0.85) setRevenue((n) => n + 120 + Math.floor(Math.random() * 80));
    };
    tick();
    const id = setInterval(tick, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full glass-card-emerald card-compact space-y-3 md:space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[0.65rem] md:text-xs uppercase tracking-[0.18em] text-emerald font-semibold mb-1">
            Live Operator Impact
          </p>
          <h3 className="text-sm md:text-lg font-bold text-foreground leading-snug">
            Real systems. Real results. Running 24/7.
          </h3>
        </div>
        <div className="shrink-0 text-right">
          <span className="inline-flex items-center gap-1.5 text-[0.65rem] md:text-xs font-mono text-emerald">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
              <span className="relative inline-flex rounded-full h-full w-full bg-emerald" />
            </span>
            LIVE
          </span>
          <p className="text-[0.65rem] md:text-xs font-mono text-muted-light tabular-nums mt-0.5">
            {clock} CT
          </p>
        </div>
      </div>

      <p className="text-xs md:text-sm font-semibold text-gold tracking-wide">
        {FOUNDER_BANNER}
      </p>

      <div className="grid grid-cols-2 gap-1.5 md:gap-2">
        <Stat
          label="Leads captured"
          value={`${leads.toLocaleString()}+`}
          hint={`${responseMs}s avg response`}
          accent
        />
        <Stat label="Uptime" value={`${BASE.uptime}%`} hint="Always on" />
        <Stat
          label="Appts booked"
          value={appointments.toLocaleString()}
          hint="Beta automation"
        />
        <Stat
          label="Revenue protected"
          value={formatMoney(revenue)}
          hint="This month · beta"
          accent
        />
      </div>

      <p className="text-xs md:text-sm text-muted-light leading-relaxed">
        Your chairs stay full. Your crews stay on jobs. Your phones stop ringing unanswered.
        While competitors chase leads,{" "}
        <span className="text-foreground font-medium">KrakenIX closes them.</span>
      </p>

      <TestItLiveButton size="sm" className="w-full justify-center text-xs md:text-sm" />

      <div className="border-t border-emerald/20 pt-3 space-y-2">
        <p className="text-[0.65rem] md:text-xs uppercase tracking-wider text-emerald/90 font-semibold">
          Early wins from operators like you
        </p>
        <ul className="space-y-1.5">
          {EARLY_WINS.map((win) => (
            <li key={win} className="flex gap-2 text-xs md:text-sm text-muted-light leading-snug">
              <span className="text-emerald shrink-0 mt-0.5" aria-hidden>
                ▸
              </span>
              <span>{win}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="pt-1 space-y-2">
        <p className="text-xs md:text-sm text-center text-foreground font-medium">
          {FOUNDER_BANNER} Ready for your stack?
        </p>
        <CtaButton
          href="#contact?intent=foundational"
          variant="gold"
          size="sm"
          className="w-full text-xs md:text-sm"
        >
          Claim Foundational Slot →
        </CtaButton>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  hint,
  accent = false,
}: {
  label: string;
  value: string;
  hint: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg bg-black/25 border border-white/8 px-2 py-2 md:px-2.5 md:py-2.5">
      <p className="text-[0.6rem] md:text-[0.65rem] uppercase tracking-wider text-muted-light mb-0.5">
        {label}
      </p>
      <p
        className={`text-sm md:text-lg font-extrabold tabular-nums leading-tight ${
          accent ? "text-emerald" : "text-foreground"
        }`}
      >
        {value}
      </p>
      <p className="text-[0.6rem] md:text-[0.65rem] text-muted-light mt-0.5 leading-tight">{hint}</p>
    </div>
  );
}
