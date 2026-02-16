'use client';

import React from 'react';
import SummaryForm from './summary-form';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '@/lib/actions/checkout.action';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Separator } from '@/components/ui/separator';
import Loader from '@/components/shared/loader';
import { toast } from 'sonner';

export default function CartSummary({ env }: { env?: string }) {
  // Query
  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => await getCart(),
  });

  // Translation
  const t = useTranslations('summary');

  // Router
  const router = useRouter();

  if (!data) {
    return <Loader />;
  }

  if (data && env === 'checkout' && data.numOfCartItems === 0) {
    toast.info('You cart is empty!');
    router.push('/');
  }

  return (
    <div className="w-1/3 max-md:w-full">
      <h1 className="font-semibold text-3xl mt-0">{t('title')}</h1>
      <div className="bg-zinc-50 p-4 mt-10">
        <SummaryForm />

        {data && (
          <main>
            <div className="w-full italic flex justify-center items-center h-64 border border-zinc-300 rounded-md mt-2.5 text-zinc-400 bg-transparent">
              {t('no-coupons-applied')}
            </div>
            <div className="flex justify-between mt-5 mb-2.5 font-medium text-lg">
              <p>{t('subtotal')}</p>
              <p>250 {t('egp')}</p>
            </div>
            <div className="relative flex items-center justify-center">
              <p className="bg-zinc-50 px-2 z-20">50% {t('discorunt')}</p>
              <Separator className="absolute" />
            </div>
            <div className="flex justify-between mt-2.5  font-bold text-2xl">
              <p>{t('total')}</p>
              <p>
                {data.cart.totalPrice} {t('egp')}
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
