import { z } from 'zod';

export const productSchema = () =>
  z.object({
    _id: z.string(),
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    imgCover: z.url(),
    images: z.array(z.url()),
    price: z.number(),
    priceAfterDiscount: z.number(),
    quantity: z.number(),
    category: z.string(),
    occasion: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
    sold: z.number(),
    rateAvg: z.number(),
    rateCount: z.number(),
    isInWishlist: z.boolean(),
  });

export const addToCartSchema = () =>
  z.object({
    productId: z.string(),
    quantity: z.number(),
  });
