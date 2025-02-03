import { getTodoById } from "@/app/libs/data";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const todo = await getTodoById(id);
  return <>{todo.title}</>;
}
