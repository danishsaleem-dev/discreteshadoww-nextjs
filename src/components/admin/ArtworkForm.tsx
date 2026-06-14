"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { saveArtwork } from "@/app/admin/actions";
import { CATEGORIES, type ArtworkRow } from "@/lib/supabase/types";

const field =
  "w-full rounded-sm border border-paper/15 bg-paper/[0.03] px-4 py-3 text-paper placeholder:text-paper-dim/50 outline-none transition-colors focus:border-gold/60";
const label = "mb-2 block text-xs uppercase tracking-[0.18em] text-paper-dim";

export default function ArtworkForm({ artwork }: { artwork?: ArtworkRow }) {
  const [kept, setKept] = useState<string[]>(artwork?.images ?? []);
  const editing = !!artwork;

  return (
    <form
      action={saveArtwork}
      className="mx-auto max-w-3xl px-6 py-10 space-y-8"
    >
      <header className="flex items-center justify-between">
        <div>
          <Link
            href="/admin"
            className="text-xs uppercase tracking-[0.18em] text-paper-dim hover:text-paper"
          >
            ← Back
          </Link>
          <h1 className="mt-2 font-display text-3xl text-paper">
            {editing ? "Edit artwork" : "New artwork"}
          </h1>
        </div>
      </header>

      {editing && <input type="hidden" name="id" value={artwork.id} />}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label}>Title *</label>
          <input
            name="title"
            required
            defaultValue={artwork?.title}
            className={field}
          />
        </div>
        <div>
          <label className={label}>Slug (auto if blank)</label>
          <input
            name="slug"
            defaultValue={artwork?.slug}
            placeholder="the-dragon-flame"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Category</label>
          <select
            name="category"
            defaultValue={artwork?.category ?? "Painting"}
            className={field}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-ink">
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Medium</label>
          <input
            name="medium"
            defaultValue={artwork?.medium}
            placeholder="Acrylic on canvas"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Size</label>
          <input
            name="size"
            defaultValue={artwork?.size}
            placeholder="A4 · 21 × 29.7 cm"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Year</label>
          <input name="year" defaultValue={artwork?.year} className={field} />
        </div>
        <div>
          <label className={label}>Sort order</label>
          <input
            name="sort_order"
            type="number"
            defaultValue={artwork?.sort_order ?? 0}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Quote</label>
          <input
            name="quote"
            defaultValue={artwork?.quote ?? ""}
            placeholder="Set your heart ablaze… — Rengoku"
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={artwork?.description}
            className={field}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={label}>YouTube link or ID</label>
          <input
            name="video"
            defaultValue={artwork?.video ?? ""}
            placeholder="https://youtu.be/…"
            className={field}
          />
        </div>
        <div>
          <label className={label}>Accent colour</label>
          <input
            name="accent_color"
            defaultValue={artwork?.accent_color ?? ""}
            placeholder="rgb(151,47,4)"
            className={field}
          />
        </div>
      </div>

      {/* flags */}
      <div className="flex flex-wrap gap-6">
        {(
          [
            ["available", "Available", artwork ? artwork.available : true],
            ["featured", "Featured", artwork?.featured ?? false],
            ["is_print", "Print available", artwork?.is_print ?? false],
          ] as const
        ).map(([name, text, checked]) => (
          <label key={name} className="flex items-center gap-2 text-sm text-paper">
            <input
              type="checkbox"
              name={name}
              defaultChecked={checked}
              className="h-4 w-4 accent-gold"
            />
            {text}
          </label>
        ))}
      </div>

      {/* images */}
      <div>
        <label className={label}>Images (first is the cover)</label>
        {kept.length > 0 && (
          <div className="mb-4 grid grid-cols-3 gap-3 sm:grid-cols-5">
            {kept.map((url) => (
              <div
                key={url}
                className="relative aspect-[3/4] overflow-hidden rounded-sm border border-paper/10"
              >
                <input type="hidden" name="keepImages" value={url} />
                <Image src={url} alt="" fill sizes="20vw" className="object-cover" />
                <button
                  type="button"
                  onClick={() => setKept((k) => k.filter((u) => u !== url))}
                  className="absolute right-1 top-1 rounded-full bg-ink/80 px-2 py-0.5 text-xs text-paper hover:bg-clay"
                  aria-label="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          name="newImages"
          multiple
          accept="image/*"
          className="block w-full text-sm text-paper-dim file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-gold file:px-4 file:py-2 file:text-xs file:uppercase file:tracking-[0.15em] file:text-ink hover:file:bg-gold-bright"
        />
        <p className="mt-2 text-xs text-paper-dim">
          New files upload to Supabase Storage on save.
        </p>
      </div>

      <div className="flex items-center gap-4 border-t border-paper/10 pt-6">
        <button
          type="submit"
          className="rounded-full bg-gold px-8 py-3 text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-bright"
        >
          {editing ? "Save changes" : "Create artwork"}
        </button>
        <Link
          href="/admin"
          className="text-sm uppercase tracking-[0.2em] text-paper-dim hover:text-paper"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
