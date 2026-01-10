import * as React from "react";

import { cn } from "@/lib/utilits/cn";

interface InputProps extends React.ComponentProps<"input"> {
  error?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `${
            error && " !border-red-600 dark:!border-red-500"
          }  flex h-9 w-full dark:bg-zinc-700 rounded-md text-zinc-800 dark:text-zinc-50  hover:border-zinc-400 focus:border-maroon-600    disabled:bg-zinc-100 dark:border-zinc-600 dark:hover:border-zinc-500 dark:focus:border-softPink-400 dark:disabled:border-1 dark:disabled:bg-transparent dark:disabled:!border-zinc-700 disabled:border-transparent text-sm font-normal border border-input bg-transparent px-3 py-1  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm spin-always`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
