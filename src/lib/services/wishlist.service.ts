'use server';

import { getUserToken } from '../utilits/get-token';

// Adds a product to the user's wishlist
export async function addToWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error('UNAUTHENTICATED');

  const res = await fetch(`${process.env.BASE_API}/wishlist`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  if (!res.ok) throw new Error('FAILED');

  return res.json();
}

export async function removeFromWishlist(productId: string) {
  const token = await getUserToken();
  if (!token) throw new Error('UNAUTHENTICATED');

  const res = await fetch(`${process.env.BASE_API}/wishlist/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) throw new Error('FAILED');

  return res.json();
}


// Checks whether a specific product exists in the user's wishlist
export async function checkProductInWishlist(productId: string) {
   const token = await getUserToken();
  if (!token) throw new Error('UNAUTHENTICATED');

  try {
    const response = await fetch(
      `${process.env.BASE_API}/wishlist/check/${productId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const data: ApiResponse<CheckWishlistResponse> = await response.json();

    if ('error' in data) {
      throw new Error(data.error);
    }

    return data.isInWishlist;
  } catch (error: any) {
    throw error;
  }
}
