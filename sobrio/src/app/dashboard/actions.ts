"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

export async function updateDailySavingsAction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const rawValue = formData.get("dailySavings");
  const parsed =
    typeof rawValue === "string" ? Number.parseFloat(rawValue) : Number.NaN;

  if (!Number.isFinite(parsed) || parsed <= 0) {
    revalidatePath("/dashboard");
    return;
  }

  const dailySavings = Number(parsed.toFixed(2));

  await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      dailySavings,
    },
  });

  revalidatePath("/dashboard");
}

export async function resetCycleAction() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  await supabase.auth.updateUser({
    data: {
      ...user.user_metadata,
      soberStartAt: new Date().toISOString(),
    },
  });

  revalidatePath("/dashboard");
}
