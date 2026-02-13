import OccasionsFilter from '@/components/features/products/occasion-filter';
import OccasionFilterSection from '@/components/features/products/occasion-filter-section';
import AllPriceFilter from '@/components/features/products/price-filter';
import { getProductsPageData } from '@/lib/services/products-filters';
import { Suspense } from 'react';

interface ProductProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProductsPage({ searchParams }: ProductProps) {
  const { products, occasions } = await getProductsPageData(searchParams);

  return (
    <div className="flex justify-between gap-4 max-h-screen">
      {/* Sidebar */}
      <aside className="w-72 pt-20 ml-20 shrink-0 space-y-4">
        <div className=" pb-2">
          <OccasionsFilter occasion={occasions} />
        </div>
        <div className="pt-2">
          <AllPriceFilter />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 mt-6 lg:mt-0 ">
        <Suspense fallback={<div>Loading products...</div>}>
          <OccasionFilterSection products={products} />
        </Suspense>
      </main>
    </div>
  );
}
