import { ElementType } from "react";
import { cn } from "@/lib/utilits/cn";

interface SectionTitleProps {
  title: string;
  className?: string;
  as?: ElementType; // * use the proper header element for better SEO, default is h2
}

export const SectionTitle = ({
  title,
  className,
  as: Component = "h2",
}: SectionTitleProps) => {
  return (
    <Component
      className={cn(
        "relative isolate text-4xl font-bold text-maroon-700 dark:text-softPink-200 before:content-[''] before:absolute before:start-0 before:-bottom-0.5 before:h-4 before:w-[70%]  before:rounded-e-full before:bg-softPink-100 before:dark:bg-zinc-700  before:-z-10 after:content-[''] after:absolute after:start-0 after:-bottom-0.5 after:h-0.5 after:w-[30%] after:bg-softPink-600 after:dark:bg-softPink-500  after:-z-10",
        className
      )}
    >
      {title}
    </Component>
  );
};
