'use client';

import { useState } from 'react';
import type { ProductFilters } from '@/lib/apis/products.api';
import ProductPagination from './pagination-wrapper';
import TestFilterWrapper from './test-filter-wrapper';

type Props = {
  initialPage: ProductsResponse;
};
// Wrapper component for the products page.
export default function ProductsWrapper({ initialPage }: Props) {
  const [filters, setFilters] = useState<ProductFilters>({});

  return (
    <>
      {/* Sidebar */}
      <section className="w-1/4 min-w-72 ltr:border-r rtl:border-l border-zinc-100 dark:border-zinc-700 h-auto mb-32">
        {/* <TestFilterWrapper onChange={setFilters} /> */}
      </section>

      {/* Products */}
      <section className="w-full">
        <ProductPagination
          initialPage={initialPage}
          filters={filters}
        />
      </section>
    </>
  );
}
