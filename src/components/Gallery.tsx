"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Artwork } from "@/lib/artworks";

export default function Gallery({ artworks }: { artworks: Artwork[] }) {
  const paintings = artworks;
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const mql = window.matchMedia("(min-width: 768px)");
    if (prefersReduced || !mql.matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:flex md:h-screen md:flex-col md:py-0"
    >
      <div className="mx-auto w-full max-w-7xl px-6 pb-12 pt-10 md:pb-6 md:pt-24">
        <p className="eyebrow mb-4">Selected Works</p>
        <h2 className="font-display display-lg font-light text-paper">
          The <span className="italic text-gold-bright">Paintings</span>
        </h2>
      </div>

      <div className="md:flex md:min-h-0 md:flex-1 md:items-center md:overflow-hidden">
        <div
          ref={trackRef}
          className="flex flex-col gap-8 md:flex-row md:gap-10 md:pl-[8vw] md:pr-[8vw]"
        >
          {paintings.map((art, i) => (
            <Link
              key={art.title}
              href={`/artwork/${art.slug}`}
              data-cursor
              className="group relative shrink-0 overflow-hidden rounded-sm md:h-[56vh] md:w-[42vh]"
            >
              <div className="relative aspect-[3/4] w-full md:h-full">
                <Image
                  src={art.src}
                  alt={art.title}
                  fill
                  sizes="(max-width:768px) 100vw, 42vh"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading={i === 0 ? "eager" : "lazy"}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 w-full translate-y-2 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-xs uppercase tracking-[0.25em] text-gold-bright">
                  {String(i + 1).padStart(2, "0")} · {art.note}
                </p>
                <h3 className="mt-2 font-display text-3xl text-paper">
                  {art.title}
                </h3>
              </div>
              <div className="absolute left-5 top-5 font-display text-5xl text-paper/20">
                {String(i + 1).padStart(2, "0")}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
