import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { getToken } from 'next-auth/jwt';

import { API } from '../constants/api.constants';

export const getApiHeaders = async (request?: NextRequest) => {
  let nextRequest = request;

  if (!request) {
    // getToken() reads req.cookies. NextRequest built from next/headers ReadonlyHeaders
    // may not expose cookies correctly. Copy into a plain Headers so NextRequest
    // parses Cookie and getToken() can read the session.
    const headersList = headers();
    const newHeaders = new Headers();
    headersList.forEach((value, key) => newHeaders.set(key, value));
    nextRequest = new NextRequest(API, { headers: newHeaders });
  }

  const token = await getToken({
    req: nextRequest as NextRequest,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return {
    'Content-Type': 'application/json',
    ...(token?.token ? { Authorization: `Bearer ${token.token}` } : {}),
  };
};
