import { parseArtworks } from "./lib/parse-wp";
import { extract } from "./lib/extract";

const arts = parseArtworks("scripts/wp-export.xml");
console.log(`Parsed ${arts.length} artworks`);

const byCat: Record<string, number> = {};
for (const a of arts) byCat[a.category] = (byCat[a.category] || 0) + 1;
console.log("Categories:", byCat);
console.log(
  `Video: ${arts.filter((a) => a.video).length} | Gallery: ${arts.filter((a) => a.galleryUrls.length).length} | Missing cover: ${arts.filter((a) => !a.coverUrl).length}\n`
);

for (const a of arts.slice(0, 6)) {
  const ex = extract(a.title, a.contentHtml);
  console.log("─".repeat(60));
  console.log("title :", a.title, "|", a.category, "|", a.year);
  console.log("imgs  :", [a.coverUrl, ...a.galleryUrls].filter(Boolean).length, "| video:", a.video || "—");
  console.log("quote :", ex.quote || "—");
  console.log("medium:", ex.medium || "—");
  console.log("size  :", ex.size || "—");
  console.log("desc  :", ex.description.slice(0, 160).replace(/\n/g, " "));
}
