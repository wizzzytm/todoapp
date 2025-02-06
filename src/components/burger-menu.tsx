"use client";

import * as React from "react";
import { Settings } from "lucide-react";
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
  UserRoundPen,
  Github,
  Bug,
  ClipboardPlus,
  PowerOff,
} from "lucide-react";
import { ModeToggle } from "./ui/modetoggle";

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
          <Settings className="md:size-10  size-9" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className={cn(
          "h-[300px] md:h-full md:w-[400px] md:right-0 md:left-auto",
          "data-[state=open]:slide-in-from-top md:data-[state=open]:slide-in-from-right",
          "data-[state=closed]:slide-out-to-top md:data-[state=closed]:slide-out-to-right"
        )}
      >
        <SheetHeader>
          <SheetTitle className="md:text-2xl">Menu</SheetTitle>
        </SheetHeader>
        <nav className="md:flex md:flex-col grid grid-cols-2 gap-2 place-items-center">
          <Link href="#">Test</Link>
          <Link href="#">Test2</Link>
          <Link href="#">Test3</Link>
          <Link href="#">Test4</Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
