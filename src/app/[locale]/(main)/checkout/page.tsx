import React from 'react';
import Checkout from './_components/checkout';
import { ErrorBox } from '@/components/shared/error-box';
import { getAddresses } from '@/lib/actions/checkout.action';
import CartSummary from '@/components/features/checkout/cart-summary';

export default async function page() {
  // Fetch addresses
  const addresses = await getAddresses();
  console.log(addresses);
  // Error Handling
  if ('error' in addresses) {
    return <ErrorBox />;
  }
  console.log(addresses);
  return (
    <div className="my-16 mx-20 ">
      <div className="flex w-full max-md:flex-wrap  max-md:justify-center gap-10">
        <Checkout Addresses={addresses.addresses} />
        {/* Summary */}
        {/* <CartSummary env="checkout" /> */}
      </div>
    </div>
  );
}
