import { z } from 'zod';
import type { getTranslations } from 'next-intl/server';
import { Translations as AuthTranslations } from '../types/globals';

// Type of getTranslations function
export type Translations = Awaited<ReturnType<typeof getTranslations>>;

// Login Schema

export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z.email({
      error: issue =>
        issue.input === undefined || issue.input === ''
          ? t('auth.email-required')
          : t('auth.email-invalid'),
    }),
    password: z.string().min(1, t('auth.password-required')),
  });

// Register Schema

export function registerSchema(t?: Translations) {
  return z
    .object({
      firstName: z.string().min(2, {
        message: t ? t('firstName-min') : 'First name is too short',
      }),
      lastName: z
        .string()
        .min(2, { message: t ? t('lastName-max') : 'First name is too long' }),
      email: z
        .string()
        .email({ message: t ? t('invalid-email') : 'Invalid email address' }),
      phone: z.string().regex(/^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/, {
        message: t ? t('invalid-phone') : 'Invalid phone number',
      }),
      gender: z.enum(['male', 'female', ''], {
        message: t ? t('gender-required') : 'Gender is required',
      }),
      password: z
        .string()
        .min(8, {
          message: t
            ? t('password-min')
            : 'Password must be at least 8 characters',
        })
        .regex(/[A-Z]/, {
          message: t
            ? t('password-uppercase')
            : 'Password must contain at least one uppercase letter',
        })
        .regex(/[0-9]/, {
          message: t
            ? t('password-number')
            : 'Password must contain at least one number',
        })
        .regex(/[^A-Za-z0-9]/, {
          message: t
            ? t('password-special')
            : 'Password must contain at least one special character',
        }),
      rePassword: z.string(),
    })
    .refine(data => data.password === data.rePassword, {
      path: ['rePassword'],
      message: t ? t('rePassword-match') : 'Passwords do not match',
    });
}

// Typeof RegisterSchema the return value of the function
export type RegisterFormValues = z.infer<ReturnType<typeof registerSchema>>;

export const OtpStepSchema = (t: AuthTranslations) =>
  z.object({ otp: z.string().min(6, t('otp-is-required')) });

//schema from menna
export const forgetPasswordFormSchema = (t: AuthTranslations) =>
  z.object({
    email: z
      .string()
      .nonempty(t('email-required'))
      .email({ message: t('invalid-email') }),
  });

export const setPasswordFormSchema = (t: AuthTranslations) =>
  z
    .object({
      password: z
        .string()
        .nonempty(t('password-required'))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          t('invalid-password')
        ),
      rePassword: z
        .string()
        .nonempty(t('repassword-required'))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
          t('invalid-password')
        ),
    })
    .refine(data => data.password === data.rePassword, {
      message: t('passwords-match'),
      path: ['rePassword'],
    });
