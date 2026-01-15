import { useFormatter } from "next-intl";
import { cn } from "@/lib/utilits/cn";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type TestimonialCardProps = {
  name: string;
  quote: string;
  date: string;
  rating: number; // 0..5 (supports halves if you want later)
  avatarUrl?: string;
  className?: string;
};

export const TestimonialCard = ({
  className,
  name,
  quote,
  date,
  rating,
  avatarUrl,
}: TestimonialCardProps) => {
  // Translation
  const format = useFormatter();

  return (
    <div className={cn("relative w-96 h-full max-w-md p-8 pt-20", className)}>
      {/* Floating Avatar */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 ">
        <div className="rounded-full bg-white p-1 shadow-sm">
          <Avatar className="h-28 w-28">
            <AvatarImage src={avatarUrl} alt={name} className="object-cover" />

            <AvatarFallback className="text-2xl font-bold tracking-[0.18em]">
              {name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Card Content */}
      <Card className="h-full min-h-60 rounded-3xl shadow-[0_4px_50.5px_rgba(116,28,33,0.1)]">
        <CardContent className="flex flex-col items-center justify-center p-5 pt-14 h-full">
          {/* Name */}
          <h4 className="font-semibold text-zinc-800">{name}</h4>

          {/* Rating */}
          {/* TODO: Replace with StarRating Component */}
          <div className="mt-9 mb-2.5">
            <p className="text-sm font-semibold">
              Rating Placeholder:{" "}
              <span className="text-amber-400 font-bold">{rating}</span>
            </p>
          </div>

          {/* Quote */}
          <blockquote className="font-medium text-zinc-800">{quote}</blockquote>

          {/* Date */}
          <time className="text-xs font-medium text-zinc-400 mt-auto pt-6">
            {format.dateTime(new Date(date), "long-date")}
          </time>
        </CardContent>
      </Card>
    </div>
  );
};
