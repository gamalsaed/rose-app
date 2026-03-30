'use client';

import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { Plus } from 'lucide-react';

export function AddCategoryButton() {
  // Translation
  const t = useTranslations('dashboard.categories');

  // Navigation
  const router = useRouter();

  // Functions
  const handleAddCategory = () => {
    router.push('/dashboard/categories/add-category');
  };

  return (
    <Button className={'w-fit'} onClick={handleAddCategory}>
      <Plus /> {t('add-new-category')}
    </Button>
  );
}
