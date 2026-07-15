import type { Metadata } from "next"
import NewsContent from "@/components/NewsContent"

export const metadata: Metadata = {
  title: "Russia Travel News — Tourism, Diplomatic & Industry Updates | Indosvetka",
  description:
    "Stay updated with the latest news on Russia tourism, Indo-Russian diplomatic developments, travel industry insights, and cultural highlights for Indian travelers.",
  openGraph: {
    title: "Russia Travel News — Indosvetka",
    description: "Latest updates on Russia tourism and Indo-Russian travel news.",
  },
}

export default function NewsPage() {
  return <NewsContent />
}
