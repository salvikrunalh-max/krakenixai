import Link from "next/link";

export const NAV_LINKS = [
  { href: "#industries", label: "Industries" },
  { href: "#lost-leads", label: "Lost Revenue" },
  { href: "#live-test", label: "Live Demo" },
  { href: "#systems", label: "Systems" },
  { href: "#calculator", label: "Calculator" },
  { href: "#pricing", label: "Pricing" },
  { href: "#contact", label: "Contact" },
] as const;

export function NavLinks() {
  return (
    <nav className="hidden lg:flex items-center gap-1 text-sm">
      {NAV_LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="rounded-md px-3 py-1.5 text-muted-light hover:text-foreground hover:bg-white/[0.05] transition-colors"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="#enterprise"
        className="rounded-md px-3 py-1.5 text-gold hover:text-gold-hover font-medium transition-colors"
      >
        Enterprise
      </Link>
    </nav>
  );
}
