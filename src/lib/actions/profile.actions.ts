'use server';

import { cookies } from 'next/headers';
import { decode, encode } from 'next-auth/jwt';

import {
  UploadProfilePhotoPayload,
  UploadProfilePhotoResponse,
  EditProfilePayload,
  EditProfileResponse,
  ChangePasswordPayload,
  ChangePasswordResponse,
} from '../types/profile';
import { getAccessToken } from '../utilits/apis.utils';

const BASE_API = process.env.BASE_API as string;

const SESSION_COOKIE = process.env.NEXTAUTH_URL?.startsWith('https://')
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token';

const SESSION_MAX_AGE = 30 * 24 * 60 * 60; // 30 days, match NextAuth default

export async function uploadProfilePhotoAction(
  formData: UploadProfilePhotoPayload
) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/auth/upload-photo`, {
    method: 'PUT',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to upload profile photo');
  }

  const result: UploadProfilePhotoResponse = await response.json();
  return result;
}

export async function editProfileAction(payload: EditProfilePayload) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/auth/editProfile`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result: EditProfileResponse = await response.json();

  return result;
}

/**
 * Updates the NextAuth JWT session cookie with a new access token (e.g. after change password).
 * Call this from the client after receiving a new token so subsequent API calls use it.
 */
export async function updateSessionTokenAction(newToken: string) {
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) throw new Error('NEXTAUTH_SECRET is not set');

  const cookieStore = await cookies();
  const currentCookie = cookieStore.get(SESSION_COOKIE)?.value;
  if (!currentCookie) throw new Error('No session found');

  const payload = await decode({
    token: currentCookie,
    secret,
  });
  if (!payload || !payload.user) throw new Error('Invalid session');

  const newEncoded = await encode({
    token: { ...payload, token: newToken },
    secret,
    maxAge: SESSION_MAX_AGE,
  });

  cookieStore.set(SESSION_COOKIE, newEncoded, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NEXTAUTH_URL?.startsWith('https://'),
    maxAge: SESSION_MAX_AGE,
  });
}

export async function changePasswordAction(payload: ChangePasswordPayload) {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/auth/change-password`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result: ChangePasswordResponse = await response.json();
  return result;
}

export async function deleteAccountAction() {
  const accessToken = await getAccessToken();

  const response = await fetch(`${BASE_API}/auth/deleteMe`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const result: ApiResponse<object> = await response.json();
  return result;
}
