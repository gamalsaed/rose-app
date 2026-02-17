'use server';

import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

//Extracts and decodes the user's access token from NextAuth cookies.

export async function getUserToken() {

   const decodedToken = await getToken({
    req: { cookies: cookies() } as any,
    secret: process.env.NEXTAUTH_SECRET,
  });



  return decodedToken?.token as string | null;
}