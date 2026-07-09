"use client";

import { useMemo, useState } from "react";
import {
  LOST_LEADS_PRESETS,
  calculateLostRevenue,
  formatCurrency,
  type LostLeadsPresetId,
} from "@/lib/lost-leads-calculator";
import { SectionHeading } from "./section-heading";
import { CtaButton } from "./cta-button";
import { TestItLiveButton } from "./test-it-live-button";

export function LostLeadsCalculator() {
  const [presetId, setPresetId] = useState<LostLeadsPresetId>("home-services");
  const preset = LOST_LEADS_PRESETS.find((p) => p.id === presetId) ?? LOST_LEADS_PRESETS[0];

  const [leadsPerWeek, setLeadsPerWeek] = useState(preset.leadsPerWeek);
  const [avgJobValue, setAvgJobValue] = useState(preset.avgJobValue);
  const [responseMinutes, setResponseMinutes] = useState(preset.responseMinutes);

  function selectPreset(id: LostLeadsPresetId) {
    const p = LOST_LEADS_PRESETS.find((x) => x.id === id)!;
    setPresetId(id);
    setLeadsPerWeek(p.leadsPerWeek);
    setAvgJobValue(p.avgJobValue);
    setResponseMinutes(p.responseMinutes);
  }

  const result = useMemo(
    () => calculateLostRevenue(leadsPerWeek, avgJobValue, responseMinutes),
    [leadsPerWeek, avgJobValue, responseMinutes]
  );

  const responseLabel =
    responseMinutes < 1
      ? `${Math.round(responseMinutes * 60)} sec`
      : responseMinutes < 60
        ? `${Math.round(responseMinutes)} min`
        : `${(responseMinutes / 60).toFixed(1)} hr`;

  return (
    <section id="lost-leads" className="section-compact relative">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Revenue leak detector"
          title="How much are slow replies costing you?"
          description="Pick your industry, adjust the sliders, and see realistic revenue left on the table every month."
          accent="gold"
        />

        <div className="glass-card-gold card-compact">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-4 sm:mb-6">
            {LOST_LEADS_PRESETS.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => selectPreset(p.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium border transition-colors cursor-pointer ${
                  presetId === p.id
                    ? "bg-gold/20 border-gold/50 text-gold"
                    : "border-white/15 text-muted-light hover:border-cyan/30 hover:text-foreground"
                }`}
              >
                <span className="text-lg shrink-0" aria-hidden>{p.icon}</span>
                <span className="leading-snug">{p.label}</span>
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-light mb-6 leading-relaxed border-l-2 border-gold/40 pl-4">
            {preset.insight}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 lg:gap-8">
            <div className="space-y-6">
              <label className="block">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">Inbound leads per week</span>
                  <span className="text-cyan-bright font-semibold tabular-nums">{leadsPerWeek}</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={50}
                  value={leadsPerWeek}
                  onChange={(e) => setLeadsPerWeek(Number(e.target.value))}
                  className="w-full accent-cyan"
                />
              </label>

              <label className="block">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">Average job / visit value</span>
                  <span className="text-cyan-bright font-semibold tabular-nums">
                    {formatCurrency(avgJobValue)}
                  </span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={2500}
                  step={10}
                  value={avgJobValue}
                  onChange={(e) => setAvgJobValue(Number(e.target.value))}
                  className="w-full accent-cyan"
                />
              </label>

              <label className="block">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">Your avg. response time</span>
                  <span className="text-amber font-semibold tabular-nums">{responseLabel}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={360}
                  value={responseMinutes}
                  onChange={(e) => setResponseMinutes(Number(e.target.value))}
                  className="w-full accent-amber"
                />
                <p className="text-xs text-muted-light mt-1.5">
                  Typical for {preset.label}: ~
                  {preset.responseMinutes >= 60
                    ? `${(preset.responseMinutes / 60).toFixed(1)} hr`
                    : `${preset.responseMinutes} min`}{" "}
                  response · {preset.leadsPerWeek} leads/wk · {formatCurrency(preset.avgJobValue)} avg
                </p>
              </label>
            </div>

            <div className="glass-card-cyan card-compact flex flex-col justify-center text-center lg:text-left">
              <p className="text-sm uppercase tracking-widest text-muted-light mb-2">
                Estimated revenue lost / month
              </p>
              <p className="text-4xl sm:text-5xl font-extrabold text-gradient-gold tabular-nums mb-1">
                {formatCurrency(result.monthlyLost)}
              </p>
              <p className="text-base text-muted-light mb-4">
                {formatCurrency(result.annualLost)} per year · ~{Math.max(0, result.leadsLostMonthly)}{" "}
                leads slipping away
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
                <div className="rounded-lg bg-black/20 border border-white/10 px-3 py-2">
                  <p className="text-muted-light text-xs mb-0.5">You capture today</p>
                  <p className="font-bold text-foreground tabular-nums">
                    {Math.round(result.currentCapture * 100)}%
                  </p>
                </div>
                <div className="rounded-lg bg-cyan/10 border border-cyan/25 px-3 py-2">
                  <p className="text-muted-light text-xs mb-0.5">With 15-sec Krakenix</p>
                  <p className="font-bold text-cyan-bright tabular-nums">
                    {Math.round(result.novaCapture * 100)}%
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <TestItLiveButton size="md" className="w-full sm:w-auto flex-1 justify-center" />
                <CtaButton href="#contact" size="md" className="w-full sm:w-auto flex-1 justify-center">
                  Stop the Leak
                </CtaButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
