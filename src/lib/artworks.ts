export type Artwork = {
  title: string;
  src: string;
  category: "Painting" | "Calligraphy" | "Digital" | "Sketch";
  note?: string;
};

export const artworks: Artwork[] = [
  { title: "The Super Moon", src: "/artwork/The-Super-Moon.webp", category: "Painting", note: "Acrylic on canvas" },
  { title: "Serendipity", src: "/artwork/Serendipity-Cover-Painting.webp", category: "Painting", note: "Cover painting" },
  { title: "Together Forever", src: "/artwork/Together-Forever.webp", category: "Painting", note: "Commissioned portrait" },
  { title: "The Glowing Beach", src: "/artwork/The-Glowing-Beach.webp", category: "Painting", note: "Luminous seascape" },
  { title: "The Dragon Flame", src: "/artwork/The-Dragon-Flame.webp", category: "Painting", note: "Mixed media" },
  { title: "Under the Moon", src: "/artwork/Under-the-Moon.webp", category: "Painting", note: "Nightscape" },
  { title: "Glowing Sunset", src: "/artwork/Glowing-Sunset.webp", category: "Painting", note: "Warm horizons" },

  { title: "Hayāt — حیات", src: "/artwork/Hayat.webp", category: "Calligraphy", note: "“Life”" },
  { title: "Al-Qadr — القدر", src: "/artwork/Al-Qadr.webp", category: "Calligraphy", note: "“Destiny”" },
  { title: "Heavy Textured", src: "/artwork/Heavy-Textured-Calligraphy.webp", category: "Calligraphy", note: "Impasto script" },
  { title: "Ghilāf-e-Kaaba", src: "/artwork/Ghilf-e-Kaaba.webp", category: "Calligraphy", note: "Gold on black" },

  { title: "Portrait Glow", src: "/artwork/Portrait-Glow.webp", category: "Digital", note: "Glow study" },
  { title: "The Emeris Stare", src: "/artwork/The-Emerisss-Stare.webp", category: "Digital", note: "Character art" },
  { title: "Ocean of Tears", src: "/artwork/Ocean-of-Tears-Glowed.webp", category: "Digital", note: "Anime-inspired" },

  { title: "Suga", src: "/artwork/Suga-Portrait-Color-Sketch.webp", category: "Sketch", note: "Colour pencil" },
  { title: "Discrete Shadow", src: "/artwork/Discrete-Shadow.webp", category: "Sketch", note: "Graphite" },
  { title: "Assassin", src: "/artwork/Assassin-Sketch.webp", category: "Sketch", note: "Ink sketch" },
];

export const featured = artworks.filter((a) =>
  ["The Super Moon", "The Dragon Flame", "Together Forever", "The Glowing Beach", "Under the Moon", "Serendipity"].includes(a.title)
);

export const byCategory = (c: Artwork["category"]) => artworks.filter((a) => a.category === c);

export const socials = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
];

export const contact = {
  email: "info@discreteshadoww.com",
  phone: "(343) 417-9482",
};
