import { Lora, Inter } from "next/font/google"

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
})

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
})

export const metadata = {
  title:
    "Moscow Discovery 7-Day Tour — ₹1,60,000/person | Trips to Russia by Indosvetka",
  description:
    "7-day guided group tour of Moscow for Indian travelers. Includes 5-star hotel, all breakfasts, airport transfers, river cruise, guided excursions, visa assistance, and Indian-friendly dining.",
}

export default function MoscowExpressLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
