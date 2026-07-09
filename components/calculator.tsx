"use client";

import { useEffect, useState } from "react";
import {
  ADDONS,
  BASE_PRICE,
  type AddonId,
  calculatePrice,
  formatPrice,
  FULL_STACK_PRICE,
  FULL_STACK_RAW,
} from "@/lib/pricing";
import { loadCalculatorSelection, saveCalculatorSelection } from "@/lib/calculator-storage";
import { buildHashHref } from "@/lib/url-params";
import { SectionHeading } from "./section-heading";
import { CtaButton } from "./cta-button";

const ADDON_ORDER: AddonId[] = ["voice", "crm", "sms", "payments"];

export function Calculator() {
  const [selected, setSelected] = useState<Set<AddonId>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = loadCalculatorSelection();
    if (saved?.addons?.length) {
      setSelected(new Set(saved.addons));
    }
    setHydrated(true);
  }, []);

  const toggle = (id: AddonId) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    setSelected(new Set(ADDON_ORDER));
  };

  const { rawTotal, discount, total, allSelected } = calculatePrice(selected);

  useEffect(() => {
    if (!hydrated) return;
    saveCalculatorSelection({
      addons: [...selected],
      total,
    });
  }, [selected, total, hydrated]);

  const lockHref = buildHashHref("contact", { intent: "lock", package: "custom" });

  return (
    <section id="calculator" className="section-compact relative">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Instant estimate"
          title="Build your stack, watch the price move"
        />

        <div className="section-panel">
          <div className="grid lg:grid-cols-5 gap-5 lg:gap-6">
            <div className="lg:col-span-3 space-y-2">
              <div className="glass-card-cyan card-compact">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="font-semibold text-foreground text-base">Frontend Baseline</h3>
                      <span className="text-xs uppercase tracking-wider bg-cyan/20 text-cyan-bright px-2 py-0.5 rounded-full font-semibold border border-cyan/25">
                        included
                      </span>
                    </div>
                  <p className="text-base text-muted-light">
                    Conversion-optimized, mobile-first page. Always part of the build.
                  </p>
                  </div>
                  <span className="text-base font-bold text-cyan-bright shrink-0">{formatPrice(BASE_PRICE)}</span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 px-1">
                <p className="text-xs text-muted-light uppercase tracking-wider">Add modules</p>
                {!allSelected && (
                  <button
                    type="button"
                    onClick={selectAll}
                    className="text-xs font-semibold text-gold hover:text-gold-hover transition-colors cursor-pointer"
                  >
                    Select all for {formatPrice(FULL_STACK_PRICE)} →
                  </button>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-2">
                {ADDON_ORDER.map((id) => {
                  const addon = ADDONS[id];
                  const isOn = selected.has(id);
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggle(id)}
                      aria-pressed={isOn}
                      className={`w-full text-left glass-card-amber card-compact transition-all duration-200 cursor-pointer ${
                        isOn
                          ? "border-cyan/40 ring-1 ring-cyan/25"
                          : "hover:border-cyan/20 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                            isOn ? "border-cyan bg-cyan" : "border-white/20"
                          }`}
                          aria-hidden
                        >
                          {isOn && (
                            <svg className="w-2.5 h-2.5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="font-semibold text-base text-foreground">{addon.label}</h3>
                            <span className={`text-sm font-bold shrink-0 ${isOn ? "text-cyan-bright" : "text-muted"}`}>
                              +{formatPrice(addon.price)}
                            </span>
                          </div>
                          <p className="text-base text-muted-light mt-1">{addon.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="glass-card-gold card-compact lg:sticky lg:top-20">
                <p className="text-base text-muted-light uppercase tracking-widest font-semibold mb-3">
                  Estimated one-time setup
                </p>

                <ul className="space-y-2 mb-4 border-b border-white/10 pb-4">
                  <li className="flex justify-between gap-3 text-base">
                    <span className="text-muted-light">Frontend Baseline</span>
                    <span className="font-semibold text-foreground tabular-nums">{formatPrice(BASE_PRICE)}</span>
                  </li>
                  {ADDON_ORDER.filter((id) => selected.has(id)).map((id) => (
                    <li key={id} className="flex justify-between gap-3 text-base">
                      <span className="text-muted-light">{ADDONS[id].label}</span>
                      <span className="font-semibold text-cyan-bright tabular-nums">+{formatPrice(ADDONS[id].price)}</span>
                    </li>
                  ))}
                  {discount > 0 && (
                    <li className="flex justify-between gap-3 text-base">
                      <span className="text-leaf font-medium">Foundational discount</span>
                      <span className="font-semibold text-leaf tabular-nums">−{formatPrice(discount)}</span>
                    </li>
                  )}
                </ul>

                {discount > 0 && (
                  <p className="text-muted line-through text-lg mb-0.5 tabular-nums">{formatPrice(rawTotal)}</p>
                )}

                <p className="text-4xl sm:text-5xl font-extrabold text-gradient-gold tabular-nums mb-2">
                  {formatPrice(total)}
                </p>

                {allSelected ? (
                  <p className="text-base text-leaf font-semibold mb-3">
                    Full stack locked at {formatPrice(FULL_STACK_PRICE)} — save {formatPrice(discount)}
                  </p>
                ) : selected.size === 0 ? (
                  <p className="body-copy mb-3">Frontend baseline only — no retainer.</p>
                ) : (
                  <p className="body-copy mb-3">
                    Add all modules for foundational pricing ({formatPrice(FULL_STACK_RAW)} → {formatPrice(FULL_STACK_PRICE)}).
                  </p>
                )}

                <div className="flex flex-wrap gap-1.5 mb-4">
                  <span className="text-xs bg-white/5 border border-white/10 text-muted-light rounded-full px-2.5 py-0.5">
                    {formatPrice(BASE_PRICE)} frontend
                  </span>
                  {allSelected && (
                    <span className="text-xs bg-gold/15 border border-gold/30 text-gold rounded-full px-2.5 py-0.5 font-medium">
                      {formatPrice(FULL_STACK_PRICE)} full stack
                    </span>
                  )}
                </div>

                <CtaButton href={lockHref} className="w-full" size="md">
                  Lock Configuration via Secure Relay
                </CtaButton>

                <p className="body-copy mt-4 leading-relaxed">
                  Secured via Krakenix Relay. Encrypted routing handled via Twilio/n8n API.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
