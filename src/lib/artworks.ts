export type Category = "Painting" | "Calligraphy" | "Digital" | "Sketch";

export type Artwork = {
  slug: string;
  title: string;
  src: string;
  category: Category;
  note?: string;
  medium: string;
  size: string;
  year: string;
  description: string;
  quote?: string;
  available: boolean;
  /** Additional views beyond `src`. Local paths (/artwork/…) or full URLs. */
  images?: string[];
  /** A YouTube link or 11-char video id. Showcased on the artwork page. */
  video?: string;
};

/** Full image set for an artwork: the cover first, then any extra views. */
export const getImages = (a: Artwork): string[] => [a.src, ...(a.images ?? [])];

/** Extract an 11-char YouTube id from a full URL or return the raw value. */
export const youTubeId = (input?: string): string | null => {
  if (!input) return null;
  const m = input.match(
    /(?:youtu\.be\/|v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  if (m) return m[1];
  return /^[A-Za-z0-9_-]{11}$/.test(input) ? input : input;
};

export const artworks: Artwork[] = [
  {
    slug: "the-super-moon",
    title: "The Super Moon",
    src: "/artwork/The-Super-Moon.webp",
    category: "Painting",
    note: "Acrylic on canvas",
    medium: "Acrylic on canvas paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description:
      "A luminous full moon rises over a silhouetted pine forest — light learning to live inside the dark.",
    quote: "Even the night needs something to believe in.",
    available: true,
  },
  {
    slug: "serendipity",
    title: "Serendipity",
    src: "/artwork/Serendipity-Cover-Painting.webp",
    category: "Painting",
    note: "Cover painting",
    medium: "Acrylic on canvas",
    size: "A3 · 29.7 × 42 cm",
    year: "2024",
    description:
      "A lone figure, a single balloon, an open sea — the quiet beauty of happy accidents.",
    quote: "Some of the best things arrive unplanned.",
    available: true,
  },
  {
    slug: "together-forever",
    title: "Together Forever",
    src: "/artwork/Together-Forever.webp",
    category: "Painting",
    note: "Commissioned portrait",
    medium: "Acrylic on canvas",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description:
      "Two souls beneath a melting sunset, watching the same horizon. A commission about belonging.",
    quote: "Stay — and watch the sky burn slow with me.",
    available: true,
  },
  {
    slug: "the-glowing-beach",
    title: "The Glowing Beach",
    src: "/artwork/The-Glowing-Beach.webp",
    category: "Painting",
    note: "Luminous seascape",
    medium: "Acrylic on canvas paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description:
      "Warm tide-light spilling across the sand at golden hour — a seascape that hums.",
    available: true,
  },
  {
    slug: "the-dragon-flame",
    title: "The Dragon Flame",
    src: "/artwork/The-Dragon-Flame.webp",
    category: "Painting",
    note: "Mixed media",
    medium: "Acrylic on canvas paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description:
      "A blaze given form — heat, motion and resolve captured mid-roar. Inspired by Rengoku's unbreakable spirit.",
    quote: "Set your heart ablaze. Go beyond your limits. — Rengoku",
    available: true,
    images: [
      "/artwork/The-Dragon-Flame-2.webp",
      "/artwork/The-Dragon-Flame-3.webp",
      "/artwork/The-Dragon-Flame-4.webp",
    ],
    // TODO: replace with the real YouTube link for this piece
    video: "https://youtu.be/M7lc1UVf-VE",
  },
  {
    slug: "under-the-moon",
    title: "Under the Moon",
    src: "/artwork/Under-the-Moon.webp",
    category: "Painting",
    note: "Nightscape",
    medium: "Acrylic on canvas",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description:
      "A dreamlit nightscape washed in violet — silence you can almost hear.",
    available: true,
  },
  {
    slug: "glowing-sunset",
    title: "Glowing Sunset",
    src: "/artwork/Glowing-Sunset.webp",
    category: "Painting",
    note: "Warm horizons",
    medium: "Acrylic on canvas paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description: "The last warm breath of the day, melting into the water.",
    available: true,
  },

  {
    slug: "hayat",
    title: "Hayāt — حیات",
    src: "/artwork/Hayat.webp",
    category: "Calligraphy",
    note: "“Life”",
    medium: "Acrylic & gold on canvas",
    size: "Square · 40 × 40 cm",
    year: "2024",
    description:
      "“Life”, written in flowing script against living green — meaning poured into every stroke.",
    quote: "حیات — to be alive is to keep beginning.",
    available: true,
  },
  {
    slug: "al-qadr",
    title: "Al-Qadr — القدر",
    src: "/artwork/Al-Qadr.webp",
    category: "Calligraphy",
    note: "“Destiny”",
    medium: "Acrylic & gold on canvas",
    size: "Square · 40 × 40 cm",
    year: "2024",
    description:
      "“Destiny”, set between cool blue and burning ember — the pull of what is written.",
    quote: "القدر — what is meant for you will find its way.",
    available: true,
  },
  {
    slug: "heavy-textured-calligraphy",
    title: "Heavy Textured",
    src: "/artwork/Heavy-Textured-Calligraphy.webp",
    category: "Calligraphy",
    note: "Impasto script",
    medium: "Impasto acrylic on canvas",
    size: "A3 · 29.7 × 42 cm",
    year: "2024",
    description:
      "Script raised off the surface in thick relief — calligraphy you could read with your fingertips.",
    available: true,
  },
  {
    slug: "ghilaf-e-kaaba",
    title: "Ghilāf-e-Kaaba",
    src: "/artwork/Ghilf-e-Kaaba.webp",
    category: "Calligraphy",
    note: "Gold on black",
    medium: "Gold leaf & acrylic on canvas",
    size: "A3 · 29.7 × 42 cm",
    year: "2024",
    description:
      "Gold thread on deepest black, echoing the cloth of the Kaaba — devotion rendered in light.",
    available: true,
  },

  {
    slug: "portrait-glow",
    title: "Portrait Glow",
    src: "/artwork/Portrait-Glow.webp",
    category: "Digital",
    note: "Glow study",
    medium: "Digital · Procreate",
    size: "Digital · print to order",
    year: "2024",
    description:
      "A study in light and skin — soft glow bleeding across a quiet face.",
    available: true,
  },
  {
    slug: "the-emeris-stare",
    title: "The Emeris Stare",
    src: "/artwork/The-Emerisss-Stare.webp",
    category: "Digital",
    note: "Character art",
    medium: "Digital · Procreate",
    size: "Digital · print to order",
    year: "2024",
    description: "A character caught mid-thought, eyes that follow you across the room.",
    available: true,
  },
  {
    slug: "ocean-of-tears",
    title: "Ocean of Tears",
    src: "/artwork/Ocean-of-Tears-Glowed.webp",
    category: "Digital",
    note: "Anime-inspired",
    medium: "Digital · Procreate",
    size: "Digital · print to order",
    year: "2024",
    description: "Anime-lit melancholy — a glow that aches. Grief made luminous.",
    available: true,
  },

  {
    slug: "suga",
    title: "Suga",
    src: "/artwork/Suga-Portrait-Color-Sketch.webp",
    category: "Sketch",
    note: "Colour pencil",
    medium: "Colour pencil on paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description: "A colour-pencil portrait built up in patient, layered strokes.",
    available: true,
  },
  {
    slug: "discrete-shadow",
    title: "Discrete Shadow",
    src: "/artwork/Discrete-Shadow.webp",
    category: "Sketch",
    note: "Graphite",
    medium: "Graphite on paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description: "The piece that named the studio — graphite worked into living shadow.",
    quote: "Found in the space between light and dark.",
    available: true,
  },
  {
    slug: "assassin",
    title: "Assassin",
    src: "/artwork/Assassin-Sketch.webp",
    category: "Sketch",
    note: "Ink sketch",
    medium: "Ink on paper",
    size: "A4 · 21 × 29.7 cm",
    year: "2024",
    description: "Sharp ink linework — tension held in stillness.",
    available: true,
  },
];

export const featured = artworks.filter((a) =>
  [
    "the-super-moon",
    "the-dragon-flame",
    "together-forever",
    "the-glowing-beach",
    "under-the-moon",
    "serendipity",
  ].includes(a.slug)
);

export const byCategory = (c: Category) => artworks.filter((a) => a.category === c);

export const getArtwork = (slug: string) =>
  artworks.find((a) => a.slug === slug);

export const getRelated = (slug: string, count = 4): Artwork[] => {
  const current = getArtwork(slug);
  if (!current) return artworks.slice(0, count);
  const sameCat = artworks.filter(
    (a) => a.slug !== slug && a.category === current.category
  );
  const others = artworks.filter(
    (a) => a.slug !== slug && a.category !== current.category
  );
  return [...sameCat, ...others].slice(0, count);
};

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
  whatsapp: "13434179482",
};
