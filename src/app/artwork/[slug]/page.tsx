import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getArtworkBySlug, getRelatedArtworks } from "@/lib/db";
import ArtworkDetail from "@/components/ArtworkDetail";
import { ArtworkJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE = "https://discreteshadoww.com";

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const art = await getArtworkBySlug(slug);
  if (!art) return { title: "Artwork not found" };

  const url = `${BASE}/artwork/${slug}`;
  const image = art.src || `${BASE}/og-image.png`;
  const title = `${art.title} — ${art.category} Art`;

  return {
    title: art.title,
    description: art.description || `${art.title} — original ${art.category.toLowerCase()} by Discrete Shadow. ${art.medium ? art.medium + ". " : ""}Commission your own bespoke artwork.`,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description: art.description || `Original ${art.category.toLowerCase()} by Discrete Shadow.`,
      url,
      type: "article",
      images: [
        {
          url: image,
          width: 800,
          height: 1000,
          alt: art.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: art.description || `Original ${art.category.toLowerCase()} by Discrete Shadow.`,
      images: [image],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [art, related] = await Promise.all([
    getArtworkBySlug(slug),
    getRelatedArtworks(slug, 4),
  ]);
  if (!art) notFound();

  return (
    <>
      <ArtworkJsonLd
        title={art.title}
        description={art.description || ""}
        image={art.src}
        slug={slug}
        medium={art.medium}
        year={art.year}
        available={art.available}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE },
          { name: art.category, url: `${BASE}/#${art.category.toLowerCase()}` },
          { name: art.title, url: `${BASE}/artwork/${slug}` },
        ]}
      />
      <ArtworkDetail artwork={art} related={related} />
    </>
  );
}
