"use client";

import { useState } from "react";
import Link from "next/link";
import { NAV_LINKS } from "./nav-dropdown";
import { TestItLiveButton } from "./test-it-live-button";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-foreground"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute top-14 inset-x-0 border-b border-cyan/10 bg-[rgba(2,8,24,0.98)] backdrop-blur-xl px-4 py-3 shadow-xl">
          <nav className="flex flex-col gap-0.5">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 min-h-[44px] text-sm text-muted-light hover:text-foreground hover:bg-white/[0.04] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#enterprise"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 min-h-[44px] text-sm font-medium text-gold hover:bg-gold/10 transition-colors"
            >
              Enterprise
            </Link>
            <TestItLiveButton size="sm" className="w-full justify-center mt-2" />
            <Link
              href="#booking"
              onClick={() => setOpen(false)}
              className="btn-gold rounded-full px-4 py-3 min-h-[44px] text-sm text-center mt-2"
            >
              Book Call
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
