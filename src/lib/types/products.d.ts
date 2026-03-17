import { z } from 'zod';
import { productSchema, addToCartSchema } from '@/lib/schemas/products.schema';

export type Product = z.infer<ReturnType<typeof productSchema>>;
export type CartProduct = {
  product: Product;
  price: number;
  quantity: number;
  _id: string;
};

//* Get Product Details
export type ProductResponse = ApiResponse<{ product: Product }>;
export type ProductSuccessResponse = ApiSuccessResponse<{ product: Product }>;

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


declare type ProductFilters = {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  occasion?: string;
  rateAvg?: number;
  priceGte?: number;
  priceLte?: number;
};


