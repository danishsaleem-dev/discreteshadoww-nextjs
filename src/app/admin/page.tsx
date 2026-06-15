import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import type { ArtworkRow } from "@/lib/supabase/types";
import { deleteArtwork, signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const sb = await createClient();
  const { data } = await sb
    .from("artworks")
    .select("*")
    .order("sort_order", { ascending: true });
  const artworks = (data ?? []) as ArtworkRow[];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Studio Admin</p>
          <h1 className="font-display text-3xl text-paper">
            Artworks{" "}
            <span className="text-paper-dim">({artworks.length})</span>
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.18em] text-paper-dim transition-colors hover:text-paper"
          >
            View site ↗
          </Link>
          <Link
            href="/admin/commissions"
            className="rounded-full border border-paper/20 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-paper-dim transition-colors hover:border-gold/50 hover:text-paper"
          >
            Requests
          </Link>
          <Link
            href="/admin/new"
            className="rounded-full bg-gold px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-ink transition-colors hover:bg-gold-bright"
          >
            + New artwork
          </Link>
          <form action={signOut}>
            <button className="rounded-full border border-paper/20 px-5 py-2.5 text-xs uppercase tracking-[0.18em] text-paper-dim transition-colors hover:border-clay hover:text-paper">
              Sign out
            </button>
          </form>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {artworks.map((a) => (
          <div
            key={a.id}
            className="group overflow-hidden rounded-sm border border-paper/10 bg-ink-soft"
          >
            <div className="relative aspect-[3/4]">
              {a.images?.[0] ? (
                <Image
                  src={a.images[0]}
                  alt={a.title}
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-paper-dim">
                  No image
                </div>
              )}
              <div className="absolute left-2 top-2 flex gap-1">
                {a.featured && (
                  <span className="rounded-full bg-gold px-2 py-0.5 text-[0.55rem] uppercase tracking-wider text-ink">
                    Featured
                  </span>
                )}
                {!a.available && (
                  <span className="rounded-full bg-clay px-2 py-0.5 text-[0.55rem] uppercase tracking-wider text-paper">
                    Sold
                  </span>
                )}
              </div>
            </div>
            <div className="p-3">
              <p className="truncate font-display text-lg text-paper">
                {a.title}
              </p>
              <p className="text-[0.65rem] uppercase tracking-[0.15em] text-paper-dim">
                {a.category} · {a.images?.length ?? 0} img
                {(a.images?.length ?? 0) === 1 ? "" : "s"}
                {a.video ? " · ▶" : ""}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <Link
                  href={`/admin/edit/${a.id}`}
                  className="flex-1 rounded-sm border border-paper/15 py-1.5 text-center text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:border-gold/60 hover:text-gold-bright"
                >
                  Edit
                </Link>
                <form action={deleteArtwork}>
                  <input type="hidden" name="id" value={a.id} />
                  <button className="rounded-sm border border-paper/15 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-paper-dim transition-colors hover:border-clay hover:text-clay">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
