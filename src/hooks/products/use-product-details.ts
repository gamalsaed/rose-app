import { useQuery } from '@tanstack/react-query';
import { getProductDetails } from '@/lib/services/products';

export function useProductDetails(productId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['product-details', productId],
    queryFn: () => getProductDetails(productId),
    enabled: !!productId,
  });

  return {
    product: data?.product,
    isLoading,
    error,
  };
}
