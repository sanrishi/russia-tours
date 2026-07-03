"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CurrencyBar() {
  const [rates, setRates] = useState<{ inr: number; usd: number } | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchRates = async () => {
      try {
        const res = await fetch(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled) return;
        setRates({
          inr: data.rates.RUB / data.rates.INR,
          usd: data.rates.RUB,
        });
      } catch {
        // silently fail
      }
    };

    fetchRates();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="bg-[#1a1a1a] border-b border-white/5">
      <div className="max-w-[1728px] mx-auto px-6 py-2 flex items-center justify-between gap-4">
        <p className="text-[11px] text-white/40 leading-relaxed">
          {rates ? (
            <>
              {new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
              at the rate of the Central Bank of Russia. 1 INR ≈{" "}
              {rates.inr.toFixed(2)} RUB · 1 USD ≈ {rates.usd.toFixed(2)} RUB.
            </>
          ) : (
            "Loading exchange rates..."
          )}{" "}
          Prices from brokerage companies for currency exchange may differ by
          5-10%.
        </p>
      </div>
    </div>
  );
}
