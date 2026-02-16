'use client';

import { useState } from 'react';
import { ProgressBar } from './progressBar';
import PaymentStep from './payment-step';
import AddressStep from './address-step';
import { Addresses, Address } from '@/lib/types/checkout.t';
import CartSummary from '@/components/features/checkout/cart-summary';

type CheckoutProps = {
  Addresses: Addresses;
};

export default function Checkout({ Addresses }: CheckoutProps) {
  // States
  const [step, setStep] = useState<number>(1);
  const [currentdAddress, setCurrentAddress] = useState<Address | null>(null);

  // Variables
  let current_step;

  // Functions
  function stepHandler(num: number) {
    if (currentdAddress !== null) setStep(num);
  }

  // STEP  1
  if (step === 1)
    current_step = (
      <AddressStep
        handleStep={stepHandler}
        handleAddress={setCurrentAddress}
        Addresses={Addresses}
        currentAddress={currentdAddress}
      />
    );

  // STEP  2
  if (step === 2)
    current_step = (
      <PaymentStep handleStep={setStep} currentAddress={currentdAddress} />
    );

  return (
    <div className="flex w-full max-md:flex-wrap max-md:justify-center gap-10">
      <div className="w-3/4">
        <div className="flex">
          <ProgressBar step={step} />
        </div>
        <div className="my-6 w-full">{current_step}</div>
      </div>
      {/* Summary */}
      <CartSummary env="checkout" />
    </div>
  );
}
