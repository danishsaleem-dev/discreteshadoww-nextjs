import type { Metadata } from "next";
import PageShell from "@/components/PageShell";
import LegalLayout from "@/components/LegalLayout";

const BASE = "https://discreteshadoww.com";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that apply when you use the Discrete Shadow website and commission artwork.",
  alternates: { canonical: `${BASE}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <PageShell>
      <LegalLayout
        title="Terms of Service"
        lastUpdated="June 2026"
        intro="These terms apply to your use of the Discrete Shadow website and to any artwork or commission you order. By using this site or commissioning a piece, you agree to them."
        sections={[
          {
            heading: "Artwork & intellectual property",
            paragraphs: [
              "All images, artwork and content on this website are the original work of the artist and are protected by copyright. You may not reproduce, resell or use any artwork for commercial purposes without written permission.",
              "Purchasing an original or print grants you ownership of that physical piece, but copyright and reproduction rights remain with the artist.",
            ],
          },
          {
            heading: "Commissions",
            paragraphs: [
              "Each commission begins with a conversation to agree on the subject, medium, size, price and timeline. A deposit may be required before work begins.",
              "Reasonable revisions are included as agreed at the start. Significant changes to the brief after work has begun may affect the price and timeline.",
              "Because commissioned pieces are made specifically for you, deposits for custom work are generally non-refundable once work has started.",
            ],
          },
          {
            heading: "Pricing & payment",
            paragraphs: [
              "Prices are quoted individually and confirmed before work begins. Payment details are arranged directly with the artist. Shipping costs, where applicable, are additional unless stated otherwise.",
            ],
          },
          {
            heading: "Shipping & delivery",
            paragraphs: [
              "Original artwork is packaged with care and shipped to the address you provide. Delivery times vary by destination. Once a parcel is handed to the carrier, delivery timelines are outside our control.",
            ],
          },
          {
            heading: "Website use",
            paragraphs: [
              "This website is provided on an “as is” basis. We aim to keep information accurate and the site available, but we do not guarantee it will be error-free or uninterrupted.",
            ],
          },
          {
            heading: "Governing law",
            paragraphs: [
              "These terms are governed by the laws of the Province of Ontario, Canada.",
            ],
          },
          {
            heading: "Contact",
            paragraphs: [
              "Questions about these terms? Email info@discreteshadoww.com.",
            ],
          },
        ]}
      />
    </PageShell>
  );
}
