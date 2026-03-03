'use client';

import { useEffect, useState } from 'react';
import { useProductsQuery } from '../_hooks/use-get-products';
import ProductItem from './product-item';
import Pagination from '@/components/shared/pagination';
import type { ProductFilters } from '@/lib/apis/products.api';
import { Separator } from '@radix-ui/react-separator';
import ProductSkeleton from '@/components/skeletons/products.skeleton';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { addToWishlist } from '@/lib/services/wishlist.service';
import { toast } from '@/hooks/use-toast';

type Props = {
  filters?: ProductFilters;
  initialPage?: ProductsResponse;
};

export default function ProductPagination({ filters, initialPage }: Props) {
  // State
  const [currentPage, setCurrentPage] = useState(
    initialPage?.metadata?.currentPage || 1
  );

  const queryClient = useQueryClient();
  const { status } = useSession();
  const userIsLoggedIn = status === 'authenticated';

  // Queries

  const { data, isLoading, isFetching, isError } = useProductsQuery(
    filters || {},
    currentPage,
    12,
    initialPage
  );

  // Effects
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  // Sync guest wishlist to server after login
  useEffect(() => {
    if (userIsLoggedIn) {
      const localWishlist: string[] = JSON.parse(
        localStorage.getItem('wishlist') || '[]'
      );

      if (localWishlist.length > 0) {
        Promise.all(localWishlist.map(id => addToWishlist(id)))
          .then(() => {
            localStorage.removeItem('wishlist');
            queryClient.invalidateQueries({ queryKey: ['products'] });
            queryClient.invalidateQueries({ queryKey: ['wishlist'] });
          })
          .catch(err => {
            toast({
              variant: 'destructive',
              description:
                err.message || 'Something went wrong syncing wishlist',
            });
          });
      }
    }
  }, [userIsLoggedIn, queryClient]);

  if (isLoading) {
    return <ProductSkeleton className="my-6" />;
  }

  if (!data || 'error' in data) {
    return <p>Error loading products.</p>;
  }

  // Variables
  const products = data.products;
  const totalPages = data.metadata.totalPages;

  return (
    <>
      <ProductItem products={products} userIsLoggedIn={userIsLoggedIn} />

      {isFetching && <ProductSkeleton className="my-6" />}

      <Separator className="my-7 h-[1px] bg-zinc-100 dark:bg-zinc-700 w-full mt-6" />

      <Pagination
        className="mt-5 mb-44"
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}
