'use server';

import { revalidateTag } from 'next/cache';
import { apiFetch } from '@/lib/utilits/apis.utils';
import { getUserToken } from '@/lib/utilits/get-token';
import {
  DeleteCategoryPayload,
  DeleteCategoryResponse,
} from '@/lib/types/categories';

const BASE_API = process.env.BASE_API;

export async function deleteCategoryAction({ id }: DeleteCategoryPayload) {
  const token = await getUserToken();

  if (!token) {
    throw new Error('User is not authenticated');
  }

  const response = await apiFetch<DeleteCategoryResponse>(
    `${BASE_API}/categories/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  revalidateTag('categories');

  return response;
}
