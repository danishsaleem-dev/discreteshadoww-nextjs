"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });
const HeroArtWall = dynamic(() => import("./HeroArtWall"), { ssr: false });
const HeroArtDrift = dynamic(() => import("./HeroArtDrift"), { ssr: false });

// "particles" | "wall" | "drift"
const HERO_BG = "wall" as "particles" | "wall" | "drift";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 + i * 0.12 },
  }),
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col overflow-hidden px-6 pb-10 pt-32 md:pt-36">
      {/* animated backdrop */}
      {HERO_BG === "wall" ? (
        <HeroArtWall />
      ) : HERO_BG === "drift" ? (
        <HeroArtDrift />
      ) : (
        <>
          <div className="absolute inset-0 -z-10 opacity-80">
            <Hero3D />
          </div>
          <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--color-ink)_85%)]" />
        </>
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.8 }}
          className="eyebrow mb-8"
        >
          Custom Artwork · Portraits · Calligraphy
        </motion.p>

        <h1 className="font-display display-xl font-light text-paper">
          {["Discrete", "Shadow"].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                variants={line}
                custom={i}
                initial="hidden"
                animate="show"
                className="block"
              >
                {i === 1 ? (
                  <span className="italic text-gold-bright">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9 }}
          className="mx-auto mt-8 max-w-xl text-balance text-base text-paper-dim md:text-lg"
        >
          A dialogue between the creator and the viewer — original paintings,
          Arabic calligraphy and hand-drawn portraits that turn moments into
          masterpieces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#gallery"
            className="group relative overflow-hidden rounded-full border border-gold/50 px-8 py-3 text-sm uppercase tracking-[0.2em] text-paper transition-colors"
          >
            <span className="relative z-10 transition-colors group-hover:text-ink">
              View the Work
            </span>
            <span className="absolute inset-0 -z-0 translate-y-full bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </a>
          <a
            href="#commission"
            className="text-sm uppercase tracking-[0.2em] text-paper-dim underline-offset-8 transition-colors hover:text-gold-bright hover:underline"
          >
            Commission a Piece
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-10 mt-12 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-paper-dim">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-gold/70 to-transparent" />
      </motion.div>
    </section>
  );
}
