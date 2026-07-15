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
    <div className={`relative rounded-2xl border border-white/[0.06] bg-black/50 backdrop-blur-xl ${className}`}>
      {children}
    </div>
  )
}
