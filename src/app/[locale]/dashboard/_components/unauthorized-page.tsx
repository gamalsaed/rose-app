import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

export default function UnauthorizedPage() {
  // Translation
  const t = useTranslations('dashboard-general');

  return (
    <div className="flex flex-col min-h-screen w-full bg-zinc-50 items-center justify-center">
      <img
        src="/assets/images/dashboard/shield.png"
        alt=""
        className="w-[360px] h-[360px] object-cover mb-12"
      />
      <h1 className="font-semibold text-4xl mb-4">
        {t('unauthorized-page-title')}
      </h1>
      <p className="text-zinc-400 text-xl border-b border-zinc-300 pb-2">
        {t('unauthorized-page-message')}
      </p>
      <Button
        asChild
        variant={'ghost'}
        className="mt-5 w-44 h-10 rounded-lg border border-zinc-300 "
      >
        <Link href="/">{t('go-to-homepage')}</Link>
      </Button>
    </div>
  );
}
