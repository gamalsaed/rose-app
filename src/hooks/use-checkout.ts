'use client';

import { checkoutAction } from '@/lib/actions/checkout.action';
import type { Address } from '@/lib/types/checkout.t';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';

type CheckoutParams = {
  shippingAddress: Address;
  method: 'cash' | 'credit' | null;
};

export function useCheckout({ method }: Pick<CheckoutParams, 'method'>) {
  // Translation
  const t = useTranslations('checkout');

  // Router
  const router = useRouter();

  // Mutation
  const { error, mutate, isPending, isSuccess } = useMutation({
    mutationKey: ['create-order'],
    mutationFn: async (data: CheckoutParams) => {
      if (method === null) {
        throw new Error("Method Can't be none");
      }

      const res = await checkoutAction(data);

      // Error handler because we use action
      if ('error' in res) {
        throw new Error(res.error);
      } else {
        return res;
      }
    },

    onSuccess: data => {
      toast.success(t('success-order-toast'));
      if (method === 'credit') {
        // dosen't work in the backend
        // window.location.href = data.session.url;
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }

      if (method === 'cash') {
        setTimeout(() => {
          router.push('/');
        }, 1000);
      }
    },
  });

  return {
    error,
    mutate,
    isPending,
  };
}
