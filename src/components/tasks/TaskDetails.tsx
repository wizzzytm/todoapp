import Link from "next/link";
import { TodoProps } from "./Task";
import { Check, HomeIcon, X, XIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { parseDate } from "@/app/utils/util";

export default function TaskDetails({ todo }: { todo: TodoProps }) {
  const date = new Date();
  date.setHours(1, 0, 0, 0);
  const isOverdue = new Date(parseDate(todo.deadline)) < date;

  return (
    <Card className="mx-4">
      <CardHeader className="flex pb-2">
        <CardTitle>{todo.title}</CardTitle>
        <CardDescription>ID: {todo.id}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className="pt-2">
        <div className="p-1">Description: {todo.description}</div>
        <Separator />

        <div className="p-1">
          Deadline:{" "}
          {todo.deadline ? (
            todo.deadline
          ) : (
            <div className="inline-flex items-center space-x-1">
              <span>No deadline</span>
              <X className="md:size-5" />
            </div>
          )}
        </div>
        <Separator />

        <div className="p-1">Created At: {todo.created_at}</div>
        <Separator />

        <div className="p-1">
          Completed:{" "}
          {todo.completed == true ? (
            <div className="inline-flex items-center space-x-1">
              <span>Yes</span>
              <Check className="md:size-5" />
              {isOverdue == true ? (
                <span>(Not on time)</span>
              ) : (
                <span>(On time)</span>
              )}
            </div>
          ) : (
            <div className="inline-flex items-center space-x-1">
              <span>No</span>
              <X className="md:size-5" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
