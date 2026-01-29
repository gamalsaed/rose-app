import { z } from 'zod';

import z from 'zod';
import { User } from 'next-auth';
import { OtpStepSchema } from '@/lib/schemas/auth.schema';
import { createLoginSchema } from '@/lib/schemas/auth.schema';

// Login
export type LoginFields = z.infer<ReturnType<typeof createLoginSchema>>;

export type LoginResponse = {
  token: string;
  user: User['user'];
};

export type ForgotPasswordStep =
  (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

export type OtpStepField = z.infer<ReturnType<typeof OtpStepSchema>>;

declare type ForgotPasswordResponse = {
  info: string;
  message: string;
};
declare type resetPasswordResponse = {
  message: string;
  token: string;
};

export type forgetPasswordFormFields = z.infer<typeof forgetPasswordFormSchema>;
export type setPasswordFormFields = z.infer<typeof setPasswordFormSchema>;
