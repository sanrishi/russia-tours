import type { Metadata } from "next";
import PlacesContent from "@/components/PlacesContent";

export const metadata: Metadata = {
  title: "Places to Visit in Russia — Moscow, St. Petersburg & Kazan | Indosvetka",
  description:
    "Explore Russia's top destinations for Indian travelers — Moscow, St. Petersburg, and Kazan. Curated guides with Indian food options, halal dining, and cultural highlights.",
};

export default function PlacesPage() {
  return <PlacesContent />;
}
