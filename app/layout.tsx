import type { Metadata } from "next";
import { Inter } from "next/font/google";
import CurrencyBar from "@/components/CurrencyBar";
import Navbar from "@/components/Navbar";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SVETA | Signature Russia — Premium Tours for Indian Travelers",
  description:
    "Exclusive small-group signature tours to Moscow, St. Petersburg & Kazan. Designed for Indian travelers with visa assistance, Indian cuisine, and English-speaking guides with basic Hindi support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-charcoal text-white">
        <CurrencyBar />
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
