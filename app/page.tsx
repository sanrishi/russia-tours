import type { Metadata } from "next";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Trips to Russia by Indosvetka — Guided Group Tours for Indian Travelers",
  description:
    "Exclusive guided group tours to Moscow, St. Petersburg & Kazan for Indian travelers. Visa assistance, Indian cuisine, Hindi support, and 24/7 WhatsApp assistance.",
};
import TrustBar from "@/components/TrustBar";
import DestinationsGrid from "@/components/DestinationsGrid";
import TourModels from "@/components/TourModels";
import CulturalImmersion from "@/components/CulturalImmersion";
import Testimonials from "@/components/Testimonials";
import IndiaRussiaTrust from "@/components/IndiaRussiaTrust";
import ConversionFooter from "@/components/ConversionFooter";
import FestivalBanner from "@/components/FestivalBanner";
import { getTourPackages } from "@/lib/contentful";
export default async function Home() {
  let moscowTitle: string | undefined;
  let moscowTagline: string | undefined;
  let moscowDescription: string | undefined;
  let moscowImage: string | undefined;
  let moscowPrice: string | undefined;
  try {
    const tours = await getTourPackages();
    const moscow = tours.find(t => t.slug === "moscow-discovery");
    if (moscow) {
      moscowTitle = moscow.title;
      moscowTagline = moscow.subtitle;
      moscowDescription = moscow.description;
      moscowImage = moscow.imageUrl;
      moscowPrice = moscow.price;
    }
  } catch {}
  return (
    <>
      <FestivalBanner />
      <Hero />
      <div className="relative">
        <TrustBar />
        <section className="relative bg-charcoal bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/enhanced_New_kremlin_v2.webp)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal/80" />
          <div className="relative z-10">
            <DestinationsGrid moscowTitle={moscowTitle} moscowTagline={moscowTagline} moscowDescription={moscowDescription} moscowImage={moscowImage} moscowPrice={moscowPrice} />
            <TourModels />
          </div>
        </section>
        <section className="relative bg-charcoal bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/visa-separator.webp)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/60" />
          <div className="relative z-10">
            <CulturalImmersion />
          </div>
        </section>
        <section className="relative bg-charcoal bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/download_v2.webp)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/60" />
          <div className="relative z-10">
            <Testimonials />
          </div>
        </section>
        <section className="relative bg-charcoal bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/Kul.webp)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/30 to-charcoal/60" />
          <div className="relative z-10">
            <IndiaRussiaTrust />
          </div>
        </section>
        <section className="relative bg-charcoal bg-cover bg-center bg-no-repeat min-h-screen" style={{ backgroundImage: "url(/enhanced_last_section.webp)" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/50 to-charcoal/80" />
          <div className="relative z-10">
            <ConversionFooter />
          </div>
        </section>
        <div className="pointer-events-none fixed inset-0 z-50" style={{ backgroundImage: `radial-gradient(circle, #d4af37 0.8px, transparent 0.8px)`, backgroundSize: "20px 20px", opacity: 0.12 }} />
      </div>
    </>
  );
}
