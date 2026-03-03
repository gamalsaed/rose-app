'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import AddressCard from './address-card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import AddressManagerModal from './address-manger-modal';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function AddressesModal({
  isOpen,
  setIsOpen,
  addresses,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addresses: Address[];
}) {
  //translation
  const t = useTranslations('address');
  const locale = useLocale();
  //state
  const [view, setView] = useState<'default' | 'add'>('default');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {/* Overlay */}

        <DialogContent
          dir={locale === 'ar' ? 'rtl' : 'ltr'}
          className="p-0 max-w-[53.125rem] [&>button]:hidden overflow-y-auto focus:outline-none bg-white dark:bg-zinc-900 "
        >
          {view === 'default' && (
            <div className=" p-6 pe-10    h-[35rem] rounded-lg  flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-zinc-200 dark:border-zinc-800 mb-9">
                <h2 className="text-2xl font-bold text-zink-800 dark:text-white">
                  {t('title-address')}
                </h2>
                <Button
                  onClick={() => setView('add')}
                  variant="secondary"
                  className="
                          w-44
                          rounded-sm
                          capitalize
                          border-0
                          outline-none
                          ring-0
                          focus:outline-none
                          focus:ring-0
                          focus-visible:outline-none
                          focus-visible:ring-0
                          active:outline-none
                          active:ring-0
                          shadow-none
                          "
                >
                  {t('add-address')}
                </Button>
              </div>
              {/* Addresses list */}
              <div className="flex flex-col">
                {addresses.length === 0 ? (
                  <div className="text-center space-y-4">
                    <p className="text-zinc-500 dark:text-zinc-400 text-lg">
                      {t('no-addresses')}
                    </p>
                    <Button
                      onClick={() => setView('add')}
                      variant="secondary"
                      className="rounded-sm"
                    >
                      {t('add-address')}
                    </Button>
                  </div>
                ) : (
                  addresses.map(address => (
                    <AddressCard
                      key={address._id}
                      _id={address._id}
                      street={address.street}
                      city={address.city}
                      phone={address.phone}
                      onEdit={() => {
                        setSelectedAddress(address);
                        setView('add');
                      }}
                    />
                  ))
                )}
              </div>
            </div>
          )}
          {/* Edit view */}

          {view === 'add' && (
            <AddressManagerModal
              onBack={() => {
                setView('default');
                setSelectedAddress(null);
              }}
              existingAddress={selectedAddress}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
