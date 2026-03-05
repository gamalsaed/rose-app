'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface ErrorPageProps {
  errorDetails?: string;
  onRetry?: () => void; 
}

export default function ErrorPage({ errorDetails, onRetry }: ErrorPageProps) {
  // Translation
  const t = useTranslations('dashboard-general');

  // State
  const [showDetails, setShowDetails] = useState(false);

  // Functions
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload(); 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 text-center px-4">
      <img
        src="/assets/images/dashboard/server-down.png"
        alt={t('error-page-title')}
        className="w-[300px] md:w-[400px] h-[300px] md:h-[400px] object-cover mb-8"
      />
      <h1 className="font-bold text-3xl md:text-4xl mb-4">{t('error-page-title')}</h1>
      <p className="text-zinc-500 text-lg md:text-xl mb-6">{t('error-page-message')}</p>

      <Button onClick={handleRetry} variant={'outline'} className="mt-5 w-44 h-10 rounded-lg">
        {t('retry')}
      </Button>

      {errorDetails && (
        <div className="mt-2 text-left max-w-xl">
          <button
            className="text-sm text-maroon-600 underline"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? t('hide-details') : t('show-details')}
          </button>
          {showDetails && (
            <pre className="bg-zinc-100 p-4 rounded mt-2 overflow-x-auto text-sm">
              {errorDetails}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}