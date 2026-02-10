'use client';
import { useEffect, useState } from 'react';
import { useProductsQuery } from '../_hooks/use-get-products';
import ProductItem from './product-item';
import Pagination from '@/components/shared/pagination';
import type { ProductFilters } from '@/lib/apis/products.api';
import { Separator } from '@radix-ui/react-separator';
import { Skeleton } from '@/components/ui/skeleton';
import ProductSkeleton from '@/components/skeletons/products.skeleton';

type Props = {
  initialPage: ProductsResponse;
  filters?: ProductFilters;
};
// ProductPagination handles displaying products with pagination support.
export default function ProductPagination({ initialPage, filters }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
// It fetches products based on optional filters .
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useProductsQuery(filters || {}, initialPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  const currentProducts = data?.pages[currentPage - 1]?.products ?? [];
  const totalPages = data?.pages[0]?.metadata.totalPages ?? 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (!data?.pages[page - 1] && hasNextPage) fetchNextPage();
  };
    
  // Skeletons are shown while fetching, and errors are displayed if fetch fails.
  if (isLoading) return <ProductSkeleton className='my-6'/>;
  if (isError) return <p>Error loading products.</p>;

  return (
    <>
      <ProductItem products={currentProducts} />
      <Separator className="my-7 h-[1px] bg-zinc-100 dark:bg-zinc-700 w-full mt-6" />
      <Pagination
        className="mt-5 mb-44"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isFetchingNextPage && <ProductSkeleton className='my-6'/>}
    </>
  );
}
