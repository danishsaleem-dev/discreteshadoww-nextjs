import type { Category } from "@/lib/artworks";

export type CategoryConfig = {
  slug: string;
  category: Category;
  eyebrow: string;
  title: string;
  /** Italicised word inside the title heading. */
  accent: string;
  blurb: string;
  /** Oversized faint background word — Arabic for calligraphy, Latin otherwise. */
  watermark: string;
  watermarkRtl?: boolean;
  metaTitle: string;
  metaDescription: string;
};

export const CATEGORY_PAGES: CategoryConfig[] = [
  {
    slug: "paintings",
    category: "Painting",
    eyebrow: "Original Paintings",
    title: "Paintings",
    accent: "in motion",
    blurb:
      "Acrylic on canvas — luminous skies, glowing seascapes and bold figures. Each original is hand-finished and one of a kind, with commissions welcome.",
    watermark: "Paint",
    metaTitle: "Original Paintings — Acrylic Art & Commissions",
    metaDescription:
      "Browse original acrylic paintings by Discrete Shadow — seascapes, nightscapes and bold figurative work. Commission a one-of-a-kind painting today.",
  },
  {
    slug: "calligraphy",
    category: "Calligraphy",
    eyebrow: "Arabic Calligraphy",
    title: "Calligraphy",
    accent: "every stroke",
    blurb:
      "Gold, ink and texture composed into sacred geometry. Modern Arabic calligraphy that writes meaning into every line — hand-lettered and unrepeatable.",
    watermark: "خط",
    watermarkRtl: true,
    metaTitle: "Arabic Calligraphy Art & Islamic Calligraphy Paintings",
    metaDescription:
      "Modern Arabic and Islamic calligraphy paintings by Discrete Shadow — gold leaf, texture and meaning in every stroke. Commission bespoke calligraphy art.",
  },
  {
    slug: "digital-art",
    category: "Digital",
    eyebrow: "Digital Art",
    title: "Digital Art",
    accent: "& glow",
    blurb:
      "Luminous digital portraits and character art built in patient layers of light. Available as museum-grade prints, or commissioned to your vision.",
    watermark: "Pixel",
    metaTitle: "Digital Art & Portrait Commissions",
    metaDescription:
      "Luminous digital portraits and character art by Discrete Shadow. Available as prints or custom digital art commissions.",
  },
  {
    slug: "sketches",
    category: "Sketch",
    eyebrow: "Sketches & Studies",
    title: "Sketches",
    accent: "in graphite",
    blurb:
      "Where every piece begins — graphite, ink and colour pencil worked into living shadow. Intimate studies and detailed portrait sketches.",
    watermark: "Sketch",
    metaTitle: "Pencil Sketches & Graphite Portrait Studies",
    metaDescription:
      "Hand-drawn graphite and colour-pencil sketches by Discrete Shadow. Detailed portrait studies and commissioned sketch work.",
  },
];

export const getCategoryConfig = (slug: string) =>
  CATEGORY_PAGES.find((c) => c.slug === slug);
