import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artworks, getArtwork, getRelated } from "@/lib/artworks";
import ArtworkDetail from "@/components/ArtworkDetail";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const art = getArtwork(slug);
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
  const art = getArtwork(slug);
  if (!art) notFound();
  const related = getRelated(slug, 4);
  return <ArtworkDetail artwork={art} related={related} />;
}
