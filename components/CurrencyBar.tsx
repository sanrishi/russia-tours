"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

type Rates = {
  inr: number;
  usd: number;
  date: string;
};

export default function CurrencyBar() {
  const [rates, setRates] = useState<Rates | null>(null);
  const [dismissed, setDismissed] = useState<boolean | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("currencyBarDismissed");
    setDismissed(stored === "true");
  }, []);

  useEffect(() => {
    if (dismissed !== false) return;

    let cancelled = false;

    const fetchRates = async () => {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        const usdInr = data.rates.INR;
        const usdRub = data.rates.RUB;
        setRates({
          inr: usdRub / usdInr,
          usd: usdRub,
          date: data.date,
        });
      } catch {
        // silently fail
      }
    };

    fetchRates();
    return () => { cancelled = true; };
  }, [dismissed]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    sessionStorage.setItem("currencyBarDismissed", "true");
  }, []);

  if (dismissed) return null;

  return (
    <div className="relative bg-[#1a1a1a] border-b border-white/5">
      <div className="max-w-[1728px] mx-auto px-6 py-2 flex items-center justify-between gap-4">
        <p className="text-[11px] text-white/40 leading-relaxed">
          {rates ? (
            <>
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })} at the rate of the Central Bank of Russia.
              {" "}1 INR ≈ {rates.inr.toFixed(2)} RUB · 1 USD ≈ {rates.usd.toFixed(2)} RUB.
            </>
          ) : (
            "Loading exchange rates..."
          )}
          {" "}Prices from brokerage companies for currency exchange may differ by 5-10%.
        </p>
        <button
          onClick={handleDismiss}
          className="shrink-0 text-white/20 hover:text-white/60 transition-colors"
          aria-label="Dismiss currency bar"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
