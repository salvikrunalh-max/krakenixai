type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  accent?: "cyan" | "gold";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  accent = "cyan",
}: SectionHeadingProps) {
  const accentClass = accent === "gold" ? "eyebrow-gold" : "eyebrow-cyan";

  return (
    <div className="content-blur card-compact text-center mb-6 sm:mb-8 max-w-4xl mx-auto">
      <p className={`eyebrow ${accentClass} mb-3`}>{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="section-description mt-4 max-w-2xl mx-auto">{description}</p>
      )}
    </div>
  );
}
