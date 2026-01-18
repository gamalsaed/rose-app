"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "../product-card";
import { Button } from "@/components/ui/button";
import { ProductAPI } from "@/lib/services/products";
import { useTranslations } from "next-intl";

interface BestSellingSectionProps {
  products: ProductAPI[];
}

export default function BestSellingSection({
  products,
}: BestSellingSectionProps) {
  // Translation
  const t = useTranslations();

  // slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  // Prevent crash if data hasn't loaded yet
  if (!products || products.length === 0) return null;

  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="mx-auto max-w-[1280px] py-16">
      <div className="grid grid-cols-4 gap-6 items-stretch">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-[16px] font-bold uppercase tracking-widest text-softPink-500 dark:text-maroon-400">
              {t("section-title.best-selling")}
            </h4>
            <h2 className="text-[30px] font-bold leading-none text-maroon-700 dark:text-softPink-200">
              <span className="text-softPink-500 dark:text-maroon-400">
                {t("best-selling.headline-accent-1")}
              </span>{" "}
              {t("best-selling.headline-main")} <br />
              {t("best-selling.headline-accent-2")}
              <br />{" "}
              <span className="text-softPink-500 dark:text-maroon-400">
                {t("best-selling.headline-main-2")}
              </span>{" "}
              <br />
              {t("best-selling.headline-end")}
            </h2>
            <p className=" font-normal leading-tight text-zinc-500 dark:text-zinc-400">
              {t("best-selling.paragraph-question")}
              <br />
              {t("best-selling.paragraph")}
            </p>
          </div>

          <Button className="bg-maroon-600 hover:bg-maroon-800 text-white rounded-md flex items-center gap-2 dark:bg-softPink-200 dark:text-maroon-700 dark:hover:bg-softPink-300 h-9 w-[155px]">
            {t("best-selling.cta")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative col-span-3">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon-600 p-3 text-white shadow-lg dark:bg-maroon-500 dark:text-maroon-50"
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={20} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon-600 p-3 text-white shadow-lg dark:bg-maroon-500 dark:text-maroon-50"
            disabled={currentIndex >= maxIndex}
          >
            <ArrowRight size={20} />
          </button>

          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {/* product cards */}
              {products.map((product) => (
                <div
                  key={product._id}
                  className="px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <ProductCard
                    title={product.title}
                    price={product.price}
                    priceAfterDiscount={product.priceAfterDiscount}
                    imageCover={product.imgCover}
                    ratingsAverage={product.rateAvg}
                    quantity={product.quantity}
                    sold={product.sold}
                    createdAt={product.createdAt}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
