import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getArtworkBySlug, getRelatedArtworks } from "@/lib/db";
import ArtworkDetail from "@/components/ArtworkDetail";

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
  if (!art) return { title: "Artwork not found — Discrete Shadow" };
  return {
    title: `${art.title} — Discrete Shadow`,
    description: art.description,
    openGraph: {
      title: `${art.title} — Discrete Shadow`,
      description: art.description,
      images: [{ url: art.src }],
      type: "article",
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
  return <ArtworkDetail artwork={art} related={related} />;
}
