import { NextResponse } from 'next/server';
import { getAccessToken } from '@/lib/utilits/apis.utils';
import { User } from 'next-auth';

const BASE_API = process.env.BASE_API as string;

export async function GET() {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/auth/profile-data`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const payload: ApiResponse<User['user']> = await response.json();

  return NextResponse.json(payload);
}
