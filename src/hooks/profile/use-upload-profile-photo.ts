import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { uploadProfilePhotoAction } from '@/lib/actions/profile.actions';

export function useUploadProfilePhoto() {
  const { update: updateSession } = useSession();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await uploadProfilePhotoAction(formData);

      if ('error' in response) {
        throw new Error(response.error);
      }

      return response;
    },
    onSuccess: async () => {
      // Get updated user data to update the client session
      const loggedUserData = await fetch('/api/auth', {}).then(res =>
        res.json()
      );

      updateSession({ user: loggedUserData.user });
    },
  });

  return { uploadProfilePhoto: mutate, isPending, error };
}
