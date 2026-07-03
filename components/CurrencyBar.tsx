"use client";

export default function CurrencyBar() {
  return (
    <div className="bg-[#1a1a1a] border-b border-white/5">
      <div className="max-w-[1728px] mx-auto px-6 py-2 flex items-center justify-between gap-4">
        <p className="text-[11px] text-white/40 leading-relaxed">
          Loading exchange rates... Prices from brokerage companies for currency exchange may differ by 5-10%.
        </p>
      </div>
    </div>
  );
}
