import { useTranslations } from 'next-intl';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { signOut } from 'next-auth/react';

export function useLogout() {
  // Translation
  const t = useTranslations();

  // Hooks
  const { toast } = useToast();

  const {
    mutate: logout,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => await signOut(),
    onError: error => {
      const message =
        error instanceof Error
          ? error.message
          : t('auth.logout-fallback-error');

      toast({
        title: t('auth.logout-fallback-error'),
        description: message,
        variant: 'destructive',
      });
    },
  });

  return {
    logout,
    isPending,
    error,
  };
}
