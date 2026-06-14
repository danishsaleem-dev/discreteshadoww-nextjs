"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LiteYouTube({
  id,
  poster,
  title,
}: {
  id: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-sm ring-1 ring-paper/10">
      {playing ? (
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={title}
          allow="accelerated-motion; autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width:1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/40 transition-colors duration-300 group-hover:bg-ink/25" />
          <motion.span
            initial={false}
            whileHover={{ scale: 1.08 }}
            className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/50 bg-ink/50 backdrop-blur"
          >
            <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
            <span className="ml-1 h-0 w-0 border-y-[12px] border-l-[20px] border-y-transparent border-l-gold-bright" />
          </motion.span>
          <span className="absolute bottom-5 left-6 text-xs uppercase tracking-[0.25em] text-paper/90">
            Watch the process
          </span>
        </button>
      )}
    </div>
  );
}
