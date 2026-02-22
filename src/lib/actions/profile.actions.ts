'use server';

import { EditProfilePayload, EditProfileResponse } from '../types/profile';
import { getAccessToken } from '../utilits/apis.utils';

const BASE_API = process.env.BASE_API as string;

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
