"use client";

import { useState } from "react";
import { type Testimonial } from "@/lib/testimonials";
import Reveal from "./Reveal";

function Stars({ n }: { n: number }) {
  return (
    <span
      className="text-sm tracking-[0.15em] text-gold-bright"
      aria-label={`${n} out of 5 stars`}
    >
      {"★★★★★".slice(0, n)}
    </span>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[300px] shrink-0 flex-col rounded-sm border border-paper/10 bg-ink-soft/50 p-7 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <Stars n={t.rating} />
        {t.source && (
          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-paper-dim">
            {t.source}
          </span>
        )}
      </div>
      <blockquote className="mt-4 flex-1 leading-relaxed text-paper-dim">
        &ldquo;{t.text}&rdquo;
      </blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 font-display text-sm text-gold-bright">
          {t.name.charAt(0)}
        </span>
        <span className="font-display text-lg text-paper">{t.name}</span>
      </figcaption>
    </figure>
  );
}

function Row({
  items,
  dir,
  dur,
  paused,
}: {
  items: Testimonial[];
  dir: "left" | "right";
  dur: number;
  paused: boolean;
}) {
  return (
    <div className="flex w-max gap-5">
      <div
        className="flex w-max gap-5"
        style={{
          animation: `hscroll-${dir} ${dur}s linear infinite`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {[...items, ...items].map((t, i) => (
          <Card key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsView({
  items,
  rating,
  total,
  url,
}: {
  items: Testimonial[];
  rating: number;
  total: number | null;
  url: string;
}) {
  const [paused, setPaused] = useState(false);

  if (items.length === 0) return null;

  const half = Math.ceil(items.length / 2);
  const rowA = items.slice(0, half);
  const rowB =
    items.length > 1 ? items.slice(half).concat(items.slice(0, 1)) : items;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-paper/10 bg-ink py-28 md:py-36"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[120px]" />

      {/* header */}
      <div className="relative mx-auto mb-16 max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow mb-5">Testimonials</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display display-lg font-light text-paper">
            Kind <span className="italic text-gold-bright">words</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-paper-dim">
            <span className="font-display text-3xl text-paper">
              {rating.toFixed(1)}
            </span>
            <Stars n={5} />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 transition-colors hover:text-gold-bright hover:underline"
            >
              {total ? `from ${total} reviews on Google` : "from happy collectors on Google"}
            </a>
          </div>
        </Reveal>
      </div>

      {/* marquee rows */}
      <div
        className="relative flex flex-col gap-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Row items={rowA} dir="left" dur={46} paused={paused} />
        <Row items={rowB} dir="right" dur={54} paused={paused} />

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent md:w-40" />
      </div>
    </section>
  );
}
