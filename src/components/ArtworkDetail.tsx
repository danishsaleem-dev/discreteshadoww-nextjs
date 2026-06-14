"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { Artwork } from "@/lib/artworks";
import { contact, getImages, youTubeId } from "@/lib/artworks";
import Footer from "./Footer";
import LiteYouTube from "./LiteYouTube";

const ease = [0.22, 1, 0.36, 1] as const;

export default function ArtworkDetail({
  artwork,
  related,
}: {
  artwork: Artwork;
  related: Artwork[];
}) {
  const [zoom, setZoom] = useState(false);
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const images = getImages(artwork);
  const videoId = youTubeId(artwork.video);
  const step = (dir: number) =>
    setActive((i) => (i + dir + images.length) % images.length);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const markOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // 3D tilt on the framed image
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 18 });
  const sry = useSpring(ry, { stiffness: 120, damping: 18 });

  const onTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };
  const resetTilt = () => {
    rx.set(0);
    ry.set(0);
  };

  const mailto = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Order — ${artwork.title}`
  )}&body=${encodeURIComponent(
    `Hi, I'd like to order "${artwork.title}" (${artwork.medium}, ${artwork.size}).`
  )}`;
  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    `Hi! I'm interested in "${artwork.title}".`
  )}`;

  const specs = [
    ["Medium", artwork.medium],
    ["Size", artwork.size],
    ["Year", artwork.year],
    ["Category", artwork.category],
    ["Status", artwork.available ? "Available to order" : "Sold"],
  ] as const;

  return (
    <main className="relative">
      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 mix-blend-difference">
        <Link
          href="/#gallery"
          className="group flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
          Back to gallery
        </Link>
        <Link
          href="/"
          className="font-display text-lg tracking-wide text-paper"
        >
          Discrete<span className="text-gold-bright">.</span>Shadow
        </Link>
      </header>

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative grid min-h-[100svh] grid-cols-1 items-center gap-12 overflow-hidden px-6 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:pt-24"
      >
        {/* oversized category watermark */}
        <motion.span
          style={{ y: markY, opacity: markOpacity }}
          aria-hidden
          className="pointer-events-none absolute -right-6 top-10 select-none font-display text-[26vw] leading-none text-paper/[0.04] lg:text-[18vw]"
        >
          {artwork.category}
        </motion.span>

        {/* framed image gallery with tilt + reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, clipPath: "inset(8% 8% 8% 8%)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: 1.1, ease }}
          className="relative z-10 mx-auto w-full max-w-xl"
        >
          <div className="[perspective:1200px]">
            <div
              onMouseMove={onTilt}
              onMouseLeave={resetTilt}
              onClick={() => setZoom(true)}
              className="group relative cursor-zoom-in"
            >
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-gold/15 blur-[90px]" />
              <motion.div
                style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d" }}
                className="relative aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-paper/10 shadow-2xl"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.45, ease }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={images[active]}
                      alt={artwork.title}
                      fill
                      priority
                      sizes="(max-width:1024px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-ink/30 to-transparent" />
                <span className="absolute bottom-4 right-4 rounded-full bg-ink/60 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-paper/80 backdrop-blur transition-opacity duration-300 group-hover:opacity-0">
                  Click to zoom
                </span>
              </motion.div>
            </div>
          </div>

          {/* thumbnail strip */}
          {images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-sm ring-1 transition-all duration-300 sm:w-20 ${
                    active === i
                      ? "ring-2 ring-gold-bright"
                      : "ring-paper/15 opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* details */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="eyebrow">{artwork.category}</span>
            {artwork.available && (
              <span className="flex items-center gap-2 rounded-full border border-gold/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-gold-bright">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-bright" />
                Available
              </span>
            )}
          </motion.div>

          <h1 className="font-display text-balance text-5xl font-light leading-[0.95] text-paper md:text-7xl">
            {artwork.title.split(" ").map((w, i) => (
              <span key={i} className="inline-block overflow-hidden align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.9, ease }}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          {artwork.quote && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="mt-6 max-w-md font-display text-xl italic text-gold-bright/90"
            >
              “{artwork.quote.replace(/^“|”$/g, "")}”
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease }}
            className="mt-6 max-w-md text-paper-dim"
          >
            {artwork.description}
          </motion.p>

          {/* spec list */}
          <motion.dl
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 0.9 } } }}
            className="mt-10 max-w-md"
          >
            {specs.map(([k, v]) => (
              <motion.div
                key={k}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
                }}
                className="flex items-center justify-between border-t border-paper/10 py-3"
              >
                <dt className="text-xs uppercase tracking-[0.2em] text-paper-dim">
                  {k}
                </dt>
                <dd className="text-sm text-paper">{v}</dd>
              </motion.div>
            ))}
          </motion.dl>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8, ease }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href={mailto}
              className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink"
            >
              <span className="relative z-10">Order Now</span>
              <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
            </a>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-paper/20 px-8 py-4 text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
            >
              WhatsApp
            </a>
            <a
              href="#inquire"
              className="px-2 py-4 text-sm uppercase tracking-[0.2em] text-paper-dim underline-offset-8 transition-colors hover:text-paper hover:underline"
            >
              Inquire
            </a>
          </motion.div>
        </div>
      </section>

      {/* VIDEO */}
      {videoId && (
        <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-4">Behind the Canvas</p>
            <h2 className="font-display text-4xl font-light text-paper md:text-5xl">
              See it <span className="italic text-gold-bright">come to life</span>
            </h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease }}
          >
            <LiteYouTube id={videoId} poster={artwork.src} title={artwork.title} />
          </motion.div>
        </section>
      )}

      {/* INQUIRY */}
      <InquirySection artwork={artwork} mailto={contact.email} />

      {/* RELATED */}
      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-display text-4xl font-light text-paper md:text-5xl">
              More from the <span className="italic text-gold-bright">studio</span>
            </h2>
            <Link
              href="/#gallery"
              className="hidden text-xs uppercase tracking-[0.2em] text-paper-dim transition-colors hover:text-gold-bright sm:block"
            >
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((r, i) => (
              <motion.div
                key={r.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: (i % 4) * 0.06 }}
              >
                <Link
                  href={`/artwork/${r.slug}`}
                  className="group block overflow-hidden rounded-sm"
                >
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={r.src}
                      alt={r.title}
                      fill
                      sizes="(max-width:768px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <p className="mt-3 font-display text-lg text-paper transition-colors group-hover:text-gold-bright">
                    {r.title}
                  </p>
                  <p className="text-xs uppercase tracking-[0.15em] text-paper-dim">
                    {r.category}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      <Footer />

      {/* ZOOM LIGHTBOX */}
      <AnimatePresence>
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/92 p-6 backdrop-blur-sm"
          >
            <button
              aria-label="Close"
              className="absolute right-6 top-6 text-sm uppercase tracking-[0.2em] text-paper/80 hover:text-paper"
            >
              Close ✕
            </button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="relative h-[82vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[active]}
                alt={artwork.title}
                fill
                sizes="90vw"
                className="object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    onClick={() => step(-1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-paper/20 bg-ink/50 px-4 py-3 text-paper backdrop-blur transition-colors hover:border-gold hover:text-gold-bright"
                  >
                    ←
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={() => step(1)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-paper/20 bg-ink/50 px-4 py-3 text-paper backdrop-blur transition-colors hover:border-gold hover:text-gold-bright"
                  >
                    →
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.2em] text-paper/70">
                    {active + 1} / {images.length}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function InquirySection({
  artwork,
  mailto,
}: {
  artwork: Artwork;
  mailto: string;
}) {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Artwork: ${artwork.title} (${artwork.size})
Name: ${f.get("name")}
Email: ${f.get("email")}
Phone: ${f.get("phone")}
Budget: ${f.get("budget")}

${f.get("message")}`;
    window.location.href = `mailto:${mailto}?subject=${encodeURIComponent(
      `Inquiry — ${artwork.title}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field =
    "w-full rounded-sm border border-paper/15 bg-paper/[0.03] px-4 py-3 text-paper placeholder:text-paper-dim/60 outline-none transition-colors focus:border-gold/60";

  return (
    <section
      id="inquire"
      className="relative overflow-hidden border-y border-paper/10 bg-ink-soft py-24"
    >
      <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="eyebrow mb-5">Artwork Inquiry</p>
          <h2 className="font-display text-4xl font-light leading-tight text-paper md:text-5xl">
            Make <span className="italic text-gold-bright">{artwork.title}</span>{" "}
            yours
          </h2>
          <p className="mt-6 max-w-md text-paper-dim">
            Want this piece, a custom size, or something inspired by it? Send a
            note and I&apos;ll get back to you personally.
          </p>
          <div className="mt-8 space-y-2 text-sm text-paper-dim">
            <p>
              <span className="text-paper">Email</span> · {mailto}
            </p>
            <p>
              <span className="text-paper">Phone</span> · {contact.phone}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input name="name" required placeholder="Your name" className={field} />
            <input
              name="email"
              type="email"
              required
              placeholder="Email"
              className={field}
            />
            <input name="phone" placeholder="Phone" className={field} />
            <input name="budget" placeholder="Budget (optional)" className={field} />
          </div>
          <textarea
            name="message"
            rows={4}
            placeholder="Your message"
            className={field}
          />
          <button
            type="submit"
            className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink sm:w-auto"
          >
            <span className="relative z-10">
              {sent ? "Opening your mail…" : "Send Inquiry"}
            </span>
            <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
          </button>
        </form>
      </div>
    </section>
  );
}
