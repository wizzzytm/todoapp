"use server";
import { createClient } from "@/app/utils/supabase/server";
import { TodoProps } from "@/components/tasks/Task";
import { revalidatePath } from "next/cache";

export async function getTodos() {
  const supabase = await createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data: todos, error: todosError } = await supabase
      .from("todos")
      .select()
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (todosError)
      throw new Error("Error fetching todos: " + todosError.message);

    return todos || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateTodo(todo: TodoProps, action: string) {
  const supabase = await createClient();
  try {
    if (action == "completion") {
      const { error } = await supabase
        .from("todos")
        .update({ completed: !todo.completed })
        .eq("id", todo.id);
      if (error) {
        return { error: error.message };
      }
      revalidatePath("/");
      return { success: true };
    } else if (action == "edit") {
      const { error } = await supabase
        .from("todos")
        .update({
          title: todo.title,
          description: todo.description,
          deadline: todo.deadline || null,
        })
        .eq("id", todo.id);
      if (error) {
        return { error: error.message };
      }
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTodo(todoId: string) {
  const supabase = await createClient();
  try {
    const { error } = await supabase.from("todos").delete().eq("id", todoId);
    if (error) {
      return { error: error.message };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}

export async function addTodo(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const todo = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    deadline: formData.get("deadline") ? formData.get("deadline") : null,
    user_id: user?.id,

    completed: false,
  };
  try {
    const { error } = await supabase.from("todos").insert([todo]);
    if (error) {
      return { error: error.message };
    }
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log(error);
  }
}
