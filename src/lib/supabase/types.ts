export type Category = "Painting" | "Calligraphy" | "Digital" | "Sketch";

export type ArtworkRow = {
  id: string;
  slug: string;
  title: string;
  category: Category;
  note: string;
  medium: string;
  size: string;
  year: string;
  description: string;
  quote: string | null;
  available: boolean;
  featured: boolean;
  is_print: boolean;
  video: string | null;
  images: string[];
  socials: Record<string, string>;
  accent_color: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export const CATEGORIES: Category[] = [
  "Painting",
  "Calligraphy",
  "Digital",
  "Sketch",
];
