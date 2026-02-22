import { z } from 'zod';
import { accountFormSchema } from '@/lib/schemas/profile.schema';
import { User } from 'next-auth';

// Edit Profile
export type ProfileFormValues = z.infer<ReturnType<typeof accountFormSchema>>;
export type EditProfilePayload = Partial<ProfileFormValues>;
export type EditProfileResponse = ApiResponse<{
  user: User['user'];
}>;
