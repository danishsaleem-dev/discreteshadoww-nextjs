"use client";

const words = [
  "Paintings",
  "Calligraphy",
  "Portraits",
  "Digital Art",
  "Sketches",
  "Prints",
  "Commissions",
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <section className="relative overflow-hidden border-y border-paper/10 py-6">
      <div className="flex w-max animate-marquee whitespace-nowrap">
        {row.map((w, i) => (
          <span
            key={i}
            className="mx-8 font-display text-3xl italic text-paper-dim md:text-5xl"
          >
            {w}
            <span className="ml-16 text-gold">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
