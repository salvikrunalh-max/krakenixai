import { INDUSTRY_TICKER } from "@/lib/industries";

export function IndustryTicker() {
  const items = [...INDUSTRY_TICKER, ...INDUSTRY_TICKER];

  return (
    <div className="relative z-10 border-t border-cyan/20 glass-card !rounded-none border-x-0 border-b-0 py-3">
      <div className="ticker-wrap">
        <div className="ticker-track">
          {items.map((name, i) => (
            <span key={`${name}-${i}`} className="ticker-item">
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
