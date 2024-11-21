"use client";

import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { useForwardedRef } from "@/lib/use-forwarded-ref";
import type { ButtonProps } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Paintbrush } from "lucide-react";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
            disabled={disabled}
            onBlur={onBlur}
          >
            <div className="flex items-center gap-2">
              <div
                className="h-4 w-4 rounded-full border border-gray-200"
                style={{ backgroundColor: parsedValue }}
              />
              <span>{parsedValue}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3">
          <HexColorPicker color={parsedValue} onChange={onChange} />
          <div className="mt-3 flex items-center gap-2">
            <div
              className="h-8 w-8 rounded-md border border-gray-200"
              style={{ backgroundColor: parsedValue }}
            />
            <Input
              maxLength={7}
              onChange={(e) => {
                onChange(e?.currentTarget?.value);
              }}
              ref={ref}
              value={parsedValue}
              className="h-8"
            />
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
