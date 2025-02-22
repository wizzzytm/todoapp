"use client";
import { Suspense, useEffect, useState } from "react";
import Task, { TodoProps } from "./Task";
import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { ModeToggle } from "../ui/modetoggle";
import { TaskMenu } from "../task-menu";

export default function TaskContainer({
  initialTodos,
}: {
  initialTodos: TodoProps[];
}) {
  const [todos, setTodos] = useState(initialTodos);

  const handleComplete = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleAddDelete = (id: string, todo?: TodoProps) => {
    if (todo) {
      setTodos((prevTodos) => [todo, ...prevTodos]);
    } else {
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }
  };

  const handleEdit = (id: string, updatedTodo: TodoProps) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...updatedTodo,
              deadline: updatedTodo.deadline
                ? new Date(updatedTodo.deadline).toLocaleDateString("en-GB")
                : "",
            }
          : todo
      )
    );
  };

  const handleAllDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: true }))
    );
  };
  const handleDelete = (checked: boolean) => {
    if (checked) {
      setTodos([]);
    } else {
      setTodos((prevTodos) =>
        prevTodos.filter((todo) => todo.completed == false)
      );
    }
  };

  return (
    <>
      <section className="md:w-7/12 w-full p-2">
        {todos.length == 0 ? (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <span className="text-2xl text-center">
              You don't have any tasks yet
            </span>
            <span className="text-center text-sm">
              Click{" "}
              <Link href="/add" className="underline italic">
                here
              </Link>{" "}
              or go to Task menu (right bottom corner) to add one.
            </span>
          </div>
        ) : (
          todos.map((todo) => (
            <Task
              onComplete={handleComplete}
              onAddDelete={handleAddDelete}
              onEdit={handleEdit}
              key={todo.id}
              todo={todo}
            />
          ))
        )}
        <div className="fixed bottom-4 right-4">
          <TaskMenu onAllDone={handleAllDone} onDelete={handleDelete} />
        </div>
      </section>
    </>
  );
}
