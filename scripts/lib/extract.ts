// Best-effort extraction of quote / medium / size / description from the
// free-text WordPress post body. Anything imperfect is editable in /admin.

export function clean(html: string): string {
  return html
    .replace(/<\s*(br|\/p|\/div|\/li|\/h[1-6])[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#0?39;|&apos;|&#8217;/gi, "'")
    .replace(/&quot;|&#8220;|&#8221;/gi, '"')
    .replace(/[ \t]+/g, " ")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean)
    .join("\n")
    .trim();
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function extract(title: string, html: string) {
  const text = clean(html);

  const quoteMatch = text.match(
    /^["“]([^"”]{3,200})["”]\s*(?:[~–-]\s*([A-Za-z][^"”\n]{1,38}))?/
  );
  const quote = quoteMatch
    ? quoteMatch[1].trim() +
      (quoteMatch[2] ? ` — ${quoteMatch[2].trim()}` : "")
    : null;

  const mediumMatch = text.match(
    /\b(acrylics?|oil|watercolou?r|gouache|digital|graphite|charcoal|ink|colou?r\s*pencil|pencil|mixed\s*media)\b[^.\n]*?(?=\s*(?:size|dimensions)\b|[.\n]|$)/i
  );
  const medium = mediumMatch ? mediumMatch[0].trim().replace(/\s+/g, " ") : "";

  const unit = `(?:\\s*(?:(?:inch(?:es)?|in|cm|mm|ft)\\b|"|'|″|′))?`;
  const dim = `[0-9][0-9.\\s'×x*-]*${unit}`;
  const sizeMatch = text.match(
    new RegExp(
      `(?:size|dimensions)\\s*[:：]?\\s*(A\\d|${dim}(?:\\s*[x×*]\\s*${dim})?)`,
      "i"
    )
  );
  const size = sizeMatch
    ? sizeMatch[1].trim().replace(/\s+/g, " ").replace(/[\s,]+$/, "")
    : "";

  let desc = text;
  if (quoteMatch) desc = desc.replace(quoteMatch[0], " ");
  desc = desc.replace(new RegExp(`["“]${escapeRe(title)}["”]`, "i"), " ");
  if (mediumMatch) desc = desc.replace(mediumMatch[0], " ");
  desc = desc
    .replace(/(?:size|dimensions)\s*[:：]?\s*[^.\n]*/i, " ")
    .replace(/^[\s~–\-:]+/, "")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
  // if nothing but quote/specs remained, leave description empty (cleaner than
  // duplicating the quote) — the admin can add a story later.
  if (desc.length < 12) desc = "";

  return { quote, medium, size, description: desc };
}
