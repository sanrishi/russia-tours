"use client";

import { motion } from "framer-motion";
import { LockKeyhole } from "lucide-react";

export default function CertificationsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="border-t border-white/5 py-10"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {/* SSL / HTTPS — live trust indicator */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
              <LockKeyhole size={18} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">SSL Encrypted</p>
              <p className="text-white/40 text-xs">
                HTTPS — secure connection
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
