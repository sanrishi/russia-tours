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
    "Russia Highlights — Moscow + Kazan 5-Day Tour (Kul Sharif, Kremlin, Halal-Friendly) | Trips to Russia by Indosvetka",
  description:
    "5-day guided Moscow + Kazan tour for Indian travelers. Kazan Kremlin (UNESCO), Kul Sharif Mosque, Palace of Farmers, Tatar heritage and halal-friendly dining, plus a full Moscow city tour. From 65,000 INR per person.",
}

export default function KazanLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
