import React from 'react';
import OrdersStatusChart from './(charts)/_components/order-status-chart';
import RevenueChart from './(charts)/_components/revenue-graph';


export default function Dashboard() {
  return (
    <div className="bg-zinc-50 py-5 flex items-stretch  gap-3 p-4 ">
      <OrdersStatusChart />
      <RevenueChart />
    </div>
  );
}
