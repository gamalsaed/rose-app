import { useQuery } from '@tanstack/react-query';
import { getProducts, ProductFilters } from '@/lib/apis/products.api';

export function useProductsQuery(
  filters: ProductFilters = {},
  page = 1,
  limit = 12,
  initialData?: ProductsResponse
) {
  // Query
  return useQuery({
    queryKey: ['products', page, filters, limit],
    queryFn: () => getProducts({ ...filters, page, limit }),

    initialData: page === 1 ? initialData : undefined,

    staleTime: 1000 * 60 * 5,
  });
}
