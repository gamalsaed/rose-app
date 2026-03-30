'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import GetAllProductStatistics from '@/lib/actions/dashboard-actions/top-selling.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@/components/ui/skeleton';
import { LowStockProduct } from '@/lib/schemas/dashborad-products.schema';
import { Separator } from '@/components/ui/separator';
import { useTranslations } from 'next-intl';

interface ProductCategory {
  products: LowStockProduct[];
}

export default function LowStockPage() {
  const t = useTranslations();
  const { data, isLoading } = useQuery({
    queryKey: ['statistics'],
    queryFn: async () => {
      return await GetAllProductStatistics();
    },
  });
  console.log('Client received data:', data);
  const allProducts =
    data?.statistics?.productsByCategory?.flatMap(
      (category: ProductCategory) => category.products || []
    ) || [];
  const sortedProducts = [...allProducts].sort(
    (second, first) => second.quantity - first.quantity
  );
  console.log(allProducts);

  return (
    <>
      {/* low stock section */}
      <Card className=" w-full border-none">
        <CardHeader>
          <CardTitle>
            <h1 className="font-semibold text-2xl w-full">
              {t('low-stock-products')}
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            id="scrollableDiv"
            className=" max-h-80 overflow-hidden hover:overflow-auto"
          >
            <InfiniteScroll
              dataLength={allProducts.length}
              next={() => {}}
              hasMore={false}
              loader={null}
              scrollableTarget="scrollableDiv"
              endMessage={
                <p className="py-6 text-center text-muted-foreground ">
                  {t('No-more-Products')}
                </p>
              }
            >
              {/* Loading State, Empty State, and Notification Items  */}
              {isLoading ? (
                <div className="p-4 space-y-4">
                  <div className="flex gap-3 px-4 py-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </div>
                </div>
              ) : allProducts.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <p>{t('No-low-stock-products')}</p>
                </div>
              ) : (
                <>
                  {sortedProducts.map(
                    (product: LowStockProduct, index: number) => (
                      <div key={product._id}>
                        <div className="flex justify-between py-2 px-2">
                          <div className="px-2 flex flex-wrap gap-3 ">
                            <div className="font-semibold">{product.title}</div>
                          </div>
                          <div
                            className={`font-semibold ${
                              index < 4 ? 'text-red-600' : 'text-black'
                            }`}
                          >
                            {product.quantity} {t('Products')}
                          </div>
                        </div>
                        <Separator />
                      </div>
                    )
                  )}
                </>
              )}
            </InfiniteScroll>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
