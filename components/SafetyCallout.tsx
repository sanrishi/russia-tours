"use client";

import { motion } from "framer-motion";
import { Phone, Shield, ExternalLink } from "lucide-react";

export default function SafetyCallout() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-6 sm:p-8"
    >
      <div className="flex items-center gap-3 mb-4">
        <Shield size={20} className="text-red-400" />
        <h3 className="text-lg font-bold text-white">Safety for Indian Travelers</h3>
      </div>
      <p className="text-white/50 text-sm leading-relaxed mb-6">
        Your safety is our priority. Here are the key contacts for Indian
        travelers in Russia.
      </p>

      <div className="space-y-4">
        <div className="flex items-start gap-4 p-4 rounded-xl border border-red-500/10 bg-red-500/[0.03]">
          <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center shrink-0">
            <Phone size={18} className="text-red-400" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">
              24/7 Emergency Helpline
            </p>
            <a
              href="tel:+79652773414"
              className="text-gold text-sm hover:underline font-medium"
            >
              +7 965 277 3414
            </a>
            <p className="text-white/40 text-xs mt-0.5">
              Available round the clock for urgent assistance
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02]">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
            <ExternalLink size={18} className="text-gold" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">
              Indian Embassy — Consular Dept
            </p>
            <p className="text-white/50 text-xs">+7 495 916-23-43</p>
            <a
              href="mailto:cons.moscow@mea.gov.in"
              className="text-gold text-xs hover:underline"
            >
              cons.moscow@mea.gov.in
            </a>
            <p className="text-white/40 text-xs mt-0.5">
              For non-urgent queries and documentation
            </p>
          </div>
        </div>
      </div>

      <p className="text-white/30 text-xs mt-4">
        Your guide is available throughout the trip. In any emergency, contact
        your guide first.
      </p>
    </motion.section>
  );
}
