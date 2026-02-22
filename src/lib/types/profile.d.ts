import { z } from 'zod';
import {
  accountFormSchema,
  changePasswordFormSchema,
} from '@/lib/schemas/profile.schema';
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

// Change Password
export type ChangePasswordFormValues = z.infer<
  ReturnType<typeof changePasswordFormSchema>
>;
export type ChangePasswordPayload = Omit<
  ChangePasswordFormValues,
  'rePassword'
>;
export type ChangePasswordResponse = ApiResponse<{
  token: string;
}>;
