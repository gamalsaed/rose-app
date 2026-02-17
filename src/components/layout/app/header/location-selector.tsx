'use client';

import AddressesModal from '@/components/features/address/address-modal';

import { MapPinPen } from 'lucide-react';
import { useState } from 'react';

export default function LocationSelector({ addresses}: {addresses: Address[]}) {
  const [isAddressesOpen, setIsAddressesOpen] = useState(false);
  

  return (
    <>
      <div
        className="w-fit cursor-pointer"
        onClick={() => setIsAddressesOpen(true)}
      >
        <div className="dark:text-zinc-500 w-20 pb-1">Deliver to:</div>
        <div className="flex text-maroon-700 dark:text-softPink-200">
          <MapPinPen size={24} />
          <span className="text-base ">{addresses[addresses.length-1]?.city || 'Add Address'}</span>
        </div>
      </div>
      <AddressesModal addresses={addresses} isOpen={isAddressesOpen} setIsOpen={setIsAddressesOpen} />
    </>
  );
}
