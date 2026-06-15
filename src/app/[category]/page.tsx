import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageShell from "@/components/PageShell";
import CategoryView from "@/components/CategoryView";
import { CollectionJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";
import { CATEGORY_PAGES, getCategoryConfig } from "@/lib/categories";
import { getArtworksByCategoryName } from "@/lib/db";

const BASE = "https://discreteshadoww.com";

// Static routes (about, contact, …) take precedence; only the 4 known
// category slugs are valid here, everything else 404s.
export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return CATEGORY_PAGES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const config = getCategoryConfig(category);
  if (!config) return { title: "Not found" };
  const url = `${BASE}/${config.slug}`;
  return {
    title: config.metaTitle,
    description: config.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: `${config.metaTitle} | Discrete Shadow`,
      description: config.metaDescription,
      url,
      type: "website",
      images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const config = getCategoryConfig(category);
  if (!config) notFound();

  const artworks = await getArtworksByCategoryName(config.category);
  const url = `${BASE}/${config.slug}`;

  return (
    <PageShell>
      <CollectionJsonLd
        name={`${config.title} — Discrete Shadow`}
        description={config.metaDescription}
        url={url}
        items={artworks.map((a) => ({
          name: a.title,
          url: `${BASE}/artwork/${a.slug}`,
          image: a.src,
        }))}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE },
          { name: config.title, url },
        ]}
      />
      <CategoryView config={config} artworks={artworks} />
    </PageShell>
  );
}
