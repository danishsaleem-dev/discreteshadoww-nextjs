import { googleReviewsUrl } from "@/lib/testimonials";
import { getGoogleReviews } from "@/lib/google-reviews";
import { seedReviews } from "@/data/reviews-seed";
import TestimonialsView from "./TestimonialsView";

export default async function Testimonials() {
  // Live fetch — cached 24 h on Vercel's Data Cache (ISR).
  // Google Places API returns at most 5 reviews. Seed reviews fill the rest.
  const google = await getGoogleReviews();

  // Live reviews first (have real profile photos + most recent).
  // Seed reviews that share a name with a live review are skipped.
  const liveNames = new Set(
    (google?.reviews ?? []).map((r) => r.name.toLowerCase())
  );
  const merged = [
    ...(google?.reviews ?? []),
    ...seedReviews.filter((r) => !liveNames.has(r.name.toLowerCase())),
  ];

  // Fall back to seed-only if the API is unconfigured or down.
  const items = merged.length > 0 ? merged : seedReviews;
  const url = google?.url ?? googleReviewsUrl;
  const rating =
    google?.rating ??
    (items.length
      ? items.reduce((s, t) => s + t.rating, 0) / items.length
      : 5);

  return (
    <TestimonialsView
      items={items}
      rating={rating}
      total={google?.total ?? null}
      url={url}
    />
  );
}
