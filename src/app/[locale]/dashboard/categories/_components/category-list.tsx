import React from 'react';
import { getTranslations } from 'next-intl/server';

import { AddCategoryButton } from './add-category-button';
import { ListingTable } from './listing-table';
import { ListingTableSkeleton } from './skeletons/listing-table.skeleton';
import { ListingSearch } from './listing-search';
import { DeleteCategoryPopup } from './delete-category-popup';

type ListingProps = {
  page: number;
  search: string;
};

export async function CategoryList({ page, search }: ListingProps) {
  // Translation
  const t = await getTranslations('dashboard.categories');

  return (
    <main className="h-[calc(100vh-102px)] m-4 flex flex-col overflow-hidden">
      <div className="p-6 pb-0 bg-white rounded-t-[1rem]">
        <div className="flex justify-between items-center">
          {/* Title */}
          <h1 className="text-2xl font-semibold">{t('all-categories')}</h1>

          {/* Add Category Button */}
          <AddCategoryButton />
        </div>

        {/* Search Input */}
        <ListingSearch />
      </div>

      {/* Listing Table */}
      <React.Suspense fallback={<ListingTableSkeleton />}>
        <ListingTable page={page} search={search} />
      </React.Suspense>

      {/* Delete Category Popup */}
      <DeleteCategoryPopup />
    </main>
  );
}
