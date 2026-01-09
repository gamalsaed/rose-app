import { cn } from "@/lib/utilits/cn"; //

interface StyledSectionHeaderProps {
  title: string;
  className?: string;
}

export default function StyledSectionHeader({
  title,
  className,
}: StyledSectionHeaderProps) {
  return (
    // Container
    <div className={cn("relative z-0 flex w-fit flex-col", className)}>
      {/* The Text */}
      <h2 className="relative z-10 font-[var(--font-sarabun)] text-[36px] font-bold leading-none text-maroon-700">
        {title}
      </h2>
      {/* Highlighter*/}
      <div className="absolute bottom-0 left-0 -z-10 h-[17px] w-2/3 rounded-r-[20px] bg-softPink-100" />

      {/* Underline */}
      <div className="mt-1 h-[2px] w-1/3 bg-softPink-600" />
    </div>
  );
}
