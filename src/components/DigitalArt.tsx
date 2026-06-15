"use client";

import Image from "next/image";
import Link from "next/link";
import type { Artwork } from "@/lib/artworks";
import Reveal from "./Reveal";

export default function DigitalArt({
  digital,
  sketches,
}: {
  digital: Artwork[];
  sketches: Artwork[];
}) {
  // Preview only — 3 digital + 3 sketches fills the 6-tile mosaic; the rest
  // live on the dedicated pages behind the "View all" buttons.
  const mixed = [...digital.slice(0, 3), ...sketches.slice(0, 3)];
  return (
    <section id="digital" className="mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">Digital Art & Sketches</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display display-lg font-light text-paper">
              Light, <span className="italic text-gold-bright">glow</span> &
              graphite
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <p className="max-w-sm text-paper-dim">
            From luminous digital portraits to intimate pencil studies — the
            same hand, two very different languages.
          </p>
        </Reveal>
      </div>

      {/* asymmetric editorial grid */}
      <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-6 md:gap-6">
        {mixed.map((art, i) => {
          // varied spans for an artistic mosaic
          const spans = [
            "md:col-span-3 md:row-span-2 aspect-[4/5]",
            "md:col-span-3 aspect-[16/10]",
            "md:col-span-3 aspect-[16/10]",
            "md:col-span-2 aspect-[3/4]",
            "md:col-span-2 aspect-[3/4]",
            "md:col-span-2 aspect-[3/4]",
          ];
          return (
            <Reveal
              key={art.title}
              delay={(i % 3) * 0.06}
              className={`${spans[i % spans.length]} col-span-1`}
            >
              <Link
                href={`/artwork/${art.slug}`}
                data-cursor
                className="group relative block h-full w-full overflow-hidden rounded-sm"
              >
                <Image
                  src={art.src}
                  alt={art.title}
                  fill
                  sizes="(max-width:768px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-gold-bright">
                    {art.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl text-paper">
                    {art.title}
                  </h3>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-14 flex flex-wrap justify-center gap-4">
        <Link
          href="/digital-art"
          className="group inline-flex items-center gap-3 rounded-full border border-paper/20 px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
        >
          View all digital art
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
        <Link
          href="/sketches"
          className="group inline-flex items-center gap-3 rounded-full border border-paper/20 px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
        >
          View all sketches
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
