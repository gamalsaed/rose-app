"use client";

import ProductCard from "@/components/features/product-card";
import { ArrowRight } from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { ProductAPI, Occasion } from "@/lib/services/products";
import SectionTitle from "./title-section";
import { useTranslations } from "next-intl";

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
  // Translation
  const t = useTranslations();
  // router
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
      {/* section header */}
      <div className="mb-6 flex items-center justify-between">
        {/* Title */}
        <SectionTitle
          label=""
          title={t("section-title.most-popular")}
          className="mb-0 w-fit items-start text-start "
          titleClassName="w-fit before:w-2/3 after:w-1/3 "
        />
        {/* filters */}
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
            {t("most-popular.view-all")}
            <ArrowRight size={18} />
          </a>
        </Link>
      </div>
    </section>
  );
}
