"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Artwork } from "@/lib/artworks";
import Reveal from "./Reveal";

export default function Calligraphy({ artworks }: { artworks: Artwork[] }) {
  const pieces = artworks.slice(0, 8);
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

                {/* index badge — always visible */}
                <div className="absolute left-4 top-4 font-display text-4xl text-paper/20">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* gradient + text — reveal on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-0 left-0 w-full translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-[0.25em] text-gold-bright">
                    {art.note || art.category}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-paper">
                    {art.title.split("—")[0].trim()}
                  </h3>
                  {art.title.includes("—") && (
                    <p className="mt-1 font-arabic text-lg text-gold-bright/80" dir="rtl">
                      {art.title.split("—")[1]?.trim()}
                    </p>
                  )}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/calligraphy"
            className="group inline-flex items-center gap-3 rounded-full border border-paper/20 px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
          >
            View all calligraphy
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
