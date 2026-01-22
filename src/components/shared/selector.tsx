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

interface SelectorProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  errorMessage?: string | undefined;
  label?: string;
  placeholder: string;
  className?: string;
  data: string[];
  value?: string;
  onValueChange?: (value: string) => void;
}

// must be controlled by controller component
// Accepts the data that ready to be selected
// Accepts the value from the controller component
// Error true or false

export function Selector({
  className,
  label,
  value = "",
  data = [],
  onValueChange,
  placeholder,
  errorMessage,
  ...props
}: SelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <div className="mb-1.5">{label}</div>
      <SelectTrigger
        className={cn(
          errorMessage &&
            errorMessage !== "register" &&
            " border-red-600 dark:!border-red-500 ",
          "w-full focus:border-maroon-600  text-zinc-400 disabled:bg-zinc-100 dark:bg-zinc-700 dark:border-zinc-600 dark:hover:border-zinc-500 dark:focus:border-softPink-400 dark:disabled:border-1 dark:disabled:bg-transparent dark:disabled:!border-zinc-700 disabled:border-transparent",
          className,
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
      <p className="text-red-600 dark:text-red-500 text-sm font-normal mt-1.5">
        {errorMessage && errorMessage !== "register" && errorMessage}
      </p>
    </Select>
  );
}
