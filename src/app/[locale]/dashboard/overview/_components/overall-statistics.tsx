import { getCategoryStatistics } from '@/lib/services/overview.services';
import { getOverallStatistics } from '@/lib/services/overview.services';

import OverallStatisticsCards from './overview-statistics-cards';
import AllCategoriesTable from './all-categories-table';

export default async function OverallStatistics() {
  const [overallStatistics, categoryStatistics] = await Promise.all([
    getOverallStatistics(),
    getCategoryStatistics(),
  ]);

  return (
    <>
      {/* Statistics Cards */}
      <OverallStatisticsCards {...overallStatistics.statistics} />

      {/* All Categories Table */}
      <AllCategoriesTable categories={categoryStatistics.statistics} />
    </>
  );
}
