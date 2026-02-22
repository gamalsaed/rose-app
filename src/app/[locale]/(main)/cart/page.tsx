'use client';

import GetLoggedUserCart from '@/lib/actions/cart-actions/get-to-cart.action';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { CartItem } from '@/lib/types/cart';
import { ArrowLeft, BrushCleaning, Star, Trash2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Spinner } from '@/components/ui/spinner';
import RemoveFromCart from '@/lib/actions/cart-actions/remove-from-cart.action';
import UpdateCart from '@/lib/actions/cart-actions/update-cart.action';
import { toast } from 'sonner';
import ClearCart from '@/lib/actions/cart-actions/clear-cart.action';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export default function CartPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations();

  const { data: cartItems = [], isLoading } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await GetLoggedUserCart();
      console.log(res);
      if (res?.message === 'success' && res?.cart?.cartItems) {
        return res.cart.cartItems;
      }
      return [];
    },
  });

  // Remove from cart
  const removeMutation = useMutation({
    mutationFn: (id: string) => RemoveFromCart(id),
    onSuccess: data => {
      if (data?.message === 'success') {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success('Item removed from cart successfully');
      }
    },
    onError: error => {
      console.error('Remove error:', error);
      toast.error('Failed to remove item from cart');
    },
  });

  // Update cart mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
      return UpdateCart(id, quantity);
    },
    onSuccess: data => {
      if (data?.message === 'success') {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success('Cart updated successfully', {
          duration: 2000,
          position: 'top-right',
        });
      } else {
        toast.error('Failed to update cart item', {
          duration: 2000,
          position: 'top-right',
        });
      }
    },
    onError: error => {
      toast.error('Failed to update cart item', {
        duration: 2000,
        position: 'top-right',
      });
    },
  });

  // Clear cart mutation
  const clearMutation = useMutation({
    mutationFn: () => ClearCart(),
    onSuccess: data => {
      if (data.message === 'success') {
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        toast.success('Cart cleared successfully');
      }
    },
    onError: () => {
      toast.error('Failed to clear cart');
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="size-12" />
      </div>
    );
  }

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="mx-auto max-w-3xl">
          <div className="flex py-3 justify-between">
            <div className="flex relative">
              <h1 className="font-bold text-5xl">Cart</h1>
              <h6 className="font-thin absolute top-6 left-28 flex gap-1">
                <span>{cartItems.length}</span> products
              </h6>
            </div>
            <Button
              onClick={() => clearMutation.mutate()}
              disabled={clearMutation.isPending}
              variant="secondary"
              className="cursor-pointer font-light w-40 h-10"
            >
              <BrushCleaning />
              {clearMutation.isPending} clear cart
            </Button>
          </div>

          {cartItems.map((product: CartItem) => {
            const isUpdating =
              updateMutation.isPending &&
              updateMutation.variables?.id === product.product._id;
            const isRemoving =
              removeMutation.isPending &&
              removeMutation.variables === product.product._id;

            return (
              <div key={product._id} className="flex felx-col">
                <Card className="mx-auto rounded-none h-40 w-full pt-3">
                  <div className="flex flex-wrap h-40">
                    <div className="contain-fit flex-3 flex items-center">
                      <div className="mx-auto">
                        <Image
                          src={product.product.imgCover}
                          alt={product.product.title}
                          width={117}
                          height={120}
                          sizes="133"
                          className="object-cover rounded-lg"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col justify-between h-full w-full py-3 px-3">
                        <div className="flex justify-between h-[50%]">
                          <div className="text-black">
                            <CardTitle>{product.product.title}</CardTitle>
                            <div className="flex py-1">
                              <Star className="text-yellow-400 size-4 fill-yellow-400 pt-1" />
                              <span className="text-sm">
                                Rating: {product.product.rateCount}/5
                              </span>
                              <span className="text-blue-500 text-sm px-1">
                                ({product.product.rateAvg} Ratings)
                              </span>
                            </div>
                          </div>
                          <div className="text-black">
                            <Button
                              disabled={
                                removeMutation.isPending ||
                                updateMutation.isPending
                              }
                              onClick={() =>
                                removeMutation.mutate(product.product._id)
                              }
                              variant="destructive"
                              className="w-full text-sm"
                            >
                              {isRemoving ? (
                                <Spinner className="size-4" />
                              ) : (
                                <Trash2 />
                              )}
                              {isRemoving} Remove
                            </Button>
                          </div>
                        </div>
                        <div className="flex justify-between items-end h-[50%] pb-2">
                          <div className="text-black">
                            <CardTitle>{product.product.price} EGP</CardTitle>
                          </div>
                          <div className="div">
                            <div className="relative flex items-center gap-2">
                              <Button
                                disabled={
                                  updateMutation.isPending ||
                                  removeMutation.isPending
                                }
                                onClick={() =>
                                  product.quantity <= 0
                                    ? removeMutation.mutate(product.product._id)
                                    : updateMutation.mutate({
                                        id: product.product._id,
                                        quantity: product.quantity - 1,
                                      })
                                }
                                variant="secondary"
                                className="flex items-center justify-center text-bold bg-neutral-secondary-medium box-border border border-default-medium rounded-lg text-sm focus:outline-none h-12 w-12"
                              >
                                -
                              </Button>

                              <span className="text-bold bg-neutral-secondary-medium box-border border border-default-medium rounded-md text-sm focus:outline-none flex items-center justify-center w-28 h-12 px-3">
                                {isUpdating ? (
                                  <Spinner className="size-5" />
                                ) : (
                                  product.quantity || 1
                                )}
                              </span>

                              <Button
                                disabled={
                                  updateMutation.isPending ||
                                  removeMutation.isPending
                                }
                                onClick={() =>
                                  updateMutation.mutate({
                                    id: product.product._id,
                                    quantity: product.quantity + 1,
                                  })
                                }
                                variant="secondary"
                                className="flex items-center justify-center text-bold bg-neutral-secondary-medium box-border border border-default-medium rounded-lg text-sm focus:outline-none h-12 w-12"
                              >
                                +
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            );
          })}

          <Button
            onClick={() => router.push('/products')}
            className="bg-maroon-600 hover:bg-maroon-800 mt-4 text-white rounded-md flex items-center gap-2 dark:bg-softPink-200 dark:text-maroon-700 dark:hover:bg-softPink-300 h-9 w-[155px]"
          >
            <ArrowLeft className="h-4 w-5" />
            {t('best-selling.cta')}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button
            onClick={() => router.push('/products')}
            className="bg-maroon-600 hover:bg-maroon-800 mt-4 text-white rounded-md flex items-center gap-2 dark:bg-softPink-200 dark:text-maroon-700 dark:hover:bg-softPink-300 h-9 w-[155px]"
          >
            <ArrowLeft className="h-4 w-5" />
            {t('best-selling.cta')}
          </Button>
        </div>
      )}
    </>
  );
}
