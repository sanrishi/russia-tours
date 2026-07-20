import { createClient } from "contentful";

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "",
});

export interface TourPackageFields {
  title: string;
  slug: string;
  subtitle?: string;
  description?: string;
  duration?: string;
  price: string;
  priceNote?: string;
  imageUrl?: string;
  heroImageUrl?: string;
  highlights?: string[];
  itinerary?: string[];
  inclusions?: string[];
  exclusions?: string[];
  order?: number;
}

export async function getTourPackages(): Promise<TourPackageFields[]> {
  const entries = await client.getEntries({
    content_type: "tourPackage",
    order: ["fields.order"],
  });
  return entries.items.map((item: any) => item.fields as TourPackageFields);
}

export async function getTourPackageBySlug(slug: string): Promise<TourPackageFields | null> {
  const entries = await client.getEntries({
    content_type: "tourPackage",
    "fields.slug[in]": slug,
    limit: 1,
  });
  return entries.items.length > 0 ? (entries.items[0].fields as unknown as TourPackageFields) : null;
}
