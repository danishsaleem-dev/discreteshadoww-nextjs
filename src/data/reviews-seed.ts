/**
 * Seed reviews — shown in the marquee alongside the 5 most-recent live ones
 * from Google Places API.
 *
 * HOW TO ADD MORE:
 *   1. Go to your Google Business Profile → Reviews
 *   2. Copy each reviewer's name, star rating, and review text
 *   3. Paste as a new object below (avatar is optional — only live API reviews have it)
 *   4. Push to GitHub — Vercel auto-deploys, no other steps needed
 *
 * Live API reviews (fetched once per day, cached on Vercel) are merged in
 * automatically and always shown first. Duplicates are filtered by name.
 */

import { type Testimonial } from "@/lib/testimonials";

export const seedReviews: Testimonial[] = [
  {
    name: "Chim chim",
    rating: 5,
    source: "Google",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocLEzpTJihutRO5KbmeB-iypnvyUVrjE2oS3qA06GbND_IhR=s128-c0x00000000-cc-rp-mo",
    text: "I have placed an order from here, can say that I have never been this satisfied with any painting like this. Super neat and aesthetic was what I was looking and they didn't disappoint. My budget wasn't alot but they managed to create such a beautiful piece within the budget that I had to offer. Will order once again in future, hoping they grow their business and get recognition as they deserve. Loved it!",
  },
  {
    name: "Aman Arshad",
    rating: 5,
    source: "Google",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocICowJz0eYcvj3C3MhRaGuMSq-TlCzvaui9elel5eK85hSGKQ=s128-c0x00000000-cc-rp-mo",
    text: "The artwork on this profile is absolutely stunning! Their paintings are lovely and neat, with a level of detail that's truly impressive. The calligraphy is equally stunning - so neat and beautiful! I'm also a fan of digital art, and this artist's digital pieces are fantastic. Overall, their talent and skill shine through in every aspect of their work.",
  },
  {
    name: "MAsood Umer",
    rating: 5,
    source: "Google",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjW-GIdIkb_7Z4t4Gv3CQuilu12BC8AKAyRITvF6vorazuy9WteJgA=s128-c0x00000000-cc-rp-mo",
    text: "The artwork is truly remarkable! The attention to detail, neatness, and impeccable finishing make it a standout piece. It's clear that a lot of skill and care went into its creation. I couldn't be more impressed and highly recommend it to anyone looking for exceptional art.",
  },
  {
    name: "Hàmmád Ahmâd",
    rating: 5,
    source: "Google",
    avatar:
      "https://lh3.googleusercontent.com/a/ACg8ocK_WM2z04zTJuTPIHxUWQGt4B34nnZOKj6fUvrdCfxpKYrk-A=s128-c0x00000000-cc-rp-mo",
    text: "Your sketches are breathtaking and captivating! Your attention to detail, mastery of light and shadow and ability to evoke emotion are truly impressive. Your art is a reflection of your soul, and it's beautiful. Keep creating, as the world needs more beauty like this. You are an inspiration to fellow artists and I look forward to seeing your next masterpiece!",
  },
  {
    name: "Hasin Khan",
    rating: 5,
    source: "Google",
    avatar:
      "https://lh3.googleusercontent.com/a-/ALV-UjX4TOrEQiWNF9uKIU0unhE8GmRf_IXuxeS2qRsHlNM0dZGvzLJr=s128-c0x00000000-cc-rp-mo-ba2",
    text: "I saw this guy's paintings and other artworks on Instagram. I asked him to create a painting for my room and a digital art for my BRAND. To me explaining the concept was a bit challenging but he understood the assignment and gave me his best work. Keep it up...... If you need something, talk to him and it'll be worth every penny.",
  },

  // ── Paste the rest of your ~45 reviews below ──────────────────────────────
  // Format:
  // {
  //   name: "Reviewer Name",
  //   rating: 5,
  //   source: "Google",
  //   text: "Their review text...",
  // },
];
