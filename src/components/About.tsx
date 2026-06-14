"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:py-40">
      <div className="grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <div ref={ref} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <motion.div style={{ y: imgY }} className="absolute inset-[-12%]">
              <Image
                src="/artwork/Portrait-Glow.webp"
                alt="Portrait Glow"
                fill
                sizes="(max-width:768px) 100vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>
          <motion.div
            style={{ y }}
            className="absolute -bottom-8 -right-4 w-40 rounded-sm border border-gold/20 bg-ink-soft/80 p-4 backdrop-blur md:-right-10 md:w-52"
          >
            <p className="font-display text-4xl text-gold-bright md:text-5xl">
              2019
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-paper-dim">
              Where the journey began
            </p>
          </motion.div>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow mb-6">The Artist</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display display-lg font-light text-paper">
              Art is a <span className="italic text-gold-bright">dialogue</span>{" "}
              between the creator and the viewer.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-md text-paper-dim">
              What began in 2019 with a single pencil sketch has grown into a
              practice spanning paint, ink and pixels. By 2021 those late-night
              studies became commissions — and Arabic calligraphy became a
              turning point, a way of writing meaning into every stroke.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-md text-paper-dim">
              For me, art is more than creation. It is embracing the process and
              connecting, emotionally, with whoever is standing on the other
              side of the canvas.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
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
  );
}
