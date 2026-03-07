import { getTranslations } from 'next-intl/server';

import { getCategory } from '@/lib/apis/categories';

import { UpdateCategoryForm } from './_components/update-category-form';

type UpdateCategoryPageProps = {
  params: {
    categorySlug: string;
  };
  searchParams: {
    categoryId: string;
  };
};

export default async function UpdateCategoryPage({
  params,
  searchParams,
}: UpdateCategoryPageProps) {
  // Translation
  const t = await getTranslations('dashboard.categories');

  // Navigation
  const { categorySlug } = params;
  const categoryId = searchParams.categoryId;

  // Queries
  const category = await getCategory(categoryId);

  return (
    <main className="h-[calc(100vh-102px)] m-4 flex flex-col overflow-hidden">
      {/* Update Category Title */}
      <h1 className="text-2xl font-semibold mb-6 capitalize">
        {t('update-category-title', {
          name: categorySlug,
        })}
      </h1>

      {/* Update Category Form */}
      <div className="p-4 bg-white rounded-t-[1rem]">
        <UpdateCategoryForm category={category.category} />
      </div>
    </main>
  );
}
