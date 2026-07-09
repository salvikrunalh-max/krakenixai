"use client";

import { useEffect, useState } from "react";
import { CtaButton } from "./cta-button";
import { BookingWidget } from "./booking-widget";
import { FadeIn } from "./fade-in";

const TOTAL_SLOTS = 10;
const INITIAL_CLAIMED = 4;

export function ScarcityBooking() {
  const [remaining, setRemaining] = useState(TOTAL_SLOTS - INITIAL_CLAIMED);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.92 && remaining > 2) {
        setRemaining((r) => r - 1);
      }
    }, 45000);
    return () => clearInterval(interval);
  }, [remaining]);

  const claimed = TOTAL_SLOTS - remaining;
  const pct = (claimed / TOTAL_SLOTS) * 100;

  return (
    <section id="scarcity" className="section-compact relative overflow-hidden">
      <div className="section-glow section-glow-gold" />
      <div className="glow-orb bottom-0 left-1/4 h-64 w-96 bg-gold/10" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-8 items-start">
          <FadeIn>
            <div className="text-center lg:text-left glass-card card-compact">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/35 bg-gold/10 px-3.5 py-1 text-sm font-semibold text-gold mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                {remaining} Slots Available
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 leading-tight text-foreground">
                We need 10 local case studies.{" "}
                <span className="text-gradient-gold">Let&apos;s build yours at cost.</span>
              </h2>

              <p className="text-muted-light text-sm sm:text-base max-w-xl mx-auto lg:mx-0 mb-5 leading-relaxed">
                Waiving corporate markups for 10 foundational clients — flexible payment plans
                so partnering is effortless.
              </p>

              <CtaButton href="#contact?intent=foundational" size="md" className="mb-6">
                Claim a Foundational Slot
              </CtaButton>

              <div className="glass-card-gold card-compact max-w-md mx-auto lg:mx-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-light">Foundational cohort</span>
                  <span className="text-xs font-bold text-gold tabular-nums">
                    {claimed} / {TOTAL_SLOTS} claimed
                  </span>
                </div>
                <div className="h-2 rounded-full bg-black/30 border border-gold/10 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold/70 to-gold-hover transition-all duration-700"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-light">
                  Markups waived · flexible payment plans · priority engineering.
                </p>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <BookingWidget />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
