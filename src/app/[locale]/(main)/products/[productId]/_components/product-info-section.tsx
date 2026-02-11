'use client';

import { useParams } from 'next/navigation';

import { useProductDetails } from '@/hooks/products/use-product-details';

import { Skeleton } from '@/components/ui/skeleton';
import { ProductGallery } from './product-gallery';
import { ProductInfo } from './product-info';
import { Separator } from '@/components/ui/separator';

export function ProductInfoSection() {
  // Navigation
  const { productId } = useParams<{ productId: string }>();

  // Queries
  const { product, isLoading } = useProductDetails(productId);

  return (
    <section className="h-[calc((100vw-224px)/2*0.85)] grid grid-cols-1 md:grid-cols-2 gap-x-16">
      {/* Product Gallery */}
      {isLoading ? (
        <div className="w-full h-[calc((100vw-224px)/2*0.85)]">
          {/* Main Image */}
          <Skeleton className="w-full h-[80%] rounded-md" />

          {/* Thumbnails */}
          <div className="flex flex-wrap gap-2 h-[20%] pt-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="w-[14.8%] h-full" />
            ))}
          </div>
        </div>
      ) : (
        <ProductGallery images={product?.images || []} />
      )}

      {/* Product Data */}
      {isLoading ? (
        <div className="flex flex-col w-full h-[calc((100vw-224px)/2*0.85)]">
          {/* Title */}
          <Skeleton className="w-[80%] h-8 mb-2" />

          {/* Pricing */}
          <div className="flex gap-2">
            <Skeleton className="w-[30%] h-7" />
            <Skeleton className="w-[30%] h-7" />
          </div>

          {/* Rating */}
          <Separator className="my-4" />
          <Skeleton className="w-1/2 h-6" />
          <Separator className="my-4" />

          {/* Description */}
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-full h-4 my-2" />
          <Skeleton className="w-full h-4 my-2" />
          <Skeleton className="w-3/4 h-4" />

          {/* Actions */}
          <div className="flex gap-2 mt-auto">
            <Skeleton className="w-9 h-9" />
            <Skeleton className="w-full h-9" />
          </div>
        </div>
      ) : (
        <ProductInfo product={product} />
      )}
    </section>
  );
}
