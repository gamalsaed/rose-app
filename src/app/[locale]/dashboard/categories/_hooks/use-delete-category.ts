import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';

import { deleteCategoryAction } from '../_actions/delete-category.actions';
import { toast } from '@/hooks/use-toast';
import { DeleteCategoryPayload } from '@/lib/types/categories';

export function useDeleteCategory() {
  // Translations
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (payload: DeleteCategoryPayload) =>
      deleteCategoryAction(payload),
    onSuccess: () => {
      toast({
        variant: 'success',
        description: t('delete-category-success'),
      });

      const params = new URLSearchParams(window.location.search);
      params.delete('delete-category');
      params.delete('category-slug');

      router.push(`/dashboard/categories?${params.toString()}`);
    },
  });

  return {
    deleteCategory: mutate,
    deleteCategoryLoading: isPending,
    deleteCategoryError: error,
    isError,
  };
}
