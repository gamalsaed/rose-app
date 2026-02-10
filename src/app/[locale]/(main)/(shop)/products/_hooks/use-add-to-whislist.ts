'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from '@/lib/services/wishlist.service';
import { useTranslations } from 'next-intl';

type Params = { productId: string; isActive: boolean };

// Custom hook to manage wishlist actions:
export function useWishlist() {
  const queryClient = useQueryClient();
  const t = useTranslations();
  // Fetches the current wishlist using react-query.
  const query = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
  });
  //  Handles adding/removing products from the wishlist.
  const mutation = useMutation({
    mutationFn: ({ productId, isActive }: Params) =>
      isActive ? removeFromWishlist(productId) : addToWishlist(productId),

    // - Shows success toast on add/remove.

    onSuccess: (_, variables: Params) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });

      toast({
        variant: 'success',
        description: variables.isActive
          ? t('remove-from-wishlist-successfully')
          : t('added-to-wishlist-successfully'),
      });
    },

    onError: error => {
      const message = error?.message || t('something-went-wrong');
      toast({
        variant: 'destructive',
        description: message,
      });
    },
  });

  return {
    ...query,
    toggleWishlist: mutation.mutate,
    mutation,
  };
}
