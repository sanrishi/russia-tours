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
export default function Home() {
  return (
    <>
      <FestivalBanner />
      <Hero />
      <TrustBar />
      <DestinationsGrid />
      <TourModels />
      <CulturalImmersion />
      <Testimonials />
      <IndiaRussiaTrust />
      <ConversionFooter />
    </>
  );
}
