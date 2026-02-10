'use server';

import { decode } from 'next-auth/jwt';
import { cookies } from 'next/headers';

//Extracts and decodes the user's access token from NextAuth cookies.

export async function getUserToken() {

  // Chooses the correct cookie name based on environment (development vs production).
  const encodedToken =
    cookies().get('next-auth.session-token')?.value ||
    cookies().get('__Secure-next-auth.session-token')?.value;

  // No session , user is not authenticated
  if (!encodedToken) return null;

  // Decode the JWT to extract the access token
  const decodedToken = await decode({
    token: encodedToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });


  return decodedToken?.token as string | null;
}
