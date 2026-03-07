import { apiFetch, getAccessToken } from '../utilits/apis.utils';
import { CategoriesResponse } from '../types/categories';

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
    }
  );
}
