import z from 'zod';
import OtpStepSchema from '@/lib/schemas/auth-schema'


export type ForgotPasswordStep = (typeof FORGOT_PASSWORD_STEPS)[keyof typeof FORGOT_PASSWORD_STEPS];

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
