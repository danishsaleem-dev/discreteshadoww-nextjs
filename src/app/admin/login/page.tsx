"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  const field =
    "w-full rounded-sm border border-paper/15 bg-paper/[0.03] px-4 py-3 text-paper placeholder:text-paper-dim/60 outline-none transition-colors focus:border-gold/60";

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <p className="eyebrow mb-3 text-center">Discrete Shadow</p>
        <h1 className="mb-8 text-center font-display text-4xl font-light text-paper">
          Studio <span className="italic text-gold-bright">Admin</span>
        </h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={field}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={field}
          />
          {error && (
            <p className="text-sm text-clay">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold px-8 py-4 text-sm uppercase tracking-[0.2em] text-ink transition-colors hover:bg-gold-bright disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
