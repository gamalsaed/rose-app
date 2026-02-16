'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import { AddressItem } from './address-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Addresses, Address } from '@/lib/types/checkout.t';

type AddressStepType = {
  handleStep: (num: number) => void;
  handleAddress: (addr: Address) => void;
  Addresses: Addresses;
  currentAddress: Address | null;
};

export default function AddressStep({
  handleStep,
  handleAddress,
  Addresses,
  currentAddress,
}: AddressStepType) {
  return (
    <div className="w-full flex flex-col">
      {/* Title */}
      <h1 className="text-3xl font-semibold">Shipping Address</h1>

      {/* Addresses Scroll Area */}
      {Addresses.length > 0 && (
        <ScrollArea className="h-80  w-full rounded-md flex py-4 pr-4">
          {Addresses.map(address => {
            return (
              <AddressItem
                selectedAddress={currentAddress}
                handleAddress={handleAddress}
                {...address}
                key={address._id}
              />
            );
          })}
        </ScrollArea>
      )}

      {/* Separator */}
      {Addresses.length > 0 && (
        <div className="flex mt-5 relative items-center justify-center">
          <Separator className="absolute" />
          <p className="bg-white z-20 px-2.5">OR</p>
        </div>
      )}

      {/* Add a New Address Modal not finished yet */}
      <Button variant={'secondary'} className="my-5">
        Add a New Address
      </Button>

      {/* Next Step */}
      {Addresses.length > 0 && (
        <Button
          disabled={currentAddress === null}
          className="w-32 mt-4 self-end"
          onClick={() => handleStep(2)}
        >
          Next <MoveRight className="ml-2" />{' '}
        </Button>
      )}
    </div>
  );
}
