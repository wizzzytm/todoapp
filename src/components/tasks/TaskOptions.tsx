"use client";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

import { TodoProps } from "@/components/tasks/Task";
import {
  Ellipsis,
  Pencil,
  Copy,
  Trash2,
  ExternalLink,
  CalendarIcon,
} from "lucide-react";
import { useState } from "react";
import { deleteTodo, updateTodo } from "@/app/libs/data";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { parseDate } from "@/app/utils/formatTodo";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

import { DatePicker } from "@/components/ui/datepicker";
import { format, getYear } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  title: z.string().max(40, {
    message: "Title should be less than or equal to 40 characters",
  }),
  description: z
    .string()
    .max(300, {
      message: "Description should be less than or equal to 300 characters",
    })
    .optional(),
  deadline: z.date().nullable(),
});

export default function TaskOptions({
  todo,
  onDelete,
  onEdit,
}: {
  todo: TodoProps;
  onDelete: (id: string, todo?: TodoProps) => void;
  onEdit: (id: string, updatedTodo: TodoProps) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: todo.title,
      description: todo.description,
      deadline: todo.deadline ? new Date(parseDate(todo.deadline)) : null,
    },
  });

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);

  const handleDelete = async () => {
    try {
      onDelete(todo.id);

      const res = await deleteTodo(todo.id);
      if (res?.error) {
        throw new Error(res.error);
      }

      toast({
        title: "Task deleted successfully",
        duration: 5000,
      });

      setIsAlertDialogOpen(false);
    } catch (error) {
      console.error("Error deleting task:", error);

      toast({
        variant: "destructive",
        title: "Error deleting task",
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    }
  };

  const handleUpdate = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatedTodo = {
        ...todo,
        title: values.title,
        description: values.description || "",
        deadline: values.deadline ? format(values.deadline, "yyyy-MM-dd") : "",
      };
      onEdit(todo.id, updatedTodo);

      const res = await updateTodo(updatedTodo, "edit");
      if (res?.error) {
        throw new Error(res.error);
      }

      toast({
        title: "Task updated successfully",
        duration: 5000,
      });

      setIsEditDialogOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Ellipsis className="mr-1 cursor-pointer" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
            Edit task
            <DropdownMenuShortcut>
              <Pencil size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Duplicate
            <DropdownMenuShortcut>
              <Copy size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            See details
            <DropdownMenuShortcut>
              <ExternalLink size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-700 font-bold"
            onClick={() => setIsAlertDialogOpen(true)}
          >
            Delete task
            <DropdownMenuShortcut>
              <Trash2 size={18} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit todo</DialogTitle>
            <DialogDescription>
              Make changes to your todo here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleUpdate)}
              className="space-y-8"
            >
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="title">Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          id="title"
                          value={field.value}
                          placeholder="Todo name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="description">Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          id="description"
                          placeholder="Todo description"
                          value={field.value || ""}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="deadline">Deadline</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[280px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />

                              {field.value instanceof Date &&
                              !isNaN(field.value.getTime()) ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <DatePicker
                              captionLayout="dropdown-buttons"
                              mode="single"
                              fromYear={getYear(new Date()) - 100}
                              toYear={getYear(new Date()) + 100}
                              defaultMonth={new Date()}
                              selected={field.value || undefined}
                              onSelect={(date) => {
                                if (
                                  date &&
                                  field.value &&
                                  date.getTime() === field.value.getTime()
                                ) {
                                  field.onChange(null);
                                } else {
                                  field.onChange(date ?? null);
                                }
                              }}
                            />
                            <div className="flex  p-2 pt-0 items-center flex-row">
                              <Button
                                variant="ghost"
                                onClick={() => field.onChange(new Date())}
                                className="text-green-500 w-1/2"
                              >
                                Today
                              </Button>

                              <Button
                                variant="ghost"
                                onClick={() => field.onChange(null)}
                                className="text-red-500  w-1/2"
                              >
                                Clear Date
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter>
                <div className="flex justify-center w-full flex-row gap-2">
                  <Button
                    onClick={() => setIsEditDialogOpen(false)}
                    className="btn-secondary"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="btn-primary">
                    Save
                  </Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task: <strong>{todo.title}</strong>.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <button
              onClick={() => setIsAlertDialogOpen(false)}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleDelete} className="btn-danger">
              Delete
            </button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
