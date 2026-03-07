'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { getUserToken } from '../utilits/get-token';

export async function deleteAddress(id: string) {
  const token = await getUserToken();

  if (!token) {
    throw new Error('You should sign in');
  }

 
  const response = await fetch(`${process.env.BASE_API}/addresses/${id}`, {
    method: 'DELETE', 
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

 
  const data: ApiResponse<{ address: Address[] }> = await response.json();

  
  if ('error' in data) {
    throw new Error(data.error);
  }

 
  revalidateTag('addresses');

  return data.address;
}



export async function addAddress(address:  Omit<Address, "_id">) {
  const token = await getUserToken();

  if (!token) {
    throw new Error('You should sign in');
  }

  const response = await fetch(`${process.env.BASE_API}/addresses`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(address),
  });

  const data: ApiResponse<{ address: Address }> = await response.json();

  if ('error' in data) {
    throw new Error(data.error);
  }

  revalidateTag('addresses');
  return data.address;
}

export async function updateAddress(id: string, address: Omit<Address, "_id">) {
  const token = await getUserToken();

  if (!token) {
    throw new Error('You should sign in');
  }

  const response = await fetch(`${process.env.BASE_API}/addresses/${id}`, {
    method: 'PATCH', 
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(address),
  });

  const data: ApiResponse<{ address: Address }> = await response.json();

  if ('error' in data) {
    throw new Error(data.error);
  }

  revalidateTag('addresses');

  return data.address;
}
