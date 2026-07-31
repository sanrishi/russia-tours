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
    "Arctic Quest — Murmansk 4-Day Tour (Aurora, Teriberka, Khibiny) | Trips to Russia by Indosvetka",
  description:
    "4-day guided tour of Murmansk for Indian travelers. Aurora hunting, husky & reindeer park, Khibiny Mountains, and Teriberka on the Arctic Ocean. 61,000 RUB per person.",
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
