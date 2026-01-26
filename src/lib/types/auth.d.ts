



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