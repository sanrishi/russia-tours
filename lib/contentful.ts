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

function apiUrl(path: string): string {
  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || "";
  const token = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN || "";
  return `https://cdn.contentful.com/spaces/${spaceId}/environments/master${path}?access_token=${token}`;
}

export async function getTourPackages(): Promise<TourPackageFields[]> {
  const res = await fetch(apiUrl("/entries"), {
    next: { revalidate: 60 },
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  const items = data.items || [];
  const contentTypes: Record<string, any> = {};
  for (const ct of data.includes?.Entry || []) {
    contentTypes[ct.sys.id] = ct;
  }
  return items
    .filter((item: any) => item.sys.contentType?.sys?.id === "tourPackage")
    .map((item: any) => item.fields as TourPackageFields)
    .sort((a: TourPackageFields, b: TourPackageFields) => (a.order || 0) - (b.order || 0));
}

export async function getTourPackageBySlug(slug: string): Promise<TourPackageFields | null> {
  const res = await fetch(apiUrl(`/entries?content_type=tourPackage&fields.slug[in]=${slug}&limit=1`), {
    next: { revalidate: 60 },
  });
  const data = await res.json();
  return data.items?.length > 0 ? (data.items[0].fields as TourPackageFields) : null;
}
