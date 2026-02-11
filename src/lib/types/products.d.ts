import { z } from 'zod';
import { productSchema, addToCartSchema } from '@/lib/schemas/products.schema';

export type Product = z.infer<ReturnType<typeof productSchema>>;

//* Get Product Details
export type ProductResponse = ApiResponse<{ product: Product }>;

//* Add to Cart
export type AddToCartPayload = z.infer<ReturnType<typeof addToCartSchema>>;
export type AddToCartResponse = ApiResponse<{
  numOfCartItems: number;
  cart: {
    user: string;
    cartItems: Array<{
      product: Product;
      price: number;
      quantity: number;
      _id: string;
    }>;
    _id: string;
    appliedCoupons: string[];
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
  };
}>;
