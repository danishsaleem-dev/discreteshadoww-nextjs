"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Artwork } from "@/lib/artworks";
import type { CategoryConfig } from "@/lib/categories";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CategoryView({
  config,
  artworks,
}: {
  config: CategoryConfig;
  artworks: Artwork[];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <>
      {/* HERO */}
      <section
        ref={ref}
        className="relative flex min-h-[62vh] flex-col justify-end overflow-hidden px-6 pb-16 pt-40 md:min-h-[68vh] md:px-12 md:pb-20"
      >
        <motion.span
          style={{ y: markY, opacity: markOpacity }}
          aria-hidden
          dir={config.watermarkRtl ? "rtl" : undefined}
          className={`pointer-events-none absolute -right-4 top-16 select-none leading-none text-paper/[0.045] ${
            config.watermarkRtl ? "font-arabic text-[34vw]" : "font-display text-[24vw]"
          }`}
        >
          {config.watermark}
        </motion.span>

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6"
          >
            {config.eyebrow}
          </motion.p>

          <h1 className="font-display display-lg font-light text-paper">
            {config.title.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.9, ease }}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}{" "}
            <span className="italic text-gold-bright">{config.accent}</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="mt-6 max-w-xl text-paper-dim"
          >
            {config.blurb}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.9 }}
            className="mt-8 text-xs uppercase tracking-[0.25em] text-paper-dim"
          >
            {artworks.length} {artworks.length === 1 ? "piece" : "pieces"}
          </motion.p>
        </div>
      </section>

      {/* GRID */}
      <section className="mx-auto max-w-7xl px-6 pb-28 md:px-12 md:pb-40">
        {artworks.length === 0 ? (
          <p className="py-20 text-center text-paper-dim">
            New work is on the way. Check back soon.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((art, i) => (
              <motion.div
                key={art.slug}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: (i % 3) * 0.08 }}
              >
                <Link
                  href={`/artwork/${art.slug}`}
                  className="group relative block aspect-[3/4] overflow-hidden rounded-sm"
                >
                  <Image
                    src={art.src}
                    alt={art.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    loading={i < 3 ? "eager" : "lazy"}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute left-4 top-4 font-display text-4xl text-paper/20">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {!art.available && (
                    <span className="absolute right-4 top-4 rounded-full bg-clay/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.15em] text-paper">
                      Sold
                    </span>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 w-full translate-y-3 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    {art.note && (
                      <p className="text-xs uppercase tracking-[0.25em] text-gold-bright">
                        {art.note}
                      </p>
                    )}
                    <h2 className="mt-2 font-display text-2xl text-paper">
                      {art.title}
                    </h2>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div className="mt-24 flex flex-col items-center gap-6 border-t border-paper/10 pt-16 text-center">
          <p className="font-display text-3xl font-light text-paper md:text-4xl">
            Want something{" "}
            <span className="italic text-gold-bright">made for you</span>?
          </p>
          <Link
            href="/commission"
            className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink"
          >
            <span className="relative z-10">Start a Commission</span>
            <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </Link>
        </div>
      </section>
    </>
  );
}
