import { Star } from "lucide-react";
import { cn } from "@/lib/utilits/cn";

interface StarRatingProps {
  rating: number; // rating from 0 to 5
}

export default function StarRating({ rating }: StarRatingProps) {
  const totalStars = 4; // display 4 stars

  // Scale 0-5 rating to 0-4
  const adjustedRating = (rating / 5) * totalStars;

  // Create an array of length 4
  const stars = Array.from({ length: totalStars }, (_, i) => i + 1);

  return (
    <div className="flex gap-0.5">
      {stars.map((star) => (
        <Star
          key={star}
          size={16}
          className={cn(
            "text-yellow-500",
            // fill the star if adjustedRating >= star
            adjustedRating >= star ? "fill-yellow-500" : "fill-transparent"
          )}
        />
      ))}
    </div>
  );
}
