import React from 'react'
import TopSellingPage from './_components/top-selling'
import LowStockPage from './_components/low-stock'

export default function page() {
  return <>
  <main>


  <div className="flex lg:flex-row md:flex-col gap-x-2 bg-slate-100">
    {/* top selling section */}
    <div className="flex-1"> 
  <TopSellingPage/>
      
    </div>
    {/* low stock section */}
     <div className="flex-1">
     
  <LowStockPage/>

    </div>
  </div>
  </main>
  </>
}
