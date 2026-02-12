import { cookies } from 'next/headers';
import { decode, JWT } from 'next-auth/jwt';

const AUTH_COOKIE = 'next-auth.session-token';

export const getAccessToken = async () => {
  const cookieStore = cookies();
  // authCookie: The raw encrypted JWT string stored in the browser cookie.
  const authCookie = cookieStore.get(AUTH_COOKIE)?.value;

  let jwt: JWT | null = null;

  try {
    // Decode the JWT to get the backend cookie
    jwt = await decode({
      token: authCookie,
      secret: process.env.NEXTAUTH_SECRET!,
    });
  } catch (error) {
    console.error('Error decoding token', error);
  }

  return jwt?.token || null;
};
