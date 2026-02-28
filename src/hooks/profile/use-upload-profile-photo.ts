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
      // Session was already updated on the server by updateSessionUserAction; refetch so client state syncs
      await updateSession();
    },
  });

  return { uploadProfilePhoto: mutate, isPending, error };
}
