import Image from "next/image";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import StarRating from "../shared/star-rating";

// Helper: Get styles based on badge name
const getBadgeStyles = (text: string) => {
  const slug = text.toLowerCase().trim().replace(/\s+/g, "-");

  if (slug === "out-of-stock") return "bg-red-600 text-white hover:text-white";
  if (slug === "hot")
    return "bg-maroon-50 text-maroon-600 hover:text-maroon-700";
  if (slug === "new") return "bg-zinc-100 text-zinc-700 hover:text-zinc-900";

  return "bg-gray-100 text-gray-800 hover:text-gray-900";
};

// interface for product props
interface ProductProps {
  title: string;
  price: number;
  priceAfterDiscount: number;
  imageCover: string;
  ratingsAverage: number; // Average rating (0-5) then converted to (0-4)
  badges?: string[]; // Optional manual badges
  quantity: number; // REQUIRED: To check if the product is "Out of Stock"
  sold: number; // REQUIRED: To check if the product is "Hot"
  createdAt: string; // REQUIRED: To check if the product is "New"
}

// Product Card Component
export default function ProductCard({
  title,
  price,
  priceAfterDiscount,
  imageCover,
  ratingsAverage,
  badges = [],
  quantity,
  sold,
  createdAt,
}: ProductProps) {
  // --- DYNAMIC BADGE LOGIC ---
  const displayBadges: string[] = [...(badges || [])];

  // 1. Out of Stock (highest priority)
  if (quantity === 0 && !displayBadges.includes("Out of Stock")) {
    displayBadges.push("Out of Stock");
  }

  // 2. New (created within last 7 days)
  const productDate = new Date(createdAt);
  const currentDate = new Date();
  const daysDiff =
    (currentDate.getTime() - productDate.getTime()) / (1000 * 3600 * 24);
  if (daysDiff <= 7 && !displayBadges.includes("New")) {
    displayBadges.push("New");
  }

  // 3. Hot (sold > 500)
  if (sold > 500 && !displayBadges.includes("Hot")) {
    displayBadges.push("Hot");
  }

  // 4. Add optional badges from props if not already included
  badges?.forEach((b) => {
    if (!displayBadges.includes(b)) {
      displayBadges.push(b);
    }
  });

  return (
    <div className="group relative flex h-[364px] w-[302px] flex-col overflow-hidden rounded-lg">
      {/* IMAGE SECTION */}
      <div className="relative h-[272px] w-full overflow-hidden rounded-lg">
        <Image
          src={imageCover}
          alt={title}
          fill
          sizes="302px"
          // Logic: Grayscale if out of stock
          className={`object-cover transition group-hover:brightness-90 ${
            quantity === 0 ? "grayscale opacity-80" : ""
          }`}
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-softPink-100/50 opacity-0 transition-opacity group-hover:opacity-100" />

        {/* ACTION BUTTONS like and view */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-maroon-700 hover:bg-maroon-50 transition-colors">
            <Heart size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-maroon-700 hover:bg-maroon-50 transition-colors">
            <Eye size={18} />
          </button>
        </div>

        {/* BADGES RENDERER hot out-of-stock new */}
        {displayBadges.length > 0 && (
          <div className="absolute right-3 top-3 flex gap-2 items-end">
            {displayBadges.map((badge, index) => (
              <span
                key={index}
                className={`cursor-pointer rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider transition-colors ${getBadgeStyles(
                  badge
                )}`}
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-1 flex-col justify-between px-0 pt-2">
        {/* tittle */}
        <h3
          className="line-clamp-1 text-[18px] font-bold text-maroon-700 dark:text-softPink-200"
          title={title}
        >
          {title}
        </h3>

        {/* star rating */}
        <StarRating rating={ratingsAverage} />

        {/* price */}
        <div className="flex items-center gap-2 text-[16px] font-bold">
          <span className="text-maroon-700 dark:text-softPink-200">
            {priceAfterDiscount} EGP
          </span>
          <span className="text-[14px] text-gray-400 dark:text-gray-500 line-through">
            {price} EGP
          </span>
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          className="absolute bottom-0 right-0 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors bg-maroon-600 text-white dark:bg-maroon-500 dark:text-maroon-50 hover:bg-maroon-700"
          aria-label="Add to cart"
        >
          <ShoppingCart size={24} />
        </button>
      </div>
    </div>
  );
}
