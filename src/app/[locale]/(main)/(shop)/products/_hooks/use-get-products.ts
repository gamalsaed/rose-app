import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts, ProductFilters } from "@/lib/apis/products.api";
import type { InfiniteData } from "@tanstack/react-query";


//Custom hook to fetch products with infinite scrolling support using react-query's useInfiniteQuery.
export function useProductsQuery(
  filters: ProductFilters = {},
  initialPage?: ProductsResponse
) {
  return useInfiniteQuery<
    ProductsResponse,              
    Error,
    InfiniteData<ProductsResponse>, 
    ["products", ProductFilters],
    number
  >({
    // Unique query key including current filters
   queryKey: ["products",filters],

    // Fetch function to get products for a specific page
    queryFn: async ({ pageParam }) => {
      const response = await getProducts({
        ...filters,
        page: pageParam,
      });

      if ("error" in response) {
        throw new Error(response.error);
      }

      return response;
    },
    refetchOnWindowFocus: false,

    initialPageParam: 1,
    // Provide initial data if no filters applied and initialPage exists

     initialData: !filters || Object.keys(filters).length === 0
      ? initialPage
        ? { pages: [initialPage], pageParams: [1] }
        : undefined
      : undefined,

    getNextPageParam: (lastPage) => {
      const { currentPage, totalPages } = lastPage.metadata;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
}
