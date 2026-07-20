import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";
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
  metadataBase: new URL("https://tripstorussia.com"),
  title: "SVETA | Signature Russia — Premium Tours for Indian Travelers",
  description:
    "Exclusive small-group signature tours to Moscow, St. Petersburg & Kazan. Designed for Indian travelers with visa assistance, Indian cuisine, and English-speaking guides with basic Hindi support.",
  openGraph: {
    type: "website",
    siteName: "Trips to Russia by Indosvetka",
    title: "SVETA | Signature Russia — Premium Tours for Indian Travelers",
    description:
      "Exclusive small-group signature tours to Moscow, St. Petersburg & Kazan. Designed for Indian travelers with visa assistance, Indian cuisine, and English-speaking guides with basic Hindi support.",
    url: "https://tripstorussia.com",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SVETA | Signature Russia — Premium Tours for Indian Travelers",
    description:
      "Exclusive small-group signature tours to Moscow, St. Petersburg & Kazan. Designed for Indian travelers with visa assistance, Indian cuisine, and English-speaking guides with basic Hindi support.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preload" as="image" href="/moscow-hero.webp" fetchPriority="high" />
      </head>
      <body className="min-h-full bg-[#0c0a0a] text-white">
        <Preloader />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
