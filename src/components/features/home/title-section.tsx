import { cn } from "@/lib/utilits/cn";
import { ElementType } from "react";

type SectionTitleProps = {
  label: string;
  title: string;
  className?: string;
  titleClassName?: string;
  labelClassName?: string;
  component?: ElementType;
};

// HeadingStyle
export function HeadingStyle({
  heading,
  className,
  component: Component = "h2",
}: {
  heading: string;
  className?: string;
  component?: ElementType;
}) {
  return (
    <Component
      className={cn(
        "relative  text-4xl font-bold text-maroon-700 dark:text-softPink-200 ",
        "before:content-[''] before:absolute before:z-[-1] before:bottom-0 before:left-0 before:w-[402px] before:h-[17px] before:rounded-tr-[20px] before:rounded-br-[20px] before:bg-softPink-100 before:dark:bg-zinc-700 rtl:before:right-0 rtl:before:left-auto rtl:before:rounded-tr-none rtl:before:rounded-br-none",
        "after:content-[''] after:absolute after:z-[1] after:left-0 after:bottom-0 after:w-[157px] after:h-0.5 after:bg-softPink-600 after:dark:bg-softPink-500 rtl:after:right-0 rtl:after:left-auto rtl:before:rounded-tl-[20px] rtl:before:rounded-bl-[20px]",
        className,
      )}
      // rtl:before:right-0 rtl:before:left-auto rtl:after:right-0 rtl:after:left-auto
    >
      {heading}
    </Component>
  );
}

// SectionTitle
export default function SectionTitle({
  label,
  title,
  className,
  titleClassName,
  labelClassName,
  component = "h2",
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2.5 text-center mb-11",
        className,
      )}
    >
      <SectionTitleLabel label={label} className={labelClassName} />
      <HeadingStyle
        component={component}
        heading={title}
        className={titleClassName}
      />
    </div>
  );
}

// SectionTitleLabel
export function SectionTitleLabel({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "text-softPink-500 dark:text-maroon-400 uppercase tracking-[0.25em] font-bold",
        className,
      )}
    >
      {label}
    </span>
  );
}
