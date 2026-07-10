"use client";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline";
  className?: string;
  size?: "sm" | "md" | "lg";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function CtaButton({
  href,
  children,
  variant = "gold",
  className = "",
  size = "md",
  onClick,
}: CtaButtonProps) {
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm sm:text-base",
    lg: "px-8 py-4 text-base sm:text-lg",
  };

  const variants = {
    gold: "btn-gold rounded-full",
    outline: "btn-outline rounded-full",
  };

  const external = href.startsWith("http://") || href.startsWith("https://");

  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold ${sizes[size]} ${variants[variant]} ${className}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
