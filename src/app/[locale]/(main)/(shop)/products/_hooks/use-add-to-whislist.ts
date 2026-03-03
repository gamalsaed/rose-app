'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useTranslations } from 'next-intl';
import {
  addToWishlist,
  checkProductInWishlist,
  removeFromWishlist,
} from '@/lib/services/wishlist.service';

type Params = { productId: string; isAuth: boolean };
type WishlistItem = { id: string; isInWishlist: boolean };
type OnErrorContext = { previousWishlist?: WishlistItem[] };

export function useAddToWishlist() {
  //translations
  const t = useTranslations();
  //Queries
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, variables } = useMutation<
    boolean,
    Error,
    Params,
    OnErrorContext
  >({
    mutationFn: async ({ productId }: Params) => {
      const isInWishlist = await checkProductInWishlist(productId);

      if (isInWishlist) {
        await removeFromWishlist(productId);
      } else {
        await addToWishlist(productId);
      }

      return !isInWishlist;
    },
    // Optimistic update
    onMutate: async ({ productId }: Params) => {
      await queryClient.cancelQueries({ queryKey: ['wishlist'] });
      const previousWishlist = queryClient.getQueryData<WishlistItem[]>([
        'wishlist',
      ]);

      queryClient.setQueryData<WishlistItem[]>(['wishlist'], old =>
        old?.map(item =>
          item.id === productId
            ? { ...item, isInWishlist: !item.isInWishlist }
            : item
        )
      );

      return { previousWishlist };
    },

    // Error handling
    onError: (error, _variables, context) => {
      if (context?.previousWishlist) {
        queryClient.setQueryData(['wishlist'], context.previousWishlist);
      }

      toast({
        variant: 'destructive',
        description: error.message || t('something-went-wrong'),
      });
    },

    onSuccess: (isInWishlist: boolean) => {
      toast({
        variant: 'success',
        description: isInWishlist
          ? t('added-to-wishlist-successfully')
          : t('remove-from-wishlist-successfully'),
      });

      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
  });

  return { mutateAsync, isPending, variables };
}
