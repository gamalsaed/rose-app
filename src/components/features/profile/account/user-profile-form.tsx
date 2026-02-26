'use client';

import { useTranslations } from 'next-intl';

import { useEditProfile } from '@/hooks/profile/use-edit-profile';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProfileSchema } from '@/lib/schemas/profile.schema';
import { ProfileFormValues } from '@/lib/types/profile';
import {
  Form,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Selector } from '@/components/shared/selector';
import { PhoneInput } from '@/components/shared/phone-input';
import { Button } from '@/components/ui/button';
import { ErrorBox } from '@/components/shared/error-box';
import { DeleteAccountPopup } from './delete-account-popup';
import { User } from 'next-auth';

type UserProfileFormProps = {
  user: User['user'];
};

export function UserProfileForm({ user }: UserProfileFormProps) {
  // Translation
  const t = useTranslations();
  const validationMessages = useTranslations('register.validation');

  // Hooks
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(updateProfileSchema(validationMessages)),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
    },
  });

  // Mutations
  const { editProfile, isPending, error } = useEditProfile();

  // Functions
  const onSubmit = (data: ProfileFormValues) => {
    editProfile({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2.5">
            <div className="flex gap-5 ">
              {/* First Name */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('register.firstName.label')}</FormLabel>
                    <FormControl>
                      <Input {...field} error={!!error} />
                    </FormControl>
                    <FormMessage>{error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="lastName"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormLabel>{t('register.lastName.label')}</FormLabel>
                    <FormControl>
                      <Input {...field} error={!!error} />
                    </FormControl>
                    <FormMessage>{error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem>
                  <FormLabel>{t('register.email.label')}</FormLabel>
                  <Input {...field} type="email" error={!!error} />
                  <FormMessage>{error?.message}</FormMessage>
                </FormItem>
              )}
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
                      placeholder={t('register.phone.placeholder')}
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
                      label={t('register.gender.label')}
                      placeholder={t('register.gender.placeholder')}
                      data={['Male', 'Female']}
                      value={field.value}
                      onValueChange={field.onChange}
                      error={!!error}
                      disabled
                    />
                    <FormMessage>{error?.message}</FormMessage>
                  </FormItem>
                );
              }}
            />
          </div>

          {/* Backend Validation Error */}
          <div className="mt-9">
            {error && <ErrorBox error={error.message} />}

            {/* Form Actions */}
            <div className="flex justify-between items-end mt-14">
              <DeleteAccountPopup />

              <Button
                type="submit"
                loading={isPending}
                disabled={!form.formState.isDirty}
                className="max-w-56"
              >
                {t('profile.save-changes')}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
