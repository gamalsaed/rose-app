'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { TicketPercent } from 'lucide-react';
import { applyCouponAction } from '@/lib/actions/checkout.action';
import { ErrorBox } from '@/components/shared/error-box';
import { useTranslations } from 'next-intl';
type CodeType = {
  code: string;
};

export default function SummaryForm() {
  // Mutation
  const { data, isPending, mutate } = useMutation({
    mutationKey: ['apply-coupon'],
    mutationFn: (data: CodeType) => applyCouponAction(data),
  });

  // Translation
  const t = useTranslations('summary');

  // Submit Handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Parsing Data From Form
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as CodeType;
    // mutate FN
    mutate(data);
  };

  return (
    <form className="flex gap-4 flex-col" onSubmit={handleSubmit}>
      <div className="flex w-full gap-2.5">
        <Input placeholder={t('coupon-code')} name="code" />
        <Button className="w-fit" type="submit" disabled={isPending}>
          <TicketPercent size={24} />
          <p>{t('apply-coupon')}</p>
        </Button>
      </div>
      {data?.error && <ErrorBox error={data.error} />}
    </form>
  );
}
