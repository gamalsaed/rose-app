import { Star } from "lucide-react";
import { cn } from "@/lib/utilits/cn";

// A simple star rating component that displays filled and empty stars based on the rating prop
interface StarRatingProps {
  rating: number;
}

// Displays a star rating out of 5
export default function StarRating({ rating }: StarRatingProps) {
  const stars = [0, 1, 2, 3];
  return (
    <div>
      {stars.map((star) => (
        <Star
          key={star}
          size={16}
          //If the star index is less than the rating, color it yellow, otherwise gray
          className={cn(
            "text-yellow-500",
            star < rating ? "fill-yellow-500" : "fill-transparent",
            "inline-block"
          )}
        />
      ))}
    </div>
  );
}
