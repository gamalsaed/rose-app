import { z } from 'zod';

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
