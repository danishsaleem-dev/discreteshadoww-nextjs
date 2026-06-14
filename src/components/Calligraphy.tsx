"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Artwork } from "@/lib/artworks";
import Reveal from "./Reveal";

export default function Calligraphy({ artworks }: { artworks: Artwork[] }) {
  const pieces = artworks;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section
      id="calligraphy"
      ref={ref}
      className="relative overflow-hidden bg-ink-soft py-28 md:py-40"
    >
      {/* oversized watermark */}
      <motion.p
        style={{ x, opacity }}
        className="font-arabic pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center text-[28vw] leading-none text-paper/[0.04]"
        dir="rtl"
      >
        خط
      </motion.p>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-6">Arabic Calligraphy</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display display-lg font-light text-paper">
              Writing meaning into{" "}
              <span className="italic text-gold-bright">every stroke</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-6 max-w-md text-paper-dim">
              A turning point in the practice — gold, ink and texture composed
              into sacred geometry. Each piece is hand-lettered and one of a
              kind.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pieces.map((art, i) => (
            <Reveal key={art.title} delay={i * 0.08}>
              <Link
                href={`/artwork/${art.slug}`}
                data-cursor
                className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
              >
                <Image
                  src={art.src}
                  alt={art.title}
                  fill
                  sizes="(max-width:640px) 100vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink to-transparent opacity-70" />
                <div className="absolute bottom-0 p-5">
                  <h3 className="font-arabic text-2xl text-gold-bright" dir="rtl">
                    {art.title.split("—")[1]?.trim() || art.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-paper-dim">
                    {art.note}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
