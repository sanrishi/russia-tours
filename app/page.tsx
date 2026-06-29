import Hero from "@/components/Hero";
import WeatherWidget from "@/components/WeatherWidget";
import IndiaRussiaTrust from "@/components/IndiaRussiaTrust";
import ConversionFooter from "@/components/ConversionFooter";
import CertificationsSection from "@/components/CertificationsSection";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="py-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <WeatherWidget />
        </div>
      </div>
      <IndiaRussiaTrust />
      <ConversionFooter />
      <CertificationsSection />
    </>
  );
}
