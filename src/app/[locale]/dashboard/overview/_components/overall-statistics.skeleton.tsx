import OverallStatisticsCardsSkeleton from './overall-statistics-cards.skeleton';
import AllCategoriesTableSkeleton from './all-categories-table.skeleton';

export default async function OverallStatisticsSkeleton() {
  return (
    <>
      {/* Statistics Cards */}
      <OverallStatisticsCardsSkeleton />

      {/* All Categories Table */}
      <AllCategoriesTableSkeleton />
    </>
  );
}
