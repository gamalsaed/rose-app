import React from 'react';
import { useTranslations } from 'next-intl';
import AddressForm from './address-step-form';

export default function AddressManagerModal({
  onBack,
    existingAddress,
}: {
  onBack: () => void;
  existingAddress?: Address|null; 
}) {
  //translation
  const t = useTranslations('address');
  return (
    <>
      <div className="flex   p-6 flex-col gap-4 ">
        <h2 className="text-2xl font-bold text-zinc-800 dark:text-white">
          {existingAddress ? t('update-address') : t('add-a-new-address')}
        </h2>

        <AddressForm onBack={onBack} existingAddress={existingAddress} />
      </div>
    </>
  );
}
