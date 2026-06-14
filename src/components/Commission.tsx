"use client";

import { contact } from "@/lib/artworks";
import Reveal from "./Reveal";

const steps = [
  ["01", "Tell the story", "Share the moment, subject or verse you want captured."],
  ["02", "Choose the medium", "Paint, calligraphy, digital or graphite — with revisions."],
  ["03", "Receive the piece", "Hand-finished original or museum-grade print, shipped to you."],
];

export default function Commission() {
  return (
    <section
      id="commission"
      className="relative overflow-hidden border-y border-paper/10 bg-ink-soft py-28 md:py-40"
    >
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-clay/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <Reveal>
              <p className="eyebrow mb-6">Commission</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="font-display display-lg font-light text-paper">
                Let&apos;s make something{" "}
                <span className="italic text-gold-bright">unforgettable</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-paper-dim">
                Every commission begins with a conversation. Tell me what you
                have in mind and I&apos;ll turn it into a one-of-a-kind work.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`mailto:${contact.email}`}
                  className="group relative overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink"
                >
                  <span className="relative z-10">Start a Commission</span>
                  <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                </a>
                <a
                  href={`tel:${contact.phone.replace(/[^0-9]/g, "")}`}
                  className="rounded-full border border-paper/20 px-8 py-4 text-sm uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
                >
                  {contact.phone}
                </a>
              </div>
            </Reveal>
          </div>

          <div className="space-y-px">
            {steps.map(([n, title, desc], i) => (
              <Reveal key={n} delay={i * 0.1}>
                <div className="group flex gap-6 border-t border-paper/10 py-8 transition-colors hover:bg-paper/[0.02]">
                  <span className="font-display text-3xl text-gold-bright">
                    {n}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-paper">{title}</h3>
                    <p className="mt-2 max-w-sm text-paper-dim">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
