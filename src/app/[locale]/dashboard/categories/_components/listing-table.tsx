import { getTranslations } from 'next-intl/server';

import { getCategories } from '@/lib/apis/categories';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ListingRowActions } from './listing-row-actions';
import { ListingPagination } from './listing-pagination';

type ListingTableProps = {
  page: number;
  search: string;
};

export async function ListingTable({ page, search }: ListingTableProps) {
  // Translation
  const t = await getTranslations('dashboard.categories');

  // Queries
  const categoriesRes = await getCategories(page, search);

  return (
    <>
      <div className="flex flex-col p-6 pt-0 rounded-b-[1rem] bg-white overflow-hidden">
        <Table className="max-h-full overflow-auto">
          <TableHeader className="w-full bg-zinc-50 sticky top-0">
            <TableRow>
              {/* Name Header */}
              <TableHead className="w-40 flex-shrink-0 rounded-tl-[.625rem] text-zinc-900 text-sm font-medium">
                {t('name')}
              </TableHead>

              {/* Number of Products Header */}
              <TableHead className="text-zinc-900 text-sm font-medium">
                {t('products')}
              </TableHead>
              <TableHead className="text-right w-full rounded-tr-[.625rem]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="w-full">
            {(categoriesRes?.categories || []).map(category => (
              <TableRow
                key={category._id}
                className="hover:bg-maroon-50 w-full"
              >
                {/* Name Value */}
                <TableCell className="w-40 flex-shrink-0 text-sm font-semibold">
                  <p className="w-40">{category.name}</p>
                </TableCell>

                {/* Num of Products */}
                <TableCell className="text-sm whitespace-nowrap">
                  {category.productsCount} {t('products')}
                </TableCell>

                {/* Actions  */}
                <TableCell className=" text-right w-full">
                  <ListingRowActions category={category} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <ListingPagination
        totalPages={categoriesRes?.metadata?.totalPages || 1}
      />
    </>
  );
}
