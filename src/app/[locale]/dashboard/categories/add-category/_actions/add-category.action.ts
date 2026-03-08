'use server';

import { revalidateTag } from 'next/cache';
import { apiFetch } from '@/lib/utilits/apis.utils';
import {
  AddCategoryPayload,
  AddCategoryResponse,
} from '@/lib/types/categories';
import { getUserToken } from '@/lib/utilits/get-token';

const BASE_API = process.env.BASE_API;

export async function addCategory(fromData: AddCategoryPayload) {
  const token = await getUserToken();

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await apiFetch<AddCategoryResponse>(
    `${BASE_API}/categories`,
    {
      method: 'POST',
      body: fromData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidateTag('categories');

  return response;
}
