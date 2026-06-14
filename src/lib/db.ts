import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import {
  artworks as staticArtworks,
  getArtwork as staticGetArtwork,
  getRelated as staticGetRelated,
  type Artwork,
  type Category,
} from "@/lib/artworks";
import type { ArtworkRow } from "@/lib/supabase/types";

// Cookie-free client for build-time usage (generateStaticParams, etc.)
function createAnonClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } }
  );
}

/** Returns all artwork slugs. Safe to call from generateStaticParams (no cookies). */
export async function getAllSlugs(): Promise<string[]> {
  if (!isSupabaseConfigured()) return staticArtworks.map((a) => a.slug);
  try {
    const sb = createAnonClient();
    const { data } = await sb
      .from("artworks")
      .select("slug")
      .order("sort_order", { ascending: true });
    if (!data?.length) return staticArtworks.map((a) => a.slug);
    return (data as { slug: string }[]).map((r) => r.slug);
  } catch {
    return staticArtworks.map((a) => a.slug);
  }
}

function rowToArtwork(row: ArtworkRow): Artwork {
  const [src, ...rest] = row.images ?? [];
  return {
    slug: row.slug,
    title: row.title,
    src: src ?? "",
    category: row.category,
    note: row.note ?? "",
    medium: row.medium ?? "",
    size: row.size ?? "",
    year: row.year ?? "",
    description: row.description ?? "",
    quote: row.quote ?? undefined,
    available: row.available,
    images: rest.length ? rest : undefined,
    video: row.video ?? undefined,
  };
}

export async function getAllArtworks(): Promise<Artwork[]> {
  if (!isSupabaseConfigured()) return staticArtworks;
  const sb = await createClient();
  const { data } = await sb
    .from("artworks")
    .select("*")
    .order("sort_order", { ascending: true });
  if (!data?.length) return staticArtworks;
  return data.map(rowToArtwork);
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | null> {
  if (!isSupabaseConfigured()) return staticGetArtwork(slug) ?? null;
  const sb = await createClient();
  const { data } = await sb
    .from("artworks")
    .select("*")
    .eq("slug", slug)
    .single();
  if (!data) return staticGetArtwork(slug) ?? null;
  return rowToArtwork(data as ArtworkRow);
}

export async function getRelatedArtworks(
  slug: string,
  count = 4
): Promise<Artwork[]> {
  if (!isSupabaseConfigured()) return staticGetRelated(slug, count);
  const sb = await createClient();
  const { data: current } = await sb
    .from("artworks")
    .select("category")
    .eq("slug", slug)
    .single();

  const category = (current as { category?: string } | null)?.category;

  let sameCat: Artwork[] = [];
  if (category) {
    const { data } = await sb
      .from("artworks")
      .select("*")
      .eq("category", category)
      .neq("slug", slug)
      .order("sort_order")
      .limit(count);
    sameCat = ((data ?? []) as ArtworkRow[]).map(rowToArtwork);
  }

  if (sameCat.length >= count) return sameCat.slice(0, count);

  const needed = count - sameCat.length;
  const { data: others } = await sb
    .from("artworks")
    .select("*")
    .neq("slug", slug)
    .neq("category", category ?? "")
    .order("sort_order")
    .limit(needed);

  return [...sameCat, ...((others ?? []) as ArtworkRow[]).map(rowToArtwork)];
}

export function filterByCategory(artworks: Artwork[], category: Category) {
  return artworks.filter((a) => a.category === category);
}
