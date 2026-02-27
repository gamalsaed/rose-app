
import React from 'react'
import OrdersStatusChart from './_components/order-status-chart'
import RevenueChartContainer from './_components/revenue-graph'

export default async function page() {
  return (
    <div className='bg-zinc-50 py-5 flex  items-stretch  gap-3 p-4 '><OrdersStatusChart/>
    < RevenueChartContainer/>
    </div>
  )
}
