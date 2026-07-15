import { Bodoni_Moda, Jost } from "next/font/google"

const bodoni = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
})

const jost = Jost({
  variable: "--font-body-alt",
  subsets: ["latin"],
  display: "swap",
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
    <div className={`${bodoni.variable} ${jost.variable}`}>
      {children}
    </div>
  )
}
