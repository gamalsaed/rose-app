import { useTranslations } from 'next-intl';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import { editProfileAction } from '@/lib/actions/profile.actions';
import { EditProfilePayload } from '@/lib/types/profile';

import { toast } from 'sonner';

export function useEditProfile() {
  // Translations
  const t = useTranslations('profile');

  // Hooks
  const { update: updateSession } = useSession();

  // Mutation
  const {
    mutate: editProfile,
    isPending,
    error,
    isError,
  } = useMutation({
    mutationFn: async (payload: EditProfilePayload) => {
      const response = await editProfileAction(payload);

      if ('error' in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: data => {
      toast.success(t('profile-updated-successfully'));

      // Update the client session (passed as `session` in the JWT callback when trigger is "update")
      updateSession({ user: data.user });
    },
  });

  return { editProfile, isPending, error, isError };
}
