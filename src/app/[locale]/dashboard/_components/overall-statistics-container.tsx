import { Suspense } from 'react';

import OverallStatisticsCardsSkeleton from './overall-statistics.skeleton';
import OverviewStatistics from './overall-statistics';

export default function OverallStatisticsContainer() {
  return (
    <section className="grid grid-cols-[30.625rem_1fr] h-[20.375rem] gap-6">
      <Suspense fallback={<OverallStatisticsCardsSkeleton />}>
        <OverviewStatistics />
      </Suspense>
    </section>
  );
}
