"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

async function requireUser() {
  const sb = await createClient();
  const {
    data: { user },
  } = await sb.auth.getUser();
  if (!user) redirect("/admin/login");
}

export async function setCommissionStatus(formData: FormData) {
  await requireUser();
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  await admin.from("commissions").update({ status }).eq("id", id);
  revalidatePath("/admin/commissions");
}

export async function deleteCommission(formData: FormData) {
  await requireUser();
  const admin = createAdminClient();
  const id = formData.get("id") as string;
  await admin.from("commissions").delete().eq("id", id);
  revalidatePath("/admin/commissions");
}
