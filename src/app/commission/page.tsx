import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import CommissionView from "@/components/CommissionView";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE = "https://discreteshadoww.com";

export const metadata: Metadata = {
  title: "Custom Art Commission",
  description:
    "Commission a custom artwork from Discrete Shadow — paintings, Arabic calligraphy, digital portraits or sketches. Tell us your idea and get a personal reply.",
  alternates: { canonical: `${BASE}/commission` },
  openGraph: {
    title: "Custom Art Commission | Discrete Shadow",
    description:
      "Commission a one-of-a-kind painting, calligraphy, digital portrait or sketch.",
    url: `${BASE}/commission`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function CommissionPage() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Custom Art Commissions",
    serviceType: "Custom artwork commission",
    provider: {
      "@type": "Person",
      name: "Danish Saleem",
      url: BASE,
    },
    areaServed: "Worldwide",
    description:
      "Commission custom paintings, Arabic calligraphy, digital portraits and graphite sketches.",
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE },
          { name: "Commission", url: `${BASE}/commission` },
        ]}
      />
      <CommissionView />
    </PageShell>
  );
}
