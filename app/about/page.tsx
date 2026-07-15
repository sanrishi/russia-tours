import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "About Sveta — Your Personal Guide to Russia for Indian Travelers",
  description:
    "Meet Sveta, founder of Trips to Russia by Indosvetka. With years of experience hosting Indian travelers, she creates comfortable, well-organized guided tours across Moscow, St. Petersburg, and Kazan.",
};

export default function AboutPage() {
  return <AboutContent />;
}
