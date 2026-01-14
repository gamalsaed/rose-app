"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard from "./product-card";
import { Button } from "@/components/ui/button";
import { ProductAPI } from "@/lib/services/products";

// interface for best selling section props
interface BestSellingSectionProps {
  products: ProductAPI[];
}

// Best Selling Section Component
export default function BestSellingSection({
  products,
}: BestSellingSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0); // Current starting index of the slider

  const itemsPerPage = 3;

  // Use all products
  const maxIndex = Math.max(0, products.length - itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  //best selling section render
  return (
    <section className="mx-auto max-w-[1280px] py-16">
      <div className="grid grid-cols-4 gap-6 items-stretch">
        <div className="flex h-full flex-col justify-between">
          <div className="space-y-4">
            {/* section title */}
            <h4 className="text-[16px] font-bold uppercase tracking-widest text-softPink-500 dark:text-maroon-400">
              Best Selling
            </h4>
            {/* section description */}
            <h2 className="text-[30px] font-bold leading-none text-maroon-700 dark:text-softPink-200">
              <span className="text-softPink-500 dark:text-maroon-400">
                Check Out
              </span>{" "}
              What <br />
              Everyone's{" "}
              <span className="text-softPink-500 dark:text-maroon-400">
                Buying
              </span>{" "}
              <br />
              Right Now
            </h2>
            {/* section text */}
            <p className="text-[16px] font-normal leading-tight text-zinc-500 dark:text-zinc-400">
              Not sure what to choose? <br />
              Start with our best sellers, these are the gifts our customers
              keep coming back for. Whether you're celebrating a birthday,
              anniversary or wedding, our top picks are guaranteed to leave a
              lasting impression.
            </p>
          </div>

          {/* Explore gifts button */}
          <Button
            className="bg-maroon-600 hover:bg-maroon-800 text-white rounded-md flex items-center gap-2 dark:bg-softPink-200 dark:text-maroon-700 dark:hover:bg-softPink-300"
            style={{ height: "36px", width: "155px" }}
          >
            Explore gifts
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="relative col-span-3">
          {/* prev */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon-600 p-3 text-white shadow-lg dark:bg-maroon-500 dark:text-maroon-50"
            disabled={currentIndex === 0}
          >
            <ArrowLeft size={20} />
          </button>

          {/* next*/}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon-600 p-3 text-white shadow-lg dark:bg-maroon-500 dark:text-maroon-50"
            disabled={currentIndex >= maxIndex}
          >
            <ArrowRight size={20} />
          </button>

          {/* slider path */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {/* cards */}
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
