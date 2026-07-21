"use client"

import type { ReactNode } from "react"

export default function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`relative rounded-2xl border border-white/[0.04] bg-[#1C1917]/80 ${className}`}>
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
      {children}
    </div>
  )
}
