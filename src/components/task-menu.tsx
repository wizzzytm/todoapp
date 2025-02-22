"use client";
import * as React from "react";
import {
  ClipboardCheck,
  FileCog,
  LogOut,
  PlusCircle,
  Settings,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { deleteMultiple, markAllAsDone } from "@/app/libs/data";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { boolean } from "zod";

export function TaskMenu({
  onAllDone,
  onDelete,
}: {
  onAllDone: () => void;
  onDelete: (checked: boolean) => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(false);
  const handleAllDone = async () => {
    try {
      onAllDone();

      const res = await markAllAsDone();
      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.error("Error completing task:", error);

      toast({
        variant: "destructive",
        title: "Error task",
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    }
  };

  const handleDelete = async () => {
    try {
      onDelete(isChecked);
      setIsDialogOpen(false);

      const res = await deleteMultiple(isChecked);
      if (res?.error) {
        throw new Error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Error task",
        description: error instanceof Error ? error.message : "Unknown error",
        duration: 5000,
      });
    }
  };

  const [open, setOpen] = React.useState(false);
  const [side, setSide] = React.useState<"bottom" | "right">("bottom");

  React.useEffect(() => {
    const updateSide = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        setSide("right");
      } else {
        setSide("bottom");
      }
    };
    updateSide();
    window.addEventListener("resize", updateSide);

    return () => window.removeEventListener("resize", updateSide);
  }, []);

  return (
    <>
      <Sheet modal={false} open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            className={cn(
              "fixed right-4 bottom-4 md:right-12 md:bottom-6 z-50 rounded-full transition-all duration-300 md:bg-transparent md:hover:bg-accent p-2 bg-accent",
              open && "rotate-180"
            )}
            aria-label="Open menu"
          >
            <FileCog className="md:size-10 size-9" />
          </button>
        </SheetTrigger>
        <SheetContent
          side={side}
          className={cn(
            "h-[300px] md:h-full md:w-[400px] flex flex-col md:gap-1 gap-3",
            side === "bottom"
              ? "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom"
              : "data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
          )}
        >
          <SheetHeader>
            <SheetTitle className="md:text-3xl text-xl mb-4">
              Task menu
            </SheetTitle>
          </SheetHeader>

          <nav className="flex flex-col md:place-items-baseline gap-1 md:gap-0 place-items-center [&>*]:flex [&>*]:items-center [&>*]:gap-3 text-lg flex-grow [&>*]:rounded-lg md:[&>*]:p-3  md:[&>*]:w-full hover:md:[&>*]:bg-muted ">
            <Link href="/add" onClick={() => setOpen(false)}>
              <PlusCircle />
              Add task
            </Link>
            <Link onClick={() => setIsDialogOpen(true)} href="">
              <Trash2 />
              Delete tasks
            </Link>
            <Link onClick={handleAllDone} href="">
              <ClipboardCheck />
              Mark all as done
            </Link>{" "}
          </nav>
        </SheetContent>
      </Sheet>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader className="flex flex-col items-center">
            <DialogTitle>Select which to delete</DialogTitle>
            <DialogDescription className="flex items-center space-x-2">
              <Label htmlFor="deletaTasks">Completed tasks</Label>
              <Switch
                checked={isChecked}
                onCheckedChange={setIsChecked}
                id="deleteTasks"
              />
              <Label htmlFor="deletaTasks">All tasks</Label>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex flex-col items-center w-full gap-3">
              <Button onClick={handleDelete} className="btn-primary w-fit">
                Delete <Trash2 className="md:size-6" />
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
