import { z } from 'zod';
import { getTranslations } from 'next-intl/server';

//Add Address
export type AddressTranslations = Awaited<
  ReturnType<typeof getTranslations<'address'>>
>;
export const addAddressSchema = (t: AddressTranslations) =>
  z.object({
    city: z
      .string()
      .nonempty(t('city-required'))
      .min(2, t('city-min'))
      .max(50, t('city-max')),

    street: z
      .string()
      .nonempty(t('street-required'))
      .min(5, t('street-min'))
      .max(100, t('street-max')),

    phone: z
      .string()
      .nonempty(t('phone-required'))
      .regex(/^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/, t('phone-invalid')),
  });

// Map Schema
export const mapSchema = (t: AddressTranslations) =>
  z.object({
    lat: z.string().nonempty(t('location-required')),
    long: z.string().nonempty(t('location-required')),
  });

// All Schema
export const allAddressSchema = (t: AddressTranslations) =>
  addAddressSchema(t).merge(mapSchema(t));

export type FormData = z.infer<ReturnType<typeof allAddressSchema>>;
