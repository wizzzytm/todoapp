import { getTodoById } from "@/app/libs/data";
import { formatTodo } from "@/app/utils/util";
import TaskDetails from "@/components/tasks/TaskDetails";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const todo = formatTodo(await getTodoById(id));
  return (
    <>
      <div className="grid grid-rows-[1fr] justify-items-center min-h-screen md:pb-10 md:pt-8 pt-4 font-[family-name:var(--font-geist-sans)]">
        <section className="md:w-7/12 w-full p-2">
          <TaskDetails todo={todo} />
          <div className="fixed bottom-4  md:bg-transparent md:hover:bg-accent p-2 bg-accent right-4 rounded-full">
            <Link href="/">
              <HomeIcon className="md:size-10  size-9" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
