'use server';

import { getToken } from 'next-auth/jwt';
import { cookies } from 'next/headers';

interface DecodedToken {
  token: string;
  email?: string;
  name?: string;
}

export async function getUserToken(): Promise<string | null> {
  try {
    const token = await getToken({ req: { cookies: cookies() }, secret: process.env.NEXTAUTH_SECRET }) as DecodedToken | null;

  
    return token?.token ?? null;
  } catch (error) {
    console.error('Failed to get user token:', error);
    return null;
  }
}