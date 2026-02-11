import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { AddToCartPayload } from '@/lib/types/products';
import { addToCart } from '@/lib/actions/products.actions';

import { toast } from 'sonner';

export function useAddToCart() {
  // Translations
  const t = useTranslations();

  const { mutate, isPending, error, isError } = useMutation({
    mutationFn: async (payload: AddToCartPayload) => {
      const response = await addToCart(payload);
      return response;
    },
    onError: error => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success(t('product-details.added-cart-success'));
    },
  });

  return { mutate, isPending, error, isError };
}
