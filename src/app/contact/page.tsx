import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import ContactView from "@/components/ContactView";
import { BreadcrumbJsonLd } from "@/components/JsonLd";

const BASE = "https://discreteshadoww.com";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Discrete Shadow. Email, phone or WhatsApp to ask about an artwork, a print or a custom commission.",
  alternates: { canonical: `${BASE}/contact` },
  openGraph: {
    title: "Contact | Discrete Shadow",
    description:
      "Get in touch about an artwork, print or custom commission.",
    url: `${BASE}/contact`,
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function ContactPage() {
  return (
    <PageShell>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", url: BASE },
          { name: "Contact", url: `${BASE}/contact` },
        ]}
      />
      <ContactView />
    </PageShell>
  );
}
