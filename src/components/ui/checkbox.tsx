"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utilits/cn";

type CheckboxProps = React.ComponentPropsWithoutRef<
  typeof CheckboxPrimitive.Root
> & {
  error?: boolean;
};

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CheckboxProps
>(({ className, error = false, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      `grid place-content-center peer h-5 w-5 shrink-0 rounded-[8px] border
    ${error ? "border-red-600 dark:border-red-500" : "border-maroon-700 dark:border-softPink-300"}
    shadow focus-visible:outline-none
    focus-visible:shadow-[0_0_0_3px_rgba(128,0,32,0.25)]
    dark:focus-visible:shadow-[0_0_0_3px_rgba(255,182,193,0.25)]
    disabled:cursor-not-allowed disabled:opacity-50
    data-[state=checked]:bg-maroon-700 dark:data-[state=checked]:bg-softPink-300
    data-[state=checked]:text-primary-foreground dark:data-[state=checked]:text-black`,
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("grid place-content-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
