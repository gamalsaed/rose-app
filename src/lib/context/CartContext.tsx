'use client';

import { createContext, useEffect, useState, ReactNode , Dispatch ,SetStateAction } from "react";
import GetLoggedUserCart from "@/lib/actions/cart-actions/get-to-cart.action";

interface CartContextType  {
  numberOfCartItem: number;
  setnumberOfCartItem: Dispatch<SetStateAction<number>>;
};

interface CartContextProviderProps {
  children: ReactNode;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export default function CartContextProvider({ children }: CartContextProviderProps) {
  const [numberOfCartItem, setnumberOfCartItem] = useState<number>(0);

  async function GetUserCart() {
    try {
      const res = await GetLoggedUserCart();
      console.log(res.cart)

      if (res.message === "success" && Array.isArray(res.cart?.cartItems
)) {
        let sum = 0;
        res.cart.cartItems.forEach((product: { quantity: number }) => {
          sum += product.quantity;
        });
        console.log(sum, "sum")
        setnumberOfCartItem(sum);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    GetUserCart();
  }, []);

  return (
    <CartContext.Provider value={{ numberOfCartItem, setnumberOfCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
