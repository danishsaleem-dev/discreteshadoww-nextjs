import { readFileSync } from "node:fs";
import { XMLParser } from "fast-xml-parser";

export type WpArtwork = {
  slug: string;
  title: string;
  category: string;
  contentHtml: string;
  coverUrl: string | null;
  galleryUrls: string[];
  video: string | null;
  featured: boolean;
  isPrint: boolean;
  socials: Record<string, string>;
  accentColor: string | null;
  year: string;
};

const asArray = <T>(v: T | T[] | undefined): T[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

const CATEGORY_MAP: Record<string, string> = {
  "original-paintings-commissions": "Painting",
  "calligraphy-art-commissions": "Calligraphy",
  "digital-art": "Digital",
  "sketches": "Sketch",
};

function mapCategory(nicename: string, label: string): string {
  if (CATEGORY_MAP[nicename]) return CATEGORY_MAP[nicename];
  const l = (label || "").toLowerCase();
  if (l.includes("callig")) return "Calligraphy";
  if (l.includes("digital")) return "Digital";
  if (l.includes("sketch")) return "Sketch";
  return "Painting";
}

function youTubeFromEmbed(url?: string): string | null {
  if (!url) return null;
  const m = url.match(/(?:embed\/|v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : url || null;
}

export function parseArtworks(xmlPath: string): WpArtwork[] {
  const xml = readFileSync(xmlPath, "utf8");
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    cdataPropName: "__cdata",
    trimValues: true,
  });
  const doc = parser.parse(xml);
  const items = asArray(doc?.rss?.channel?.item);

  const text = (v: unknown): string => {
    if (v == null) return "";
    if (typeof v === "object") {
      const o = v as Record<string, unknown>;
      return String(o.__cdata ?? o["#text"] ?? "");
    }
    return String(v);
  };

  // 1) attachment id -> url
  const attachments = new Map<string, string>();
  for (const it of items) {
    if (text(it["wp:post_type"]) === "attachment") {
      const id = text(it["wp:post_id"]);
      const url = text(it["wp:attachment_url"]);
      if (id && url) attachments.set(id, url);
    }
  }

  const out: WpArtwork[] = [];
  for (const it of items) {
    if (text(it["wp:post_type"]) !== "artwork") continue;
    if (text(it["wp:status"]) !== "publish") continue;

    const meta = new Map<string, string>();
    for (const m of asArray(it["wp:postmeta"])) {
      meta.set(text(m["wp:meta_key"]), text(m["wp:meta_value"]));
    }

    const cats = asArray(it.category).filter(
      (c) => c?.["@_domain"] === "art_category"
    );
    const cat = cats[0];
    const category = mapCategory(
      cat?.["@_nicename"] ?? "",
      text(cat)
    );

    const coverId = meta.get("_thumbnail_id");
    const coverUrl = coverId ? attachments.get(coverId) ?? null : null;

    const galleryIds = (meta.get("gallery") ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    const galleryUrls = galleryIds
      .map((id) => attachments.get(id))
      .filter((u): u is string => !!u && u !== coverUrl);

    const socials: Record<string, string> = {};
    for (const k of ["instagram", "facebook", "pinterest", "behance", "tiktok"]) {
      const v = meta.get(`socials_links_${k}`) || meta.get(k);
      if (v) socials[k] = v;
    }

    out.push({
      slug: text(it["wp:post_name"]),
      title: text(it.title),
      category,
      contentHtml: text(it["content:encoded"]),
      coverUrl,
      galleryUrls,
      video: youTubeFromEmbed(meta.get("youtube_video")),
      featured: ["1", "true", "yes"].includes(
        (meta.get("is_featured") || "").toLowerCase()
      ),
      isPrint: ["1", "true", "yes"].includes(
        (meta.get("is_print") || "").toLowerCase()
      ),
      socials,
      accentColor: meta.get("color") || null,
      year: (text(it["wp:post_date"]) || "").slice(0, 4) || "",
    });
  }
  return out;
}
