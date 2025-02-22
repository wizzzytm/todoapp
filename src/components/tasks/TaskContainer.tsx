"use client";
import { useState } from "react";
import Task, { TodoProps } from "./Task";
import Link from "next/link";
import { TaskMenu } from "../task-menu";
import { Input } from "../ui/input";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Card } from "../ui/card";

export default function TaskContainer({
  initialTodos,
}: {
  initialTodos: TodoProps[];
}) {
  const [todos, setTodos] = useState(initialTodos);
  const [searchTerm, setSearchTerm] = useState("");

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
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    }
  };

  const filteredTodos = todos.filter((todo) => {
    const lowerTerm = searchTerm.toLowerCase();
    return (
      todo.title.toLowerCase().includes(lowerTerm) ||
      todo.description.toLowerCase().includes(lowerTerm) ||
      todo.deadline.toLowerCase().includes(lowerTerm)
    );
  });

  var completedTodos = todos.filter((todo) => todo.completed);
  var percentage = Math.round((completedTodos.length / todos.length) * 100);

  return (
    <section className="md:w-7/12 w-full p-2">
      {todos.length > 0 ? (
        <>
          <Card className="flex flex-row items-center gap-2 p-4 md:mb-6 mb-4">
            <span>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                className="size-16"
                styles={{
                  path: {
                    stroke: "rgb(64, 150, 255)",
                  },
                  text: {
                    fill: "rgb(64, 150, 255)",
                  },
                }}
              />
            </span>
            <span className="text-xl">
              You have completed {completedTodos.length} out of {todos.length}{" "}
              tasks.
            </span>
          </Card>

          <Input
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for tasks..."
            className="md:mb-6 mb-4"
          />
          {filteredTodos.length === 0 ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
              <span className="text-lg text-center">
                No tasks found matching your search.
              </span>
            </div>
          ) : (
            filteredTodos.map((todo) => (
              <Task
                onComplete={handleComplete}
                onAddDelete={handleAddDelete}
                onEdit={handleEdit}
                key={todo.id}
                todo={todo}
              />
            ))
          )}
        </>
      ) : (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <span className="text-2xl text-center">
            You don't have any tasks yet.
          </span>
          <span className="text-center text-sm">
            Click{" "}
            <Link href="/add" className="underline italic">
              here
            </Link>{" "}
            or go to Task menu (right bottom corner) to add one.
          </span>
        </div>
      )}

      <div className="fixed bottom-4 right-4">
        <TaskMenu onAllDone={handleAllDone} onDelete={handleDelete} />
      </div>
    </section>
  );
}
