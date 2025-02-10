"use client";

import * as React from "react";
import { PlusCircle, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import {
  UserRoundIcon as UserRoundPen,
  Github,
  Bug,
  ClipboardList,
} from "lucide-react";
import { ModeToggle } from "./ui/modetoggle";
import { ThemeProvider } from "./theme-provider";

export function BurgerMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "fixed bottom-4 left-4 md:top-4 md:right-4 md:left-auto md:bottom-auto z-50 rounded-full transition-all duration-300 hover:bg-accent",
            open && "rotate-180"
          )}
          aria-label="Open menu"
        >
          <Settings className="md:size-10 size-9" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className={cn(
          "h-[300px] md:h-full md:w-[400px] md:right-0 md:left-auto flex flex-col md:gap-1 gap-3",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0",
          "data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom",
          "md:data-[state=open]:slide-in-from-right md:data-[state=closed]:slide-out-to-right"
        )}
      >
        <SheetHeader>
          <SheetTitle className="md:text-3xl text-xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col md:place-items-baseline gap-1 md:gap-0 place-items-center [&>*]:flex [&>*]:items-center [&>*]:gap-3 text-lg flex-grow [&>*]:rounded-lg md:[&>*]:p-3  md:[&>*]:w-full hover:md:[&>*]:bg-muted ">
          <Link href="/profile" onClick={() => setOpen(false)}>
            <UserRoundPen />
            Profile
          </Link>
          <Link href="https://github.com/wizzzytm/todoapp" target="_blank">
            <Github />
            Github
          </Link>
          <Link
            href="https://github.com/wizzzytm/todoapp/issues/new"
            target="_blank"
          >
            <Bug />
            Report Issue
          </Link>{" "}
          <Link href="/add" onClick={() => setOpen(false)}>
            <PlusCircle />
            Add task
          </Link>
        </nav>
        <div className="mt-auto self-center ">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle />
          </ThemeProvider>
        </div>
      </SheetContent>
    </Sheet>
  );
}
