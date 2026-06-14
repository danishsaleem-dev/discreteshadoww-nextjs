"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Paintings", href: "#gallery" },
  { label: "Calligraphy", href: "#calligraphy" },
  { label: "Digital Art", href: "#digital" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#commission" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-paper/10 bg-ink/70 py-4 backdrop-blur-md"
          : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-display text-xl tracking-wide text-paper"
        >
          Discrete<span className="text-gold-bright">.</span>Shadow
        </a>

        <ul className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative text-xs uppercase tracking-[0.18em] text-paper-dim transition-colors hover:text-paper"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#commission"
          className="hidden rounded-full border border-gold/50 px-5 py-2 text-xs uppercase tracking-[0.18em] text-gold-bright transition-colors hover:bg-gold hover:text-ink lg:inline-block"
        >
          Custom Order
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`h-px w-6 bg-paper transition-transform ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-opacity ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-paper transition-transform ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden px-6 lg:hidden"
          >
            {links.map((l) => (
              <li key={l.href} className="border-b border-paper/10">
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl text-paper"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
