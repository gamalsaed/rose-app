'use server';

import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';
import type { AddressesApi, Address } from '../types/checkout.t';

export async function getAddresses() {
  // Get Token
  const token = await getToken({
    req: { cookies: cookies() } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Fetch Addresses
  const addressesApi = await fetch(`${process.env.BASE_API}addresses`, {
    headers: { Authorization: `Bearer ${token?.token}` },
  });

  // Error Handling
  if (!addressesApi.ok) {
    return { error: 'Failed to fetch your addresses.' };
  }

  // Parsing incoming data
  const addresses: AddressesApi = await addressesApi.json();

  return addresses;
}

export async function getCart() {
  // Get Token
  const token = await getToken({
    req: { cookies: cookies() } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Fetch Cart
  const cartApi = await fetch(`${process.env.BASE_API}cart`, {
    headers: { Authorization: `Bearer ${token?.token}` },
  });

  // Error Handling
  if (!cartApi.ok) {
    return { error: 'Failed to fetch the cart.' };
  }

  // Parsing incoming data
  const cart = await cartApi.json();
  return cart;
}

export async function applyCouponAction(code: { code: string }) {
  // There's no error handler because the backend send 400 if the coupon dosen't exist

  // Get Token
  const token = await getToken({
    req: { cookies: cookies() } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // API
  const applyCouponApi = await fetch(`${process.env.BASE_API}coupons/apply`, {
    method: 'POST',
    body: JSON.stringify({ ...code }),

    headers: {
      Authorization: `Bearer ${token?.token}`,
      'Content-Type': 'application/json',
    },
  });

  const result = await applyCouponApi.json();

  return result;
}

type CheckoutParams = {
  shippingAddress: Address;
  method: 'cash' | 'credit';
};

export async function checkoutAction(payload: CheckoutParams) {
  // Get Token
  const token = await getToken({
    req: { cookies: cookies() } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });
  console.log(payload);
  // Check if there's no address or method
  if (!payload.method || !payload.shippingAddress) {
    return { error: 'You have to chose the method.' };
  }

  // Authorization checker
  if (!token?.token) return { error: 'Unauthorized' };

  // cash or credit
  const url =
    payload.method === 'cash'
      ? process.env.BASE_API + 'orders'
      : process.env.BASE_API +
        'orders/checkout?url=' +
        process.env.NEXTAUTH_URL;

  // API
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token.token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      shippingAddress: {
        street: payload.shippingAddress.street,
        phone: payload.shippingAddress.phone,
        city: payload.shippingAddress.city,
        lat: payload.shippingAddress.lat,
        long: payload.shippingAddress.long,
      },
    }),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) return { error: data.error };

  return data;
}
