/**
 * Patches artworks that had gallery images missing from the WordPress XML export.
 * For each missing attachment ID, fetches the URL from the WP REST API, downloads
 * the image, uploads to Supabase Storage, and appends to the artwork's images array.
 *
 * Run:  npm run patch:gallery
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✗ Missing Supabase env vars in .env.local");
  process.exit(1);
}

const sb = createClient(url, key, { auth: { persistSession: false } });
const BUCKET = "artworks";
const WP_BASE = "https://pink-lyrebird-874938.hostingersite.com";

// Artworks with gallery attachment IDs that were missing from the XML export
const MISSING: Array<{ slug: string; attachmentIds: number[] }> = [
  { slug: "the-dragon-flame",           attachmentIds: [371, 379, 383] },
  { slug: "ghilf-e-kaaba",              attachmentIds: [545, 546, 547, 549] },
  { slug: "heavy-textured-calligraphy", attachmentIds: [1110, 1111, 1112, 1113, 1114, 1115, 1116] },
];

async function wpMediaUrl(id: number): Promise<string | null> {
  try {
    const res = await fetch(`${WP_BASE}/wp-json/wp/v2/media/${id}`, {
      signal: AbortSignal.timeout(20000),
    });
    if (!res.ok) {
      console.log(`  ! WP API ${res.status} for attachment ${id}`);
      return null;
    }
    const json = await res.json() as { source_url?: string; guid?: { rendered?: string } };
    return json.source_url ?? json.guid?.rendered ?? null;
  } catch (e) {
    console.log(`  ! WP API failed for attachment ${id}: ${(e as Error).message}`);
    return null;
  }
}

function contentType(ext: string) {
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  return "image/webp";
}

async function uploadImage(slug: string, src: string, idx: number): Promise<string | null> {
  try {
    const res = await fetch(src, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) {
      console.log(`  ! download ${res.status}: ${src}`);
      return null;
    }
    const bytes = Buffer.from(await res.arrayBuffer());
    const m = src.toLowerCase().match(/\.(webp|png|jpe?g)(?:\?|$)/);
    const ext = m ? m[1].replace("jpeg", "jpg") : "webp";
    const objectPath = `${slug}/${idx}.${ext}`;
    const { error } = await sb.storage.from(BUCKET).upload(objectPath, bytes, {
      contentType: contentType(ext),
      upsert: true,
    });
    if (error) throw error;
    return sb.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
  } catch (e) {
    console.log(`  ! upload failed: ${(e as Error).message}`);
    return null;
  }
}

async function main() {
  for (const { slug, attachmentIds } of MISSING) {
    console.log(`\n── ${slug}`);

    // Get current images from Supabase
    const { data: row, error } = await sb
      .from("artworks")
      .select("id, images")
      .eq("slug", slug)
      .single();

    if (error || !row) {
      console.log(`  ✗ Not found in Supabase: ${error?.message}`);
      continue;
    }

    const existingImages: string[] = row.images ?? [];
    const startIdx = existingImages.length; // next upload index
    console.log(`  Current images: ${existingImages.length}`);

    // Resolve each attachment ID → WordPress URL → upload → collect Supabase URL
    const newImages: string[] = [];
    for (let i = 0; i < attachmentIds.length; i++) {
      const id = attachmentIds[i];
      process.stdout.write(`  → attachment ${id} `);

      const wpUrl = await wpMediaUrl(id);
      if (!wpUrl) { console.log("(skipped — no URL)"); continue; }

      const supaUrl = await uploadImage(slug, wpUrl, startIdx + newImages.length);
      if (!supaUrl) { console.log("(skipped — upload failed)"); continue; }

      newImages.push(supaUrl);
      console.log(`✓  ${wpUrl.split("/").pop()}`);
    }

    if (newImages.length === 0) {
      console.log("  No new images to add.");
      continue;
    }

    // Append to existing images array
    const updatedImages = [...existingImages, ...newImages];
    const { error: updErr } = await sb
      .from("artworks")
      .update({ images: updatedImages })
      .eq("id", row.id);

    if (updErr) {
      console.log(`  ✗ Supabase update failed: ${updErr.message}`);
    } else {
      console.log(`  ✓ Updated: ${existingImages.length} → ${updatedImages.length} images`);
    }
  }

  console.log("\n✓ Patch complete.");
}

main().catch((e) => {
  console.error("\n✗ Patch failed:", e);
  process.exit(1);
});
