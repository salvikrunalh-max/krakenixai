"use client";

import { useState } from "react";
import { INDUSTRY_OPTIONS } from "@/lib/industries";
import { CtaButton } from "./cta-button";

const SLOTS = [
  { day: "Tue", date: "9", times: ["10:00 AM", "2:30 PM"] },
  { day: "Wed", date: "10", times: ["11:00 AM", "4:00 PM"] },
  { day: "Thu", date: "11", times: ["9:30 AM", "1:00 PM", "3:30 PM"] },
];

export function BookingWidget() {
  const [industry, setIndustry] = useState<string>(INDUSTRY_OPTIONS[0]?.value ?? "");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const contactHref = selectedSlot
    ? `#contact?intent=booking&slot=${encodeURIComponent(selectedSlot)}&industry=${industry}`
    : `#contact?intent=booking&industry=${industry}`;

  return (
    <div id="booking" className="glass-card card-compact h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Book a free strategy call</h3>
        <span className="text-xs uppercase tracking-wider text-leaf font-medium bg-leaf/10 px-2 py-0.5 rounded-full border border-leaf/20">
          Live slots
        </span>
      </div>

      <label className="block mb-3">
        <span className="text-xs text-muted mb-1 block">Your industry</span>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
        >
          {INDUSTRY_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {SLOTS.map((slot) => (
          <div key={slot.date} className="text-center">
            <p className="text-xs uppercase text-muted-light">{slot.day}</p>
            <p className="text-sm font-semibold text-foreground mb-1.5">{slot.date}</p>
            <div className="space-y-1">
              {slot.times.map((time) => {
                const key = `${slot.day} ${slot.date} ${time}`;
                const active = selectedSlot === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedSlot(key)}
                    className={`w-full text-sm py-1.5 rounded-md border transition-colors ${
                      active
                        ? "bg-cyan/15 border-cyan/40 text-cyan-bright"
                        : "bg-white/[0.03] border-white/8 text-muted-light hover:border-cyan/25"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <CtaButton href={contactHref} className="w-full" size="sm">
        Book free strategy call
      </CtaButton>

      <p className="text-xs text-muted-light mt-3 leading-relaxed">
        Live Calendly integration available on Scale Pipeline+. Placeholder slots for demo.
      </p>
    </div>
  );
}
