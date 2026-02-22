import { z } from 'zod';
import { accountFormSchema } from '@/lib/schemas/profile.schema';
import { User } from 'next-auth';

// Upload Profile Photo
export type UploadProfilePhotoPayload = FormData;
export type UploadProfilePhotoResponse = ApiResponse<object>;

// Edit Profile
export type ProfileFormValues = z.infer<ReturnType<typeof accountFormSchema>>;
export type EditProfilePayload = Partial<ProfileFormValues>;
export type EditProfileResponse = ApiResponse<{
  user: User['user'];
}>;
