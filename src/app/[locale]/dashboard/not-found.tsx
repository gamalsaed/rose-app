import { useTranslations } from 'next-intl';
import Image from 'next/image';
import React from 'react';

export default function NotFound() {
  // Translation
  const t = useTranslations('dashboard-general');

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <Image
          src="/assets/images/dashboard/not-found.png"
          alt=""
          width={710}
          height={80}
          className="object-cover mb-12"
        />
        <h1 className="font-semibold text-4xl mb-4">{t('not-found-title')}</h1>
        <p className="text-zinc-400 text-xl">{t('not-found-message')}</p>
      </div>
    </>
  );
}
