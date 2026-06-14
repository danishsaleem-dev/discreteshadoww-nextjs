import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ArtworkRow } from "@/lib/supabase/types";
import ArtworkForm from "@/components/admin/ArtworkForm";

export const dynamic = "force-dynamic";

export default async function EditArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const sb = await createClient();
  const { data } = await sb.from("artworks").select("*").eq("id", id).single();
  if (!data) notFound();
  return <ArtworkForm artwork={data as ArtworkRow} />;
}
