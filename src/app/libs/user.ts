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

export async function changeName(formData: FormData) {
  const supabase = await createClient();
  const fullName = formData.get("name") as string;
  const [first_name, ...lastNameParts] = fullName.split(" ");
  const last_name = lastNameParts.length > 0 ? lastNameParts.join(" ") : null;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { error } = await supabase
      .from("profiles")
      .update({ first_name: first_name, last_name: last_name })
      .eq("id", user?.id);
    if (error) {
      return { error: error.message };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}
