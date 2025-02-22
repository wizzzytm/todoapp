import { TodoProps } from "@/components/tasks/Task";

export const formatTodo = (todo: TodoProps) => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
    new Date(todo.created_at)
  );
  return {
    ...todo,
    created_at: formattedDate,
    deadline: todo.deadline
      ? new Date(todo.deadline).toLocaleDateString("en-GB")
      : "",
  };
};

export const getBaseTitle = (title: string) => {
  return title.replace(/\s\(\d+\)$/, "");
};

export const parseDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};

export type ActionResponse<T = any> =
  | { success: true; data?: T }
  | { success: false; error: string };
