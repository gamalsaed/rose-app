import { registerSchema, RegisterFormValues } from '@/lib/schemas/auth.schema';
const BASE_URL = 'https://flower.elevateegy.com/api/v1';

export async function registerAPI(data: RegisterFormValues) {
  // Zod validation in server
  const parsed = registerSchema().safeParse(data);
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map(i => i.message).join('\n'));
  }

  try {
    // Calling backend / API
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    // If something went wrong!
    if (!res.ok) {
      // const error = await res.json();
      throw new Error('Registration failed');
    }

    // If Success
    return { success: true };

    // Catchs any unexpected errors
  } catch (err) {
    throw new Error(
      'Unexpected error, Something went wrong. Please try again.'
    );
  }
}
