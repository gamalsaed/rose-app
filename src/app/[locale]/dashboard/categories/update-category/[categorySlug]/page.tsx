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
  searchParams,
}: UpdateCategoryPageProps) {
  // Navigation
  const categoryId = searchParams.categoryId;

  // Queries
  const category = await getCategory(categoryId);

  return (
    <main className="h-[calc(100vh-102px)] m-4 flex flex-col overflow-hidden">
      <UpdateCategoryForm category={category.category} />
    </main>
  );
}
