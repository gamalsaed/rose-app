import React from 'react';
import TopSellingPage from './_components/top-selling';
import LowStockPage from './_components/low-stock';
import OrdersStatusChart from './_components/order-status-chart';
import RevenueChart from './_components/revenue-graph';

export default function Dashboard() {
  return (
    <main>
      <div className="flex mt-6 gap-6 max-md:flex-wrap">
        <OrdersStatusChart />
        <RevenueChart />
      </div>
      <div className="flex lg:flex-row md:flex-col gap-x-2 bg-slate-100">
        {/* top selling section */}
        <div className="flex-1">
          <TopSellingPage />
        </div>
        {/* low stock section */}
        <div className="flex-1">
          <LowStockPage />
        </div>
      </div>
    </main>
  );
}
