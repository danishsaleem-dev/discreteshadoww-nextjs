// JSON-LD structured data. Server-only — never imported in client components.

const BASE = "https://discreteshadoww.com";

export function ArtistJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Danish Saleem",
    alternateName: "Discrete Shadow",
    url: BASE,
    image: `${BASE}/ds-logo-1024.webp`,
    sameAs: [
      "https://www.instagram.com/discreteshadoww",
      "https://www.behance.net/discreteshadoww",
      "https://www.youtube.com/@discreteshadoww",
      "https://www.tiktok.com/@discreteshadoww",
      "https://uk.pinterest.com/discreteshadoww",
    ],
    jobTitle: "Artist",
    description:
      "Independent artist specialising in original paintings, Arabic calligraphy, digital art and custom portrait commissions.",
    knowsAbout: [
      "Acrylic Painting",
      "Arabic Calligraphy",
      "Digital Art",
      "Graphite Sketching",
      "Custom Art Commissions",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function GalleryJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ArtGallery",
    name: "Discrete Shadow",
    url: BASE,
    image: `${BASE}/og-image.png`,
    description:
      "Original paintings, Arabic calligraphy, digital art and custom portrait commissions.",
    founder: {
      "@type": "Person",
      name: "Danish Saleem",
    },
    email: "info@discreteshadoww.com",
    telephone: "+13434179482",
    currenciesAccepted: "CAD, USD",
    paymentAccepted: "E-Transfer, PayPal",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ArtworkJsonLd({
  title,
  description,
  image,
  slug,
  medium,
  year,
  available,
}: {
  title: string;
  description: string;
  image: string;
  slug: string;
  medium?: string;
  year?: string;
  available?: boolean;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: title,
    description,
    image,
    url: `${BASE}/artwork/${slug}`,
    creator: {
      "@type": "Person",
      name: "Danish Saleem",
      url: BASE,
    },
    ...(medium && { artMedium: medium }),
    ...(year && { dateCreated: year }),
    offers: {
      "@type": "Offer",
      availability: available
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      seller: {
        "@type": "Person",
        name: "Danish Saleem",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function CollectionJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: Array<{ name: string; url: string; image: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: it.url,
        name: it.name,
        image: it.image,
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: Array<{ name: string; url: string }>;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
