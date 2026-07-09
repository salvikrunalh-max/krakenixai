"use client";

import { useState, type FormEvent } from "react";
import { normalizePhoneInput } from "@/lib/automation-test-schema";
import { CHAT_BOT_OFFER } from "@/lib/lost-leads-calculator";
import { SectionHeading } from "./section-heading";
import { OpenChatCta } from "./open-chat-cta";

type Status = "idle" | "loading" | "success" | "error";

export function LiveTestWidget() {
  const [phone, setPhone] = useState("");
  const [mode, setMode] = useState<"call" | "sms">("sms");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [elapsed, setElapsed] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("Dispatching to Krakenix Relay…");
    setElapsed(null);

    try {
      const res = await fetch("/api/automation-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, mode, consent, website: "" }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong");
        return;
      }

      setStatus("success");
      setElapsed(data.elapsedMs ?? null);
      setMessage(
        data.simulated
          ? mode === "call"
            ? "Demo call simulated! Configure n8n webhook for live dispatch."
            : "Demo text simulated! Configure n8n webhook for live dispatch."
          : mode === "call"
            ? "Call dispatched! Check your phone now."
            : "Text dispatched! Check your messages now."
      );
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <section id="live-test" className="section-compact relative">
      <div className="section-glow section-glow-cyan" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Live demo"
          title="Test Krakenix in 15 seconds"
          description="Enter your number. Choose call or text. See the automation fire in real time."
          accent="gold"
        />

        <form
          onSubmit={handleSubmit}
          className="glass-card-amber card-compact space-y-4"
        >
          <div className="flex items-center gap-2 text-xs text-cyan-bright font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-bright" />
            </span>
            Live · Connected to Krakenix Relay
          </div>

          <label className="block">
            <span className="text-xs text-muted mb-1 block">Your phone number</span>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(normalizePhoneInput(e.target.value))}
              placeholder="(918) 840-3501"
              className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-sm text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
            />
          </label>

          <div className="grid grid-cols-2 gap-2">
            {(
              [
                { value: "call" as const, label: "Test Call", desc: "Receive a live call" },
                { value: "sms" as const, label: "Test Text", desc: "Receive an SMS" },
              ] as const
            ).map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setMode(opt.value)}
                className={`rounded-lg border p-3 text-left transition-all cursor-pointer ${
                  mode === opt.value
                    ? "border-cyan/40 bg-cyan/10 ring-1 ring-cyan/25"
                    : "border-white/10 bg-white/[0.02] hover:border-cyan/20"
                }`}
              >
                <p className="text-sm font-semibold text-foreground">{opt.label}</p>
                <p className="text-xs text-muted-light mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              className="mt-0.5 h-4 w-4 rounded border-white/20 bg-surface accent-cyan"
            />
            <span className="text-sm text-muted-light leading-relaxed">
              I consent to receive a one-time demo {mode === "call" ? "call" : "text message"} from
              Krakenix AI at the number above. Message and data rates may apply.
            </span>
          </label>

          <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

          {message && (
            <div
              className={`rounded-lg px-3 py-2 text-sm ${
                status === "success"
                  ? "bg-emerald/10 border border-emerald/25 text-emerald"
                  : status === "error"
                    ? "bg-red-400/10 border border-red-400/25 text-red-400"
                    : "bg-cyan/10 border border-cyan/20 text-cyan-bright"
              }`}
            >
              {message}
              {elapsed !== null && status === "success" && (
                <span className="block text-xs mt-1 opacity-80">
                  Dispatched in {(elapsed / 1000).toFixed(1)}s
                </span>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "loading" || !consent}
            className="btn-gold w-full rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-50"
          >
            {status === "loading" ? "Sending live test…" : "Send Live Test"}
          </button>

          <p className="text-xs text-muted-light text-center leading-relaxed">
            Powered by n8n + Twilio via Krakenix Relay. One demo per hour per device.
          </p>
        </form>

        <div className="glass-card-emerald card-compact mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">{CHAT_BOT_OFFER.title}</p>
            <p className="text-sm text-muted-light">
              {CHAT_BOT_OFFER.description} Setup from ${CHAT_BOT_OFFER.setupFrom}.
            </p>
          </div>
          <OpenChatCta size="sm" className="shrink-0 w-full sm:w-auto justify-center">
            Ask about Chat Bots
          </OpenChatCta>
        </div>
      </div>
    </section>
  );
}
