'use client';
import AddtoCart from '@/lib/actions/cart-actions/add-to-cart.action';
import { ShoppingCart } from 'lucide-react';
import React, { useContext } from 'react';
import { toast } from 'sonner';
import { CartContext } from "@/lib/context/CartContext";

export default function AddBtn({
  id,
  quantity,
}: {
  id: string;
  quantity: number;
}) {

    const context = useContext(CartContext);
    const numberOfCartItem = context?.numberOfCartItem ?? 0;
    const setnumberOfCartItem = context?.setnumberOfCartItem;

  async function handleAddToCart(id: string, quantity: number) {
    const res = await AddtoCart(id, quantity);
    console.log(res);
    if (res.message === 'success') {
      toast.success('Product added to cart successfully!', {
        position: 'top-center',
        duration: 3000,
      });
      if (setnumberOfCartItem) {
        setnumberOfCartItem(numberOfCartItem + 1);
      }
    } else {
      toast.error('Failed to add product to cart. Please try again.', {
        position: 'top-center',
        duration: 3000,
      });
    }
  }
  return (
    <>
      <button
        type="button"
        className="absolute cursor-pointer bottom-0 end-0 flex h-[40px] w-[40px] items-center justify-center rounded-full transition-colors bg-maroon-600 text-white dark:bg-maroon-500 dark:text-maroon-50 hover:bg-maroon-700"
        aria-label="Add to cart"
        onClick={() => handleAddToCart(id, quantity =1)}
      >
        <ShoppingCart size={24} />
      </button>
    </>
  );
}
