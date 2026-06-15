"use client";

import { useRef } from "react";
import Image from "next/image";
import { type Testimonial } from "@/lib/testimonials";
import { useDragScroll } from "@/hooks/useDragScroll";
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
    <figure className="flex w-[250px] shrink-0 flex-col rounded-sm border border-paper/10 bg-ink-soft/50 p-5 sm:w-[360px] sm:p-7">
      <div className="flex items-center justify-between">
        <Stars n={t.rating} />
        {t.source && (
          <span className="text-[0.55rem] uppercase tracking-[0.2em] text-paper-dim sm:text-[0.6rem]">
            {t.source}
          </span>
        )}
      </div>
      <blockquote className="mt-3 line-clamp-6 flex-1 text-sm leading-relaxed text-paper-dim sm:mt-4 sm:text-base">
        &ldquo;{t.text}&rdquo;
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 sm:mt-5">
        {t.avatar ? (
          <Image
            src={t.avatar}
            alt={t.name}
            width={40}
            height={40}
            draggable={false}
            className="h-8 w-8 rounded-full object-cover sm:h-9 sm:w-9"
          />
        ) : (
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/15 font-display text-sm text-gold-bright sm:h-9 sm:w-9">
            {t.name.charAt(0)}
          </span>
        )}
        <span className="font-display text-base text-paper sm:text-lg">
          {t.name}
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, dir }: { items: Testimonial[]; dir: "left" | "right" }) {
  const ref = useRef<HTMLDivElement>(null);
  useDragScroll(ref, { dir, speed: 0.4 });
  return (
    <div
      ref={ref}
      className="no-scrollbar flex cursor-grab select-none gap-5 overflow-x-auto active:cursor-grabbing"
      style={{ scrollbarWidth: "none" }}
    >
      {/* rendered twice for a seamless loop */}
      {items.map((t, i) => (
        <Card key={`${t.name}-${i}`} t={t} />
      ))}
      {items.map((t, i) => (
        <Card key={`dup-${t.name}-${i}`} t={t} />
      ))}
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

      {/* marquee rows — auto-scroll, draggable (hold to pause) */}
      <div className="relative flex flex-col gap-5">
        <Row items={rowA} dir="left" />
        <Row items={rowB} dir="right" />

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent md:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent md:w-40" />
      </div>
    </section>
  );
}
