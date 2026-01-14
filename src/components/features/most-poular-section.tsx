"use client";

import ProductCard from "@/components/features/product-card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductAPI } from "@/lib/services/products";

// Occasion IDs
const OCCASION_IDS: Record<string, string> = {
  Wedding: "673b34c21159920171827ae0",
  Anniversary: "673b35c01159920171827aed",
  Graduation: "673b351e1159920171827ae5",
  Apology: "673b39241159920171827b28",
};
const OCCASIONS = Object.keys(OCCASION_IDS);

interface MostPopularSectionProps {
  products: ProductAPI[];
}

export default function MostPopularSection({
  products,
}: MostPopularSectionProps) {
  const [selectedOccasion, setSelectedOccasion] = useState("All");

  // Filter products by occasion, rating >= 2, and limit to 12
  const filteredProducts = useMemo(() => {
    let result = products || [];

    // Occasion filter
    if (selectedOccasion !== "All") {
      const targetId = OCCASION_IDS[selectedOccasion];
      result = result.filter((product) => product.occasion === targetId);
    }

    // Filter out products with rateAvg < 2
    result = result.filter((product) => product.rateAvg >= 2);

    // Limit to 12 products
    return result.slice(0, 12);
  }, [products, selectedOccasion]);

  return (
    <section className="mx-auto max-w-[1280px] pt-16">
      {/* Occasion buttons */}
      <div className="mb-6 flex items-center justify-end">
        <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion}
              onClick={() => setSelectedOccasion(occasion)}
              className={`transition-colors ${
                selectedOccasion === occasion
                  ? "text-maroon-700 font-semibold dark:text-softPink-200"
                  : "text-gray-600 hover:text-maroon-700 dark:text-gray-400 dark:hover:text-softPink-200"
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <div className="grid grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            title={product.title}
            price={product.price}
            priceAfterDiscount={product.priceAfterDiscount}
            imageCover={product.imgCover}
            ratingsAverage={product.rateAvg}
            quantity={product.quantity}
            sold={product.sold}
            createdAt={product.createdAt} // Needed for "New" badge
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
