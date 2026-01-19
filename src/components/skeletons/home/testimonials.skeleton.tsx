import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSkeleton() {
  return (
    <div className="flex">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="relative w-96 h-full max-w-md p-8 pt-20">
          {/* Floating Avatar */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <div className="rounded-full p-1 shadow-sm bg-white">
              <Skeleton className="h-28 w-28 rounded-full" />
            </div>
          </div>

          {/* Card Content */}
          <Card className="h-full min-h-60 rounded-3xl shadow-[0_4px_50.5px_rgba(116,28,33,0.1)]">
            <CardContent className="flex flex-col items-center justify-center p-5 pt-14 h-full">
              {/* Name */}
              <Skeleton className="h-4 w-24 rounded-full" />

              {/* Rating */}
              <div className="mt-9 mb-2.5"></div>

              {/* Quote */}
              <blockquote className="space-y-2">
                <Skeleton className="h-3 w-[250px]" />
                <Skeleton className="h-3 w-[250px]" />
                <Skeleton className="h-3 w-[200px]" />
              </blockquote>

              {/* Date */}
              <time className="mt-auto pt-6">
                <Skeleton className="h-4 w-24 rounded-full" />
              </time>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
