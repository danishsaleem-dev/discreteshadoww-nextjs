import type { Testimonial } from "@/lib/testimonials";

export type GoogleReviewData = {
  reviews: Testimonial[];
  rating: number | null;
  total: number | null;
  /** Public link to the business' Google reviews, when a Place ID is set. */
  url: string | null;
};

type NewPlaceReview = {
  rating?: number;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string; photoUri?: string };
};

/**
 * Fetches Google reviews via the Places API (New). Returns null when the
 * GOOGLE_PLACE_ID / GOOGLE_PLACES_API_KEY env vars aren't set or the request
 * fails, so the section can fall back to local placeholder reviews.
 *
 * Note: Google's API returns at most 5 reviews and you can't choose which.
 * Cached for 24h to stay within quota.
 */
export async function getGoogleReviews(): Promise<GoogleReviewData | null> {
  const placeId = process.env.GOOGLE_PLACE_ID;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!placeId || !apiKey) return null;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "reviews,rating,userRatingCount",
        },
        next: { revalidate: 86400 }, // 24h
      }
    );
    if (!res.ok) return null;

    const data = (await res.json()) as {
      rating?: number;
      userRatingCount?: number;
      reviews?: NewPlaceReview[];
    };

    const reviews: Testimonial[] = (data.reviews ?? [])
      .map((r) => ({
        name: r.authorAttribution?.displayName ?? "Google user",
        text: (r.text?.text ?? r.originalText?.text ?? "").trim(),
        rating: Math.round(r.rating ?? 5),
        source: "Google" as const,
        avatar: r.authorAttribution?.photoUri,
      }))
      .filter((r) => r.text.length > 0);

    if (reviews.length === 0) return null;

    return {
      reviews,
      rating: data.rating ?? null,
      total: data.userRatingCount ?? null,
      url: `https://search.google.com/local/reviews?placeid=${encodeURIComponent(placeId)}`,
    };
  } catch {
    return null;
  }
}
