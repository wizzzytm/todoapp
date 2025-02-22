"use server";

import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  return { success: true };
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const fullName = formData.get("name") as string;
  const [first_name, ...lastNameParts] = fullName.split(" ");
  const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : null;
  const dataSignup = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  const { error } = await supabase.auth.signUp({
    ...dataSignup,
    options: { data: { first_name, last_name } },
  });
  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true };
}

export async function forgot(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://todoapp-kolek.vercel.app/auth/reset",
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}

export async function reset(formData: FormData) {
  const supabase = await createClient();
  const newPassword = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    return { error: error.message };
  }
  return { success: true };
}
