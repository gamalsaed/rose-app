"use client";

import ProductCard from "@/components/features/product-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Added for routing
import { ProductAPI, Occasion } from "@/lib/services/products";

interface MostPopularSectionProps {
  products: ProductAPI[];
  occasions: Occasion[]; // The 4 fetched occasions
  selectedOccasionId?: string;
}

export default function MostPopularSection({
  products,
  occasions,
  selectedOccasionId,
}: MostPopularSectionProps) {
  const router = useRouter();

  // handles click to changegit status
  //  search params
  const handleOccasionClick = (id: string) => {
    // If clicking the already selected toggle it off
    const newPath = id === selectedOccasionId ? "/" : `/?occasion=${id}`;
    router.push(newPath, { scroll: false });
  };

  return (
    <section className="mx-auto max-w-[1280px] pt-16">
      {/* Occasion buttons */}
      <div className="mb-6 flex items-center justify-end">
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          {occasions.map((occasion) => (
            <button
              key={occasion._id}
              onClick={() => handleOccasionClick(occasion._id)}
              className={`transition-colors ${
                selectedOccasionId === occasion._id
                  ? "text-maroon-700 font-semibold dark:text-softPink-200"
                  : "text-gray-600 hover:text-maroon-700 dark:text-gray-400 dark:hover:text-softPink-200"
              }`}
            >
              {occasion.name}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            imageCover={product.imgCover}
            ratingsAverage={product.rateAvg}
            quantity={product.quantity}
            sold={product.sold}
            createdAt={product.createdAt}
          />
        ))}
      </div>

      {/* View more link */}
      <div className="mt-8 flex justify-end">
        <Link href="/products" legacyBehavior>
          <a className="flex items-center gap-2 text-maroon-700 font-semibold dark:text-softPink-200 dark:hover:text-softPink-300">
            View more
            <ArrowRight size={18} />
          </a>
        </Link>
      </div>
    </section>
  );
}
