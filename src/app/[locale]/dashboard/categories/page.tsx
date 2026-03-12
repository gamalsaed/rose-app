import { CategoryList } from './_components/category-list';

type CategoriesPageProps = {
  searchParams: {
    page: string;
    search: string;
  };
};

export default function CategoriesPage({ searchParams }: CategoriesPageProps) {
  return (
    <CategoryList
      page={Number(searchParams.page) || 1}
      search={searchParams.search || ''}
    />
  );
}
