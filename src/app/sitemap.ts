import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/db";
import { CATEGORY_PAGES } from "@/lib/categories";

const BASE = "https://discreteshadoww.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const now = new Date();

  const categoryUrls: MetadataRoute.Sitemap = CATEGORY_PAGES.map((c) => ({
    url: `${BASE}/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    { path: "about", priority: 0.7, freq: "monthly" as const },
    { path: "contact", priority: 0.7, freq: "monthly" as const },
    { path: "commission", priority: 0.9, freq: "monthly" as const },
    { path: "privacy", priority: 0.3, freq: "yearly" as const },
    { path: "terms", priority: 0.3, freq: "yearly" as const },
  ].map((p) => ({
    url: `${BASE}/${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  const artworkUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE}/artwork/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...categoryUrls,
    ...staticUrls,
    ...artworkUrls,
  ];
}
