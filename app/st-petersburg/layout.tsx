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
    "Russia Highlights — Moscow + St. Petersburg 5-Day Tour (Hermitage, Peterhof, Sapsan) | Trips to Russia by Indosvetka",
  description:
    "5-day guided Moscow + St. Petersburg tour for Indian travelers. High-speed Sapsan train, Hermitage Museum, Peterhof fountains, Tsarskoe Selo Amber Room, and a full Moscow city tour. From 65,000 INR per person.",
}

export default function StPetersburgLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${lora.variable} ${inter.variable}`}>
      {children}
    </div>
  )
}
