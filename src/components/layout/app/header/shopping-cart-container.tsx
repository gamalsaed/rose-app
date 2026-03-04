'use client';
import { CartContext } from '@/lib/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import React, { useContext } from 'react';

export default function ShoppingCartContainer() {
  const { numberOfCartItem } = useContext(CartContext) ?? {};

  return (
    <Link className=" abosulte" href="/cart">
      <ShoppingCart size={24} />
      <span className=" relative bottom-10 left-3 text-maroon-500">
        {numberOfCartItem}
      </span>
    </Link>
  );
}
