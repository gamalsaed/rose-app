import { getTranslations } from 'next-intl/server';
import { AddCategoryForm } from './_components/add-category-form';

export default async function AddCategoryPage() {
  // Translation
  const t = await getTranslations('dashboard.categories');

  return (
    <main className="h-[calc(100vh-102px)] m-4 flex flex-col overflow-hidden">
      {/* Add Category Title */}
      <h1 className="text-2xl font-semibold mb-6">{t('add-category-title')}</h1>

      {/* Add Category Form */}
      <div className="p-4 bg-white rounded-t-[1rem]">
        <AddCategoryForm />
      </div>
    </main>
  );
}
