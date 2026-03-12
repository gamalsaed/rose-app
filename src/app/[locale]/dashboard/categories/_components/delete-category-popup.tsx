'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';

import { useDeleteCategory } from '../_hooks/use-delete-category';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ErrorBox } from '@/components/shared/error-box';

import { Trash } from 'lucide-react';

export function DeleteCategoryPopup() {
  // Translation
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const deleteCategoryId = searchParams.get('delete-category');
  const categorySlug = searchParams.get('category-slug');
  const isOpen = Boolean(deleteCategoryId);

  // Mutations
  const { deleteCategory, deleteCategoryLoading, deleteCategoryError } =
    useDeleteCategory();

  // Functions
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      const url = new URL(window.location.href);
      url.searchParams.delete('delete-category');
      url.searchParams.delete('category-slug');
      router.replace(pathname + url.search);
    }
  };

  const handleDeleteCategory = () => {
    deleteCategory({ id: deleteCategoryId as string });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {/* Delete Category Popup */}
      <DialogContent className="sm:max-w-md">
        {/* Modal Header */}
        <DialogHeader>
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-[6.5625rem] h-[6.5625rem] rounded-full bg-gray-800/5 mt-12 mb-7">
              <div className="flex items-center justify-center w-[4.375rem] h-[4.375rem] rounded-full bg-gray-800/15">
                <Trash className="size-7 text-gray-700" />
              </div>
            </div>

            <DialogTitle className="leading-6">
              {t.rich('delete-category-title', {
                name: (categorySlug || '').replaceAll('-', ' '),
                span: (chunks: React.ReactNode) => (
                  <span className="capitalize text-maroon-600">{chunks}</span>
                ),
              })}
            </DialogTitle>

            <DialogDescription className="text-base text-maroon-500 mt-1.5 mb-11">
              {t('delete-category-warning')}
            </DialogDescription>
          </div>
        </DialogHeader>

        <DialogFooter>
          {/* Cancel Button */}
          <div className="flex flex-col gap-6 w-full">
            {/* Error Box */}
            {deleteCategoryError && (
              <ErrorBox error={deleteCategoryError.message} />
            )}

            {/* Actions */}
            <div className="flex gap-2.5 w-full">
              {/* Cancel Button */}
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleOpenChange.bind(null, isOpen)}
                >
                  {t('delete-category-nope')}
                </Button>
              </DialogClose>

              {/* Submit Button */}
              <Button
                type="button"
                loading={deleteCategoryLoading}
                onClick={handleDeleteCategory}
              >
                {t('delete-category-yes')}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
