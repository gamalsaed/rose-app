import { getOrderStatistics } from '@/lib/apis/statistics.api';
import { useQuery } from '@tanstack/react-query';

export function useGetOrderStatistics() {
  const query = useQuery<OrderStatisticsResponse>({
    queryKey: ['OrderStatistics'],
    queryFn: getOrderStatistics,
  });

  return {
    ...query,
    ordersByStatus: query.data?.statistics.ordersByStatus ?? [],
    dailyRevenue: query.data?.statistics.dailyRevenue ?? [],
    monthlyRevenue: query.data?.statistics.monthlyRevenue ?? [],
  };
}
