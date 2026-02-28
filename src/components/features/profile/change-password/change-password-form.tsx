'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useChangePassword } from '@/hooks/profile/use-change-password';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import PassInput from '@/components/shared/pass-input';

import { ChangePasswordFormValues } from '@/lib/types/profile';
import { changePasswordFormSchema } from '@/lib/schemas/profile.schema';
import { ErrorBox } from '@/components/shared/error-box';

export function ChangePasswordForm() {
  // Translation
  const t = useTranslations('profile');
  const authMessages = useTranslations('auth');

  // Form & validation
  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordFormSchema(authMessages)),
    defaultValues: {
      password: '',
      newPassword: '',
      rePassword: '',
    },
  });

  // Mutations
  const { changePassword, isPending, error } = useChangePassword();

  // Functions
  const onSubmit = (data: ChangePasswordFormValues) => {
    changePassword({
      password: data.password,
      newPassword: data.newPassword,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Old Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="space-y-0 ">
              <FormLabel className="text-zinc-800 dark:text-zinc-50 mb-1.5">
                {t('old-password')}
              </FormLabel>

              <FormControl>
                <PassInput
                  {...field}
                  error={!!error}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Separator className="my-6" />

        {/* New Password */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem className="mb-2.5 space-y-0 ">
              <FormLabel className="text-zinc-800 dark:text-zinc-50 mb-1.5">
                {t('new-password')}
              </FormLabel>

              <FormControl>
                <PassInput
                  {...field}
                  error={!!error}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="rePassword"
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormLabel className="text-zinc-800 dark:text-zinc-50">
                {authMessages('re-password')}
              </FormLabel>

              <FormControl>
                <PassInput
                  {...field}
                  error={!!error}
                  onChange={field.onChange}
                  value={field.value}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Backend Validation Error */}
        <div className="mt-9">
          {error && <ErrorBox error={error.message} />}

          {/* Form Actions */}
          <div className="flex justify-between items-end mt-14">
            <Button
              type="submit"
              loading={isPending}
              className="max-w-56 ms-auto"
            >
              {t('change-password')}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
