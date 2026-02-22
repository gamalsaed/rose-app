import { z } from 'zod';
import { Translations } from '@/lib/types/next-intl';

export const uploadProfilePhotoSchema = z.object({
  photo: z.string(),
});

export const userProfileDataSchema = z.object({
  _id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  gender: z.string(),
  phone: z.string(),
  photo: z.string(),
  role: z.string(),
  wishlist: z.array(z.string()),
  addresses: z.array(z.string()),
  createdAt: z.string(),
});

export const updateProfileSchema = (t: Translations) => {
  return z.object({
    firstName: z.string().min(2, {
      message: t ? t('firstName-min') : 'First name is too short',
    }),
    lastName: z
      .string()
      .min(2, { message: t ? t('lastName-min') : 'Last name is too short' }),
    email: z
      .string()
      .email({ message: t ? t('invalid-email') : 'Invalid email address' }),
    phone: z.string().regex(/^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/, {
      message: t ? t('invalid-phone') : 'Invalid phone number',
    }),
    gender: z.enum(['male', 'female', ''], {
      message: t ? t('gender-required') : 'Gender is required',
    }),
  });
};
