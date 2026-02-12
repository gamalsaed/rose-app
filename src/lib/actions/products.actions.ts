'use server';

import { getAccessToken } from '@/lib/utilits/apis.utils';

import { AddToCartPayload, AddToCartResponse } from '@/lib/types/products';

const BASE_API = process.env.BASE_API as string;

export async function addToCart(payload: AddToCartPayload) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      product: payload.productId,
      quantity: payload.quantity,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to add to cart');
  }

  const result: AddToCartResponse = await response.json();

  return result;
}
