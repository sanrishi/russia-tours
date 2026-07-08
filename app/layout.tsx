import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import "./globals.css";

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
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
    <html lang="en" className={`${lora.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[#0c0a0a] text-white">
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
