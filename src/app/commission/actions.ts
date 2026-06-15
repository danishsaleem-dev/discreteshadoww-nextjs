"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export type CommissionState = { ok: boolean; error?: string };

const FALLBACK_EMAIL = "info@discreteshadoww.com";

export async function submitCommission(
  _prev: CommissionState,
  formData: FormData
): Promise<CommissionState> {
  const name = ((formData.get("name") as string) || "").trim();
  const email = ((formData.get("email") as string) || "").trim();
  const message = ((formData.get("message") as string) || "").trim();

  if (!name || !email || !message) {
    return {
      ok: false,
      error: "Please add your name, email and a short description of your idea.",
    };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { ok: false, error: "That email doesn't look right — please double-check it." };
  }

  // Honeypot — bots fill hidden fields, humans don't.
  if (((formData.get("company") as string) || "").trim()) {
    return { ok: true };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      error: `The request system isn't connected yet. Please email ${FALLBACK_EMAIL} directly.`,
    };
  }

  try {
    const admin = createAdminClient();
    const { error } = await admin.from("commissions").insert({
      name,
      email,
      phone: ((formData.get("phone") as string) || "").trim() || null,
      art_type: ((formData.get("art_type") as string) || "").trim() || null,
      size: ((formData.get("size") as string) || "").trim() || null,
      budget: ((formData.get("budget") as string) || "").trim() || null,
      deadline: ((formData.get("deadline") as string) || "").trim() || null,
      reference: ((formData.get("reference") as string) || "").trim() || null,
      message,
    });
    if (error) throw error;
  } catch {
    return {
      ok: false,
      error: `Something went wrong saving your request. Please email ${FALLBACK_EMAIL} and I'll get right back to you.`,
    };
  }

  revalidatePath("/admin/commissions");
  return { ok: true };
}
