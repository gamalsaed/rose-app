import CartSidebarSection from '@/components/features/cart/cart-sidebar';
import { getHomePageData, ProductAPI } from '@/lib/services/products'
import React from 'react'

interface CartSidebarProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Page({ searchParams }: CartSidebarProps) {
    const { bestSellers } =
        await getHomePageData(searchParams);

  return <>
<aside className=" lg:border-l h-fit">   
        
       <CartSidebarSection products={bestSellers}/>
    </aside> 
    </>
}
