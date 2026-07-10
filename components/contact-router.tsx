"use client";

import { useState } from "react";
import {
  FOUNDER_TARGET,
  SPECIALIST_TARGETS,
  type ContactTarget,
} from "@/lib/contact-targets";

type ContactRouterProps = {
  selected: ContactTarget;
  onSelect: (target: ContactTarget) => void;
};

export function ContactRouter({ selected, onSelect }: ContactRouterProps) {
  const [showSpecialists, setShowSpecialists] = useState(false);

  return (
    <div className="space-y-4 mb-6">
      <div className="glass-card-purple card-compact">
        <button
          type="button"
          onClick={() => setShowSpecialists(!showSpecialists)}
          className="w-full flex items-center justify-between gap-3 text-left cursor-pointer"
          aria-expanded={showSpecialists}
        >
          <div>
            <p className="text-xs uppercase tracking-widest text-purple-300 font-semibold mb-1">
              Route to the team
            </p>
            <p className="text-sm text-muted-light">
              Optional — pick Krunal or Natasha. Submissions route through {FOUNDER_TARGET.label}&apos;s relay.
            </p>
          </div>
          <svg
            className={`w-5 h-5 shrink-0 text-purple-300 transition-transform ${showSpecialists ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showSpecialists && (
          <div className="grid sm:grid-cols-2 gap-2 mt-4 pt-4 border-t border-purple-400/15">
            {SPECIALIST_TARGETS.map((target) => {
              const active =
                selected.id === target.id && selected.interest === target.interest;
              return (
                <button
                  key={`${target.id}-${target.interest}`}
                  type="button"
                  onClick={() => onSelect(target)}
                  className={`rounded-lg border p-3 text-left transition-all cursor-pointer ${
                    active
                      ? "border-purple-400/50 bg-purple-500/15 ring-1 ring-purple-400/30"
                      : "border-white/10 bg-white/[0.02] hover:border-purple-400/25"
                  }`}
                >
                  <p className="text-sm font-semibold text-foreground">{target.label}</p>
                  <p className="text-xs text-purple-300/90 mt-0.5">{target.interest}</p>
                  <p className="text-xs text-muted-light mt-1">{target.role}</p>
                </button>
              );
            })}
          </div>
        )}

        {selected.interest !== FOUNDER_TARGET.interest && (
          <div className="mt-3 pt-3 border-t border-purple-400/15 text-sm">
            <p className="text-muted-light">
              Form routes to:{" "}
              <span className="text-foreground font-medium">{selected.label}</span>
              <span className="text-muted-light"> · {selected.interest}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
