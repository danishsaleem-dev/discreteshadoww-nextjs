"use client";

import { socials, contact } from "@/lib/artworks";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 pb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Discrete Shadow</p>
            <a
              href={`mailto:${contact.email}`}
              className="font-display text-4xl leading-tight text-paper transition-colors hover:text-gold-bright md:text-6xl"
            >
              {contact.email}
            </a>
          </div>
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative text-sm uppercase tracking-[0.18em] text-paper-dim transition-colors hover:text-paper"
                >
                  {s.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* oversized wordmark */}
        <div className="border-t border-paper/10 py-10">
          <p className="font-display select-none text-center text-[18vw] leading-none text-paper/[0.05] md:text-[14vw]">
            Discrete Shadow
          </p>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-paper/10 py-8 text-xs uppercase tracking-[0.15em] text-paper-dim md:flex-row">
          <p>© {new Date().getFullYear()} Discrete Shadow · All rights reserved</p>
          <p>
            Turning moments into{" "}
            <span className="text-gold-bright">masterpieces</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
