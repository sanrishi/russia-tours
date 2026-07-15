import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://russia-tours-poc.vercel.app";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/moscow-express`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/visa`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/tips`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/partner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
