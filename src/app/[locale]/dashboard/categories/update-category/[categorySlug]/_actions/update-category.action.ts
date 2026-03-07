'use server';

import { apiFetch } from '@/lib/utilits/apis.utils';
import {
  UpdateCategoryPayload,
  UpdateCategoryResponse,
} from '@/lib/types/categories';
import { getUserToken } from '@/lib/utilits/get-token';

const BASE_API = process.env.BASE_API;

export async function updateCategory({ id, formData }: UpdateCategoryPayload) {
  const token = await getUserToken();
  if (!token) {
    throw new Error('User is not authenticated');
  }

  return apiFetch<UpdateCategoryResponse>(`${BASE_API}/categories/${id}`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
