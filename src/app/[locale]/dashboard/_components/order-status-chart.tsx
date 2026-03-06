'use client';

import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { useGetOrderStatistics } from '../_hooks/use-get-orders';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';

// Types
type OrderStatus = 'pending' | 'completed' | 'canceled' | 'inProgress';

// Variables
const STATUS_COLORS: Record<OrderStatus, string> = {
  completed: '#00BC7D',
  inProgress: '#2B7FFF',
  canceled: '#DC2626',
  pending: '#ff9800',
};

// Interfaces
interface OrderData {
  name: OrderStatus;
  value: number;
}

export default function OrdersStatusChart() {
  // Translation
  const t = useTranslations('dashboard-chart');
  const { ordersByStatus = [], isLoading } = useGetOrderStatistics();

  // Variables
  const filteredOrders = ordersByStatus.filter(
    item => item._id && STATUS_COLORS[item._id as OrderStatus]
  );

  // Functions
  const orderedData: OrderData[] = Object.keys(STATUS_COLORS)
    .map(status => {
      const s = status as OrderStatus;
      const item = filteredOrders.find(o => o._id === s);
      return item ? { name: s, value: item.count } : null;
    })
    .filter((item): item is OrderData => item !== null);

  // Variables
  const total = orderedData.reduce((sum, item) => sum + item.value, 0);

  // Loading
  if (isLoading) {
    return (
      <div className="w-72 h-96 rounded-2xl bg-white p-4">
        {/* Title skeleton */}
        <Skeleton className="h-8 w-1/2 mx-auto mb-6" />

        {/* Pie skeleton */}
        <Skeleton className="w-44 h-44 mx-auto rounded-full mb-4" />

        {/* Legend skeleton */}
        <div className="space-y-2 mt-4 flex flex-col items-center">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-2/4" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    );
  }

  // No data
  if (!total) {
    return (
      <div className="w-72 h-96 rounded-2xl mx-auto bg-white p-4 flex items-center justify-center">
        <p className="text-zinc-500 font-semibold">{t('no-data')}</p>
      </div>
    );
  }

  // Variables
  const chartData = orderedData.map(entry => ({
    ...entry,
    fill: STATUS_COLORS[entry.name],
  }));

  return (
    <div className="w-72 rounded-2xl max-md:w-full max-md:flex flex-col  h-96 md:text-center text-zinc-800 bg-white p-4 ">
      {/* Header */}
      <h3 className="font-semibold text-2xl">{t('order-title')}</h3>

      {/* Chart */}
      <div className="!h-48  max-md:flex  max-md:items-center max-md:justify-end">
        <ResponsiveContainer className=" h-full !overflow-visible mx-auto my-3">
          <PieChart className="w-fit">
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={40}
              outerRadius={80}
              startAngle={90}
              endAngle={-270}
              paddingAngle={0}
              labelLine={false}
              stroke="none"
              // Functions
              label={({ cx, cy, midAngle, outerRadius, percent }) => {
                if (midAngle === undefined || percent === undefined)
                  return null;

                const RADIAN = Math.PI / 180;
                const circleSize = 31.5;
                const radius = outerRadius;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <foreignObject
                    x={x - circleSize / 2}
                    y={y - circleSize / 2}
                    width={circleSize}
                    height={circleSize}
                  >
                    {/* Percentage circle */}
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center text-xs font-semibold shadow">
                      {`${(percent * 100).toFixed(0)}%`}
                    </div>
                  </foreignObject>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="w-full flex flex-col gap-3">
          {orderedData.map(entry => (
            <div key={entry.name} className="flex justify-between">
              {/* Status */}
              <div className="flex items-center">
                <span
                  className="w-3 h-3 mr-2 rounded-full inline-block"
                  style={{ backgroundColor: STATUS_COLORS[entry.name] }}
                />
                <span className="font-semibold text-xs">
                  {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}
                </span>
              </div>
              {/* Value & percent */}
              <span className="font-semibold text-xs">
                {entry.value} ({((entry.value / total) * 100).toFixed(0)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
