export function BrandMark({ size = "md" }: { size?: "sm" | "md" }) {
  const box = size === "sm" ? "h-8 w-8" : "h-9 w-9";
  const text = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div
      className={`flex ${box} items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-blue/10 border border-cyan/40 shrink-0 shadow-[0_0_16px_rgba(0,180,255,0.25)]`}
    >
      <span className={`text-cyan-bright font-extrabold ${text} tracking-tight`}>KX</span>
    </div>
  );
}

export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`font-extrabold tracking-tight ${className}`}>
      Kraken<span className="text-cyan-bright">ix</span> AI
    </span>
  );
}
