"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";
import { CtaButton } from "./cta-button";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-compact relative">
      <div className="section-glow section-glow-cyan" />
      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions"
          description="Straight answers on pricing, setup, and how Krakenix Relay keeps your leads moving."
        />

        <div className="section-panel">
          <div className="space-y-3">
            {FAQ_ITEMS.map((item, i) => {
              const open = openIndex === i;
              return (
                <FadeIn key={item.question} delay={i * 40}>
                  <div className="glass-card overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer hover:bg-white/[0.04] transition-colors"
                      aria-expanded={open}
                    >
                      <span className="font-semibold text-foreground text-base sm:text-lg pr-2 leading-snug">
                        {item.question}
                      </span>
                      <svg
                        className={`w-5 h-5 shrink-0 text-cyan-bright transition-transform ${open ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {open && (
                      <div className="px-5 pb-5 border-t border-white/8">
                        <p className="body-copy pt-4">{item.answer}</p>
                      </div>
                    )}
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <div className="glass-card-gold card-compact text-center">
            <p className="text-lg font-semibold text-foreground mb-2">Still have questions?</p>
            <p className="body-copy mb-5 max-w-md mx-auto">
              Build your stack in the calculator, then lock your configuration — we respond in under 15 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <CtaButton href="#calculator" size="md">
                Build Your Estimate
              </CtaButton>
              <CtaButton href="#contact" variant="outline" size="md">
                Contact Us
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
