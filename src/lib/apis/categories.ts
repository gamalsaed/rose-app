import { apiFetch, getAccessToken } from '../utilits/apis.utils';
import { CategoriesResponse, GetCategoryResponse } from '../types/categories';

const BASE_URL = process.env.BASE_API;

export async function getCategories(page: number, search: string) {
  const token = await getAccessToken();
  const limit = 10;

  return apiFetch<CategoriesResponse>(
    `${BASE_URL}/categories?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
      next: {
        tags: ['categories'],
      },
    }
  );
}

export async function getCategory(id: string) {
  const token = await getAccessToken();

  const response = await apiFetch<GetCategoryResponse>(
    `${BASE_URL}/categories/${id}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if ('error' in response) {
    throw new Error(response.error);
  }

  return response;
}
