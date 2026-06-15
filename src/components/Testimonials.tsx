import {
  testimonials as placeholderReviews,
  googleReviewsUrl,
} from "@/lib/testimonials";
import { getGoogleReviews } from "@/lib/google-reviews";
import TestimonialsView from "./TestimonialsView";

export default async function Testimonials() {
  const google = await getGoogleReviews();

  const items = google?.reviews?.length ? google.reviews : placeholderReviews;
  const url = google?.url ?? googleReviewsUrl;

  // Average rating: use Google's overall rating when available, else compute
  // from the reviews we're showing.
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
