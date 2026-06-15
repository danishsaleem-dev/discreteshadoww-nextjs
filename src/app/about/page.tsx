import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import AboutView from "@/components/AboutView";
import { ArtistJsonLd, BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE = "https://discreteshadoww.com";

export const metadata: Metadata = {
  title: "About the Artist",
  description:
    "Meet Danish, the artist behind Discrete Shadow. A practice spanning original paintings, Arabic calligraphy, digital art and graphite portraits since 2019.",
  alternates: { canonical: `${BASE}/about` },
  openGraph: {
    title: "About the Artist | Discrete Shadow",
    description:
      "Meet Danish, the artist behind Discrete Shadow — paintings, calligraphy, digital art and sketches.",
    url: `${BASE}/about`,
    type: "profile",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <PageShell>
      <ArtistJsonLd />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE },
          { name: "About", url: `${BASE}/about` },
        ]}
      />
      <AboutView />
    </PageShell>
  );
}
