"use client";

import { BOOKING_HREF, BOOKING_SECTION_ID, IS_EXTERNAL_BOOKING } from "@/lib/brand";

type BookCallLinkProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "gold" | "outline" | "none";
  size?: "sm" | "md" | "lg";
  onNavigate?: () => void;
};

const SIZES = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-8 py-4 text-base sm:text-lg",
};

const VARIANTS = {
  gold: "btn-gold rounded-full",
  outline: "btn-outline rounded-full",
  none: "",
};

/**
 * One-way Book Call CTA:
 * - External Calendly URL → opens in a new tab
 * - Otherwise → scrolls to #booking (never routes back from contact)
 */
export function BookCallLink({
  children,
  className = "",
  variant = "none",
  size = "md",
  onNavigate,
}: BookCallLinkProps) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (IS_EXTERNAL_BOOKING) return;

    const el = document.getElementById(BOOKING_SECTION_ID);
    if (!el) return;

    e.preventDefault();
    if (window.location.hash !== `#${BOOKING_SECTION_ID}`) {
      window.history.pushState(null, "", `#${BOOKING_SECTION_ID}`);
    }
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const styled =
    variant === "none"
      ? className
      : `inline-flex items-center justify-center gap-2 font-semibold ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  return (
    <a
      href={BOOKING_HREF}
      onClick={handleClick}
      className={styled}
      {...(IS_EXTERNAL_BOOKING
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
