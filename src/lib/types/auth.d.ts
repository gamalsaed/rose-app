import { z } from 'zod';
import { User } from 'next-auth';

import { createLoginSchema } from '@/lib/schemas/auth.schema';

// Login
export type LoginFields = z.infer<ReturnType<typeof createLoginSchema>>;

export type LoginResponse = {
  token: string;
  user: User['user'];
};
