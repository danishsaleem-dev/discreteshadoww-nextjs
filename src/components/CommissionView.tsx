"use client";

import { useActionState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contact } from "@/lib/artworks";
import { submitCommission, type CommissionState } from "@/app/commission/actions";
import Reveal from "./Reveal";

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  ["01", "Tell the story", "Share the moment, subject or verse you want captured."],
  ["02", "Choose the medium", "Paint, calligraphy, digital or graphite — refined together with revisions."],
  ["03", "Receive the piece", "Hand-finished original or museum-grade print, shipped to your door."],
];

const field =
  "w-full rounded-sm border border-paper/15 bg-paper/[0.03] px-4 py-3 text-paper placeholder:text-paper-dim/60 outline-none transition-colors focus:border-gold/60";
const label = "mb-2 block text-xs uppercase tracking-[0.18em] text-paper-dim";

const initialState: CommissionState = { ok: false };

export default function CommissionView() {
  const [state, formAction, pending] = useActionState(
    submitCommission,
    initialState
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-40 md:px-12">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-gold/10 blur-[120px]" />
        <div className="pointer-events-none absolute -right-20 top-40 h-72 w-72 rounded-full bg-clay/10 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-6"
          >
            Custom Order
          </motion.p>
          <h1 className="font-display display-lg max-w-4xl font-light text-paper">
            Commission a piece{" "}
            <span className="italic text-gold-bright">made for you</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="mt-6 max-w-xl text-paper-dim"
          >
            A portrait, a verse in gold, a scene you can&apos;t forget — every
            commission begins with a conversation. Tell me what you have in mind
            and I&apos;ll turn it into a one-of-a-kind work.
          </motion.p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="mx-auto mt-20 max-w-7xl px-6 md:mt-24 md:px-12">
        <div className="grid gap-px sm:grid-cols-3">
          {steps.map(([n, title, desc], i) => (
            <Reveal key={n} delay={i * 0.1}>
              <div className="h-full border-t border-paper/10 py-8 sm:px-6">
                <span className="font-display text-3xl text-gold-bright">{n}</span>
                <h3 className="mt-3 font-display text-2xl text-paper">{title}</h3>
                <p className="mt-2 text-paper-dim">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto mt-20 max-w-3xl px-6 pb-32 md:mt-28">
        <AnimatePresence mode="wait">
          {state.ok ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="rounded-sm border border-gold/30 bg-ink-soft/60 p-10 text-center md:p-14"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40 text-3xl text-gold-bright">
                ✓
              </div>
              <h2 className="mt-6 font-display text-3xl text-paper md:text-4xl">
                Request received
              </h2>
              <p className="mx-auto mt-4 max-w-md text-paper-dim">
                Thank you — your commission request is in. I&apos;ll review the
                details and get back to you personally, usually within a day or
                two. Keep an eye on your inbox.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-paper/20 px-7 py-3 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-gold hover:text-gold-bright"
                >
                  Message on WhatsApp
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Reveal>
                <h2 className="font-display text-3xl font-light text-paper md:text-4xl">
                  Tell me about your{" "}
                  <span className="italic text-gold-bright">idea</span>
                </h2>
                <p className="mt-3 text-paper-dim">
                  The more detail the better — but don&apos;t worry if you&apos;re
                  still figuring it out.
                </p>
              </Reveal>

              <form action={formAction} className="mt-10 space-y-6">
                {/* honeypot */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="hidden"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={label} htmlFor="name">
                      Your name *
                    </label>
                    <input id="name" name="name" required className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="email">
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="phone">
                      Phone / WhatsApp
                    </label>
                    <input id="phone" name="phone" className={field} />
                  </div>
                  <div>
                    <label className={label} htmlFor="art_type">
                      Type of artwork
                    </label>
                    <select
                      id="art_type"
                      name="art_type"
                      defaultValue="Painting"
                      className={field}
                    >
                      {[
                        "Painting",
                        "Calligraphy",
                        "Digital Art",
                        "Sketch / Portrait",
                        "Not sure yet",
                      ].map((o) => (
                        <option key={o} value={o} className="bg-ink">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label} htmlFor="size">
                      Size / format
                    </label>
                    <input
                      id="size"
                      name="size"
                      placeholder="e.g. A3, 40×40 cm, large canvas"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="budget">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      defaultValue="Not sure"
                      className={field}
                    >
                      {[
                        "Not sure",
                        "Under $100",
                        "$100 – $300",
                        "$300 – $600",
                        "$600 – $1000",
                        "$1000+",
                      ].map((o) => (
                        <option key={o} value={o} className="bg-ink">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label} htmlFor="deadline">
                      Needed by
                    </label>
                    <input
                      id="deadline"
                      name="deadline"
                      placeholder="e.g. no rush, or a specific date"
                      className={field}
                    />
                  </div>
                  <div>
                    <label className={label} htmlFor="reference">
                      Reference link
                    </label>
                    <input
                      id="reference"
                      name="reference"
                      placeholder="Pinterest, a photo link, etc."
                      className={field}
                    />
                  </div>
                </div>

                <div>
                  <label className={label} htmlFor="message">
                    Describe your vision *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Who or what is it for? Any colours, mood, words or photos you have in mind…"
                    className={field}
                  />
                </div>

                {state.error && (
                  <p className="rounded-sm border border-clay/40 bg-clay/10 px-4 py-3 text-sm text-paper">
                    {state.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={pending}
                  className="group relative w-full overflow-hidden rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink disabled:opacity-60 sm:w-auto sm:px-12"
                >
                  <span className="relative z-10">
                    {pending ? "Sending…" : "Submit Request"}
                  </span>
                  <span className="absolute inset-0 translate-y-full bg-gold-bright transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0" />
                </button>

                <p className="text-xs text-paper-dim">
                  Prefer email? Reach me anytime at{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-gold-bright underline-offset-4 hover:underline"
                  >
                    {contact.email}
                  </a>
                  .
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
