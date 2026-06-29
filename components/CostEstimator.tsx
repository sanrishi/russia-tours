"use client";

import { motion } from "framer-motion";
import { IndianRupee, Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

const PRICE_PER_PERSON = 160000;

export default function CostEstimator() {
  const [groupSize, setGroupSize] = useState(4);

  const total = groupSize * PRICE_PER_PERSON;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-2">
        <IndianRupee size={20} className="text-gold" />
        <h3 className="text-lg font-bold text-white">Trip Cost Estimator</h3>
      </div>
      <p className="text-white/40 text-sm mb-6">
        Slide to see the estimated total for your group.
      </p>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 transition-colors"
        >
          <Minus size={16} className="text-white/60" />
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users size={16} className="text-gold" />
            <span className="text-white font-semibold">{groupSize} {groupSize === 1 ? "person" : "people"}</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            value={groupSize}
            onChange={(e) => setGroupSize(Number(e.target.value))}
            className="w-full accent-gold h-1.5 rounded-full appearance-none cursor-pointer bg-white/10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-gold/30"
          />
          <div className="flex justify-between text-xs text-white/30 mt-1">
            <span>1</span>
            <span>15</span>
          </div>
        </div>

        <button
          onClick={() => setGroupSize(Math.min(15, groupSize + 1))}
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-gold/40 transition-colors"
        >
          <Plus size={16} className="text-white/60" />
        </button>
      </div>

      <div className="text-center p-5 rounded-xl border border-gold/10 bg-gold/[0.02]">
        <p className="text-xs text-white/40 uppercase tracking-wider mb-1">
          Estimated Total
        </p>
        <p className="text-3xl sm:text-4xl font-bold text-gold">
          ₹{total.toLocaleString("en-IN")}
        </p>
        <p className="text-xs text-white/30 mt-1">
          ₹{PRICE_PER_PERSON.toLocaleString("en-IN")} per person × {groupSize} {groupSize === 1 ? "traveler" : "travelers"}
        </p>
      </div>
    </motion.div>
  );
}
