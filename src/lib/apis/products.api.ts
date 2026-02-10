async function apiFetch<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error:failed to get products"`);

  }

  const payload:ApiResponse<T> = await response.json();

  if (payload  && "error" in payload) {
    throw new Error(payload.error);
  }

  return payload;
}

function buildQueryParams(
  params: Record<string, string | number | undefined>,
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
    limit = 12,
    sort,
    category,
    occasion,
    rateAvg,
    priceGte,
    priceLte,
  } = filters;

  const query = buildQueryParams({
    page,
    limit,
    sort,
    category,
    occasion,
    rateAvg,
    "price[gte]": priceGte,
    "price[lte]": priceLte,
  });

  return apiFetch<ProductsResponse>(
    `${process.env.NEXT_PUBLIC_BASE_API!}products?${query}`,
  );
}
