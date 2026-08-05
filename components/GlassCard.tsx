"use client"

import type { ReactNode } from "react"
import DotsOverlay from "./DotsOverlay"

export default function GlassCard({
  children,
  className = "",
  bg = "bg-[#1C1917]/70",
}: {
  children: ReactNode
  className?: string
  bg?: string
}) {
  return (
    <div className={`relative isolate overflow-hidden rounded-2xl border border-white/[0.04] ${bg} ${className}`}>
      <div aria-hidden="true" className="absolute inset-0 -z-10 backdrop-blur-md" />
      <DotsOverlay />
      <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent pointer-events-none" />
      {children}
    </div>
  )
}
