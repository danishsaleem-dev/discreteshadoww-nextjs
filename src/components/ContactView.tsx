"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { contact, socials } from "@/lib/artworks";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const field =
  "w-full rounded-sm border border-paper/15 bg-paper/[0.03] px-4 py-3 text-paper placeholder:text-paper-dim/60 outline-none transition-colors focus:border-gold/60";

export default function ContactView() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `Name: ${f.get("name")}
Email: ${f.get("email")}
Phone: ${f.get("phone")}

${f.get("message")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(
      `Hello from ${f.get("name")}`
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const wa = `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
    "Hi! I found your art and would love to chat."
  )}`;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-40 md:px-12">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-4 top-24 select-none font-display text-[22vw] leading-none text-paper/[0.045]"
        >
          Say hi
        </span>
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6"
          >
            Contact
          </motion.p>
          <h1 className="font-display display-lg max-w-3xl font-light text-paper">
            Let&apos;s start a{" "}
            <span className="italic text-gold-bright">conversation</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-6 max-w-xl text-paper-dim"
          >
            Questions about a piece, a print or a custom commission? Reach out
            any way you like — I reply to every message personally.
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto mt-20 max-w-7xl px-6 pb-32 md:mt-28 md:px-12">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* methods */}
          <div className="space-y-px">
            {[
              ["Email", contact.email, `mailto:${contact.email}`, false],
              ["Phone", contact.phone, `tel:${contact.phone.replace(/[^0-9]/g, "")}`, false],
              ["WhatsApp", "Chat instantly", wa, true],
            ].map(([label, value, href, external], i) => (
              <Reveal key={label as string} delay={i * 0.08}>
                <a
                  href={href as string}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex items-center justify-between border-t border-paper/10 py-7 transition-colors hover:bg-paper/[0.02]"
                >
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-paper-dim">
                      {label}
                    </p>
                    <p className="mt-1 font-display text-2xl text-paper transition-colors group-hover:text-gold-bright md:text-3xl">
                      {value}
                    </p>
                  </div>
                  <span className="text-gold-bright transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.3}>
              <div className="border-t border-paper/10 pt-8">
                <p className="mb-4 text-xs uppercase tracking-[0.2em] text-paper-dim">
                  Follow the studio
                </p>
                <ul className="flex flex-wrap gap-x-7 gap-y-3">
                  {socials.map((s) => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative text-sm uppercase tracking-[0.16em] text-paper-dim transition-colors hover:text-paper"
                      >
                        {s.label}
                        <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-sm border border-paper/10 bg-ink-soft/40 p-7 md:p-9"
            >
              <h2 className="font-display text-2xl text-paper">
                Send a message
              </h2>
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <input name="name" required placeholder="Your name" className={field} />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className={field}
                  />
                </div>
                <input name="phone" placeholder="Phone (optional)" className={field} />
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="How can I help?"
                  className={field}
                />
                <button
                  type="submit"
                  className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink"
                >
                  <span className="relative z-10">
                    {sent ? "Opening your mail…" : "Send Message"}
                  </span>
                  <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                </button>
              </div>
              <p className="mt-5 text-center text-xs text-paper-dim">
                Looking for a custom piece?{" "}
                <Link href="/commission" className="text-gold-bright underline-offset-4 hover:underline">
                  Start a commission →
                </Link>
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
