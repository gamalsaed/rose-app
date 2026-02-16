'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight, ArrowLeft } from 'lucide-react';
import MethodCard from './method-card';
import { Separator } from '@/components/ui/separator';
import type { Address } from '@/lib/types/checkout.t';
import { checkoutAction } from '@/lib/actions/checkout.action';
import { useMutation } from '@tanstack/react-query';
import { ErrorBox } from '@/components/shared/error-box';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { useTranslations } from 'next-intl';
type PaymentStepType = {
  handleStep: (num: number) => void;
  currentAddress: Address | null;
};

type CheckoutParams = {
  shippingAddress: Address;
  method: 'cash' | 'credit';
};

export default function PaymentStep({
  handleStep,
  currentAddress,
}: PaymentStepType) {
  // State
  const [method, setMethod] = useState<'cash' | 'credit' | null>(null);

  // Translation
  const t = useTranslations('checkout');

  // Router
  const router = useRouter();

  // Mutation
  const { error, mutate, isPending } = useMutation({
    mutationKey: ['create-order'],
    mutationFn: async (data: CheckoutParams) => {
      const res = await checkoutAction(data);
      // Error handler because we use action
      if ('error' in res) {
        throw new Error(res.error);
      } else {
        return res;
      }
    },

    onSuccess: () => {
      toast.success(t('success-order-toast'));
      setTimeout(() => {
        router.push('/');
      }, 1000);
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        {/* Previous step */}
        <Button
          variant="link"
          className="w-20 border-none"
          onClick={() => handleStep(1)}
        >
          <ArrowLeft className="ml-2" /> {t('back')}
        </Button>
        <h1 className="text-3xl font-semibold">{t('method')}</h1>
      </div>

      {/* Methods */}
      <div className="flex  w-full justify-evenly gap-5 mt-9">
        <MethodCard
          src="/assets/images/checkout/cash.svg"
          title={t('cash.title')}
          description={t('cash.description')}
          method="cash"
          handleMethod={setMethod}
          selectedMethod={method}
        />
        <MethodCard
          src="/assets/images/checkout/credit.svg"
          title={t('credit.title')}
          description={t('credit.description')}
          method="credit"
          handleMethod={setMethod}
          selectedMethod={method}
        />
      </div>

      <Separator className="mt-5" />

      {/* Error Case */}
      {error && <ErrorBox error={error.message} />}

      <Button
        className="w-fit float-right mt-3"
        onClick={() =>
          mutate({ shippingAddress: currentAddress!, method: method! })
        }
        disabled={isPending}
      >
        <div className="flex items-center rtl:!flex-row-reverse">
          <p>{t('checkout')}</p> <MoveRight />
        </div>
      </Button>
    </div>
  );
}
