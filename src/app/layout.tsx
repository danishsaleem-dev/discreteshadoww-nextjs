import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Amiri } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/Grain";

const display = Cormorant_Garamond({
  variable: "--font-display",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const sans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: true,
});

const arabic = Amiri({
  variable: "--font-arabic",
  weight: ["400", "700"],
  subsets: ["arabic"],
  display: "swap",
  preload: false,
});

const BASE_URL = "https://discreteshadoww.com";

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Discrete Shadow | Custom Art Commissions — Paintings, Calligraphy & Digital Art",
    template: "%s | Discrete Shadow",
  },
  description:
    "Commission original paintings, Arabic calligraphy, digital portraits and custom artwork from Discrete Shadow. Handcrafted, one-of-a-kind pieces shipped worldwide. View the gallery and request your bespoke artwork today.",
  keywords: [
    "custom art commission",
    "Arabic calligraphy art",
    "custom portrait painting",
    "Islamic calligraphy",
    "digital art commission",
    "acrylic painting commission",
    "original artwork for sale",
    "calligraphy painting",
    "custom artwork Canada",
    "portrait artist",
    "bespoke artwork",
    "Discrete Shadow",
    "discreteshadoww",
  ],
  authors: [{ name: "Danish Saleem", url: BASE_URL }],
  creator: "Danish Saleem",
  publisher: "Discrete Shadow",
  category: "Art",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Discrete Shadow",
    title: "Discrete Shadow | Custom Art Commissions — Paintings, Calligraphy & Digital Art",
    description:
      "Commission original paintings, Arabic calligraphy, digital portraits and custom artwork. Handcrafted one-of-a-kind pieces shipped worldwide.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Discrete Shadow — Custom Art Commissions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Discrete Shadow | Custom Art Commissions",
    description:
      "Commission original paintings, Arabic calligraphy, digital portraits and custom artwork.",
    creator: "@discreteshadoww",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/ds-logo-300.webp", sizes: "192x192", type: "image/webp" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
  alternates: {
    canonical: BASE_URL,
  },
  manifest: "/site.webmanifest",
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
