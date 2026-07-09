import { SectionHeading } from "./section-heading";
import { FadeIn } from "./fade-in";

const STEPS = [
  {
    num: "01",
    title: "Lead arrives",
    description: "Form submit, missed call, or DM — captured instantly across every channel.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499a1.875 1.875 0 011.591-.659H15.75z" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "15-sec response",
    description: "SMS, email, or voice AI fires the millisecond a lead comes in — no manual follow-up.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Appointment booked",
    description: "Calendar sync, payment link, or estimate sent — client closed before competitors reply.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
];

const STEP_CARDS = ["glass-card-cyan", "glass-card-emerald", "glass-card-amber"] as const;

export function HowItWorks() {
  return (
    <section className="section-compact relative border-y border-cyan/8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Capture → Respond → Book"
          description="Three steps. Zero manual chasing."
        />

        <div className="grid md:grid-cols-3 gap-2.5">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 60}>
              <div
                className={`${STEP_CARDS[i % STEP_CARDS.length]} card-compact flex gap-3 items-center h-full`}
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan/12 text-cyan-bright border border-cyan/20">
                  {step.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-cyan/70">{step.num}</p>
                  <h3 className="font-semibold text-sm text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-light leading-snug line-clamp-2">{step.description}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
