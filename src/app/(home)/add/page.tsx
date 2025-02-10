"use client";
import { TodoProps } from "@/components/tasks/Task";
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
import { parseDate } from "@/app/utils/util";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { DatePicker } from "@/components/ui/datepicker";
import { format, getYear } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon, CirclePlus, HomeIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { addTodo } from "@/app/libs/data";
import Link from "next/link";
import clsx from "clsx";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .max(40, {
      message: "Title should be less than or equal to 40 characters",
    })
    .min(1, { message: "Title can't be empty" }),
  description: z
    .string()
    .trim()
    .max(300, {
      message: "Description should be less than or equal to 300 characters",
    })
    .optional(),
  deadline: z.date().nullable(),
});

export default function Page() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      deadline: null,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append(
        "description",
        values.description ? values.description : ""
      );
      formData.append(
        "deadline",
        values.deadline ? format(values.deadline, "yyyy-MM-dd") : ""
      );
      const res = await addTodo(formData);
      if (res?.error) {
        toast({
          variant: "destructive",
          title: "Could not add todo",
          description: res.error,
          duration: 3000,
        });
      } else if (res?.success) {
        toast({
          title: "Successfully added todo",
          duration: 3000,
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 3000,
      });
    }
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen pb-10 gap-8 pt-8 font-[family-name:var(--font-geist-sans)]">
      <span className="text-2xl font-bold">Add a new todo</span>
      <section>
        <Card className="flex md:flex-row w-full flex-col overflow-hidden my-2 p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="title">Title*</FormLabel>
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
                          className="resize-none min-h-[100px]"
                          onChange={(e) => {
                            const trimmedValue = e.target.value.trimStart();
                            if (trimmedValue.trim().length <= 300) {
                              field.onChange(e.target.value);
                            }
                          }}
                        />
                      </FormControl>
                      <p
                        className={clsx("text-xs text-muted-foreground", {
                          "text-red-500": field.value?.trim().length === 300,
                        })}
                      >
                        {field.value?.trim().length || 0}/300
                      </p>
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
              <div className="flex justify-center w-full flex-row gap-2">
                <Button type="reset" onClick={() => form.reset()}>
                  Clear
                </Button>
                <Button type="submit" className="">
                  Add todo
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </section>
      <div className="fixed bottom-4 right-4">
        <Link href="/">
          <HomeIcon className="md:size-10  size-9" />
        </Link>
      </div>
    </div>
  );
}
