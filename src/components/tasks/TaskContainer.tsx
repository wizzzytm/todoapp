"use client";
import { Suspense, useEffect, useState } from "react";
import Task, { TodoProps } from "./Task";

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
  const handleDelete = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
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

  return (
    <>
      <section className="md:w-7/12 w-full p-2">
        {todos.map((todo) => (
          <Task
            onComplete={handleComplete}
            onDelete={handleDelete}
            onEdit={handleEdit}
            key={todo.id}
            todo={todo}
          />
        ))}
      </section>
    </>
  );
}
