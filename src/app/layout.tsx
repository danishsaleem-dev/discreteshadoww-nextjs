import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Amiri } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";

const display = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const arabic = Amiri({
  variable: "--font-arabic",
  weight: ["400", "700"],
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "Discrete Shadow — Custom Artwork, Portraits & Calligraphy",
  description:
    "Original paintings, Arabic calligraphy, digital art and hand-drawn portraits. Commission bespoke artwork that turns moments into masterpieces.",
  openGraph: {
    title: "Discrete Shadow — Custom Artwork & Calligraphy",
    description:
      "Original paintings, Arabic calligraphy, digital art and hand-drawn portraits.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
    >
      <body className="bg-ink text-paper antialiased selection:bg-gold/30 selection:text-paper">
        <Grain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
