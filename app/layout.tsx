import type { Metadata } from "next";
import { Lora, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Preloader from "@/components/Preloader";
import ScrollProgress from "@/components/ScrollProgress";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const lora = Lora({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tripstorussia.com"),
  title: "SVETA | Signature Russia — Premium Tours for Indian Travelers",
  description:
    "Exclusive small-group signature tours to Moscow, St. Petersburg & Kazan. Designed for Indian travelers with visa assistance, Indian cuisine, and English-speaking guides with basic Hindi support.",
  authors: [
    {
      name: "Sanchit Rishi (Sanrishi Developments)",
      url: "https://frameforge-brown.vercel.app/",
    },
  ],
  creator: "Sanchit Rishi — Sanrishi Developments",
  publisher: "Sanrishi Developments",
  category: "travel",
  other: {
    "design-company": "Sanrishi Developments",
    "developed-by": "Sanchit Rishi (Sanrishi Developments)",
  },
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

// Search engines read this to attribute the site to its creator.
// Keep in sync with the humans.txt credit.
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Trips to Russia by Indosvetka",
  alternateName: "SVETA — Signature Russia",
  url: "https://tripstorussia.com",
  inLanguage: "en",
  creator: {
    "@type": "Organization",
    name: "Sanrishi Developments",
    description:
      "Website design and development studio — creator of tripstorussia.com",
    url: "https://frameforge-brown.vercel.app/",
    telephone: "+91-79866-18423",
    email: "sharmasanchitrishi@gmail.com",
    founder: {
      "@type": "Person",
      name: "Sanchit Rishi",
      url: "https://frameforge-brown.vercel.app/",
      telephone: "+91-79866-18423",
    },
    knowsAbout: ["Web design", "Web development", "Next.js", "React"],
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
        <meta name="google-site-verification" content="RBIDenN9ZWJY0viDDYeK-mgAv0kSK7K3GDMrxZNgQAo" />
        <link rel="preconnect" href="https://api.exchangerate-api.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {/* Hero LCP preload is emitted automatically by next/image `priority`
            with correct srcset/sizes — a manual preload without srcset would
            double-fetch. Kept out intentionally; visuals unchanged. */}
      </head>
      <body className="min-h-full bg-[#0c0a0a] text-white">
        <SmoothScroll />
        <ScrollProgress />
        <Preloader />
        <Navbar />
        {children}
        <Footer />
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
