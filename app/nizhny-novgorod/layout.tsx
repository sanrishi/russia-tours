import { Lora, Inter } from "next/font/google"

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  title:
    "Russia Highlights — Moscow + Nizhny Novgorod 5-Day Tour (Kremlin, Volga River) | Trips to Russia by Indosvetka",
  description:
    "5-day guided Moscow + Nizhny Novgorod tour for Indian travelers. Moscow's Kremlin and Red Square, then high-speed train to Nizhny Novgorod — its Kremlin, Chkalov Staircase, Volga embankments and Strelka. From 65,000 INR per person.",
}

export default function NizhnyNovgorodLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
