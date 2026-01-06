"use client";
import React from "react";
import { cn } from "@/lib/utilits/cn";
import * as SelectPrimitive from "@radix-ui/react-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectorProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  error?: boolean;
  placeholder: string;
  className?: string;
  data: string[];
  value?: string;
  onValueChange?: (value: string) => void;
}

export function Selector({
  error,
  className,
  value = "",
  data = [],
  onValueChange,
  placeholder,
  ...props
}: SelectorProps) {
  // Ready to work with Controller Component
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          `${
            error && " border-red-600 dark:!border-red-500 "
          } w-full focus:border-maroon-600  text-zinc-400 disabled:bg-zinc-100 dark:bg-zinc-600 dark:border-zinc-700 dark:hover:border-zinc-500 dark:focus:border-softPink-400 dark:disabled:border-1 dark:disabled:bg-transparent dark:disabled:!border-zinc-700 disabled:border-transparent`,
          className
        )}
        {...props}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="text-zinc-400 border-none dark:bg-zinc-700">
        <SelectGroup>
          {data.map((item) => (
            <SelectItem key={item} value={item.toLowerCase()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
