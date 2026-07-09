import Link from "next/link";
import { TEAM } from "@/lib/team";
import { SectionHeading } from "./section-heading";
import { FOUNDER_SMS_HREF } from "@/lib/brand";

export function Team() {
  return (
    <section id="team" className="section-compact relative border-y border-cyan/10">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Your team"
          title="Meet the people behind Krakenix"
          description="Real engineers. Text, book a call, or use the contact form — no ticket queues."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {TEAM.map((member) => (
            <div
              key={member.id}
              className={`card-compact flex gap-3 items-start ${
                member.featured
                  ? "glass-card-gold ring-1 ring-gold/35"
                  : member.name === "Natasha"
                    ? "glass-card-purple"
                    : member.name === "Alex Rivera"
                      ? "glass-card-cyan"
                      : member.name === "Elena Morales"
                        ? "glass-card-emerald"
                        : "glass-card-amber"
              }`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                  member.featured
                    ? "bg-gold/15 border-gold/40 text-gold"
                    : "bg-gradient-to-br from-cyan/25 to-blue/15 border-cyan/30 text-cyan-bright"
                }`}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-foreground leading-tight">
                  {member.displayName}
                </h3>
                <p className="text-sm text-cyan-bright/90 font-medium mt-0.5">{member.role}</p>
                <p className="text-sm text-muted-light mt-1 leading-snug">{member.specialty}</p>
                <p className="text-xs text-muted-light mt-1">{member.stat}</p>
                {member.featured ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    <a
                      href={FOUNDER_SMS_HREF}
                      className="text-sm font-medium text-cyan-bright hover:text-cyan transition-colors"
                    >
                      Text
                    </a>
                    <span className="text-muted">·</span>
                    <Link
                      href="#booking"
                      className="text-sm font-medium text-gold hover:text-gold-hover transition-colors"
                    >
                      Book Call
                    </Link>
                  </div>
                ) : (
                  <Link
                    href="#contact"
                    className="inline-block mt-2 text-sm font-medium text-gold hover:text-gold-hover transition-colors"
                  >
                    Contact form →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-sm text-muted-light">
          {["Encrypted relay", "No lock-in", "Local case studies", "Direct engineer access"].map(
            (item) => (
              <span key={item} className="flex items-center gap-1.5">
                <svg className="w-3 h-3 text-cyan shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
