import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import {
  changePasswordAction,
  updateSessionTokenAction,
} from '@/lib/actions/profile.actions';
import { ChangePasswordPayload } from '@/lib/types/profile';

import { toast } from 'sonner';

export function useChangePassword() {
  // Translation
  const t = useTranslations('profile');

  // Hooks
  const { update: updateSession } = useSession();

  const { isPending, error, mutate } = useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const response = await changePasswordAction(payload);

      if ('error' in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: async data => {
      if (data.token) {
        await updateSessionTokenAction(data.token);
        // Update the client session
        await updateSession();
      }
      toast.success(t('password-updated-successfully'));
    },
  });

  return { isPending, error, changePassword: mutate };
}
