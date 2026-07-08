"use client";

import { motion } from "framer-motion";
import { IndianRupee, Minus, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const PRICE_PER_PERSON = 160000;
const DURATION_DAYS = 7;

export default function CostEstimator() {
  const [groupSize, setGroupSize] = useState(4);
  const [displayTotal, setDisplayTotal] = useState(0);
  const [displayPerPerson, setDisplayPerPerson] = useState(0);
  const prevTotalRef = useRef(0);
  const thumbRef = useRef<HTMLDivElement>(null);

  const total = groupSize * PRICE_PER_PERSON;

  useEffect(() => {
    const from = prevTotalRef.current;
    const to = total;
    const duration = 400;
    const start = performance.now();

    if (from === to) {
      setDisplayTotal(to);
      setDisplayPerPerson(PRICE_PER_PERSON);
      return;
    }

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setDisplayTotal(current);
      setDisplayPerPerson(Math.round(PRICE_PER_PERSON));
      if (progress < 1) requestAnimationFrame(animate);
    };

    prevTotalRef.current = to;
    requestAnimationFrame(animate);
  }, [total]);

  const pct = ((groupSize - 1) / 14) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-[#161412] p-6 sm:p-8 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-lg bg-gold/10 flex items-center justify-center">
          <IndianRupee size={18} className="text-gold" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Trip Cost Estimator</h3>
          <p className="text-[11px] text-white/30">Real-time estimate for your group</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 mb-6">
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Per Person</p>
          <p className="text-xl font-bold text-white tabular-nums">
            ₹{displayPerPerson.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-white/20 mt-0.5">7-day tour</p>
        </div>
        <div className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <p className="text-[10px] text-white/30 uppercase tracking-wider mb-1">Per Day</p>
          <p className="text-xl font-bold text-white tabular-nums">
            ₹{Math.round(displayPerPerson / DURATION_DAYS).toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-white/20 mt-0.5">{groupSize} {groupSize === 1 ? "traveler" : "travelers"}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-white/50 uppercase tracking-wider font-medium">Group Size</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
              className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/[0.04] transition-all active:scale-95"
            >
              <Minus size={12} className="text-white/50" />
            </button>
            <div className="relative flex items-center justify-center w-10">
              <motion.span
                key={groupSize}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-white font-bold text-lg tabular-nums"
              >
                {groupSize}
              </motion.span>
            </div>
            <button
              onClick={() => setGroupSize(Math.min(15, groupSize + 1))}
              className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 hover:bg-gold/[0.04] transition-all active:scale-95"
            >
              <Plus size={12} className="text-white/50" />
            </button>
          </div>
        </div>

        <div className="relative h-6 flex items-center">
          <div className="absolute left-0 right-0 h-[3px] rounded-full bg-white/10" />
          <div
            className="absolute left-0 h-[3px] rounded-full bg-gradient-to-r from-gold/60 to-gold"
            style={{ width: `${pct}%` }}
          />
          <div
            ref={thumbRef}
            className="absolute w-4 h-4 rounded-full bg-gold shadow-[0_0_12px_rgba(212,175,55,0.4)] border-2 border-[#161412] transition-none"
            style={{ left: `calc(${pct}% - 8px)` }}
          />
          <input
            type="range"
            min={1}
            max={15}
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
          />
        </div>
        <div className="flex justify-between text-[10px] text-white/20 mt-1.5">
          <span>1</span>
          <span>15</span>
        </div>
      </div>

      <div className="relative p-5 rounded-xl border border-gold/15 bg-gradient-to-b from-gold/[0.03] to-gold/[0.01] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.06),transparent_60%)]" />
        <div className="relative">
          <p className="text-[10px] text-white/30 uppercase tracking-widest text-center mb-1.5">
            Estimated Total
          </p>
          <motion.p
            key={displayTotal}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            className="text-3xl sm:text-4xl font-bold text-gold text-center tabular-nums tracking-tight"
          >
            ₹{displayTotal.toLocaleString("en-IN")}
          </motion.p>
          <div className="flex items-center justify-center gap-3 mt-2">
            <span className="text-[11px] text-white/30">
              ₹{PRICE_PER_PERSON.toLocaleString("en-IN")} × {groupSize}
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="text-[11px] text-white/30">
              ₹{Math.round(total / DURATION_DAYS).toLocaleString("en-IN")}/day
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
