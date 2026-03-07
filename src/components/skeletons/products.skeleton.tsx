import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utilits/cn';

type Props = {
  count?: number;
  className?: string;
};

export default function ProductSkeleton({ count = 6, className }: Props) {
  return (
    <div className={cn("grid grid-cols-3 gap-4 mt-20", className)}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border p-4 space-y-3"
        >
          <Skeleton className="h-40 w-full rounded-lg bg-zinc-200 dark:bg-zinc-700" />
          <Skeleton className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700" />
          <Skeleton className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-700" />
          <Skeleton className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-700" />
        </div>
      ))}
    </div>
  );
}
