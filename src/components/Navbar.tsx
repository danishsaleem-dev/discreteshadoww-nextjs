"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Paintings", href: "/paintings" },
  { label: "Calligraphy", href: "/calligraphy" },
  { label: "Digital Art", href: "/digital-art" },
  { label: "Sketches", href: "/sketches" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      // The bottom hairline is an inline box-shadow, not a border. A border's
      // colour falls back to `currentColor` (near-white) as it fades, which
      // flashed a white line when scrolling back to the top. A box-shadow has
      // an explicit colour in both states, so it fades cleanly to nothing.
      style={{
        boxShadow: scrolled
          ? "0 1px 0 0 rgba(243, 237, 225, 0.10)"
          : "0 1px 0 0 rgba(243, 237, 225, 0)",
      }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-ink/70 py-4 backdrop-blur-md" : "py-6"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          aria-label="Discrete Shadow — home"
          className="inline-flex items-center"
        >
          <span className="inline-flex items-center rounded-lg bg-white px-2.5 py-1.5 shadow-sm ring-1 ring-black/5">
            <Image
              src="/logo.webp"
              alt="Discrete Shadow"
              width={800}
              height={720}
              priority
              className="h-8 w-auto md:h-9"
            />
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`group relative text-xs uppercase tracking-[0.18em] transition-colors hover:text-paper ${
                  isActive(l.href) ? "text-paper" : "text-paper-dim"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 group-hover:w-full ${
                    isActive(l.href) ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/commission"
          className="hidden rounded-full border border-gold/50 px-5 py-2 text-xs uppercase tracking-[0.18em] text-gold-bright transition-colors hover:bg-gold hover:text-ink lg:inline-block"
        >
          Custom Order
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
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
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <ul className="px-6">
              {links.map((l) => (
                <li key={l.href} className="border-b border-paper/10">
                  <Link
                    href={l.href}
                    className="block py-4 font-display text-2xl text-paper"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="py-5">
                <Link
                  href="/commission"
                  className="inline-block rounded-full border border-gold/50 px-6 py-3 text-xs uppercase tracking-[0.18em] text-gold-bright"
                >
                  Custom Order
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
