"use client";

import { useState } from "react";
import { FAQ_ITEMS } from "@/lib/faq";
import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-compact relative">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions" />

        <div className="space-y-2">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            return (
              <FadeIn key={item.question} delay={i * 40}>
                <div className="glass-card-purple overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-white/[0.03] transition-colors"
                    aria-expanded={open}
                  >
                    <span className="font-medium text-foreground text-sm sm:text-base pr-2">
                      {item.question}
                    </span>
                    <svg
                      className={`w-5 h-5 shrink-0 text-cyan transition-transform ${open ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {open && (
                    <div className="px-4 pb-4 -mt-1">
                      <p className="text-sm text-muted-light leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
