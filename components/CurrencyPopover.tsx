"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, RefreshCw } from "lucide-react";
import Link from "next/link";

type Currency = "INR" | "USD";

export default function CurrencyPopover() {
  const [open, setOpen] = useState(false);
  const [rates, setRates] = useState<{ inr: number; usd: number } | null>(null);
  const [amount, setAmount] = useState(1);
  const [currency, setCurrency] = useState<Currency>("INR");
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

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

  const rate = currency === "INR" ? rates?.inr : rates?.usd;
  const converted = rate ? (amount * rate).toFixed(2) : "—";

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(e.target as Node) &&
      triggerRef.current &&
      !triggerRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white text-sm font-medium transition-colors backdrop-blur-md"
      >
        <RefreshCw
          size={14}
          className={`shrink-0 ${open ? "text-gold" : "text-gold"}`}
        />
        <span>
          {rates
            ? `INR/RUB ${rates.inr.toFixed(2)}`
            : "INR/RUB —"}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={popoverRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed sm:absolute top-24 sm:top-full left-4 right-4 sm:left-auto sm:right-0 w-auto sm:w-[380px] mt-2 bg-charcoal/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 z-50"
          >
            <div className="relative p-5">
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              <p className="text-[11px] text-white/40 leading-relaxed pr-6 mb-5">
                {dateStr} at the rate of the Central Bank of Russia. Prices
                from brokerage companies for currency exchange may differ by
                5-10%.
              </p>

              <p className="text-xs font-bold tracking-wider text-white uppercase mb-4">
                Select currency and amount
              </p>

              <div className="flex items-center gap-3 mb-5">
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={amount}
                  onChange={(e) =>
                    setAmount(Math.max(0, parseFloat(e.target.value) || 0))
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as Currency)}
                  className="shrink-0 bg-white/5 border border-white/10 rounded-xl px-3 py-3 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer"
                >
                  <option value="INR" className="bg-charcoal">INR</option>
                  <option value="USD" className="bg-charcoal">USD</option>
                </select>
              </div>

              <div className="text-center mb-5">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  {converted} <span className="text-white/60">₽</span>
                </span>
              </div>

              <Link
                href="/tips"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
              >
                Learn how to pay
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
