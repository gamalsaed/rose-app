import { Star } from "lucide-react";

type StarRateProps = {
  rating: number; // 0 -> 4 (half stars are not supported yet)
};

export const StarRate = ({ rating }: StarRateProps) => {
  const full = Math.floor(rating);
  const empty = 4 - full;

  return (
    <div className="flex items-center justify-center gap-1">
      {/* Filled stars */}
      {Array.from({ length: full }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className="h-5 w-5 fill-yellow-400 text-yellow-400"
        />
      ))}

      {/* Empty stars */}
      {Array.from({ length: empty }).map((_, i) => (
        <Star key={`empty-${i}`} className="h-5 w-5 text-yellow-400" />
      ))}
    </div>
  );
};
