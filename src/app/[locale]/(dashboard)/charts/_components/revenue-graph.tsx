'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { useState } from 'react';
import { useGetOrderStatistics } from '../_hooks/use-get-orders';
import { useTranslations } from 'next-intl';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utilits/cn';

export default function RevenueChart() {
  //translation
  const t = useTranslations('dashboard-chart');

  // State
  const [view, setView] = useState('monthly');
  const [clickedDot, setClickedDot] = useState<number | null>(null);

  // Queries
  const { data, isLoading } = useGetOrderStatistics();

  // Loading
  if (isLoading) {
    return (
      <div className="h-96 w-full bg-white rounded-xl p-6 flex flex-col">
        {/* Header skeleton */}
        <Skeleton className="h-6 w-1/3 mb-6" />

        {/* Chart skeleton */}
        <div className="flex-1 flex items-center justify-center">
          <Skeleton className="w-full h-full rounded-md" />
        </div>

        {/* Footer / Legend skeleton */}
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>
    );
  }
  // No data state
  if (!data) {
    return (
      <div className="h-96 flex items-center justify-center bg-white rounded-xl">
        {t('no-data')}
      </div>
    );
  }

  // Variables
  const chartData =
    view === 'daily'
      ? formatDaily(data.statistics.dailyRevenue)
      : formatMonthly(data.statistics.monthlyRevenue);

  // Functions
  function formatDaily(data: Revenue[]) {
    return data
      .map(item => ({
        label: new Date(item._id).getDate().toString(),
        revenue: Math.round(item.revenue),
      }))
      .reverse();
  }

  function formatMonthly(data: Revenue[]) {
    return data
      .map(item => {
        const [y, m] = item._id.split('-');
        const month = new Date(+y, +m - 1).toLocaleString('en-US', {
          month: 'short',
        });
        return {
          label: month,
          revenue: Math.round(item.revenue),
        };
      })
      .reverse();
  }

  return (
    <div
      className="w-full h-96 bg-white px-6 py-4 rounded-xl"
      onMouseDown={e => e.preventDefault()}
    >
      {/* Header */}
      <div className="flex justify-between mb-3 px-6">
        <h3 className="font-semibold text-2xl">{t('revenue-title')}</h3>

        {/* Navigation */}
        <div className="flex gap-3">
          <button
            onClick={() => {
              setView('monthly');
              setClickedDot(null);
            }}
            className={cn(
              'text-sm capitalize transition-colors',
              view === 'monthly'
                ? 'text-maroon-600 font-semibold'
                : 'text-gray-400'
            )}
          >
            {t('monthly')}
          </button>

          <button
            onClick={() => {
              setView('daily');
              setClickedDot(null);
            }}
            className={cn(
              'text-sm capitalize transition-colors',
              view === 'daily'
                ? 'text-maroon-600 font-semibold'
                : 'text-gray-400'
            )}
          >
            {t('last-week')}
          </button>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 40, right: 40, left: 40, bottom: 40 }}
        >
          {/* Grid */}
          <CartesianGrid
            vertical
            horizontal={false}
            stroke="#A1A1AA"
            strokeWidth={0.5}
          />

          {/* Gradients & clip path */}
          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A6252A80" />
              <stop offset="100%" stopColor="#F8B1EF00" />
            </linearGradient>

            <linearGradient id="revenueDotGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
            </linearGradient>

            <clipPath id="activeAreaClip">
              {clickedDot !== null && (
                <rect
                  x={`${(clickedDot / chartData.length) * 100}%`}
                  y="0"
                  width={`${100 / chartData.length}%`}
                  height="100%"
                />
              )}
            </clipPath>
          </defs>

          {/* Axes */}
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            fontSize={10}
            fontWeight={700}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            width={40}
            tickMargin={10}
            tickFormatter={value => `${value / 1000}k`}
            fontSize={10}
            fontWeight={700}
          />

          {/* Area */}
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#A6252A"
            strokeWidth={1}
            fill="url(#revenueGradient)"
            isAnimationActive={false}
            dot={false}
            activeDot={({ cx, cy, payload, index }) => {
              if (cx == null || cy == null || !payload?.revenue) return null;

              const handleClick = () => {
                setClickedDot(prev => (prev === index ? null : index));
              };

              const labelX = cx < 40 ? cx + 30 : cx;

              return (
                <>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={6}
                    fill="#A6252A"
                    stroke="#fff"
                    strokeWidth={2}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                    pointerEvents="all"
                  />

                  <text
                    x={labelX}
                    y={cy - 20}
                    textAnchor="middle"
                    fontSize={12}
                    fill="#A6252A"
                    fontWeight="bold"
                  >
                    {new Intl.NumberFormat('en-US').format(payload.revenue)} EGP
                  </text>
                </>
              );
            }}
          >
            {/* Active label */}
            {clickedDot !== null && (
              <LabelList
                dataKey="revenue"
                content={props => {
                  const { x, y, index, value } = props;

                  if (
                    x === undefined ||
                    y === undefined ||
                    value === undefined ||
                    index !== clickedDot
                  )
                    return null;

                  const numX = typeof x === 'number' ? x : Number(x);
                  const numY = typeof y === 'number' ? y : Number(y);
                  const numValue =
                    typeof value === 'number' ? value : Number(value);

                  const labelX = numX < 40 ? numX + 30 : numX;

                  return (
                    <>
                      <circle
                        cx={numX}
                        cy={numY}
                        r={6}
                        fill="#A6252A"
                        stroke="#fff"
                        strokeWidth={2}
                        style={{ cursor: 'pointer' }}
                        onClick={() => setClickedDot(null)}
                      />
                      <text
                        x={labelX}
                        y={numY - 20}
                        textAnchor="middle"
                        fontSize={12}
                        fill="#A6252A"
                        fontWeight="bold"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setClickedDot(null)}
                      >
                        {new Intl.NumberFormat('en-US').format(numValue)} EGP
                      </text>
                    </>
                  );
                }}
              />
            )}
          </Area>

          {/* Highlighted area */}
          {clickedDot !== null && (
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="none"
              fill="url(#revenueDotGradient)"
              clipPath="url(#activeAreaClip)"
              isAnimationActive={false}
              style={{ pointerEvents: 'none' }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
