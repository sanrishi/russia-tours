import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Russia Travel Tips for Indians — Food, Safety, Weather & Packing | Indosvetka",
  description:
    "Essential travel tips for Indian travelers visiting Russia. Indian food guide, safety tips, weather and packing advice, currency, SIM cards, visa guide, and more.",
};

export default function TipsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
