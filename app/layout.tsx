import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <div className="bg-[#1a1a1a] border-b border-white/5" data-testid="inline-currencybar">
          <div className="max-w-[1728px] mx-auto px-6 py-2">
            <p className="text-[11px] text-white/40">TEST: Inline bar renders</p>
          </div>
        </div>
        <Navbar />
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
