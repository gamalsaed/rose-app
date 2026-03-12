import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { useMutation } from '@tanstack/react-query';
import { addCategory } from '../_actions/add-category.action';
import { AddCategoryPayload } from '@/lib/types/categories';
import { toast } from '@/hooks/use-toast';

export function useAddCategory() {
  // Translations
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();

  // Mutation
  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: (payload: AddCategoryPayload) => addCategory(payload),
    onSuccess: () => {
      toast({
        variant: 'success',
        description: t('add-category-success'),
      });

      router.push('/dashboard/categories');
    },
  });

  return { mutate, isPending, error, isError };
}
