'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

import { Category } from '@/lib/types/categories';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';

import { Pencil, Trash2 } from 'lucide-react';

type ListingRowActionsProps = {
  category: Category;
};

export function ListingRowActions({ category }: ListingRowActionsProps) {
  // Translation
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();

  return (
    <div>
      {/* Edit Category Button */}
      <Button
        asChild
        className="w-fit h-7 text-blue-600 bg-[#0063D01A]/10 hover:bg-[#0063D01A]/20"
        size="sm"
      >
        <Link
          href={`/dashboard/categories/update-category/${category._id}`}
          className="flex items-center gap-1"
        >
          <Pencil size={14} /> {t('edit')}
        </Link>
      </Button>

      {/* Delete Category Button */}
      <Button
        asChild
        className="w-fit h-7 ms-2.5 text-red-600 bg-[#FF00001A]/10 hover:bg-[#FF00001A]/20"
        variant="destructive"
        size="sm"
        onClick={() => {
          const url = new URL(window.location.href);
          url.searchParams.set('delete-category', category._id);
          router.push(url.toString());
        }}
      >
        <Link
          href={`/dashboard/categories/delete-category/${category._id}`}
          className="flex items-center gap-1"
        >
          <Trash2 /> {t('delete')}
        </Link>
      </Button>
    </div>
  );
}
