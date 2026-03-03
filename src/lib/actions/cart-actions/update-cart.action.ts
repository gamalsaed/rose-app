'use server';
const BASE_URL = 'https://flower.elevateegy.com/api/v1';

import getMyToken from '@/lib/utilits/get-my-token';

export default async function UpdateCart(id: string , quantity: number = 1) {
  const token = await getMyToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }

  const res = await fetch(`${BASE_URL}/cart/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });
  const payload = await res.json();
  return payload;
}
