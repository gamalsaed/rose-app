import { useMutation } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import { useLogout } from '@/hooks/auth/use-logout';
import { deleteAccountAction } from '@/lib/actions/profile.actions';

import { toast } from 'sonner';

export function useDeleteAccount() {
  // Translation
  const t = useTranslations('profile');

  // Hooks
  const { logout } = useLogout();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const response = await deleteAccountAction();

      if ('error' in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: () => {
      logout();

      toast.success(t('delete-account-success'));
    },
  });

  return {
    deleteAccount: mutate,
    isPending,
    error,
  };
}
