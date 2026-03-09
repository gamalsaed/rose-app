import React from 'react';
import TopSellingPage from './_components/top-selling';
import LowStockPage from './_components/low-stock';
import OrdersStatusChart from './_components/order-status-chart';
import RevenueChart from './_components/revenue-graph';

export default function Dashboard() {
  return (
    <main>
      <div className="flex mb-6 gap-6 max-md:flex-wrap">
        <OrdersStatusChart />
        <RevenueChart />
      </div>
      <div className="flex w-full flex-row max-md:flex-col gap-6 bg-slate-100">
        {/* top selling section */}
        <div className="w-full">
          <TopSellingPage />
        </div>
        {/* low stock section */}
        <div className="w-full">
          <LowStockPage />
        </div>
      </div>
    </main>
  );
}
