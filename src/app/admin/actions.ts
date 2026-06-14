"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireUser() {
  const sb = await createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function saveArtwork(formData: FormData) {
  await requireUser();
  const admin = createAdminClient();

  const id = (formData.get("id") as string) || "";
  const title = ((formData.get("title") as string) || "").trim();
  let slug = ((formData.get("slug") as string) || "").trim();
  if (!slug) slug = slugify(title);

  // images: keep selected existing ones, then append newly uploaded files
  const keep = formData.getAll("keepImages").map(String).filter(Boolean);
  const files = formData
    .getAll("newImages")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const uploaded: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const ext = (f.name.split(".").pop() || "webp").toLowerCase();
    const path = `${slug}/up-${Date.now()}-${i}.${ext}`;
    const buf = Buffer.from(await f.arrayBuffer());
    const { error } = await admin.storage
      .from("artworks")
      .upload(path, buf, { contentType: f.type || "image/webp", upsert: true });
    if (!error) {
      uploaded.push(
        admin.storage.from("artworks").getPublicUrl(path).data.publicUrl
      );
    }
  }

  const row = {
    slug,
    title,
    category: formData.get("category") as string,
    medium: (formData.get("medium") as string) || "",
    size: (formData.get("size") as string) || "",
    year: (formData.get("year") as string) || "",
    quote: ((formData.get("quote") as string) || "").trim() || null,
    description: (formData.get("description") as string) || "",
    video: ((formData.get("video") as string) || "").trim() || null,
    available: formData.get("available") === "on",
    featured: formData.get("featured") === "on",
    is_print: formData.get("is_print") === "on",
    accent_color: ((formData.get("accent_color") as string) || "").trim() || null,
    sort_order: Number(formData.get("sort_order") || 0),
    images: [...keep, ...uploaded],
  };

  if (id) {
    await admin.from("artworks").update(row).eq("id", id);
  } else {
    await admin.from("artworks").insert(row);
  }

  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath(`/artwork/${slug}`);
  redirect("/admin");
}

export async function deleteArtwork(formData: FormData) {
  await requireUser();
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  await admin.from("artworks").delete().eq("id", id);
  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function signOut() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
