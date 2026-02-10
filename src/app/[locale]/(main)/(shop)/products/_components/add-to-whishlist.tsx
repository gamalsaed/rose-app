'use client';

import { cn } from '@/lib/utilits/cn';
import { HeartMinus, HeartPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

type Props = {
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
};

// Button for adding/removing a product from the wishlist
export default function AddToWhishlist({ isActive, onClick, disabled }: Props) {
  const t = useTranslations();

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        `absolute top-2 start-2
        group
        flex items-center gap-2
        h-10
        w-10 
        overflow-hidden
        rounded-full
        border
        transition-all duration-300 ease-in-out
        font-medium
        px-2`,
        disabled && 'opacity-50 cursor-not-allowed',
        isActive
          ? `bg-black text-white hover:w-48 border-none`
          : `text-maroon-600 bg-white rtl:hover:w-48 hover:w-36 `
      )}
    >
      {isActive ? (
        <HeartMinus className="h-5 w-5 flex-shrink-0 text-white" />
      ) : (
        <HeartPlus className="h-5 w-5 flex-shrink-0 text-maroon-600" />
      )}

      <span
        className="
          whitespace-nowrap
          text-sm
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-200
        "
      >
        {isActive ? t('remove-from-wishlist') : t('add-to-wishlist')}
      </span>
    </button>
  );
}
