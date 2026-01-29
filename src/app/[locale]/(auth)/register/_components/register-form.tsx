'use client';

import { useForm } from 'react-hook-form';
import { Selector } from '@/components/shared/selector';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormValues, registerSchema } from '@/lib/schemas/auth.schema';
import { PhoneInput } from '@/components/shared/phone-input';
import { Input } from '@/components/ui/input';
import PassInput from '@/components/shared/pass-input';
import { Button } from '@/components/ui/button';
import { useRouter, Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { ErrorBox } from '@/components/shared/error-box';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useSignup } from '@/hooks/auth/use-signup';
import { FieldGroup } from '@/components/ui/field';

export default function RegisterForm() {
  // Navigation
  const router = useRouter();

  // Translation
  const t = useTranslations('register');
  const validationMessages = useTranslations('register.validation');
  // Form & validation
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema(validationMessages)),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      password: '',
      rePassword: '',
    },
  });

  // Sign Up custom hook
  const { signUp, error, isPending } = useSignup();

  // Submit Handler
  const onSubmit = async (data: RegisterFormValues) => {
    signUp(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4"
      >
        {/* First & Last name */}
        <FieldGroup className="flex flex-row w-full">
          <FormField
            name="firstName"
            render={({ field, fieldState: { error } }) => {
              return (
                <FormItem className=" w-full">
                  <FormLabel>{t('firstName.label')}</FormLabel>
                  <Input
                    {...field}
                    error={!!error}
                    placeholder={t('firstName.placeholder')}
                  />

                  <FormMessage>{error?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
          <FormField
            name="lastName"
            render={({ field, fieldState: { error } }) => {
              return (
                <FormItem className=" w-full">
                  <FormLabel>{t('firstName.label')}</FormLabel>
                  <Input
                    {...field}
                    error={!!error}
                    placeholder={t('firstName.placeholder')}
                  />
                  <FormMessage>{error?.message}</FormMessage>
                </FormItem>
              );
            }}
          />
        </FieldGroup>

        {/* Email */}
        <FormField
          name="email"
          render={({ field, fieldState: { error } }) => {
            return (
              <FormItem className=" w-full">
                <FormLabel>{t('email.label')}</FormLabel>
                <Input
                  {...field}
                  error={!!error}
                  placeholder={t('email.placeholder')}
                />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* Phone Input */}
        <FormField
          name="phone"
          render={({ field, fieldState: { error } }) => {
            return (
              <FormItem className=" w-full">
                <PhoneInput
                  onChange={field.onChange}
                  value={field.value}
                  placeholder={t('phone.placeholder')}
                  error={!!error}
                />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* Gender */}
        <FormField
          name="gender"
          render={({ field, fieldState: { error } }) => {
            return (
              <FormItem className=" w-full">
                <Selector
                  label={t('gender.label')}
                  placeholder={t('gender.placeholder')}
                  data={['Male', 'Female']}
                  value={field.value}
                  onValueChange={field.onChange}
                  error={!!error}
                />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* Password */}
        <FormField
          name="password"
          render={({ field, fieldState: { error } }) => {
            return (
              <FormItem className=" w-full">
                <FormLabel>{t('password.label')}</FormLabel>
                <PassInput
                  error={!!error}
                  onChange={field.onChange}
                  value={field.value}
                />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* Confirm Password */}
        <FormField
          name="rePassword"
          render={({ field, fieldState: { error } }) => {
            return (
              <FormItem className=" w-full">
                <FormLabel>{t('rePassword.label')}</FormLabel>
                <PassInput
                  error={!!error}
                  onChange={field.onChange}
                  value={field.value}
                />
                <FormMessage>{error?.message}</FormMessage>
              </FormItem>
            );
          }}
        />

        {/* Server Errors */}
        {error && <ErrorBox error={error} className="mb-9" />}

        {/* Submit */}
        <Button type="submit" loading={isPending} className=" capitalize">
          {t('createAcc')}
        </Button>

        <p className="text-center">
          {t('registerMsg')}{' '}
          <Link
            href="/login"
            className="text-maroon-700 dark:text-softPink-300"
          >
            {t('login')}
          </Link>
        </p>
      </form>
    </Form>
  );
}
