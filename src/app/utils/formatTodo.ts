import { TodoProps } from "@/components/tasks/Task";

export const formatTodo = (todo: TodoProps) => {
  return {
    ...todo,
    created_at: new Date(todo.created_at).toLocaleDateString("en-GB"),
    deadline: todo.deadline
      ? new Date(todo.deadline).toLocaleDateString("en-GB")
      : "",
  };
};

export const parseDate = (dateString: string): string => {
  const [day, month, year] = dateString.split("/");
  return `${year}-${month}-${day}`;
};
