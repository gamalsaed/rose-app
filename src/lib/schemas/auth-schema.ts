import z from 'zod'
import { Translations } from '../types/globals';


export const forgetPasswordFormSchema = (t:Translations)=> z.object({
    email: z.string().nonempty(t('email-required')).email({ message: t('invalid-email') }),
});

export const setPasswordFormSchema = (t:Translations)=> z.object({
    password:z.string().nonempty(t('password-required')).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,t('invalid-password')),
    rePassword:z.string().nonempty(t('repassword-required')).regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,t('invalid-password')),

}).refine(data => data.password === data.rePassword, {
    message:t('passwords-match'),
    path: ["rePassword"],
  });
