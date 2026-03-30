'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';

import Pagination from '@/components/shared/pagination';

type ListingPaginationProps = {
  totalPages: number;
};

export function ListingPagination({ totalPages }: ListingPaginationProps) {
  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  return (
    <Pagination
      className="mt-auto pt-6"
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page: number) => {
        router.push(`/dashboard/categories?page=${page}`);
      }}
    />
  );
}
