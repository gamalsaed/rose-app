import React from 'react';
import Checkout from './_components/checkout';
import { ErrorBox } from '@/components/shared/error-box';
import { getAddresses } from '@/lib/actions/checkout.action';

export default async function page() {
  // Fetch addresses
  const addresses = await getAddresses();

  // Error Handling
  if ('error' in addresses) {
    return <ErrorBox />;
  }

  return (
    <div className="my-16 mx-20">
      <Checkout Addresses={addresses.addresses} />
    </div>
  );
}
