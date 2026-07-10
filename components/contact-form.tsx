"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { INDUSTRY_OPTIONS } from "@/lib/industries";
import { loadCalculatorSelection } from "@/lib/calculator-storage";
import { formatPackageNote } from "@/lib/format-package-note";
import {
  FOUNDER_TARGET,
  getContactTarget,
  type ContactTarget,
} from "@/lib/contact-targets";
import { FOUNDER_EMAIL, FOUNDER_SMS_HREF } from "@/lib/brand";
import { parseClientUrlParams } from "@/lib/url-params";
import { SectionHeading } from "./section-heading";
import { ContactRouter } from "./contact-router";
import { CtaButton } from "./cta-button";

type FormState = "idle" | "loading" | "success" | "error";

type ResponseMeta = {
  simulated?: boolean;
  elapsedMs?: number;
  routedTo: string;
};

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState("");
  const [packageNote, setPackageNote] = useState("");
  const [intent, setIntent] = useState("");
  const [slot, setSlot] = useState("");
  const [industry, setIndustry] = useState<string>(INDUSTRY_OPTIONS[0]?.value ?? "");
  const [contactTarget, setContactTarget] = useState<ContactTarget>(FOUNDER_TARGET);
  const [message, setMessage] = useState("");
  const [responseMeta, setResponseMeta] = useState<ResponseMeta | null>(null);

  const applyUrlParams = useCallback(() => {
    const params = parseClientUrlParams();
    const urlIntent = params.get("intent") ?? "";
    const packageParam = params.get("package");
    const resolvedIntent =
      urlIntent || (packageParam === "custom" ? "lock" : "");
    setIntent(resolvedIntent);
    setSlot(params.get("slot") ?? "");

    const urlIndustry = params.get("industry");
    if (urlIndustry) setIndustry(urlIndustry);

    const targetId = params.get("target");
    if (targetId) {
      const target = getContactTarget(targetId);
      if (target) setContactTarget(target);
    }

    if (resolvedIntent === "enterprise") {
      setMessage(
        "I'm interested in enterprise solutions — custom AI agents, software, applications, or back-office systems for our organization."
      );
      setContactTarget(FOUNDER_TARGET);
    } else if (resolvedIntent === "booking") {
      setMessage(
        "I'd like to book a free strategy call to discuss automating my lead response."
      );
    } else if (resolvedIntent === "chatbot") {
      setMessage(
        "I'm interested in a Website Chat Bot for my site — qualify visitors, answer FAQs, and book appointments 24/7."
      );
    } else if (resolvedIntent === "foundational") {
      setMessage(
        "I'd like to claim a foundational cohort slot — build my case study at cost with flexible payment plans."
      );
    } else if (resolvedIntent === "lock") {
      setMessage(
        "I'd like to lock my calculator configuration and move forward with this stack."
      );
    }

    const calc = loadCalculatorSelection();
    if (calc) {
      setPackageNote(formatPackageNote(calc.addons, calc.total));
    }
  }, []);

  useEffect(() => {
    applyUrlParams();
    window.addEventListener("hashchange", applyUrlParams);
    return () => window.removeEventListener("hashchange", applyUrlParams);
  }, [applyUrlParams]);

  function handleTargetSelect(target: ContactTarget) {
    setContactTarget(target);
  }

  const formTitle =
    contactTarget.id === "founder"
      ? intent === "enterprise"
        ? "Enterprise inquiry"
        : intent === "booking"
          ? "Confirm your strategy call"
          : intent === "lock"
            ? "Lock your configuration"
            : intent === "foundational"
              ? "Claim a foundational slot"
              : "Get started"
      : `Message ${contactTarget.label}`;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setError("");

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: fd.get("name"),
      businessName: fd.get("businessName"),
      industry: fd.get("industry"),
      email: fd.get("email"),
      phone: fd.get("phone") || undefined,
      message: fd.get("message"),
      package: packageNote || undefined,
      intent: intent || undefined,
      slot: slot || undefined,
      contactTarget: contactTarget.id,
      contactTargetEmail: contactTarget.email,
      contactTargetLabel: contactTarget.label,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong");
        setState("error");
        return;
      }

      setResponseMeta({
        simulated: data.simulated,
        elapsedMs: data.elapsedMs,
        routedTo: data.routedTo ?? FOUNDER_EMAIL,
      });
      setState("success");
      form.reset();
    } catch {
      setError("Network error. Please try again.");
      setState("error");
    }
  }

  if (state === "success" && responseMeta) {
    const headline =
      intent === "lock"
        ? "Configuration locked."
        : intent === "foundational"
          ? "Foundational slot claimed."
          : intent === "booking"
            ? "Strategy call requested."
            : "Message received.";

    return (
      <section id="contact" className="section-compact relative">
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 text-center">
          <div className="glass-card-gold rounded-2xl p-8">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-leaf/15 border border-leaf/30 text-2xl text-leaf mb-4">
              ✓
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 text-foreground">{headline}</h2>
            <p className="text-base sm:text-lg text-muted-light mb-2 leading-relaxed">
              Architect will respond in{" "}
              <span className="text-emerald font-semibold">&lt;15s</span>.
            </p>
            <p className="text-sm text-muted-light mb-4">
              Your inquiry is queued to{" "}
              <a
                href={`mailto:${FOUNDER_EMAIL}`}
                className="text-cyan-bright font-medium hover:text-cyan transition-colors"
              >
                {responseMeta.routedTo || FOUNDER_EMAIL}
              </a>
              . Sit tight — we move at operator speed.
            </p>
            {packageNote && (
              <p className="text-sm text-cyan-bright mb-4">{packageNote}</p>
            )}
            <p className="text-xs text-muted mb-4">
              Live emails coming soon (Resend setup).
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-4">
              {intent !== "booking" && (
                <a
                  href={FOUNDER_SMS_HREF}
                  className="btn-outline rounded-full px-5 py-2.5 text-sm font-semibold"
                >
                  Text us now
                </a>
              )}
            </div>
            <CtaButton href="#calculator" variant="outline" size="sm">
              Back to calculator
            </CtaButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="section-compact relative">
      <div className="relative mx-auto max-w-2xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Get started"
          title={formTitle}
          description="Tell us about your business. We'll build your estimate and reach out fast."
        />

        <div className="section-panel space-y-4">
          <ContactRouter selected={contactTarget} onSelect={handleTargetSelect} />

          {packageNote && (
            <div className="glass-card-cyan rounded-lg px-4 py-2.5 mb-4 text-sm text-center">
              <span className="text-muted">Calculator selection: </span>
              <span className="text-cyan-bright font-medium">{packageNote}</span>
            </div>
          )}

          {slot && (
            <div className="text-sm text-center text-gold mb-4">
              Preferred slot: {decodeURIComponent(slot)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="glass-card-emerald card-compact space-y-4">
            <input type="hidden" name="contactTarget" value={contactTarget.id} />

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-muted mb-1.5 block">Your name *</span>
                <input
                  name="name"
                  required
                  className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-base text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
                />
              </label>
              <label className="block">
                <span className="text-sm text-muted mb-1.5 block">Business name *</span>
                <input
                  name="businessName"
                  required
                  className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-base text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-muted mb-1.5 block">Industry *</span>
              <select
                name="industry"
                required
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-base text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
              >
                {INDUSTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-muted mb-1.5 block">Email *</span>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-base text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
                />
              </label>
              <label className="block">
                <span className="text-sm text-muted mb-1.5 block">Phone</span>
                <input
                  name="phone"
                  type="tel"
                  className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-base text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-muted mb-1.5 block">Message *</span>
              <textarea
                name="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg bg-surface border border-white/10 px-3 py-2.5 text-base text-foreground focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/30 resize-none"
              />
            </label>

            {error && (
              <p className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-gold w-full rounded-full px-6 py-3 text-sm font-semibold disabled:opacity-60"
            >
              {state === "loading" ? "Routing via Krakenix Relay…" : `Send to ${contactTarget.label}`}
            </button>

            <p className="text-sm text-muted-light text-center leading-relaxed">
              Secured via Krakenix Relay. Encrypted routing via Twilio/n8n API.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
