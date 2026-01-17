import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utilits/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-xl  px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "text-white bg-maroon-600 dark:bg-softPink-300 dark:text-zinc-800",
        critical:
          "text-white bg-maroon-700 dark:bg-softPink-400 dark:text-zinc-800",
        alert:
          "text-maroon-600 bg-maroon-100 dark:bg-zinc-600 dark:text-softPink-300",
        warning:
          "text-maroon-600 bg-maroon-50 dark:bg-zinc-700 dark:text-softPink-300",
        subtle: "text-zinc-700 bg-zinc-200 dark:bg-zinc-600 dark:text-zinc-50",
        muted: "bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-50",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
