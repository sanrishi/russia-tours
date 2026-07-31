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
    "Polar Saga — Murmansk 4-Day Ice Floating Tour (Aurora, Teriberka, Husky) | Trips to Russia by Indosvetka",
  description:
    "4-day guided tour of Murmansk for Indian travelers. Two nights of aurora hunting, Teriberka on the Arctic Ocean, husky & reindeer park, and a snowmobile safari with ice floating in the Kola Bay. 62,000 RUB per person.",
}

export default function MurmanskLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
