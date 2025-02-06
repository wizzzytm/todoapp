"use server";
import { createClient } from "@/app/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getName() {
  const supabase = await createClient();

  try {
    const { data } = await supabase
      .from("profiles")
      .select("first_name, last_name");

    if (data) {
      return data[0].last_name
        ? `${data[0].first_name} ${data[0].last_name}`
        : data[0].first_name;
    }
  } catch (error) {
    console.error(error);
  }
}
