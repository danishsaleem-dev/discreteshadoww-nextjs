import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { setCommissionStatus, deleteCommission } from "./actions";

export const dynamic = "force-dynamic";

type Commission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  art_type: string | null;
  size: string | null;
  budget: string | null;
  deadline: string | null;
  reference: string | null;
  message: string;
  status: string;
  created_at: string;
};

const statusStyle: Record<string, string> = {
  new: "border-gold/40 text-gold-bright",
  read: "border-paper/20 text-paper-dim",
  replied: "border-green-500/40 text-green-400",
  archived: "border-paper/10 text-paper-dim/60",
};

export default async function CommissionsPage() {
  let rows: Commission[] = [];
  let tableMissing = false;

  if (isSupabaseConfigured()) {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("commissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) tableMissing = true;
    else rows = (data ?? []) as Commission[];
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="eyebrow mb-1">Studio Admin</p>
          <h1 className="font-display text-3xl text-paper">
            Commission Requests{" "}
            <span className="text-paper-dim">({rows.length})</span>
          </h1>
        </div>
        <Link
          href="/admin"
          className="text-xs uppercase tracking-[0.18em] text-paper-dim transition-colors hover:text-paper"
        >
          ← Artworks
        </Link>
      </header>

      {tableMissing && (
        <div className="mb-8 rounded-sm border border-clay/40 bg-clay/10 p-5 text-sm text-paper">
          The <code className="text-gold-bright">commissions</code> table
          doesn&apos;t exist yet. Run{" "}
          <code className="text-gold-bright">supabase/commissions.sql</code> in
          the Supabase SQL editor to start collecting requests.
        </div>
      )}

      {!tableMissing && rows.length === 0 && (
        <p className="py-20 text-center text-paper-dim">
          No commission requests yet. They&apos;ll appear here as they come in.
        </p>
      )}

      <div className="space-y-4">
        {rows.map((c) => (
          <article
            key={c.id}
            className="rounded-sm border border-paper/10 bg-ink-soft/40 p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-3">
                  <h2 className="font-display text-xl text-paper">{c.name}</h2>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[0.6rem] uppercase tracking-wider ${
                      statusStyle[c.status] ?? statusStyle.read
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-paper-dim">
                  <a
                    href={`mailto:${c.email}`}
                    className="hover:text-gold-bright"
                  >
                    {c.email}
                  </a>
                  {c.phone ? ` · ${c.phone}` : ""}
                </p>
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-paper-dim">
                {new Date(c.created_at).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-4">
              {[
                ["Type", c.art_type],
                ["Size", c.size],
                ["Budget", c.budget],
                ["Needed by", c.deadline],
              ].map(([k, v]) =>
                v ? (
                  <div key={k as string}>
                    <dt className="text-[0.65rem] uppercase tracking-[0.15em] text-paper-dim">
                      {k}
                    </dt>
                    <dd className="text-paper">{v}</dd>
                  </div>
                ) : null
              )}
            </dl>

            <p className="mt-4 whitespace-pre-wrap text-sm text-paper-dim">
              {c.message}
            </p>

            {c.reference && (
              <p className="mt-3 text-sm">
                <span className="text-[0.65rem] uppercase tracking-[0.15em] text-paper-dim">
                  Reference:{" "}
                </span>
                <span className="break-all text-gold-bright">{c.reference}</span>
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-paper/10 pt-4">
              <a
                href={`mailto:${c.email}?subject=${encodeURIComponent(
                  "Re: your commission request — Discrete Shadow"
                )}`}
                className="rounded-full bg-gold px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-gold-bright"
              >
                Reply
              </a>
              {(["read", "replied", "archived"] as const).map((s) => (
                <form action={setCommissionStatus} key={s}>
                  <input type="hidden" name="id" value={c.id} />
                  <input type="hidden" name="status" value={s} />
                  <button className="rounded-full border border-paper/15 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-paper-dim transition-colors hover:border-gold/50 hover:text-paper">
                    Mark {s}
                  </button>
                </form>
              ))}
              <form action={deleteCommission} className="ml-auto">
                <input type="hidden" name="id" value={c.id} />
                <button className="rounded-full border border-paper/15 px-4 py-1.5 text-xs uppercase tracking-[0.15em] text-paper-dim transition-colors hover:border-clay hover:text-clay">
                  Delete
                </button>
              </form>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
