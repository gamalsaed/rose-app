'use server';
import { getApiHeaders } from '@/lib/utilits/apis.utils';

import { AddToCartPayload, AddToCartResponse } from '@/lib/types/products';

import { API } from '@/lib/constants/api.constants';

export async function addToCart(payload: AddToCartPayload) {
  const headers = await getApiHeaders();

  const response = await fetch(`${API}/cart`, {
    method: 'POST',
    headers,
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
