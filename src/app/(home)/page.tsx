import { getTodos } from "@/app/libs/data";
import { formatTodo } from "../utils/util";
import TaskContainer from "@/components/tasks/TaskContainer";
import { getName } from "@/app/libs/user";

export default async function Home() {
  const todosRaw = await getTodos();
  const todos = todosRaw.map(formatTodo);
  const name = await getName();

  return (
    <>
      <div className="grid grid-rows-[40px_1fr] justify-items-center min-h-screen pb-10 gap-8 pt-8  font-[family-name:var(--font-geist-sans)]">
        <div className="text-3xl font-bold  md:w-full md:pl-12">
          Welcome, {name}!
        </div>
        <TaskContainer initialTodos={todos} />
      </div>
    </>
  );
}
