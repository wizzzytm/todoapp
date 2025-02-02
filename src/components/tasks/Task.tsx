import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlarmClock,
  AlarmClockCheck,
  AlarmClockOff,
  RedoDot,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import TaskOptions from "./TaskOptions";
import { parseDate } from "@/app/utils/formatTodo";
import clsx from "clsx";
import { updateTodo } from "@/app/libs/data";
import { toast } from "@/hooks/use-toast";

export interface TodoProps {
  id: string;
  created_at: string;
  completed: boolean;
  title: string;
  description: string;
  deadline: string;
}

export default function Task({
  todo,
  onDelete,
  onComplete,
  onEdit,
}: {
  todo: TodoProps;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
  onEdit: (id: string, updatedTodo: TodoProps) => void;
}) {
  const renderDeadline = () => {
    const date = new Date();
    date.setHours(1, 0, 0, 0);
    const isOverdue = new Date(parseDate(todo.deadline)) < date;

    if (todo.deadline === "") {
      return <span className="text-sm md:text-base">No deadline</span>;
    } else {
      if (todo.completed == false) {
        if (isOverdue) {
          return (
            <>
              <AlarmClockOff className="text-red-500 md:size-6 size-5" />
              <span className="italic flex flex-col text-sm text-red-500">
                {todo.deadline}
                <span className="text-xs">Task overdue!</span>
              </span>
            </>
          );
        } else {
          return (
            <>
              <AlarmClockCheck className="text-green-500 md:size-6 size-5" />
              <span className="italic text-sm ">{todo.deadline}</span>
            </>
          );
        }
      } else {
        return (
          <>
            <AlarmClock className="text-gray-500 md:size-6 size-5" />
            <span className="italic text-sm text-gray-300 flex flex-col">
              {todo.deadline}
              {isOverdue ? (
                <span className="text-xs">Not completed on time</span>
              ) : (
                ""
              )}
            </span>
          </>
        );
      }
    }
  };

  const handleComplete = async () => {
    try {
      onComplete(todo.id);

      const res = await updateTodo(todo, "completion");
      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.error("Error completing task:", error);

      toast({
        variant: "destructive",
        title: "Error  task",
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    }
  };
  return (
    <>
      <Card
        className={clsx(
          "flex md:flex-row w-full flex-col overflow-hidden my-2",
          {
            "line-through": todo.completed === true,
          }
        )}
      >
        <div className="md:flex hidden md:w-1/12  items-center justify-center bg-muted p-2">
          <Checkbox
            checked={todo.completed}
            onCheckedChange={handleComplete}
            id="completion"
            className="size-7"
          />
        </div>
        <div className="md:w-9/12 md:p-4 p-2 md:pl-6">
          <div className="flex justify-between">
            <CardTitle className="text-base md:text-xl">{todo.title}</CardTitle>
            <TaskOptions todo={todo} onDelete={onDelete} onEdit={onEdit} />
          </div>
          <Separator className="md:mt-2 mt-1 " />
          <span className="italic text-[0.65rem] text-muted-foreground">
            {todo.created_at}
          </span>
          <CardDescription>{todo.description}</CardDescription>
        </div>
        <div className="md:w-2/12 flex bg-muted justify-center  ">
          <div className="w-auto p-2 bg-muted text-center md:flex-col flex justify-center gap-1 items-center">
            {renderDeadline()}
          </div>

          <div className="md:hidden w-auto flex items-center justify-center bg-muted p-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={handleComplete}
              id="completion"
              className="size-4"
            />
          </div>
        </div>
      </Card>
    </>
  );
}
