'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import ProductCard from '../product-card';
import { Button } from '@/components/ui/button';
import { ProductAPI } from '@/lib/services/products';
import { useTranslations } from 'next-intl';
import SectionTitle from '../home/title-section';

interface BestSellingSectionProps {
  products: ProductAPI[];
}

export default function CartSidebarSection({
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
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="mx-auto max-w-[1280px] py-16">
      <div className="flex flex-col gap-6 items-stretch">
        <div className="mb-6 flex items-center justify-between">
          {/* Title */}
          <SectionTitle
            label=""
            title={t('section-title.Product-you-may-like')}
            className="mb-0 w-fit items-start text-start "
            titleClassName="w-fit before:w-2/3 after:w-1/3 "
          />
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
              {products.map(product => (
                <div
                  key={product._id}
                  className="px-3"
                  style={{ width: `${100 / itemsPerPage}%` }}
                >
                  <ProductCard
                    id={product._id}
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
