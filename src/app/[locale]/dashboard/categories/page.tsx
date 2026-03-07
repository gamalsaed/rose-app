import { Listing } from './_components/listing';

type CategoriesPageProps = {
  searchParams: {
    page: string;
    search: string;
  };
};

export default function CategoriesPage({ searchParams }: CategoriesPageProps) {
  return (
    <Listing
      page={Number(searchParams.page) || 1}
      search={searchParams.search || ''}
    />
  );
}
