"use client";

import Image from "next/image";
import { artworks } from "@/lib/artworks";

const srcs = artworks.map((a) => a.src);
const row1 = srcs.filter((_, i) => i % 2 === 0);
const row2 = srcs.filter((_, i) => i % 2 === 1);

const rows = [
  { imgs: row1, dir: "right", dur: 64 },
  { imgs: row2, dir: "left", dur: 56 },
] as const;

export default function HeroArtWall() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 flex flex-col gap-2 py-2 opacity-90 sm:gap-3 sm:py-3">
        {rows.map((row, ri) => (
          <div key={ri} className="relative flex-1 overflow-hidden">
            <div
              className="flex h-full w-max gap-2 will-change-transform sm:gap-3"
              style={{
                animation: `hscroll-${row.dir} ${row.dur}s linear infinite`,
              }}
            >
              {[...row.imgs, ...row.imgs].map((src, i) => (
                <div
                  key={i}
                  className="relative aspect-[3/4] h-full shrink-0 overflow-hidden rounded-sm"
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width:768px) 50vw, 28vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* legibility scrims: dark core behind the text, edges stay bright to show art */}
      <div className="absolute inset-0 bg-ink/25" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 52% at center, var(--color-ink) 0%, color-mix(in srgb, var(--color-ink) 60%, transparent) 44%, transparent 80%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--color-ink) 0%, transparent 20%, transparent 80%, var(--color-ink) 100%)",
        }}
      />
    </div>
  );
}
