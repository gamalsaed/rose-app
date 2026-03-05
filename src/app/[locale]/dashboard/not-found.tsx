import { useTranslations } from 'next-intl';
import React from 'react';

export default function NotFound() {
  // Translation
  const t = useTranslations('dashboard-general');

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center">
        <img
          src="/assets/images/dashboard/not-found.png"
          alt=""
          className="w-[710px] h-80 object-cover mb-12"
        />
        <h1 className="font-semibold text-4xl mb-4">{t('not-found-title')}</h1>
        <p className="text-zinc-400 text-xl">{t('not-found-message')}</p>
      </div>
    </>
  );
}
