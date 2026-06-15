"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import type { Artwork } from "@/lib/artworks";
import { useDragScroll } from "@/hooks/useDragScroll";

function Card({
  art,
  index,
  hidden,
}: {
  art: Artwork;
  index: number;
  hidden?: boolean;
}) {
  return (
    <Link
      href={`/artwork/${art.slug}`}
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : undefined}
      className="group relative block w-[40%] shrink-0 overflow-hidden rounded-sm"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={art.src}
          alt={art.title}
          fill
          sizes="40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/15 to-transparent opacity-90" />
        <div className="absolute left-3 top-3 font-display text-3xl text-paper/25">
          {String(index + 1).padStart(2, "0")}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-3">
          <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold-bright">
            {art.note || art.category}
          </p>
          <h3 className="mt-1 font-display text-base leading-tight text-paper">
            {art.title.split("—")[0].trim()}
          </h3>
        </div>
      </div>
    </Link>
  );
}

/**
 * Mobile-only artwork slider: continuously auto-scrolls (marquee-style) but is
 * also a native scroll container, so the user can swipe/drag it like a normal
 * slider. Auto-scroll pauses while the user is interacting and resumes shortly
 * after. Cards are rendered twice for a seamless infinite loop. Renders nothing
 * meaningful on desktop (callers gate it with `md:hidden`).
 */
export default function MobileArtSlider({ artworks }: { artworks: Artwork[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useDragScroll(ref, { dir: "left", speed: 0.4 });

  return (
    <div
      ref={ref}
      className="no-scrollbar flex cursor-grab select-none gap-4 overflow-x-auto px-6 pb-1 active:cursor-grabbing"
      style={{ scrollbarWidth: "none" }}
    >
      {artworks.map((art, i) => (
        <Card key={art.slug} art={art} index={i} />
      ))}
      {artworks.map((art, i) => (
        <Card key={`dup-${art.slug}`} art={art} index={i} hidden />
      ))}
    </div>
  );
}
