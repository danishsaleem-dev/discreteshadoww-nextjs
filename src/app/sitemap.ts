import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/db";

const BASE = "https://discreteshadoww.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();

  const artworkUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/artwork/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...artworkUrls,
  ];
}
