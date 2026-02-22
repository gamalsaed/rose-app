import { useMutation } from '@tanstack/react-query';
import { deleteAccountAction } from '@/lib/actions/profile.actions';
import { useLogout } from '@/hooks/auth/use-logout';

import { toast } from 'sonner';

export function useDeleteAccount() {
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

      toast.success('Account deleted successfully');
    },
  });

  return {
    deleteAccount: mutate,
    isPending,
    error,
  };
}
