import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useMutation } from '@tanstack/react-query';
import { updateCategory } from '../_actions/update-category.action';
import { UpdateCategoryPayload } from '@/lib/types/categories';
import { toast } from '@/hooks/use-toast';

export function useUpdateCategory() {
  // Translations
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (payload: UpdateCategoryPayload) => updateCategory(payload),
    onSuccess: () => {
      toast({
        variant: 'success',
        description: t('update-category-success'),
      });

      router.push(`/dashboard/categories`);
    },
  });

  return {
    updateCategory: mutate,
    updateCategoryLoading: isPending,
    updateCategoryError: error,
    isError,
  };
}
