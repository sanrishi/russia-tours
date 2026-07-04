import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import DestinationsGrid from "@/components/DestinationsGrid";
import TourModels from "@/components/TourModels";
import CulturalImmersion from "@/components/CulturalImmersion";
import Testimonials from "@/components/Testimonials";
import IndiaRussiaTrust from "@/components/IndiaRussiaTrust";
import ConversionFooter from "@/components/ConversionFooter";
import CertificationsSection from "@/components/CertificationsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <DestinationsGrid />
      <TourModels />
      <CulturalImmersion />
      <Testimonials />
      <IndiaRussiaTrust />
      <ConversionFooter />
      <CertificationsSection />
    </>
  );
}
