'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PhoneInput } from '@/components/shared/phone-input';
import { useSession } from 'next-auth/react';
import { toast } from '@/hooks/use-toast';
import { addAddress, updateAddress } from '@/lib/services/address.service';
import { allAddressSchema, FormData } from '@/lib/schemas/addres.schema';
import BackBtn from './back-btn';
import ProgressBar from './progress-bar';
import MapStep from './map-step';

type AddressFormProps = {
  onBack: () => void;
  existingAddress?: Address | null;
};

export default function AddressForm({
  onBack,
  existingAddress,
}: AddressFormProps) {
  // State
  const [step, setStep] = useState(0);
  const { data: session } = useSession();

  // Translation
  const t = useTranslations('address');

  // Form & validation
  const form = useForm<FormData>({
    resolver: zodResolver(allAddressSchema(t)),
    defaultValues: {
      city: existingAddress?.city || '',
      street: existingAddress?.street || '',
      phone: existingAddress?.phone || '',
      lat: existingAddress?.lat || '',
      long: existingAddress?.long || '',
    },
    mode: 'onChange',
  });

  const { control, handleSubmit, trigger, reset, formState, setValue } = form;

  // Variables
  const username =
    session?.user?.firstName && session?.user?.lastName
      ? `${session.user.firstName} ${session.user.lastName}`
      : '';

  const fields = [
    {
      name: 'city',
      label: t('city-label'),
      component: Input,
      placeholder: t('city-placeholder'),
    },
    {
      name: 'street',
      label: t('street-label'),
      component: Textarea,
      placeholder: t('street-placeholder'),
    },
    {
      name: 'phone',
      label: '',
      component: PhoneInput,
      placeholder: t('phone-placeholder'),
    },
  ] as const;

  const stepTitles = [t('address-title'), t('location-title')];
  const stepButtons = [t('next'), t('submit')];

  // Functions
  const handleNextStep = async () => {
    const valid = await trigger(['city', 'street', 'phone']);
    if (valid) setStep(1);
  };

  const handleSubmitForm = async (values: FormData) => {
    try {
      if (existingAddress) {
        // Update
        await updateAddress(existingAddress._id, { ...values, username });
        toast({ variant: 'success', description: t('update-success') });
      } else {
        // Add
        await addAddress({ ...values, username });
        toast({ variant: 'success', description: t('submit-success') });
      }
      reset();
      onBack();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: existingAddress ? t('update-fail') : t('submit-fail'),
      });
    }
  };

  // Effect to update form values if existingAddress changes (for edit)
  useEffect(() => {
    if (existingAddress) {
      setValue('city', existingAddress.city);
      setValue('street', existingAddress.street);
      setValue('phone', existingAddress.phone);
      setValue('lat', existingAddress.lat);
      setValue('long', existingAddress.long);
    }
  }, [existingAddress, setValue]);

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="space-y-4 w-full focus:outline-none"
      >
        {/* Header & Back button */}
        <div className="flex items-center gap-4">
          <BackBtn onBack={step === 0 ? onBack : () => setStep(step - 1)} />
          <h2 className="text-maroon-600 dark:text-softPink-600 font-medium text-2xl">
            {stepTitles[step]}
          </h2>
        </div>

        {/* Progress */}
        <ProgressBar step={String(step + 1)} />

        {/* Step 1: Basic info */}
        {step === 0 && (
          <>
            {fields.map(
              ({ name, label, component: Component, placeholder }) => (
                <FormField
                  key={name}
                  control={control}
                  name={name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Component
                          {...field}
                          className="border-zinc-300"
                          placeholder={placeholder}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )
            )}

            <Button type="button" onClick={handleNextStep}>
              {stepButtons[step]}
            </Button>
          </>
        )}

        {/* Step 2: Map */}
        {step === 1 && (
          <>
            <MapStep
              initialCenter={
                existingAddress
                  ? {
                      lat: Number(existingAddress.lat),
                      lng: Number(existingAddress.long),
                    }
                  : { lat: 30.0444, lng: 31.2357 }
              }
              onSelect={(lat, lng) => {
                setValue('lat', String(lat), { shouldValidate: true });
                setValue('long', String(lng), { shouldValidate: true });
              }}
            />

            <Button type="submit" disabled={!formState.isValid}>
              {existingAddress ? t('update-address') : stepButtons[step]}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
}
