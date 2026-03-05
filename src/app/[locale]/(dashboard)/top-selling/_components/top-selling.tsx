'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import GetAllProductStatistics from '@/lib/actions/dashboard-actions/top-selling.action';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Skeleton } from '@/components/ui/skeleton';
import { TopSellingProduct } from '@/lib/schemas/dashborad-products.schema';
import { useTranslations } from 'next-intl';

interface ProductCategory {
  products: TopSellingProduct[];
}

export default function TopSellingPage() {
  // translation
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
    (first, second) => second.sold - first.sold
  );
  console.log(allProducts);

  return (
    <>
      {/* top selling section */}
      <Card className=" w-full border-none ">
        <CardHeader>
          <CardTitle>
            <h1 className="font-semibold text-2xl w-full">
              {t('Top-Selling-Products')}
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            id="scrollableDiv"
            className=" max-h-80 overflow-hidden pr-2 hover:overflow-auto"
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
                  <p>{t('No-sold-Product-yet')}</p>
                </div>
              ) : (
                <>
                  {sortedProducts.map(
                    (product: TopSellingProduct, index: number) => (
                      <div key={product._id}>
                        <div
                          className={`flex justify-between py-2 px-2 my-2 rounded-lg ${
                            index === 0
                              ? 'bg-[#DFAC1640]'
                              : index === 1
                                ? 'bg-[#757F9540]'
                                : index === 2
                                  ? 'bg-[#91440040]'
                                  : 'bg-zinc-100'
                          }`}
                        >
                          <div className="px-2 flex flex-wrap gap-3 ">
                            <div className="font-semibold">{product.title}</div>
                            <div className="font-light">
                              ({product.price} {t('EGP')})
                            </div>
                          </div>
                          <div className="font-semibold">
                            {product.sold} {t('Sales')}
                          </div>
                        </div>
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
