/**
 * Migrate artworks from a WordPress WXR export into Supabase.
 *
 *   1. Ensures the `artworks` storage bucket exists
 *   2. Parses scripts/wp-export.xml
 *   3. Extracts quote / medium / size / description from the post body
 *   4. Downloads each image from WordPress and uploads it to Storage
 *   5. Upserts a row per artwork (falls back to core columns if the
 *      richer columns haven't been added to the table yet)
 *
 * Run:  npm run migrate:wp
 */
import { config } from "dotenv";
import { createClient } from "@supabase/supabase-js";
import { parseArtworks, type WpArtwork } from "./lib/parse-wp";
import { extract } from "./lib/extract";

config({ path: ".env.local" });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("✗ Missing Supabase env vars in .env.local");
  process.exit(1);
}
const sb = createClient(url, key, { auth: { persistSession: false } });
const BUCKET = "artworks";

// ---- image upload --------------------------------------------------------
function contentType(name: string) {
  if (name.endsWith(".png")) return "image/png";
  if (/\.jpe?g$/.test(name)) return "image/jpeg";
  return "image/webp";
}

async function uploadFromUrl(
  slug: string,
  src: string,
  idx: number
): Promise<string | null> {
  try {
    const res = await fetch(src);
    if (!res.ok) {
      console.log(`    ! skip image ${res.status}: ${src}`);
      return null;
    }
    const bytes = Buffer.from(await res.arrayBuffer());
    // Storage keys must be ASCII — name objects by index to avoid the
    // "Invalid key" errors from Arabic/Unicode WordPress filenames.
    const m = src.toLowerCase().match(/\.(webp|png|jpe?g)(?:\?|$)/);
    const ext = m ? m[1].replace("jpeg", "jpg") : "webp";
    const objectPath = `${slug}/${idx}.${ext}`;
    const { error } = await sb.storage
      .from(BUCKET)
      .upload(objectPath, bytes, {
        contentType: contentType(`x.${ext}`),
        upsert: true,
      });
    if (error) throw error;
    return sb.storage.from(BUCKET).getPublicUrl(objectPath).data.publicUrl;
  } catch (e) {
    console.log(`    ! image failed: ${src} (${(e as Error).message})`);
    return null;
  }
}

// ---- main ----------------------------------------------------------------
async function ensureBucket() {
  const { data } = await sb.storage.getBucket(BUCKET);
  if (!data) {
    const { error } = await sb.storage.createBucket(BUCKET, { public: true });
    if (error && !/already exists/i.test(error.message)) throw error;
    console.log(`✓ created public bucket "${BUCKET}"`);
  } else {
    console.log(`✓ bucket "${BUCKET}" ready`);
  }
}

async function insertRow(art: WpArtwork, images: string[], i: number) {
  const ex = extract(art.title, art.contentHtml);
  const full: Record<string, unknown> = {
    slug: art.slug,
    title: art.title,
    category: art.category,
    note: ex.medium.split(" ").slice(0, 4).join(" "),
    medium: ex.medium,
    size: ex.size,
    year: art.year,
    description: ex.description,
    quote: ex.quote,
    available: true,
    video: art.video,
    images,
    sort_order: i,
    featured: art.featured,
    is_print: art.isPrint,
    socials: art.socials,
    accent_color: art.accentColor,
  };
  let { error } = await sb.from("artworks").upsert(full, { onConflict: "slug" });
  if (error && /column|schema cache|PGRST204|42703/i.test(error.message + error.code)) {
    // table is on the original schema — retry without the richer columns
    for (const k of ["featured", "is_print", "socials", "accent_color"]) delete full[k];
    ({ error } = await sb.from("artworks").upsert(full, { onConflict: "slug" }));
  }
  if (error) throw error;
}

async function main() {
  await ensureBucket();
  const arts = parseArtworks("scripts/wp-export.xml");
  console.log(`→ Migrating ${arts.length} artworks\n`);

  for (let i = 0; i < arts.length; i++) {
    const art = arts[i];
    process.stdout.write(`• ${art.title} `);
    const sources = [art.coverUrl, ...art.galleryUrls].filter(
      (u): u is string => !!u
    );
    const images: string[] = [];
    for (let j = 0; j < sources.length; j++) {
      const u = await uploadFromUrl(art.slug, sources[j], j);
      if (u) images.push(u);
    }
    await insertRow(art, images, i);
    console.log(`✓ ${images.length} img${images.length === 1 ? "" : "s"}`);
  }
  console.log("\n✓ Migration complete.");
}

main().catch((e) => {
  console.error("\n✗ Migration failed:", e);
  process.exit(1);
});
