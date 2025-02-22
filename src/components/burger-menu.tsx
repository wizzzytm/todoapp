"use client";
import * as React from "react";
import {
  LogOut,
  UserRoundIcon as UserRoundPen,
  Github,
  Bug,
  Settings,
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
import { ThemeProvider } from "./theme-provider";
import { Button } from "./ui/button";
import { ModeToggle } from "./ui/modetoggle";

export function BurgerMenu() {
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className={cn(
            "fixed bottom-4 left-4 md:top-6 md:right-12 md:left-auto md:bottom-auto z-50 rounded-full transition-all duration-300 md:bg-transparent md:hover:bg-accent  p-2 bg-accent",
            open && "rotate-180"
          )}
          aria-label="Open menu"
        >
          <Settings className="md:size-10 size-9" />
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
          <SheetTitle className="md:text-3xl text-xl mb-4">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col md:place-items-baseline gap-1 md:gap-0 place-items-center [&>*]:flex [&>*]:items-center [&>*]:gap-3 text-lg flex-grow [&>*]:rounded-lg md:[&>*]:p-3 md:[&>*]:w-full hover:md:[&>*]:bg-muted">
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
          </Link>
        </nav>

        <div className="flex mt-auto mb-2 justify-center items-center gap-2">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ModeToggle />
          </ThemeProvider>
          <form action="/libs/signout" method="post">
            <Button variant="outline" className="md:h-10 mt-2 md:mt-0 h-8">
              <LogOut />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
