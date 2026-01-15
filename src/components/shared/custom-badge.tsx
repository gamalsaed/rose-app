import React from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utilits/cn"; 

interface CustomBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "secondary"; 
}

export default function CustomBadge({
  children,
  className,
  variant = "secondary",
  ...props
}: CustomBadgeProps) {
  return (
    <Badge
      variant={variant}
      className={cn(
        "bg-maroon-50 text-maroon-600 text-xs font-medium px-2 py-[2px] rounded-full capitalize",
        className
      )}
      {...props}
    >
      {children}
    </Badge>
  );
}
