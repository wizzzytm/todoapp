import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getTodos() {
  let { data: todos, error } = await supabase.from("todos").select();

  if (error) {
    console.error("Error fetching todos:", error.message);
    return [];
  }

  console.log("Fetched todos:", todos);
  return todos;
}
