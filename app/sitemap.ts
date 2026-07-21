import type { MetadataRoute } from "next";

const tipPages = [
  "visa-guide", "safety", "indian-food", "transport", "first-time",
  "phrasebook", "currency", "connectivity", "hotels", "itineraries",
  "practical-tips", "weather-packing",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tripstorussia.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/moscow-express`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/visa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/tips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...tipPages.map((slug) => ({
      url: `${base}/tips/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
