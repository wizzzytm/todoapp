import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getTodos } from "@/app/libs/data";

export default async function Home() {
  const todos = await getTodos();
  console.log(todos);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Siema</h2>
      <div className="flex w-1/2 h-fit flex-wrap p-6 mt-10">
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.title}</p>
          </div>
        ))}
      </div>
      <form action="/libs/signout" className="mt-10" method="post">
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
