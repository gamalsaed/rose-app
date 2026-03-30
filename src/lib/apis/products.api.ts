'use server';

import { getUserToken } from '@/lib/utilits/get-token';
import { ProductSuccessResponse } from '../types/products';

export async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Error: failed request`);
  }

  const payload = await response.json();

  if (payload && "error" in payload) {
    throw new Error(payload.error);
  }

  return payload as T;
}

function buildQueryParams(
  params: Record<string, string | number | undefined>
) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  return searchParams.toString();
}

export type ProductFilters = {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  occasion?: string;
  rateAvg?: number;
  priceGte?: number;
  priceLte?: number;
};

export async function getProducts(filters: ProductFilters = {}) {
  const {
    page = 1,
    limit ,
    sort,
    category,
    occasion,
    rateAvg,
    priceGte,
    priceLte,
  } = filters;

  const token = await getUserToken();

  const query = buildQueryParams({
    page,
    limit,
    sort,
    category,
    occasion,
    rateAvg,
    'price[gte]': priceGte,
    'price[lte]': priceLte,
  });

  return apiFetch<ProductSuccessResponse>(
    `${process.env.BASE_API}/products?${query}`,
    {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined, 
    }
  );
}
