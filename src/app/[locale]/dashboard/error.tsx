'use client';


import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';


export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  // Translation
  const t = useTranslations('dashboard-general');

  // State
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-center px-4">
      {/* Error image */}
      <Image
        src="/assets/images/dashboard/server-down.png"
        alt={t('error-page-title')}
        width={400}
        height={400}
        className="object-cover mb-8"
      />

      {/* Title */}
      <h1 className="font-bold text-3xl md:text-4xl mb-4">
        {t('error-page-title')}
      </h1>

      {/* Message */}
      <p className="text-zinc-500 text-lg md:text-xl mb-6">
        {t('error-page-message')}
      </p>

      {/* Retry button */}
      <Button
        onClick={() => reset()}
        variant="outline"
        className="mt-5 w-44 h-10 rounded-lg"
      >
        {t('retry')}
      </Button>

      {/* Error details */}
      {error?.message && (
        <div className="mt-2 text-left max-w-xl">
          <Button
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? t('hide-details') : t('show-details')}
          </Button>

          {showDetails && (
            <p className="bg-zinc-100 p-4 rounded mt-2 overflow-x-auto text-sm">
              {error.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}