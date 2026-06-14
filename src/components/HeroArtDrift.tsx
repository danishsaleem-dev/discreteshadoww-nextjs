"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type Tile = {
  src: string;
  top: string;
  left: string;
  w: string;
  depth: number;
  r: string;
};

// Placed around the edges so the centred hero text stays clear.
const tiles: Tile[] = [
  // left side
  { src: "/artwork/The-Super-Moon.webp", top: "8%", left: "3%", w: "14vw", depth: 0.9, r: "-4deg" },
  { src: "/artwork/Suga-Portrait-Color-Sketch.webp", top: "30%", left: "1%", w: "7vw", depth: 0.32, r: "3deg" },
  { src: "/artwork/The-Glowing-Beach.webp", top: "44%", left: "9%", w: "7vw", depth: 0.38, r: "-3deg" },
  { src: "/artwork/Together-Forever.webp", top: "58%", left: "1%", w: "13vw", depth: 0.78, r: "2deg" },
  // right side
  { src: "/artwork/The-Dragon-Flame.webp", top: "13%", left: "81%", w: "15vw", depth: 0.85, r: "3deg" },
  { src: "/artwork/Al-Qadr.webp", top: "7%", left: "69%", w: "7vw", depth: 0.3, r: "-2deg" },
  { src: "/artwork/Ocean-of-Tears-Glowed.webp", top: "40%", left: "90%", w: "7vw", depth: 0.4, r: "3deg" },
  { src: "/artwork/Under-the-Moon.webp", top: "60%", left: "80%", w: "14vw", depth: 0.8, r: "-3deg" },
  { src: "/artwork/Heavy-Textured-Calligraphy.webp", top: "82%", left: "78%", w: "9vw", depth: 0.45, r: "2deg" },
  // top band (above the heading)
  { src: "/artwork/Serendipity-Cover-Painting.webp", top: "2%", left: "32%", w: "8vw", depth: 0.42, r: "2deg" },
  { src: "/artwork/Portrait-Glow.webp", top: "3%", left: "55%", w: "7vw", depth: 0.36, r: "-3deg" },
  // bottom band (below the buttons)
  { src: "/artwork/Glowing-Sunset.webp", top: "76%", left: "13%", w: "9vw", depth: 0.5, r: "-2deg" },
  { src: "/artwork/The-Emerisss-Stare.webp", top: "72%", left: "66%", w: "8vw", depth: 0.5, r: "3deg" },
  { src: "/artwork/Ghilf-e-Kaaba.webp", top: "85%", left: "40%", w: "8vw", depth: 0.34, r: "-2deg" },
  { src: "/artwork/Assassin-Sketch.webp", top: "86%", left: "55%", w: "6vw", depth: 0.3, r: "2deg" },
  { src: "/artwork/Discrete-Shadow.webp", top: "24%", left: "90%", w: "7vw", depth: 0.33, r: "-3deg" },
  { src: "/artwork/Hayat.webp", top: "50%", left: "12%", w: "6vw", depth: 0.3, r: "2deg" },
];

export default function HeroArtDrift() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-depth]")
    );
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    const loop = () => {
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      for (const n of nodes) {
        const d = parseFloat(n.dataset.depth || "0.5");
        n.style.transform = `translate3d(${(-cur.x * d * 60).toFixed(2)}px, ${(-cur.y * d * 60).toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {tiles.map((t, i) => (
        <div
          key={i}
          data-depth={t.depth}
          className="absolute will-change-transform"
          style={{ top: t.top, left: t.left, width: t.w }}
        >
          <div
            style={{
              animation: `drift-float ${8 + i * 1.2}s ease-in-out ${i * 0.4}s infinite`,
              ["--r" as string]: t.r,
            }}
          >
            <div
              className="relative aspect-[3/4] w-full overflow-hidden rounded-sm ring-1 ring-paper/5"
              style={{
                opacity: 0.5 + t.depth * 0.45,
                filter: `blur(${((1 - t.depth) * 1.8).toFixed(1)}px)`,
              }}
            >
              <Image
                src={t.src}
                alt=""
                fill
                sizes="16vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      ))}

      {/* legibility scrims: dark core behind the text, edges stay bright to show art */}
      <div className="absolute inset-0 bg-ink/20" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 62% 52% at center, var(--color-ink) 0%, color-mix(in srgb, var(--color-ink) 55%, transparent) 46%, transparent 82%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-ink) 0%, transparent 22%, transparent 78%, var(--color-ink) 100%)",
        }}
      />
    </div>
  );
}
