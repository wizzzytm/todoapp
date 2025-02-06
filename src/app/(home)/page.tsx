import { Button } from "@/components/ui/button";
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
      <div className="grid grid-rows-[20px_1fr] justify-items-center min-h-screen pb-10 gap-8 pt-8  font-[family-name:var(--font-geist-sans)]">
        <span className="text-2xl font-bold">Welcome, {name}!</span>
        <TaskContainer initialTodos={todos} />

        <form action="/libs/signout" className="mt-10" method="post">
          <Button>Sign Out</Button>
        </form>
      </div>
    </>
  );
}
