"use server";
import { createClient } from "@/app/utils/supabase/server";

// export async function getTodos() {
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   console.log(`!!!!! USER: ${user} !!!!!`);
//   let { data: todos, error } = await supabase.from("todos").select();

//   if (error) {
//     console.error("Error fetching todos:", error.message);
//     return [];
//   }

//   console.log("Fetched todos:", todos);
//   return todos;
// }

export async function getTodos() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: todos, error: todosError } = await supabase
      .from("todos")
      .select()
      .eq("user_id", user?.id);

    if (todosError)
      throw new Error("Error fetching todos: " + todosError.message);

    return todos || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
