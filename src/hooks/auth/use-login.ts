import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { LoginFields } from '@/lib/types/auth';
import { signIn } from 'next-auth/react';
import { getPathnameWithLocale } from '@/i18n/navigation';

import { DEFAULT_ROUTE } from '@/lib/constants/navigation.constants';

export function useLogin() {
  // * translation
  const t = useTranslations();
  const locale = useLocale();

  const {
    mutate: login,
    isPending,
    error,
  } = useMutation({
    mutationFn: async (fields: LoginFields) => {
      const response = await signIn('credentials', {
        ...fields,
        redirect: false,
      });

      if (!response?.ok) {
        throw new Error(response?.error || t('auth.login-fallback-error'));
      }

      return response;
    },
    onSuccess: () => {
      const callbackUrl =
        new URLSearchParams(location.search).get('callbackUrl') ||
        getPathnameWithLocale(locale, DEFAULT_ROUTE);

      // * refresh the page and make sure date is updated correctly
      window.location.href = callbackUrl;
    },
  });

  return {
    login,
    isPending,
    error,
  };
}
