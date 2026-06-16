"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const timeline = [
  ["2019", "The first sketch", "A single graphite study — and the spark that started it all."],
  ["2021", "Commissions begin", "Late-night studies became pieces made for other people’s stories."],
  ["2022", "Calligraphy", "Arabic script became a turning point — writing meaning into every stroke."],
  ["Today", "Four mediums", "Paint, ink, graphite and pixels — one hand, many languages."],
];

const mediums = [
  ["Painting", "Acrylic on canvas — skies, seas and bold figures in living colour.", "/paintings"],
  ["Calligraphy", "Modern Arabic calligraphy in gold, ink and texture.", "/calligraphy"],
  ["Digital", "Luminous digital portraits and character art.", "/digital-art"],
  ["Sketch", "Graphite and colour-pencil studies worked into shadow.", "/sketches"],
];

export default function AboutView() {
  const imgWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imgWrap,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-40 md:px-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 top-24 select-none font-display text-[24vw] leading-none text-paper/[0.045]"
        >
          Artist
        </span>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6"
          >
            The Artist
          </motion.p>
          <h1 className="font-display display-lg max-w-4xl font-light text-paper">
            Art is a <span className="italic text-gold-bright">dialogue</span>{" "}
            between the creator and the viewer.
          </h1>
        </div>
      </section>

      {/* PORTRAIT + STORY */}
      <section className="mx-auto mt-20 max-w-7xl px-6 md:mt-28 md:px-12">
        <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
          <div ref={imgWrap} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <motion.div style={{ y: imgY }} className="absolute inset-[-10%]">
                <Image
                  src="/danish-portrait.webp"
                  alt="Danish — artist behind Discrete Shadow"
                  fill
                  sizes="(max-width:768px) 100vw, 45vw"
                  className="object-cover object-top"
                  priority
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
            </div>
            <div className="absolute -bottom-8 -right-4 w-44 rounded-sm border border-gold/20 bg-ink-soft/85 p-5 backdrop-blur md:-right-10 md:w-52">
              <p className="font-display text-4xl text-gold-bright md:text-5xl">
                Danish
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-paper-dim">
                Behind Discrete Shadow
              </p>
            </div>
          </div>

          <div>
            <Reveal>
              <p className="max-w-md text-lg text-paper">
                I&apos;m Danish — the hand behind Discrete Shadow. What began in
                2019 with a single pencil sketch has grown into a practice
                spanning paint, ink and pixels.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-6 max-w-md text-paper-dim">
                By 2021 those late-night studies became commissions — and Arabic
                calligraphy became a turning point, a way of writing meaning into
                every stroke. Gold, texture and script composed into something
                sacred.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-paper-dim">
                For me, art is more than creation. It is embracing the process
                and connecting, emotionally, with whoever is standing on the
                other side of the canvas.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 grid grid-cols-3 gap-6 border-t border-paper/10 pt-8">
                {[
                  ["5+", "Years creating"],
                  ["120+", "Pieces delivered"],
                  ["4", "Mediums mastered"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <p className="font-display text-3xl text-paper">{n}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.15em] text-paper-dim">
                      {l}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="mx-auto mt-28 max-w-7xl px-6 md:mt-40 md:px-12">
        <Reveal>
          <p className="eyebrow mb-4">The Journey</p>
          <h2 className="font-display text-4xl font-light text-paper md:text-5xl">
            One pencil, then{" "}
            <span className="italic text-gold-bright">everything</span>
          </h2>
        </Reveal>
        <div className="mt-14 space-y-px">
          {timeline.map(([year, title, desc], i) => (
            <Reveal key={year} delay={i * 0.08}>
              <div className="group grid grid-cols-[auto_1fr] gap-6 border-t border-paper/10 py-8 transition-colors hover:bg-paper/[0.02] md:grid-cols-[120px_1fr]">
                <span className="font-display text-2xl text-gold-bright md:text-3xl">
                  {year}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-paper">{title}</h3>
                  <p className="mt-2 max-w-xl text-paper-dim">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* MEDIUMS */}
      <section className="mx-auto mt-28 max-w-7xl px-6 md:mt-40 md:px-12">
        <Reveal>
          <p className="eyebrow mb-4">What I Make</p>
          <h2 className="font-display text-4xl font-light text-paper md:text-5xl">
            Four <span className="italic text-gold-bright">languages</span>, one
            hand
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {mediums.map(([title, desc, href], i) => (
            <Reveal key={title} delay={i * 0.08}>
              <Link
                href={href}
                className="group block h-full rounded-sm border border-paper/10 bg-ink-soft/40 p-7 transition-colors hover:border-gold/40 hover:bg-ink-soft"
              >
                <span className="font-display text-5xl text-paper/15 transition-colors group-hover:text-gold/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-2xl text-paper">{title}</h3>
                <p className="mt-2 text-sm text-paper-dim">{desc}</p>
                <span className="mt-6 inline-block text-xs uppercase tracking-[0.2em] text-gold-bright opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View work →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-28 max-w-4xl px-6 pb-32 text-center md:mt-40">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="font-display text-4xl font-light text-paper md:text-6xl"
        >
          Let&apos;s make something{" "}
          <span className="italic text-gold-bright">unforgettable</span>
        </motion.h2>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/commission"
            className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink"
          >
            <span className="relative z-10">Start a Commission</span>
            <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-paper/20 px-8 py-4 text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}
