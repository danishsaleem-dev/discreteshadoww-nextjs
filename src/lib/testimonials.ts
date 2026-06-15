export type Testimonial = {
  name: string;
  text: string;
  rating: number; // 1–5
  source?: string; // e.g. "Google"
  location?: string;
  avatar?: string; // profile photo URL (Google)
};

// Link to your Google reviews (Business Profile / Maps). Update with the real URL.
export const googleReviewsUrl = "https://www.google.com/search?q=discreteshadoww+reviews";

/*
 * PLACEHOLDER reviews — replace these with your real Google reviews.
 * Either paste the real text here, or share your Google Place ID + an API
 * key and the section can fetch them live. Keep the shape the same.
 */
export const testimonials: Testimonial[] = [
  {
    name: "Ayesha K.",
    rating: 5,
    source: "Google",
    text: "Absolutely breathtaking work. The calligraphy piece I commissioned exceeded every expectation — the gold detailing is stunning in person. Communication was warm and professional throughout.",
  },
  {
    name: "Daniyal R.",
    rating: 5,
    source: "Google",
    text: "Commissioned a portrait as an anniversary gift and my wife was in tears. The likeness and the emotion captured were incredible. Worth every penny.",
  },
  {
    name: "Sara M.",
    rating: 5,
    source: "Google",
    text: "The painting arrived beautifully packaged and even more vivid than the photos. A genuine artist who cares about every brushstroke. Highly recommend.",
  },
  {
    name: "Omar H.",
    rating: 5,
    source: "Google",
    text: "From the first message to delivery, the whole process was smooth and personal. The Ghilaf-e-Kaaba piece is the centrepiece of our living room now.",
  },
  {
    name: "Hana T.",
    rating: 5,
    source: "Google",
    text: "Such a talented and patient artist. I wasn't sure exactly what I wanted and the suggestions were perfect. The final digital portrait was flawless.",
  },
  {
    name: "Bilal A.",
    rating: 5,
    source: "Google",
    text: "Ordered a custom calligraphy painting for my parents and they adored it. Beautiful texture, rich colours, and delivered right on time. Will order again.",
  },
];
