'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from 'react-hook-form';

import { useLogin } from '@/hooks/auth/use-login';

import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginSchema } from '@/lib/schemas/auth.schema';
import { LoginFields } from '@/lib/types/auth';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ErrorBox } from '@/components/shared/error-box';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@/i18n/navigation';
import { Label } from '@radix-ui/react-label';

export function LoginForm() {
  // Translation
  const t = useTranslations();

  // Hooks
  const schema = useMemo(
    () => createLoginSchema(t as (key: string) => string),
    [t]
  );

  const form = useForm<LoginFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Mutations
  const { login, isPending, error } = useLogin();

  // Functions
  const onSubmit: SubmitHandler<LoginFields> = async data => {
    login(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-stretch w-full max-w-[25.375rem] mx-auto"
      >
        {/* Title */}
        <h1 className="text-center text-5xl text-maroon-700 dark:text-softPink-300 font-edwardian">
          {t('auth.welcome-back')}
        </h1>

        <Separator className="w-full mt-4 mb-6" />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState: { error } }) => (
            // TODO: Replace FormItem with InputWrapper reusable component when merged on dev
            <FormItem className="mb-4">
              <FormLabel>{t('auth.email')}</FormLabel>

              <FormControl>
                <Input
                  error={!!error}
                  {...field}
                  type="email"
                  placeholder="user@example.com"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            // TODO: Replace FormItem with InputWrapper reusable component when merged on dev
            <FormItem className="mb-2.5">
              <FormLabel>{t('auth.password')}</FormLabel>

              <FormControl>
                {/* TODO: Replace password input with the new password component */}
                <Input
                  {...field}
                  type="password"
                  placeholder="**********"
                  error={!!error}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Forgot password */}
        <Link
          href={'/forgot-password'} // TODO: Validate that this is the correct route for forgot password when merged on dev
          className="text-sm font-semibold ms-auto mb-6 text-maroon-700 dark:text-softPink-300"
        >
          {t('auth.forgot-your-password')}
        </Link>

        {/* Remember me */}
        <div className="flex items-center gap-2.5">
          {/* TODO: make sure remember me logic would be handled when merged on dev */}
          <Checkbox id="remember-me" />

          <Label htmlFor="remember-me" className="text-sm">
            {t('auth.remember-me')}
          </Label>
        </div>

        <div className="mt-9">
          {/* Backend Validation Error */}
          {error && <ErrorBox error={error.message} className="mb-9" />}

          {/* Submit Button */}
          <Button type="submit" loading={isPending}>
            {t('auth.login')}
          </Button>
        </div>

        <Separator className="w-full mt-9 mb-5" />

        {/* Don't have an account? */}
        <p className="text-center text-sm font-medium">
          {t.rich('auth.do-not-have-account', {
            cta: (chunks: React.ReactNode) => (
              <Link
                href="/signup" // TODO: Validate that this is the correct route for signup when merged on dev
                className="text-maroon-700 dark:text-softPink-300"
              >
                {chunks}
              </Link>
            ),
          })}
        </p>
      </form>
    </Form>
  );
}
